# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Monorepo Architecture

This is a **pnpm workspace monorepo** with separate NestJS services using Fastify adapter, PostgreSQL, Prisma 7, and JWT authentication.

### Services

- **apps/auth** - Auth service (port 3001, SERVICE_PREFIX=auth)

Each service has:
- Isolated PostgreSQL database (`auth_db`)
- Scoped Prisma client package (`@auth/prisma-client`)
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
# Start Auth service (auto-restarts on changes)
pnpm rspack:auth

# Alternative: NestJS watch mode (slower)
pnpm dev:auth
```

### Building
```bash
# Build Auth service
pnpm build:auth
```

### Database Operations
```bash
# From service directory (apps/auth)
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
cd apps/auth && pnpm test
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
cd apps/auth
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
- `@auth/prisma-client` → `packages/auth-prisma-client/src`
- `@app/rag-utilities` → `libs/rag-utilities/src`
- `@rag/prisma-client` → `packages/rag-prisma-client/src`

## Dependency Installation Rules (from .clinerules)

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

<!-- gitnexus:start -->
# GitNexus — Code Intelligence

This project is indexed by GitNexus as **automation-with-claude-cli** (2539 symbols, 6884 relationships, 211 execution flows). Use the GitNexus MCP tools to understand code, assess impact, and navigate safely.

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
