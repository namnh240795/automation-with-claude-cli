# Prisma Integration — Setup & Configuration Rules

> Source: Prisma 7 ORM integration patterns for this monorepo

## 🏗️ File Structure

### ✅ Every service MUST have this Prisma layout
```
apps/[service]/
├── prisma.config.ts          # REQUIRED — in service root for migrations
├── prisma/
│   ├── schema.prisma         # Schema (NO url in datasource)
│   └── prisma.config.ts      # Optional — schema-level operations
└── .env                      # DATABASE_URL must be set
```

---

## ⚙️ Prisma 7 Configuration

### ✅ Use prisma.config.ts — schema.prisma MUST NOT contain url
```prisma
// ❌ Bad — Prisma 7 does NOT support url in schema
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ✅ Good — no url in datasource
datasource db {
  provider = "postgresql"
}
```

```typescript
// prisma.config.ts (service root)
import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: './prisma/schema.prisma',
  datasource: {
    url: env('DATABASE_URL'),
  },
});
```

### ✅ Import defineConfig from 'prisma/config' — never '@prisma/client'
```typescript
// ❌ Bad
import { defineConfig } from '@prisma/client';

// ✅ Good
import { defineConfig, env } from 'prisma/config';
```

---

## 📐 Schema Patterns

### ✅ Every model MUST have audit fields and indexes
```prisma
model user {
  id         String    @id @default(uuid())
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

### ✅ Always add back-relation fields on both models
```prisma
// ❌ Bad — missing back-relation
model Post {
  id       String   @id
  authorId String
  author   UserProfile @relation(fields: [authorId], references: [id])
}
model UserProfile {
  id String @id
  // Missing posts relation
}

// ✅ Good — both sides defined
model Post {
  id       String   @id
  authorId String
  author   UserProfile @relation(fields: [authorId], references: [id])
}
model UserProfile {
  id    String @id
  posts Post[]
}
```

---

## 🔧 PrismaService

### ✅ Extend PrismaClient with lifecycle hooks
```typescript
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@auth/prisma-client';

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

### ✅ Register in AppModule as global provider
```typescript
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
```

---

## 🚀 Migration Workflow

### ✅ Always run migrations from service directory with DATABASE_URL
```bash
# ❌ Bad — wrong directory, no URL
npx prisma migrate dev --name init

# ✅ Good
cd apps/auth
DATABASE_URL="postgresql://..." npx prisma migrate dev --name init
npx prisma generate
```

### ✅ Pre-migration checklist
1. `prisma.config.ts` exists in service root
2. Schema has no `url` in datasource block
3. `defineConfig` imported from `'prisma/config'`
4. `DATABASE_URL` set in `.env` or passed explicitly
5. All relations have back-relation fields
6. Running from service directory: `cd apps/[service]`

---

## 🐛 Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| `datasource url not supported` | Prisma 6 syntax in Prisma 7 | Remove url from schema.prisma, use prisma.config.ts |
| `defineConfig not found` | Wrong import | Import from `'prisma/config'` not `'@prisma/client'` |
| `datasource.url required` | Config file missing/wrong location | Create prisma.config.ts in service root |
| `password auth failed` | Docker SCRAM-SHA-256 | Reset with `ALTER USER` command |
| `AI detected` | Prisma safety guard | Use `PRISMA_USER_CONSENT_FOR_DANGEROUS_AI_ACTION` |
| `missing opposite relation` | Incomplete relation | Add back-relation field array |

### ✅ Handle P2002 unique constraint
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

---

## 📋 Common Scripts

```json
{
  "prisma:generate": "prisma generate",
  "prisma:migrate": "prisma migrate dev",
  "prisma:migrate:deploy": "prisma migrate deploy",
  "prisma:studio": "prisma studio",
  "prisma:reset": "prisma migrate reset"
}
```

---

## 🚫 Checklist

- ❌ Never put `url` in schema.prisma datasource block (Prisma 7)
- ❌ Never import `defineConfig` from `@prisma/client`
- ❌ Never run migrations outside the service directory
- ❌ Never manually edit the database schema
- ❌ Never forget back-relation fields on both sides of a relation
- ❌ Never forget `prisma generate` after schema changes
- ✅ Always create `prisma.config.ts` in service root
- ✅ Always pass `DATABASE_URL` explicitly or ensure `.env` is loaded
- ✅ Always include audit fields on every model
- ✅ Always add indexes on frequently queried fields
