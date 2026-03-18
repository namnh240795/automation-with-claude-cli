# HƯỚNG DẪN CHI TIẾT PRISMA SCHEMA - AUTH SERVICE

## 📋 Mục lục

1. [Giới thiệu](#1-giới-thiệu)
2. [Core Authentication Entities](#2-core-authentication-entities)
3. [Identity Management Entities](#3-identity-management-entities)
4. [Authentication Flow Entities](#4-authentication-flow-entities)
5. [Session Management Entities](#5-session-management-entities)
6. [Event & Audit Entities](#6-event--audit-entities)
7. [Authorization & Policy Entities](#7-authorization--policy-entities)
8. [Identity Provider Entities](#8-identity-provider-entities)
9. [Federation Entities](#9-federation-entities)
10. [Organization Entities](#10-organization-entities)

---

## 1. Giới thiệu

### Schema này là gì?

Đây là **database schema** cho Auth Service - một hệ thống Identity và Access Management (IAM) hoàn chỉnh dựa trên kiến trúc Keycloak. Schema này chứa tất cả các tables, relationships và indexes cần thiết để:

- ✅ Quản lý người dùng (Users)
- ✅ Xác thực (Authentication)
- ✅ Phân quyền (Authorization - RBAC)
- ✅ Multi-tenancy (Realms)
- ✅ OAuth/OIDC clients
- ✅ Social Login (Identity Providers)
- ✅ Audit logging
- ✅ Session management

### Cấu hình Prisma

```prisma
generator client {
  provider = "prisma-client-js"
  output   = "../../../packages/auth-prisma-client/src"
}

datasource db {
  provider = "postgresql"
}
```

**Giải thích**:
- **generator**: Prisma sẽ generate client code và lưu vào `packages/auth-prisma-client/src`
- **datasource**: Sử dụng PostgreSQL database
- **Prisma 7**: Không cần URL trong datasource, config được tách riêng trong `prisma.config.ts`

---

## 2. Core Authentication Entities

### 2.1 user_entity (Người dùng)

**Vị trí**: Line 1018

```prisma
model user_entity {
  id                          String   @id @db.VarChar(36)
  email                       String?  @db.VarChar(255)
  email_constraint            String?  @db.VarChar(255)
  email_verified              Boolean  @default(false)
  enabled                     Boolean  @default(false)
  federation_link             String?  @db.VarChar(255)
  first_name                  String?  @db.VarChar(255)
  last_name                   String?  @db.VarChar(255)
  realm_id                    String?  @db.VarChar(255)
  username                    String?  @db.VarChar(255)
  created_timestamp           BigInt?
  service_account_client_link String?  @db.VarChar(255)
  not_before                  Int      @default(0)

  credential                  credential[]
  federated_identity          federated_identity[]
  user_attribute              user_attribute[]
  user_consent                user_consent[]
  user_group_membership       user_group_membership[]
  user_required_action        user_required_action[]
  user_role_mapping           user_role_mapping[]
}
```

#### Ý nghĩa các trường:

| Trường | Kiểu | Mục đích | Ví dụ |
|--------|------|----------|-------|
| `id` | String (UUID) | Primary key | "550e8400-..." |
| `email` | String? | Email người dùng | "user@example.com" |
| `email_constraint` | String? | Email dạng lowercase cho unique constraint | "user@example.com" |
| `email_verified` | Boolean | Email đã xác thực chưa | true/false |
| `enabled` | Boolean | Tài khoản có active không | true/false |
| `federation_link` | String? | Link đến IdP (Google, Facebook) | "google" |
| `first_name` | String? | Tên đệm | "John" |
| `last_name` | String? | Họ | "Doe" |
| `realm_id` | String? | Realm (tenant) mà user thuộc về | "master" |
| `username` | String? | Tên đăng nhập | "johndoe" |
| `created_timestamp` | BigInt? | Thời gian tạo (Unix timestamp) | 1710700800000 |
| `service_account_client_link` | String? | Link đến service account | null |
| `not_before` | Int | Token không valid trước thời điểm này | 0 |

#### Workflow:

```
1. User Sign Up
   ↓
2. Tạo user_entity với enabled=false, email_verified=false
   ↓
3. Gửi email verification
   ↓
4. User click link → email_verified=true
   ↓
5. Admin approve hoặc auto-enable → enabled=true
   ↓
6. User có thể đăng nhập
```

#### Unique Constraints:

```prisma
@@unique([realm_id, email_constraint])  // Email unique trong realm
@@unique([realm_id, username])           // Username unique trong realm
```

**Ý nghĩa**: Có thể có user "john@example.com" trong realm "acme" VÀ realm "globex" (khác nhau), nhưng không thể trùng trong cùng 1 realm.

---

### 2.2 credential (Thông tin đăng nhập)

**Vị trí**: Line 256

```prisma
model credential {
  id              String       @id @db.VarChar(36)
  salt            Bytes?
  type            String?      @db.VarChar(255)
  user_id         String?      @db.VarChar(36)
  created_date    BigInt?
  user_label      String?      @db.VarChar(255)
  secret_data     String?
  credential_data String?
  priority        Int?

  user_entity     user_entity? @relation(fields: [user_id], references: [id])

  @@index([user_id], map: "idx_user_credential")
}
```

#### Ý nghĩa các trường:

| Trường | Kiểu | Mục đích |
|--------|------|----------|
| `id` | String | Primary key |
| `type` | String? | Loại credential: "password", "otp", "totp", "webauthn" |
| `user_id` | String? | Foreign key đến user_entity |
| `salt` | Bytes? | Salt cho password hashing (bcrypt tự quản lý) |
| `secret_data` | String? | Dữ liệu mật (hashed password, OTP secret) |
| `credential_data` | String? | Additional data (iterations, algorithm) |
| `priority` | Int? | Thứ tự ưu tiên khi có nhiều credentials |
| `user_label` | String? | Label do user đặt (VD: "Password chính", "Backup password") |

#### Workflow:

```
Login Flow:
1. User nhập username + password
   ↓
2. Tìm user_entity
   ↓
3. Tìm credential WHERE type='password' AND user_id=...
   ↓
4. Verify: bcrypt.compare(input_password, credential.secret_data)
   ↓
5. Nếu match → Đăng nhập thành công
```

#### Các loại Credential:

```typescript
enum CredentialType {
  PASSWORD = 'password',           // Mật khẩu
  OTP = 'otp',                     // One-time password
  TOTP = 'totp',                   // Time-based OTP (Google Authenticator)
  HOTP = 'hotp',                   // HMAC-based OTP
  WEBAUTHN = 'webauthn',           // WebAuthn/FIDO2
  PASSWORD_TOKEN = 'password-token' // Token reset password
}
```

---

### 2.3 federated_identity (Liên kết tài khoản xã hội)

**Vị trí**: Line 414

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

#### Ý nghĩa:

Lưu trữ liên kết giữa local user và external identity provider (Google, Facebook, GitHub).

#### Workflow:

```
Social Login Flow:
1. User click "Login with Google"
   ↓
2. Redirect đến Google, user authenticate
   ↓
3. Google redirect back với user info
   ↓
4. Tìm federated_identity WHERE identity_provider='google' AND federated_user_id=google_id
   ↓
5a. NẾU TÌM THẤY → Login với user hiện có
   ↓
5b. NẾU KHÔNG TÌM → Tạo user mới + federated_identity
```

#### Ví dụ data:

```json
{
  "identity_provider": "google",
  "federated_user_id": "105123456789012345678",
  "federated_username": "user@gmail.com",
  "user_id": "550e8400-...",
  "realm_id": "master",
  "token": "oauth2-token-from-google"
}
```

---

## 3. Identity Management Entities

### 3.1 realm (Multi-tenant realm)

**Vị trí**: Line 635

```prisma
model realm {
  id                          String   @id @db.VarChar(36)
  name                        String?  @unique @db.VarChar(255)
  enabled                     Boolean  @default(false)

  // Token lifetimes
  access_code_lifespan        Int?
  access_token_lifespan       Int?
  login_lifespan              Int?
  refresh_token_max_reuse     Int?    @default(0)

  // Session settings
  sso_idle_timeout            Int     @default(0)
  sso_max_lifespan            Int     @default(0)
  sso_idle_timeout_remember_me Int    @default(0)
  sso_max_lifespan_remember_me Int    @default(0)

  // Registration settings
  registration_allowed        Boolean  @default(false)
  verify_email                Boolean  @default(false)
  login_with_email_allowed    Boolean  @default(true)
  edit_username_allowed       Boolean  @default(false)
  duplicate_emails_allowed    Boolean  @default(false)

  // Password policies
  reset_password_allowed      Boolean  @default(false)

  // OTP settings
  otp_policy_digits           Int?     @default(6)
  otp_policy_period           Int?     @default(30)
  otp_policy_alg              String?  @default("HmacSHA1")
  otp_policy_type             String?  @default("totp")
  otp_policy_counter          Int?     @default(0)
  otp_policy_window           Int?     @default(1)

  // Authentication flows
  browser_flow               String?  @db.VarChar(36)
  registration_flow          String?  @db.VarChar(36)
  direct_grant_flow          String?  @db.VarChar(36)
  reset_credentials_flow     String?  @db.VarChar(36)
  client_auth_flow           String?  @db.VarChar(36)
  docker_auth_flow           String?  @db.VarChar(36)

  // Themes
  account_theme              String?  @db.VarChar(255)
  admin_theme                String?  @db.VarChar(255)
  email_theme                String?  @db.VarChar(255)
  login_theme                String?  @db.VarChar(255)

  // Events
  events_enabled             Boolean  @default(false)
  admin_events_enabled       Boolean  @default(false)
  events_expiration          BigInt?

  // Internationalization
  internationalization_enabled Boolean @default(false)
  default_locale              String? @db.VarChar(255)
  reg_email_as_username       Boolean @default(false)

  // ... many more fields

  // Relations
  authentication_execution  authentication_execution[]
  authentication_flow       authentication_flow[]
  authenticator_config      authenticator_config[]
  client                   client[]
  // ... more relations
}
```

#### Ý nghĩa:

**Realm** = Tenant / Organization / Environment riêng biệt. Mỗi realm có:
- Users riêng
- Roles riêng
- Clients riêng
- Configuration riêng
- Authentication flows riêng

#### Workflow Multi-tenancy:

```
Request: GET /auth/v1/users?realm_id=acme
                    ↓
            Filter users WHERE realm_id='acme'
                    ↓
            Chỉ trả về users thuộc realm "acme"
```

#### Các nhóm cấu hình quan trọng:

**1. Token Lifetimes**:
```prisma
access_token_lifespan = 3600  // 1 giờ
refresh_token_max_reuse = 0   // Không reuse refresh token
```

**2. Registration**:
```prisma
registration_allowed = true     // Cho phép tự đăng ký
verify_email = true             // Bắt buộc verify email
login_with_email_allowed = true // Cho phép login bằng email
```

**3. OTP Policy**:
```prisma
otp_policy_digits = 6        // OTP có 6 chữ số
otp_policy_alg = "HmacSHA1"  // Thuật toán HMAC-SHA1
otp_policy_type = "totp"     // Time-based OTP
```

---

### 3.2 client (OAuth/OIDC Client)

**Vị trí**: Line 99

```prisma
model client {
  id                      String     @id @db.VarChar(36)
  enabled                 Boolean    @default(false)
  full_scope_allowed      Boolean    @default(false)
  client_id               String?    @db.VarChar(255)
  secret                  String?    @db.VarChar(255)
  public_client           Boolean    @default(false)
  standard_flow_enabled   Boolean    @default(true)
  implicit_flow_enabled   Boolean    @default(false)
  direct_access_grants_enabled Boolean @default(false)
  consent_required        Boolean    @default(false)
  service_accounts_enabled Boolean   @default(false)
  client_authenticator_type String? @db.VarChar(255)

  // URLs
  base_url                String?    @db.VarChar(255)
  root_url                String?    @db.VarChar(255)
  management_url          String?    @db.VarChar(255)

  // ... more fields

  // Relations
  client_attributes        client_attributes[]
  redirect_uris            redirect_uris[]
  web_origins             web_origins[]
  scope_mapping           scope_mapping[]

  @@unique([realm_id, client_id])
  @@index([client_id])
}
```

#### Workflow OAuth:

```
1. App request authorization
   ↓
2. Redirect user đến: /auth/authorize?client_id=my-app&redirect_uri=http://localhost:3000/callback
   ↓
3. User login & approve
   ↓
4. Redirect với code: http://localhost:3000/callback?code=xyz
   ↓
5. App exchange code cho tokens
   ↓
6. Verify client_id + client_secret
   ↓
7. Return access_token + refresh_token
```

#### Client Types:

```typescript
// Confidential Client (Server-side)
{
  public_client: false,
  secret: "secret-key",
  client_authenticator_type: "client-secret"
}

// Public Client (SPA/Mobile)
{
  public_client: true,
  client_authenticator_type: "none"
}
```

---

### 3.3 keycloak_role (Role cho RBAC)

**Vị trí**: Line 521

```prisma
model keycloak_role {
  id                      String          @id @db.VarChar(36)
  name                    String?         @db.VarChar(255)
  description             String?         @db.VarChar(255)
  client_role             Boolean         @default(false)
  client                  String?         @db.VarChar(36)
  realm                   String?         @db.VarChar(36)
  client_realm_constraint String?         @db.VarChar(255)

  composite_role_composite_role_compositeTokeycloak_role  composite_role[]
  composite_role_composite_role_child_roleTokeycloak_role composite_role[]
  role_attribute          role_attribute[]

  @@unique([name, client_realm_constraint])
  @@index([client])
  @@index([realm])
}
```

#### Role Types:

```typescript
// Realm Role (Global role)
{
  name: "admin",
  client_role: false,
  realm: "master",
  client_realm_constraint: "master"
}

// Client Role (Specific to OAuth client)
{
  name: "app-admin",
  client_role: true,
  client: "my-app-client-id",
  client_realm_constraint: "my-app-client-id"
}
```

#### Role Hierarchy (Composite Role):

```prisma
model composite_role {
  composite     String  @db.VarChar(36)  // Parent role
  child_role    String  @db.VarChar(36)  // Child role

  keycloak_role_composite_role_compositeTokeycloak_role  keycloak_role @relation(...)
  keycloak_role_composite_role_child_roleTokeycloak_role keycloak_role @relation(...)

  @@id([composite, child_role])
}
```

**Ý nghĩa**: Role "admin" có thể bao gồm role "user" và "moderator" (composite relationship).

---

### 3.4 keycloak_group (Group)

**Vị trí**: Line 509

```prisma
model keycloak_group {
  id           String               @id @db.VarChar(36)
  name         String?              @db.VarChar(255)
  parent_group String               @db.VarChar(36)
  realm_id     String?              @db.VarChar(36)
  type         Int                  @default(0)

  group_attribute    group_attribute[]
  group_role_mapping group_role_mapping[]

  @@unique([realm_id, parent_group, name], map: "sibling_names")
}
```

#### Group Hierarchy:

```
Employees (parent_group: null)
├── Engineering (parent_group: employees-id)
│   ├── Backend Team (parent_group: engineering-id)
│   └── Frontend Team (parent_group: engineering-id)
└── Sales (parent_group: employees-id)
```

**Unique Constraint**: Không thể có 2 groups cùng tên trong cùng parent.

---

### 3.5 user_role_mapping (Gán role cho user)

**Vị trí**: Line 1113

```prisma
model user_role_mapping {
  role_id     String      @db.VarChar(255)
  user_id     String      @db.VarChar(36)

  user_entity user_entity @relation(fields: [user_id], references: [id])

  @@id([role_id, user_id])
  @@index([user_id])
}
```

#### Workflow Check Permission:

```
1. User request protected resource
   ↓
2. Get user_role_mapping WHERE user_id = ...
   ↓
3. Get role details for each role_id
   ↓
4. Check if role has required permission
   ↓
5. Allow/Deny access
```

---

### 3.6 user_group_membership (User trong group)

**Vị trí**: Line 1094

```prisma
model user_group_membership {
  group_id        String      @db.VarChar(36)
  user_id         String      @db.VarChar(36)
  membership_type String      @db.VarChar(255)

  user_entity     user_entity @relation(fields: [user_id], references: [id])

  @@id([group_id, user_id])
  @@index([user_id])
}
```

---

## 4. Authentication Flow Entities

### 4.1 authentication_flow (Flow container)

**Vị trí**: Line 56

```prisma
model authentication_flow {
  id          String     @id @db.VarChar(36)
  alias       String?    @db.VarChar(255)
  description String?    @db.VarChar(255)
  realm_id    String?    @db.VarChar(36)
  provider_id String     @default("basic-flow")
  top_level   Boolean    @default(false)
  built_in    Boolean    @default(false)

  authentication_execution authentication_execution[]
  realm                    realm? @relation(...)

  @@index([realm_id])
}
```

#### Standard Flows:

```typescript
enum StandardFlow {
  BROWSER = "browser",              // Login flow
  REGISTRATION = "registration",    // Sign up flow
  DIRECT_GRANT = "direct_grant",   // Resource owner password
  RESET_CREDENTIALS = "reset_credentials", // Forgot password
  CLIENT_AUTH = "client_auth"      // OAuth client auth
}
```

---

### 4.2 authentication_execution (Execution step)

**Vị trí**: Line 38

```prisma
model authentication_execution {
  id                  String               @id @db.VarChar(36)
  alias               String?              @db.VarChar(255)
  authenticator       String?              @db.VarChar(36)
  realm_id            String?              @db.VarChar(36)
  flow_id             String?              @db.VarChar(36)
  requirement         Int?
  priority            Int?
  authenticator_flow  Boolean              @default(false)
  auth_flow_id        String?              @db.VarChar(36)
  auth_config         String?              @db.VarChar(36)

  authentication_flow authentication_flow? @relation(...)
  realm               realm?               @relation(...)

  @@index([flow_id])
  @@index([realm_id, flow_id])
}
```

#### Requirement Types:

```typescript
enum Requirement {
  REQUIRED = 0,      // Bắt buộc hoàn thành
  OPTIONAL = 1,      // Có thể bỏ qua
  DISABLED = 2,      // Vô hiệu hóa
  ALTERNATIVE = 3,   // Chọn 1 trong các alternatives
  CONDITIONAL = 4    // Điều kiện cụ thể
}
```

#### Ví dụ Browser Flow:

```
Browser Flow
├── Execution 1: Identify user (priority: 10, requirement: REQUIRED)
├── Execution 2: Verify password (priority: 20, requirement: REQUIRED)
└── Execution 3: Check MFA (priority: 30, requirement: CONDITIONAL)
```

---

## 5. Session Management Entities

### 5.1 offline_user_session (Offline session)

**Vị trí**: Line 561

```prisma
model offline_user_session {
  user_session_id      String  @db.VarChar(36)
  user_id              String  @db.VarChar(255)
  realm_id             String  @db.VarChar(36)
  created_on           Int
  offline_flag         String  @db.VarChar(4)
  data                 String?
  last_session_refresh Int     @default(0)
  broker_session_id    String? @db.VarChar(1024)

  @@id([user_session_id, offline_flag])
  @@index([broker_session_id, realm_id])
  @@index([realm_id, offline_flag, last_session_refresh])
  @@index([user_id, realm_id, offline_flag])
}
```

#### Workflow:

```
1. User login với "Remember Me"
   ↓
2. Tạo offline_user_session với offline_flag='OFFLINE'
   ↓
3. Session có thể kéo dài nhiều ngày
   ↓
4. Check last_session_refresh để validate session
```

---

### 5.2 offline_client_session (Client-specific session)

**Vị trí**: Line 548

```prisma
model offline_client_session {
  user_session_id         String  @db.VarChar(36)
  client_id               String  @db.VarChar(255)
  offline_flag            String  @db.VarChar(4)
  timestamp               Int?
  data                    String?
  client_storage_provider String  @default("local")
  external_client_id      String  @default("local")
  version                 Int?    @default(0)

  @@id([user_session_id, client_id, client_storage_provider, external_client_id, offline_flag])
}
```

---

## 6. Event & Audit Entities

### 6.1 event_entity (User events)

**Vị trí**: Line 309

```prisma
model event_entity {
  id               String  @id @db.VarChar(36)
  type             String? @db.VarChar(255)
  realm_id         String? @db.VarChar(255)
  client_id        String? @db.VarChar(255)
  user_id          String? @db.VarChar(255)
  session_id       String? @db.VarChar(255)
  ip_address       String? @db.VarChar(255)
  event_time       BigInt?
  error            String? @db.VarChar(255)
  details_json     String? @db.VarChar(2550)

  @@index([realm_id, event_time])
}
```

#### Event Types:

```typescript
enum EventType {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  REGISTER = "REGISTER",
  UPDATE_PASSWORD = "UPDATE_PASSWORD",
  RESET_PASSWORD = "RESET_PASSWORD",
  VERIFY_EMAIL = "VERIFY_EMAIL",
  UPDATE_PROFILE = "UPDATE_PROFILE",
  REFRESH_TOKEN = "REFRESH_TOKEN",
  CODE_TO_TOKEN = "CODE_TO_TOKEN"
}
```

---

### 6.2 admin_event_entity (Admin events)

**Vị trí**: Line 10

```prisma
model admin_event_entity {
  id               String  @id @db.VarChar(36)
  realm_id         String? @db.VarChar(255)
  operation_type   String? @db.VarChar(255)
  resource_type    String? @db.VarChar(64)
  resource_path    String? @db.VarChar(2550)
  auth_user_id     String? @db.VarChar(255)
  ip_address       String? @db.VarChar(255)
  admin_event_time BigInt?
  representation   String?
  error            String? @db.VarChar(255)
  details_json     String?

  @@index([realm_id, admin_event_time])
}
```

#### Operation Types:

```typescript
enum AdminOperation {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
  READ = "READ",
  IMPLICIT_ACTION = "IMPLICIT_ACTION"
}
```

---

## 7. Authorization & Policy Entities

### 7.1 resource_server (Resource server cho authorization)

**Vị trí**: Line 845

```prisma
model resource_server {
  id                        String   @id @db.VarChar(36)
  allow_rs_remote_mgmt     Boolean  @default(false)
  policy_enforce_mode      Int      @db.SmallInt
  decision_strategy        Int      @default(1)

  resource_server_perm_ticket resource_server_perm_ticket[]
  resource_server_policy      resource_server_policy[]
  resource_server_resource    resource_server_resource[]
  resource_server_scope       resource_server_scope[]
}
```

#### Policy Enforce Modes:

```typescript
enum PolicyEnforceMode {
  ENFORCING = 1,      // Strict enforcement
  PERMISSIVE = 2,     // Allow if no policy
  DISABLED = 3        // No enforcement
}
```

---

### 7.2 resource_server_policy (Policy)

**Vị trí**: Line 876

```prisma
model resource_server_policy {
  id          String   @id @db.VarChar(36)
  name        String   @db.VarChar(255)
  description String?  @db.VarChar(255)
  type        String   @db.VarChar(255)
  logic       Int?     @db.SmallInt
  resource_server_id String @db.VarChar(36)
  owner       String?  @db.VarChar(255)

  associated_policy_associated_policy_associated_policy_idToresource_server_policy associated_policy[]
  policy_config                 policy_config[]
  resource_policy               resource_policy[]
  scope_policy                  scope_policy[]
  resource_server               resource_server @relation(...)

  @@unique([name, resource_server_id])
}
```

#### Policy Types:

```typescript
enum PolicyType {
  ROLE = "role",              // Role-based policy
  TIME = "time",              // Time-based policy
  USER = "user",              // User-based policy
  AGGREGATE = "aggregate",    // Aggregate policy
  CLIENT = "client",          // Client-based policy
  GROUP = "group"             // Group-based policy
}
```

---

## 8. Identity Provider Entities

### 8.1 identity_provider (IdP configuration)

**Vị trí**: Line 454

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
  link_only                  Boolean  @default(false)
  hide_on_login              Boolean?  @default(false)

  realm                      realm? @relation(...)
  identity_provider_config   identity_provider_config[]

  @@unique([provider_alias, realm_id])
  @@index([realm_id])
}
```

#### Provider IDs:

```typescript
enum ProviderID {
  GOOGLE = "google",
  FACEBOOK = "facebook",
  GITHUB = "github",
  MICROSOFT = "microsoft",
  APPLE = "apple",
  SAML = "saml",
  OIDC = "oidc"
}
```

---

## 9. Federation Entities

### 9.1 federated_user (Federated user entity)

**Vị trí**: Line 428

```prisma
model federated_user {
  id                  String  @id @db.VarChar(255)
  storage_provider_id String? @db.VarChar(255)
  realm_id            String  @db.VarChar(36)
}
```

---

### 9.2 fed_user_credential (Federated user credential)

**Vị trí**: Line 364

```prisma
model fed_user_credential {
  id                  String  @id @db.VarChar(36)
  salt                Bytes?
  type                String? @db.VarChar(255)
  created_date        BigInt?
  user_id             String  @db.VarChar(255)
  realm_id            String  @db.VarChar(36)
  storage_provider_id String? @db.VarChar(36)
  user_label          String? @db.VarChar(255)
  secret_data         String?
  credential_data     String?
  priority            Int?

  @@index([user_id, type])
  @@index([realm_id, user_id])
}
```

---

## 10. Organization Entities

### 10.1 org (Organization)

**Vị trí**: Line 578

```prisma
model org {
  id           String  @id @db.VarChar(255)
  enabled      Boolean
  realm_id     String  @db.VarChar(255)
  group_id     String  @unique @db.VarChar(255)
  name         String  @db.VarChar(255)
  description  String? @db.VarChar(4000)
  alias        String  @db.VarChar(255)
  redirect_url String? @db.VarChar(2048)

  @@unique([realm_id, alias])
  @@unique([realm_id, name])
}
```

#### Workflow Multi-organization:

```
1 Realm "company"
├── Organization "Engineering"
│   └── Group "Engineering Team"
│       └── Users: Alice, Bob
└── Organization "Sales"
    └── Group "Sales Team"
        └── Users: Carol, Dave
```

---

### 10.2 org_domain (Organization domain)

**Vị trí**: Line 592

```prisma
model org_domain {
  id       String  @db.VarChar(36)
  name     String  @db.VarChar(255)
  verified Boolean
  org_id   String  @db.VarChar(255)

  @@id([id, name])
  @@index([org_id])
}
```

---

## 🎯 Summary & Key Relationships

### Relationships Diagram:

```
user_entity (1) ──┬──< (N) credential
                   ├──< (N) federated_identity
                   ├──< (N) user_role_mapping ──┬──< keycloak_role
                   ├──< (N) user_group_membership ──┬──< keycloak_group
                   ├──< (N) user_required_action
                   └──< (N) user_consent

realm (1) ──┬──< (N) user_entity
            ├──< (N) keycloak_role
            ├──< (N) keycloak_group
            ├──< (N) client
            └──< (N) identity_provider

client (1) ──< (N) redirect_uris
           └──< (N) web_origins

authentication_flow (1) ──< (N) authentication_execution

identity_provider (1) ──< (N) federated_identity
```

---

## 📚 Next Steps

Để hiểu sâu hơn, hãy đọc:
1. **[Phần 3: Prisma 7 & Database](./03-prisma-7-va-database.md)** - Chi tiết về database
2. **[Phần 5: User Management](./05-quan-ly-user.md)** - CRUD operations
3. **[Phần 7: Roles & Groups](./07-quan-ly-role-group.md)** - RBAC implementation

---

**Document Version**: 1.0.0
**Last Updated**: 2025-03-18
**Author**: Auth Service Team
