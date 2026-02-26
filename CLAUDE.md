# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Monorepo Architecture

This is a **pnpm workspace monorepo** with separate NestJS services using Fastify adapter, PostgreSQL, Prisma 7, and JWT authentication.

### Services

- **apps/api** - API service (port 3000, SERVICE_PREFIX=backend)
- **apps/auth** - Auth service (port 3001, SERVICE_PREFIX=auth)

Each service has:
- Isolated PostgreSQL database (`api_db`, `auth_db`)
- Scoped Prisma client package (`@api/prisma-client`, `@auth/prisma-client`)
- Independent `.env` file for configuration
- Rspack configuration for fast development builds

### Shared Libraries

- **@app/auth-utilities** - JWT guards, `@AuthUser()` decorator, password hashing, `@Roles()` decorator
- **@app/app-logger** - `@LogActivity()` decorator for service method logging
- **@app/caching** - Cache manager wrapper
- **@app/health** - Health check utilities
- **@app/common** - Common utilities and interceptors

## Common Development Commands

### Development (Rspack watch mode)
```bash
# Start API service (auto-restarts on changes)
pnpm rspack:api

# Start Auth service
pnpm rspack:auth

# Alternative: NestJS watch mode (slower)
pnpm dev:api
pnpm dev:auth
```

### Building
```bash
# Build API service
pnpm build:api

# Build Auth service
pnpm build:auth
```

### Database Operations
```bash
# From service directory (apps/api or apps/auth)
pnpm prisma:generate    # Generate Prisma client
pnpm prisma:migrate     # Run migrations
pnpm prisma:studio      # Open Prisma Studio
```

### Testing
```bash
# Root level
pnpm test              # Run all tests
pnpm test:watch        # Watch mode
pnpm test:cov          # Coverage

# Service-specific
cd apps/api && pnpm test
```

### Linting/Formatting
```bash
pnpm lint              # ESLint with auto-fix
pnpm format            # Prettier
```

## Critical Architecture Patterns

### JWT Authentication Flow

The monorepo uses a **centralized auth service** pattern:

1. **Auth Service** (`apps/auth`) - Handles sign-up/sign-in, generates JWT tokens
2. **Other Services** - Validate JWT signatures only (no database lookup for user data)

**JWT Payload Structure:**
```typescript
{
  sub: string;          // User ID (UUID)
  email: string;
  first_name?: string;
  last_name?: string;
  iat: number;
  exp: number;
}
```

**Protected Endpoint Pattern:**
```typescript
import { JwtAuthGuard } from '@app/auth-utilities';
import { AuthUser, JwtPayloadDto } from '@app/auth-utilities';

@Controller('feature')
export class FeatureController {
  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getProfile(@AuthUser() user: JwtPayloadDto) {
    // user contains: { sub, email, first_name, last_name }
    return { user_id: user.sub, email: user.email };
  }
}
```

### Prisma 7 Configuration (Critical)

This project uses **Prisma 7 with driver adapters**, which requires different setup:

1. **Schema (`schema.prisma`)** - Do NOT include `url` in datasource block
2. **Config file (`prisma.config.ts`)** - Required, handles DATABASE_URL
3. **Scoped packages** - Generated clients go to `packages/[service]-prisma-client/src`

**Example Migration (from service directory):**
```bash
cd apps/api
DATABASE_URL="postgresql://..." pnpm prisma migrate dev --name migration_name
pnpm prisma generate
```

### Service Standard Structure

Every service follows this pattern:
```
apps/[service]/
├── src/
│   ├── main.ts              # Fastify + Scalar Swagger setup
│   ├── app.module.ts        # ConfigModule, PrismaModule, JWT setup
│   ├── strategies/          # JWT strategy (jwt.strategy.ts)
│   ├── prisma/              # Prisma module and service
│   ├── dto/                 # Request/response DTOs
│   └── common/              # Service-specific utilities
├── prisma/
│   ├── schema.prisma        # Database schema (no url in datasource)
│   └── prisma.config.ts     # Prisma 7 config file
├── rspack.config.js         # Rspack bundler config
└── .env                     # Service environment variables
```

### Naming Conventions (Critical)

**DTO Properties (snake_case):**
```typescript
export class UserResponseDto {
  id: string;
  first_name: string;      // snake_case for API
  is_active: boolean;      // snake_case for API
  created_at: Date;        // snake_case for API
}
```

**TypeScript Variables (camelCase):**
```typescript
const passwordHash = await bcrypt.hash(password, 10);  // camelCase
const existingUser = await this.prisma.user.findUnique({ where: { email } });
```

**Database Fields (snake_case, singular tables):**
```prisma
model user {
  id                String   @id @default(uuid())
  password_hash     String
  first_name        String?
  is_active         Boolean  @default(true)

  @@map("user")  // Singular, not "users"
}
```

### Path Aliases

When adding new libraries or updating imports, **ALWAYS update both `tsconfig.json` and `rspack.config.js`**:

**Current Aliases:**
- `@app/common` → `libs/common/src`
- `@app/auth-utilities` → `libs/auth-utilities/src`
- `@app/app-logger` → `libs/app-logger/src`
- `@app/caching` → `libs/caching/src`
- `@app/health` → `libs/health/src`
- `@api/prisma-client` → `packages/api-prisma-client/src`
- `@auth/prisma-client` → `packages/auth-prisma-client/src`

## Dependency Installation Rules (from .clinerules)

This is a **pnpm workspace monorepo**. Install dependencies carefully:

### Workspace Root (build tools, dev tools)
```bash
pnpm add -D -w <package>
```
Examples: `@rspack/core`, `@rspack/cli`, `run-script-webpack-plugin`

### App-Specific Dependencies
```bash
pnpm add --filter api <package>
# OR navigate to app first:
cd apps/api && pnpm add <package>
```

### Critical Rspack Rules

When making changes to the monorepo:

1. **Adding a new library:** Update path aliases in BOTH `tsconfig.json` AND `rspack.config.js`
2. **Installing NestJS/Fastify packages:** Add to `externals` array in `rspack.config.js`
3. **Packages requiring externalization:** `@nestjs/*`, `@fastify/*`, `class-validator`, `class-transformer`, database drivers

## Key Files Reference

- `tsconfig.json` - TypeScript path aliases
- `rspack.config.js` - Rspack bundler config (must match tsconfig paths)
- `.clinerules` - Dependency installation and Rspack sync rules
- `pnpm-workspace.yaml` - Workspace configuration
- `docker/docker-compose.yml` - PostgreSQL services

## Skills Reference

The `skills/` directory contains reusable patterns for Claude CLI:
- **nestjs-conventions** - Fastify setup, validation, Swagger, versioning
- **prisma-patterns** - Database operations, migrations, naming conventions
- **auth-guard-patterns** - JWT authentication implementation
- **dto-validation** - DTO creation with class-validator
- **rspack-dev** - Rspack development and watch mode
