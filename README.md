# NestJS Fastify Monorepo

A production-ready NestJS monorepo with separate API and Auth services, Fastify, PostgreSQL, Prisma 7, and Rspack for fast development.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Database Setup](#database-setup)
- [Development](#development)
- [Services](#services)
- [Available Scripts](#available-scripts)
- [API Endpoints](#api-endpoints)
- [Keycloak Setup](#keycloak-setup)
- [Skills](#skills)
- [Libraries](#libraries)
- [Testing](#testing)

## Features

- ✅ **NestJS 11.1** - Latest NestJS framework
- ✅ **Fastify 5.x** - High-performance HTTP adapter
- ✅ **Monorepo** - Apps and libs with pnpm workspaces
- ✅ **Separate Services** - API and Auth with isolated databases
- ✅ **PostgreSQL** - Each service has its own database
- ✅ **Prisma 7** - Modern ORM with driver adapters
- ✅ **OAuth 2.x Authentication** - JWT-based auth with refresh tokens
- ✅ **Keycloak Integration** - Centralized identity and access management
- ✅ **Social Login** - OAuth providers (Google, GitHub, Facebook)
- ✅ **Role-Based Access Control** - RBAC with Keycloak roles
- ✅ **JWT Bearer Guards** - Reusable JWT authentication across services
- ✅ **Password Hashing** - bcrypt for secure password storage
- ✅ **Rspack** - Super-fast development builds with watch mode
- ✅ **Swagger Documentation** - Auto-generated API docs with Scalar UI
- ✅ **Scoped Prisma Clients** - No conflicts between services
- ✅ **Shared Libraries** - Reusable libs across services
- ✅ **Claude Skills** - Enterprise patterns for NestJS development

## Project Structure

```
automation-with-claude-cli/
├── apps/                           # Application services
│   ├── api/                        # API Service (port 3000)
│   │   ├── src/
│   │   │   ├── main.ts             # Fastify setup with Scalar docs
│   │   │   ├── app.module.ts       # ConfigModule with .env loading
│   │   │   ├── app.controller.ts   # Controller with versioning
│   │   │   ├── app.service.ts      # Service layer
│   │   │   ├── prisma/            # Prisma schema and config
│   │   │   ├── dto/                # Data Transfer Objects
│   │   │   └── common/             # Service-specific utilities
│   │   ├── prisma/                # Prisma schema files
│   │   ├── package.json
│   │   ├── nest-cli.json
│   │   └── .env                   # Service environment variables
│   │
│   └── auth/                       # Auth Service (port 3001)
│       ├── src/
│       │   ├── main.ts
│       │   ├── app.module.ts
│       │   ├── app.controller.ts
│       │   ├── app.service.ts
│       │   ├── auth/               # Auth module
│       │   │   ├── auth.module.ts
│       │   │   ├── auth.controller.ts
│       │   │   └── auth.service.ts
│       │   ├── prisma/            # Prisma module
│       │   ├── dto/               # DTOs for auth
│       │   └── common/
│       ├── prisma/
│       ├── package.json
│       ├── nest-cli.json
│       └── .env
│
├── packages/                       # Scoped packages
│   ├── api-prisma-client/         # @api/prisma-client
│   └── auth-prisma-client/        # @auth/prisma-client
│
├── libs/                           # Shared libraries
│   ├── app-logger/                # @LogActivity() decorator
│   ├── auth-utilities/            # @AuthUser(), @Roles(), JWT
│   ├── caching/                   # Cache manager
│   ├── common/                    # Common utilities
│   └── health/                    # Health checks
│
├── docker/                         # Docker services
│   ├── docker-compose.yml         # PostgreSQL service
│   ├── init-postgres.sh           # Database initialization
│   └── README.md
│
├── skills/                         # Claude CLI skills
│   ├── rspack-dev/                # Rspack development guide
│   ├── nestjs-unit-testing/
│   ├── nestjs-conventions/
│   ├── nestjs-helper/
│   ├── auth-guard-patterns/
│   ├── dto-validation/
│   ├── prisma-integration/
│   ├── prisma-patterns/
│   └── multi-service-routing/
│
├── rspack.config.api.js           # Rspack config for API
├── rspack.config.auth.js          # Rspack config for Auth
├── pnpm-workspace.yaml            # Workspace configuration
├── tsconfig.json                  # Path aliases
└── package.json                   # Root scripts
```

## Quick Start

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Start PostgreSQL and Keycloak

```bash
cd docker
docker-compose up -d
```

This creates:
- `api_db` database with `api_admin` user
- `auth_db` database with `auth_admin` user
- `discord_bot_db` database with `discord_bot_admin` user
- `keycloak_db` database with `keycloak_admin` user
- Keycloak service on port 8080

For more information on Keycloak setup, see [Keycloak Setup](#keycloak-setup).

### 3. Generate Prisma Clients

```bash
cd apps/api && pnpm prisma:generate
cd apps/auth && pnpm prisma:generate
```

### 4. Start Development Server

**API Service (port 3000):**
```bash
pnpm rspack:api
```

**Auth Service (port 3001):**
```bash
pnpm rspack:auth
```

### Access Points

| Service | URL | Documentation |
|---------|-----|--------------|
| API | http://localhost:3000/backend/v1 | http://localhost:3000/reference |
| Auth | http://localhost:3001/auth/v1 | http://localhost:3001/reference |

## Database Setup

### PostgreSQL Services

Each service has its own database and admin credentials:

| Service | Database | User | Password |
|---------|----------|------|----------|
| API | `api_db` | `api_admin` | `api_admin_password_change_this` |
| Auth | `auth_db` | `auth_admin` | `auth_admin_password_change_this` |
| Discord Bot | `discord_bot_db` | `discord_bot_admin` | `discord_bot_admin_password_change_this` |
| Keycloak | `keycloak_db` | `keycloak_admin` | `keycloak_admin_password_change_this` |

### Connection Strings

**API Service** (`apps/api/.env`):
```env
DATABASE_URL="postgresql://api_admin:api_admin_password_change_this@localhost:5432/api_db?schema=public"
```

**Auth Service** (`apps/auth/.env`):
```env
DATABASE_URL="postgresql://auth_admin:auth_admin_password_change_this@localhost:5432/auth_db?schema=public"
```

### Prisma Configuration

Each service uses Prisma 7 with:
- **Scoped packages**: `@api/prisma-client` and `@auth/prisma-client`
- **Driver adapters**: Direct PostgreSQL connection via `@prisma/adapter-pg`
- **Separate schemas**: Each service has its own Prisma schema
- **No conflicts**: Generated clients are in separate directories

## Development

### Rspack Watch Mode

The project uses Rspack for super-fast development:

- **Compilation**: ~47ms for initial build
- **Watch Mode**: Auto-recompiles on file changes
- **Auto-restart**: NestJS app restarts automatically
- **Hot Reload**: Changes appear immediately

**Start API with watch mode:**
```bash
pnpm rspack:api
```

**Start Auth with watch mode:**
```bash
pnpm rspack:auth
```

### Using NestJS CLI

```bash
# Generate resources for API service
cd apps/api
nest g module users
nest g controller users
nest g service users

# Generate resources for Auth service
cd apps/auth
nest g module auth
nest g controller auth
nest g service auth
```

## Services

### API Service

- **Port**: 3000
- **Database**: `api_db`
- **Prisma Client**: `@api/prisma-client`
- **Purpose**: Core API functionality

### Auth Service

- **Port**: 3001
- **Database**: `auth_db`
- **Prisma Client**: `@auth/prisma-client`
- **Purpose**: Authentication and authorization
- **Features**:
  - User registration with password hashing
  - JWT access tokens (1 hour expiry)
  - JWT refresh tokens (7 day expiry)
  - Token revocation on logout
  - Email verification support

## Authentication Examples

### Sign Up

```bash
curl -X POST http://localhost:3001/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePass123!",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

**Response:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "isActive": true,
  "emailVerified": false,
  "createdAt": "2026-02-24T12:00:00.000Z",
  "updatedAt": "2026-02-24T12:00:00.000Z"
}
```

### Sign In

```bash
curl -X POST http://localhost:3001/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePass123!"
  }'
```

**Response:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "tokenType": "Bearer",
  "expiresIn": 3600
}
```

### Refresh Token

```bash
curl -X POST http://localhost:3001/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }'
```

### Get Profile (with JWT)

```bash
curl -X GET http://localhost:3001/auth/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

## JWT Bearer Authentication

### Overview

This monorepo implements JWT bearer authentication with reusable guards and strategies across all services.

### Architecture

- **Auth Service**: Validates JWT tokens and checks user database
- **Other Services**: Validate JWT signatures only (no database access)
- **Shared Library**: `@app/auth-utilities` provides reusable `BaseJwtStrategy` and `JwtAuthGuard`

### Protected Endpoints

#### Auth Service - Profile Endpoint

```bash
curl -X GET http://localhost:3001/auth/profile \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

**Response:**
```json
{
  "id": "4989dcff-256d-4ac4-9b84-d527d81d6e52",
  "email": "test@example.com",
  "first_name": "Test",
  "last_name": "User",
  "is_active": true,
  "email_verified": false,
  "created_at": "2026-02-24T07:55:16.829Z",
  "updated_at": "2026-02-24T07:55:16.829Z"
}
```

#### API Service - User Info Endpoint

```bash
curl -X GET http://localhost:3000/backend/v1/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

**Response:**
```json
{
  "sub": "4989dcff-256d-4ac4-9b84-d527d81d6e52",
  "email": "test@example.com",
  "first_name": "Test",
  "last_name": "User",
  "message": "This is a protected endpoint - you have access!",
  "timestamp": "2026-02-24T08:21:28.444Z"
}
```

### Complete Authentication Flow

```bash
# 1. Sign in to get access token
ACCESS_TOKEN=$(curl -s -X POST "http://localhost:3001/auth/signin" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test1234"}' | jq -r '.access_token')

# 2. Access protected endpoint on Auth service
curl -X GET "http://localhost:3001/auth/profile" \
  -H "Authorization: Bearer $ACCESS_TOKEN"

# 3. Access protected endpoint on API service
curl -X GET "http://localhost:3000/backend/v1/me" \
  -H "Authorization: Bearer $ACCESS_TOKEN"

# 4. Test without token (will fail with 401)
curl -X GET "http://localhost:3000/backend/v1/me"
```

### Implementing JWT Guard in Your Controller

```typescript
import { Controller, Get, UseGuards, Request, Version } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@app/auth-utilities';

@ApiTags('Feature')
@Controller('feature')
export class FeatureController {
  @Get('protected')
  @Version('1')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Protected endpoint' })
  async getProtectedData(@Request() req) {
    // req.user contains decoded JWT: { sub, email, first_name, last_name }
    return {
      user_id: req.user.sub,
      email: req.user.email,
      message: 'This is protected data',
    };
  }
}
```

### JWT Strategy Implementation

**For Auth Service** (with database lookup):
```typescript
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BaseJwtStrategy } from '@app/auth-utilities';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends BaseJwtStrategy {
  constructor(
    configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    super(configService);
  }

  async getUserById(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
        is_active: true,
      },
    });
  }
}
```

**For Other Services** (JWT validation only):
```typescript
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BaseJwtStrategy } from '@app/auth-utilities';

@Injectable()
export class JwtStrategy extends BaseJwtStrategy {
  constructor(configService: ConfigService) {
    super(configService);
  }

  async validate(payload: any) {
    // Return user info from JWT payload
    return {
      sub: payload.sub,
      email: payload.email,
      first_name: payload.first_name,
      last_name: payload.last_name,
    };
  }
}
```

### JWT Payload Structure

The JWT token contains:
- `sub`: User ID (UUID)
- `email`: User email
- `iat`: Issued at timestamp
- `exp`: Expiration timestamp

**Example decoded payload:**
```json
{
  "sub": "4989dcff-256d-4ac4-9b84-d527d81d6e52",
  "email": "test@example.com",
  "iat": 1771921034,
  "exp": 1771924634
}
```

### Module Configuration

```typescript
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-jwt-secret-key-change-this',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [JwtStrategy],
})
export class FeatureModule {}
```

### Error Responses

**401 Unauthorized** (Missing or invalid token):
```json
{
  "message": "Invalid or expired token",
  "error": "Unauthorized",
  "statusCode": 401
}
```

**401 Unauthorized** (User inactive):
```json
{
  "message": "User account is inactive",
  "error": "Unauthorized",
  "statusCode": 401
}
```

## Available Scripts

### Root Level Scripts

```bash
# Development (Rspack)
pnpm rspack:api              # Start API service (default)
pnpm rspack:auth             # Start Auth service

# Alternative (NestJS watch mode)
pnpm dev:nest                 # Alias for rspack:api
pnpm dev:api                  # API with NestJS watch
pnpm dev:auth                 # Auth with NestJS watch

# Building
pnpm build:api                # Build API service
pnpm build:auth               # Build Auth service
pnpm build:rspack             # Build all with Rspack
```

### Service-Level Scripts

```bash
# From apps/api or apps/auth
pnpm start:dev               # NestJS watch mode
pnpm start:debug             # With debug mode
pnpm build                   # Build for production
pnpm prisma:generate         # Generate Prisma client
pnpm prisma:migrate          # Run migrations
pnpm prisma:studio           # Open Prisma Studio
```

## API Endpoints

### API Service (port 3000)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/backend/v1` | Hello message | No |
| GET | `/backend/v1/health` | Health check | No |
| GET | `/backend/v1/me` | Current user info | **Yes (JWT)** |

### Auth Service (port 3001)

#### OAuth 2.x Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/signup` | Register new user | No |
| POST | `/auth/signin` | Sign in with email/password | No |
| POST | `/auth/refresh` | Refresh access token | No |
| POST | `/auth/logout` | Revoke refresh token | No |
| GET | `/auth/profile` | Get current user profile | **Yes (JWT)** |

#### System Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/auth` | Hello message |
| GET | `/auth/health` | Health check |

## Keycloak Setup

### Overview

This monorepo integrates **Keycloak** for centralized identity and access management (IAM). Keycloak provides:

- **OIDC Authentication** - OpenID Connect protocol
- **Social Login** - Google, GitHub, Facebook OAuth providers
- **Role-Based Access Control (RBAC)** - Fine-grained permissions
- **Single Sign-On (SSO)** - Cross-service authentication
- **User Management** - Centralized user directory

### Quick Start

#### 1. Start Services

```bash
# Start PostgreSQL and Keycloak
docker-compose -f docker/docker-compose.yml up -d

# Verify services are running
docker-compose -f docker/docker-compose.yml ps
```

This creates:
- `keycloak_db` database with `keycloak_admin` user
- Keycloak service on port 8080

#### 2. Access Keycloak Admin Console

- **Admin Console**: http://localhost:8080/admin
- **Default Credentials**:
  - Username: `admin`
  - Password: `admin_change_this`

⚠️ **Change the admin password immediately after first login!**

#### 3. Configure Environment Variables

Copy `.env.keycloak` to your service's `.env` file:

```bash
# For API service
cat .env.keycloak >> apps/api/.env

# For Auth service
cat .env.keycloak >> apps/auth/.env
```

Key environment variables:

```env
KEYCLOAK_SERVER_URL=http://localhost:8080
KEYCLOAK_REALM=app-realm
KEYCLOAK_CLIENT_ID=app-client
KEYCLOAK_CLIENT_SECRET=your-client-secret-here
KEYCLOAK_ADMIN_USER=admin
KEYCLOAK_ADMIN_PASSWORD=admin_change_this
```

### Creating Realm and Client

#### Create Realm

1. Log in to the admin console
2. Hover over the dropdown in the top-left corner (default: "master")
3. Click "Create Realm"
4. Enter realm name: `app-realm`
5. Click "Create"

#### Create Client

1. Navigate to: **Clients** → **Create Client**
2. Configure the client:
   - **Client type:** OpenID Connect
   - **Client ID:** `app-client`
   - Click **Next**
3. Configure client authentication:
   - **Client authentication:** ON
   - **Authorization:** OFF (for now)
   - Click **Next**
4. Login settings:
   - **Valid redirect URIs:**
     - `http://localhost:3000/*`
     - `http://localhost:3001/*`
   - **Valid post logout redirect URIs:**
     - `http://localhost:3000`
     - `http://localhost:3001`
   - **Web origins:**
     - `http://localhost:3000`
     - `http://localhost:3001`
   - Click **Save**

#### Get Client Secret

1. Go to **Clients** → **app-client** → **Credentials** tab
2. Copy the **Client secret** value
3. Update `.env`:
   ```bash
   KEYCLOAK_CLIENT_SECRET=<copied-secret>
   ```

#### Configure Roles

1. Navigate to: **Realm Roles** → **Create Role**
2. Create standard roles:
   - `admin` - Full system access
   - `user` - Standard user access
   - `moderator` - Content moderation access

### Social Login Configuration

#### Google OAuth2

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new OAuth 2.0 client ID
3. Add authorized redirect URI:
   - `http://localhost:8080/realms/app-realm/broker/google/endpoint`
4. Copy Client ID and Client Secret

In Keycloak:
1. Navigate to: **Identity Providers** → **Add provider** → **Google**
2. Enter your Google credentials
3. Set **Redirect URI** to the value shown in Keycloak

#### GitHub OAuth2

1. Go to GitHub → **Settings** → **Developer settings** → **OAuth Apps**
2. Create a new OAuth App
3. Set Authorization callback URL:
   - `http://localhost:8080/realms/app-realm/broker/github/endpoint`
4. Copy Client ID and generate Client Secret

In Keycloak:
1. Navigate to: **Identity Providers** → **Add provider** → **GitHub**
2. Enter your GitHub credentials

#### Facebook OAuth2

1. Go to [Meta for Developers](https://developers.facebook.com/)
2. Create a new App
3. Add **Facebook Login** product
4. Set Valid OAuth Redirect URIs:
   - `http://localhost:8080/realms/app-realm/broker/facebook/endpoint`
5. Copy App ID and App Secret

In Keycloak:
1. Navigate to: **Identity Providers** → **Add provider** → **Facebook**
2. Enter your Facebook credentials

### Database Configuration

Keycloak uses its own PostgreSQL database:

| Setting | Value |
|---------|-------|
| Database | `keycloak_db` |
| User | `keycloak_admin` |
| Password | `keycloak_admin_password_change_this` |
| JDBC URL | `jdbc:postgresql://postgres:5432/keycloak_db` |

Connection string from host:
```
postgresql://keycloak_admin:keycloak_admin_password_change_this@localhost:5432/keycloak_db
```

### Verify Setup

#### Test Health Endpoint

```bash
curl http://localhost:8080/health/ready
```

Expected response:
```json
{"status":"UP"}
```

#### Test Realm Discovery

```bash
curl http://localhost:8080/realms/app-realm/.well-known/openid-configuration
```

Expected response: JSON with OIDC configuration endpoints

#### Get Public Key (for JWT verification)

```bash
curl http://localhost:8080/realms/app-realm/protocol/openid-connect/certs
```

### Docker Commands

```bash
# View logs
docker-compose -f docker/docker-compose.yml logs -f keycloak

# Restart Keycloak
docker-compose -f docker/docker-compose.yml restart keycloak

# Stop all services
docker-compose -f docker/docker-compose.yml down

# Remove volumes (⚠️ deletes all data)
docker-compose -f docker/docker-compose.yml down -v
```

### Production Considerations

1. **HTTPS:** Enable HTTPS in production
   - Set `KC_HTTP_ENABLED=false`
   - Configure SSL certificates

2. **Database:** Use managed PostgreSQL
   - Set `KC_DB_URL` to production database
   - Use strong passwords

3. **Admin Credentials:** Change defaults
   - Set secure `KEYCLOAK_ADMIN_PASSWORD`
   - Use secrets management (e.g., AWS Secrets Manager)

4. **Hostname:** Configure proper hostname
   - Set `KC_HOSTNAME_STRICT=true`
   - Set `KC_HOSTNAME=<your-domain>`

5. **Caching:** Configure production cache
   - Set up Redis or infinispan for distributed caching

### Troubleshooting

#### Keycloak won't start

```bash
# Check logs
docker-compose -f docker/docker-compose.yml logs keycloak

# Verify PostgreSQL is ready
docker-compose -f docker/docker-compose.yml ps
```

#### Database connection errors

- Ensure PostgreSQL container is healthy
- Verify `KC_DB_URL` matches PostgreSQL service name
- Check database credentials match `init-postgres.sh`

#### Cannot access admin console

- Verify port 8080 is not in use: `lsof -i :8080`
- Check Keycloak health: `curl http://localhost:8080/health/ready`

### Documentation

For detailed setup instructions, see:
- [`docs/keycloak-setup.md`](docs/keycloak-setup.md) - Complete setup guide
- [`docs/keycloak-knowledge-center.md`](docs/keycloak-knowledge-center.md) - Comprehensive knowledge base with scenarios, patterns, and best practices

## Skills

This project includes Claude CLI skills for accelerated development:

### Available Skills

| Skill | Description |
|-------|-------------|
| **rspack-dev** | Rspack development and watch mode |
| **nestjs-unit-testing** | Unit testing patterns |
| **nestjs-conventions** | General NestJS conventions |
| **auth-guard-patterns** | Authentication and authorization |
| **dto-validation** | DTO creation and validation |
| **prisma-integration** | Prisma ORM setup |
| **prisma-patterns** | Database query patterns |
| **multi-service-routing** | Service prefix configuration |

### Using Skills

Tell Claude:
> "Create a users module with CRUD operations using prisma-patterns"

or

> "Add authentication to the API using auth-guard-patterns"

## Libraries

### @app/auth-utilities

Authentication and authorization utilities:

**JWT Authentication:**
```typescript
import { JwtAuthGuard, BaseJwtStrategy } from '@app/auth-utilities';

@Controller()
export class MyController {
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    return req.user; // JWT payload: { sub, email, first_name, last_name }
  }
}
```

**Extending JWT Strategy:**
```typescript
import { BaseJwtStrategy } from '@app/auth-utilities';

export class JwtStrategy extends BaseJwtStrategy {
  constructor(configService: ConfigService) {
    super(configService);
  }

  async getUserById(userId: string) {
    // Implement user lookup or return minimal user object
    return { id: userId, is_active: true };
  }
}
```

**Role-based Authorization:**
```typescript
import { AuthUser, JwtPayloadDto, Roles, RolesGuard } from '@app/auth-utilities';

@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {
  @Get('admin')
  @Roles('admin')
  adminOnly(@AuthUser() user: JwtPayloadDto) {
    return { message: 'Admin area', user };
  }
}
```

### @app/app-logger

Activity logging decorator:

```typescript
import { LogActivity } from '@app/app-logger';

@Injectable()
export class MyService {
  @LogActivity()
  async create(data: CreateDto) {
    // Automatically logged
  }
}
```

### @app/caching

Cache manager wrapper:

```typescript
import { CachingService } from '@app/caching';

@Injectable()
export class MyService {
  constructor(private readonly cache: CachingService) {}

  async getData() {
    const cached = await this.cache.get('key');
    if (cached) return JSON.parse(cached);

    const data = await this.fetchData();
    await this.cache.set('key', JSON.stringify(data), { ttl: 3600 });
    return data;
  }
}
```

## Common Service Structure Rule

Every API service in this monorepo follows the same structure pattern:

### Standard Structure

```
apps/[service-name]/
├── src/
│   ├── main.ts                 # Fastify + Swagger setup
│   ├── app.module.ts           # Root module with ConfigModule
│   ├── app.controller.ts       # Controllers with versioning
│   ├── app.service.ts          # Service layer
│   ├── prisma/                # Prisma module and service
│   ├── dto/                    # Data Transfer Objects
│   └── common/                 # Service-specific utilities
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── prisma.config.ts       # Prisma 7 config
├── package.json
├── nest-cli.json
├── tsconfig.app.json
└── .env                        # Service environment variables
```

### Key Patterns

1. **Modular Architecture** - Separation of concerns with modules
2. **Centralized Configuration** - ConfigModule with .env loading
3. **Swagger Documentation** - Auto-generated with Scalar reference UI
4. **Health Check Endpoints** - `/health` endpoint for monitoring
5. **API Versioning** - URI-based versioning (v1, v2, etc.)
6. **Global Validation** - ValidationPipe with transform
7. **CORS Configuration** - Environment-aware CORS with regex support

### Adding a New Service

1. Create service directory following the standard structure
2. Set up Prisma with scoped package (`@service/prisma-client`)
3. Configure unique database and credentials
4. Add Rspack configuration
5. Update root package.json scripts
6. Update pnpm-workspace.yaml

## License

MIT

---

## Summary

This monorepo includes:

- ✅ NestJS 11.1 with Fastify 5.x
- ✅ Separate API and Auth services
- ✅ PostgreSQL with isolated databases
- ✅ Prisma 7 with driver adapters
- ✅ OAuth 2.x authentication (JWT + refresh tokens)
- ✅ JWT bearer guards (reusable across services)
- ✅ Password hashing with bcrypt
- ✅ Scoped Prisma clients (no conflicts)
- ✅ Rspack for fast development
- ✅ Watch mode with auto-restart
- ✅ Shared libraries across services
- ✅ Claude CLI skills for patterns
- ✅ API versioning and documentation
- ✅ Global validation and CORS
