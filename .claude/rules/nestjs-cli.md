# NestJS CLI — Generation Commands Rules

> Source: NestJS CLI schematics and generation patterns for this monorepo

## ⚡ Schematics Reference

| Schematic | Alias | Generates | Example |
|-----------|-------|-----------|---------|
| module | `mo` | Module | `nest g mo users` |
| controller | `co` | Controller | `nest g co users` |
| service | `s` | Service | `nest g s users` |
| resource | `res` | Full CRUD resource | `nest g res users` |
| library | `lib` | Shared library | `nest g lib shared` |
| sub-app | `app` | New app (monorepo) | `nest g app api` |
| guard | `gu` | Guard | `nest g gu auth` |
| pipe | `pi` | Pipe | `nest g pi validation` |
| filter | `f` | Exception filter | `nest g f http-error` |
| interceptor | `itc` | Interceptor | `nest g itc logging` |
| middleware | `mi` | Middleware | `nest g mi logger` |
| decorator | `d` | Custom decorator | `nest g d roles` |
| class | `cl` | Class | `nest g cl utils` |
| interface | `itf` | Interface | `nest g itf user` |
| gateway | `ga` | WebSocket gateway | `nest g ga events` |
| resolver | `r` | GraphQL resolver | `nest g r users` |
| provider | `pr` | Provider | `nest g pr database` |

---

## 🔧 Common Options

| Option | Description |
|--------|-------------|
| `--no-spec` | Skip test file generation |
| `--flat` | Generate without dedicated directory |
| `--skip-import` | Skip import into module |
| `--module=<name>` | Specify parent module |
| `--project=<name>` | Specify project (monorepo) |
| `--path=<path>` | Specify target path |
| `--dry-run` | Simulate without creating files |

---

## 📦 Feature Generation

### ✅ Generate a complete feature module
```bash
# ❌ Bad — using resource (generates too much boilerplate)
nest g resource users

# ✅ Good — generate components individually with control
nest g mo users
nest g co users --no-spec
nest g s users --no-spec
```

### ✅ Generate CRUD resource (quick start)
```bash
nest g res users --no-spec
# Prompts for transport layer (REST API, GraphQL, microservice)
```

---

## 🏗️ Monorepo Generation

### ✅ Always specify `--project` in a monorepo
```bash
# ❌ Bad — may generate in wrong location
nest g mo users

# ✅ Good — target specific project
nest g mo users --project auth
nest g co users --project auth --no-spec
nest g s users --project auth --no-spec
```

### ✅ Generate shared libraries
```bash
nest g lib shared-validators
nest g lib shared-utils --publishable
```

---

## 🛡️ Component Generation

### Guards, Pipes, Filters, Interceptors
```bash
# Guards (authentication/authorization)
nest g gu auth --no-spec

# Pipes (validation/transformation)
nest g pi validation --no-spec

# Exception Filters
nest g f http-exception --no-spec

# Interceptors
nest g itc logging --no-spec

# Middleware
nest g mi logger --no-spec

# Custom Decorators
nest g d roles --no-spec
```

---

## 📁 Library Aliases

### ✅ Use path aliases for imports
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

---

## 🚫 Checklist

- ❌ Never generate without `--project` in a monorepo
- ❌ Never forget `--no-spec` when you don't need test files
- ❌ Never edit generated module registrations manually — use `--module`
- ✅ Always use schematics instead of creating files manually
- ✅ Always use `--dry-run` to preview before generating
- ✅ Always use path aliases (`@app/*`) for library imports
