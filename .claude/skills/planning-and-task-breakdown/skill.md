---
name: planning-and-task-breakdown
description: Breaks work into ordered tasks. Use when you have a spec or clear requirements and need to break work into implementable tasks. Use when a task feels too large to start, when you need to estimate scope, or when parallel work is possible.
---

# Planning and Task Breakdown

Decompose work into small, verifiable tasks with explicit acceptance criteria. Good task breakdown is the difference between an agent that completes work reliably and one that produces a tangled mess. Every task should be small enough to implement, test, and verify in a single focused session.

## When to Use

- You have a spec and need to break it into implementable units
- A task feels too large or vague to start
- Work needs to be parallelized across multiple agents or sessions
- You need to communicate scope to a human
- The implementation order isn't obvious

**When NOT to use:** Single-file changes with obvious scope, or when the spec already contains well-defined tasks.

## The Planning Process

### Step 1: Enter Plan Mode

Before writing any code, operate in read-only mode:

- Read the spec and relevant codebase sections
- Identify existing patterns and conventions
- Map dependencies between components
- Note risks and unknowns
- Run `gitnexus_impact` on symbols that will be modified
- Use `gitnexus_query` to understand execution flows

**Do NOT write code during planning.** The output is a plan document, not implementation.

### Step 2: Identify the Dependency Graph

Map what depends on what. In this monorepo, the typical dependency chain is:

```
Prisma schema (apps/[service]/prisma/schema.prisma)
    |
    +-- Prisma client package (packages/[service]-prisma-client/)
    |       |
    |       +-- Service layer (apps/[service]/src/**/*.service.ts)
    |       |       |
    |       |       +-- Controller layer (apps/[service]/src/**/*.controller.ts)
    |       |               |
    |       |               +-- API endpoints (/{SERVICE_PREFIX}/v1/...)
    |       |
    |       +-- DTO validation (apps/[service]/src/**/dto/)
    |
    +-- Migrations (apps/[service]/prisma/migrations/)
    +-- Seed data

Shared libraries (libs/)
    |
    +-- @app/auth-utilities (JWT guards, decorators)
    +-- @app/app-logger (@LogActivity decorator)
    +-- @app/caching (cache manager)
    +-- @app/health (health checks)
    +-- @app/common (utilities, interceptors)

Build config
    |
    +-- tsconfig.json (path aliases)
    +-- rspack.config.js (externals, aliases)
    +-- pnpm-workspace.yaml
```

Implementation order follows the dependency graph bottom-up: build foundations first.

### Step 3: Slice Vertically

Instead of building all the database, then all the API, then all the UI — build one complete feature path at a time:

**Bad (horizontal slicing):**
```
Task 1: Build entire database schema for all features
Task 2: Build all API endpoints
Task 3: Build all DTOs and validation
Task 4: Connect everything
```

**Good (vertical slicing):**
```
Task 1: User can create an account (Prisma model + migration + DTO + service + controller)
Task 2: User can sign in (auth DTO + service + JWT token generation + controller)
Task 3: User can view profile (query + guarded endpoint + response DTO)
Task 4: User can update profile (update DTO + service + guarded endpoint)
```

Each vertical slice delivers working, testable functionality.

### Step 4: Write Tasks

Each task follows this structure:

```markdown
## Task [N]: [Short descriptive title]

**Description:** One paragraph explaining what this task accomplishes.

**Acceptance criteria:**
- [ ] [Specific, testable condition]
- [ ] [Specific, testable condition]

**Verification:**
- [ ] Tests pass: `cd apps/[service] && pnpm test`
- [ ] Build succeeds: `pnpm build:[service]` or `pnpm rspack:[service]`
- [ ] Swagger docs render at `http://localhost:[port]/[prefix]/api`
- [ ] Manual check: [description of what to verify]

**Dependencies:** [Task numbers this depends on, or "None"]

**Files likely touched:**
- `apps/[service]/prisma/schema.prisma`
- `apps/[service]/src/[feature]/[feature].service.ts`
- `apps/[service]/src/[feature]/[feature].controller.ts`
- `apps/[service]/src/[feature]/dto/`
- `apps/[service]/rspack.config.js` (if new externals needed)

**Impact analysis:** [Run `gitnexus_impact` on affected symbols]

**Estimated scope:** [XS: 1 file | S: 1-2 files | M: 3-5 files | L: 5+ files — break down further]
```

### Step 5: Order and Checkpoint

Arrange tasks so that:

1. Dependencies are satisfied (build foundation first)
2. Each task leaves the system in a working state
3. Verification checkpoints occur after every 2-3 tasks
4. High-risk tasks are early (fail fast)

Add explicit checkpoints:

```markdown
## Checkpoint: After Tasks 1-3
- [ ] All tests pass: `pnpm test`
- [ ] Service builds: `pnpm rspack:[service]`
- [ ] Core user flow works end-to-end
- [ ] Review with human before proceeding
```

## Task Sizing Guidelines

| Size | Files | Scope | Example |
|------|-------|-------|---------|
| **XS** | 1 | Single function or config change | Add a validation rule to a DTO |
| **S** | 1-2 | One component or endpoint | Add a new API endpoint with DTO |
| **M** | 3-5 | One feature slice | Full CRUD for a resource (schema + DTOs + service + controller) |
| **L** | 5-8 | Multi-component feature | Feature with auth guards, caching, pagination, and events |
| **XL** | 8+ | **Too large — break it down further** | — |

If a task is L or larger, it should be broken into smaller tasks. An agent performs best on S and M tasks.

**When to break a task down further:**
- It would take more than one focused session (roughly 2+ hours of agent work)
- You cannot describe the acceptance criteria in 3 or fewer bullet points
- It touches two or more independent subsystems (e.g., auth and a new service)
- You find yourself writing "and" in the task title (a sign it is two tasks)
- It requires changes in both `tsconfig.json` and `rspack.config.js` plus multiple services

## Plan Document Template

```markdown
# Implementation Plan: [Feature/Project Name]

## Overview
[One paragraph summary of what we're building]

## Architecture Decisions
- [Key decision 1 and rationale]
- [Key decision 2 and rationale]

## Task List

### Phase 1: Foundation
- [ ] Task 1: ... (Prisma schema, migration, client generation)
- [ ] Task 2: ... (Shared library updates if needed)

### Checkpoint: Foundation
- [ ] Tests pass, builds clean, Prisma client generated

### Phase 2: Core Features
- [ ] Task 3: ... (Vertical slice 1)
- [ ] Task 4: ... (Vertical slice 2)

### Checkpoint: Core Features
- [ ] End-to-end flow works via Swagger

### Phase 3: Polish
- [ ] Task 5: ... (Auth guards, validation hardening)
- [ ] Task 6: ... (Docs, diagrams)

### Checkpoint: Complete
- [ ] All acceptance criteria met
- [ ] Docs updated per documentation-updates rule
- [ ] Ready for /review

## Risks and Mitigations
| Risk | Impact | Mitigation |
|------|--------|------------|
| [Risk] | [High/Med/Low] | [Strategy] |

## Open Questions
- [Question needing human input]
```

## Monorepo-Specific Considerations

### Prisma Schema Changes
When a task touches the database, it always includes:
1. Schema update in `apps/[service]/prisma/schema.prisma`
2. Migration: `cd apps/[service] && DATABASE_URL="..." pnpm prisma:migrate --name <name>`
3. Client generation: `cd apps/[service] && pnpm prisma:generate`
4. Verification that `packages/[service]-prisma-client/` was updated

### Path Alias Changes
When a task adds or modifies shared libraries, it always includes:
1. Update `tsconfig.json` paths
2. Update `rspack.config.js` aliases
3. Add any new NestJS/Fastify packages to `rspack.config.js` externals

### Service Prefix Awareness
When a task adds API endpoints, verify:
- SERVICE_PREFIX is NOT repeated in `@Controller()` decorator
- Swagger docs are at `/{SERVICE_PREFIX}/api`
- Versioning is enabled: `@Version('1')`

### Documentation Updates
After each task that adds/modifies API endpoints or DB schema:
- Update `docs/services/<service>/README.md` with endpoint details
- Update `docs/appendix/README.md` if DB schema changed
- Add diagrams to `docs/services/<service>/diagrams/` if flow is complex

## Parallelization Opportunities

When multiple agents or sessions are available:

- **Safe to parallelize:** Independent feature slices within the same service, tests for already-implemented features, documentation updates, shared library development (if no breaking changes)
- **Must be sequential:** Prisma migrations, shared library breaking changes, `tsconfig.json`/`rspack.config.js` changes, dependency chains across services
- **Needs coordination:** Features that share a DTO or API contract (define the contract first, then parallelize implementations)

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "I'll figure it out as I go" | That's how you end up with a tangled mess and rework. 10 minutes of planning saves hours. |
| "The tasks are obvious" | Write them down anyway. Explicit tasks surface hidden dependencies and forgotten edge cases. |
| "Planning is overhead" | Planning is the task. Implementation without a plan is just typing. |
| "I can hold it all in my head" | Context windows are finite. Written plans survive session boundaries and compaction. |
| "I'll add tests later" | Tests are proof, not afterthought. TDD (RED-GREEN-REFACTOR) catches bugs when they're cheapest to fix. |

## Red Flags

- Starting implementation without a written task list
- Tasks that say "implement the feature" without acceptance criteria
- No verification steps in the plan
- All tasks are XL-sized
- No checkpoints between tasks
- Dependency order isn't considered
- Tasks that skip `deleted_at: null` filters, audit fields, or error handling
- Tasks that modify Prisma schema without including migration steps
- Tasks that add imports without checking path aliases

## Verification

Before starting implementation, confirm:

- [ ] Every task has acceptance criteria
- [ ] Every task has a verification step
- [ ] Task dependencies are identified and ordered correctly
- [ ] No task touches more than ~5 files (if it does, break it down)
- [ ] Checkpoints exist between major phases
- [ ] `gitnexus_impact` was run for all symbols that will be modified
- [ ] No HIGH/CRITICAL risk warnings from impact analysis
- [ ] The human has reviewed and approved the plan
