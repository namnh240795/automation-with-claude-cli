# Rspack Development — Build Tool Rules

> Source: Monorepo development toolchain configuration

## ⚡ Always Use Rspack for Development

### ✅ Use Rspack commands — never nest start or nest build
```bash
# ❌ Bad — slow TypeScript compilation
pnpm start:dev
nest start --watch
nest build

# ✅ Good — fast Rspack builds (10-100x faster)
pnpm rspack:auth          # Auth service (port 3001)
pnpm rspack:api           # API service (port 3000)
```

---

## 🏗️ Service Configuration

### ✅ Register Fastify multipart in main.ts
```typescript
const fastifyAdapter = new FastifyAdapter();

await fastifyAdapter.register(require('@fastify/multipart'), {
  attachFieldsToBody: false,
  limits: { fileSize: 20 * 1024 * 1024, files: 1, fieldSize: 1024 },
});
```

### ✅ Use SERVICE_PREFIX env var for multi-service routing
```typescript
const servicePrefix = configService.get<string>('SERVICE_PREFIX', 'backend');
app.setGlobalPrefix(servicePrefix);
```

---

## 🔧 Path Aliases

### ✅ Keep tsconfig.json and rspack.config.js aliases in sync
```typescript
// Both files MUST have identical aliases:
'@app/common'           → 'libs/common/src'
'@app/auth-utilities'    → 'libs/auth-utilities/src'
'@app/app-logger'        → 'libs/app-logger/src'
'@app/caching'           → 'libs/caching/src'
'@app/health'            → 'libs/health/src'
'@auth/prisma-client'    → 'packages/auth-prisma-client/src'
```

---

## 📦 Externals

### ✅ Externalize NestJS, Fastify, and native modules
```javascript
// rspack.config.js externals array MUST include:
externals: [
  /^@nestjs\//,
  /^@fastify\//,
  /^@prisma\//,
  /^@scalar\//,
  'rxjs', 'reflect-metadata',
  'class-validator', 'class-transformer',
  'pg', 'dotenv', 'bcrypt',
  '@nestjs/jwt', '@nestjs/passport', 'passport', 'passport-jwt',
]
```

### ✅ Native modules MUST be in externals
```javascript
// ❌ Bad — bcrypt bundled → crashes at runtime
externals: ['@nestjs/core']

// ✅ Good — bcrypt externalized
externals: ['@nestjs/core', 'bcrypt', 'pg']
```

---

## 🚀 Quick Reference

| Service | Port | Command | Prisma Client |
|---------|------|---------|---------------|
| Auth | 3001 | `pnpm rspack:auth` | `@auth/prisma-client` |
| API | 3000 | `pnpm rspack:api` | `@api/prisma-client` |

| Doc URL | Service |
|---------|---------|
| `http://localhost:3000/{prefix}/api` | API Swagger |
| `http://localhost:3001/{prefix}/api` | Auth Swagger |

---

## 🐛 Common Issues

### Module Not Found
1. Ensure Prisma clients are generated (`pnpm prisma:generate`)
2. Check path aliases in both `tsconfig.json` and `rspack.config.js`
3. Verify `.env` file exists in service directory

### Port Already in Use
Change `PORT` in the service's `.env` file.

### Database Connection Errors
1. Ensure PostgreSQL is running
2. Check `DATABASE_URL` in `.env`
3. Verify database and user exist

---

## 🚫 Checklist

- ❌ Never use `pnpm start:dev` or `nest start --watch` for development
- ❌ Never use `nest build` for development builds
- ❌ Never forget to sync path aliases in both config files
- ❌ Never bundle native modules (bcrypt, pg) — always externalize
- ✅ Always use `pnpm rspack:{service}` for development
- ✅ Always add new NestJS/Fastify packages to externals
- ✅ Always update both `tsconfig.json` and `rspack.config.js` for new aliases
