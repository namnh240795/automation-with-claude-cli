# Test Coverage Analyzer

A skill for analyzing test coverage in NestJS projects, identifying files without tests, and creating task lists for missing tests.

## Features

- **Find Untested Files**: Scan the codebase to find TypeScript files without corresponding `.spec.ts` files
- **Check Test Coverage**: Analyze which modules, services, controllers, and utilities lack tests
- **Generate Task Lists**: Create organized todo lists for writing missing tests
- **Coverage Report**: Provide summary statistics of test coverage

## Usage

Tell Claude:
> "Analyze test coverage and create task list for missing tests"

or

> "Find all files without unit tests"

or

> "Check which files need unit tests in libs/ and apps/"

## How It Works

### 1. File Discovery

The skill scans the following patterns:
- `apps/**/*.ts` - Application files
- `libs/**/*.ts` - Library files
- Excludes: `.spec.ts`, `.dto.ts`, `.interface.ts`, `.index.ts`, `main.ts`

### 2. Test Mapping

For each source file, checks for:
- `*.service.ts` → `*.service.spec.ts`
- `*.controller.ts` → `*.controller.spec.ts`
- `*.module.ts` → `*.module.spec.ts`
- `*.ts` (utilities) → `*.spec.ts`

### 3. Priority Categories

Files are categorized by priority:

**High Priority** (Core business logic):
- Services (`*.service.ts`)
- Controllers (`*.controller.ts`)
- Utility functions with business logic

**Medium Priority** (Infrastructure):
- Modules (`*.module.spec.ts`)
- Guards, Interceptors, Pipes

**Low Priority** (Typically not tested):
- DTOs (use `*.dto.spec.ts` for validation tests only if complex)
- Interface files
- Index/barrel files
- `main.ts` bootstrap file
- Enum files
- Constant files

### 4. Task List Generation

Creates a structured task list:

```markdown
## Unit Test Tasks

### High Priority
- [ ] Write tests for libs/auth/src/password.service.ts
- [ ] Write tests for libs/users/src/users.controller.ts

### Medium Priority
- [ ] Write tests for libs/auth/src/auth.module.ts
```

## Patterns

### Finding Untested Files

```bash
# Find all TypeScript files in apps/
find apps/ -name "*.ts" ! -name "*.spec.ts" ! -name "*.dto.ts" ! -name "main.ts"

# Find all TypeScript files in libs/
find libs/ -name "*.ts" ! -name "*.spec.ts" ! -name "*.dto.ts"

# Check for missing test files
for file in $(find libs/ -name "*.ts" ! -name "*.spec.ts"); do
  spec="${file%.ts}.spec.ts"
  if [ ! -f "$spec" ]; then
    echo "$file missing test: $spec"
  fi
done
```

### NestJS-Specific Patterns

**Services**: Always need tests
```typescript
// my.service.ts → my.service.spec.ts
describe('MyService', () => {
  let service: MyService;
  // ... test implementation
});
```

**Controllers**: Always need tests
```typescript
// my.controller.ts → my.controller.spec.ts
describe('MyController', () => {
  let controller: MyController;
  // ... test implementation
});
```

**Modules**: Optional but recommended
```typescript
// my.module.ts → my.module.spec.ts
describe('MyModule', () => {
  it('should compile the module', async () => {
    // ... test implementation
  });
});
```

## Examples

### Example 1: Full Project Analysis

**User**: "Analyze test coverage for the entire project"

**Claude**:
1. Scans `apps/` and `libs/` directories
2. Identifies all `.ts` files
3. Checks for corresponding `.spec.ts` files
4. Creates task list grouped by priority
5. Provides coverage statistics

### Example 2: Library-Specific Analysis

**User**: "Check test coverage in libs/auth-utilities"

**Claude**:
1. Scans only `libs/auth-utilities/`
2. Lists files without tests
3. Suggests test patterns based on file types

### Example 3: Service Focus

**User**: "Find all services without unit tests"

**Claude**:
1. Finds all `*.service.ts` files
2. Checks for `*.service.spec.ts` files
3. Creates task list for missing service tests

## Output Format

### Summary Report

```
Test Coverage Analysis for: /path/to/project

Summary:
- Total TypeScript files: 45
- Files with tests: 32 (71.1%)
- Files without tests: 13 (28.9%)

Breakdown by type:
- Services: 8/10 tested (80%)
- Controllers: 5/6 tested (83.3%)
- Modules: 3/8 tested (37.5%)
- Utilities: 16/21 tested (76.2%)

Files without tests (High Priority:
1. libs/auth-utilities/src/password.ts (utility - business logic)
2. libs/caching/src/caching.service.ts (service)
3. apps/api/src/users/users.controller.ts (controller)
...
```

### Task List

```
## Unit Test Tasks

### High Priority (Core Business Logic)
- [ ] Write tests for libs/auth-utilities/src/password.ts
  - Test hashPassword() function
  - Test verifyPassword() function
  - Edge cases: empty passwords, special characters

- [ ] Write tests for libs/caching/src/caching.service.ts
  - Test get() method
  - Test set() method with TTL
  - Test del() method

### Medium Priority (Infrastructure)
- [ ] Write tests for libs/caching/src/caching.module.ts
  - Test module compilation
  - Test service loading
```

## Coverage Goals

- **Services**: 100% coverage required
- **Controllers**: 100% coverage required
- **Modules**: 100% coverage recommended
- **Utilities**: 100% coverage if contains logic
- **DTOs**: Only if complex validation logic

## Special Cases

### Files That Don't Need Tests

- `main.ts` - Bootstrap file (use E2E tests instead)
- `*.interface.ts` - Interface definitions
- `*.index.ts` - Barrel exports
- `*.enum.ts` - Enum definitions
- `*.constants.ts` - Constant definitions
- `*.types.ts` - Type definitions

### Files with Conditional Testing

- `*.dto.ts` - Test only if complex validation
- `*.guard.ts` - Test if custom logic
- `*.pipe.ts` - Test if transformation logic
- `*.interceptor.ts` - Test if custom logic

## Integration with Other Skills

Works best with:
- **nestjs-unit-testing** - For writing the actual tests
- **nestjs-conventions** - For following NestJS patterns
- **prisma-patterns** - For testing Prisma-related code

## Quick Commands

```bash
# Quick check - count files without tests
find libs apps -name "*.ts" ! -name "*.spec.ts" ! -name "*.dto.ts" ! -name "main.ts" | wc -l

# List files without tests
find libs apps -name "*.ts" ! -name "*.spec.ts" ! -name "*.dto.ts" ! -name "main.ts"

# Check specific library
find libs/auth-utilities -name "*.ts" ! -name "*.spec.ts"

# Find services without tests
find libs apps -name "*.service.ts" | while read f; do [ ! -f "${f%.ts}.spec.ts" ] && echo "$f"; done
```

## Best Practices

1. **Run analysis regularly** - After adding new features
2. **Review priority list** - Focus on high-priority items first
3. **Use task lists** - Track progress with TodoWrite
4. **Aim for 100% coverage** - On business logic files
5. **Update task list** - Mark items as completed

## Notes

- The skill uses file patterns to determine test requirements
- Certain file types are excluded by default (DTOs, interfaces, etc.)
- Priority is based on business logic importance
- Task lists are organized for efficient workflow
