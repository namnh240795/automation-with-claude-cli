# Prisma Patterns — Query & Database Operation Rules

> Source: Prisma ORM query patterns and database conventions for this monorepo

## 📦 Naming Conventions

### ✅ Model names: lowercase snake_case, singular tables
```prisma
// ❌ Bad
model Users { ... }           // PascalCase
model user_profiles { ... }   // Plural table

// ✅ Good
model user {
  id            String   @id @default(uuid())
  password_hash String
  first_name    String?
  is_active     Boolean  @default(true)
  created_at    DateTime @default(now())

  @@map("user")    // Singular, not "users"
}

model user_profile {
  id        String @id @default(uuid())
  user_id   String @unique
  avatar_url String?

  @@map("user_profile")
}
```

### ✅ Field naming patterns

| Pattern | Convention | Examples |
|---------|-----------|----------|
| Primary key | `id` | `id String @id @default(uuid())` |
| Foreign key | `{table}_id` | `user_id`, `organization_id` |
| Timestamps | `{action}_at` | `created_at`, `updated_at`, `deleted_at` |
| Booleans | `is_`, `has_`, `can_` | `is_active`, `is_verified` |
| Audit trail | `{action}_by` | `created_by`, `updated_by`, `deleted_by` |

### ✅ DTO snake_case, TypeScript camelCase
```typescript
// DTO — snake_case properties
export class UserResponseDto {
  first_name?: string;     // snake_case
  is_active: boolean;      // snake_case
}

// Service — camelCase variables
const passwordHash = await bcrypt.hash(password, 10);  // camelCase
const existingUser = await this.prisma.user.findUnique( ... );
```

---

## 🔍 Core Query Patterns

### ✅ ALWAYS filter soft deletes
```typescript
// ❌ Bad — returns deleted records
const users = await this.prisma.user.findMany({});

// ✅ Good — excludes soft-deleted
const user = await this.prisma.user.findUnique({
  where: { id: userId, deleted_at: null }
});

const users = await this.prisma.user.findMany({
  where: { deleted_at: null }
});
```

### ✅ Use `select` to limit returned fields — never return passwords
```typescript
// ❌ Bad — returns all fields including password_hash
const user = await this.prisma.user.findUnique({ where: { id } });

// ✅ Good — only needed fields
const user = await this.prisma.user.findUnique({
  where: { id, deleted_at: null },
  select: {
    id: true,
    email: true,
    full_name: true,
    created_at: true,
  }
});
```

### ✅ Use `include` for relations with nested `select`
```typescript
// ❌ Bad — returns all relation fields
const user = await this.prisma.user.findUnique({
  include: { organization: true }
});

// ✅ Good — select specific relation fields
const user = await this.prisma.user.findUnique({
  where: { id, deleted_at: null },
  include: {
    organization: {
      select: { id: true, name: true, type: true }
    }
  }
});
```

### ✅ Use transactions for multi-step operations
```typescript
// ❌ Bad — separate calls can leave partial state
const org = await this.prisma.organization.create({ data: { name } });
const user = await this.prisma.user.create({ data: { email } });

// ✅ Good — atomic transaction
await this.prisma.$transaction(async (tx) => {
  const org = await tx.organization.create({ data: { name } });
  const user = await tx.user.create({ data: { email } });
  await tx.user_organization_role.create({
    data: { user_id: user.id, organization_id: org.id, role_id }
  });
  return { user, org };
});
```

---

## 📋 Common Queries

### Find with filters
```typescript
const records = await this.prisma.user.findMany({
  where: {
    deleted_at: null,
    is_active: true,
    organization_id: orgId,
    OR: [
      { email: searchText },
      { username: searchText }
    ]
  },
  select: { id: true, name: true, created_at: true },
  orderBy: { created_at: 'desc' },
  take: 10,
  skip: offset
});
```

### Create with relations
```typescript
const result = await this.prisma.user.create({
  data: {
    name,
    email,
    related_model: { create: { field: value } },  // nested create
    organization: { connect: { id: orgId } },      // link existing
  },
  select: { id: true, name: true }
});
```

### Update with audit fields
```typescript
const updated = await this.prisma.user.update({
  where: { id, deleted_at: null },
  data: {
    name: newName,
    updated_by: userId,
    updated_at: new Date(),
  },
  select: { id: true, name: true }
});
```

### Soft delete — never hard delete
```typescript
// ❌ Bad — permanent deletion
await this.prisma.user.delete({ where: { id } });

// ✅ Good — soft delete
await this.prisma.user.update({
  where: { id },
  data: {
    deleted_at: new Date(),
    deleted_by: userId
  }
});
```

### Check existence
```typescript
const exists = await this.prisma.user.findUnique({
  where: { id, deleted_at: null },
  select: { id: true }
});

if (!exists) throw new NotFoundException('User not found');
```

---

## 📊 Pagination Pattern

### ✅ Use Promise.all for count + data
```typescript
async findPaginated(page: number, limit: number) {
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    this.prisma.user.findMany({
      where: { deleted_at: null },
      take: limit,
      skip,
      orderBy: { created_at: 'desc' }
    }),
    this.prisma.user.count({
      where: { deleted_at: null }
    })
  ]);

  return {
    data,
    total,
    page,
    limit,
    total_pages: Math.ceil(total / limit)
  };
}
```

---

## 🔄 Batch Operations

```typescript
// Create many (skip duplicates)
await this.prisma.user.createMany({
  data: [{ name: 'Item 1' }, { name: 'Item 2' }],
  skipDuplicates: true
});

// Update many
await this.prisma.user.updateMany({
  where: { organization_id: orgId },
  data: { is_active: false }
});

// Conditional update
const updated = await this.prisma.user.update({
  where: { id },
  data: {
    ...(newName && { name: newName }),
    ...(newEmail && { email: newEmail }),
    updated_at: new Date()
  }
});
```

---

## 🐛 Error Handling

### Prisma Error Codes

| Code | Meaning | Action |
|------|---------|--------|
| `P2002` | Unique constraint violation | `ConflictException` |
| `P2025` | Record not found | `NotFoundException` |
| `P2003` | Foreign key constraint | Check related record exists |
| `P2014` | Required relation violation | Add missing relation |

### ✅ Always catch P2002 for unique fields
```typescript
try {
  return await this.prisma.user.create({ data: { email } });
} catch (error) {
  if (error.code === 'P2002') {
    throw new ConflictException('Email already exists');
  }
  throw new InternalServerErrorException('Failed to create record');
}
```

---

## ⚡ Performance

- Use `select` to limit returned fields
- Use `take` and `skip` for pagination (never fetch all)
- Use `Promise.all` for parallel queries
- Use transactions for related operations
- Avoid N+1 queries with proper `include`
- Add `@@index` on frequently queried fields
- Filter in `where` — never filter in application code

---

## 🧪 Testing

### ✅ Mock PrismaService with jest
```typescript
const mockPrisma = {
  user: {
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

---

## 🚫 Checklist

- ❌ Never query without `deleted_at: null` filter
- ❌ Never return `password_hash` in API responses — always use `select`
- ❌ Never hard delete — always soft delete with `deleted_at`
- ❌ Never create/update without `created_by` / `updated_by`
- ❌ Never filter data in application code — use Prisma `where`
- ❌ Never do multi-step operations outside a transaction
- ✅ Always use `select` or `include` with nested `select`
- ✅ Always use `Promise.all` for pagination count + data
- ✅ Always handle P2002 errors on unique fields
