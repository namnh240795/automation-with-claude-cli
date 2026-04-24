# PostgreSQL — Database Naming & Schema Rules

> Source: PostgreSQL schema design standards for this monorepo

## 📦 Naming Conventions

### ✅ Use snake_case for ALL table and column names
```sql
-- ❌ Bad
CREATE TABLE Users (
  userName VARCHAR(50),
  EmailAddress VARCHAR(255)
);

-- ✅ Good
CREATE TABLE app_users (
  user_name VARCHAR(50),
  email_address VARCHAR(255)
);
```

### ✅ Prefix every table with the project short name
```sql
-- ❌ Bad
CREATE TABLE users ( ... );
CREATE TABLE orders ( ... );

-- ✅ Good
CREATE TABLE app_users ( ... );
CREATE TABLE app_orders ( ... );
```

### ✅ Never use reserved keywords as names
```sql
-- ❌ Bad — 'user', 'order', 'date' are reserved
CREATE TABLE user ( ... );
CREATE TABLE order ( date DATE );

-- ✅ Good — use descriptive, non-reserved names
CREATE TABLE app_users ( ... );
CREATE TABLE app_orders ( order_date DATE );
```

---

## 🏷️ Name Prefixes & Suffixes

| Purpose | Pattern | Examples |
|---------|---------|----------|
| Foreign keys | `{referenced_table}_id` | `user_id`, `organization_id` |
| Timestamps | `{action}_at` | `created_at`, `updated_at`, `deleted_at` |
| Booleans | `is_`, `has_`, `can_` | `is_active`, `has_permission`, `can_edit` |
| Counts | `num_{entity}` or `{entity}_count` | `num_items`, `comment_count` |
| URLs | `{entity}_url` | `avatar_url`, `website_url` |

---

## 📐 Column Patterns

### ✅ Every table MUST have `created_at` and `updated_at`
```sql
-- ❌ Bad
CREATE TABLE app_users (
  id UUID PRIMARY KEY,
  email VARCHAR(255)
);

-- ✅ Good
CREATE TABLE app_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### ✅ Use soft deletes — never physically delete records
```sql
-- ❌ Bad
DELETE FROM app_users WHERE id = $1;

-- ✅ Good
UPDATE app_users SET deleted_at = CURRENT_TIMESTAMP WHERE id = $1;

-- Always filter in queries
SELECT * FROM app_users WHERE deleted_at IS NULL;
```

### ✅ Name foreign keys after the referenced table
```sql
-- ❌ Bad
CREATE TABLE app_orders (
  buyer VARCHAR(255),
  seller_id UUID
);

-- ✅ Good
CREATE TABLE app_orders (
  user_id UUID REFERENCES app_users(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES app_organizations(id)
);
```

### ✅ Junction tables for many-to-many: `{table_a}_{table_b}`
```sql
-- ❌ Bad
CREATE TABLE app_userrole ( ... );

-- ✅ Good
CREATE TABLE app_user_roles (
  user_id UUID REFERENCES app_users(id),
  role_id UUID REFERENCES app_roles(id),
  PRIMARY KEY (user_id, role_id)
);
```

---

## 🗂️ Data Type Reference

| Data Type | PostgreSQL Type | Example |
|-----------|----------------|---------|
| Primary Key | `UUID` or `BIGINT` | `id UUID PRIMARY KEY` |
| Foreign Key | `UUID` or `BIGINT` | `user_id UUID` |
| Email | `VARCHAR(255)` | `email VARCHAR(255)` |
| URLs | `TEXT` | `avatar_url TEXT` |
| JSON | `JSONB` | `metadata JSONB` |
| Money | `NUMERIC(10,2)` | `price NUMERIC(10,2)` |
| Timestamps | `TIMESTAMP` | `created_at TIMESTAMP` |
| Enumerations | `TEXT` or custom `ENUM` | `status TEXT` |
| Booleans | `BOOLEAN` | `is_active BOOLEAN` |

---

## 🚫 Reserved Keywords Quick Reference

Never use these as table or column names:

`user`, `order`, `group`, `select`, `from`, `where`, `table`, `index`, `column`, `key`, `value`, `date`, `time`, `timestamp`, `interval`, `comment`, `constraint`, `primary`, `foreign`, `check`, `default`, `null`, `not`, `and`, `or`, `in`

---

## ✅ Schema Design Checklist

- All tables use project prefix
- All names use snake_case
- No reserved keywords used
- Foreign keys named `{table}_id`
- Timestamps named `{action}_at`
- Booleans use `is_`, `has_`, `can_` prefix
- No double underscores in names
- No trailing underscores
- Names start with letters (not numbers)
- Every table has `created_at` and `updated_at`
