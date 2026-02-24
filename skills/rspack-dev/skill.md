# Rspack Development

A skill for fast development using Rspack in a NestJS monorepo environment.

## Overview

Rspack provides significantly faster build times compared to standard TypeScript compilation, making it ideal for development mode with hot reloading.

## Available Services

- **API Service** - Port 3000 (uses `@api/prisma-client`)
- **Auth Service** - Port 3001 (uses `@auth/prisma-client`)

## Quick Start Commands

### Start API Service with Rspack
```bash
pnpm rspack:api
# or
pnpm dev
```

### Start Auth Service with Rspack
```bash
pnpm rspack:auth
```

### Build for Production
```bash
pnpm build:rspack
```

## Rspack Configuration Files

- `rspack.config.api.js` - API service configuration
- `rspack.config.auth.js` - Auth service configuration

## Key Features

### Fast Refresh
Rspack provides fast hot module replacement (HMR) for rapid development.

### SWC Compiler
Uses built-in SWC loader for fast TypeScript compilation with decorator support.

### Lazy Loading
NestJS lazy-loaded modules are properly externalized to avoid compilation issues.

### Auto-Restart
The development server automatically restarts when files change (via `run-script-webpack-plugin`).

## Path Aliases

Both configs include these path aliases:
```typescript
'@app/common' -> 'libs/common/src'
'@app/app-logger' -> 'libs/app-logger/src'
'@app/auth-utilities' -> 'libs/auth-utilities/src'
'@app/caching' -> 'libs/caching/src'
'@app/health' -> 'libs/health/src'
```

Plus service-specific Prisma clients:
```typescript
'@api/prisma-client' -> 'packages/api-prisma-client/src' (API only)
'@auth/prisma-client' -> 'packages/auth-prisma-client/src' (Auth only)
```

## Externals

The following packages are externalized (not bundled) for performance and compatibility:
- `@nestjs/*`
- `@fastify/*`
- `@prisma/*`
- `@scalar/*`
- `rxjs`, `reflect-metadata`
- `class-validator`, `class-transformer`
- `pg`, `dotenv`
- **`bcrypt`** - Native modules MUST be externalized
- **`@nestjs/jwt`**, **`@nestjs/passport`**, **`passport`**, **`passport-jwt`** - Auth modules
- And NestJS lazy-loaded modules

### Critical: Native Modules

**Native Node.js modules like `bcrypt` MUST be in the externals list.**

If you get an error like:
```
Error: No native build was found for platform=darwin arch=arm64
```

Add the module to the externals regex in your Rspack config:
```javascript
externals: [
  /^(@nestjs|@fastify|@prisma|@scalar|rxjs|reflect-metadata|class-validator|class-transformer|ioredis|axios|pg|dotenv|bcrypt|@nestjs\/jwt|@nestjs\/passport|passport|passport-jwt)/,
  // ... rest of config
]
```

## Debugging

Both configs include `--inspect` flag for Node.js debugging. Connect your debugger to `localhost:9229`.

## Development Workflow

1. **Start PostgreSQL** (if using Docker):
   ```bash
   cd docker && docker-compose up -d postgres
   ```

2. **Generate Prisma Clients** (first time or after schema changes):
   ```bash
   pnpm --filter @api/prisma-client prisma generate
   pnpm --filter @auth/prisma-client prisma generate
   ```

3. **Start Service**:
   ```bash
   pnpm rspack:api  # or rspack:auth
   ```

4. **Access Documentation**:
   - API: http://localhost:3000/reference
   - Auth: http://localhost:3001/reference

## Common Issues

### Module Not Found Error
If you get "Cannot find module" errors:
1. Ensure Prisma clients are generated
2. Check that path aliases are correct in the rspack config
3. Verify the service's `.env` file exists

### Port Already in Use
Stop the running service or change the `PORT` in the service's `.env` file.

### Database Connection Errors
1. Ensure PostgreSQL is running
2. Check `DATABASE_URL` in the service's `.env` file
3. Verify database and user exist (check `docker/init-postgres.sh`)

## Related Skills

- **nestjs-helper** - General NestJS development
- **prisma-patterns** - Database operations
- **dto-validation** - DTO creation and validation
