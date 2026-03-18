# Phần 13: Identity Providers & Social Login

## 📋 Mục tiêu phần này

Hiểu được:
- ✅ Identity Provider (IdP) concepts
- ✅ Social login (Google, Facebook, etc.)
- ✅ SAML integration
- ✅ Federated identity management

---

## 🌐 13.1 Identity Provider Overview

### Identity Provider là gì?

```
┌─────────────────────────────────────────────────────────┐
│              Identity Provider Flow                     │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  User clicks "Login with Google"                        │
│     │                                                    │
│     ▼                                                    │
│  Redirect to Google IdP                                 │
│     │                                                    │
│     ▼                                                    │
│  User authenticates with Google                         │
│     │                                                    │
│     ▼                                                    │
│  Google redirects back with code                         │
│     │                                                    │
│     ▼                                                    │
│  Auth Service exchanges code for user info              │
│     │                                                    │
│     ▼                                                    │
│  Create/Link federated identity                         │
│     │                                                    │
│     ▼                                                    │
│  Create local user (if not exists)                       │
│     │                                                    │
│     ▼                                                    │
│  Generate JWT tokens                                    │
│     │                                                    │
│     ▼                                                    │
│  Redirect to app with tokens                            │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## 📋 13.2 IdP Entities

### identity_provider Table

```prisma
model identity_provider {
  internal_id                String   @id @db.VarChar(36)
  enabled                    Boolean  @default(false)
  provider_alias             String?  @db.VarChar(255)
  provider_id                String?  @db.VarChar(255)
  store_token                Boolean  @default(false)
  authenticate_by_default    Boolean  @default(false)
  realm_id                   String?  @db.VarChar(36)
  add_token_role             Boolean  @default(true)
  trust_email                Boolean  @default(false)
  first_broker_login_flow_id String?  @db.VarChar(36)
  post_broker_login_flow_id  String?  @db.VarChar(36)
  provider_display_name      String?  @db.VarChar(255)
  link_only                  Boolean  @default(false)
  organization_id            String?  @db.VarChar(255)
  hide_on_login              Boolean?  @default(false)

  // Relations
  realm                      realm?                    @relation(fields: [realm_id], references: [id])
  identity_provider_config   identity_provider_config[]

  @@unique([provider_alias, realm_id])
  @@index([realm_id])
  @@index([realm_id, enabled, link_only, hide_on_login, organization_id])
}
```

### identity_provider_config Table

```prisma
model identity_provider_config {
  identity_provider_id String  @db.VarChar(36)
  value                String?
  name                 String  @db.VarChar(255)

  identity_provider    identity_provider @relation(fields: [identity_provider_id], references: [id])

  @@id([identity_provider_id, name])
}
```

### federated_identity Table

```prisma
model federated_identity {
  identity_provider  String      @db.VarChar(255)
  realm_id           String?     @db.VarChar(36)
  federated_user_id  String?     @db.VarChar(255)
  federated_username String?     @db.VarChar(255)
  token              String?
  user_id            String      @db.VarChar(36)

  user_entity        user_entity @relation(fields: [user_id], references: [id])

  @@id([identity_provider, user_id])
  @@index([federated_user_id])
  @@index([user_id])
}
```

---

## 🔑 13.3 Supported Identity Providers

### OAuth/OIDC Providers

```typescript
enum OAuthProvider {
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
  GITHUB = 'github',
  MICROSOFT = 'microsoft',
  APPLE = 'apple',
  LINKEDIN = 'linkedin',
  TWITTER = 'twitter',
}
```

### SAML Providers

```typescript
enum SAMLProvider {
  SAML = 'saml',
  ADFS = 'adfs',
  OKTA = 'okta',
  AZURE_AD = 'azure-ad',
  PING = 'ping',
}
```

---

## 📝 13.4 Create Google IdP

### Request DTO

```typescript
export class CreateIdpDto {
  @IsString()
  @IsNotEmpty()
  provider_alias: string;  // e.g., "google"

  @IsString()
  @IsNotEmpty()
  provider_id: string;  // e.g., "google"

  @IsString()
  @IsOptional()
  realm_id?: string = 'master';

  @IsBoolean()
  @IsOptional()
  enabled?: boolean = true;

  @IsBoolean()
  @IsOptional()
  store_token?: boolean = false;

  @IsBoolean()
  @IsOptional()
  trust_email?: boolean = true;  // Auto-verify email

  @IsBoolean()
  @IsOptional()
  link_only?: boolean = false;  // Don't create new users

  @IsString()
  @IsOptional()
  provider_display_name?: string;

  @IsObject()
  @IsOptional()
  config?: {
    clientId?: string;
    clientSecret?: string;
    authorizationUrl?: string;
    tokenUrl?: string;
    userInfoUrl?: string;
    scope?: string;
  };
}
```

### Service Method

```typescript
@LogActivity()
async createIdp(createIdpDto: CreateIdpDto): Promise<IdpResponseDto> {
  const {
    provider_alias,
    provider_id,
    realm_id = 'master',
    enabled = true,
    store_token = false,
    trust_email = true,
    link_only = false,
    provider_display_name,
    config,
  } = createIdpDto;

  // Create IdP
  const idp = await this.prisma.identity_provider.create({
    data: {
      internal_id: uuid(),
      provider_alias,
      provider_id,
      realm_id,
      enabled,
      store_token,
      trust_email,
      link_only,
      provider_display_name: provider_display_name || provider_alias,
      add_token_role: true,
      authenticate_by_default: false,
    },
  });

  // Store configuration
  if (config) {
    await this.prisma.identity_provider_config.createMany({
      data: Object.entries(config).map(([name, value]) => ({
        identity_provider_id: idp.internal_id,
        name,
        value: String(value),
      })),
    });
  }

  return this.toResponseDto(idp);
}
```

### API Endpoint

```bash
POST /auth/v1/identity-providers
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "provider_alias": "google",
  "provider_id": "google",
  "realm_id": "master",
  "enabled": true,
  "trust_email": true,
  "provider_display_name": "Sign in with Google",
  "config": {
    "clientId": "your-google-client-id.apps.googleusercontent.com",
    "clientSecret": "your-google-client-secret",
    "authorizationUrl": "https://accounts.google.com/o/oauth2/v2/auth",
    "tokenUrl": "https://oauth2.googleapis.com/token",
    "userInfoUrl": "https://www.googleapis.com/oauth2/v2/userinfo",
    "scope": "openid profile email"
  }
}
```

---

## 🔄 13.5 Social Login Flow

### Initiate Social Login

```typescript
async initiateSocialLogin(providerAlias: string, redirectUri: string) {
  const idp = await this.prisma.identity_provider.findFirst({
    where: {
      provider_alias: providerAlias,
      enabled: true,
    },
    include: {
      identity_provider_config: true,
    },
  });

  if (!idp) {
    throw new NotFoundException('Identity provider not found or disabled');
  }

  // Get config
  const config = this.idpConfigToObject(idp.identity_provider_config);

  // Generate state (CSRF protection)
  const state = crypto.randomBytes(16).toString('hex');

  // Build authorization URL
  const authUrl = new URL(config.authorizationUrl);
  authUrl.searchParams.set('client_id', config.clientId);
  authUrl.searchParams.set('redirect_uri', redirectUri);
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('scope', config.scope || 'openid profile email');
  authUrl.searchParams.set('state', state);

  return {
    authorization_url: authUrl.toString(),
    state,
  };
}
```

### Handle Callback

```typescript
async handleCallback(
  providerAlias: string,
  code: string,
  state: string,
  redirectUri: string,
) {
  // Verify state (CSRF protection)
  // ... (omitted for brevity)

  // Get IdP config
  const idp = await this.getIdpByAlias(providerAlias);
  const config = this.idpConfigToObject(idp.identity_provider_config);

  // Exchange code for tokens
  const tokenResponse = await this.exchangeCodeForTokens(
    config.tokenUrl,
    config.clientId,
    config.clientSecret,
    code,
    redirectUri,
  );

  // Get user info from IdP
  const userInfo = await this.getUserInfo(
    config.userInfoUrl,
    tokenResponse.access_token,
  );

  // Find or create user
  const user = await this.findOrCreateFederatedUser(
    idp.internal_id,
    userInfo,
    idp.realm_id,
    idp.trust_email,
  );

  // Generate JWT tokens
  const tokens = await this.generateTokens(user);

  return tokens;
}
```

### Exchange Code for Tokens

```typescript
private async exchangeCodeForTokens(
  tokenUrl: string,
  clientId: string,
  clientSecret: string,
  code: string,
  redirectUri: string,
) {
  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: redirectUri,
    }),
  });

  if (!response.ok) {
    throw new UnauthorizedException('Failed to exchange code for tokens');
  }

  return response.json();
}
```

### Get User Info

```typescript
private async getUserInfo(userInfoUrl: string, accessToken: string) {
  const response = await fetch(userInfoUrl, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new UnauthorizedException('Failed to fetch user info');
  }

  return response.json();
}
```

---

## 👤 13.6 Federated User Management

### Find or Create User

```typescript
async findOrCreateFederatedUser(
  providerId: string,
  userInfo: any,
  realmId: string,
  trustEmail: boolean,
) {
  // Check if federated identity exists
  const federatedIdentity = await this.prisma.federated_identity.findUnique({
    where: {
      identity_provider_user_id: {
        identity_provider: providerId,
        user_id: userInfo.id,
      },
    },
    include: {
      user_entity: true,
    },
  });

  if (federatedIdentity) {
    // Update federated identity
    await this.prisma.federated_identity.update({
      where: { id: federatedIdentity.id },
      data: {
        federated_username: userInfo.email || userInfo.name,
        token: JSON.stringify(userInfo),
      },
    });

    return federatedIdentity.user_entity;
  }

  // Check if user exists by email
  const existingUser = await this.prisma.user.findFirst({
    where: {
      email: userInfo.email,
      realm_id: realmId,
    },
  });

  if (existingUser) {
    // Link federated identity to existing user
    await this.prisma.federated_identity.create({
      data: {
        identity_provider: providerId,
        federated_user_id: userInfo.id,
        federated_username: userInfo.email || userInfo.name,
        user_id: existingUser.id,
      },
    });

    return existingUser;
  }

  // Create new user
  const newUser = await this.prisma.user.create({
    data: {
      email: userInfo.email,
      email_verified: trustEmail,
      username: userInfo.email?.split('@')[0] || userInfo.id,
      first_name: userInfo.given_name || userInfo.first_name,
      last_name: userInfo.family_name || userInfo.last_name,
      realm_id: realmId,
      enabled: true,
      federation_link: providerId,
    },
  });

  // Create federated identity
  await this.prisma.federated_identity.create({
    data: {
      identity_provider: providerId,
      federated_user_id: userInfo.id,
      federated_username: userInfo.email || userInfo.name,
      user_id: newUser.id,
    },
  });

  return newUser;
}
```

---

## 🔗 13.7 Link/Unlink Accounts

### Link Account

```typescript
async linkAccount(userId: string, providerAlias: string, providerToken: string) {
  const idp = await this.getIdpByAlias(providerAlias);

  // Check if already linked
  const existing = await this.prisma.federated_identity.findUnique({
    where: {
      identity_provider_user_id: {
        identity_provider: idp.internal_id,
        user_id: userId,
      },
    },
  });

  if (existing) {
    throw new ConflictException('Account already linked');
  }

  // Get user info from provider
  const config = this.idpConfigToObject(idp.identity_provider_config);
  const userInfo = await this.getUserInfo(config.userInfoUrl, providerToken);

  // Create federated identity
  await this.prisma.federated_identity.create({
    data: {
      identity_provider: idp.internal_id,
      federated_user_id: userInfo.id,
      federated_username: userInfo.email,
      user_id: userId,
    },
  });

  return { success: true };
}
```

### Unlink Account

```typescript
async unlinkAccount(userId: string, providerAlias: string) {
  await this.prisma.federated_identity.deleteMany({
    where: {
      user_id: userId,
      identity_provider: {
        provider_alias: providerAlias,
      },
    },
  });

  return { success: true };
}
```

---

## 📋 13.8 List Identity Providers

```typescript
async listIdentityProviders(realmId?: string) {
  const where = realmId ? { realm_id: realmId } : {};

  const idps = await this.prisma.identity_provider.findMany({
    where,
    include: {
      identity_provider_config: true,
    },
  });

  return idps.map(idp => ({
    ...this.toResponseDto(idp),
    config: this.idpConfigToObject(idp.identity_provider_config),
  }));
}
```

---

## ❓ FAQ

### Q1: `link_only` mode dùng khi nào?

**A**: Link-only mode:
- **Enabled**: Only allow login if user exists
- **Disabled**: Create new users automatically
- **Use case**: Existing users linking social accounts

### Q2: `trust_email` flag có nghĩa gì?

**A**:
- **true**: Auto-mark email as verified
- **false**: Require email verification after social login

### Q3: Làm sao để support multiple IdPs?

**A**: Add multiple IdP configurations:
```typescript
await createIdp({ provider_alias: 'google', ... });
await createIdp({ provider_alias: 'github', ... });
await createIdp({ provider_alias: 'facebook', ... });
```

---

## 🎯 Summary

### Key Concepts

1. ✅ **Identity Provider**: External auth service (Google, Facebook)
2. ✅ **Federated Identity**: Link between local user and IdP account
3. ✅ **Social Login Flow**: OAuth/OIDC redirect flow
4. ✅ **Account Linking**: Connect multiple IdPs to one user

### Supported IdPs

| Type | Providers |
|------|-----------|
| OAuth/OIDC | Google, Facebook, GitHub, Microsoft, Apple |
| SAML | ADFS, Okta, Azure AD, Ping |

### Next Steps

- **[Phần 14: API Reference](./14-api-reference.md)** - Complete API documentation

---

**Document Version**: 1.0.0
**Last Updated**: 2025-03-18
