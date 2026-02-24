# Prisma Database Patterns

A skill for database operations using Prisma ORM following traceability-backend conventions.

## Naming Conventions

**IMPORTANT:** This project uses specific naming conventions that differ from default Prisma behavior.

### Model and Field Names

- **Model names**: Use lowercase `snake_case` (e.g., `model user`, `model user_profile`, `model refresh_token`)
- **Field names**: Use `snake_case` (e.g., `password_hash`, `first_name`, `created_at`)
- **Table names**: Use **singular** form (not plural), explicitly set with `@@map()`

```prisma
// Example: Correct schema
model user {
  id                String   @id @default(uuid())
  email             String   @unique
  password_hash     String
  first_name        String?
  is_active         Boolean  @default(true)
  created_at        DateTime @default(now())

  @@map("user")  // Singular table name, not "users"
}

model user_profile {
  id             String   @id @default(uuid())
  user_id        String   @unique
  avatar_url     String?

  @@map("user_profile")  // Singular, not "user_profiles"
}
```

### DTO and TypeScript Variable Conventions

- **DTO properties**: Use `snake_case` (e.g., `first_name`, `access_token`, `is_active`)
- **TypeScript variables**: Use `camelCase` (e.g., `passwordHash`, `existingUser`)

```typescript
// DTO with snake_case properties
export class UserResponseDto {
  id: string;
  email: string;
  first_name?: string;     // snake_case
  is_active: boolean;      // snake_case
  created_at: Date;        // snake_case
}

// Service using camelCase variables with snake_case fields
async signUp(signUpDto: SignUpDto): Promise<UserResponseDto> {
  const passwordHash = await bcrypt.hash(password, 10); // camelCase variable

  const user = await this.prisma.user.create({
    data: {
      password_hash: passwordHash,  // snake_case DB field
      first_name,
      is_active: true,
    },
  });

  return user; // Returns DTO with snake_case properties
}
```

### Why These Conventions?

1. **Singular table names**: More explicit, avoids pluralization confusion, matches the model name exactly
2. **snake_case in database**: Standard SQL convention, better PostgreSQL compatibility
3. **snake_case in DTOs**: Consistent with database fields, API responses
4. **camelCase variables**: Standard JavaScript/TypeScript convention

## Critical Rule: ALWAYS Use Prisma Commands for Migrations

**NEVER manually edit the database schema. ALWAYS use Prisma migration commands.**

```bash
# Always work from the service directory
cd apps/[service]

# Always pass DATABASE_URL explicitly or ensure .env is loaded
DATABASE_URL="postgresql://user:pass@host:5432/db?schema=public" \
  npx prisma migrate dev --name descriptive_migration_name

# Generate client after migration
npx prisma generate

# For production
npx prisma migrate deploy
```

**Why?** Manual schema edits create drift and break migration tracking. Prisma commands ensure:
- Schema version control
- Rollback capability
- Team synchronization
- Production deployment safety

## Related Skill

For Prisma setup and installation, see **prisma-integration**.

This skill focuses on **query patterns and operations**. For setup instructions:
- Schema configuration (with `prisma.config.ts`)
- PrismaService creation
- Migration workflow
- Environment setup

Use **prisma-integration** skill.

## Prisma Service Injection

```typescript
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../path/to/prisma.service';

@Injectable()
export class MyService {
  constructor(private readonly prisma: PrismaService) {}
}
```

## Core Patterns

### 1. Always Filter Soft Deletes
```typescript
// Single record
const user = await this.prisma.app_user.findUnique({
  where: { id: userId, deleted_at: null }
});

// Multiple records
const users = await this.prisma.app_user.findMany({
  where: { deleted_at: null }
});
```

### 2. Select Specific Fields
```typescript
const user = await this.prisma.app_user.findUnique({
  where: { id: userId, deleted_at: null },
  select: {
    id: true,
    email: true,
    full_name: true,
    created_at: true,
    // Never select password in API responses
  }
});
```

### 3. Include Relations
```typescript
const userWithRoles = await this.prisma.app_user.findUnique({
  where: { id: userId, deleted_at: null },
  include: {
    user_organization_role: {
      where: { is_active: true },
      include: {
        role: {
          select: { id: true, name: true }
        },
        organization: {
          select: {
            id: true,
            name: true,
            type: true,
            display_id: true
          }
        }
      }
    }
  }
});
```

### 4. Transactions for Multi-Step Operations
```typescript
await this.prisma.$transaction(async (prisma) => {
  // Create organization
  const org = await prisma.organization.create({
    data: { name, type, display_id }
  });

  // Create user
  const user = await prisma.app_user.create({
    data: { username, email, password }
  });

  // Assign role
  await prisma.user_organization_role.create({
    data: {
      user_id: user.id,
      organization_id: org.id,
      role_id: roleId
    }
  });

  return { user, org };
});
```

## Common Queries

### Find with Filters
```typescript
const records = await this.prisma.my_model.findMany({
  where: {
    deleted_at: null,
    is_active: true,
    organization_id: orgId,
    // OR conditions
    OR: [
      { email: searchText },
      { username: searchText }
    ]
  },
  select: {
    id: true,
    name: true,
    created_at: true
  },
  orderBy: { created_at: 'desc' },
  take: 10,
  skip: offset
});
```

### Create with Relations
```typescript
const result = await this.prisma.my_model.create({
  data: {
    name,
    email,
    // Create related records
    related_model: {
      create: {
        field: value
      }
    },
    // Connect existing records
    organization: {
      connect: { id: orgId }
    }
  },
  select: {
    id: true,
    name: true
  }
});
```

### Update
```typescript
const updated = await this.prisma.my_model.update({
  where: { id, deleted_at: null },
  data: {
    name: newName,
    email: newEmail,
    updated_at: new Date(),
    updated_by: userId
  },
  select: {
    id: true,
    name: true,
    email: true
  }
});
```

### Soft Delete
```typescript
await this.prisma.my_model.update({
  where: { id },
  data: {
    deleted_at: new Date(),
    deleted_by: userId
  }
});
```

### Hard Delete (use sparingly)
```typescript
await this.prisma.my_model.delete({
  where: { id }
});
```

### Check Existence
```typescript
const exists = await this.prisma.my_model.findUnique({
  where: { id, deleted_at: null },
  select: { id: true }
});

if (!exists) {
  throw new NotFoundException('Record not found');
}
```

### Count Records
```typescript
const count = await this.prisma.my_model.count({
  where: {
    deleted_at: null,
    organization_id: orgId
  }
});
```

## Error Handling Patterns

### Prisma 7+ Quick Troubleshooting

| Error | Cause | Solution |
|-------|-------|----------|
| `datasource url not supported` | Using Prisma 6 syntax | Remove url from schema.prisma, use prisma.config.ts |
| `defineConfig not found` | Wrong import | Import from 'prisma/config' not '@prisma/client' |
| `datasource.url required` | Config file missing/wrong location | Create prisma.config.ts in service root |
| `password auth failed` | Docker user password issue | Reset with `ALTER USER` command |
| `AI detected` | Safety guard | Use `PRISMA_USER_CONSENT_FOR_DANGEROUS_AI_ACTION` |
| `missing opposite relation` | Incomplete relation | Add back-relation field array |

### Migration Checklist

Before running migrations:
- [ ] `prisma.config.ts` exists in service root
- [ ] Schema has no `url` property in datasource
- [ ] `defineConfig` imported from `'prisma/config'`
- [ ] DATABASE_URL set in .env or passed explicitly
- [ ] All relations have back-relation fields
- [ ] Running from service directory: `cd apps/[service]`

### Unique Constraint Validation
```typescript
try {
  const result = await this.prisma.my_model.create({
    data: { email }
  });
} catch (error) {
  if (error.code === 'P2002') {
    throw new ConflictException('Email already exists');
  }
  throw new InternalServerErrorException('Failed to create record');
}
```

### Common Prisma Error Codes
- `P2002` - Unique constraint violation
- `P2025` - Record not found
- `P2003` - Foreign key constraint failed
- `P2014` - Required relation violation

## Advanced Patterns

### Pagination
```typescript
async findPaginated(page: number, limit: number) {
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    this.prisma.my_model.findMany({
      where: { deleted_at: null },
      take: limit,
      skip,
      orderBy: { created_at: 'desc' }
    }),
    this.prisma.my_model.count({
      where: { deleted_at: null }
    })
  ]);

  return {
    data,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
}
```

### Nested Queries with Relations
```typescript
const complex = await this.prisma.organization.findUnique({
  where: { id: orgId, deleted_at: null },
  include: {
    user_organization_role: {
      where: { is_active: true },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true
          }
        },
        role: {
          select: {
            name: true
          }
        }
      }
    }
  }
});
```

### Conditional Update
```typescript
const updated = await this.prisma.my_model.update({
  where: { id },
  data: {
    ...(newName && { name: newName }),
    ...(newEmail && { email: newEmail }),
    updated_at: new Date()
  }
});
```

### Batch Operations
```typescript
// Create many
await this.prisma.my_model.createMany({
  data: [
    { name: 'Item 1' },
    { name: 'Item 2' }
  ],
  skipDuplicates: true
});

// Update many
await this.prisma.my_model.updateMany({
  where: { organization_id: orgId },
  data: { is_active: false }
});

// Delete many
await this.prisma.my_model.deleteMany({
  where: { deleted_at: { not: null } }
});
```

## Audit Fields

Always include these in creates/updates:
```typescript
// Create
data: {
  name,
  created_by: userId,
  updated_by: userId
}

// Update
data: {
  name,
  updated_by: userId,
  updated_at: new Date()
}

// Soft delete
data: {
  deleted_at: new Date(),
  deleted_by: userId
}
```

## Performance Tips

1. **Use `select`** to limit returned fields
2. **Use `take` and `skip`** for pagination
3. **Batch operations** when possible
4. **Use transactions** for related operations
5. **Avoid N+1 queries** with proper `include`
6. **Create indexes** on frequently queried fields
7. **Use `findMany` with `where`** instead of filtering in code

## Testing with Prisma

```typescript
// Mock PrismaService
const mockPrisma = {
  app_user: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  }
};

TestingModule.builder()
  .overrideProvider(PrismaService)
  .useValue(mockPrisma)
  .compile();
```
