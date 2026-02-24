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
│       │   ├── prisma/            # Prisma module
│       │   ├── dto/
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

### 2. Start PostgreSQL

```bash
cd docker
docker-compose up -d postgres
```

This creates:
- `api_db` database with `api_admin` user
- `auth_db` database with `auth_admin` user

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

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/backend/v1` | Hello message |
| GET | `/backend/v1/health` | Health check |

### Auth Service (port 3001)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/auth/v1` | Hello message |
| GET | `/auth/v1/health` | Health check |

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

```typescript
import { AuthUser, JwtPayloadDto } from '@app/auth-utilities';

@Controller()
export class MyController {
  @Get('profile')
  @UseGuards(AuthGuard('jwt-token'))
  getProfile(@AuthUser() user: JwtPayloadDto) {
    return user;
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
- ✅ Scoped Prisma clients (no conflicts)
- ✅ Rspack for fast development
- ✅ Watch mode with auto-restart
- ✅ Shared libraries across services
- ✅ Claude CLI skills for patterns
- ✅ API versioning and documentation
- ✅ Global validation and CORS
