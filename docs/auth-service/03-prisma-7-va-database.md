# Phần 3: Prisma 7 & Database Schema

## 📋 Mục tiêu phần này

Hiểu được:
- ✅ Prisma 7 và Driver Adapters
- ✅ Database schema structure
- ✅ Các entities chính và relationships
- ✅ Naming conventions trong database

---

## 🆕 3.1 Prisma 7 Overview

### Prisma 7 có gì mới?

```
┌─────────────────────────────────────────────────────────┐
│              Prisma 7 Highlights                       │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ✅ Driver Adapters Support                            │
│     • Connection pooling (PgBouncer)                   │
│     • Serverless/Edge deployment                       │
│     • Flexible runtime options                         │
│                                                          │
│  ✅ Prisma.config.ts                                   │
│     • Separate config file                            │
│     • Environment variable handling                   │
│     • Driver configuration                            │
│                                                          │
│  ✅ Scoped Packages                                     │
│     • Generated client to packages/                   │
│     • Better monorepo support                         │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### Prisma Config File

```typescript
// apps/auth/prisma/prisma.config.ts
import type { PrismaClientOptions } from '@prisma/client';

const options: PrismaClientOptions = {
  // Driver adapter configuration for Prisma 7
  // No direct DATABASE_URL in schema
};

export default options;
```

### Schema File Structure

```prisma
// apps/auth/prisma/schema.prisma

// ⚠️ NO url in datasource for Prisma 7
datasource db {
  provider = "postgresql"
}

generator client {
  provider        = "prisma-client-js"
  output          = "../../../packages/auth-prisma-client/src"
}
```

---

## 🗄️ 3.2 Database Schema Overview

### Entity Categories

```
┌─────────────────────────────────────────────────────────┐
│                  Database Entities                     │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  1️⃣ Authentication Core                                │
│     • user_entity          • credential                │
│     • federated_identity    • federated_user           │
│                                                          │
│  2️⃣ Identity Management                              │
│     • realm                • client                    │
│     • keycloak_role        • keycloak_group           │
│     • user_role_mapping    • user_group_membership    │
│                                                          │
│  3️⃣ Session Management                               │
│     • refresh_token        • offline_user_session     │
│     • offline_client_session                            │
│                                                          │
│  4️⃣ Authentication Configuration                      │
│     • authentication_flow   • authentication_execution │
│     • authenticator_config                             │
│                                                          │
│  5️⃣ Identity Providers                               │
│     • identity_provider    • identity_provider_mapper  │
│     • identity_provider_config                         │
│                                                          │
│  6️⃣ Event Logging                                   │
│     • event_entity         • admin_event_entity       │
│                                                          │
│  7️⃣ Authorization                                   │
│     • resource_server      • resource_server_policy   │
│     • resource_server_resource                          │
│                                                          │
│  8️⃣ Organizations                                   │
│     • org                  • org_domain               │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## 👤 3.3 Authentication Core Entities

### user_entity (Line 1018)

```prisma
model user_entity {
  id                          String                  @id(map: "constraint_fb") @db.VarChar(36)
  email                       String?                 @db.VarChar(255)
  email_constraint            String?                 @db.VarChar(255)
  email_verified              Boolean                 @default(false)
  enabled                     Boolean                 @default(false)
  federation_link             String?                 @db.VarChar(255)
  first_name                  String?                 @db.VarChar(255)
  last_name                   String?                 @db.VarChar(255)
  realm_id                    String?                 @db.VarChar(255)
  username                    String?                 @db.VarChar(255)
  created_timestamp           BigInt?
  service_account_client_link String?                 @db.VarChar(255)
  not_before                  Int                     @default(0)

  // Relations
  credential                  credential[]
  federated_identity          federated_identity[]
  user_attribute              user_attribute[]
  user_consent                user_consent[]
  user_group_membership       user_group_membership[]
  user_required_action        user_required_action[]
  user_role_mapping           user_role_mapping[]

  @@unique([realm_id, email_constraint], map: "uk_dykn684sl8up1crfei6eckhd7")
  @@unique([realm_id, username], map: "uk_ru8tt6t700s9v50bu18ws5ha6")
  @@index([email], map: "idx_user_email")
  @@index([realm_id, service_account_client_link], map: "idx_user_service_account")
}
```

**Purpose**: Entity chính lưu trữ thông tin người dùng

**Key Fields**:
- `id`: UUID primary key
- `email/email_constraint`: Email với unique constraint per realm
- `username`: Username unique per realm
- `enabled`: User có active không
- `email_verified`: Email đã xác thực chưa
- `realm_id`: Multi-tenant support

### credential (Line 256)

```prisma
model credential {
  id              String       @id(map: "constraint_f") @db.VarChar(36)
  salt            Bytes?
  type            String?      @db.VarChar(255)
  user_id         String?      @db.VarChar(36)
  created_date    BigInt?
  user_label      String?      @db.VarChar(255)
  secret_data     String?
  credential_data String?
  priority        Int?

  user_entity     user_entity? @relation(fields: [user_id], references: [id], onDelete: NoAction, onUpdate: NoAction, map: "fk_pfyr0glasqyl0dei3kl69r6v0")

  @@index([user_id], map: "idx_user_credential")
}
```

**Purpose**: Lưu trữ credentials (password, OTP, etc.)

**Key Fields**:
- `type`: Loại credential (password, totp, etc.)
- `secret_data`: Dữ liệu mật (hashed password, OTP secret)
- `priority`: Thứ tự ưu tiên khi có multiple credentials

### federated_identity (Line 414)

```prisma
model federated_identity {
  identity_provider  String      @db.VarChar(255)
  realm_id           String?     @db.VarChar(36)
  federated_user_id  String?     @db.VarChar(255)
  federated_username String?     @db.VarChar(255)
  token              String?
  user_id            String      @db.VarChar(36)

  user_entity        user_entity @relation(fields: [user_id], references: [id], onDelete: NoAction, onUpdate: NoAction, map: "fk404288b92ef007a6")

  @@id([identity_provider, user_id], map: "constraint_40")
  @@index([federated_user_id], map: "idx_fedidentity_feduser")
  @@index([user_id], map: "idx_fedidentity_user")
}
```

**Purpose**: Liên kết user với external identity providers (Google, Facebook, etc.)

---

## 🌍 3.4 Identity Management Entities

### realm (Line 635)

```prisma
model realm {
  id                                       String                      @id(map: "constraint_4a") @db.VarChar(36)
  name                                     String?                     @unique(map: "uk_orvsdmla56612eaefiq6wl5oi") @db.VarChar(255)
  enabled                                  Boolean                     @default(false)

  // Token lifetimes
  access_code_lifespan                     Int?
  access_token_lifespan                    Int?
  login_lifespan                           Int?

  // User settings
  registration_allowed                     Boolean                     @default(false)
  reset_password_allowed                   Boolean                     @default(false)
  verify_email                             Boolean                     @default(false)
  login_with_email_allowed                 Boolean                     @default(true)
  edit_username_allowed                    Boolean                     @default(false)

  // OTP settings
  otp_policy_digits                        Int?                        @default(6)
  otp_policy_period                        Int?                        @default(30)
  otp_policy_alg                           String?                     @default("HmacSHA1") @db.VarChar(36)
  otp_policy_type                          String?                     @default("totp") @db.VarChar(36)

  // Authentication flows
  browser_flow                             String?                     @db.VarChar(36)
  registration_flow                        String?                     @db.VarChar(36)
  direct_grant_flow                        String?                     @db.VarChar(36)
  reset_credentials_flow                   String?                     @db.VarChar(36)

  // ... many more fields

  // Relations
  authentication_execution                 authentication_execution[]
  authentication_flow                      authentication_flow[]
  keycloak_role_keycloak_role_realmTorealm keycloak_role[]
  // ... more relations
}
```

**Purpose**: Multi-tenant realm configuration

**Key Features**:
- Token lifetime configuration
- User registration settings
- OTP policies
- Authentication flow bindings
- Event & SMTP configuration

### client (Line 99)

```prisma
model client {
  id                           String                      @id(map: "constraint_7") @db.VarChar(36)
  enabled                      Boolean                     @default(false)
  client_id                    String?                     @db.VarChar(255)
  secret                       String?                     @db.VarChar(255)

  // OAuth flows
  public_client                Boolean                     @default(false)
  standard_flow_enabled        Boolean                     @default(true)
  implicit_flow_enabled        Boolean                     @default(false)
  direct_access_grants_enabled Boolean                     @default(false)

  // Security
  consent_required             Boolean                     @default(false)
  service_accounts_enabled     Boolean                     @default(false)

  // URLs
  base_url                     String?                     @db.VarChar(255)
  root_url                     String?                     @db.VarChar(255)
  management_url               String?                     @db.VarChar(255)

  // ... more fields

  // Relations
  client_attributes            client_attributes[]
  protocol_mapper              protocol_mapper[]
  redirect_uris                redirect_uris[]
  web_origins                  web_origins[]
  scope_mapping                scope_mapping[]

  @@unique([realm_id, client_id], map: "uk_b71cjlbenv945rb6gcon438at")
  @@index([client_id], map: "idx_client_id")
}
```

**Purpose**: OAuth/OIDC client configuration

**Key Features**:
- OAuth 2.0 flow support (Authorization Code, Implicit, Resource Owner Password)
- Client authentication (secret vs public)
- Redirect URI management
- Scope mapping

### keycloak_role (Line 521)

```prisma
model keycloak_role {
  id                      String          @id(map: "constraint_a") @db.VarChar(36)
  name                    String?         @db.VarChar(255)
  description             String?         @db.VarChar(255)
  client_role             Boolean         @default(false)
  client                  String?         @db.VarChar(36)
  realm                   String?         @db.VarChar(36)

  // Composite roles (role hierarchy)
  composite_role_composite_role_compositeTokeycloak_role  composite_role[]
  composite_role_composite_role_child_roleTokeycloak_role composite_role[]
  role_attribute          role_attribute[]

  @@unique([name, client_realm_constraint], map: "UK_J3RWUVD56ONTGSUHOGM184WW2-2")
  @@index([client], map: "idx_keycloak_role_client")
  @@index([realm], map: "idx_keycloak_role_realm")
}
```

**Purpose**: Role cho RBAC (Role-Based Access Control)

**Key Features**:
- Realm roles vs Client roles
- Composite roles (roles containing other roles)
- Role attributes

### keycloak_group (Line 509)

```prisma
model keycloak_group {
  id                 String               @id(map: "constraint_group") @db.VarChar(36)
  name               String?              @db.VarChar(255)
  parent_group       String               @db.VarChar(36)
  realm_id           String?              @db.VarChar(36)
  type               Int                  @default(0)

  group_attribute    group_attribute[]
  group_role_mapping group_role_mapping[]

  @@unique([realm_id, parent_group, name], map: "sibling_names")
}
```

**Purpose**: Groups để tổ chức users

**Key Features**:
- Hierarchical (parent_group)
- Unique name per parent
- Type field cho group types

---

## 🔄 3.5 Session Management

### refresh_token (Not in schema - custom)

```typescript
// Custom table for JWT refresh tokens
model refresh_token {
  id         String   @id @default(uuid())
  token      String   @unique
  user_id    String
  expires_at DateTime
  revoked_at DateTime?
  created_at DateTime @default(now())

  user       user    @relation(fields: [user_id], references: [id])
}
```

**Purpose**: Lưu refresh tokens để revoke và validate

### offline_user_session (Line 561)

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

  @@id([user_session_id, offline_flag], map: "constraint_offl_us_ses_pk2")
}
```

**Purpose**: Offline sessions cho long-lived refresh tokens

---

## 📊 3.6 Event Logging

### event_entity (Line 309)

```prisma
model event_entity {
  id               String  @id(map: "constraint_4") @db.VarChar(36)
  type             String? @db.VarChar(255)
  realm_id         String? @db.VarChar(255)
  client_id        String? @db.VarChar(255)
  user_id          String? @db.VarChar(255)
  session_id       String? @db.VarChar(255)
  ip_address       String? @db.VarChar(255)
  event_time       BigInt?
  error            String? @db.VarChar(255)
  details_json     String? @db.VarChar(2550)

  @@index([realm_id, event_time], map: "idx_event_time")
}
```

**Purpose**: User events cho audit trail

**Event Types**:
- LOGIN, LOGOUT
- REGISTER, UPDATE_PROFILE
- UPDATE_PASSWORD, RESET_PASSWORD
- VERIFY_EMAIL

### admin_event_entity (Line 10)

```prisma
model admin_event_entity {
  id               String  @id(map: "constraint_admin_event_entity") @db.VarChar(36)
  realm_id         String? @db.VarChar(255)
  operation_type   String? @db.VarChar(255)
  resource_type    String? @db.VarChar(64)
  resource_path    String? @db.VarChar(2550)
  auth_user_id     String? @db.VarChar(255)
  ip_address       String? @db.VarChar(255)
  admin_event_time BigInt?
  representation   String?
  error            String? @db.VarChar(255)

  @@index([realm_id, admin_event_time], map: "idx_admin_event_time")
}
```

**Purpose**: Admin operation logging

---

## 🔐 3.7 Naming Conventions

### Database Table Names

```prisma
// ✅ CORRECT - Singular table names
model user_entity {      // Maps to "user_entity" table
  // ...
}

model keycloak_role {    // Maps to "keycloak_role" table
  // ...
}

// ❌ WRONG - Don't use plural
model users {            // Don't do this
  // ...
}
```

### Field Names

```prisma
// ✅ CORRECT - snake_case fields
model user_entity {
  first_name      String?  @db.VarChar(255)
  last_name       String?  @db.VarChar(255)
  email_verified  Boolean  @default(false)
  created_timestamp BigInt?
}

// ❌ WRONG - Don't use camelCase
model user_entity {
  firstName       String?  // Don't do this
  lastName        String?
}
```

### Index Names

```prisma
// ✅ CORRECT - Descriptive index names
@@index([user_id], map: "idx_user_credential")
@@index([realm_id, event_time], map: "idx_event_time")

// ❌ WRONG - Generic names
@@index([user_id])  // Missing map name
```

### Relation Names

```prisma
// ✅ CORRECT - Explicit relation names
credential  credential[] @relation("CredentialToUser")
user_entity user_entity? @relation("CredentialToUser")

// ❌ WRONG - Auto-generated names can be confusing
credential  credential[]
user_entity user_entity?
```

---

## 🔗 3.8 Relationships

### One-to-Many

```prisma
// One user has many credentials
model credential {
  user_id     String
  user_entity user_entity @relation(fields: [user_id], references: [id])
}

model user_entity {
  credential credential[]
}
```

### Many-to-Many

```prisma
// User ↔ Role mapping
model user_role_mapping {
  role_id     String      @db.VarChar(255)
  user_id     String      @db.VarChar(36)
  user_entity user_entity @relation(fields: [user_id], references: [id])
  // ... role relation

  @@id([role_id, user_id])
}

model user_entity {
  user_role_mapping user_role_mapping[]
}
```

### Self-Referencing

```prisma
// Group hierarchy
model keycloak_group {
  id           String @id
  parent_group String @db.VarChar(36)

  // Children
  keycloak_group keycloak_group[] @relation("GroupHierarchy")
  // Parent
  parent        keycloak_group?   @relation("GroupHierarchy", fields: [parent_group], references: [id])
}
```

---

## 📝 3.9 Prisma Client Usage

### Import Generated Client

```typescript
// apps/auth/src/prisma/prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@auth/prisma-client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
```

### Basic CRUD

```typescript
// Create
const user = await prisma.user_entity.create({
  data: {
    email: 'user@example.com',
    username: 'user123',
    enabled: true,
  },
});

// Read
const user = await prisma.user_entity.findUnique({
  where: { id: userId },
  include: {
    credential: true,
    user_role_mapping: true,
  },
});

// Update
const user = await prisma.user_entity.update({
  where: { id: userId },
  data: { first_name: 'John' },
});

// Delete
await prisma.user_entity.delete({
  where: { id: userId },
});
```

### Transactions

```typescript
// Create user with credential
const user = await prisma.$transaction(async (tx) => {
  const newUser = await tx.user_entity.create({
    data: { email: 'user@example.com' },
  });

  await tx.credential.create({
    data: {
      user_id: newUser.id,
      type: 'password',
      secret_data: hashedPassword,
    },
  });

  return newUser;
});
```

---

## ❓ FAQ

### Q1: Tại sao dùng BigInt thay cho DateTime?

**A**: BigInt timestamps:
- ✅ Database-agnostic (PostgreSQL, MySQL, SQLite)
- ✅ Easy to calculate differences
- ✅ Unix timestamps (milliseconds since epoch)

### Q2: `@map` và `@@map` khác gì nhau?

**A**:
- `@map`: Rename column (field level)
- `@@map`: Rename table (model level)

```prisma
model User {
  id    String @id
  name  String @map("user_name")  // Column name

  @@map("users")  // Table name
}
```

### Q3: `onDelete: NoAction` có nghĩa gì?

**A**: NoAction = RESTRICT trong SQL
- Không cho xóa nếu có referenced records
- Khác `CASCADE`: sẽ xóa cả records con

### Q4: Tại sao có `email_constraint` riêng?

**A**: Keycloak pattern:
- `email`: User input (case-insensitive lookup)
- `email_constraint`: Lowercase, unique constraint

---

## 🎯 Summary

### Key Points

1. ✅ **Prisma 7** sử dụng driver adapters với prisma.config.ts
2. ✅ **Schema** dùng snake_case, singular table names
3. ✅ **Multi-tenant** qua realm_id
4. ✅ **Relationships** rõ ràng với explicit relation names
5. ✅ **Indexes** optimize cho common queries

### Next Steps

- **[Phần 4: JWT Authentication](./04-xac-thuc-jwt.md)** - Chi tiết authentication flow

---

**Document Version**: 1.0.0
**Last Updated**: 2025-03-18
