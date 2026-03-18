# Phần 8: OAuth/OIDC Client Management

## 📋 Mục tiêu phần này

Hiểu được:
- ✅ OAuth 2.0 và OpenID Connect concepts
- ✅ Client registration và configuration
- ✅ Grant types (Authorization Code, Implicit, etc.)
- ✅ Client authentication methods

---

## 🔐 8.1 OAuth/OIDC Overview

### OAuth 2.0 Flow

```
┌─────────────────────────────────────────────────────────┐
│              OAuth 2.0 Authorization Code Flow          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  1. User clicks "Login with App"                        │
│     │                                                    │
│     ▼                                                    │
│  2. Redirect to:                                        │
│     /auth/authorize?                                    │
│       client_id=xxx&                                    │
│       redirect_uri=yyy&                                 │
│       response_type=code&                               │
│       scope=openid profile email                        │
│                                                          │
│  3. User authenticates & grants consent                 │
│     │                                                    │
│     ▼                                                    │
│  4. Redirect back with auth code:                       │
│     redirect_uri?code=auth_code_xyz                      │
│                                                          │
│  5. App exchanges code for tokens:                      │
│     POST /auth/token                                    │
│     {                                                    │
│       "code": "auth_code_xyz",                          │
│       "grant_type": "authorization_code",               │
│       "client_id": "xxx",                               │
│       "client_secret": "secret",                        │
│       "redirect_uri": "yyy"                             │
│     }                                                    │
│                                                          │
│  6. Response with tokens:                               │
│     {                                                    │
│       "access_token": "...",                            │
│       "refresh_token": "...",                           │
│       "id_token": "...",  // JWT with user info         │
│       "token_type": "Bearer",                           │
│       "expires_in": 3600                                │
│     }                                                    │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## 📱 8.2 Client Entity

### client Schema

```prisma
model client {
  // Basic Info
  id               String   @id @db.VarChar(36)
  client_id        String?  @db.VarChar(255)
  secret           String?  @db.VarChar(255)
  name             String?  @db.VarChar(255)
  description      String?  @db.VarChar(255)
  enabled          Boolean  @default(false)
  realm_id         String?  @db.VarChar(36)

  // OAuth Configuration
  public_client              Boolean  @default(false)
  standard_flow_enabled      Boolean  @default(true)   // Authorization Code
  implicit_flow_enabled      Boolean  @default(false)
  direct_access_grants_enabled Boolean @default(false)  // Resource Owner Password
  service_accounts_enabled   Boolean  @default(false)

  // Authentication
  client_authenticator_type  String?  @db.VarChar(255)

  // Consent
  consent_required           Boolean  @default(false)

  // URLs
  base_url          String?  @db.VarChar(255)
  root_url          String?  @db.VarChar(255)
  management_url    String?  @db.VarChar(255)

  // Security
  surrogate_auth_required Boolean @default(false)
  bearer_only              Boolean @default(false)

  // Token timeouts
  not_before               Int?

  // Attributes & Mappings
  client_attributes        client_attributes[]
  protocol_mapper          protocol_mapper[]
  redirect_uris            redirect_uris[]
  web_origins              web_origins[]
  scope_mapping            scope_mapping[]

  @@unique([realm_id, client_id])
  @@index([client_id])
}
```

---

## 📝 8.3 Create OAuth Client

### Request DTO

```typescript
export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  client_id: string;  // e.g., "my-app"

  @IsString()
  @IsOptional()
  secret?: string;  // Auto-generated if not provided

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  realm_id?: string = 'master';

  // OAuth Flows
  @IsBoolean()
  @IsOptional()
  standard_flow_enabled?: boolean = true;  // Authorization Code

  @IsBoolean()
  @IsOptional()
  implicit_flow_enabled?: boolean = false;

  @IsBoolean()
  @IsOptional()
  direct_access_grants_enabled?: boolean = false;

  @IsBoolean()
  @IsOptional()
  public_client?: boolean = false;

  @IsBoolean()
  @IsOptional()
  consent_required?: boolean = false;

  // URLs
  @IsString()
  @IsOptional()
  root_url?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  redirect_uris?: string[];  // e.g., ["http://localhost:3000/callback"]

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  web_origins?: string[];  // CORS origins
}
```

### Service Method

```typescript
@LogActivity()
async create(createClientDto: CreateClientDto): Promise<ClientResponseDto> {
  const {
    client_id,
    secret = this.generateSecret(),  // Auto-generate if not provided
    name,
    description,
    realm_id = 'master',
    standard_flow_enabled,
    implicit_flow_enabled,
    direct_access_grants_enabled,
    public_client,
    consent_required,
    root_url,
    redirect_uris,
    web_origins,
  } = createClientDto;

  // Create client
  const client = await this.prisma.client.create({
    data: {
      client_id,
      secret,
      name,
      description,
      realm_id,
      enabled: true,
      standard_flow_enabled: standard_flow_enabled ?? true,
      implicit_flow_enabled: implicit_flow_enabled ?? false,
      direct_access_grants_enabled: direct_access_grants_enabled ?? false,
      public_client: public_client ?? false,
      consent_required: consent_required ?? false,
      root_url,
      base_url: root_url,
      client_authenticator_type: public_client ? 'none' : 'client-secret',
    },
  });

  // Add redirect URIs
  if (redirect_uris && redirect_uris.length > 0) {
    await this.prisma.redirect_uris.createMany({
      data: redirect_uris.map(uri => ({
        client_id: client.id,
        value: uri,
      })),
    });
  }

  // Add web origins
  if (web_origins && web_origins.length > 0) {
    await this.prisma.web_origins.createMany({
      data: web_origins.map(origin => ({
        client_id: client.id,
        value: origin,
      })),
    });
  }

  return this.toResponseDto(client);
}
```

### Generate Client Secret

```typescript
private generateSecret(): string {
  return crypto.randomBytes(32).toString('hex');
}
```

### API Endpoint

```bash
POST /auth/v1/clients
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "client_id": "my-app",
  "name": "My Application",
  "description": "My OAuth 2.0 client application",
  "realm_id": "master",
  "standard_flow_enabled": true,
  "public_client": false,
  "redirect_uris": ["http://localhost:3000/callback"],
  "web_origins": ["http://localhost:3000"]
}
```

### Response

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "client_id": "my-app",
  "secret": "a1b2c3d4e5f6...",
  "name": "My Application",
  "enabled": true,
  "standard_flow_enabled": true,
  "public_client": false,
  "redirect_uris": ["http://localhost:3000/callback"],
  "web_origins": ["http://localhost:3000"],
  "created_at": "2025-03-18T10:00:00.000Z"
}
```

---

## 🔧 8.4 Client Types

### Confidential Client

```typescript
// Server-side application with secret
{
  "client_id": "server-app",
  "secret": "server-secret",
  "public_client": false,
  "client_authenticator_type": "client-secret"
}
```

### Public Client

```typescript
// SPA or Mobile app (no secret)
{
  "client_id": "spa-app",
  "public_client": true,
  "client_authenticator_type": "none",
  "standard_flow_enabled": true,
  "implicit_flow_enabled": false,  // Don't use implicit for SPA
  "direct_access_grants_enabled": false  // Never use password flow for SPA
}
```

### Bearer-Only Client

```typescript
// Service-to-service communication
{
  "client_id": "service-api",
  "bearer_only": true,
  "public_client": false
}
```

---

## 🌐 8.5 Grant Types

### Authorization Code Flow (Recommended)

```typescript
{
  "standard_flow_enabled": true,
  "implicit_flow_enabled": false,
  "direct_access_grants_enabled": false
}
```

**Use cases**:
- Server-side web applications
- SPA with PKCE
- Mobile apps with PKCE

### Implicit Flow (Deprecated)

```typescript
{
  "standard_flow_enabled": false,
  "implicit_flow_enabled": true  // ⚠️ Deprecated
}
```

**⚠️ Warning**: Implicit flow is deprecated due to security risks. Use Authorization Code with PKCE instead.

### Resource Owner Password Flow

```typescript
{
  "direct_access_grants_enabled": true
}
```

**Use cases**:
- Trusted first-party applications
- Legacy app migration

**⚠️ Warning**: Only use for highly trusted apps!

### Client Credentials Flow

```typescript
{
  "service_accounts_enabled": true
}
```

**Use cases**:
- Service-to-service communication
- Background jobs
- Machine-to-machine authentication

---

## 🔐 8.6 Client Authentication Methods

### client_secret_basic

```typescript
{
  "client_authenticator_type": "client-secret"
}
```

**Usage**:
```bash
POST /auth/token
Authorization: Basic base64(client_id:client_secret)
Content-Type: application/json

{
  "grant_type": "authorization_code",
  "code": "auth_code",
  "redirect_uri": "..."
}
```

### client_secret_post

```typescript
{
  "client_authenticator_type": "client-secret-jwt"
}
```

**Usage**:
```bash
POST /auth/token
Content-Type: application/json

{
  "grant_type": "authorization_code",
  "client_id": "my-app",
  "client_secret": "secret",
  "code": "auth_code",
  "redirect_uri": "..."
}
```

### none (Public Client)

```typescript
{
  "public_client": true,
  "client_authenticator_type": "none"
}
```

---

## 📋 8.7 List Clients

### Service Method

```typescript
async findAll(
  page: number = 0,
  limit: number = 20,
  realm_id?: string,
): Promise<ClientsPaginatedDto> {
  const skip = page * limit;

  const where = realm_id ? { realm_id } : {};

  const [clients, total] = await Promise.all([
    this.prisma.client.findMany({
      where,
      skip,
      take: limit,
      orderBy: { client_id: 'asc' },
      include: {
        redirect_uris: true,
        web_origins: true,
      },
    }),
    this.prisma.client.count({ where }),
  ]);

  const total_pages = Math.ceil(total / limit);

  return {
    data: clients.map(client => this.toResponseDto(client)),
    meta: { total, page, limit, total_pages },
  };
}
```

---

## 🔍 8.8 Client Secret Rotation

### Regenerate Secret

```typescript
async regenerateSecret(clientId: string): Promise<ClientSecretResponseDto> {
  const newSecret = this.generateSecret();

  await this.prisma.client.update({
    where: { id: clientId },
    data: {
      secret: newSecret,
    },
  });

  return {
    client_id: clientId,
    secret: newSecret,
  };
}
```

---

## ❓ FAQ

### Q1: Public vs Confidential client?

**A**:
- **Public**: No secret (SPA, mobile apps)
- **Confidential**: Has secret (server-side apps)

### Q2: Redirect URI validation hoạt động như thế nào?

**A**: Khi redirect từ OAuth callback:
```typescript
// Validate redirect URI
const allowedUris = await this.prisma.redirect_uris.findMany({
  where: { client_id: clientId },
});

if (!allowedUris.some(u => u.value === redirectUri)) {
  throw new UnauthorizedException('Invalid redirect URI');
}
```

### Q3: Làm sao để revoke client access?

**A**: Disable client:
```typescript
await this.prisma.client.update({
  where: { id: clientId },
  data: { enabled: false },
});
```

---

## 🎯 Summary

### Key Points

1. ✅ **OAuth Client** = Application muốn authenticate users
2. ✅ **Confidential Client**: Server-side with secret
3. ✅ **Public Client**: SPA/mobile without secret
4. ✅ **Authorization Code Flow**: Recommended method
5. ✅ **Client Credentials**: For service-to-service

### CRUD Operations

| Operation | Endpoint | Auth Required |
|-----------|----------|---------------|
| List | `GET /clients` | ✅ Admin |
| Create | `POST /clients` | ✅ Admin |
| Get by ID | `GET /clients/:id` | ✅ Admin |
| Update | `PATCH /clients/:id` | ✅ Admin |
| Delete | `DELETE /clients/:id` | ✅ Admin |
| Regenerate Secret | `POST /clients/:id/secret` | ✅ Admin |

### Next Steps

- **[Phần 9: Session Management](./09-quan-ly-session.md)** - Token & session lifecycle

---

**Document Version**: 1.0.0
**Last Updated**: 2025-03-18
