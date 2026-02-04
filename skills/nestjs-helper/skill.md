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

## Commands

```bash
# Generate module
nest g module feature --project backend

# Generate controller
nest g controller feature --project backend

# Generate service
nest g service feature --project backend
```
