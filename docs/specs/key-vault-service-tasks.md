# Key Vault Service — Task Breakdown

## Task Dependency Graph

```
T1 ──► T2 ──► T3 ──► T4 ──► T5 ──► T6 ──► T7
(infra) (encr) (envs) (sets) (vals) (cons) (integ)
```

---

## T1: Infrastructure + Service Scaffold

**Goal:** Service boots, connects to database, Swagger UI accessible.

### Subtasks

| # | Subtask | Files | Template From |
|---|---------|-------|---------------|
| 1.1 | Create Prisma client package | `packages/key-vault-prisma-client/package.json` | `packages/auth-prisma-client/package.json` |
| 1.2 | Add Docker database init block | `docker/init-postgres.sh` (MODIFY) | Existing file |
| 1.3 | Add root config aliases | `tsconfig.json` (MODIFY), `package.json` (MODIFY) | Existing files |
| 1.4 | Create service `package.json` | `apps/key-vault/package.json` | `apps/auth/package.json` (trimmed — no frontend deps) |
| 1.5 | Create service config files | `apps/key-vault/tsconfig.app.json`, `nest-cli.json`, `jest.config.js` | Auth equivalents |
| 1.6 | Create `.env` | `apps/key-vault/.env` | New |
| 1.7 | Create Prisma config + schema | `apps/key-vault/prisma.config.ts`, `apps/key-vault/prisma/schema.prisma` | Auth equivalents |
| 1.8 | Create PrismaService + Module | `apps/key-vault/src/prisma/prisma.service.ts`, `prisma.module.ts` | Auth equivalents (change import to `@key-vault/prisma-client`) |
| 1.9 | Create JWT strategy | `apps/key-vault/src/strategies/jwt.strategy.ts` | New — validate-only pattern |
| 1.10 | Create `main.ts` | `apps/key-vault/src/main.ts` | `apps/auth/src/main.ts` (adapt port/prefix) |
| 1.11 | Create `app.module.ts` | `apps/key-vault/src/app.module.ts` | `apps/auth/src/app.module.ts` (adapt) |
| 1.12 | Create rspack config | `apps/key-vault/rspack.config.js` | `apps/auth/rspack.config.js` (update alias) |
| 1.13 | Create common enums | `apps/key-vault/src/common/enum/setting-type.ts`, `index.ts` | New |
| 1.14 | Run Prisma migration | — | — |
| 1.15 | Rebuild Docker PostgreSQL | — | `docker compose down -v && docker compose up -d postgres` |

### Acceptance Criteria

- [ ] `pnpm rspack:key-vault` starts service on port 3002
- [ ] `curl http://localhost:3002/key-vault/api-json` returns Swagger JSON
- [ ] `curl http://localhost:3002/key-vault/reference` returns HTML (Scalar UI)
- [ ] Prisma migration creates 4 tables: `environment`, `setting`, `setting_value`, `setting_value_history`
- [ ] `pnpm test` runs (0 tests, no errors)

### Verification

```bash
# Rebuild PostgreSQL with new database
cd docker && docker compose down -v && docker compose up -d postgres

# Generate Prisma client + migrate
cd apps/key-vault
DATABASE_URL="postgresql://key_vault_admin:key_vault_admin_password_change_this@localhost:5432/key_vault_db?schema=public" pnpm prisma migrate dev --name init
pnpm prisma generate

# Start service
pnpm rspack:key-vault

# Verify Swagger
curl http://localhost:3002/key-vault/api-json
```

---

## T2: Encryption Module

**Goal:** AES-256-GCM encrypt/decrypt/mask with 100% test coverage.

### Subtasks

| # | Subtask | Files |
|---|---------|-------|
| 2.1 | Write EncryptionService tests (RED) | `apps/key-vault/src/encryption/encryption.service.spec.ts` |
| 2.2 | Implement EncryptionService (GREEN) | `apps/key-vault/src/encryption/encryption.service.ts` |
| 2.3 | Create EncryptionModule | `apps/key-vault/src/encryption/encryption.module.ts` |
| 2.4 | Create barrel export | `apps/key-vault/src/encryption/index.ts` |
| 2.5 | Register in AppModule | `apps/key-vault/src/app.module.ts` (MODIFY) |

### Acceptance Criteria

- [ ] `encrypt('hello')` → base64 string
- [ ] `decrypt(encrypt('hello'))` → `'hello'`
- [ ] `mask()` → `'••••••••'`
- [ ] Same plaintext encrypted twice → different ciphertext
- [ ] All tests pass
- [ ] Coverage = 100% for encryption module

### Verification

```bash
cd apps/key-vault && pnpm test -- encryption.service.spec
```

---

## T3: Environments CRUD

**Goal:** Full CRUD for custom environments. SUPER_ADMIN only.

### Subtasks

| # | Subtask | Files |
|---|---------|-------|
| 3.1 | Create DTOs + tests | `apps/key-vault/src/environments/dto/*.ts` |
| 3.2 | Write EnvironmentsService tests (RED) | `apps/key-vault/src/environments/environments.service.spec.ts` |
| 3.3 | Implement EnvironmentsService (GREEN) | `apps/key-vault/src/environments/environments.service.ts` |
| 3.4 | Write EnvironmentsController tests (RED) | `apps/key-vault/src/environments/environments.controller.spec.ts` |
| 3.5 | Implement EnvironmentsController (GREEN) | `apps/key-vault/src/environments/environments.controller.ts` |
| 3.6 | Create EnvironmentsModule | `apps/key-vault/src/environments/environments.module.ts` |
| 3.7 | Register in AppModule | `apps/key-vault/src/app.module.ts` (MODIFY) |

### Acceptance Criteria

- [ ] `POST /v1/environments` creates environment (201)
- [ ] `GET /v1/environments` returns paginated list
- [ ] `GET /v1/environments/:id` returns single environment
- [ ] `PATCH /v1/environments/:id` updates name/description
- [ ] `DELETE /v1/environments/:id` soft deletes
- [ ] Duplicate name returns 409 ConflictException
- [ ] All endpoints require JWT + SUPER_ADMIN role (401/403 without)
- [ ] `deleted_at: null` filter applied on all reads
- [ ] `created_by` / `updated_by` set from `@AuthUser()`
- [ ] `@LogActivity()` on all service methods
- [ ] All tests pass with >80% coverage

### Verification

```bash
cd apps/key-vault && pnpm test -- environments
```

---

## T4: Settings CRUD

**Goal:** Full CRUD for setting definitions. SUPER_ADMIN only.

### Subtasks

| # | Subtask | Files |
|---|---------|-------|
| 4.1 | Create DTOs + tests | `apps/key-vault/src/settings/dto/*.ts` |
| 4.2 | Write SettingsService tests (RED) | `apps/key-vault/src/settings/settings.service.spec.ts` |
| 4.3 | Implement SettingsService (GREEN) | `apps/key-vault/src/settings/settings.service.ts` |
| 4.4 | Write SettingsController tests (RED) | `apps/key-vault/src/settings/settings.controller.spec.ts` |
| 4.5 | Implement SettingsController (GREEN) | `apps/key-vault/src/settings/settings.controller.ts` |
| 4.6 | Create SettingsModule | `apps/key-vault/src/settings/settings.module.ts` |
| 4.7 | Register in AppModule | `apps/key-vault/src/app.module.ts` (MODIFY) |

### Acceptance Criteria

- [ ] `POST /v1/settings` creates setting with unique (service_name, key) (201)
- [ ] `GET /v1/settings` returns paginated list with filters (service_name, type, search)
- [ ] `GET /v1/settings/:id` returns setting with all current environment values
- [ ] `PATCH /v1/settings/:id` updates description/type
- [ ] `DELETE /v1/settings/:id` soft deletes
- [ ] Duplicate (service_name, key) returns 409 ConflictException
- [ ] All endpoints require JWT + SUPER_ADMIN role
- [ ] Soft delete filter on all reads
- [ ] Audit fields set from `@AuthUser()`
- [ ] `@LogActivity()` on all service methods
- [ ] All tests pass with >80% coverage

### Verification

```bash
cd apps/key-vault && pnpm test -- settings
```

---

## T5: Setting Values (Set/Get/History/Rollback)

**Goal:** Manage values per setting per environment with version history.

### Subtasks

| # | Subtask | Files |
|---|---------|-------|
| 5.1 | Create DTOs + tests | `apps/key-vault/src/setting-values/dto/*.ts` |
| 5.2 | Write SettingValuesService tests (RED) | `apps/key-vault/src/setting-values/setting-values.service.spec.ts` |
| 5.3 | Implement SettingValuesService (GREEN) | `apps/key-vault/src/setting-values/setting-values.service.ts` |
| 5.4 | Write SettingValuesController tests (RED) | `apps/key-vault/src/setting-values/setting-values.controller.spec.ts` |
| 5.5 | Implement SettingValuesController (GREEN) | `apps/key-vault/src/setting-values/setting-values.controller.ts` |
| 5.6 | Create SettingValuesModule | `apps/key-vault/src/setting-values/setting-values.module.ts` |
| 5.7 | Register in AppModule | `apps/key-vault/src/app.module.ts` (MODIFY) |

### Acceptance Criteria

- [ ] `PUT /v1/settings/:id/values/:envId` creates version 1 on first set
- [ ] Subsequent sets archive current to `setting_value_history` and increment version
- [ ] SECURE values encrypted before storage, masked (`'••••••••'`) in response
- [ ] `GET ?reveal=true` decrypts and returns SECURE values in plain text
- [ ] STATIC values stored and returned as-is (no encryption)
- [ ] `GET .../history` returns paginated version history
- [ ] `POST .../rollback/:version` creates new version with target value
- [ ] All multi-step operations use `$transaction`
- [ ] All endpoints require JWT + SUPER_ADMIN role
- [ ] `@LogActivity()` on all service methods
- [ ] All tests pass with >80% coverage

### Verification

```bash
cd apps/key-vault && pnpm test -- setting-values
```

---

## T6: Service Consumption Endpoint

**Goal:** Other services can fetch their STATIC settings by environment.

### Subtasks

| # | Subtask | Files |
|---|---------|-------|
| 6.1 | Create DTOs + tests | `apps/key-vault/src/service-consumption/dto/*.ts` |
| 6.2 | Write ServiceConsumptionService tests (RED) | `apps/key-vault/src/service-consumption/service-consumption.service.spec.ts` |
| 6.3 | Implement ServiceConsumptionService (GREEN) | `apps/key-vault/src/service-consumption/service-consumption.service.ts` |
| 6.4 | Write ServiceConsumptionController tests (RED) | `apps/key-vault/src/service-consumption/service-consumption.controller.spec.ts` |
| 6.5 | Implement ServiceConsumptionController (GREEN) | `apps/key-vault/src/service-consumption/service-consumption.controller.ts` |
| 6.6 | Create ServiceConsumptionModule | `apps/key-vault/src/service-consumption/service-consumption.module.ts` |
| 6.7 | Register in AppModule | `apps/key-vault/src/app.module.ts` (MODIFY) |

### Acceptance Criteria

- [ ] `GET /v1/service/:serviceName/settings?environment=dev` returns all STATIC settings
- [ ] `GET /v1/service/:serviceName/settings/:key?environment=dev` returns single setting
- [ ] SECURE settings **never** appear in results
- [ ] Missing `environment` query param returns 400 BadRequestException
- [ ] Unknown service name returns 404 NotFoundException
- [ ] Requires JWT auth (401 without token) but no role requirement
- [ ] `@LogActivity()` on all service methods
- [ ] All tests pass with >80% coverage

### Verification

```bash
cd apps/key-vault && pnpm test -- service-consumption
```

---

## T7: Integration Verification + Documentation

**Goal:** Full service verified end-to-end, documented.

### Subtasks

| # | Subtask | Files |
|---|---------|-------|
| 7.1 | Run full test suite with coverage | — |
| 7.2 | Verify Swagger docs show all 13 endpoints | — |
| 7.3 | Create service documentation | `docs/services/key-vault/README.md` |
| 7.4 | Run `pnpm lint` + `pnpm format` | — |

### Acceptance Criteria

- [ ] `cd apps/key-vault && pnpm test` — all tests pass
- [ ] `cd apps/key-vault && pnpm test:cov` — coverage >80%
- [ ] Swagger UI at `http://localhost:3002/key-vault/reference` shows 4 tags, 13 endpoints
- [ ] `docs/services/key-vault/README.md` created with all endpoints documented
- [ ] `pnpm lint` passes
- [ ] `pnpm format` applied

### Verification

```bash
cd apps/key-vault && pnpm test:cov
pnpm lint
pnpm format
```
