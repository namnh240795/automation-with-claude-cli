# Prisma Integration

A skill for integrating Prisma ORM into NestJS applications following traceability-backend conventions.

## Installation

```bash
# Install Prisma CLI and client
npm install prisma @prisma/client

# Install dotenv (required)
npm install --save-dev dotenv

# Initialize Prisma
npx prisma init

# Or with custom package name (like traceability-backend)
npm install prisma
# Schema will use custom package name
```

## Prisma Configuration

### prisma.config.ts

```typescript
// prisma.config.ts
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
```

### Alternative: Using `satisfies` Operator

```typescript
// prisma.config.ts
import "dotenv/config";
import type { PrismaConfig } from "prisma";
import { env } from "prisma/config";

export default {
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
} satisfies PrismaConfig;
```

### Configuration Options

| Option | Type | Required | Default | Description |
|--------|------|----------|---------|-------------|
| `schema` | `string` | No | `./prisma/schema.prisma`, `./schema.prisma` | Path to schema file or folder |
| `migrations.path` | `string` | No | none | Migration files directory |
| `migrations.seed` | `string` | No | none | Seed command for `npx prisma db seed` |
| `datasource.url` | `string` | Yes | `''` | Database connection URL |
| `datasource.shadowDatabaseUrl` | `string` | No | none | Shadow database URL for cloud DBs |
| `views.path` | `string` | No | none | SQL view definitions directory |
| `experimental.externalTables` | `boolean` | No | `false` | Enable external tables feature |

### schema.prisma

```prisma
// apps/backend/prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
}

// Example model with audit fields
model user {
  id         String    @id @default(cuid())
  username   String    @unique
  email      String    @unique
  password   String
  full_name  String?
  is_active  Boolean   @default(true)
  created_at DateTime  @default(now())
  created_by String
  updated_at DateTime  @updatedAt
  updated_by String
  deleted_at DateTime?
  deleted_by String?

  @@index([email])
  @@index([is_active])
}
```

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Example model with audit fields
model user {
  id         String    @id @default(cuid())
  username   String    @unique
  email      String    @unique
  password   String
  full_name  String?
  is_active  Boolean   @default(true)
  created_at DateTime  @default(now())
  created_by String
  updated_at DateTime  @updatedAt
  updated_by String
  deleted_at DateTime?
  deleted_by String?

  @@index([email])
  @@index([is_active])
}
```

### Custom Package Name

```prisma
generator client {
  provider = "prisma-client-js"
  output   = "../../../node_modules/backend-prisma"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

**package.json**:
```json
{
  "dependencies": {
    "backend-prisma": "file:./node_modules/backend-prisma"
  }
}
```

## PrismaService Setup

### Basic PrismaService

```typescript
// apps/backend/src/prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
```

### PrismaService with Logging (traceability-backend style)

```typescript
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { LogActivity } from '@app/app-logger';
import { PrismaClient } from 'backend-prisma';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  @LogActivity()
  async onModuleInit() {
    await this.$connect();
  }

  @LogActivity()
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
```

## App Module Configuration

```typescript
// apps/backend/src/app.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [PrismaService],
  exports: [PrismaService], // Export to use in other modules
})
export class AppModule {}
```

## Environment Configuration

`DATABASE_URL` is referenced in `prisma.config.ts` via `env("DATABASE_URL")`.

### .env

### .env

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"

# Direct connection (for migrations)
DIRECT_URL="postgresql://user:password@localhost:5432/mydb?schema=public"
```

### .env.example

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"
```

## Common Scripts

### package.json

```json
{
  "scripts": {
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev",
    "prisma:migrate:deploy": "prisma migrate deploy",
    "prisma:studio": "prisma studio",
    "prisma:seed": "ts-node prisma/seed.ts",
    "prisma:reset": "prisma migrate reset",
    "prisma:format": "prisma format"
  }
}
```

## Database Operations

### Create Record

```typescript
@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashedPassword,
        created_by: userId,
        updated_by: userId,
      },
    });
  }
}
```

### Find with Soft Delete Filter

```typescript
async findAll() {
  return this.prisma.user.findMany({
    where: { deleted_at: null },
    select: {
      id: true,
      username: true,
      email: true,
      full_name: true,
      is_active: true,
      created_at: true,
    },
  });
}

async findOne(id: string) {
  return this.prisma.user.findUnique({
    where: { id, deleted_at: null },
    select: {
      id: true,
      username: true,
      email: true,
      full_name: true,
    },
  });
}
```

### Update with Audit Fields

```typescript
async update(id: string, data: UpdateUserDto, userId: string) {
  return this.prisma.user.update({
    where: { id, deleted_at: null },
    data: {
      ...data,
      updated_by: userId,
      updated_at: new Date(),
    },
  });
}
```

### Soft Delete

```typescript
async remove(id: string, userId: string) {
  return this.prisma.user.update({
    where: { id },
    data: {
      deleted_at: new Date(),
      deleted_by: userId,
    },
  });
}
```

### Transaction

```typescript
async createUserWithOrg(data: CreateUserWithOrgDto) {
  return this.prisma.$transaction(async (prisma) => {
    const org = await prisma.organization.create({
      data: {
        name: data.orgName,
        type: data.orgType,
        created_by: data.userId,
        updated_by: data.userId,
      },
    });

    const user = await prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: data.password,
        created_by: data.userId,
        updated_by: data.userId,
      },
    });

    return { user, org };
  });
}
```

## Relations

### Define Relations in Schema

```prisma
model organization {
  id       String   @id @default(cuid())
  name     String
  users    user[]

  created_at DateTime @default(now())
  created_by String
  updated_at DateTime @updatedAt
  updated_by String
  deleted_at DateTime?
  deleted_by String?
}

model user {
  id             String        @id @default(cuid())
  username       String        @unique
  email          String        @unique
  organizationId String?
  organization   organization? @relation(fields: [organizationId], references: [id])

  created_at DateTime @default(now())
  created_by String
  updated_at DateTime @updatedAt
  updated_by String
  deleted_at DateTime?
  deleted_by String?
}
```

### Query with Relations

```typescript
async findWithOrg(id: string) {
  return this.prisma.user.findUnique({
    where: { id, deleted_at: null },
    include: {
      organization: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
}
```

## Naming Conventions

### Tables (Models)
- Use **snake_case**: `user_profile`, `organization_role`
- For junction tables: `user_organization_role`

### Fields
- Primary key: `id` (CUID)
- Foreign keys: `{tableName}Id` (e.g., `organizationId`)
- Audit fields: `created_at`, `created_by`, `updated_at`, `updated_by`, `deleted_at`, `deleted_by`
- Timestamps: use `DateTime` type
- Booleans: prefix with `is_` (e.g., `is_active`, `is_verified`)

### Prisma Client in Code
- Prisma converts snake_case to camelCase:
  - `user_profile` → `prisma.user_profile`
  - `organizationId` → `organizationId`
  - `created_at` → `created_at`

## Migration Workflow (Prisma 7+)

**CRITICAL: Always use Prisma commands for migrations - never manually edit the database.**

```bash
# 1. Create prisma.config.ts in BOTH locations:
#    - apps/[service]/prisma.config.ts (for root-level migrations)
#    - apps/[service]/prisma/prisma.config.ts (for schema-level operations)

# 2. Ensure DATABASE_URL is set in .env or passed explicitly

# 3. Create migration (must be run from service directory)
cd apps/[service]
DATABASE_URL="postgresql://..." npx prisma migrate dev --name migration_name

# 4. Generate client
npx prisma generate

# 5. Deploy migrations to production
npx prisma migrate deploy
```

### Prisma 7+ Configuration Requirements

**CRITICAL: prisma.config.ts MUST exist in the service root directory for migrations to work.**

```
apps/[service]/
├── prisma.config.ts          # REQUIRED in root for migrations
├── prisma/
│   ├── schema.prisma
│   └── prisma.config.ts      # Optional, for schema-level operations
└── .env                      # DATABASE_URL must be set here
```

**Root-level prisma.config.ts (REQUIRED for migrations):**
```typescript
// apps/[service]/prisma.config.ts
import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: './prisma/schema.prisma',  // Relative to service root
  datasource: {
    url: env('DATABASE_URL'),
  },
});
```

**Schema-level prisma.config.ts (optional):**
```typescript
// apps/[service]/prisma/prisma.config.ts
import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: './schema.prisma',  // Relative to prisma directory
  datasource: {
    url: env('DATABASE_URL'),
  },
});
```

## Best Practices

1. **Always filter soft deletes**: `where: { deleted_at: null }`
2. **Use select** to limit returned fields (especially passwords)
3. **Use transactions** for multi-step operations
4. **Add audit fields** to all tables
5. **Use indexes** on frequently queried fields
6. **Use select in includes** to limit nested data
7. **Handle Prisma errors** with proper exception types
8. **Use `@LogActivity()` decorator** on service methods

## Common Errors

### Prisma 7+ Migration Errors

#### Error 1: "The datasource property `url` is no longer supported in schema files"

**Cause:** Prisma 7+ removed the `url` property from datasource blocks in schema.prisma files.

**Solution:** Remove `url` from schema.prisma and create prisma.config.ts:
```prisma
// WRONG (Prisma 7+):
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")  // ❌ Not supported in Prisma 7+
}

// CORRECT (Prisma 7+):
datasource db {
  provider = "postgresql"
  // No url property here
}
```

Then create `prisma.config.ts`:
```typescript
import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: './prisma/schema.prisma',
  datasource: {
    url: env('DATABASE_URL'),  // ← URL goes here
  },
});
```

#### Error 2: "Module '"@prisma/client"' has no exported member 'defineConfig'"

**Cause:** Wrong import path for Prisma 7+ configuration.

**Solution:** Import from `'prisma/config'` not `'@prisma/client'`:
```typescript
// WRONG:
import { defineConfig, env } from '@prisma/client';

// CORRECT:
import { defineConfig, env } from 'prisma/config';
```

#### Error 3: "The datasource.url property is required when using prisma migrate dev"

**Cause:** The prisma.config.ts file is not in the correct location or not being read.

**Solution:** Ensure prisma.config.ts exists in the service root directory:
```bash
# Correct structure:
apps/auth/
├── prisma.config.ts          # ← Must be here for migrations
├── prisma/
│   ├── schema.prisma
│   └── prisma.config.ts      # ← Optional, schema-level
└── .env

# Then run migration from service root:
cd apps/auth
DATABASE_URL="postgresql://..." npx prisma migrate dev --name init
```

#### Error 4: Password Authentication Failed (Docker PostgreSQL)

**Cause:** User passwords created in Docker init script may not work from host machine due to SCRAM-SHA-256 authentication.

**Solution:** Reset passwords explicitly:
```bash
docker exec claude-postgres psql -U postgres -c \
  "ALTER USER auth_admin WITH PASSWORD 'auth_admin_password_change_this';"

docker exec claude-postgres psql -U postgres -c \
  "ALTER USER api_admin WITH PASSWORD 'api_admin_password_change_this';"
```

#### Error 5: "Prisma Migrate detected that it was invoked by Claude Code"

**Cause:** Prisma has safety guards against AI agents running dangerous operations.

**Solution:** Use explicit user consent environment variable:
```bash
PRISMA_USER_CONSENT_FOR_DANGEROUS_AI_ACTION="user's exact consent message" \
npx prisma migrate reset --force
```

#### Error 6: Missing Opposite Relation Field

**Cause:** Prisma relations require back-relation fields on both models.

**Solution:** Add back-relation arrays:
```prisma
// WRONG:
model Post {
  id       String   @id
  authorId String
  author   UserProfile @relation(fields: [authorId], references: [id])
}

model UserProfile {
  id String @id
  // Missing posts relation
}

// CORRECT:
model Post {
  id       String   @id
  authorId String
  author   UserProfile @relation(fields: [authorId], references: [id])
}

model UserProfile {
  id    String @id
  posts Post[]  // ← Add back-relation
}
```

### P2002 - Unique Constraint
```typescript
try {
  await this.prisma.user.create({ data: { email } });
} catch (error) {
  if (error.code === 'P2002') {
    throw new ConflictException('Email already exists');
  }
  throw error;
}
```

### P2025 - Record Not Found
```typescript
const user = await this.prisma.user.findUnique({
  where: { id }
});

if (!user) {
  throw new NotFoundException('User not found');
}
```

## Testing

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let prisma: DeepMockProxy<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: mockDeep<PrismaService>(),
        },
      ],
    }).compile();

    service = module.get(UserService);
    prisma = module.get(PrismaService);
  });

  it('should find a user', async () => {
    prisma.user.findUnique.mockResolvedValue(mockUser);
    expect(await service.findOne('id')).toEqual(mockUser);
  });
});
```

## Helper Functions Reference

| Function | Description |
|----------|-------------|
| `defineConfig(config)` | Type-safe config builder helper |
| `env(varName)` | Read environment variable |

## File Naming Options

Prisma Config files can be named as:
- `prisma.config.*`
- `.config/prisma.*`

Supported extensions: `js`, `ts`, `mjs`, `cjs`, `mts`, `cts`
