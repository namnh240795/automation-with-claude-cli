# Database — PostgreSQL and Prisma Conventions

> Source: Database design and query conventions (see also prisma-patterns.md and prisma-integration.md)

This rule covers database design conventions. For Prisma query patterns see `prisma-patterns.md`. For Prisma 7 setup see `prisma-integration.md`.

## Database-Per-Service

Each service owns its database:
- Auth service → `auth_db`
- Never query another service's database directly
- Use REST API or RabbitMQ for cross-service data

## Schema Design

### Every model must have these fields
```prisma
model user {
  id         String    @id @default(uuid())
  // ... business fields ...
  is_active  Boolean   @default(true)
  created_at DateTime  @default(now())
  created_by String
  updated_at DateTime  @updatedAt
  updated_by String
  deleted_at DateTime?
  deleted_by String?
}
```

### Index rules
- Index all foreign keys: `@@index([user_id])`
- Index frequently queried fields: `@@index([email])`, `@@index([is_active])`
- Index soft-delete filter: `@@index([deleted_at])`
- Use composite indexes for common filter combos: `@@index([organization_id, deleted_at])`

### Relation rules
- Always define both sides of a relation (back-relation field array on parent)
- Use `@@map("table_name")` for explicit table mapping
- Singular table names: `@@map("user")` not `@@map("users")`

## Data Types

| Use Case | PostgreSQL Type | Prisma Type |
|----------|----------------|-------------|
| Primary key | UUID | `String @id @default(uuid())` |
| Foreign key | UUID | `String` |
| Short text | VARCHAR | `String` |
| Email | VARCHAR(255) | `String @unique` |
| Password hash | VARCHAR(255) | `String` |
| Long text | TEXT | `String` |
| JSON data | JSONB | `Json` |
| Money | NUMERIC(10,2) | `Decimal` |
| Timestamps | TIMESTAMP | `DateTime` |
| Booleans | BOOLEAN | `Boolean` |
| Enums | TEXT or custom ENUM | `String` with enum constants |

## Reserved Keywords

Never use as table/column names: `user`, `order`, `group`, `select`, `from`, `where`, `table`, `index`, `column`, `key`, `value`, `date`, `time`, `timestamp`, `comment`, `constraint`, `default`, `null`

## Migration Workflow

```bash
cd apps/auth                                          # Must be in service directory
DATABASE_URL="postgresql://..." pnpm prisma migrate dev --name migration_name
pnpm prisma generate                                  # Regenerate client
```

## Soft Deletes

- Never hard delete — always set `deleted_at` and `deleted_by`
- Every query must filter `deleted_at: null`
- Unique constraints must account for soft deletes (partial unique index or composite unique with `deleted_at`)
