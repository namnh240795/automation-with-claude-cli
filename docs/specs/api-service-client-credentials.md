# Spec: API Service with Client Credentials Authentication

## Objective

Create a new **API service** (`apps/api`) that authenticates to the auth service using OAuth 2.0 **Client Credentials** grant, obtains a JWT access token, and uses that token to fetch secrets from the keyvault service.

The **super admin** creates an OAuth client (application) in the auth service and provides the `client_id` and `client_secret` to the API service operator. The API service then uses these credentials to automatically obtain access tokens.

## Target Services

| Service | Action | Description |
|---------|--------|-------------|
| `apps/auth` | **Modify** | Add new admin endpoint for creating service OAuth clients |
| `apps/api` | **Create** | New API service with client_credentials auth flow |
| `apps/key-vault` | **No change** | Already exists, accessed by API service |

## Tech Stack

- Runtime: Node.js + NestJS 11 (Fastify adapter)
- Database: PostgreSQL + Prisma 7
- Auth: JWT via `@app/auth-utilities`
- Build: Rspack
- Testing: Jest (`@nestjs/testing`)
- API Docs: Swagger + Scalar

## Architecture Flow

```
┌──────────────┐         ┌─────────────┐         ┌────────────────┐
│  Super Admin │────────▶│  Auth Svc   │         │  KeyVault Svc  │
│  (creates    │         │  POST       │         │  GET /service/ │
│   OAuth      │         │  /oauth/    │         │  {name}/       │
│   client)    │         │  register   │         │  settings      │
└──────────────┘         └─────────────┘         └────────────────┘
                                    │                      ▲
                                    │ client_credentials  │
                                    │ POST /oauth/token   │ Bearer
                                    ▼                      │
                         ┌─────────────────────────┐      │
                         │       API Service        │──────┘
                         │  (apps/api) - NEW       │
                         │                         │
                         │  - Stores client_id,    │
                         │    client_secret in env  │
                         │  - Gets JWT from auth    │
                         │  - Calls keyvault        │
                         └─────────────────────────┘
```

## API Endpoints

### Auth Service Changes

#### Existing: `POST /auth/v1/oauth/register` — Register OAuth Client (PUBLIC, unchanged)

This endpoint remains **public** — any user can self-register an OAuth client. It is not used for the API service flow.

#### NEW: `POST /auth/v1/oauth/admin/clients` — Create Service OAuth Client (ADMIN ONLY)

**New endpoint for super admins** to create OAuth clients for service accounts (like the API service). Requires JWT authentication.

**Request:**
```json
{
  "name": "api-service",
  "description": "Generic API service for accessing keyvault",
  "redirect_uris": ["http://localhost:3000/callback"],
  "scopes": ["keyvault:read"],
  "grant_types": ["client_credentials"],
  "is_confidential": true
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "client_id": "abc123def456",
  "client_secret": "super-secret-shown-only-once",
  "name": "api-service",
  "grant_types": ["client_credentials"],
  "is_confidential": true,
  "scopes": ["keyvault:read"]
}
```

> **Note:** `client_secret` is returned only once during creation. The super admin must securely provide `client_id` and `client_secret` to the API service operator.

### API Service (NEW)

#### `POST /api/v1/auth/token` — Get Access Token (Internal)

Obtain a JWT access token using client credentials.

**Request:**
```json
{
  "grant_type": "client_credentials",
  "client_id": "abc123def456",
  "client_secret": "super-secret-shown-only-once",
  "scope": "keyvault:read"
}
```

**Response (200):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "keyvault:read"
}
```

#### `GET /api/v1/settings/:serviceName` — Get Service Settings from KeyVault

Fetch settings for a given service from keyvault. Proxies to keyvault service.

**Query Parameters:**
- `environment` (required): Environment name (e.g., `development`, `production`)

**Request Headers:**
```
Authorization: Bearer <access_token>
```

**Response (200):**
```json
{
  "service_name": "my-service",
  "environment": "production",
  "settings": [
    {
      "key": "DATABASE_URL",
      "value": "postgresql://...",
      "version": 1
    },
    {
      "key": "API_KEY",
      "value": "encrypted-value",
      "version": 3
    }
  ]
}
```

#### `GET /api/v1/settings/:serviceName/:key` — Get Single Setting

**Query Parameters:**
- `environment` (required): Environment name

**Response (200):**
```json
{
  "key": "DATABASE_URL",
  "value": "postgresql://...",
  "version": 1,
  "environment": "production"
}
```

#### `POST /api/v1/auth/refresh` — Refresh Access Token

Automatically refreshes the access token when expired.

**Response (200):** Same as `/auth/token` response.

## Project Structure

### New API Service: `apps/api/`

```
apps/api/
├── src/
│   ├── main.ts                          # Fastify + Swagger bootstrap
│   ├── app.module.ts                    # Root module
│   ├── auth/
│   │   ├── auth.module.ts               # Auth module
│   │   ├── auth.controller.ts            # Token endpoints
│   │   ├── auth.service.ts               # Token management (auto-refresh)
│   │   ├── dto/
│   │   │   ├── client-credentials.dto.ts  # Token request DTO
│   │   │   └── token-response.dto.ts     # Token response DTO
│   │   └── index.ts
│   ├── settings/
│   │   ├── settings.module.ts            # Settings proxy module
│   │   ├── settings.controller.ts        # KeyVault proxy endpoints
│   │   ├── settings.service.ts           # KeyVault HTTP client
│   │   └── dto/
│   │       ├── service-settings-response.dto.ts
│   │       └── index.ts
│   ├── common/
│   │   └── dto/
│   │       └── error-response.dto.ts
│   └── prisma/
│       └── prisma.service.ts             # If API needs its own DB (future)
├── prisma/
│   └── schema.prisma                     # If API needs its own DB (future)
├── prisma.config.ts                     # Prisma 7 config
├── rspack.config.js                      # Rspack bundler config
├── .env                                  # Service configuration
└── test/
    └── app.e2e-spec.ts
```

## Code Style

### Auth Service — New Admin Client Registration Endpoint

```typescript
// apps/auth/src/oauth/oauth.controller.ts
@ApiTags('oauth')
@Controller('oauth')
export class OAuthController {
  // ... existing endpoints ...

  /**
   * Create OAuth client for service accounts (Super Admin only)
   * Super admin uses this to create API service credentials
   */
  @Post('admin/clients')
  @Version('1')
  @UseGuards(JwtAuthGuard, RolesGuard)       // Require auth + super admin role
  @Roles('SUPER_ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create OAuth client for service account (Super Admin only)' })
  @ApiOkResponse({ type: ClientResponseDto })
  async createAdminClient(@Body() dto: RegisterClientDto) {
    return this.clientService.registerClient(dto) as any;
  }
}
```

### API Service — Client Credentials DTO

```typescript
// apps/api/src/auth/dto/client-credentials.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class ClientCredentialsDto {
  @ApiProperty({ example: 'client_credentials', description: 'Grant type' })
  @IsString()
  @IsNotEmpty()
  grant_type: string;

  @ApiProperty({ example: 'abc123def456', description: 'Client ID' })
  @IsString()
  @IsNotEmpty()
  client_id: string;

  @ApiProperty({ example: 'super-secret-shown-only-once', description: 'Client secret' })
  @IsString()
  @IsNotEmpty()
  client_secret: string;

  @ApiProperty({ example: 'keyvault:read', description: 'Requested scope' })
  @IsString()
  @IsOptional()
  scope?: string;
}
```

### API Service — Auth Service

```typescript
// apps/api/src/auth/auth.service.ts
@Injectable()
export class AuthService {
  private accessToken: string | null = null;
  private tokenExpiresAt: Date | null = null;

  constructor(private readonly configService: ConfigService) {
    this.clientId = this.configService.get<string>(ENVIRONMENT.CLIENT_ID);
    this.clientSecret = this.configService.get<string>(ENVIRONMENT.CLIENT_SECRET);
    this.authServiceUrl = this.configService.get<string>(ENVIRONMENT.AUTH_SERVICE_URL);
  }

  async getAccessToken(): Promise<string> {
    // Return cached token if still valid
    if (this.accessToken && this.tokenExpiresAt && this.tokenExpiresAt > new Date()) {
      return this.accessToken;
    }

    // Refresh token
    return this.refreshAccessToken();
  }

  async refreshAccessToken(): Promise<string> {
    const response = await fetch(`${this.authServiceUrl}/auth/v1/oauth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        grant_type: 'client_credentials',
        client_id: this.clientId,
        client_secret: this.clientSecret,
        scope: 'keyvault:read',
      }),
    });

    if (!response.ok) {
      throw new UnauthorizedException('Failed to obtain access token');
    }

    const data = await response.json();
    this.accessToken = data.access_token;
    this.tokenExpiresAt = new Date(Date.now() + data.expires_in * 1000);

    return this.accessToken;
  }
}
```

### API Service — Settings Controller

```typescript
// apps/api/src/settings/settings.controller.ts
@ApiTags('Settings')
@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get(':serviceName')
  @Version('1')
  @ApiOperation({ summary: 'Get all settings for a service from keyvault' })
  @ApiBearerAuth()
  async getServiceSettings(
    @Param('serviceName') serviceName: string,
    @Query('environment') environment: string,
  ) {
    return this.settingsService.getServiceSettings(serviceName, environment);
  }
}
```

### API Service — Settings Service (KeyVault Client)

```typescript
// apps/api/src/settings/settings.service.ts
@Injectable()
export class SettingsService {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    this.keyVaultUrl = this.configService.get<string>(ENVIRONMENT.KEYVAULT_SERVICE_URL);
  }

  async getServiceSettings(serviceName: string, environment: string) {
    const token = await this.authService.getAccessToken();

    const response = await fetch(
      `${this.keyVaultUrl}/key-vault/v1/service/${serviceName}/settings?environment=${environment}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new InternalServerErrorException('Failed to fetch settings from keyvault');
    }

    return response.json();
  }
}
```

## Database Changes

### Auth Service — No schema changes needed

The `OAuthClient` model already exists with `client_secret_hash`. The existing `ClientService.registerClient()` method already:
- Generates `client_id` (random 16-byte hex)
- Generates `client_secret` (random 32-byte base64url)
- Stores `client_secret_hash` (bcrypt hash)

### API Service — No Prisma schema initially

The API service does not need its own database for this initial implementation. It stores credentials in environment variables only.

**Future consideration:** If the API service needs to track which keyvault settings it's consuming, a Prisma schema can be added later.

## Environment Variables

### Auth Service

No new environment variables needed. Existing `JWT_SECRET` and `JWT_EXPIRES_IN` are used.

### API Service

```env
# Service
SERVICE_PREFIX=api
PORT=3000

# Auth Service Integration
AUTH_SERVICE_URL=http://localhost:3001
CLIENT_ID=<provided-by-super-admin>
CLIENT_SECRET=<provided-by-super-admin>

# KeyVault Service Integration
KEYVAULT_SERVICE_URL=http://localhost:3002

# CORS
CORS_ORIGIN=http://localhost:3000
```

### KeyVault Service

No changes needed.

## Testing Strategy

### API Service Auth Module Tests

```typescript
describe('AuthService', () => {
  let service: AuthService;
  let mockConfigService: Record<string, any>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              const config: Record<string, string> = {
                AUTH_SERVICE_URL: 'http://localhost:3001',
                CLIENT_ID: 'test-client-id',
                CLIENT_SECRET: 'test-client-secret',
              };
              return config[key];
            }),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  describe('getAccessToken', () => {
    it('returns cached token when still valid', async () => {
      // Arrange
      (service as any).accessToken = 'valid-token';
      (service as any).tokenExpiresAt = new Date(Date.now() + 3600 * 1000);

      // Act
      const token = await service.getAccessToken();

      // Assert
      expect(token).toBe('valid-token');
    });

    it('refreshes token when expired', async () => {
      // Arrange
      jest.spyOn(service, 'refreshAccessToken').mockResolvedValue('new-token');

      // Act
      const token = await service.getAccessToken();

      // Assert
      expect(token).toBe('new-token');
    });
  });
});
```

### API Service Settings Module Tests

```typescript
describe('SettingsService', () => {
  let service: SettingsService;
  let mockAuthService: Record<string, any>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        SettingsService,
        {
          provide: AuthService,
          useValue: {
            getAccessToken: jest.fn().mockResolvedValue('valid-token'),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('http://localhost:3002'),
          },
        },
      ],
    }).compile();

    service = module.get<SettingsService>(SettingsService);
  });

  describe('getServiceSettings', () => {
    it('returns settings from keyvault', async () => {
      // Arrange
      const mockResponse = {
        ok: true,
        json: () => Promise.resolve({ settings: [] }),
      };
      jest.spyOn(global, 'fetch').mockResolvedValue(mockResponse as any);

      // Act
      const result = await service.getServiceSettings('my-service', 'production');

      // Assert
      expect(result).toEqual({ settings: [] });
    });
  });
});
```

### Test Coverage Targets

| Component | Target |
|-----------|--------|
| Lines | >80% |
| Branches | >75% |
| Functions | >80% |
| Statements | >80% |

## Commands

### Auth Service

```bash
# Development (Rspack)
pnpm rspack:auth

# Build
pnpm build:auth

# Database migrations
cd apps/auth && DATABASE_URL="postgresql://..." pnpm prisma migrate dev --name <name>

# Generate Prisma client
cd apps/auth && pnpm prisma generate

# Tests
cd apps/auth && pnpm test
```

### API Service (NEW)

```bash
# Development (Rspack) — once created
pnpm rspack:api

# Build — once created
pnpm build:api

# Database (if needed in future)
cd apps/api && DATABASE_URL="postgresql://..." pnpm prisma migrate dev --name <name>

# Generate Prisma client
cd apps/api && pnpm prisma generate

# Tests
cd apps/api && pnpm test
```

### KeyVault Service (unchanged)

```bash
# Development
pnpm rspack:key-vault

# Build
pnpm build:key-vault

# Tests
cd apps/key-vault && pnpm test
```

## Boundaries

### Always Do

- Use `JwtAuthGuard` + `@ApiBearerAuth()` on protected endpoints
- Use `@Version('1')` on all API service endpoints
- Use snake_case for DTO properties
- Use `@LogActivity()` on service methods
- Store `client_secret` securely (never log or expose)
- Auto-refresh tokens before expiry
- Use `ConfigService` for all environment variables
- Filter `deleted_at: null` in all queries
- Sync path aliases in both `tsconfig.json` and `rspack.config.js`

### Ask First

- Adding new endpoints to API service
- Changing token refresh interval
- Adding database models to API service
- Modifying keyvault response structure
- Adding new OAuth grant types to auth service

### Never Do

- Hard-code `client_id` or `client_secret` in source code
- Use `process.env` directly — always use `ConfigService`
- Use Express adapter — always Fastify
- Use `nest build` — always Rspack
- Repeat SERVICE_PREFIX in `@Controller()` decorator
- Store `client_secret` in plain text (auth service already hashes it)
- Expose `client_secret` in logs or error messages

## Success Criteria

### Auth Service

- [ ] `POST /auth/v1/oauth/register` remains **public** (unchanged, for self-registration)
- [ ] NEW: `POST /auth/v1/oauth/admin/clients` requires JWT authentication
- [ ] Only authenticated admins can create OAuth clients via admin endpoint
- [ ] Super admin can create OAuth client with `client_credentials` grant type and `keyvault:read` scope
- [ ] `client_secret` is shown only once during creation

### API Service

- [ ] API service starts successfully with Rspack
- [ ] `POST /api/v1/auth/token` returns JWT access token using client_credentials
- [ ] Access token is automatically refreshed before expiry
- [ ] `GET /api/v1/settings/:serviceName?environment=X` returns settings from keyvault
- [ ] `Authorization: Bearer <token>` header is passed correctly to keyvault
- [ ] API service returns 401 when client credentials are invalid
- [ ] Swagger docs are accessible at `/api/api`

### Integration

- [ ] Super admin creates OAuth client via `POST /auth/v1/oauth/admin/clients`
- [ ] Super admin provides `client_id` + `client_secret` to API operator
- [ ] API service uses credentials to authenticate to auth service
- [ ] API service can fetch settings from keyvault using obtained JWT
- [ ] Full flow works end-to-end: admin creates client → API gets token → API reads keyvault

## Documentation Updates

After implementation, update:

1. **`docs/services/auth/README.md`** — Document the admin-only registration endpoint
2. **`docs/services/api/README.md`** (new) — Document API service structure and endpoints
3. **`docs/architecture/README.md`** — Add API service to services table

## Open Questions

1. **Should the API service have its own database?** Initially no (stateless, env vars only), but if it needs to cache keyvault settings or track usage, a Prisma schema can be added later.

2. **Should API service cache keyvault settings?** For performance, the API service could cache settings locally with a short TTL. This is a future enhancement, not in initial scope.

3. **`SUPER_ADMIN` role creation:** The `SUPER_ADMIN` role does not exist yet. We will add a `role` field to the `User` model and seed/create a SUPER_ADMIN user as part of this work.
