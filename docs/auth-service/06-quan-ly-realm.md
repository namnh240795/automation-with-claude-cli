# Phần 6: Realm Management

## 📋 Mục tiêu phần này

Hiểu được:
- ✅ Realm là gì và tại sao cần multi-tenant
- ✅ Realm configuration options
- ✅ CRUD operations cho realms
- ✅ Realm-specific settings (OTP, flows, etc.)

---

## 🌍 6.1 Realm Overview

### Realm là gì?

```
┌─────────────────────────────────────────────────────────┐
│                    Realm Concept                       │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Realm = Isolated tenant/space                          │
│                                                          │
│  ┌─────────────────┐  ┌─────────────────┐              │
│  │  Realm "acme"   │  │ Realm "globex"  │              │
│  ├─────────────────┤  ├─────────────────┤              │
│  │ Users: acme-*   │  │ Users: globex-* │              │
│  │ Roles: acme-*   │  │ Roles: globex-* │              │
│  │ Clients: acme-* │  │ Clients:globex* │              │
│  │ Settings: ...   │  │ Settings: ...   │              │
│  └─────────────────┘  └─────────────────┘              │
│         │                      │                       │
│         └──────────┬───────────┘                       │
│                    ▼                                    │
│        ┌───────────────────────┐                      │
│        │    Auth Service       │                      │
│        │  (Single Instance)    │                      │
│        └───────────────────────┘                      │
│                                                          │
│  Use Cases:                                            │
│  • Multi-tenant SaaS                                   │
│  • Different organizations                             │
│  • Dev/Staging/Prod environments                       │
│  • Customer isolation                                  │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### Realm Entity

```prisma
model realm {
  // Basic Info
  id               String   @id @db.VarChar(36)
  name             String?  @unique @db.VarChar(255)
  enabled          Boolean  @default(false)

  // Token Lifetimes
  access_code_lifespan     Int?
  access_token_lifespan    Int?
  login_lifespan           Int?
  refresh_token_max_reuse  Int?  @default(0)

  // Session Settings
  sso_idle_timeout              Int    @default(0)
  sso_max_lifespan              Int    @default(0)
  sso_idle_timeout_remember_me  Int    @default(0)
  sso_max_lifespan_remember_me  Int    @default(0)

  // Registration
  registration_allowed    Boolean  @default(false)
  verify_email            Boolean  @default(false)
  login_with_email_allowed Boolean @default(true)
  edit_username_allowed   Boolean  @default(false)
  duplicate_emails_allowed Boolean @default(false)

  // Password Policies
  reset_password_allowed  Boolean  @default(false)

  // OTP Settings
  otp_policy_digits   Int?    @default(6)
  otp_policy_period   Int?    @default(30)
  otp_policy_alg      String? @default("HmacSHA1")
  otp_policy_type     String? @default("totp")
  otp_policy_counter  Int?    @default(0)
  otp_policy_window   Int?    @default(1)

  // Authentication Flows
  browser_flow            String? @db.VarChar(36)
  registration_flow       String? @db.VarChar(36)
  direct_grant_flow       String? @db.VarChar(36)
  reset_credentials_flow  String? @db.VarChar(36)
  client_auth_flow        String? @db.VarChar(36)
  docker_auth_flow        String? @db.VarChar(36)

  // Themes
  account_theme   String? @db.VarChar(255)
  admin_theme     String? @db.VarChar(255)
  email_theme     String? @db.VarChar(255)
  login_theme     String? @db.VarChar(255)

  // Events
  events_enabled               Boolean  @default(false)
  admin_events_enabled         Boolean  @default(false)
  admin_events_details_enabled Boolean  @default(false)
  events_expiration            BigInt?

  // Internationalization
  internationalization_enabled Boolean  @default(false)
  default_locale               String? @db.VarChar(255)

  // ... many more fields

  // Relations
  authentication_execution  authentication_execution[]
  authentication_flow       authentication_flow[]
  client                   client[]
  keycloak_role_keycloak_role_realmTorealm keycloak_role[]
  realm_attribute          realm_attribute[]
  required_action_provider required_action_provider[]
}
```

---

## 📝 6.2 Create Realm

### Request DTO

```typescript
export class CreateRealmDto {
  @IsString()
  @IsNotEmpty()
  id: string; // e.g., "acme"

  @IsString()
  @IsNotEmpty()
  name: string; // e.g., "Acme Corporation"

  @IsBoolean()
  @IsOptional()
  enabled?: boolean = true;

  @IsBoolean()
  @IsOptional()
  registration_allowed?: boolean = false;

  @IsBoolean()
  @IsOptional()
  verify_email?: boolean = true;

  @IsBoolean()
  @IsOptional()
  reset_password_allowed?: boolean = true;

  // OTP settings
  @IsInt()
  @IsOptional()
  otp_policy_digits?: number = 6;

  @IsString()
  @IsOptional()
  otp_policy_alg?: string = 'HmacSHA1';

  @IsString()
  @IsOptional()
  otp_policy_type?: string = 'totp';
}
```

### Service Method

```typescript
@LogActivity()
async create(createRealmDto: CreateRealmDto): Promise<RealmResponseDto> {
  const realm = await this.prisma.realm.create({
    data: {
      ...createRealmDto,
      // Set defaults
      access_token_lifespan: 3600, // 1 hour
      sso_idle_timeout: 1800, // 30 minutes
      login_with_email_allowed: true,
    },
  });

  return this.toResponseDto(realm);
}
```

### API Endpoint

```bash
POST /auth/v1/realms
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "id": "acme",
  "name": "Acme Corporation",
  "enabled": true,
  "registration_allowed": true,
  "verify_email": true,
  "reset_password_allowed": true
}
```

### Response

```json
{
  "id": "acme",
  "name": "Acme Corporation",
  "enabled": true,
  "registration_allowed": true,
  "verify_email": true,
  "reset_password_allowed": true,
  "access_token_lifespan": 3600,
  "sso_idle_timeout": 1800,
  "login_with_email_allowed": true,
  "created_at": "2025-03-18T10:00:00.000Z"
}
```

---

## 📋 6.3 List Realms

### Service Method

```typescript
async findAll(
  page: number = 0,
  limit: number = 20,
): Promise<RealmsPaginatedDto> {
  const skip = page * limit;

  const [realms, total] = await Promise.all([
    this.prisma.realm.findMany({
      skip,
      take: limit,
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        enabled: true,
        registration_allowed: true,
        access_token_lifespan: true,
      },
    }),
    this.prisma.realm.count(),
  ]);

  const total_pages = Math.ceil(total / limit);

  return {
    data: realms.map(realm => this.toResponseDto(realm)),
    meta: { total, page, limit, total_pages },
  };
}
```

### API Endpoint

```bash
GET /auth/v1/realms?page=0&limit=20
Authorization: Bearer <token>
```

---

## 🔍 6.4 Get Realm by ID

### Service Method

```typescript
async findOne(id: string): Promise<RealmResponseDto> {
  const realm = await this.prisma.realm.findUnique({
    where: { id },
    include: {
      realm_attribute: true,
      required_action_provider: true,
      authentication_flow: true,
    },
  });

  if (!realm) {
    throw new NotFoundException('Realm not found');
  }

  return this.toResponseDto(realm);
}
```

---

## ✏️ 6.5 Update Realm

### Update DTO

```typescript
export class UpdateRealmDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsBoolean()
  @IsOptional()
  enabled?: boolean;

  @IsBoolean()
  @IsOptional()
  registration_allowed?: boolean;

  @IsBoolean()
  @IsOptional()
  verify_email?: boolean;

  @IsInt()
  @IsOptional()
  access_token_lifespan?: number;

  @IsInt()
  @IsOptional()
  sso_idle_timeout?: number;

  // ... other fields
}
```

### Service Method

```typescript
@LogActivity()
async update(id: string, updateRealmDto: UpdateRealmDto): Promise<RealmResponseDto> {
  const realm = await this.prisma.realm.update({
    where: { id },
    data: updateRealmDto,
  });

  return this.toResponseDto(realm);
}
```

---

## 🗑️ 6.6 Delete Realm

⚠️ **Warning**: Deleting realm will cascade delete all users, roles, groups, clients!

```typescript
@LogActivity()
async remove(id: string): Promise<void> {
  const realm = await this.prisma.realm.findUnique({
    where: { id },
  });

  if (!realm) {
    throw new NotFoundException('Realm not found');
  }

  // Confirm deletion in production
  // Consider soft delete instead

  await this.prisma.realm.delete({
    where: { id },
  });
}
```

---

## ⚙️ 6.7 Realm Configuration Options

### Token Lifetime Settings

```typescript
// Access token lifetime (seconds)
{
  "access_token_lifespan": 3600,  // 1 hour
  "access_code_lifespan": 60,     // 1 minute
  "login_lifespan": 1800,         // 30 minutes
}
```

### Session Settings

```typescript
{
  "sso_idle_timeout": 1800,              // 30 minutes
  "sso_max_lifespan": 36000,             // 10 hours
  "sso_idle_timeout_remember_me": 2592000, // 30 days
  "sso_max_lifespan_remember_me": 2592000,  // 30 days
}
```

### OTP Policy

```typescript
{
  "otp_policy_digits": 6,
  "otp_policy_period": 30,
  "otp_policy_alg": "HmacSHA1",  // or "HmacSHA256"
  "otp_policy_type": "totp",     // or "hotp"
  "otp_policy_counter": 0,
  "otp_policy_window": 1
}
```

### Registration Settings

```typescript
{
  "registration_allowed": true,
  "verify_email": true,
  "login_with_email_allowed": true,
  "edit_username_allowed": false,
  "duplicate_emails_allowed": false,
  "reset_password_allowed": true
}
```

---

## 🔐 6.8 Realm Attributes

### Custom Attributes

```prisma
model realm_attribute {
  name     String  @db.VarChar(255)
  realm_id String  @db.VarChar(36)
  value    String?

  realm    realm   @relation(fields: [realm_id], references: [id])

  @@id([name, realm_id])
  @@index([realm_id])
}
```

### Set Realm Attribute

```typescript
async setAttribute(realmId: string, name: string, value: string) {
  await this.prisma.realm_attribute.upsert({
    where: {
      name_realm_id: {
        name,
        realm_id: realmId,
      },
    },
    create: {
      realm_id: realmId,
      name,
      value,
    },
    update: {
      value,
    },
  });
}
```

### Example Attributes

```typescript
// Custom logo URL
await realmsService.setAttribute('acme', 'logo_url', 'https://acme.com/logo.png');

// Custom support email
await realmsService.setAttribute('acme', 'support_email', 'support@acme.com');

// Custom CSS
await realmsService.setAttribute('acme', 'custom_css', '.login-box { background: blue; }');
```

---

## 🌐 6.9 SMTP Configuration per Realm

### SMTP Config Entity

```prisma
model realm_smtp_config {
  realm_id String  @db.VarChar(36)
  name     String  @db.VarChar(255)
  value    String? @db.VarChar(255)

  realm    realm   @relation(fields: [realm_id], references: [id])

  @@id([realm_id, name])
}
```

### Configure SMTP

```typescript
async configureSmtp(realmId: string, smtpConfig: SmtpConfigDto) {
  const { host, port, user, password, from, ssl, starttls } = smtpConfig;

  await this.prisma.realm_smtp_config.create({
    data: {
      realm_id: realmId,
      name: 'smtp',
      value: JSON.stringify({
        host,
        port,
        auth: true,
        user,
        password,
        from,
        ssl,
        starttls,
      }),
    },
  });
}
```

---

## ❓ FAQ

### Q1: Master realm là gì?

**A**: Master realm là default realm:
- Tự động tạo khi khởi động
- Không thể xóa
- Dùng để quản lý admin accounts

### Q2: Realm có thể share users không?

**A**: Không, mỗi user thuộc về 1 realm duy nhất thông qua `realm_id`. Điều này đảm bảo isolation.

### Q3: Làm sao để migration user giữa realms?

**A**:
```typescript
// Export user from realm A
const user = await prisma.user.findUnique({ where: { id }, include: {...} });

// Import to realm B
const newUser = await prisma.user.create({
  data: {
    ...user,
    id: undefined, // New ID
    realm_id: 'realm-b',
  },
});
```

---

## 🎯 Summary

### Key Points

1. ✅ **Realm** = Multi-tenant isolation
2. ✅ **Configuration**: Token lifetimes, OTP, registration, etc.
3. ✅ **Attributes**: Custom properties per realm
4. ✅ **SMTP**: Per-realm email configuration

### CRUD Operations

| Operation | Endpoint | Auth Required |
|-----------|----------|---------------|
| List | `GET /realms` | ✅ Admin |
| Create | `POST /realms` | ✅ Admin |
| Get by ID | `GET /realms/:id` | ✅ Admin |
| Update | `PATCH /realms/:id` | ✅ Admin |
| Delete | `DELETE /realms/:id` | ✅ Super Admin |

### Next Steps

- **[Phần 7: Roles & Groups](./07-quan-ly-role-group.md)** - RBAC implementation

---

**Document Version**: 1.0.0
**Last Updated**: 2025-03-18
