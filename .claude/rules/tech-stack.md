# Tech Stack — Approved Technologies

> Source: Authorized technology stack for this monorepo. Do NOT introduce alternatives without explicit approval.

## Approved Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Runtime** | Node.js | 20 LTS | Server runtime |
| **Language** | TypeScript | 5.x (strict) | Primary language |
| **Framework** | NestJS | 11.x | Application framework |
| **HTTP Adapter** | Fastify | 5.x | HTTP server (NOT Express) |
| **ORM** | Prisma | 7.x | Database ORM with driver adapters |
| **Database** | PostgreSQL | 16 (pgvector image) | Primary data store |
| **Cache** | Redis | 7.x (ioredis) | Caching, sessions, rate limiting |
| **Message Queue** | RabbitMQ | 3.x (amqplib) | Async messaging, event-driven architecture |
| **Validation** | class-validator + class-transformer | 0.14 / 0.5 | DTO validation |
| **Auth** | JWT (passport-jwt) | 4.x | Token-based authentication |
| **Password** | bcrypt | 6.x | Password hashing |
| **Build** | Rspack | 1.x | Fast bundling (NOT webpack/nest build) |
| **API Docs** | Swagger + Scalar | 11.x | API documentation |
| **Testing** | Jest + @nestjs/testing | 29.x | Unit and integration tests |
| **E2E Testing** | Playwright | 1.x | End-to-end browser tests |
| **Linting** | ESLint | 9.x | Code linting |
| **Formatting** | Prettier | 3.x | Code formatting |
| **Package Manager** | pnpm | workspace | Monorepo package management |
| **Logging** | @app/app-logger | internal | @LogActivity decorator |
| **Dates** | date-fns | 4.x | Date utilities |
| **HTTP Client** | axios | 1.x | External HTTP requests |
| **Containerization** | Docker + Docker Compose | - | Local infrastructure |

## Approved by Category

### Backend Core
```
ALWAYS:    NestJS, Fastify, Prisma 7, PostgreSQL, TypeScript
NEVER:     Express, TypeORM, Sequelize, Mongoose, raw SQL drivers
```

### Data Layer
```
ALWAYS:    PostgreSQL (primary store), Prisma 7 (ORM)
CACHE:     Redis (ioredis) — caching, rate limiting, session store
QUEUE:     RabbitMQ (amqplib) — async messaging, event-driven patterns
NEVER:     MongoDB, MySQL, SQLite, Memcached
```

### Auth & Security
```
ALWAYS:    JWT (passport-jwt), bcrypt, @app/auth-utilities
OPTIONAL:  Keycloak (nest-keycloak-connect) — enterprise SSO
NEVER:     Session cookies for API auth, plaintext passwords, custom crypto
```

### Build & Dev Tools
```
ALWAYS:    Rspack (bundling), pnpm (packages), Jest (testing)
NEVER:     webpack, nest build, nest start --watch, npm, yarn
```

### Frontend (within auth service web app)
```
ALWAYS:    React, React Router, Tailwind CSS, Radix UI, Lucide icons
NEVER:     Angular, Vue, Svelte, Bootstrap, jQuery
```

---

## Never Use (Banned)

| Technology | Why | Alternative |
|------------|-----|-------------|
| Express | Project uses Fastify | Fastify adapter |
| TypeORM / Sequelize | Project uses Prisma | Prisma 7 |
| MongoDB | Project uses PostgreSQL | PostgreSQL |
| webpack | Project uses Rspack | Rspack |
| `nest build` / `nest start` | Too slow | `pnpm rspack:[service]` |
| `process.env` | Bypasses ConfigService | `ConfigService.get()` |
| Zod | Project uses class-validator | class-validator + class-transformer |
| Joi | Project uses class-validator | class-validator + class-transformer |
| `req.user` | Bypasses decorator pattern | `@AuthUser()` decorator |
| raw SQL | Bypasses ORM, injection risk | Prisma query builder |
| hard deletes | Data loss risk | Soft delete (`deleted_at`) |

---

## Adding New Technology

Before introducing any new package or technology:

1. **Check this list first** — if it's banned, don't use it
2. **If not listed**, ask the human for approval before adding
3. **If approved**, update this file with the new technology
4. **If it's a NestJS/Fastify package**, add to `rspack.config.js` externals
5. **If it's a shared utility**, add to `libs/` with path aliases in both `tsconfig.json` and `rspack.config.js`
6. **If it's infrastructure**, add to `docker/docker-compose.yml`

### Installation Commands

```bash
# Workspace root (build tools, dev tools only)
pnpm add -D -w <package>

# App-specific dependencies
pnpm add --filter <service> <package>

# Example: Adding Redis client to auth service
pnpm add --filter auth ioredis

# Example: Adding RabbitMQ client to auth service
pnpm add --filter auth amqplib @types/amqplib
```

---

## Infrastructure (Docker)

| Service | Image | Port | Purpose |
|---------|-------|------|---------|
| PostgreSQL | pgvector/pgvector:pg16 | 5432 | Primary database (with vector extension) |
| Redis | redis:7-alpine | 6379 | Cache, rate limiting, sessions |
| RabbitMQ | rabbitmq:3-management | 5672 / 15672 | Message queue with management UI |

---

## Shared Libraries

| Library | Alias | Purpose |
|---------|-------|---------|
| auth-utilities | `@app/auth-utilities` | JWT guards, `@AuthUser()`, `@Roles()`, password hashing |
| app-logger | `@app/app-logger` | `@LogActivity()` decorator |
| caching | `@app/caching` | Redis cache manager wrapper |
| health | `@app/health` | Health check utilities |
| common | `@app/common` | Common utilities, interceptors |

---

## Version Pinning Rules

- **Major versions** — pinned (e.g., `@nestjs/common@^11.0.0`)
- **Minor versions** — caret range allowed (`^11.1.0`)
- **Never use** `*` or `latest` as version
- **Prisma** — workspace root and service versions MUST match
- **NestJS packages** — all `@nestjs/*` packages MUST be same major version

---

## Checklist

- [ ] Never introduce a technology not on this list without approval
- [ ] Never use a banned technology
- [ ] Always add NestJS/Fastify packages to rspack externals
- [ ] Always sync path aliases in both tsconfig.json and rspack.config.js
- [ ] Always pin major versions
- [ ] Always use pnpm (never npm or yarn)
- [ ] Always use Fastify adapter (never Express)
- [ ] Always use Rspack for builds (never nest build)
