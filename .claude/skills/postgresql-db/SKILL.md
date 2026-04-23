---
name: postgresql-db
description: PostgreSQL database schema design with strict naming conventions. Use when creating database schemas, tables, columns, or writing SQL for PostgreSQL. Enforces: (1) Snake_case for all table and column names, (2) Project prefix for all tables, (3) No reserved keywords, (4) PostgreSQL best practices. Includes schema validation and automated name correction.
---

# PostgreSQL Database Design

Design PostgreSQL schemas with consistent, safe naming conventions.

## Core Naming Conventions

### 1. Snake_case for Everything

All table and column names use `snake_case` (lowercase with underscores).

**Bad:**
- `userName`
- `User_Name`
- `USERNAME`
- `UserName`

**Good:**
- `user_name`
- `email_address`
- `created_at`

### 2. Project Prefix for Tables

Every table name starts with the project short name prefix.

**Example with prefix `app`:**
- `app_users`
- `app_user_profiles`
- `app_login_sessions`

### 3. Avoid Reserved Keywords

Never use PostgreSQL reserved keywords as table or column names.

Common reserved keywords to avoid:
- `user`, `order`, `group`, `select`, `from`, `where`, `table`, `index`, `column`
- `date`, `time`, `timestamp`, `interval`
- `comment`, `constraint`, `primary`, `foreign`, `key`
- `check`, `default`, `null`, `not`, `and`, `or`, `in`

**Instead of:**
- `user` → `app_users`, `app_user`, `usr`
- `order` → `app_orders`, `purchase_order`
- `date` → `created_date`, `start_date`, `event_date`

### 4. Name Prefixes and Suffixes

Use prefixes/suffixes for clarity:

| Purpose | Pattern | Examples |
|---------|---------|----------|
| Foreign keys | `{referenced_table}_id` | `user_id`, `organization_id` |
| Timestamps | `{action}_at` | `created_at`, `updated_at`, `deleted_at` |
| Booleans | `is_`, `has_`, `can_` | `is_active`, `has_permission`, `can_edit` |
| Counts | `num_{entity}` or `{entity}_count` | `num_items`, `comment_count` |
| URLs | `{entity}_url` | `avatar_url`, `website_url` |

## Column Naming Examples

```sql
CREATE TABLE app_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT FALSE,
    last_login_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE app_user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES app_users(id) ON DELETE CASCADE,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    avatar_url TEXT,
    bio TEXT,
    date_of_birth DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Schema Validator

Use the bundled script to validate schemas:

```bash
python3 scripts/schema_validator.py '<json_schema>' [project_prefix]
```

### Example Usage

```json
{
  "tables": {
    "app_users": {
      "columns": [
        {"name": "id", "type": "UUID", "constraints": "PRIMARY KEY"},
        {"name": "email", "type": "VARCHAR(255)", "constraints": "NOT NULL UNIQUE"},
        {"name": "created_at", "type": "TIMESTAMP", "constraints": "DEFAULT CURRENT_TIMESTAMP"}
      ]
    },
    "user_profiles": {
      "columns": [
        {"name": "user_id", "type": "UUID", "constraints": "REFERENCES app_users(id)"}
      ]
    }
  }
}
```

## Common Patterns

### Timestamps

Always include these columns on every table:
- `created_at` - When the record was created
- `updated_at` - When the record was last modified

```sql
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
```

### Soft Deletes

Instead of deleting records, use soft deletes:
```sql
deleted_at TIMESTAMP DEFAULT NULL
```

### Foreign Keys

Name foreign keys after the referenced table:
```sql
user_id UUID REFERENCES app_users(id),
organization_id UUID REFERENCES app_organizations(id)
```

### Junction Tables

For many-to-many relationships, name with both tables:
```sql
app_user_roles (user_id, role_id)
app_post_tags (post_id, tag_id)
```

## Reserved Keywords Quick Reference

Never use these as table or column names:

**Common Traps:**
- `user` → use `users`, `app_users`, `usr`
- `order` → use `orders`, `purchase_orders`
- `group` → use `groups`, `user_groups`
- `table` → use `tables`, `data_tables`
- `column` → use `columns`, `table_columns`
- `index` → use `indexes`, `search_index`
- `key` → use `keys`, `api_key`
- `value` → use `values`, `setting_value`
- `date` → use `created_date`, `start_date`
- `time` → use `created_time`, `start_time`
- `comment` → use `comments`, `post_comment`
- `constraint` → use `constraints`, `rule_constraint`

## Schema Design Checklist

- [ ] All tables use project prefix
- [ ] All names use snake_case
- [ ] No reserved keywords used
- [ ] Foreign keys named `{table}_id`
- [ ] Timestamps named `{action}_at`
- [ ] Booleans use `is_`, `has_`, `can_` prefix
- [ ] No double underscores in names
- [ ] No trailing underscores
- [ ] Names start with letters (not numbers)
- [ ] All tables have `created_at` and `updated_at`

## Data Type Best Practices

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
