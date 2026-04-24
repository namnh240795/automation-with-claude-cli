---
name: spec-driven-development
description: Creates specs before coding. Use when starting a new project, feature, or significant change and no specification exists yet. Use when requirements are unclear, ambiguous, or only exist as a vague idea.
---

# Spec-Driven Development

Write a structured specification before writing any code. The spec is the shared source of truth between you and the human engineer — it defines what we're building, why, and how we'll know it's done. Code without a spec is guessing.

## When to Use

- Starting a new project, service, or feature
- Requirements are ambiguous or incomplete
- The change touches multiple files, modules, or services
- You're about to make an architectural decision
- The task would take more than 30 minutes to implement

**When NOT to use:** Single-line fixes, typo corrections, or changes where requirements are unambiguous and self-contained.

## The Gated Workflow

This skill integrates with the project's development workflow (`/spec` → `/plan` → `/build` → `/test` → `/review` → Ship). Spec-driven development covers the first three gates:

```
SPECIFY ──→ PLAN ──→ TASKS ──→ IMPLEMENT (/build)
   │          │        │          │
   ▼          ▼        ▼          ▼
 Human      Human    Human      Human
 reviews    reviews  reviews    reviews
```

Do not advance to the next phase until the current one is validated.

### Phase 1: Specify

Start with a high-level vision. Ask the human clarifying questions until requirements are concrete.

**Surface assumptions immediately.** Before writing any spec content, list what you're assuming:

```
ASSUMPTIONS I'M MAKING:
1. This is a new endpoint in the auth service (apps/auth)
2. Authentication uses JWT tokens (existing @app/auth-utilities)
3. The database is PostgreSQL with Prisma 7 (no url in datasource)
4. API follows SERVICE_PREFIX routing (no duplicate prefix in @Controller())
5. Rspack is used for builds (not nest build)
→ Correct me now or I'll proceed with these.
```

Don't silently fill in ambiguous requirements. The spec's entire purpose is to surface misunderstandings *before* code gets written.

**Write a spec document covering these core areas:**

1. **Objective** — What are we building and why? Who is the user? What does success look like?

2. **Commands** — Full executable commands with flags, not just tool names.

   ```
   Dev:    pnpm rspack:auth
   Build:  pnpm build:auth
   Test:   cd apps/auth && pnpm test
   Lint:   pnpm lint
   Format: pnpm format
   DB:     cd apps/auth && DATABASE_URL="postgresql://..." pnpm prisma:migrate --name <name>
   Generate: cd apps/auth && pnpm prisma:generate
   ```

3. **Project Structure** — Monorepo layout with descriptions.

   ```
   apps/[service]/          → Service source code
   apps/[service]/src/      → NestJS modules, controllers, services
   apps/[service]/src/dto/  → Request/response DTOs (snake_case)
   apps/[service]/prisma/   → Prisma schema and migrations
   libs/                    → Shared libraries (@app/* aliases)
   packages/                → Generated Prisma clients (@[service]/prisma-client)
   docs/                    → Documentation (organized by section)
   docs/services/[name]/    → Per-service docs and diagrams
   ```

4. **Code Style** — One real code snippet showing the project's conventions.

   ```typescript
   // DTO — snake_case properties, class-validator + Swagger decorators
   export class CreateUserDto {
     @ApiProperty({ example: 'john@example.com', description: 'Email address' })
     @IsEmail()
     @IsNotEmpty()
     email: string;

     @ApiProperty({ example: 'John Doe' })
     @IsString()
     @IsNotEmpty()
     @Length(2, 100)
     full_name: string;
   }

   // Service — @LogActivity(), soft delete filters, audit fields
   @Injectable()
   export class UserService {
     constructor(private readonly prisma: PrismaService) {}

     @LogActivity()
     async findOne(id: string) {
       return this.prisma.user.findUnique({
         where: { id, deleted_at: null },
         select: { id: true, email: true, full_name: true, created_at: true },
       });
     }
   }

   // Controller — thin, delegates to service, proper guards and docs
   @ApiTags('Users')
   @Controller('users')
   export class UserController {
     constructor(private readonly userService: UserService) {}

     @Get(':id')
     @Version('1')
     @UseGuards(JwtAuthGuard)
     @ApiBearerAuth()
     @ApiOperation({ summary: 'Get user by ID' })
     async findOne(@AuthUser() user: JwtPayloadDto, @Param('id') id: string) {
       return this.userService.findOne(id);
     }
   }
   ```

5. **Testing Strategy** — NestJS testing with Jest.

   ```
   Framework:   Jest (@nestjs/testing)
   Location:    Co-located (*.spec.ts next to source files)
   Patterns:    AAA (Arrange, Act, Assert), mock PrismaService
   Coverage:    Lines >80%, Branches >75%, Functions >80%
   Services:    100% coverage required
   Controllers: 100% coverage required
   Run:         cd apps/[service] && pnpm test
   Watch:       cd apps/[service] && pnpm test:watch
   Coverage:    cd apps/[service] && pnpm test:cov
   ```

6. **Boundaries** — Three-tier system aligned with project rules.

   - **Always do:**
     - Filter soft deletes (`deleted_at: null`) in every query
     - Use `select` to limit returned fields (never return `password_hash`)
     - Set `created_by`/`updated_by` audit fields
     - Add `@LogActivity()` on service methods
     - Add `@Version('1')` on endpoints
     - Add Swagger decorators (`@ApiTags`, `@ApiOperation`, `@ApiResponse`)
     - Use `@AuthUser()` decorator (not `req.user`)
     - Run `gitnexus_impact` before modifying any symbol
     - Sync path aliases in both `tsconfig.json` and `rspack.config.js`
     - Update docs per documentation-updates rule after changes

   - **Ask first:**
     - Database schema changes (Prisma migrations)
     - Adding new npm dependencies
     - Adding new shared libraries to `libs/`
     - Changing `rspack.config.js` externals
     - Adding new path aliases
     - Creating a new service in `apps/`
     - Modifying JWT payload structure
     - Changing CI/CD configuration

   - **Never do:**
     - Commit `.env` files or secrets
     - Use Express adapter (always Fastify)
     - Use `nest build` or `pnpm start:dev` (always Rspack)
     - Hard-delete records (always soft delete with `deleted_at`)
     - Repeat SERVICE_PREFIX in `@Controller()` decorator
     - Put `url` in Prisma schema datasource block (Prisma 7)
     - Use `process.env` directly (always `ConfigService`)
     - Edit a symbol without running `gitnexus_impact` first
     - Ignore HIGH/CRITICAL risk from impact analysis

**Spec template:**

```markdown
# Spec: [Project/Feature Name]

## Objective
[What we're building and why. User stories or acceptance criteria.]

## Target Service
[Which service in apps/ — e.g., auth, api, or new service]

## Tech Stack
- Runtime: Node.js + NestJS (Fastify adapter)
- Database: PostgreSQL + Prisma 7
- Auth: JWT (@app/auth-utilities)
- Build: Rspack
- Testing: Jest (@nestjs/testing)
- API Docs: Swagger + Scalar

## Commands
[Build, test, lint, dev — full pnpm commands for the target service]

## Project Structure
[Directory layout showing which files in apps/ and libs/ will be touched]

## Code Style
[Example snippet following project conventions — DTO, service, controller patterns]

## API Endpoints
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| ... | ... | ... | ... |

## Database Changes
[New models, fields, migrations needed — with Prisma schema snippets]

## Testing Strategy
[Test locations, coverage targets, key test scenarios]

## Boundaries
- Always: [Project-specific always-do rules]
- Ask first: [Decisions requiring human approval]
- Never: [Project-specific never-do rules]

## Success Criteria
[How we'll know this is done — specific, testable conditions]

## Documentation Updates
[Which docs/ sections need updating after implementation]

## Open Questions
[Anything unresolved that needs human input]
```

**Reframe instructions as success criteria.** When receiving vague requirements, translate them into concrete conditions:

```
REQUIREMENT: "Add user registration"

REFRAMED SUCCESS CRITERIA:
- POST /{prefix}/v1/signup creates a user with hashed password
- Returns 201 with JWT access_token and refresh_token
- Returns 409 if email already exists (P2002 handling)
- Password never returned in any response (select exclusion)
- Swagger docs show the endpoint with request/response examples
- Unit tests cover success, duplicate email, and validation cases
→ Are these the right targets?
```

This lets you loop, retry, and problem-solve toward a clear goal rather than guessing what "add registration" means.

### Phase 2: Plan

With the validated spec, generate a technical implementation plan. Use the `planning-and-task-breakdown` skill for this phase:

1. Identify the major components and their dependencies
2. Map the monorepo dependency chain (schema → client → service → controller → API)
3. Determine the implementation order (foundations first)
4. Run `gitnexus_impact` on symbols that will be modified
5. Note risks and mitigation strategies
6. Identify what can be built in parallel vs. what must be sequential
7. Define verification checkpoints between phases

The plan should be reviewable: the human should be able to read it and say "yes, that's the right approach" or "no, change X."

### Phase 3: Tasks

Break the plan into discrete, implementable tasks using vertical slicing:

- Each task should be completable in a single focused session
- Each task has explicit acceptance criteria
- Each task includes a verification step (test, build, manual check)
- Tasks are ordered by dependency, not by perceived importance
- No task should require changing more than ~5 files
- Database tasks always include: schema → migrate → generate → verify cycle
- Shared library tasks always include: code → tsconfig.json → rspack.config.js sync

**Task template:**
```markdown
- [ ] Task: [Description]
  - Acceptance: [What must be true when done]
  - Verify: [How to confirm — test command, build, Swagger check]
  - Files: [Which files in apps/ and libs/ will be touched]
  - Impact: [gitnexus_impact results for modified symbols]
```

### Phase 4: Implement

Execute tasks one at a time following TDD (RED-GREEN-REFACTOR):

1. Write a failing test
2. Implement the minimum to pass
3. Refactor while keeping tests green
4. Run verification after each task
5. Update documentation after each task that adds/modifies endpoints

## Spec Storage

Specs are living documents stored in the repository:

```
docs/
├── specs/                          ← All specs live here
│   ├── auth-service-signup.md       ← Feature spec
│   ├── user-crud-api.md             ← Feature spec
│   └── multi-tenant-architecture.md ← Architecture spec
├── services/                       ← Per-service docs (updated from specs)
├── architecture/                   ← Architecture docs
└── business/                       ← Business flow docs
```

- **Commit the spec** — The spec belongs in version control alongside the code
- **Update when decisions change** — If the data model needs to change, update the spec first, then implement
- **Update when scope changes** — Features added or cut should be reflected in the spec
- **Reference the spec in PRs** — Link back to the spec section that each PR implements
- **Update service docs after implementation** — Sync `docs/services/<name>/README.md` with what was actually built

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "This is simple, I don't need a spec" | Simple tasks don't need *long* specs, but they still need acceptance criteria. A two-line spec is fine. |
| "I'll write the spec after I code it" | That's documentation, not specification. The spec's value is in forcing clarity *before* code. |
| "The spec will slow us down" | A 15-minute spec prevents hours of rework. Waterfall in 15 minutes beats debugging in 15 hours. |
| "Requirements will change anyway" | That's why the spec is a living document. An outdated spec is still better than no spec. |
| "The user knows what they want" | Even clear requests have implicit assumptions. The spec surfaces those assumptions. |
| "I can just follow the existing patterns" | Patterns tell you *how* to build. The spec tells you *what* to build. Both are needed. |

## Red Flags

- Starting to write code without any written requirements
- Asking "should I just start building?" before clarifying what "done" means
- Implementing features not mentioned in any spec or task list
- Making architectural decisions without documenting them
- Skipping the spec because "it's obvious what to build"
- Adding endpoints without Swagger decorators or `@Version('1')`
- Querying the database without `deleted_at: null` filter
- Creating DTOs with camelCase properties (must be snake_case)
- Modifying Prisma schema without including migration steps in the plan

## Verification

Before proceeding to implementation, confirm:

- [ ] The spec covers all core areas (objective, commands, structure, style, testing, boundaries)
- [ ] Target service is identified (which `apps/[service]`)
- [ ] API endpoints are documented with method, path, auth, and description
- [ ] Database changes are listed with Prisma schema snippets
- [ ] The human has reviewed and approved the spec
- [ ] Success criteria are specific and testable
- [ ] Boundaries (Always/Ask First/Never) are defined
- [ ] `gitnexus_impact` was run on all symbols that will be modified
- [ ] Documentation update targets are identified
- [ ] The spec is saved to `docs/specs/` in the repository
