# Phần 1: Kiến trúc Tổng quan

## 📋 Mục tiêu phần này

Hiểu được:
- ✅ Auth Service được thiết kế như thế nào
- ✅ Vai trò của Auth Service trong monorepo
- ✅ Lưu lượng dữ liệu và các thành phần chính
- ✅ Các patterns và conventions được sử dụng

---

## 🏗️ 1.1 Vị trí trong Monorepo

```
automation-with-claude-cli/
├── apps/
│   └── auth/                 # ✨ Auth Service (Port 3001)
│       ├── src/
│       ├── prisma/
│       └── .env
├── libs/                     # Shared Libraries
│   ├── auth-utilities/       # JWT Guards, Password hashing
│   ├── app-logger/          # Logging decorators
│   ├── caching/             # Cache management
│   └── common/              # Common utilities
└── packages/                # Prisma Clients
    └── auth-prisma-client/  # Generated Prisma client
```

### Mô hình Monorepo

```
┌─────────────────────────────────────────────────────────────┐
│                    PNPM Workspace Monorepo                   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Auth Service │  │ Other App 1  │  │ Other App 2  │      │
│  │  Port: 3001  │  │   Port: ...  │  │   Port: ...  │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
│         │                  │                  │              │
│         └──────────────────┴──────────────────┘              │
│                            │                                 │
│                  ┌─────────▼─────────┐                       │
│                  │  Shared Libraries │                       │
│                  │  - auth-utilities │                       │
│                  │  - app-logger     │                       │
│                  │  - common         │                       │
│                  └───────────────────┘                       │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 1.2 Auth Service Responsibilities

### Auth Service làm gì?

```
┌─────────────────────────────────────────────────────────────┐
│                    AUTH SERVICE (Port 3001)                  │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ✅ Authentication (Xác thực)                               │
│     • User Sign-up                                           │
│     • User Sign-in                                           │
│     • Password Management                                    │
│     • Token Generation (Access + Refresh)                    │
│                                                              │
│  ✅ Identity Management (Quản lý danh tính)                 │
│     • User CRUD Operations                                   │
│     • Multi-tenant Realms                                    │
│     • Roles & Groups                                         │
│     • Client Management (OAuth/OIDC)                         │
│                                                              │
│  ✅ Authorization (Phân quyền)                               │
│     • Role-Based Access Control (RBAC)                       │
│     • Group-Based Permissions                               │
│     • Client Scopes                                          │
│                                                              │
│  ✅ Security & Compliance                                    │
│     • Event & Audit Logging                                  │
│     • Session Management                                     │
│     • Required Actions                                       │
│     • Identity Providers                                     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 1.3 Authentication Flow

### Đăng ký User (Sign Up)

```
┌─────────┐         ┌────────────┐         ┌──────────┐
│ Client  │────────▶│ Auth API   │────────▶│ Database │
│ (App)   │        │ /signup    │         │ auth_db  │
└─────────┘         └────────────┘         └──────────┘
    │                     │                      │
    │ 1. POST /signup     │                      │
    │    {email, password}│                      │
    │                     │                      │
    │                     │ 2. Hash password     │
    │                     │    (bcrypt)          │
    │                     │                      │
    │                     │ 3. Create user       │
    │                     │                      │
    │◀─────────────────────│ 4. Return user      │
    │    {id, email, ...}  │    profile          │
    │                      │                      │
```

### Đăng nhập (Sign In)

```
┌─────────┐         ┌────────────┐         ┌──────────┐
│ Client  │────────▶│ Auth API   │────────▶│ Database │
│ (App)   │         │ /signin    │         │ auth_db  │
└─────────┘         └────────────┘         └──────────┘
    │                     │                      │
    │ 1. POST /signin     │                      │
    │    {email, password}│                      │
    │                     │                      │
    │                     │ 2. Find user &       │
    │                     │    verify password   │
    │                     │                      │
    │                     │ 3. Generate JWT:     │
    │                     │    - Access Token    │
    │                     │    - Refresh Token   │
    │                     │                      │
    │                     │ 4. Store refresh     │
    │                     │    token in DB       │
    │◀─────────────────────│ 5. Return tokens    │
    │    {access_token,    │                      │
    │     refresh_token}   │                      │
```

### Sử dụng Access Token

```
┌─────────┐         ┌────────────┐         ┌──────────────┐
│ Client  │────────▶│ Any API    │────────▶│ JWT Guard    │
│ (App)   │         │ Protected  │         │ Validation   │
└─────────┘         │ Endpoint   │         └──────────────┘
    │                     │                      │
    │ 1. GET /profile     │                      │
    │    Authorization:   │                      │
    │    Bearer <token>   │                      │
    │                     │                      │
    │                     │                      │ 2. Verify JWT
    │                     │                      │    signature
    │                     │                      │    (no DB!)
    │                     │                      │
    │◀─────────────────────│ 3. Extract user     │
    │    {user data}       │    from JWT payload │
    │                      │                      │
```

> **💡 Key Point**: JWT Access Token validation KHÔNG cần database lookup!
> Token chứa sẵn user info trong payload, chỉ cần verify signature.

---

## 🏛️ 1.4 Kiến trúc Chi tiết

### Module Structure

```
apps/auth/src/
├── main.ts                    # Bootstrap Fastify + Scalar
├── app.module.ts              # Root module
│
├── auth/                      # 🔐 Authentication
│   ├── auth.controller.ts     # /signup, /signin, /refresh
│   ├── auth.service.ts        # Business logic
│   ├── strategies/
│   │   └── jwt.strategy.ts    # Passport JWT strategy
│   └── dto/
│       ├── signup.dto.ts
│       └── signin.dto.ts
│
├── users/                     # 👥 User Management
│   ├── users.controller.ts    # CRUD endpoints
│   ├── users.service.ts
│   └── dto/
│
├── realms/                    # 🌍 Multi-tenant Realms
│   ├── realms.controller.ts
│   ├── realms.service.ts
│   └── dto/
│
├── roles/                     # 🔑 Role Management
│   ├── roles.controller.ts
│   ├── roles.service.ts
│   └── dto/
│
├── groups/                    # 👨‍👩‍👧‍👦 Group Management
│   ├── groups.controller.ts
│   ├── groups.service.ts
│   └── dto/
│
├── clients/                   # 📱 OAuth/OIDC Clients
│   ├── clients.controller.ts
│   ├── clients.service.ts
│   └── dto/
│
├── sessions/                  # 🔄 Session Management
│   ├── sessions.controller.ts
│   └── sessions.service.ts
│
├── required-actions/          # ⚠️ Required Actions
│   ├── required-actions.controller.ts
│   └── dto/
│
├── events/                    # 📊 Event Logging
│   ├── events.controller.ts
│   └── events.service.ts
│
├── authentication-flows/      # 🔗 Auth Flows
│   ├── authentication-flows.controller.ts
│   └── dto/
│
├── identity-providers/        # 🌐 Social Login/SSO
│   ├── identity-providers.controller.ts
│   └── dto/
│
├── prisma/                    # 💾 Database
│   ├── prisma.module.ts
│   └── prisma.service.ts
│
├── guards/                    # 🛡️ Guards
│   ├── realm-scope.guard.ts
│   └── index.ts
│
├── common/                    # 🔧 Common utilities
│   ├── decorators/
│   ├── interceptors/
│   └── enum/
│
└── dto/                       # 📦 Shared DTOs
    ├── common.dto.ts
    └── paginated-response.dto.ts
```

### Technology Stack

```
┌─────────────────────────────────────────────────────────┐
│                   Technology Stack                      │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Framework:     NestJS + Fastify Adapter                │
│  Language:      TypeScript 5.x                          │
│  Database:      PostgreSQL 14+                         │
│  ORM:           Prisma 7 (with driver adapters)        │
│  Auth:          JWT (Access + Refresh tokens)          │
│  Password:      bcrypt (salt rounds: 10)               │
│  Validation:    class-validator + class-transformer     │
│  API Docs:      Scalar (OpenAPI/Swagger)               │
│  Bundler:       Rspack (fast dev builds)               │
│  Package Mgr:   pnpm workspace                         │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## 📡 1.5 API Endpoints Overview

### Base URL

```
http://localhost:3001/auth/v1
```

### Endpoints Structure

```
/auth/v1
├── Authentication (Public)
│   ├── POST   /signup              # Register new user
│   ├── POST   /signin              # Login
│   ├── POST   /refresh             # Refresh access token
│   ├── POST   /logout              # Revoke refresh token
│   └── GET    /profile             # Get current user (protected)
│
├── Realms (Protected)
│   ├── GET    /realms              # List all realms
│   ├── POST   /realms              # Create realm
│   ├── GET    /realms/:id          # Get realm details
│   ├── PATCH  /realms/:id          # Update realm
│   └── DELETE /realms/:id          # Delete realm
│
├── Users (Protected)
│   ├── GET    /users               # List users (paginated)
│   ├── POST   /users               # Create user
│   ├── GET    /users/:id           # Get user
│   ├── PATCH  /users/:id           # Update user
│   └── DELETE /users/:id           # Delete user
│
├── Roles (Protected)
│   ├── GET    /roles               # List roles
│   ├── POST   /roles               # Create role
│   ├── GET    /roles/:id           # Get role
│   ├── PATCH  /roles/:id           # Update role
│   └── DELETE /roles/:id           # Delete role
│
├── Groups (Protected)
│   ├── GET    /groups              # List groups
│   ├── POST   /groups              # Create group
│   ├── GET    /groups/:id          # Get group
│   ├── PATCH  /groups/:id          # Update group
│   └── DELETE /groups/:id          # Delete group
│
├── Clients (Protected)
│   ├── GET    /clients             # List OAuth clients
│   ├── POST   /clients             # Create client
│   ├── GET    /clients/:id         # Get client
│   ├── PATCH  /clients/:id         # Update client
│   └── DELETE /clients/:id         # Delete client
│
├── Sessions (Protected)
│   ├── GET    /sessions            # List user sessions
│   ├── DELETE /sessions/:id        # Revoke session
│
├── Required Actions (Protected)
│   ├── GET    /required-actions    # List required actions
│   ├── POST   /required-actions    # Create required action
│
├── Events (Protected)
│   ├── GET    /events              # List event logs
│   └── GET    /admin-events        # List admin events
│
├── Authentication Flows (Protected)
│   ├── GET    /authentication-flows    # List flows
│   └── GET    /authentication-flows/:id # Get flow
│
└── Identity Providers (Protected)
    ├── GET    /identity-providers     # List IdPs
    ├── POST   /identity-providers     # Create IdP
    └── ...
```

---

## 🔐 1.6 JWT Token Structure

### Access Token Payload

```typescript
interface JwtPayloadDto {
  sub: string;          // User ID (UUID)
  email: string;        // User email
  first_name?: string;  // First name
  last_name?: string;   // Last name
  iat: number;          // Issued at timestamp
  exp: number;          // Expiration timestamp
}
```

### Example Token

```json
// Header
{
  "alg": "HS256",
  "typ": "JWT"
}

// Payload
{
  "sub": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "iat": 1710700800,
  "exp": 1710704400
}

// Signature
// HMACSHA256(
//   base64UrlEncode(header) + "." + base64UrlEncode(payload),
//   JWT_SECRET
// )
```

### Token Lifetimes

```
┌─────────────────────────────────────────────────────────┐
│                    Token Lifetimes                      │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Access Token:    1 hour (default)                      │
│  Refresh Token:   7 days (default)                      │
│                                                          │
│  Environment Variables:                                  │
│    JWT_EXPIRES_IN=1h                                    │
│    JWT_REFRESH_EXPIRES_IN=7d                            │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## 🎨 1.7 Conventions & Patterns

### Naming Conventions

#### API DTOs (snake_case)

```typescript
// ✅ CORRECT - API properties in snake_case
export class UserResponseDto {
  id: string;
  first_name: string;      // snake_case
  last_name: string;       // snake_case
  email_verified: boolean; // snake_case
  created_at: Date;        // snake_case
}
```

#### TypeScript Variables (camelCase)

```typescript
// ✅ CORRECT - Variables in camelCase
const passwordHash = await bcrypt.hash(password, 10);
const existingUser = await this.prisma.user.findUnique({ where: { email } });
```

#### Database Fields (snake_case, singular tables)

```prisma
// ✅ CORRECT - Schema in snake_case, singular table
model user {
  id            String   @id @default(uuid())
  password_hash String
  first_name    String?
  is_active     Boolean  @default(true)

  @@map("user")  // Singular, not "users"
}
```

### Error Handling Pattern

```typescript
// ✅ Use NestJS built-in exceptions
throw new ConflictException('User already exists');
throw new UnauthorizedException('Invalid credentials');
throw new NotFoundException('User not found');
throw new BadRequestException('Invalid input');
```

### Response Format

#### Success Response

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "is_active": true,
  "email_verified": false,
  "created_at": "2025-03-18T10:00:00.000Z",
  "updated_at": "2025-03-18T10:00:00.000Z"
}
```

#### Error Response

```json
{
  "statusCode": 401,
  "message": "Invalid credentials",
  "error": "Unauthorized"
}
```

#### Paginated Response

```json
{
  "data": [...],      // Array of items
  "meta": {
    "total": 100,
    "page": 0,
    "limit": 20,
    "total_pages": 5
  }
}
```

---

## 📊 1.8 Database Schema Overview

### Key Entities

```
┌────────────────────────────────────────────────────────┐
│                   Database Schema                      │
├────────────────────────────────────────────────────────┤
│                                                        │
│  Core Entities:                                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │
│  │ user_entity │──│ credential  │  │    realm    │  │
│  └─────────────┘  └─────────────┘  └─────────────┘  │
│         │                                  │          │
│         ├──────────┬──────────┬─────────────┘          │
│         ▼          ▼          ▼                        │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐                  │
│  │   role  │ │  group  │ │ client  │                  │
│  └─────────┘ └─────────┘ └─────────┘                  │
│                                                        │
│  Session Management:                                   │
│  ┌──────────────────┐  ┌──────────────────┐          │
│  │ refresh_token    │  │ offline_session  │          │
│  └──────────────────┘  └──────────────────┘          │
│                                                        │
│  Event Logging:                                       │
│  ┌──────────────────┐  ┌──────────────────┐          │
│  │  event_entity    │  │ admin_event      │          │
│  └──────────────────┘  └──────────────────┘          │
│                                                        │
│  Configuration:                                       │
│  ┌──────────────────┐  ┌──────────────────┐          │
│  │ authentication   │  │ identity_        │          │
│  │      _flow       │  │   provider       │          │
│  └──────────────────┘  └──────────────────┘          │
│                                                        │
└────────────────────────────────────────────────────────┘
```

> **Chi tiết**: Xem [Phần 3 - Prisma 7 & Database](./03-prisma-7-va-database.md)

---

## ❓ FAQ

### Q1: Tại sao sử dụng JWT thay vì Session-based auth?

**A**: JWT có nhiều ưu điểm:
- ✅ **Stateless**: Không cần lưu session trên server
- ✅ **Scalable**: Dễ dàng scale horizontally
- ✅ **Cross-domain**: Dùng cho microservices
- ✅ **Performance**: Không cần DB lookup cho mỗi request

### Q2: Refresh Token để làm gì?

**A**: Refresh Token giải quyết 2 vấn đề:
1. **Security**: Access token ngắn hạn (1h) = giảm thiểu risk nếu bị lộ
2. **UX**: User không phải đăng nhập lại liên tục

### Q3: Tại sao lại tách Auth Service riêng?

**A**: Theo pattern **Centralized Auth Service**:
- ✅ Tất cả user data ở 1 chỗ
- ✅ Dễ quản lý security policies
- ✅ Các service khác chỉ validate JWT signature
- ✅ Single source of truth cho authentication

### Q4: Prisma 7 khác gì Prisma 6?

**A**: Prisma 7 hỗ trợ **Driver Adapters**:
- Cho phép dùng connection pooling (PgBouncer)
- Flexible deployment options
- Cần config file `prisma.config.ts` thêm

### Q5: Tại sao API properties dùng snake_case?

**A**: Theo **API convention**:
- JSON API phổ biến nhất là snake_case (JavaScript, Python, Ruby)
- Database fields cũng snake_case
- TypeScript variables camelCase (chỉ internal)

---

## 🎯 Summary

### Key Takeaways

1. ✅ **Auth Service** là centralized service cho authentication & identity management
2. ✅ **JWT Access Token** chứa user info, không cần DB lookup khi validate
3. ✅ **Refresh Token** được lưu trong DB để cấp access token mới
4. ✅ **Multi-tenant** thông qua Realms
5. ✅ **Monorepo architecture** với shared libraries

### Next Steps

Tiếp tục đọc:
- **[Phần 2: Thiết lập & Cài đặt](./02-thiet-lap-va-cai-dat.md)** - Hướng dẫn chi tiết cách setup

---

**Document Version**: 1.0.0
**Last Updated**: 2025-03-18
