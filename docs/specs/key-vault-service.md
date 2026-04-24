# Key Vault Service — Product Requirements Document

## Objective

Build a new NestJS microservice (`apps/key-vault`) that provides a centralized, secure key-value store for configuration and secrets across all services in the monorepo. Only **super admin** users can manage settings via the API. Other services consume settings via REST API calls to key-vault.

## Target Users

- **Super Admin** — Full CRUD access to all settings, environments, and version history
- **Other Services** — Read-only API access to fetch their own settings at runtime

## Service Overview

| Property | Value |
|----------|-------|
| Directory | `apps/key-vault` |
| SERVICE_PREFIX | `key-vault` |
| Port | `3002` |
| Database | `key_vault_db` |
| Prisma Client | `@key-vault/prisma-client` |
| Auth | JWT + `@Roles('SUPER_ADMIN')` for management, service token for read |

---

## Core Concepts

### Setting Types

| Type | Storage | API Response | Use Case |
|------|---------|-------------|----------|
| **SECURE** | AES-256 encrypted at rest | Masked (`••••••••`) by default, plain text only with `?reveal=true` | API keys, passwords, secrets |
| **STATIC** | Plain text | Returned as-is | Feature flags, URLs, config values, limits |

### Environments

- Custom environments defined by super admin (e.g., `dev`, `staging`, `prod`, `eu-prod`)
- Each service+key combination can have **one value per environment**
- Environments are managed separately from settings

### Version History

- Every setting update creates a new version record
- Stores: previous value, who changed it, when, and optional change reason
- Super admin can view history and rollback to a previous version

---

## Database Schema

### `environment` table

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK, default uuid() |
| name | VARCHAR(50) | UNIQUE, NOT NULL |
| description | TEXT | Optional |
| is_active | BOOLEAN | default true |
| created_at | TIMESTAMP | default now() |
| created_by | UUID | NOT NULL |
| updated_at | TIMESTAMP | @updatedAt |
| updated_by | UUID | NOT NULL |
| deleted_at | TIMESTAMP | nullable |
| deleted_by | UUID | nullable |

### `setting` table

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK, default uuid() |
| service_name | VARCHAR(100) | NOT NULL |
| key | VARCHAR(255) | NOT NULL |
| type | VARCHAR(10) | NOT NULL, `SECURE` or `STATIC` |
| description | TEXT | Optional |
| is_active | BOOLEAN | default true |
| created_at | TIMESTAMP | default now() |
| created_by | UUID | NOT NULL |
| updated_at | TIMESTAMP | @updatedAt |
| updated_by | UUID | NOT NULL |
| deleted_at | TIMESTAMP | nullable |
| deleted_by | UUID | nullable |

**Unique constraint:** `(service_name, key)` — no duplicate keys per service.

### `setting_value` table

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PK, default uuid() |
| setting_id | UUID | FK → setting.id |
| environment_id | UUID | FK → environment.id |
| value | TEXT | NOT NULL (encrypted for SECURE type) |
| version | INTEGER | NOT NULL, auto-incremented per setting+env |
| change_reason | TEXT | Optional |
| created_at | TIMESTAMP | default now() |
| created_by | UUID | NOT NULL |

**Unique constraint:** `(setting_id, environment_id, version)` — one current value per setting per env.

### `setting_value_history` table

Same structure as `setting_value` — archived previous versions.

---

## API Endpoints

### Environments (`@ApiTags('Environments')`)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/v1/environments` | JWT + SUPER_ADMIN | Create environment |
| GET | `/v1/environments` | JWT + SUPER_ADMIN | List all environments |
| GET | `/v1/environments/:id` | JWT + SUPER_ADMIN | Get environment by ID |
| PATCH | `/v1/environments/:id` | JWT + SUPER_ADMIN | Update environment |
| DELETE | `/v1/environments/:id` | JWT + SUPER_ADMIN | Soft delete environment |

### Settings (`@ApiTags('Settings')`)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/v1/settings` | JWT + SUPER_ADMIN | Create a new setting |
| GET | `/v1/settings` | JWT + SUPER_ADMIN | List settings (filter by service_name, type) |
| GET | `/v1/settings/:id` | JWT + SUPER_ADMIN | Get setting with values across all environments |
| PATCH | `/v1/settings/:id` | JWT + SUPER_ADMIN | Update setting metadata (description, type) |
| DELETE | `/v1/settings/:id` | JWT + SUPER_ADMIN | Soft delete setting |

### Setting Values (`@ApiTags('Setting Values')`)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| PUT | `/v1/settings/:settingId/values/:environmentId` | JWT + SUPER_ADMIN | Set value for a setting in an environment (create or update) |
| GET | `/v1/settings/:settingId/values/:environmentId` | JWT + SUPER_ADMIN | Get current value (supports `?reveal=true` for SECURE) |
| GET | `/v1/settings/:settingId/values/:environmentId/history` | JWT + SUPER_ADMIN | Get version history |
| POST | `/v1/settings/:settingId/values/:environmentId/rollback/:version` | JWT + SUPER_ADMIN | Rollback to a specific version |

### Service Consumption (`@ApiTags('Service')`)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/v1/service/:serviceName/settings` | JWT (any authenticated user) | Get all STATIC settings for a service in given environment |
| GET | `/v1/service/:serviceName/settings/:key` | JWT (any authenticated user) | Get a single STATIC setting value |

Query params for service endpoints: `?environment=dev` (required).

---

## Request / Response Examples

### Create Setting

**POST** `/key-vault/v1/settings`

```json
{
  "service_name": "auth",
  "key": "SMTP_PASSWORD",
  "type": "SECURE",
  "description": "SMTP server password for sending emails"
}
```

**Response (201):**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "service_name": "auth",
  "key": "SMTP_PASSWORD",
  "type": "SECURE",
  "description": "SMTP server password for sending emails",
  "is_active": true,
  "created_at": "2026-04-24T10:30:00.000Z"
}
```

### Set Value

**PUT** `/key-vault/v1/settings/:settingId/values/:environmentId`

```json
{
  "value": "my-super-secret-password",
  "change_reason": "Rotated SMTP password for Q2 2026"
}
```

**Response (200):**

```json
{
  "id": "...",
  "setting_id": "...",
  "environment_id": "...",
  "value": "••••••••••••••",
  "version": 1,
  "change_reason": "Rotated SMTP password for Q2 2026",
  "created_at": "2026-04-24T10:35:00.000Z"
}
```

### Get Value (with reveal)

**GET** `/key-vault/v1/settings/:settingId/values/:environmentId?reveal=true`

**Response (200):**

```json
{
  "id": "...",
  "setting_id": "...",
  "environment_id": "...",
  "value": "my-super-secret-password",
  "version": 1,
  "change_reason": "Rotated SMTP password for Q2 2026",
  "created_at": "2026-04-24T10:35:00.000Z"
}
```

### Service Consumption

**GET** `/key-vault/v1/service/auth/settings?environment=dev`

**Response (200):**

```json
{
  "service_name": "auth",
  "environment": "dev",
  "settings": [
    { "key": "SMTP_HOST", "value": "smtp.mailtrap.io", "type": "STATIC" },
    { "key": "SMTP_PORT", "value": "2525", "type": "STATIC" }
  ]
}
```

> Note: Service consumption endpoint only returns **STATIC** settings. SECURE values are never exposed to consuming services.

### Rollback

**POST** `/key-vault/v1/settings/:settingId/values/:environmentId/rollback/2`

**Response (200):**

```json
{
  "id": "...",
  "setting_id": "...",
  "environment_id": "...",
  "value": "••••••••••••••",
  "version": 4,
  "change_reason": "Rolled back to version 2",
  "created_at": "2026-04-24T11:00:00.000Z"
}
```

---

## Tech Stack

Follows the approved tech stack from `.claude/rules/tech-stack.md`:

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js 20 LTS |
| Language | TypeScript 5.x (strict) |
| Framework | NestJS 11.x |
| HTTP Adapter | Fastify 5.x |
| ORM | Prisma 7.x with driver adapters |
| Database | PostgreSQL 16 |
| Encryption | Node.js `crypto` (AES-256-GCM) |
| Auth | JWT via `@app/auth-utilities` |
| Build | Rspack 1.x |
| API Docs | Swagger + Scalar |
| Testing | Jest + @nestjs/testing |
| Package Manager | pnpm workspace |

---

## Encryption Design

### AES-256-GCM for SECURE values

```
ENCRYPTION_KEY → stored in key-vault's .env (ENCRYPTION_KEY)
IV → random 12 bytes per encryption, stored prepended to ciphertext
Auth Tag → 16 bytes, stored appended to ciphertext
Storage format: base64(iv + ciphertext + authTag)
```

- Encryption key is a 32-byte hex string set via `ENCRYPTION_KEY` env var
- Each value gets a unique IV — same plaintext produces different ciphertext
- Decryption only happens on explicit `?reveal=true` request

---

## Project Structure

```
apps/key-vault/
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   ├── environments/
│   │   ├── environments.controller.ts
│   │   ├── environments.service.ts
│   │   ├── environments.module.ts
│   │   └── dto/
│   │       ├── create-environment.dto.ts
│   │       ├── update-environment.dto.ts
│   │       ├── environment-response.dto.ts
│   │       └── index.ts
│   ├── settings/
│   │   ├── settings.controller.ts
│   │   ├── settings.service.ts
│   │   ├── settings.module.ts
│   │   └── dto/
│   │       ├── create-setting.dto.ts
│   │       ├── update-setting.dto.ts
│   │       ├── setting-response.dto.ts
│   │       └── index.ts
│   ├── setting-values/
│   │   ├── setting-values.controller.ts
│   │   ├── setting-values.service.ts
│   │   ├── setting-values.module.ts
│   │   └── dto/
│   │       ├── set-value.dto.ts
│   │       ├── setting-value-response.dto.ts
│   │       └── index.ts
│   ├── service-consumption/
│   │   ├── service-consumption.controller.ts
│   │   ├── service-consumption.service.ts
│   │   ├── service-consumption.module.ts
│   │   └── dto/
│   │       ├── service-settings-response.dto.ts
│   │       └── index.ts
│   ├── encryption/
│   │   ├── encryption.service.ts
│   │   ├── encryption.module.ts
│   │   └── index.ts
│   ├── strategies/
│   │   └── jwt.strategy.ts
│   ├── prisma/
│   │   ├── prisma.module.ts
│   │   └── prisma.service.ts
│   └── common/
│       ├── enum/
│       │   ├── setting-type.ts
│       │   ├── environment.ts
│       │   └── index.ts
│       └── constants/
│           └── index.ts
├── prisma/
│   └── schema.prisma
├── prisma.config.ts
├── rspack.config.js
├── nest-cli.json
├── tsconfig.app.json
├── jest.config.js
├── .env
└── package.json
```

### New Prisma Client Package

```
packages/key-vault-prisma-client/
├── package.json          # name: "@key-vault/prisma-client"
└── src/                  # Generated by Prisma
```

---

## Infrastructure Changes

### Docker — add to `docker/init-postgres.sh`

```bash
# Key Vault Service Database
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE DATABASE key_vault_db;
    CREATE USER key_vault_admin WITH PASSWORD 'key_vault_admin_password_change_this';
    GRANT ALL PRIVILEGES ON DATABASE key_vault_db TO key_vault_admin;
    \c key_vault_db
    GRANT ALL ON SCHEMA public TO key_vault_admin;
    ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO key_vault_admin;
    ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO key_vault_admin;
EOSQL
```

### Root `tsconfig.json` — add path alias

```json
"@key-vault/prisma-client": ["packages/key-vault-prisma-client/src"],
"@key-vault/prisma-client/*": ["packages/key-vault-prisma-client/src/*"]
```

### Root `package.json` — add scripts

```json
"rspack:key-vault": "pnpm --filter key-vault exec rspack serve -c rspack.config.js",
"build:key-vault": "BUILD=1 pnpm --filter key-vault exec rspack build -c rspack.config.js"
```

### `.env` for key-vault service

```env
SERVICE_PREFIX=key-vault
PORT=3002
CORS_ORIGIN=http://localhost:3000,http://localhost:4200
CORS_ORIGIN_REGEX=^https://.*\.example\.com$
DATABASE_URL="postgresql://key_vault_admin:key_vault_admin_password_change_this@localhost:5432/key_vault_db?schema=public"
JWT_SECRET=your-jwt-secret-key-change-this
JWT_EXPIRES_IN=1h
ENCRYPTION_KEY=  # 64-char hex string (32 bytes), generate with: openssl rand -hex 32
```

---

## Testing Strategy

| Layer | Coverage Target | Tools |
|-------|----------------|-------|
| Services | 90% | Jest + @nestjs/testing |
| Controllers | 90% | Jest + @nestjs/testing |
| Encryption | 100% | Jest |
| DTOs | Validation only | class-validator |
| E2E | Happy paths | Playwright |

### Key Test Cases

- **EncryptionService**: encrypt → decrypt round-trip, masked output format
- **SettingsService**: CRUD with soft deletes, unique key constraint per service
- **SettingValuesService**: version increment, rollback, history retrieval
- **EnvironmentsService**: CRUD with soft deletes
- **ServiceConsumptionService**: only returns STATIC settings for given environment
- **Controllers**: auth guard + SUPER_ADMIN role enforcement on management endpoints
- **DTOs**: validation of all input fields

---

## Boundaries

### Always Do

- Encrypt SECURE values at rest using AES-256-GCM before storing in DB
- Mask SECURE values in all API responses unless `?reveal=true` is explicitly passed
- Require `SUPER_ADMIN` role on all management endpoints (environments, settings, setting-values)
- Filter `deleted_at: null` on every query
- Use `select` to never return unnecessary fields
- Use soft deletes — never hard delete
- Set audit fields (`created_by`, `updated_by`) from `@AuthUser()` on every write
- Use transactions for multi-step operations (e.g., archive old value + create new version)
- Follow all monorepo rules in `.claude/rules/`
- Add `@LogActivity()` on all service methods
- Add Swagger decorators on every endpoint

### Ask First About

- Adding new setting types beyond SECURE/STATIC
- Changing the encryption algorithm
- Adding RabbitMQ event publishing for setting changes
- Adding service-to-service authentication (API keys, mTLS)
- Adding caching layer (Redis) for service consumption endpoint

### Never Do

- Never expose SECURE values to consuming services (only SUPER_ADMIN can reveal)
- Never store encryption key in the database
- Never hard delete any records
- Never use `process.env` directly — always use `ConfigService`
- Never use Express — always Fastify
- Never use `nest build` — always Rspack
- Never return `password_hash` or internal audit fields in API responses
- Never allow non-SUPER_ADMIN users to manage settings

---

## Implementation Order

| Step | Description | Depends On |
|------|-------------|-----------|
| 1 | Infrastructure: Docker init script, Prisma client package, path aliases | — |
| 2 | Service scaffold: main.ts, app.module, prisma, rspack, .env, package.json | Step 1 |
| 3 | Prisma schema + migration | Step 2 |
| 4 | EncryptionService with tests | Step 2 |
| 5 | Environments CRUD with tests | Steps 3, 4 |
| 6 | Settings CRUD with tests | Steps 3, 4 |
| 7 | Setting Values (set, get, history, rollback) with tests | Steps 3, 4, 6 |
| 8 | Service Consumption endpoint with tests | Steps 3, 6, 7 |
| 9 | Swagger documentation verification | Step 8 |
| 10 | Docker rebuild + full E2E smoke test | Step 9 |

---

## Success Criteria

- [ ] Super admin can create environments and manage settings across all environments
- [ ] SECURE values are encrypted at rest and masked in responses
- [ ] SECURE values only visible with `?reveal=true` and SUPER_ADMIN role
- [ ] Every update creates a version history entry
- [ ] Rollback restores a previous version and creates a new history entry
- [ ] Service consumption endpoint returns only STATIC settings for the given environment
- [ ] All endpoints require appropriate auth (SUPER_ADMIN for management, JWT for consumption)
- [ ] All tests pass with >80% coverage
- [ ] Swagger docs available at `http://localhost:3002/key-vault/reference`
- [ ] Service starts with `pnpm rspack:key-vault`
