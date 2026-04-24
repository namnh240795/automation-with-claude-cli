---
name: documentation-and-adrs
description: Records decisions and documentation. Use when making architectural decisions, changing public APIs, shipping features, or when you need to record context that future engineers and agents will need to understand the codebase.
---

# Documentation and ADRs

Document decisions, not just code. The most valuable documentation captures the *why* — context, constraints, and trade-offs. Code shows *what* was built; documentation explains *why it was built this way*. This skill integrates with the existing `docs/` structure and the `documentation-updates` rule.

## When to Use

- Making a significant architectural decision (new service, new library, framework choice)
- Choosing between competing approaches (REST vs GraphQL, caching strategy)
- Adding or changing a public API endpoint
- Shipping a feature that changes user-facing behavior
- Creating or modifying a shared library in `libs/`
- When you find yourself explaining the same thing repeatedly

**When NOT to use:** Don't document obvious code. Don't add comments that restate what the code says. Don't write docs for throwaway prototypes.

## Documentation Structure in This Monorepo

This project uses a 4-section docs structure. All documentation goes in `docs/`:

```
docs/
├── architecture/
│   ├── diagrams/          # System overview, deployment, monorepo structure
│   └── README.md          # Architecture overview, services, shared libraries
├── business/
│   ├── diagrams/          # Domain flows, user journeys, state machines
│   └── README.md          # Business rules, process workflows
├── services/
│   ├── auth/
│   │   ├── diagrams/      # Auth flow, JWT lifecycle
│   │   └── README.md      # Auth endpoints, request/response examples
│   └── <service>/         # One folder per service
│       ├── diagrams/
│       └── README.md
├── decisions/             # Architecture Decision Records (ADRs)
│   ├── 001-postgresql-prisma.md
│   └── 002-fastify-over-express.md
└── appendix/
    ├── diagrams/          # ER diagrams, glossary
    └── README.md          # Database schemas, shared data models
```

## Architecture Decision Records (ADRs)

Store ADRs in `docs/decisions/` with sequential numbering.

### When to Write an ADR

- Choosing a framework, library, or major dependency
- Designing a data model or Prisma schema
- Selecting an authentication strategy
- Deciding on API architecture or service boundaries
- Choosing between build tools (Rspack vs Webpack, etc.)
- Any decision that would be expensive to reverse

### ADR Template

```markdown
# ADR-XXX: <Title>

## Status
Proposed | Accepted | Superseded by ADR-XXX | Deprecated

## Date
YYYY-MM-DD

## Context
What is the issue that we're seeing that is motivating this decision or change?

## Decision
What is the change that we're proposing and/or doing?

## Alternatives Considered

### Option A: <Name>
- Pros: ...
- Cons: ...
- Rejected because: ...

### Option B: <Name>
- Pros: ...
- Cons: ...
- Rejected because: ...

## Consequences
What becomes easier or more difficult to do because of this change?
```

### ADR Example for This Monorepo

```markdown
# ADR-001: Use Fastify over Express for NestJS Services

## Status
Accepted

## Date
2025-01-15

## Context
NestJS supports both Express and Fastify adapters. We need to choose an HTTP adapter
for all services in the monorepo. Key requirements:
- High throughput for API endpoints
- Low overhead for health check endpoints
- Support for file uploads (multipart)
- Strong TypeScript support

## Decision
Use Fastify adapter (`@nestjs/platform-fastify`) for all services.

## Alternatives Considered

### Express
- Pros: Larger ecosystem, more middleware, default NestJS adapter
- Cons: ~2x slower benchmarks, larger memory footprint
- Rejected: Performance matters for microservices with many concurrent requests

### Koa
- Pros: Lightweight, modern middleware pattern
- Cons: Not officially supported by NestJS, would need custom adapter
- Rejected: Official NestJS support is a requirement

## Consequences
- All services use `FastifyAdapter` in `main.ts`
- Must register `@fastify/multipart` for file uploads
- Swagger setup uses `app as any` type cast for Fastify compatibility
- Team needs Fastify-specific knowledge (different from Express in some areas)
```

### ADR Lifecycle

```
PROPOSED -> ACCEPTED -> (SUPERSEDED or DEPRECATED)
```

- **Don't delete old ADRs.** They capture historical context.
- When a decision changes, write a new ADR that references and supersedes the old one.

## When to Update Docs

After completing any of these actions, update the related docs:

| Action Completed | Docs to Update |
|------------------|---------------|
| New API endpoint | `docs/services/<service>/README.md` |
| New service created | `docs/services/<service>/README.md` + `docs/architecture/README.md` + ADR |
| New database model/migration | `docs/appendix/README.md` (ER diagram) |
| New business flow | `docs/business/README.md` |
| New shared library | `docs/architecture/README.md` |
| Auth/guard changes | `docs/services/auth/README.md` |
| Deployment/infra change | `docs/architecture/README.md` |
| Breaking API change | All affected service READMEs |
| Architectural decision | `docs/decisions/` (new ADR) |

## Service README Template

Use this template when creating `docs/services/<name>/README.md`:

```markdown
# <Service Name> Service

> Port: `<port>` | Prefix: `<prefix>` | Database: `<db_name>`

## Overview
Brief description of what this service does.

## API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/v1/resource` | JWT | Create resource |
| GET | `/v1/resource` | JWT | List resources |
| GET | `/v1/resource/:id` | JWT | Get by ID |
| PATCH | `/v1/resource/:id` | JWT | Update |
| DELETE | `/v1/resource/:id` | JWT + Admin | Soft delete |

## Endpoints Detail

### POST /v1/resource — Create Resource
**Request:**
` + "```" + `json
{ "name": "example", "is_active": true }
` + "```" + `

**Response (201):**
` + "```" + `json
{ "id": "uuid", "name": "example", "created_at": "..." }
` + "```" + `

## Diagrams

> ![Auth Flow](diagrams/auth-flow.svg)

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| PORT | No | 3001 | Service port |
| SERVICE_PREFIX | Yes | - | URL prefix |
| DATABASE_URL | Yes | - | PostgreSQL connection |
| JWT_SECRET | Yes | - | JWT signing secret |
| JWT_EXPIRES_IN | Yes | - | Token expiration |
```

## Inline Documentation

### When to Comment

Comment the *why*, not the *what*:

```typescript
// BAD: Restates the code
// Increment counter by 1
counter += 1;

// GOOD: Explains non-obvious intent
// Rate limit uses a sliding window — reset counter at window boundary,
// not on a fixed schedule, to prevent burst attacks at window edges
if (now - windowStart > WINDOW_SIZE_MS) {
  counter = 0;
  windowStart = now;
}
```

### Document Known Gotchas

```typescript
/**
 * IMPORTANT: Prisma 7 does NOT support url in the datasource block.
 * The DATABASE_URL is handled by prisma.config.ts instead.
 * See ADR-003 for the full Prisma 7 migration rationale.
 */
```

### When NOT to Comment

```typescript
// Don't comment self-explanatory code
async findAll(user: JwtPayloadDto) {
  return this.prisma.user.findMany({
    where: { organization_id: user.sub, deleted_at: null },
  });
}

// Don't leave TODO comments for things you should just do now
// TODO: add error handling  <- Just add it

// Don't leave commented-out code
// const oldImplementation = () => { ... }  <- Delete it, git has history
```

## API Documentation

### Swagger/Scalar (Already Configured)

This monorepo uses Swagger with Scalar UI. Endpoints are documented via decorators:

```typescript
@ApiTags('Users')
@Controller()
export class UsersController {
  @Post()
  @Version('1')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, description: 'User created' })
  @ApiResponse({ status: 409, description: 'Email already exists' })
  async create(@AuthUser() user: JwtPayloadDto, @Body() dto: CreateUserDto) {
    return this.usersService.create(user, dto);
  }
}
```

Access docs at: `http://localhost:<port>/<service_prefix>/api`

### Documenting DTOs

Every DTO field must have `@ApiProperty` or `@ApiPropertyOptional` with examples:

```typescript
export class CreateUserDto {
  @ApiProperty({ example: 'john_doe', description: 'Username' })
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  username: string;

  @ApiProperty({ example: 'john@example.com', description: 'Email address' })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
```

## Diagram Conventions

Follow the `diagrams.md` rule for all diagram files:

- All diagrams go in `docs/<section>/diagrams/`
- Use kebab-case filenames: `auth-flow.puml`
- Every `.puml` must have a matching `.svg`
- Use the PlantUML skill to generate diagrams
- Embed with relative paths: `![Auth Flow](diagrams/auth-flow.svg)`

## Documentation for Agents

Special consideration for AI agent context in this monorepo:

- **CLAUDE.md** — Project conventions so agents follow them (already exists)
- **Rules files** — `.claude/rules/*.md` for mandatory patterns (already configured)
- **ADRs** — Help agents understand *why* past decisions were made (prevents re-deciding)
- **Service READMEs** — Help agents understand available endpoints without reading code
- **Inline gotchas** — Prevent agents from falling into known traps

## Self-Check Before Marking Task Complete

```
- [ ] New endpoint documented in docs/services/<service>/README.md
- [ ] Request/response examples added
- [ ] Auth requirements listed (Public / JWT / JWT + Role)
- [ ] ADR written if this was an architectural decision
- [ ] Diagram added/updated if flow changed
- [ ] Architecture README updated if new service/library added
- [ ] Appendix ER diagram updated if DB schema changed
- [ ] Swagger decorators present on all new endpoints
- [ ] No commented-out code remains
```

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "The code is self-documenting" | Code shows what. It doesn't show why or what alternatives were rejected. |
| "We'll write docs when the API stabilizes" | APIs stabilize faster when you document them. The doc is the first test of the design. |
| "Nobody reads docs" | Agents do. Future engineers do. Your 3-months-later self does. |
| "ADRs are overhead" | A 10-minute ADR prevents a 2-hour debate about the same decision later. |
| "Comments get outdated" | Comments on *why* are stable. Comments on *what* get outdated — that's why you only write the former. |

## Red Flags

- Architectural decisions with no written rationale in `docs/decisions/`
- API endpoints without Swagger decorators (`@ApiTags`, `@ApiOperation`)
- Service without a `docs/services/<name>/README.md`
- Commented-out code instead of deletion
- TODO comments older than one sprint
- New service without an ADR explaining why it exists
- Diagrams stored outside `docs/` or without matching `.svg`
- Documentation that restates the code instead of explaining intent

## Integration with Other Skills

| Skill | Use Together When |
|-------|-------------------|
| `plantuml` | Generating diagrams for flows and architecture |
| `incremental-implementation` | Documentation updates as the final slice of each increment |
| `test-driven-development` | Tests serve as executable documentation of behavior |
