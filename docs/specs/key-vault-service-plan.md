# Key Vault Service — Implementation Plan

## Impact Analysis

This is a **new service** — blast radius on existing code is minimal.

### Existing Files Modified

| File | Change | Risk |
|------|--------|------|
| `tsconfig.json` (root) | Add `@key-vault/prisma-client` path alias | LOW — additive only |
| `package.json` (root) | Add `rspack:key-vault`, `build:key-vault` scripts | LOW — additive only |
| `docker/init-postgres.sh` | Add `key_vault_db` database + user | LOW — additive only |

### New Files Created (~35 files)

| Directory | Files | Purpose |
|-----------|-------|---------|
| `apps/key-vault/` | ~25 files | Service scaffold + 4 feature modules |
| `packages/key-vault-prisma-client/` | 1 file | Prisma client package |
| `docs/services/key-vault/` | 1 file | Service documentation |

**No existing service code is modified.** The auth service, shared libraries, and infrastructure are untouched.

---

## Dependency Graph

```
┌─────────────────────────────────────────────────────────┐
│ Phase 1: Infrastructure + Scaffold                      │
│ docker/init-postgres.sh                                 │
│ packages/key-vault-prisma-client/                       │
│ tsconfig.json + package.json (root)                     │
│ apps/key-vault/ scaffold (main, app.module, prisma,     │
│   rspack, .env, package.json, nest-cli, jest, tsconfig) │
│ apps/key-vault/prisma/schema.prisma                     │
└──────────────────────┬──────────────────────────────────┘
                       │
         ┌─────────────┼─────────────────┐
         ▼             ▼                 ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────────┐
│ Phase 2:     │ │ Phase 3:     │ │ Phase 4:         │
│ Encryption   │ │ Environments │ │ Settings         │
│ (isolated)   │ │ CRUD         │ │ CRUD             │
└──────┬───────┘ └──────┬───────┘ └──────┬───────────┘
       │                │                │
       └────────────────┼────────────────┘
                        ▼
              ┌──────────────────┐
              │ Phase 5:         │
              │ Setting Values   │
              │ (set/get/history │
              │  /rollback)      │
              └────────┬─────────┘
                       ▼
              ┌──────────────────┐
              │ Phase 6:         │
              │ Service          │
              │ Consumption      │
              └────────┬─────────┘
                       ▼
              ┌──────────────────┐
              │ Phase 7:         │
              │ Integration      │
              │ Verification     │
              └──────────────────┘
```

---

## Vertical Slice Plan

### Slice 1 — Infrastructure + Service Scaffold

**Goal:** Service boots, connects to its own database, Swagger UI visible at `http://localhost:3002/key-vault/reference`.

**Files to create/modify:**

| File | Action | Template From |
|------|--------|---------------|
| `docker/init-postgres.sh` | MODIFY — append key_vault_db block | Existing file |
| `packages/key-vault-prisma-client/package.json` | CREATE | `packages/auth-prisma-client/package.json` |
| `tsconfig.json` (root) | MODIFY — add alias | Existing file |
| `package.json` (root) | MODIFY — add scripts | Existing file |
| `apps/key-vault/package.json` | CREATE | `apps/auth/package.json` (trimmed) |
| `apps/key-vault/tsconfig.app.json` | CREATE | `apps/auth/tsconfig.app.json` |
| `apps/key-vault/nest-cli.json` | CREATE | `apps/auth/nest-cli.json` (update entryFile) |
| `apps/key-vault/jest.config.js` | CREATE | `apps/auth/jest.config.js` (update mapper) |
| `apps/key-vault/rspack.config.js` | CREATE | `apps/auth/rspack.config.js` (update alias) |
| `apps/key-vault/.env` | CREATE | New |
| `apps/key-vault/prisma.config.ts` | CREATE | `apps/auth/prisma.config.ts` |
| `apps/key-vault/prisma/schema.prisma` | CREATE | New — all 4 models |
| `apps/key-vault/src/main.ts` | CREATE | `apps/auth/src/main.ts` (adapt) |
| `apps/key-vault/src/app.module.ts` | CREATE | `apps/auth/src/app.module.ts` (adapt) |
| `apps/key-vault/src/prisma/prisma.service.ts` | CREATE | `apps/auth/src/prisma/prisma.service.ts` |
| `apps/key-vault/src/prisma/prisma.module.ts` | CREATE | `apps/auth/src/prisma/prisma.module.ts` |
| `apps/key-vault/src/strategies/jwt.strategy.ts` | CREATE | New — validate-only (no DB lookup) |

**Acceptance Criteria:**
- `pnpm rspack:key-vault` starts the service on port 3002
- `curl http://localhost:3002/key-vault/api-json` returns Swagger JSON
- `curl http://localhost:3002/key-vault/reference` shows Scalar UI
- Prisma migration runs: `cd apps/key-vault && DATABASE_URL="..." pnpm prisma migrate dev --name init`
- Database has 4 tables: `environment`, `setting`, `setting_value`, `setting_value_history`

**Verification:**
```bash
pnpm rspack:key-vault          # Starts without errors
curl http://localhost:3002/key-vault/api-json  # Returns valid JSON
```

---

### Slice 2 — Encryption Module

**Goal:** EncryptionService encrypts, decrypts, and masks values. 100% test coverage.

**Files to create:**

| File | Purpose |
|------|---------|
| `apps/key-vault/src/encryption/encryption.service.ts` | AES-256-GCM encrypt/decrypt/mask |
| `apps/key-vault/src/encryption/encryption.module.ts` | Global module providing EncryptionService |
| `apps/key-vault/src/encryption/index.ts` | Barrel export |
| `apps/key-vault/src/encryption/encryption.service.spec.ts` | Full test suite |
| `apps/key-vault/src/common/enum/setting-type.ts` | `SECURE` / `STATIC` enum |

**Key Methods:**
- `encrypt(plaintext: string): string` — AES-256-GCM, returns base64(iv + ciphertext + authTag)
- `decrypt(encrypted: string): string` — reverse of encrypt
- `mask(): string` — returns `'••••••••'`
- `isEncrypted(value: string): boolean` — checks if value appears encrypted (for masking logic)

**Acceptance Criteria:**
- `encrypt('hello')` then `decrypt(result)` returns `'hello'`
- `mask()` returns `'••••••••'`
- Same plaintext encrypted twice produces different ciphertext (unique IV)
- All tests pass

**Verification:**
```bash
cd apps/key-vault && pnpm test -- encryption.service.spec
```

---

### Slice 3 — Environments CRUD

**Goal:** Full CRUD for environments. SUPER_ADMIN only.

**Vertical path:** DTO → Service → Controller → Module → Tests

**Files to create:**

| File | Purpose |
|------|---------|
| `apps/key-vault/src/environments/dto/create-environment.dto.ts` | Create validation |
| `apps/key-vault/src/environments/dto/update-environment.dto.ts` | Update validation |
| `apps/key-vault/src/environments/dto/environment-response.dto.ts` | Response shape |
| `apps/key-vault/src/environments/dto/index.ts` | Barrel |
| `apps/key-vault/src/environments/environments.service.ts` | Business logic |
| `apps/key-vault/src/environments/environments.controller.ts` | HTTP handlers |
| `apps/key-vault/src/environments/environments.module.ts` | NestJS module |
| `apps/key-vault/src/environments/environments.service.spec.ts` | Service tests |
| `apps/key-vault/src/environments/environments.controller.spec.ts` | Controller tests |

**Endpoints:**
- `POST /v1/environments` — create
- `GET /v1/environments` — list all (paginated)
- `GET /v1/environments/:id` — get by ID
- `PATCH /v1/environments/:id` — update
- `DELETE /v1/environments/:id` — soft delete

**Auth:** All endpoints require `@UseGuards(JwtAuthGuard, RolesGuard)` + `@Roles('SUPER_ADMIN')`

**Acceptance Criteria:**
- Create environment with unique name
- List returns paginated results
- Get by ID returns single environment
- Update changes name/description
- Soft delete sets `deleted_at` + `deleted_by`
- P2002 unique constraint throws `ConflictException`
- All endpoints require JWT + SUPER_ADMIN role
- Tests pass with >80% coverage

**Verification:**
```bash
cd apps/key-vault && pnpm test -- environments
```

---

### Slice 4 — Settings CRUD

**Goal:** Full CRUD for setting definitions. SUPER_ADMIN only.

**Files to create:**

| File | Purpose |
|------|---------|
| `apps/key-vault/src/settings/dto/create-setting.dto.ts` | Create validation |
| `apps/key-vault/src/settings/dto/update-setting.dto.ts` | Update validation |
| `apps/key-vault/src/settings/dto/setting-response.dto.ts` | Response shape |
| `apps/key-vault/src/settings/dto/index.ts` | Barrel |
| `apps/key-vault/src/settings/settings.service.ts` | Business logic |
| `apps/key-vault/src/settings/settings.controller.ts` | HTTP handlers |
| `apps/key-vault/src/settings/settings.module.ts` | NestJS module |
| `apps/key-vault/src/settings/settings.service.spec.ts` | Service tests |
| `apps/key-vault/src/settings/settings.controller.spec.ts` | Controller tests |

**Endpoints:**
- `POST /v1/settings` — create (service_name + key unique pair)
- `GET /v1/settings` — list with filters (service_name, type, search)
- `GET /v1/settings/:id` — get by ID with current values across environments
- `PATCH /v1/settings/:id` — update metadata
- `DELETE /v1/settings/:id` — soft delete (cascades to values)

**Acceptance Criteria:**
- Create setting with unique (service_name, key) pair
- Filter by `service_name`, `type`, search
- Get by ID returns setting with all environment values
- Soft delete sets `deleted_at` + `deleted_by`
- P2002 on (service_name, key) throws `ConflictException`
- All endpoints require JWT + SUPER_ADMIN role
- Tests pass with >80% coverage

**Verification:**
```bash
cd apps/key-vault && pnpm test -- settings
```

---

### Slice 5 — Setting Values (Set/Get/History/Rollback)

**Goal:** Manage values per setting per environment with full version history.

**Files to create:**

| File | Purpose |
|------|---------|
| `apps/key-vault/src/setting-values/dto/set-value.dto.ts` | Set value validation |
| `apps/key-vault/src/setting-values/dto/setting-value-response.dto.ts` | Response shape |
| `apps/key-vault/src/setting-values/dto/index.ts` | Barrel |
| `apps/key-vault/src/setting-values/setting-values.service.ts` | Business logic + history |
| `apps/key-vault/src/setting-values/setting-values.controller.ts` | HTTP handlers |
| `apps/key-vault/src/setting-values/setting-values.module.ts` | NestJS module |
| `apps/key-vault/src/setting-values/setting-values.service.spec.ts` | Service tests |
| `apps/key-vault/src/setting-values/setting-values.controller.spec.ts` | Controller tests |

**Endpoints:**
- `PUT /v1/settings/:settingId/values/:environmentId` — create or update value
- `GET /v1/settings/:settingId/values/:environmentId` — get current value (supports `?reveal=true`)
- `GET /v1/settings/:settingId/values/:environmentId/history` — version history
- `POST /v1/settings/:settingId/values/:environmentId/rollback/:version` — rollback

**Key Logic:**
- On **set**: if value exists, archive current to `setting_value_history`, increment version
- On **get**: SECURE values masked by default, decrypted only with `?reveal=true`
- On **rollback**: copy target version value, archive current, create new version with rollback reason
- Version auto-increments per (setting_id, environment_id)

**Acceptance Criteria:**
- First set creates version 1
- Second set archives version 1 to history, creates version 2
- SECURE values encrypted at rest, masked in response
- `?reveal=true` decrypts SECURE values
- STATIC values returned as-is (no encryption, no masking)
- History returns all previous versions (paginated)
- Rollback creates new version with previous value
- All operations in transactions
- Tests pass with >80% coverage

**Verification:**
```bash
cd apps/key-vault && pnpm test -- setting-values
```

---

### Slice 6 — Service Consumption

**Goal:** Other services can fetch their STATIC settings by environment.

**Files to create:**

| File | Purpose |
|------|---------|
| `apps/key-vault/src/service-consumption/dto/service-settings-response.dto.ts` | Response shape |
| `apps/key-vault/src/service-consumption/dto/index.ts` | Barrel |
| `apps/key-vault/src/service-consumption/service-consumption.service.ts` | Query logic |
| `apps/key-vault/src/service-consumption/service-consumption.controller.ts` | HTTP handlers |
| `apps/key-vault/src/service-consumption/service-consumption.module.ts` | NestJS module |
| `apps/key-vault/src/service-consumption/service-consumption.service.spec.ts` | Service tests |
| `apps/key-vault/src/service-consumption/service-consumption.controller.spec.ts` | Controller tests |

**Endpoints:**
- `GET /v1/service/:serviceName/settings?environment=dev` — all STATIC settings
- `GET /v1/service/:serviceName/settings/:key?environment=dev` — single setting

**Auth:** `@UseGuards(JwtAuthGuard)` only — any authenticated user. No role requirement.

**Key Logic:**
- Only returns `type = 'STATIC'` settings
- SECURE settings are **never** exposed
- `environment` query param is required
- Returns key-value pairs for easy consumption

**Acceptance Criteria:**
- Returns only STATIC settings for given service and environment
- SECURE settings excluded from results
- `environment` query param required (400 if missing)
- Returns 404 if service name not found
- Requires JWT auth (no specific role)
- Tests pass with >80% coverage

**Verification:**
```bash
cd apps/key-vault && pnpm test -- service-consumption
```

---

### Slice 7 — Integration Verification

**Goal:** Full service works end-to-end, Docker rebuild, Swagger docs complete.

**Steps:**
1. Rebuild PostgreSQL Docker to create `key_vault_db`
2. Run full Prisma migration
3. Verify all Swagger docs at `http://localhost:3002/key-vault/reference`
4. Run full test suite: `cd apps/key-vault && pnpm test`
5. Verify coverage >80%
6. Add service documentation: `docs/services/key-vault/README.md`

**Acceptance Criteria:**
- `docker compose down -v && docker compose up -d postgres` creates `key_vault_db`
- All tests pass
- Coverage >80%
- Swagger UI shows all 13 endpoints across 4 tags
- Service README created

**Verification:**
```bash
cd apps/key-vault && pnpm test:cov
```

---

## Checkpoints

| After Slice | Checkpoint | Command |
|-------------|-----------|---------|
| Slice 1 | Service boots + Swagger works | `pnpm rspack:key-vault` then `curl http://localhost:3002/key-vault/api-json` |
| Slice 2 | Encryption tests pass | `cd apps/key-vault && pnpm test -- encryption` |
| Slice 3 | Environment CRUD works | `cd apps/key-vault && pnpm test -- environments` |
| Slice 4 | Settings CRUD works | `cd apps/key-vault && pnpm test -- settings` |
| Slice 5 | Values + history + rollback works | `cd apps/key-vault && pnpm test -- setting-values` |
| Slice 6 | Service consumption works | `cd apps/key-vault && pnpm test -- service-consumption` |
| Slice 7 | Full integration verified | `cd apps/key-vault && pnpm test:cov` |

## Risk Mitigation

| Risk | Mitigation |
|------|-----------|
| Prisma 7 driver adapter issues | Replicate exact auth service pattern |
| Encryption key management | Loaded from `.env` via ConfigService, never in DB |
| Version numbering race conditions | Use Prisma `$transaction` + manual version increment |
| Docker init script conflicts | Append only — never modify existing blocks |
| Path alias mismatch | Update both `tsconfig.json` AND `rspack.config.js` simultaneously |
