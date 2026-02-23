# NestJS Helper

A skill for accelerating NestJS development following traceability-backend conventions.

## Related Skills

This skill provides general NestJS guidance. For specific patterns, use:
- **traceability-patterns** - Main project conventions and structure
- **auth-guard-patterns** - Authentication and authorization patterns
- **prisma-patterns** - Database operations with Prisma
- **dto-validation** - DTO creation and validation

## Quick Module Generation

When creating a new feature module, generate:
```
feature/
├── feature.controller.ts
├── feature.service.ts
├── feature.module.ts
└── dto/
    ├── create-feature.dto.ts
    ├── update-feature.dto.ts
    ├── feature-response.dto.ts
    └── index.ts
```

## Core Conventions

### Structure
- **App code**: `apps/backend/src/`
- **Shared libs**: `libs/[lib-name]/src/`
- **Path aliases**: `@app/[lib-name]`
- **Common code**: `apps/backend/src/common/`

### Fastify Adapter
```typescript
import { FastifyAdapter } from '@nestjs/platform-fastify';

const adapter = new FastifyAdapter();
await adapter.register(require('@fastify/multipart'), {
  attachFieldsToBody: false,
  limits: { fileSize: 20 * 1024 * 1024, files: 1 }
});
```

### Global Validation
```typescript
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

app.useGlobalPipes(new ValidationPipe({ transform: true }));
useContainer(app.select(AppModule), { fallbackOnErrors: true });
```

### Versioning & Documentation
```typescript
@Version('1')
@ApiTags('Feature')
@ApiOperation({ summary: 'Description' })
@ApiResponse({ status: 200, type: ResponseDto })
```

## Common Tasks

### Generate a CRUD module
"Create a [feature] module with CRUD operations using Prisma"

### Add authentication
"Add JWT authentication to [feature] module"

### Create DTOs
"Create DTOs for [feature] with validation"

### Add guards
"Add role-based access control to [feature]"

## Library Aliases

```typescript
// Auth utilities
import { AuthUser, JwtPayloadDto, Roles, RolesGuard } from '@app/auth-utilities';

// Logging
import { LogActivity } from '@app/app-logger';

// Caching
import { Cache } from '@nestjs/cache-manager';

// Health
import { HealthCheckService } from '@app/health';
```

## CLI Commands

### Command Syntax

```bash
nest generate|g <schematic> <name> [path] [options]
nest g <schematic> <name> [options]
```

### Available Schematics

| Schematic | Alias | Description | Example |
|-----------|--------|-------------|---------|
| **application** | application | Generate new workspace | `nest g application` |
| **module** | mo | Generate a module | `nest g mo users` |
| **controller** | co | Generate a controller | `nest g co users` |
| **service** | s | Generate a service | `nest g s users` |
| **resource** | res | Generate CRUD resource | `nest g res users` |
| **library** | lib | Generate library (monorepo) | `nest g lib shared` |
| **sub-app** | app | Generate app (monorepo) | `nest g app api` |
| **class** | cl | Generate a class | `nest g cl utils` |
| **interface** | itf | Generate interface | `nest g itf user` |
| **guard** | gu | Generate guard | `nest g gu auth` |
| **pipe** | pi | Generate pipe | `nest g pi validation` |
| **filter** | f | Generate exception filter | `nest g f http-error` |
| **interceptor** | itc | Generate interceptor | `nest g itc logging` |
| **middleware** | mi | Generate middleware | `nest g mi logger` |
| **decorator** | d | Generate decorator | `nest g d roles` |
| **gateway** | ga | Generate WebSocket gateway | `nest g ga events` |
| **provider** | pr | Generate provider | `nest g pr database` |
| **resolver** | r | Generate GraphQL resolver | `nest g r users` |
| **exception** | e | Generate exception | `nest g e not-found` |

### Common Options

| Option | Description |
|--------|-------------|
| `--no-spec` | Skip test file generation |
| `--flat` | Generate without dedicated directory |
| `--skip-import` | Skip import into module |
| `--module=<name>` | Specify parent module |
| `--project=<name>` | Specify project (monorepo) |
| `--path=<path>` | Specify target path |
| `--dry-run` | Simulate without creating files |

### Generate Module Components

```bash
# Generate module only
nest g mo users

# Generate controller
nest g co users

# Generate service
nest g s users

# Generate all components for a feature
nest g mo users
nest g co users
nest g s users

# With options (no test files)
nest g co users --no-spec
nest g s users --no-spec
```

### Generate Complete CRUD Resource

```bash
# Generate REST API resource (controller + service + DTOs + entity)
nest g resource users

# CLI prompts for:
# - What transport layer? (REST API, GraphQL, microservice)
# - Generate CRUD entry points? (Yes/No)

# Skip spec files
nest g resource users --no-spec
```

### Generate in Monorepo

```bash
# Generate library in monorepo
nest g lib shared

# Generate sub-application in monorepo
nest g app auth-service

# Generate module in specific project
nest g mo users --project backend
nest g co users --project api

# Generate library in specific path
nest g lib libs/common
```

### Generate with Module Registration

```bash
# Generate and register to existing module
nest g s users --module=users
nest g co auth --module=auth

# Generate in specific directory
nest g mo modules/users
nest g co modules/users --no-spec
nest g s modules/users --no-spec
```

### Generate Guards, Pipes, Filters

```bash
# Guards (authentication/authorization)
nest g gu auth
nest g gu roles

# Pipes (validation/transformation)
nest g pi validation
nest g pi parse-int

# Exception Filters
nest g f http-exception
nest g f not-found

# Interceptors
nest g itc logging
nest g itc timeout
nest g itc transform

# Middleware
nest g mi logger
nest g mi cors

# Decorators
nest g d roles
nest g d user
```

### Generate Additional Components

```bash
# Classes
nest g cl user-utils
nest g cl config

# Interfaces
nest g itf user-entity
nest g itf response

# WebSocket Gateway
nest g ga events
nest g ga chat

# Custom Exception
nest g e not-found
nest g e unauthorized

# Provider
nest g pr database
nest g pr cache
```

### Global Configuration Options

```json
// nest-cli.json
{
  "generateOptions": {
    "spec": false,           // Disable test files globally
    "flat": false,           // Use directories by default
    "skipImport": false      // Import by default
  }
}
```

### Generate GraphQL Components

```bash
# Generate resolver
nest g r users

# Generate resource with GraphQL
nest g resource users
# Select "GraphQL" when prompted
# Choose between code-first or schema-first
```

### Monorepo Library Generation

```bash
# Generate shared library
nest g lib shared --publishable

# Generate single-executable library
nest g lib cli --single-executable

# Library structure created:
# libs/
# └── shared/
#     ├── src/
#     │   ├── index.ts
#     │   └── shared.module.ts
#     ├── test/
#     └── package.json
```

### Complete Feature Generation Example

```bash
# Generate complete user feature (monorepo)
nest g mo users --project backend
nest g co users --project backend --no-spec
nest g s users --project backend --no-spec
nest g gu auth --project backend --no-spec
nest g pi validation --project backend --no-spec

# Or use resource for quickstart
nest g resource users --project backend --no-spec
```

### Test File Generation

```bash
# With test files (default)
nest g co users

# Skip test files
nest g co users --no-spec

# Test files are named: *.spec.ts
# Example: users.controller.spec.ts
```

### Path Options

```bash
# Generate in nested directory
nest g mo modules/users
nest g co modules/user/controller

# Generate with flat structure (no subdirectory)
nest g co users --flat

# Generate in specific project path
nest g mo users --project backend --path apps/backend/src
```
