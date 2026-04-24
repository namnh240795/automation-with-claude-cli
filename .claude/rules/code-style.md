# Code Style — Formatting and Naming Conventions

> Source: Formatting and naming standards for this monorepo

## Formatting

- **Indentation:** 2 spaces (no tabs)
- **Quotes:** Single quotes for strings
- **Semicolons:** Required
- **Trailing commas:** Required (ES5 compatible)
- **Max line length:** 120 characters
- **Braces:** Same line (`if (x) {`)

Run `pnpm format` to auto-fix with Prettier.

## Naming Conventions

| Element | Convention | Example |
|---------|-----------|---------|
| Files | kebab-case | `user-profile.service.ts` |
| Classes | PascalCase | `UserAuthService` |
| Interfaces | PascalCase (no `I` prefix) | `UserRepository` |
| TypeScript variables | camelCase | `foundUser`, `isActive` |
| Constants | UPPER_SNAKE_CASE | `MAX_RETRY_ATTEMPTS` |
| DTO properties | snake_case | `first_name`, `is_active` |
| Database columns | snake_case | `created_at`, `password_hash` |
| Database tables | snake_case, singular | `user` (not `users`) |
| Environment variables | UPPER_SNAKE_CASE | `DATABASE_URL`, `JWT_SECRET` |
| Path aliases | @scope/name | `@app/auth-utilities` |
| Prisma models | lowercase | `model user { ... }` |
| Enums | PascalCase | `enum UserRole { ADMIN }` |

## File Naming

| File Type | Pattern | Example |
|-----------|---------|---------|
| Service | `*.service.ts` | `auth.service.ts` |
| Controller | `*.controller.ts` | `auth.controller.ts` |
| Module | `*.module.ts` | `auth.module.ts` |
| DTO | `*.dto.ts` | `create-user.dto.ts` |
| Guard | `*.guard.ts` | `jwt-auth.guard.ts` |
| Strategy | `*.strategy.ts` | `jwt.strategy.ts` |
| Interceptor | `*.interceptor.ts` | `logging.interceptor.ts` |
| Pipe | `*.pipe.ts` | `validation.pipe.ts` |
| Test | `*.spec.ts` | `auth.service.spec.ts` |
| E2E test | `*.e2e-spec.ts` | `auth.e2e-spec.ts` |

## Linting

Run `pnpm lint` to auto-fix with ESLint.

- No unused variables
- No console.log in production code (use `@app/app-logger` instead)
- No `any` type without explicit cast and comment explaining why
- No non-null assertions (`!.`) — use proper null checks
