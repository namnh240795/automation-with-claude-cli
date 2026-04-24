---
name: incremental-implementation
description: Delivers changes incrementally. Use when implementing any feature or change that touches more than one file. Use when you're about to write a large amount of code at once, or when a task feels too big to land in one step.
---

# Incremental Implementation

Build in thin vertical slices — implement one piece, test it, verify it, then expand. Each increment leaves the monorepo in a working, testable state. This is the execution discipline that makes large features manageable in a pnpm workspace with multiple NestJS services.

## When to Use

- Implementing any multi-file change across `apps/` or `libs/`
- Building a new feature from a task breakdown
- Adding a new service, module, or shared library
- Refactoring existing code across package boundaries
- Any time you're tempted to write more than ~100 lines before testing

**When NOT to use:** Single-file, single-function changes where the scope is already minimal.

## The Increment Cycle

```
+----------------------------------------------+
|                                              |
|   Implement ---> Test ---> Verify ---+       |
|       ^                              |       |
|       +------ Commit <---------------+       |
|              |                               |
|              v                               |
|          Next slice                          |
|                                              |
+----------------------------------------------+
```

For each slice:

1. **Implement** the smallest complete piece of functionality
2. **Test** — run the test suite (or write a test if none exists)
3. **Verify** — confirm the slice works (tests pass, build succeeds, lint clean)
4. **Commit** — save progress with a conventional commit message
5. **Move to the next slice** — carry forward, don't restart

## Slicing Strategies

### Vertical Slices (Preferred)

Build one complete path through the stack for this NestJS monorepo:

```
Slice 1: Schema + DTO + Service method (create)
    -> pnpm test passes, Prisma query works in service

Slice 2: Controller endpoint + Swagger decorators
    -> pnpm test passes, endpoint documented in Swagger

Slice 3: Auth guard + route protection
    -> pnpm test passes, endpoint requires JWT

Slice 4: Integration with shared library (@app/*)
    -> pnpm test passes, full feature works end-to-end
```

Each slice delivers working, testable functionality.

### Contract-First Slicing

When adding a new shared library that multiple services will consume:

```
Slice 0: Define the interface and DTOs in libs/
Slice 1a: Implement the library with tests
Slice 1b: Update tsconfig.json + rspack.config.js aliases
Slice 2: Integrate into the consuming service
```

### Risk-First Slicing

Tackle the riskiest or most uncertain piece first:

```
Slice 1: Prove the Prisma 7 migration works with driver adapters (highest risk)
Slice 2: Build the service CRUD on the proven schema
Slice 3: Add caching with @app/caching integration
```

If Slice 1 fails, you discover it before investing in Slices 2 and 3.

## Implementation Rules

### Rule 0: Simplicity First

Before writing any code, ask: "What is the simplest thing that could work?"

```
SIMPLICITY CHECK:
X  Generic EventBus with middleware pipeline for one notification
>  Direct function call via shared library

X  Abstract factory pattern for two similar controllers
>  Two straightforward controllers with shared DTOs

X  Custom ORM wrapper around Prisma
>  Direct Prisma queries with select and where
```

Three similar lines of code is better than a premature abstraction. Implement the naive, obviously-correct version first.

### Rule 0.5: Scope Discipline

Touch only what the task requires. Do NOT:
- "Clean up" code adjacent to your change
- Refactor imports in files you're not modifying
- Add features not in the spec because they "seem useful"
- Modernize syntax in files you're only reading
- Add path aliases you don't need yet

If you notice something worth improving outside scope, note it — don't fix it:

```
NOTICED BUT NOT TOUCHING:
- libs/auth-utilities/src/password.ts has unused import (unrelated)
- apps/auth/src/main.ts could use better error messages (separate task)
-> Want me to create tasks for these?
```

### Rule 1: One Thing at a Time

Each increment changes one logical thing.

**Bad:** One commit that adds a new Prisma model, creates the service, and updates rspack.config.js.

**Good:** Three separate commits:
1. `feat(auth): add user_role model to Prisma schema`
2. `feat(auth): add roles service with CRUD methods`
3. `chore: update rspack externals for new dependency`

### Rule 2: Keep It Compilable

After each increment, the project must build and all tests must pass.

```bash
# After each slice, run these to verify:
pnpm test                    # Tests pass
pnpm build:auth              # Build succeeds (if touching auth service)
pnpm lint                    # Lint clean
```

Don't leave the codebase in a broken state between slices.

### Rule 3: Update Both Config Files Together

When adding a new library or import path, update `tsconfig.json` AND `rspack.config.js` in the same commit:

```typescript
// tsconfig.json paths
"@app/new-lib": ["libs/new-lib/src"],

// rspack.config.js alias
"@app/new-lib": path.resolve(__dirname, "libs/new-lib/src"),
```

Never leave these out of sync — it causes runtime module resolution failures.

### Rule 4: Externalize New Dependencies

When installing a new NestJS/Fastify package, add it to `externals` in `rspack.config.js`:

```javascript
// After: pnpm add --filter auth @nestjs/microservices
// Update rspack.config.js:
externals: [
  /^@nestjs\//,
  /^@fastify\//,
  // ... existing externals
  '@nestjs/microservices',  // Add the new package
]
```

### Rule 5: Rollback-Friendly Commits

Each increment should be independently revertable:

- Additive changes (new files, new functions) are easy to revert
- Modifications to existing code should be minimal and focused
- Prisma migrations should have corresponding rollback via `prisma migrate reset`
- Separate deletion from creation — don't delete and replace in the same commit

## Monorepo-Specific Workflow

### Adding a New Feature to an Existing Service

```
Slice 1: Prisma schema + migration
    cd apps/auth
    DATABASE_URL="..." pnpm prisma migrate dev --name add_roles
    pnpm prisma generate
    -> Commit: "feat(auth): add role model to Prisma schema"

Slice 2: DTOs with validation
    Create dto/ folder with CreateRoleDto, UpdateRoleDto, RoleResponseDto
    Write DTO validation tests
    -> pnpm test passes
    -> Commit: "feat(auth): add role DTOs with validation"

Slice 3: Service with CRUD methods
    Write service tests first (TDD)
    Implement service methods
    -> pnpm test passes
    -> Commit: "feat(auth): add roles service with CRUD methods"

Slice 4: Controller with Swagger
    Write controller tests
    Implement thin controller with @ApiTags, @ApiOperation
    -> pnpm test passes
    -> Commit: "feat(auth): add roles controller with Swagger docs"

Slice 5: Module registration
    Register service and controller in the feature module
    Import into AppModule
    -> pnpm build:auth succeeds
    -> Commit: "feat(auth): register roles module in app"

Slice 6: Documentation
    Update docs/services/auth/README.md with new endpoints
    Add diagram if the flow is complex
    -> Commit: "docs(auth): document roles endpoints"
```

### Adding a New Shared Library

```
Slice 1: Create library structure
    mkdir -p libs/new-lib/src
    Create index.ts with barrel exports
    -> Commit: "feat: add new-lib shared library skeleton"

Slice 2: Implement with tests
    Write tests first (TDD)
    Implement library functions
    -> pnpm test passes
    -> Commit: "feat: implement new-lib core functions"

Slice 3: Register in monorepo
    Update tsconfig.json paths
    Update rspack.config.js aliases and externals
    -> pnpm build:auth succeeds
    -> Commit: "chore: register new-lib path aliases"

Slice 4: Integrate into service
    Import and use in target service
    -> pnpm test passes
    -> Commit: "feat(auth): integrate new-lib into auth service"
```

### Adding a New Service

```
Slice 1: Service scaffold
    Create apps/new-service/ with standard structure
    .env, rspack.config.js, tsconfig.json
    -> Commit: "feat: scaffold new-service"

Slice 2: Prisma setup
    prisma.config.ts, schema.prisma, PrismaService, PrismaModule
    Generate scoped client in packages/
    -> Commit: "feat(new-service): add Prisma 7 database layer"

Slice 3: Bootstrap
    main.ts with Fastify adapter, Swagger, validation pipe
    app.module.ts with ConfigModule, PrismaModule
    -> pnpm rspack:new-service works
    -> Commit: "feat(new-service): add bootstrap with Fastify and Swagger"

Slice 4: First feature (vertical slice)
    Follow the "Adding a New Feature" workflow above
```

## GitNexus Integration

Before each implementation slice that modifies existing code:

1. **Run impact analysis**: `gitnexus_impact({target: "symbolName", direction: "upstream"})`
2. **Review blast radius**: Check d=1 (WILL BREAK) dependents
3. **Plan the slice**: Ensure all direct callers are updated in the same increment
4. **After implementing**: `gitnexus_detect_changes({scope: "staged"})` to verify scope

## Verification Commands

After each increment:

```bash
# Tests
pnpm test                              # All tests pass
cd apps/auth && pnpm test              # Service-specific tests

# Build
pnpm build:auth                        # Service builds successfully

# Lint and format
pnpm lint                              # No lint errors
pnpm format                            # Code formatted

# Type checking
npx tsc --noEmit                       # TypeScript clean

# GitNexus (for existing code changes)
# Run gitnexus_detect_changes({scope: "staged"}) to verify scope
```

## Increment Checklist

After each increment, verify:

- [ ] The change does one thing and does it completely
- [ ] All existing tests still pass (`pnpm test`)
- [ ] The build succeeds (`pnpm build:auth` or relevant service)
- [ ] Linting passes (`pnpm lint`)
- [ ] tsconfig.json and rspack.config.js are in sync (if aliases changed)
- [ ] New dependencies are in rspack externals (if packages added)
- [ ] Prisma client regenerated (if schema changed)
- [ ] The change is committed with a conventional commit message

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "I'll test it all at the end" | Bugs compound. A bug in Slice 1 makes Slices 2-5 wrong. |
| "It's faster to do it all at once" | It *feels* faster until something breaks and you can't find which of 500 lines caused it. |
| "I'll add the rspack externals later" | Missing externals crash the runtime immediately. Add them now. |
| "These changes are too small to commit separately" | Small commits are free. Large commits hide bugs and make rollbacks painful. |
| "This refactor is small enough to include" | Refactors mixed with features make both harder to review. Separate them. |

## Red Flags

- More than 100 lines of code written without running `pnpm test`
- Multiple unrelated changes in a single increment
- tsconfig.json and rspack.config.js out of sync
- Forgetting `pnpm prisma generate` after schema changes
- New dependency not in rspack externals
- Build or tests broken between increments
- Large uncommitted changes accumulating
- Touching files outside the task scope "while I'm here"
- Creating utility files in `libs/` before the third use case demands it

## Integration with Other Skills

| Skill | Use Together When |
|-------|-------------------|
| `test-driven-development` | Writing failing tests before each implementation slice |
| `nestjs-unit-testing` | Test templates and mocking patterns |
| `documentation-and-adrs` | Recording architectural decisions for new services/libraries |
| `rspack-dev` | Build configuration for new dependencies and aliases |
