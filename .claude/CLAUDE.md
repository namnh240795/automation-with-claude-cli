# Claude AI Agent Configuration

## Overview

This project uses Claude AI as an intelligent development agent with structured workflows, specialized sub-agents, and mandatory coding standards.

This is a **pnpm workspace monorepo** with separate NestJS services using Fastify adapter, PostgreSQL, Prisma 7, and JWT authentication.

---

## Development Workflow

Follow this workflow for all feature development:

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   /spec  →  /plan  →  /build  →  /test  →  /review  →  Ship│
│                                                             │
│   Define    Plan     Build     Verify    Review     Deploy  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

| Phase | Command | Purpose |
|-------|---------|---------|
| **Define** | `/spec` | Create PRD with objectives, scope, boundaries |
| **Plan** | `/plan` | Decompose into vertical slices with acceptance criteria |
| **Build** | `/build` | Implement incrementally using TDD (RED-GREEN-REFACTOR) |
| **Verify** | `/test` | Write and verify tests; use Prove-It for bug fixes |
| **Review** | `/review` | Five-axis code review before merge |
| **Ship** | `/deploy` | Build, test, deploy with staged rollout |

### Supporting Commands

| Command | Purpose |
|---------|---------|
| `/debug` | Systematic error diagnosis and root cause analysis |
| `/simplify` | Reduce complexity without changing behavior |
| `/fix-issue` | Analyze and fix reported issues |

---

## Core Principles

### Code Quality
- **Test-Driven Development** — Write failing tests first, then implement
- **Incremental Implementation** — Small vertical slices, always buildable
- **Five-Axis Review** — Correctness, Readability, Architecture, Security, Performance

### Philosophy
- Progress over perfection
- Fix root causes, not symptoms
- The simplest thing that could work
- Tests are proof, not afterthought

---

## Mandatory Rules

All rules in `.claude/rules/` are **mandatory** and must be followed:

### Code Quality
| Rule | Description |
|------|-------------|
| `clean-code.md` | Variables, functions, SOLID, async/await |
| `code-style.md` | Formatting, naming conventions, file naming |
| `error-handling.md` | NestJS exception types (NotFound, Conflict, etc.) |

### Architecture & Design
| Rule | Description |
|------|-------------|
| `tech-stack.md` | **CRITICAL** — Approved technologies and banned list |
| `system-design.md` | CAP theorem, caching strategy, scaling, communication patterns |
| `project-structure.md` | Monorepo folder organization, service structure |
| `api-conventions.md` | Fastify adapter, ValidationPipe, versioning, Swagger, CORS |
| `module-structure.md` | NestJS feature modules, thin controllers, service delegation |
| `multi-service-routing.md` | SERVICE_PREFIX, multi-service Docker setup, nginx routing |

### Data & Naming
| Rule | Description |
|------|-------------|
| `naming-conventions.md` | Cache keys, DB, queues, env vars, file naming |
| `database.md` | Schema design, data types, indexes, migrations |
| `prisma-patterns.md` | Query patterns, pagination, soft deletes, error codes |
| `prisma-integration.md` | Prisma 7 setup, prisma.config.ts, driver adapters |

### Auth & Security
| Rule | Description |
|------|-------------|
| `security.md` | **CRITICAL** — Never violate security rules |
| `auth-guard-patterns.md` | JWT guards, @AuthUser(), @Roles(), TokenService, rate limiting |
| `config-management.md` | ConfigService, ENVIRONMENT constants |

### Validation & Docs
| Rule | Description |
|------|-------------|
| `dto-validation.md` | class-validator decorators, snake_case DTOs |
| `swagger-scalars.md` | @ApiProperty types, arrays, enums |
| `nestjs-cli.md` | NestJS schematics with --project in monorepo |

### Infrastructure
| Rule | Description |
|------|-------------|
| `rspack-dev.md` | Rspack commands, aliases, externals |
| `redis-patterns.md` | Key naming, caching, rate limiting, sessions |
| `rabbitmq-patterns.md` | Queue topology, message schemas, consumers |
| `frontend-conventions.md` | React, Tailwind, Radix UI, React Router |

### Operations
| Rule | Description |
|------|-------------|
| `monitoring.md` | @LogActivity(), health checks, alerting triggers |
| `testing.md` | Coverage thresholds (>80%), test structure |
| `git-workflow.md` | Branching, conventional commits, PR standards |
| `documentation-updates.md` | When and how to update docs |
| `diagrams.md` | PlantUML file organization in docs/ |

---

## Monorepo Architecture

### Services

- **apps/auth** - Auth service (port 3001, SERVICE_PREFIX=auth)

Each service has:
- Isolated PostgreSQL database (`auth_db`)
- Scoped Prisma client package (`@auth/prisma-client`)
- Independent `.env` file for configuration
- Rspack configuration for fast development builds

### Infrastructure

| Service | Image | Port | Purpose |
|---------|-------|------|---------|
| PostgreSQL | pgvector/pgvector:pg16 | 5432 | Primary database (with vector extension) |
| Redis | redis:7-alpine | 6379 | Cache, rate limiting, sessions |
| RabbitMQ | rabbitmq:3-management | 5672 / 15672 | Message queue with management UI |

### Shared Libraries

- **@app/auth-utilities** - JWT guards, `@AuthUser()` decorator, password hashing, `@Roles()` decorator
- **@app/app-logger** - `@LogActivity()` decorator for service method logging
- **@app/caching** - Redis cache manager wrapper (ioredis)
- **@app/health** - Health check utilities
- **@app/common** - Common utilities and interceptors

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

---

## Common Development Commands

### Development (Rspack watch mode)
```bash
pnpm rspack:auth          # Start Auth service (auto-restarts on changes)
pnpm dev:auth             # Alternative: NestJS watch mode (slower)
```

### Building
```bash
pnpm build:auth           # Build Auth service
```

### Database Operations
```bash
# From service directory (apps/auth)
pnpm prisma:generate      # Generate Prisma client
pnpm prisma:migrate       # Run migrations
pnpm prisma:studio        # Open Prisma Studio
```

### Testing
```bash
pnpm test                 # Run all tests
pnpm test:watch           # Watch mode
pnpm test:cov             # Coverage
cd apps/auth && pnpm test # Service-specific
```

### Linting/Formatting
```bash
pnpm lint                 # ESLint with auto-fix
pnpm format               # Prettier
```

---

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
cd apps/auth
DATABASE_URL="postgresql://..." pnpm prisma migrate dev --name migration_name
pnpm prisma generate
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
- `@auth/prisma-client` → `packages/auth-prisma-client/src`

---

## Dependency Installation Rules

This is a **pnpm workspace monorepo**. Install dependencies carefully:

### Workspace Root (build tools, dev tools)
```bash
pnpm add -D -w <package>
```
Examples: `@rspack/core`, `@rspack/cli`, `run-script-webpack-plugin`

### App-Specific Dependencies
```bash
pnpm add --filter auth <package>
# OR navigate to app first:
cd apps/auth && pnpm add <package>
```

### Critical Rspack Rules

When making changes to the monorepo:

1. **Adding a new library:** Update path aliases in BOTH `tsconfig.json` AND `rspack.config.js`
2. **Installing NestJS/Fastify packages:** Add to `externals` array in `rspack.config.js`
3. **Packages requiring externalization:** `@nestjs/*`, `@fastify/*`, `class-validator`, `class-transformer`, database drivers

---

## Key Files Reference

- `tsconfig.json` - TypeScript path aliases
- `rspack.config.js` - Rspack bundler config (must match tsconfig paths)
- `.clinerules` - Dependency installation and Rspack sync rules
- `pnpm-workspace.yaml` - Workspace configuration
- `docker/docker-compose.yml` - PostgreSQL, Redis, RabbitMQ services

---

## Available Agents

Invoke the right agent for each task type:

### Development Agents
| Agent | When to Invoke |
|-------|---------------|
| **Frontend Developer** | Components, pages, routing, state, UI performance |
| **Backend Developer** | APIs, services, DB queries, background jobs |
| **Systems Architect** | Architecture decisions, ADRs, system design |

### Quality Agents
| Agent | When to Invoke |
|-------|---------------|
| **Code Reviewer** | Five-axis PR review, code quality assessment |
| **Test Engineer** | Test strategy, TDD, coverage, bug reproduction |
| **Security Auditor** | Vulnerability assessment, threat modeling |
| **QA Engineer** | Test plans, E2E tests, bug reports |

### Product Agents
| Agent | When to Invoke |
|-------|---------------|
| **Project Manager** | User stories, sprint planning, status reports |
| **UI/UX Designer** | Design system, wireframes, accessibility |
| **Copywriter/SEO** | Page copy, meta tags, SEO optimization |

---

## Available Skills

Specialized skills for complex operations:

| Skill | Description |
|-------|-------------|
| `test-driven-development` | TDD cycle (RED-GREEN-REFACTOR), Prove-It pattern for bugs |
| `incremental-implementation` | Vertical slice development with pnpm/Rspack workflow |
| `documentation-and-adrs` | ADRs, service READMEs, inline documentation |
| `security-and-hardening` | OWASP prevention, input validation, secrets management |
| `nestjs-unit-testing` | Test templates for services, controllers, DTOs, Prisma mocks |
| `test-coverage-analyzer` | Gap analysis, find files without tests |
| `spec-driven-development` | Write specs before coding |
| `source-driven-development` | Ground decisions in official documentation |
| `planning-and-task-breakdown` | Break work into ordered tasks |
| `plantuml` | Generate PlantUML diagrams as SVG |

---

---

## Agent Behavior Guidelines

1. **Follow the workflow** — Use `/spec` → `/plan` → `/build` → `/review`
2. **Apply mandatory rules** — All rules in `.claude/rules/` are non-negotiable
3. **Test first** — Write failing tests before implementing
4. **Incremental changes** — Small commits, always buildable
5. **Explain before acting** — Describe changes before making them
6. **Fix root causes** — Don't patch symptoms
7. **Use the right agent** — Invoke specialized agents for their domains

---

<!-- gitnexus:start -->
# GitNexus — Code Intelligence

This project is indexed by GitNexus as **automation-with-claude-cli** (4004 symbols, 8590 relationships, 300 execution flows). Use the GitNexus MCP tools to understand code, assess impact, and navigate safely.

> If any GitNexus tool warns the index is stale, run `npx gitnexus analyze` in terminal first.

## Always Do

- **MUST run impact analysis before editing any symbol.** Before modifying a function, class, or method, run `gitnexus_impact({target: "symbolName", direction: "upstream"})` and report the blast radius (direct callers, affected processes, risk level) to the user.
- **MUST run `gitnexus_detect_changes()` before committing** to verify your changes only affect expected symbols and execution flows.
- **MUST warn the user** if impact analysis returns HIGH or CRITICAL risk before proceeding with edits.
- When exploring unfamiliar code, use `gitnexus_query({query: "concept"})` to find execution flows instead of grepping. It returns process-grouped results ranked by relevance.
- When you need full context on a specific symbol — callers, callees, which execution flows it participates in — use `gitnexus_context({name: "symbolName"})`.

## When Debugging

1. `gitnexus_query({query: "<error or symptom>"})` — find execution flows related to the issue
2. `gitnexus_context({name: "<suspect function>"})` — see all callers, callees, and process participation
3. `READ gitnexus://repo/automation-with-claude-cli/process/{processName}` — trace the full execution flow step by step
4. For regressions: `gitnexus_detect_changes({scope: "compare", base_ref: "main"})` — see what your branch changed

## When Refactoring

- **Renaming**: MUST use `gitnexus_rename({symbol_name: "old", new_name: "new", dry_run: true})` first. Review the preview — graph edits are safe, text_search edits need manual review. Then run with `dry_run: false`.
- **Extracting/Splitting**: MUST run `gitnexus_context({name: "target"})` to see all incoming/outgoing refs, then `gitnexus_impact({target: "target", direction: "upstream"})` to find all external callers before moving code.
- After any refactor: run `gitnexus_detect_changes({scope: "all"})` to verify only expected files changed.

## Never Do

- NEVER edit a function, class, or method without first running `gitnexus_impact` on it.
- NEVER ignore HIGH or CRITICAL risk warnings from impact analysis.
- NEVER rename symbols with find-and-replace — use `gitnexus_rename` which understands the call graph.
- NEVER commit changes without running `gitnexus_detect_changes()` to check affected scope.

## Tools Quick Reference

| Tool | When to use | Command |
|------|-------------|---------|
| `query` | Find code by concept | `gitnexus_query({query: "auth validation"})` |
| `context` | 360-degree view of one symbol | `gitnexus_context({name: "validateUser"})` |
| `impact` | Blast radius before editing | `gitnexus_impact({target: "X", direction: "upstream"})` |
| `detect_changes` | Pre-commit scope check | `gitnexus_detect_changes({scope: "staged"})` |
| `rename` | Safe multi-file rename | `gitnexus_rename({symbol_name: "old", new_name: "new", dry_run: true})` |
| `cypher` | Custom graph queries | `gitnexus_cypher({query: "MATCH ..."})` |

## Impact Risk Levels

| Depth | Meaning | Action |
|-------|---------|--------|
| d=1 | WILL BREAK — direct callers/importers | MUST update these |
| d=2 | LIKELY AFFECTED — indirect deps | Should test |
| d=3 | MAY NEED TESTING — transitive | Test if critical path |

## Resources

| Resource | Use for |
|----------|---------|
| `gitnexus://repo/automation-with-claude-cli/context` | Codebase overview, check index freshness |
| `gitnexus://repo/automation-with-claude-cli/clusters` | All functional areas |
| `gitnexus://repo/automation-with-claude-cli/processes` | All execution flows |
| `gitnexus://repo/automation-with-claude-cli/process/{name}` | Step-by-step execution trace |

## Self-Check Before Finishing

Before completing any code modification task, verify:
1. `gitnexus_impact` was run for all modified symbols
2. No HIGH/CRITICAL risk warnings were ignored
3. `gitnexus_detect_changes()` confirms changes match expected scope
4. All d=1 (WILL BREAK) dependents were updated

## Keeping the Index Fresh

After committing code changes, the GitNexus index becomes stale. Re-run analyze to update it:

```bash
npx gitnexus analyze
```

If the index previously included embeddings, preserve them by adding `--embeddings`:

```bash
npx gitnexus analyze --embeddings
```

To check whether embeddings exist, inspect `.gitnexus/meta.json` — the `stats.embeddings` field shows the count (0 means no embeddings). **Running analyze without `--embeddings` will delete any previously generated embeddings.**

> Claude Code users: A PostToolUse hook handles this automatically after `git commit` and `git merge`.

## CLI

| Task | Read this skill file |
|------|---------------------|
| Understand architecture / "How does X work?" | `.claude/skills/gitnexus/gitnexus-exploring/SKILL.md` |
| Blast radius / "What breaks if I change X?" | `.claude/skills/gitnexus/gitnexus-impact-analysis/SKILL.md` |
| Trace bugs / "Why is X failing?" | `.claude/skills/gitnexus/gitnexus-debugging/SKILL.md` |
| Rename / extract / split / refactor | `.claude/skills/gitnexus/gitnexus-refactoring/SKILL.md` |
| Tools, resources, schema reference | `.claude/skills/gitnexus/gitnexus-guide/SKILL.md` |
| Index, status, clean, wiki CLI commands | `.claude/skills/gitnexus/gitnexus-cli/SKILL.md` |

<!-- gitnexus:end -->
