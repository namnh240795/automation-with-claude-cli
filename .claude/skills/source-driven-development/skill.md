---
name: source-driven-development
description: Grounds every implementation decision in official documentation. Use when you want authoritative, source-cited code free from outdated patterns. Use when building with any framework or library where correctness matters.
---

# Source-Driven Development

Every framework-specific code decision must be backed by official documentation. Don't implement from memory — verify, cite, and let the user see your sources. Training data goes stale, APIs get deprecated, best practices evolve. This skill ensures the user gets code they can trust because every pattern traces back to an authoritative source they can check.

## When to Use

- The user wants code that follows current best practices for a given framework
- Building boilerplate, starter code, or patterns that will be copied across a project
- The user explicitly asks for documented, verified, or "correct" implementation
- Implementing features where the framework's recommended approach matters (guards, interceptors, validation, auth, database queries)
- Reviewing or improving code that uses framework-specific patterns
- Any time you are about to write framework-specific code from memory
- Setting up new services, shared libraries, or Prisma configurations

**When NOT to use:**

- Correctness does not depend on a specific version (renaming variables, fixing typos, moving files)
- Pure logic that works the same across all versions (loops, conditionals, data structures)
- The user explicitly wants speed over verification ("just do it quickly")

## The Process

```
DETECT ──→ FETCH ──→ IMPLEMENT ──→ CITE
  │          │           │            │
  ▼          ▼           ▼            ▼
 What       Get the    Follow the   Show your
 stack?     relevant   documented   sources
            docs       patterns
```

### Step 1: Detect Stack and Versions

Read the project's dependency files to identify exact versions:

```
package.json              → pnpm workspace root (build tools, dev deps)
apps/[service]/package.json → Service-specific dependencies
pnpm-lock.yaml            → Exact resolved versions
prisma/schema.prisma      → Prisma version and provider
```

**This monorepo's core stack:**

| Technology | Detection File | Key Patterns |
|------------|---------------|--------------|
| NestJS | `package.json` `dependencies.nestjs/*` | Modules, guards, interceptors, Fastify adapter |
| Fastify | `package.json` `@nestjs/platform-fastify` | Multipart, adapter registration |
| Prisma 7 | `apps/*/prisma/schema.prisma` + `prisma.config.ts` | No url in datasource, driver adapters |
| Rspack | `rspack.config.js` | Externals, path aliases |
| class-validator | `package.json` | DTO validation, custom constraints |
| Swagger/Scalar | `package.json` `@nestjs/swagger` | ApiProperty, ApiTags, ApiOperation |

State what you found explicitly:

```
STACK DETECTED (from package.json and apps/auth/package.json):
- NestJS 11.x (with Fastify adapter)
- Prisma 7 (driver adapters, no url in schema)
- Rspack (not webpack/nest build)
- class-validator + class-transformer (DTO validation)
- @nestjs/swagger (API documentation)
- bcrypt (password hashing — must be in rspack externals)
→ Fetching official docs for the relevant patterns.
```

If versions are missing or ambiguous, **ask the user**. Don't guess — the version determines which patterns are correct.

### Step 2: Fetch Official Documentation

Fetch the specific documentation page for the feature you're implementing. Not the homepage, not the full docs — the relevant page.

**Source hierarchy for this project (in order of authority):**

| Priority | Source | URL Pattern |
|----------|--------|-------------|
| 1 | NestJS official docs | docs.nestjs.com |
| 2 | Prisma official docs | prisma.io/docs |
| 3 | Fastify official docs | fastify.dev/docs |
| 4 | Rspack official docs | rspack.dev |
| 5 | class-validator docs | github.com/typestack/class-validator |
| 6 | Web standards | MDN, web.dev |

**Also authoritative for this project:**

- Project rules in `.claude/rules/` (these are the project's own verified conventions)
- CLAUDE.md (project-specific architecture decisions)
- Existing working code in the codebase (patterns already verified to work)

**Not authoritative — never cite as primary sources:**

- Stack Overflow answers
- Blog posts or tutorials (even popular ones)
- AI-generated documentation or summaries
- Your own training data

**Be precise with what you fetch:**

```
BAD:  Fetch the NestJS homepage
GOOD: Fetch docs.nestjs.com/guards

BAD:  Search "prisma soft delete best practices"
GOOD: Fetch prisma.io/docs/orm/prisma-client/queries/soft-delete

BAD:  Fetch rspack.dev (entire site)
GOOD: Fetch rspack.dev/config/externals
```

**Check the project's own rules first.** Before fetching external docs, verify whether the project's `.claude/rules/` already codify the pattern:

```
Project rules that apply:
- .claude/rules/prisma-patterns.md → Soft delete with deleted_at, select usage
- .claude/rules/auth-guard-patterns.md → JWT guard ordering, @AuthUser() usage
- .claude/rules/dto-validation.md → snake_case properties, @Type() for numbers
- .claude/rules/api-conventions.md → Fastify adapter, Version('1'), Swagger decorators
```

When official sources conflict with project rules, surface the discrepancy to the user and verify which pattern actually works.

### Step 3: Implement Following Documented Patterns

Write code that matches what the documentation shows:

- Use the API signatures from the docs, not from memory
- Follow project rules in `.claude/rules/` for all NestJS/Prisma/Fastify patterns
- If the official docs show a new way to do something, use the new way
- If the docs deprecate a pattern, don't use the deprecated version
- If the docs don't cover something, flag it as unverified

**When docs conflict with existing project code:**

```
CONFLICT DETECTED:
The existing code uses @IsNotEmpty() on optional DTO fields,
but the project rules (.claude/rules/dto-validation.md) specify
using @IsOptional() with @ApiPropertyOptional() for optional fields.

Options:
A) Use the project rule pattern (@IsOptional + @ApiPropertyOptional)
B) Match the existing code (@IsNotEmpty on all fields)
→ Which approach do you prefer?
```

**When official docs conflict with project rules:**

```
CONFLICT DETECTED:
Prisma 7 official docs show url in the datasource block,
but the project's .claude/rules/prisma-integration.md explicitly
states "NEVER put url in schema.prisma datasource block (Prisma 7)"
and uses prisma.config.ts instead.

This project uses a custom Prisma 7 setup with driver adapters.
→ Following the project rule since it's verified to work.
```

Surface the conflict. Don't silently pick one.

### Step 4: Cite Your Sources

Every framework-specific pattern gets a citation. The user must be able to verify every decision.

**In code comments:**

```typescript
// NestJS guard ordering: Auth → Role → Tenant
// Source: .claude/rules/auth-guard-patterns.md
// Also: docs.nestjs.com/guards
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
async adminAction(@AuthUser() user: JwtPayloadDto) { ... }
```

```typescript
// Prisma 7: No url in datasource, use prisma.config.ts
// Source: .claude/rules/prisma-integration.md
// Also: prisma.io/docs/orm/overview/databases/postgresql
import { defineConfig, env } from 'prisma/config'; // NOT from '@prisma/client'
```

**In conversation:**

```
I'm using Promise.all for the pagination count + data query
instead of sequential queries. This is codified in the project's
prisma-patterns.md rule and matches Prisma's recommendation for
parallel independent queries.

Source: .claude/rules/prisma-patterns.md (Pagination Pattern section)
Also: prisma.io/docs/orm/prisma-client/queries
```

**Citation rules:**

- Full URLs, not shortened
- Prefer deep links with anchors where possible
- When citing project rules, reference the specific rule file
- Quote the relevant passage when it supports a non-obvious decision
- If you cannot find documentation for a pattern, say so explicitly:

```
UNVERIFIED: I could not find official documentation for this
pattern. This is based on training data and may be outdated.
Verify before using in production.
```

Honesty about what you couldn't verify is more valuable than false confidence.

## Monorepo-Specific Verification Points

When implementing in this monorepo, verify these against official docs and project rules:

### NestJS + Fastify
- Adapter registration in main.ts (FastifyAdapter, not Express)
- Multipart registration for file uploads
- Global validation pipe with `transform: true`
- URI versioning (`VersioningType.URI`)
- useContainer for class-validator DI

### Prisma 7
- No `url` in schema.prisma datasource block
- `prisma.config.ts` in service root with `defineConfig` from `'prisma/config'`
- Scoped Prisma client packages in `packages/`
- Driver adapter configuration

### Rspack
- Path aliases matching `tsconfig.json` exactly
- Externalization of `@nestjs/*`, `@fastify/*`, native modules
- No bundling of `bcrypt`, `pg`, or other native modules

### Shared Libraries
- Path alias registration in both config files
- Proper barrel exports (`index.ts`)
- NestJS module pattern (imports, providers, exports)

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "I'm confident about this API" | Confidence is not evidence. Training data contains outdated patterns that look correct but break against current versions. Verify. |
| "Fetching docs wastes tokens" | Hallucinating an API wastes more. The user debugs for an hour, then discovers the function signature changed. One fetch prevents hours of rework. |
| "The docs won't have what I need" | If the docs don't cover it, that's valuable information — the pattern may not be officially recommended. |
| "I'll just mention it might be outdated" | A disclaimer doesn't help. Either verify and cite, or clearly flag it as unverified. Hedging is the worst option. |
| "This is a simple task, no need to check" | Simple tasks with wrong patterns become templates. The user copies your deprecated form handler into ten components before discovering the modern approach exists. |
| "The project rules cover everything" | Rules cover conventions, not API signatures. You still need to verify the exact function parameters and return types from official docs. |

## Red Flags

- Writing framework-specific code without checking the docs for that version
- Using "I believe" or "I think" about an API instead of citing the source
- Implementing a pattern without knowing which version it applies to
- Citing Stack Overflow or blog posts instead of official documentation
- Using deprecated APIs because they appear in training data
- Not reading `package.json` before implementing
- Delivering code without source citations for framework-specific decisions
- Fetching an entire docs site when only one page is relevant
- Ignoring `.claude/rules/` that already codify the pattern
- Using Express patterns in a Fastify project
- Using `nest build` or `nest start` in a Rspack project
- Putting `url` in Prisma schema datasource for Prisma 7

## Verification

After implementing with source-driven development:

- [ ] Framework and library versions were identified from the dependency file
- [ ] Project rules in `.claude/rules/` were checked before fetching external docs
- [ ] Official documentation was fetched for framework-specific patterns
- [ ] All sources are official documentation or project rules, not blog posts or training data
- [ ] Code follows the patterns shown in the current version's documentation
- [ ] Non-trivial decisions include source citations with full URLs
- [ ] No deprecated APIs are used (checked against migration guides)
- [ ] Conflicts between docs, project rules, and existing code were surfaced to the user
- [ ] Anything that could not be verified is explicitly flagged as unverified
- [ ] Path aliases are in sync between `tsconfig.json` and `rspack.config.js`
- [ ] New dependencies are externalized in `rspack.config.js` if needed
