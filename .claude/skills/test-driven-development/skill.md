---
name: test-driven-development
description: Drives development with tests. Use when implementing any logic, fixing any bug, or changing any behavior. Use when you need to prove that code works, when a bug report arrives, or when you're about to modify existing functionality.
---

# Test-Driven Development

Drives NestJS monorepo development with failing tests first. Tests are proof — "seems right" is not done. This skill defines the TDD workflow; for test templates and patterns, see the `nestjs-unit-testing` skill.

## When to Use

- Implementing any new logic or behavior in `apps/` or `libs/`
- Fixing any bug (the Prove-It Pattern)
- Modifying existing service, controller, guard, or utility functionality
- Adding edge case handling
- Any change that could break existing behavior

**When NOT to use:** Pure configuration changes, Prisma schema-only changes, documentation updates, or static content changes with no behavioral impact.

## The TDD Cycle

```
    RED                GREEN              REFACTOR
 Write a test    Write minimal code    Clean up the
 that fails  --->  to make it pass  --->  implementation  --->  (repeat)
      |                  |                    |
      v                  v                    v
   Test FAILS        Test PASSES         Tests still PASS
```

### Step 1: RED — Write a Failing Test

Write the test first. It must fail. A test that passes immediately proves nothing.

Use templates from the `nestjs-unit-testing` skill for service, controller, DTO, and utility tests.

```typescript
// RED: This test fails because createTask doesn't exist yet
// File: apps/auth/src/tasks/tasks.service.spec.ts
describe('TaskService', () => {
  it('creates a task with title and default status', async () => {
    const task = await taskService.createTask(
      { sub: 'user-1', email: 'test@example.com' } as JwtPayloadDto,
      { title: 'Buy groceries' },
    );

    expect(task.id).toBeDefined();
    expect(task.title).toBe('Buy groceries');
    expect(task.status).toBe('pending');
    expect(task.created_at).toBeInstanceOf(Date);
  });
});
```

Run to confirm it fails:

```bash
pnpm test -- tasks.service.spec
```

### Step 2: GREEN — Make It Pass

Write the minimum code to make the test pass. Don't over-engineer.

```typescript
// GREEN: Minimal implementation
// File: apps/auth/src/tasks/tasks.service.ts
@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  @LogActivity()
  async createTask(user: JwtPayloadDto, dto: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        title: dto.title,
        status: 'pending',
        created_by: user.sub,
        updated_by: user.sub,
      },
      select: { id: true, title: true, status: true, created_at: true },
    });
  }
}
```

Run tests to confirm green:

```bash
pnpm test -- tasks.service.spec
```

### Step 3: REFACTOR — Clean Up

With tests green, improve the code without changing behavior:

- Extract shared logic into `libs/` packages
- Improve naming (snake_case DTOs, camelCase variables)
- Remove duplication
- Optimize Prisma queries (add `select`, filter `deleted_at`)

Run tests after every refactor step:

```bash
pnpm test -- tasks.service.spec
```

## The Prove-It Pattern (Bug Fixes)

When a bug is reported, **do not start by trying to fix it.** Start by writing a test that reproduces it.

```
Bug report arrives
       |
       v
  Write a test that demonstrates the bug
       |
       v
  Test FAILS (confirming the bug exists)
       |
       v
  Run gitnexus_impact on affected symbols
       |
       v
  Implement the fix
       |
       v
  Test PASSES (proving the fix works)
       |
       v
  Run full test suite (pnpm test) -- no regressions
```

**Example:**

```typescript
// Bug: "Completing a task doesn't update the completedAt timestamp"

// Step 1: Write the reproduction test (it should FAIL)
it('sets completed_at when task is completed', async () => {
  const task = await taskService.createTask(mockUser, { title: 'Test' });
  const completed = await taskService.completeTask(mockUser, task.id);

  expect(completed.status).toBe('completed');
  expect(completed.completed_at).toBeInstanceOf(Date);  // This fails -> bug confirmed
});

// Step 2: Fix the bug
async completeTask(user: JwtPayloadDto, taskId: string) {
  return this.prisma.task.update({
    where: { id: taskId, deleted_at: null },
    data: {
      status: 'completed',
      completed_at: new Date(),  // This was missing
      updated_by: user.sub,
    },
  });
}

// Step 3: Test passes -> bug fixed, regression guarded
```

## The Test Pyramid

```
          /\
         /  \         E2E Tests (~5%)
        /    \        Full user flows via HTTP
       /------\
      /        \      Integration Tests (~15%)
     /          \     Module compilation, API boundaries
    /------------\
   /              \   Unit Tests (~80%)
  /                \  Service/controller logic, pure functions, DTO validation
 /------------------\
```

### Where Tests Go in This Monorepo

| Layer | Location | What to Test |
|-------|----------|-------------|
| Unit | `apps/*/src/**/*.spec.ts` | Service methods, controller handlers, utility functions |
| Unit | `libs/*/src/**/*.spec.ts` | Shared library functions, auth utilities, logger |
| Integration | `apps/*/test/**/*.spec.ts` | Module compilation, end-to-end HTTP flows |
| DTO Validation | `apps/*/src/**/dto/*.spec.ts` | class-validator rules using `validate()` + `plainToInstance()` |

### Test Sizes

| Size | Constraints | Speed | Example |
|------|------------|-------|---------|
| **Small** | Single process, no I/O, mocked Prisma | Milliseconds | Service method with mocked PrismaService |
| **Medium** | TestingModule compilation, no real DB | Seconds | Module test with `.compile()`, controller with guards |
| **Large** | Real HTTP, test database | Minutes | E2E tests with testcontainers |

Small tests should make up the vast majority.

## Writing Good Tests

### Test State, Not Interactions

Assert on the *outcome*, not on which Prisma methods were called internally.

```typescript
// Good: Tests what the function returns
it('returns tasks sorted by creation date, newest first', async () => {
  const tasks = await service.findAll(mockUser, { sort_order: 'desc' });
  expect(tasks[0].created_at.getTime()).toBeGreaterThan(tasks[1].created_at.getTime());
});

// Bad: Tests internal implementation details
it('calls prisma with ORDER BY created_at DESC', async () => {
  await service.findAll(mockUser, { sort_order: 'desc' });
  expect(prisma.task.findMany).toHaveBeenCalledWith(
    expect.objectContaining({ orderBy: { created_at: 'desc' } })
  );
});
```

### DAMP Over DRY in Tests

Each test should read like a specification — self-contained and complete.

```typescript
// DAMP: Each test is readable on its own
it('rejects empty titles', () => {
  const input = { title: '', assignee: 'user-1' };
  expect(() => createTask(input)).toThrow('Title is required');
});

it('trims whitespace from titles', () => {
  const input = { title: '  Buy groceries  ', assignee: 'user-1' };
  const task = createTask(input);
  expect(task.title).toBe('Buy groceries');
});
```

### One Assertion Per Concept

```typescript
// Good: Each test verifies one behavior
it('rejects empty titles', () => { /* ... */ });
it('trims whitespace from titles', () => { /* ... */ });
it('enforces maximum title length', () => { /* ... */ });

// Bad: Everything in one test
it('validates titles correctly', () => {
  expect(() => createTask({ title: '' })).toThrow();
  expect(createTask({ title: '  hello  ' }).title).toBe('hello');
  expect(() => createTask({ title: 'a'.repeat(256) })).toThrow();
});
```

### Name Tests Descriptively

```typescript
// Good: Reads like a specification
describe('TaskService.completeTask', () => {
  it('sets status to completed and records completed_at', () => { /* ... */ });
  it('throws NotFoundException for non-existent task', () => { /* ... */ });
  it('is idempotent — completing an already-completed task is a no-op', () => { /* ... */ });
});

// Bad: Vague names
describe('TaskService', () => {
  it('works', () => { /* ... */ });
  it('handles errors', () => { /* ... */ });
});
```

## NestJS-Specific TDD Patterns

### Before Writing Any Test

1. Check if the file already has tests: `find apps/auth/src -name "*.spec.ts"`
2. Use the `nestjs-unit-testing` skill for templates
3. Mock `PrismaService` with the correct model name from `schema.prisma`
4. For guarded endpoints, use `.overrideGuard(JwtAuthGuard).useValue({ canActivate: () => true })`

### Service TDD Flow

```
1. Write test with mocked PrismaService
2. Run: pnpm test -- feature.service.spec  (RED)
3. Implement service method
4. Run: pnpm test -- feature.service.spec  (GREEN)
5. Add edge cases: NotFoundException, ConflictException (P2002)
6. Run: pnpm test -- feature.service.spec  (still GREEN)
```

### Controller TDD Flow

```
1. Write test with mocked service
2. Override guards if needed
3. Run: pnpm test -- feature.controller.spec  (RED)
4. Implement controller method (thin — delegates to service)
5. Run: pnpm test -- feature.controller.spec  (GREEN)
```

### DTO Validation TDD Flow

```
1. Write test using validate() + plainToInstance()
2. Run: pnpm test -- feature.dto.spec  (RED)
3. Add class-validator decorators to DTO
4. Run: pnpm test -- feature.dto.spec  (GREEN)
```

## Running Tests

```bash
# Run all tests across monorepo
pnpm test

# Run specific test file
pnpm test -- feature.service.spec

# Run tests for a specific service
cd apps/auth && pnpm test

# Watch mode during development
pnpm test:watch -- feature.service.spec

# Coverage report
pnpm test:cov

# Run tests matching a pattern
pnpm test -- --testNamePattern="should create"
```

## Test Anti-Patterns to Avoid

| Anti-Pattern | Problem | Fix |
|---|---|---|
| Testing implementation details | Breaks on refactor even if behavior unchanged | Test inputs/outputs, not internal calls |
| Not mocking PrismaService | Tests hit real DB, slow and flaky | Always mock PrismaService with `jest.fn()` |
| Testing framework behavior | Wastes time testing NestJS internals | Only test YOUR code |
| No test isolation | Tests pass individually but fail together | Each test sets up its own state in `beforeEach` |
| Mocking everything | Tests pass but production breaks | Mock only boundaries: PrismaService, external clients |
| Skipping tests to make suite pass | Hides real failures | Never skip — fix the test or fix the code |
| Not filtering `deleted_at` in test assertions | Tests pass but production has soft-delete bugs | Always include `deleted_at: null` in Prisma mock expectations |

## Verification Checklist

After completing any implementation:

- [ ] Every new behavior has a corresponding test
- [ ] All tests pass: `pnpm test`
- [ ] Bug fixes include a reproduction test that failed before the fix
- [ ] Test names describe the behavior being verified
- [ ] No tests were skipped or disabled
- [ ] Coverage hasn't decreased: `pnpm test:cov`
- [ ] Services and controllers follow patterns from `nestjs-unit-testing` skill
- [ ] GitNexus `gitnexus_detect_changes()` confirms expected scope

## Integration with Other Skills

| Skill | Use Together When |
|-------|-------------------|
| `nestjs-unit-testing` | Writing the actual test code (templates, mocking patterns) |
| `test-coverage-analyzer` | Finding files without tests, gap analysis |
| `incremental-implementation` | Breaking a feature into testable slices |
| `documentation-and-adrs` | Recording testing decisions as ADRs |

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "I'll write tests after the code works" | You won't. Tests written after test implementation, not behavior. |
| "This is too simple to test" | Simple code gets complicated. The test documents expected behavior. |
| "Tests slow me down" | They slow you down now. They speed you up every time you change the code later. |
| "I tested it manually" | Manual testing doesn't persist. Tomorrow's change breaks it silently. |
| "The code is self-explanatory" | Tests ARE the specification. They document what should happen, not what happens. |
