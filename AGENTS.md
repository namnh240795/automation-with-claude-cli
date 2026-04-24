# AGENTS.md

This file provides guidance to AI coding agents (Claude Code, Cursor, Copilot, etc.) when working with code in this repository.

## Repository Overview

A **pnpm workspace monorepo** with NestJS microservices using Fastify adapter, PostgreSQL, Prisma 7, and JWT authentication. Services live in `apps/`, shared libraries in `libs/`, scoped Prisma clients in `packages/`.

```
apps/           → NestJS services (auth, ...)
libs/           → Shared libraries (auth-utilities, app-logger, caching, health, common)
packages/       → Scoped Prisma clients (auth-prisma-client, ...)
docker/         → Docker Compose for PostgreSQL
docs/           → Documentation (architecture, business, services, decisions)
```

## Skill-Driven Execution Model

This repo uses a **skill-driven execution model** powered by the Skill tool and the `.claude/skills/` directory.

### Core Rules

- If a task matches a skill, you MUST invoke it
- Skills are located in `.claude/skills/<skill-name>/skill.md`
- Never implement directly if a skill applies — invoke the skill first
- Always follow the skill instructions exactly (do not partially apply them)

### Intent → Skill Mapping

The agent should automatically map user intent to skills:

| User Intent | Skill | Also Apply Rules |
|-------------|-------|------------------|
| New feature / new functionality | `spec-driven-development`, then `incremental-implementation` + `test-driven-development` | `module-structure`, `dto-validation`, `api-conventions` |
| Planning / task breakdown | `planning-and-task-breakdown` | — |
| Bug / failure / unexpected behavior | `test-driven-development` (Prove-It Pattern) | `error-handling` |
| Code review / PR review | `code-review-and-quality` (via `/review`) | `security-and-hardening`, `auth-guard-patterns` |
| Refactoring / simplification | `code-simplify` (via `/code-simplify`) | `prisma-patterns`, `nestjs-cli` |
| Security / vulnerability concern | `security-and-hardening` | `auth-guard-patterns`, `config-management` |
| API or interface design | `dto-validation`, `api-conventions` | `swagger-scalars`, `multi-service-routing` |
| Documentation / decisions | `documentation-and-adrs` | `diagrams` |
| Build / bundling issue | `rspack-dev` (via `/rspack-nestjs`) | — |
| Test coverage gap analysis | `test-coverage-analyzer` | `nestjs-unit-testing` |
| Writing tests | `test-driven-development` + `nestjs-unit-testing` | — |

### Lifecycle Mapping

The development lifecycle maps to slash commands and their backing skills:

```
DEFINE → /spec         →  spec-driven-development
PLAN   → /plan         →  planning-and-task-breakdown
BUILD  → /build        →  incremental-implementation + test-driven-development
VERIFY → /test         →  test-driven-development (Prove-It for bugs)
REVIEW → /review       →  five-axis code review + security-and-hardening
SHIP   → /ship         →  shipping-and-launch
```

Supporting commands: `/code-simplify`, `/debug`, `/fix-issue`

### Execution Model

For every request:

1. Determine if any skill or rule applies (even 1% chance)
2. Invoke the appropriate skill using the Skill tool
3. Follow the skill workflow strictly
4. Only proceed to implementation after required steps are complete
5. Consult mandatory rules in `.claude/rules/` during implementation

### Anti-Rationalization

The following thoughts are incorrect and must be ignored:

- "This is too small for a skill"
- "I can just quickly implement this"
- "I'll gather context first instead of using a skill"
- "The rules are guidelines, not requirements"

Correct behavior:

- Always check for and use skills first
- All rules in `.claude/rules/` are mandatory and non-negotiable
- Follow the workflow: `/spec` → `/plan` → `/build` → `/test` → `/review` → Ship

## Orchestration: Skills, Rules, Commands, and Agents

This repo has four composable layers. They have different jobs and should not be confused:

- **Skills** (`.claude/skills/<name>/skill.md`) — Workflows with steps and exit criteria. The *how*. Mandatory hops when an intent matches.
- **Rules** (`.claude/rules/<name>.md`) — Mandatory coding standards. The *constraints*. Always active, never optional.
- **Commands** (`.claude/commands/<name>.md`) — User-facing entry points. The *when*. The orchestration layer.
- **Agents** (`.claude/agents/`) — Specialist sub-agents for focused tasks. The *who*.

Composition rule: **the user (or a slash command) is the orchestrator. Agents do not invoke other agents.** An agent may invoke skills and must follow rules.

## Mandatory Rules by Category

All rules in `.claude/rules/` are **mandatory**. Apply the relevant rules based on what you're doing:

### When Writing Any Code
| Rule | Purpose |
|------|---------|
| `error-handling.md` | NestJS exception types (NotFoundException, ConflictException, etc.) |
| `config-management.md` | Use ConfigService + ENVIRONMENT constants, never process.env |
| `code-style.md` | Formatting and naming conventions |

### When Building APIs / Endpoints
| Rule | Purpose |
|------|---------|
| `api-conventions.md` | Fastify adapter, ValidationPipe, versioning, Swagger, CORS |
| `dto-validation.md` | class-validator decorators, snake_case DTOs, barrel exports |
| `swagger-scalars.md` | @ApiProperty types, isArray usage, enum handling |
| `multi-service-routing.md` | SERVICE_PREFIX, no duplicate prefixes in @Controller() |
| `module-structure.md` | Thin controllers, service delegation, @LogActivity() |

### When Working with Data
| Rule | Purpose |
|------|---------|
| `prisma-patterns.md` | Soft deletes, select, include, transactions, pagination |
| `prisma-integration.md` | Prisma 7 setup, prisma.config.ts, no url in schema |
| `postgresql-db.md` | Table naming, column patterns, data types |

### When Implementing Auth
| Rule | Purpose |
|------|---------|
| `auth-guard-patterns.md` | JwtAuthGuard, @AuthUser(), @Roles(), TokenService, rate limiting |

### When Adding / Changing Build Config
| Rule | Purpose |
|------|---------|
| `rspack-dev.md` | Use Rspack not nest build, sync tsconfig + rspack aliases, externals |
| `nestjs-cli.md` | NestJS schematics with --project flag in monorepo |

### When Creating Documentation
| Rule | Purpose |
|------|---------|
| `diagrams.md` | PlantUML in docs/<section>/diagrams/, kebab-case, .puml + .svg |
| `documentation-updates.md` | Update docs after endpoints, services, schema changes |

## Monorepo Conventions

### Commands
```bash
pnpm rspack:auth          # Dev server (use this, NOT pnpm start:dev)
pnpm build:auth           # Build service
pnpm test                 # Run all tests
pnpm test:watch           # Watch mode
pnpm test:cov             # Coverage
pnpm lint                 # ESLint with auto-fix
pnpm format               # Prettier
cd apps/auth && pnpm test # Service-specific tests
```

### Path Aliases (must be in sync in both tsconfig.json and rspack.config.js)
- `@app/common` → `libs/common/src`
- `@app/auth-utilities` → `libs/auth-utilities/src`
- `@app/app-logger` → `libs/app-logger/src`
- `@app/caching` → `libs/caching/src`
- `@app/health` → `libs/health/src`
- `@auth/prisma-client` → `packages/auth-prisma-client/src`

### Naming
- **DTO properties**: `snake_case` (first_name, is_active, created_at)
- **TypeScript variables**: `camelCase` (firstName, isActive)
- **Database fields**: `snake_case`, singular tables (`user` not `users`)
- **Files**: `kebab-case` (user-profile.service.ts)

### Critical Constraints
- **Never use Express** — always Fastify adapter
- **Never use `nest build` or `nest start --watch`** — use `pnpm rspack:<service>`
- **Never put `url` in Prisma schema datasource** — use `prisma.config.ts` (Prisma 7)
- **Never repeat SERVICE_PREFIX in `@Controller()`** — `setGlobalPrefix()` already adds it
- **Never return `password_hash`** — always use Prisma `select` to exclude it
- **Never query without `deleted_at: null`** — always filter soft deletes
- **Never use `process.env` directly** — use `ConfigService` + `ENVIRONMENT` constants

## Boundaries

- Always: Follow the lifecycle workflow (`/spec` → `/plan` → `/build` → `/test` → `/review`)
- Always: Apply mandatory rules from `.claude/rules/` when implementing
- Always: Use GitNexus for impact analysis before modifying existing code
- Never: Skip the test step — tests are proof, not afterthoughts
- Never: Implement without checking if a skill applies first
- Never: Add skills that duplicate existing rules — reference rules instead
- Never: Touch files outside the task scope "while I'm here"
