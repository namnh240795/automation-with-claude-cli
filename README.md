# NestJS Fastify Monorepo

A production-ready NestJS monorepo with Fastify, Docker development environment, and Claude CLI skills for enterprise patterns.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Development](#development)
- [Available Scripts](#available-scripts)
- [API Endpoints](#api-endpoints)
- [Skills](#skills)
- [Configuration](#configuration)
- [Testing](#testing)
- [Docker Development](#docker-development)

## Features

- ✅ **NestJS 11.1** - Latest NestJS framework
- ✅ **Fastify 5.x** - High-performance HTTP adapter
- ✅ **Monorepo** - Apps and libs with pnpm workspaces
- ✅ **Service Prefix** - Multi-service routing (`/backend`, `/station`, `/admin`)
- ✅ **Swagger Documentation** - Auto-generated API docs at `/backend/api`
- ✅ **Unit Tests** - 100% coverage with Jest
- ✅ **Shared Libraries** - Reusable libs from traceability-backend
- ✅ **Claude Skills** - Enterprise patterns for NestJS development
- ✅ **Docker Environment** - Containerized development with Claude CLI

## Project Structure

```
automation-with-claude-cli/
├── apps/
│   └── api/                         # Backend API application
│       ├── src/
│       │   ├── main.ts              # Fastify setup with service prefix
│       │   ├── app.module.ts        # App module with ConfigModule
│       │   ├── app.controller.ts    # Controller with versioning
│       │   ├── app.service.ts       # Service
│       │   ├── common/              # Shared utilities
│       │   │   └── enum/             # Environment constants
│       │   ├── *.spec.ts            # Unit tests (100% coverage)
│       │   └── dto/                 # DTOs folder
│       ├── test/                    # E2E tests
│       ├── package.json
│       └── tsconfig.app.json
│
├── libs/                           # Shared libraries
│   ├── app-logger/                 # @LogActivity() decorator
│   ├── auth-utilities/             # @AuthUser(), @Roles(), JWT
│   ├── caching/                    # Cache manager
│   ├── common/                     # Common utilities
│   └── health/                     # Health checks
│
├── skills/                         # Claude CLI skills (shared)
│   ├── README.md
│   ├── nestjs-unit-testing/        # Unit testing guide
│   ├── nestjs-conventions/         # General conventions
│   ├── nestjs-helper/              # Quick reference
│   ├── auth-guard-patterns/        # Auth & security
│   ├── dto-validation/             # DTO & validation
│   ├── prisma-integration/         # Prisma setup
│   ├── prisma-patterns/            # Database patterns
│   └── multi-service-routing/      # Service prefixes
│
├── docker/                         # Docker environment
│   ├── Dockerfile                  # Non-root user, Claude CLI
│   ├── docker-compose.yml          # Container setup
│   └── .dockerignore
│
├── nest-cli.json                  # Monorepo configuration
├── tsconfig.json                  # Path aliases
├── pnpm-workspace.yaml            # Workspace config
├── .env                           # Environment variables
└── package.json                   # Root package.json
```

## Quick Start

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Start Development Server

```bash
pnpm run build && node dist/apps/api/main.js
```

Server starts at:
- **API**: http://localhost:3000/backend/v1
- **Health**: http://localhost:3000/backend/v1/health
- **Swagger**: http://localhost:3000/backend/api

### 3. Run Tests

```bash
# Run all tests
pnpm test

# Run with coverage
pnpm run test:cov
```

## Development

### Service Prefix Configuration

The service prefix is controlled by the `SERVICE_PREFIX` environment variable (default: `backend`):

```bash
# Run as backend service
SERVICE_PREFIX=backend pnpm run build && node dist/apps/api/main.js

# Run as station service
SERVICE_PREFIX=station pnpm run build && node dist/apps/api/main.js

# Run as admin service
SERVICE_PREFIX=admin pnpm run build && node dist/apps/api/main.js
```

### Generate New Resources

```bash
# Generate a module
nest g module users --project api

# Generate a controller
nest g controller users --project api

# Generate a service
nest g service users --project api
```

## Available Scripts

```bash
# Development
pnpm run start:dev        # Start with watch
pnpm run start:debug      # Start with debug mode
pnpm run start:prod       # Start production build

# Building
pnpm run build            # Build the project
pnpm run prebuild         # Clean dist folder

# Testing
pnpm test                 # Run unit tests
pnpm run test:watch       # Watch mode
pnpm run test:cov         # Generate coverage report
pnpm run test:e2e         # Run E2E tests
pnpm run test:debug       # Debug tests

# Code Quality
pnpm run lint             # Run ESLint
pnpm run format           # Format with Prettier
```

## API Endpoints

### Base URL
- **Production**: `http://localhost:3000/backend/v1`
- **Swagger**: `http://localhost:3000/backend/api`

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/backend/v1` | Hello message |
| GET | `/backend/v1/health` | Health check |

### Response Examples

**Health Check:**
```json
{
  "status": "ok",
  "timestamp": "2026-02-04T10:47:46.715Z"
}
```

## Skills

This project includes Claude CLI skills that provide enterprise patterns:

### Available Skills

| Skill | Description |
|-------|-------------|
| **nestjs-unit-testing** | Unit testing patterns with 100% coverage |
| **nestjs-conventions** | General NestJS conventions and structure |
| **auth-guard-patterns** | Authentication and authorization |
| **dto-validation** | DTO creation and validation |
| **prisma-integration** | Prisma ORM setup and configuration |
| **prisma-patterns** | Database query patterns |
| **multi-service-routing** | Service prefix configuration |

### Using Skills

Tell Claude:
> "Create a users module with CRUD operations using traceability-patterns"

or

> "Add authentication to the API using auth-guard-patterns"

## Configuration

### Environment Variables

See [`.env.example`](.env.example) for all available variables:

```bash
# Service
SERVICE_PREFIX=backend
PORT=3000

# CORS
CORS_ORIGIN=http://localhost:3000,http://localhost:4200
CORS_ORIGIN_REGEX=^https://.*\.example\.com$

# JWT
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRES_IN=1h
JWT_REFRESH_SECRET=your-refresh-secret-key
JWT_REFRESH_EXPIRES_IN=7d
```

### Path Aliases

```typescript
import { CommonModule } from '@app/common';
import { AppLogger } from '@app/app-logger';
import { AuthUser, JwtPayloadDto } from '@app/auth-utilities';
import { CachingService } from '@app/caching';
```

## Testing

### Test Coverage

Current coverage for `apps/api/src`:
- **100%** Statements
- **100%** Functions
- **100%** Lines

### Test Structure

```
feature/
├── feature.controller.ts
├── feature.controller.spec.ts    # Controller tests
├── feature.service.ts
├── feature.service.spec.ts       # Service tests
└── dto/
    ├── create-feature.dto.ts
    └── create-feature.dto.spec.ts # DTO validation tests
```

### Testing Patterns

```typescript
// Service test with mocked Prisma
const mockPrismaService = {
  myModel: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
};

// Controller test with mocked service
const mockService = {
  findAll: jest.fn(),
  findOne: jest.fn(),
};
```

See **skills/nestjs-unit-testing** for comprehensive testing guide.

## Docker Development

### Docker Environment

A Docker container with Node.js, pnpm, and Claude CLI pre-installed.

### Start Container

```bash
cd docker
docker-compose up -d --build
```

### Enter Container

```bash
docker exec -it claude-nodejs-dev sh
```

### Container Features

- **User**: Non-root user (nodejs)
- **Workspace**: Mounted at `/workspace`
- **Skills**: Mounted at `/home/nodejs/.claude/skills`
- **API Key**: Pre-configured for z.ai

### Persistent Volumes

- `claude-cache` - Claude CLI cache
- `claude-config` - Claude CLI configuration

### Skills in Container

The `skills/` folder is mounted into the container and available to Claude CLI automatically.

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

## License

MIT

## Summary of Setup

This project includes:

- ✅ NestJS 11.1 with Fastify 5.x
- ✅ Monorepo with pnpm workspaces
- ✅ Service prefix routing (`/backend`, `/station`, `/admin`)
- ✅ Swagger documentation at `/backend/api`
- ✅ 100% unit test coverage
- ✅ Shared libraries (auth-utilities, app-logger, caching, health)
- ✅ Claude CLI skills for enterprise patterns
- ✅ Docker development environment
- ✅ API versioning (v1)
- ✅ Global validation pipe
- ✅ CORS with regex pattern support
