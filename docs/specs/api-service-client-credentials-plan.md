# Implementation Plan: API Service with Client Credentials Authentication

## Overview

Create an API service that authenticates to auth service using OAuth 2.0 Client Credentials grant and accesses keyvault service. This involves:
1. Adding `role` field to User model in auth service
2. Creating SUPER_ADMIN role and initial admin user
3. Adding admin endpoint in auth service for creating OAuth clients
4. Creating new API service with client_credentials token management and keyvault proxy

## Architecture Decisions

1. **User role stored in database:** Add `role` field to `User` model — single string field with values like `USER`, `ADMIN`, `SUPER_ADMIN`
2. **Client credentials for API service only:** The API service uses client_credentials grant (no user context), while admin operations use user JWT with role
3. **Stateless API service:** No local database, credentials stored in environment variables
4. **Token refresh on-demand:** API service refreshes token when expired, caches locally

## Task List

### Phase 1: Auth Service — User Role Foundation

#### Task 1: Add `role` field to User model

**Description:** Add a `role` field to the User model in auth service Prisma schema and create a migration.

**Acceptance criteria:**
- [ ] User model has `role` field with type `String`, default value `USER`
- [ ] Migration runs successfully: `cd apps/auth && DATABASE_URL="..." pnpm prisma migrate dev --name add_user_role`
- [ ] Prisma client regenerated: `cd apps/auth && pnpm prisma generate`

**Verification:**
- [ ] `packages/auth-prisma-client/src` updated with new schema types

**Dependencies:** None

**Files touched:**
- `apps/auth/prisma/schema.prisma`

**Impact analysis:** Low — adding optional field to existing model

**Estimated scope:** S (1 file schema change + migration)

---

#### Task 2: Seed SUPER_ADMIN user

**Description:** Create a seed script or SQL to create the first SUPER_ADMIN user. This user will be used to create OAuth clients via the admin endpoint.

**Acceptance criteria:**
- [ ] SUPER_ADMIN user exists in database with proper password hash
- [ ] User has `role: 'SUPER_ADMIN'`
- [ ] User can authenticate (sign in) and receive JWT with role claim

**Verification:**
- [ ] Can sign in with admin credentials and receive JWT
- [ ] JWT payload includes `roles: ['SUPER_ADMIN']`

**Dependencies:** Task 1 complete

**Files touched:**
- `apps/auth/prisma/seed.sql` or similar seed script
- OR add to existing migration

**Estimated scope:** S (seed data only)

---

### Phase 2: Auth Service — Admin Endpoint

#### Task 3: Add admin OAuth client creation endpoint

**Description:** Add `POST /auth/v1/oauth/admin/clients` endpoint protected by `JwtAuthGuard` + `@Roles('SUPER_ADMIN')`. This endpoint reuses the existing `ClientService.registerClient()` method.

**Acceptance criteria:**
- [ ] `POST /auth/v1/oauth/admin/clients` requires valid JWT with SUPER_ADMIN role
- [ ] Returns 401 if no token provided
- [ ] Returns 403 if token lacks SUPER_ADMIN role
- [ ] Successfully creates OAuth client when admin calls it
- [ ] Returns `client_id` and `client_secret` (secret shown only once)

**Verification:**
- [ ] Swagger docs show new endpoint at `/auth/v1/oauth/admin/clients`
- [ ] Manual test: Create OAuth client with admin token, verify client appears in database

**Dependencies:** Task 2 complete

**Files touched:**
- `apps/auth/src/oauth/oauth.controller.ts` (add new endpoint)
- `apps/auth/src/oauth/oauth.module.ts` (if needed for imports)

**Impact analysis:** Medium — adding new endpoint to existing controller

**Estimated scope:** M (1 controller endpoint + guards)

---

### Phase 3: API Service — Foundation

#### Task 4: Create API service structure

**Description:** Create the new `apps/api` service with all necessary boilerplate: main.ts, app.module.ts, rspack.config.js, tsconfig, package.json, prisma config.

**Acceptance criteria:**
- [ ] `apps/api` directory created with complete NestJS service structure
- [ ] Service starts with Rspack: `pnpm rspack:api`
- [ ] Swagger docs accessible at `/api/api`
- [ ] Health check endpoint at `/api/health`

**Verification:**
- [ ] `pnpm rspack:api` starts successfully on port 3000
- [ ] `http://localhost:3000/api/api` shows Swagger docs
- [ ] `http://localhost:3000/api/health` returns health status

**Dependencies:** None (new service)

**Files touched:** (all new files)
- `apps/api/src/main.ts`
- `apps/api/src/app.module.ts`
- `apps/api/rspack.config.js`
- `apps/api/tsconfig.app.json`
- `apps/api/package.json`
- `apps/api/prisma.config.ts`
- `apps/api/.env`
- `apps/api/nest-cli.json`
- `apps/api/jest.config.js`

**Estimated scope:** L (entire service boilerplate)

---

#### Task 5: Create Auth module with client credentials flow

**Description:** Create auth module in API service with:
- `ClientCredentialsDto` for token request
- `TokenResponseDto` for token response
- `AuthService` with `getAccessToken()` and `refreshAccessToken()` methods
- `AuthController` with `POST /api/v1/auth/token` endpoint

**Acceptance criteria:**
- [ ] `POST /api/v1/auth/token` accepts client credentials and returns JWT
- [ ] `AuthService.getAccessToken()` caches token and refreshes when expired
- [ ] DTOs have proper Swagger decorators and validation

**Verification:**
- [ ] `cd apps/api && pnpm test` passes for auth module
- [ ] Manual test: Call token endpoint with valid credentials, receive JWT

**Dependencies:** Task 4 complete

**Files touched:**
- `apps/api/src/auth/auth.module.ts`
- `apps/api/src/auth/auth.controller.ts`
- `apps/api/src/auth/auth.service.ts`
- `apps/api/src/auth/dto/client-credentials.dto.ts`
- `apps/api/src/auth/dto/token-response.dto.ts`
- `apps/api/src/auth/dto/index.ts`

**Estimated scope:** M (auth module with DTOs and service)

---

### Phase 4: API Service — KeyVault Proxy

#### Task 6: Create Settings module (keyvault proxy)

**Description:** Create settings module that proxies requests to keyvault service:
- `SettingsService` fetches from keyvault using API service's JWT
- `SettingsController` exposes `GET /api/v1/settings/:serviceName` and `GET /api/v1/settings/:serviceName/:key`

**Acceptance criteria:**
- [ ] `GET /api/v1/settings/:serviceName?environment=X` returns settings from keyvault
- [ ] `GET /api/v1/settings/:serviceName/:key?environment=X` returns single setting
- [ ] Bearer token is passed correctly to keyvault service
- [ ] Returns 401 if API service can't get valid token

**Verification:**
- [ ] `cd apps/api && pnpm test` passes for settings module
- [ ] Integration test: API service can fetch settings from keyvault when credentials are configured

**Dependencies:** Task 5 complete

**Files touched:**
- `apps/api/src/settings/settings.module.ts`
- `apps/api/src/settings/settings.controller.ts`
- `apps/api/src/settings/settings.service.ts`
- `apps/api/src/settings/dto/service-settings-response.dto.ts`
- `apps/api/src/settings/dto/index.ts`

**Estimated scope:** M (settings proxy module)

---

### Phase 5: Integration & Documentation

#### Task 7: Integration test and verification

**Description:** End-to-end test of the complete flow:
1. Super admin creates OAuth client via admin endpoint
2. API service gets client_id and client_secret
3. API service uses credentials to get JWT from auth
4. API service fetches settings from keyvault

**Acceptance criteria:**
- [ ] Super admin can create OAuth client with `client_credentials` grant and `keyvault:read` scope
- [ ] API service successfully obtains access token
- [ ] API service successfully fetches settings from keyvault
- [ ] Settings are returned to API consumer

**Verification:**
- [ ] Manual end-to-end test passes
- [ ] All unit tests pass: `cd apps/auth && pnpm test` and `cd apps/api && pnpm test`

**Dependencies:** Tasks 3, 5, 6 complete

**Estimated scope:** M (integration verification)

---

#### Task 8: Documentation updates

**Description:** Update documentation as required by `documentation-updates.md` rule.

**Acceptance criteria:**
- [ ] `docs/services/auth/README.md` updated with new admin endpoint
- [ ] `docs/services/api/README.md` (new) created with API service structure
- [ ] `docs/architecture/README.md` updated with API service entry

**Dependencies:** Tasks 3, 4, 5, 6 complete

**Files touched:**
- `docs/services/auth/README.md`
- `docs/services/api/README.md` (new)
- `docs/architecture/README.md`

**Estimated scope:** S (documentation only)

---

## Checkpoints

### Checkpoint: After Task 3 (Auth Admin Endpoint)
- [ ] `pnpm test` passes in auth service
- [ ] `pnpm build:auth` succeeds
- [ ] Admin endpoint creates OAuth client when called with SUPER_ADMIN token
- [ ] Endpoint returns 401/403 when called without proper auth

### Checkpoint: After Task 4 (API Service Structure)
- [ ] `pnpm rspack:api` starts without errors
- [ ] Swagger docs accessible at `http://localhost:3000/api/api`
- [ ] Health check works at `http://localhost:3000/api/health`

### Checkpoint: After Task 6 (API Service Complete)
- [ ] `pnpm test` passes in API service
- [ ] `pnpm build:api` succeeds
- [ ] Token endpoint works with client credentials
- [ ] Settings proxy successfully fetches from keyvault

### Checkpoint: Final
- [ ] All tests pass in both services
- [ ] End-to-end flow works: admin creates client → API gets token → API reads keyvault
- [ ] Documentation updated
- [ ] Ready for `/review`

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| SUPER_ADMIN user creation | High | Create seed script with clear instructions; test manually |
| Token refresh race conditions | Medium | Use mutex or check expiration before each call |
| KeyVault service unavailable | Medium | API service returns 503 with appropriate error |
| Client secret exposure in logs | High | Never log client_secret; use safe error messages |

## Open Questions

1. ~~How to create the first SUPER_ADMIN user?~~ **DECIDED: Direct DB insertion.** The operator will create the first SUPER_ADMIN user directly via SQL or Prisma Studio after migration runs.

2. **What redirect_uris should API service use?** The client_credentials grant doesn't use redirect URIs, but the schema requires at least an empty array.
