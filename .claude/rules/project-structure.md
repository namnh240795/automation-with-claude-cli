# Project Structure — Monorepo Folder Organization

> Source: Directory and file organization standards for this monorepo

## Top-Level Structure

```
├── apps/                       # NestJS services
│   └── auth/                   # Auth service (port 3001)
├── libs/                       # Shared libraries
│   ├── auth-utilities/         # JWT guards, decorators, password hashing
│   ├── app-logger/             # @LogActivity() decorator
│   ├── caching/                # Redis cache manager wrapper
│   ├── health/                 # Health check utilities
│   └── common/                 # Common utilities and interceptors
├── packages/                   # Scoped Prisma clients
│   └── auth-prisma-client/     # Generated Prisma client for auth service
├── docker/                     # Docker Compose and init scripts
├── docs/                       # Documentation
│   ├── architecture/           # System overview diagrams
│   ├── business/               # Domain flows
│   ├── services/               # Per-service documentation
│   ├── decisions/              # Architecture Decision Records
│   └── appendix/               # ER diagrams, glossary
├── .claude/                    # Claude AI configuration
│   ├── rules/                  # Mandatory coding rules
│   ├── skills/                 # Specialized skills
│   ├── commands/               # Slash commands
│   └── CLAUDE.md               # Main configuration
├── AGENTS.md                   # Agent orchestration guide
├── tsconfig.json               # TypeScript config with path aliases
├── rspack.config.js            # Rspack bundler config (must match tsconfig)
├── pnpm-workspace.yaml         # Workspace configuration
└── package.json                # Root package.json
```

## Service Structure (apps/[service])

```
apps/auth/
├── src/
│   ├── main.ts                 # Fastify adapter + Swagger + CORS setup
│   ├── app.module.ts           # ConfigModule, PrismaModule, JWT setup
│   ├── auth/                   # Auth feature module
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.module.ts
│   │   └── dto/
│   │       ├── sign-in.dto.ts
│   │       ├── sign-up.dto.ts
│   │       └── index.ts
│   ├── strategies/             # JWT strategy (jwt.strategy.ts)
│   ├── prisma/                 # Prisma module and service
│   │   ├── prisma.module.ts
│   │   └── prisma.service.ts
│   └── common/                 # Service-specific utilities
│       ├── enum/
│       └── constants/
├── prisma/
│   └── schema.prisma           # Database schema (NO url in datasource)
├── prisma.config.ts            # Prisma 7 config (DATABASE_URL here)
├── rspack.config.js            # Service Rspack config
├── .env                        # Service environment variables
└── test/                       # E2E tests
```

## Shared Library Structure (libs/[library])

```
libs/auth-utilities/
├── src/
│   ├── decorators/             # @AuthUser(), @Roles()
│   ├── guards/                 # JwtAuthGuard, RolesGuard
│   ├── services/               # Password hashing utilities
│   ├── dto/                    # JwtPayloadDto
│   ├── strategies/             # BaseJwtStrategy
│   └── index.ts                # Barrel export
├── package.json
└── tsconfig.json
```

## Key Rules

- New service → add to `apps/` following the service structure
- New shared library → add to `libs/` with path aliases in BOTH `tsconfig.json` AND `rspack.config.js`
- New Prisma client → add to `packages/` with scoped name
- Never put business logic in `libs/common` — use specific libraries
- Never import from `apps/other-service/` directly — use REST API or RabbitMQ
