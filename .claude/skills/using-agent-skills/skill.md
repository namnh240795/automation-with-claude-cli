---
name: using-agent-skills
description: Discovers and invokes agent skills. Use when starting a session or when you need to discover which skill applies to the current task. This is the meta-skill that governs how all other skills are discovered and invoked.
---

# Using Agent Skills

Agent Skills is a collection of engineering workflow skills organized by development phase. Each skill encodes a specific process that senior engineers follow. This meta-skill helps you discover and apply the right skill for your current task.

## Skill Discovery

When a task arrives, identify the development phase and apply the corresponding skill:

```
Task arrives
    │
    ├── Vague idea/need refinement? ──→ spec-driven-development
    ├── New project/feature/change? ──→ spec-driven-development
    ├── Have a spec, need tasks? ──────→ planning-and-task-breakdown
    ├── Implementing code? ────────────→ incremental-implementation
    │   ├── NestJS backend work? ────→ source-driven-development
    │   ├── Need better context? ────→ gitnexus-exploring
    │   ├── Rspack/HMR issues? ──────→ rspack-nestjs
    │   └── Need doc-verified code? ─→ source-driven-development
    ├── Writing/running tests? ────────→ test-driven-development
    │   ├── NestJS unit tests? ──────→ nestjs-unit-testing
    │   └── Coverage gaps? ──────────→ test-coverage-analyzer
    ├── Something broke? ──────────────→ gitnexus-debugging
    ├── Need impact analysis? ────────→ gitnexus-impact-analysis
    ├── Refactoring code? ─────────────→ gitnexus-refactoring
    ├── Reviewing a PR? ──────────────→ gitnexus-pr-review
    ├── Exploring codebase? ──────────→ gitnexus-exploring
    ├── Need diagrams? ───────────────→ plantuml
    ├── Committing/branching? ────────→ git-workflow (rule: git-workflow.md)
    ├── Writing docs/ADRs? ──────────→ documentation-and-adrs
    ├── GitHub issues? ───────────────→ github-issues
    ├── Simplifying code? ────────────→ simplify
    └── Recurring task? ──────────────→ loop
```

## Core Operating Behaviors

These behaviors apply at all times, across all skills. They are non-negotiable.

### 1. Surface Assumptions

Before implementing anything non-trivial, explicitly state your assumptions:

```
ASSUMPTIONS I'M MAKING:
1. This change lives in apps/auth (not a new service)
2. JWT payload structure stays the same (no schema migration)
3. The existing Prisma model covers the data we need
4. No new shared library needed (using @app/auth-utilities)
→ Correct me now or I'll proceed with these.
```

Don't silently fill in ambiguous requirements. The most common failure mode is making wrong assumptions and running with them unchecked. Surface uncertainty early — it's cheaper than rework.

### 2. Manage Confusion Actively

When you encounter inconsistencies, conflicting requirements, or unclear specifications:

1. **STOP.** Do not proceed with a guess.
2. Name the specific confusion.
3. Present the tradeoff or ask the clarifying question.
4. Wait for resolution before continuing.

**Bad:** Silently picking one interpretation and hoping it's right.
**Good:** "I see `@IsNotEmpty()` in the existing DTO but `.claude/rules/dto-validation.md` says optional fields should use `@IsOptional()` + `@ApiPropertyOptional()`. Which takes precedence?"

### 3. Push Back When Warranted

You are not a yes-machine. When an approach has clear problems:

- Point out the issue directly
- Explain the concrete downside (quantify when possible)
- Propose an alternative
- Accept the human's decision if they override with full information

Examples worth pushing back on:
- "Adding this query without `deleted_at: null` will return soft-deleted records"
- "Using Express adapter contradicts the project rule — Fastify is required"
- "This Prisma query returns `password_hash` — we need a `select` clause"
- "Putting `url` in the datasource block will break Prisma 7"

Sycophancy is a failure mode. "Of course!" followed by implementing a bad idea helps no one. Honest technical disagreement is more valuable than false agreement.

### 4. Enforce Simplicity

Your natural tendency is to overcomplicate. Actively resist it.

Before finishing any implementation, ask:
- Can this be done in fewer lines?
- Are these abstractions earning their complexity?
- Would a staff engineer look at this and say "why didn't you just..."?
- Am I adding a shared library when a local utility would do?
- Am I creating a generic solution when a specific one is needed?

If you build 1000 lines and 100 would suffice, you have failed. Prefer the boring, obvious solution. Cleverness is expensive.

### 5. Maintain Scope Discipline

Touch only what you're asked to touch.

Do NOT:
- Remove comments you don't understand
- "Clean up" code orthogonal to the task
- Refactor adjacent systems as a side effect
- Delete code that seems unused without explicit approval
- Add features not in the spec because they "seem useful"
- Update unrelated Swagger decorators "while you're here"
- Add indexes to Prisma models that weren't requested

Your job is surgical precision, not unsolicited renovation.

### 6. Verify, Don't Assume

Every skill includes a verification step. A task is not complete until verification passes. "Seems right" is never sufficient — there must be evidence (passing tests, build output, runtime data).

**Verification checklist per task:**
- [ ] `pnpm test` passes (or `cd apps/[service] && pnpm test`)
- [ ] `pnpm rspack:[service]` builds without errors
- [ ] `gitnexus_detect_changes` confirms expected scope
- [ ] No HIGH/CRITICAL impact warnings ignored
- [ ] Documentation updated per documentation-updates rule

### 7. Respect Project Rules

All rules in `.claude/rules/` are mandatory. They encode verified patterns that prevent common mistakes in this specific monorepo. Key rules to always follow:

| Rule | Critical Pattern |
|------|-----------------|
| `prisma-patterns.md` | Soft deletes, `select` usage, P2002 handling |
| `prisma-integration.md` | No url in schema, `defineConfig` from `'prisma/config'` |
| `auth-guard-patterns.md` | Guard ordering: Auth → Role, `@AuthUser()` not `req.user` |
| `dto-validation.md` | snake_case properties, `@Type(() => Number)` |
| `api-conventions.md` | Fastify adapter, `@Version('1')`, Swagger decorators |
| `module-structure.md` | Thin controllers, `@LogActivity()`, audit fields |
| `multi-service-routing.md` | No duplicate SERVICE_PREFIX in `@Controller()` |
| `rspack-dev.md` | Use Rspack not nest build, sync aliases, externalize native modules |
| `error-handling.md` | Standard NestJS exceptions, never raw `Error()` |
| `config-management.md` | `ConfigService` not `process.env`, typed constants |
| `swagger-scalars.md` | `isArray: true` not `type: []`, `enumName` for enums |
| `security.md` | Never violate security rules |

## Failure Modes to Avoid

These are the subtle errors that look like productivity but create problems:

1. Making wrong assumptions without checking
2. Not managing your own confusion — plowing ahead when lost
3. Not surfacing inconsistencies you notice
4. Not presenting tradeoffs on non-obvious decisions
5. Being sycophantic ("Of course!") to approaches with clear problems
6. Overcomplicating code and APIs
7. Modifying code or comments orthogonal to the task
8. Removing things you don't fully understand
9. Building without a spec because "it's obvious"
10. Skipping verification because "it looks right"
11. Editing a symbol without running `gitnexus_impact` first
12. Ignoring HIGH/CRITICAL risk warnings from impact analysis
13. Using find-and-replace for renames instead of `gitnexus_rename`
14. Committing without running `gitnexus_detect_changes`

## Skill Rules

1. **Check for an applicable skill before starting work.** Skills encode processes that prevent common mistakes.

2. **Skills are workflows, not suggestions.** Follow the steps in order. Don't skip verification steps.

3. **Multiple skills can apply.** A feature implementation might involve `spec-driven-development` → `planning-and-task-breakdown` → `source-driven-development` → `incremental-implementation` → `nestjs-unit-testing` → `documentation-and-adrs` in sequence.

4. **When in doubt, start with a spec.** If the task is non-trivial and there's no spec, begin with `spec-driven-development`.

5. **Always run impact analysis before editing.** Use `gitnexus_impact` on any symbol you're about to modify. Report the blast radius to the user.

6. **Always verify changes before committing.** Use `gitnexus_detect_changes` to confirm only expected symbols were affected.

## Lifecycle Sequence

For a complete feature, the typical skill sequence is:

```
1. spec-driven-development      → Define what we're building
2. planning-and-task-breakdown  → Break into verifiable chunks
3. source-driven-development    → Verify patterns against docs + rules
4. gitnexus-impact-analysis     → Assess blast radius before editing
5. incremental-implementation   → Build slice by slice
6. test-driven-development      → Prove each slice works
7. nestjs-unit-testing          → Write NestJS-specific test patterns
8. gitnexus-pr-review          → Review before merge (or /review)
9. documentation-and-adrs       → Document decisions, update docs
10. simplify                    → Review for unnecessary complexity
```

Not every task needs every skill. A bug fix might only need: `gitnexus-debugging` → `test-driven-development` → `gitnexus-impact-analysis`.

## Quick Reference

### Available Skills by Phase

| Phase | Skill | One-Line Summary |
|-------|-------|-----------------|
| Define | spec-driven-development | Requirements and acceptance criteria before code |
| Plan | planning-and-task-breakdown | Decompose into small, verifiable tasks |
| Build | incremental-implementation | Thin vertical slices, test each before expanding |
| Build | source-driven-development | Verify against official docs + project rules |
| Build | rspack-nestjs | Rspack bundler setup and HMR for NestJS |
| Explore | gitnexus-exploring | Understand code, trace flows, navigate architecture |
| Verify | test-driven-development | Failing test first, then make it pass |
| Verify | nestjs-unit-testing | NestJS testing patterns with Jest |
| Verify | test-coverage-analyzer | Find untested files, coverage gaps |
| Debug | gitnexus-debugging | Reproduce → localize → fix → guard |
| Analyze | gitnexus-impact-analysis | Blast radius before editing |
| Refactor | gitnexus-refactoring | Safe multi-file renames and restructuring |
| Review | gitnexus-pr-review | PR review with risk assessment |
| Docs | documentation-and-adrs | Document the why, not just the what |
| Docs | plantuml | Generate architecture and flow diagrams |
| Ops | github-issues | GitHub issue management |
| Quality | simplify | Review for unnecessary complexity |
| Ops | loop | Run commands on recurring intervals |
| Config | update-config | Configure Claude Code settings |
| API | claude-api | Build apps with Claude/Anthropic SDK |

### GitNexus Tools Quick Reference

| Tool | When to use |
|------|-------------|
| `gitnexus_query` | Find code by concept ("auth validation") |
| `gitnexus_context` | 360-degree view of one symbol |
| `gitnexus_impact` | Blast radius before editing (REQUIRED before modifications) |
| `gitnexus_detect_changes` | Pre-commit scope check (REQUIRED before commits) |
| `gitnexus_rename` | Safe multi-file rename |
| `gitnexus_cypher` | Custom graph queries |

### Project Workflow Commands

| Phase | Command | Purpose |
|-------|---------|---------|
| Define | `/spec` | Create PRD with objectives, scope, boundaries |
| Plan | `/plan` | Decompose into vertical slices |
| Build | `/build` | Implement incrementally (TDD) |
| Verify | `/test` | Write and verify tests |
| Review | `/review` | Five-axis code review |
| Ship | `/deploy` | Build, test, deploy with staged rollout |
| Debug | `/debug` | Systematic error diagnosis |
| Fix | `/fix-issue` | Analyze and fix reported issues |
| Simplify | `/simplify` | Reduce complexity without changing behavior |
