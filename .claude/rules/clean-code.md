# Clean Code — Variables, Functions, and SOLID Principles

> Source: Code quality standards for this monorepo

## Variables

- Use descriptive names: `foundUser` not `u`, `isActive` not `flag`
- camelCase for TypeScript variables and functions
- snake_case for DTO properties and database columns
- Boolean variables: `is_`, `has_`, `can_` prefix (is_active, has_permission)
- Avoid abbreviations: `password` not `pwd`, `configuration` not `cfg`

## Functions

- Single responsibility — one function does one thing
- Max 20 lines per function; extract if longer
- Max 3 parameters — use an options object beyond that
- Return early for guard clauses:
```typescript
async findOne(id: string): Promise<User> {
  const user = await this.prisma.user.findUnique({
    where: { id, deleted_at: null },
    select: { id: true, email: true },
  });
  if (!user) throw new NotFoundException('User not found');
  return user;
}
```

## Async/Await

- Always use `async/await` — never raw `.then()` / `.catch()` chains
- Always handle errors with try/catch or let them propagate to NestJS exception filter
- Use `Promise.all` for independent parallel operations

## SOLID Principles

| Principle | Rule |
|-----------|------|
| **S** — Single Responsibility | Controllers handle HTTP, services handle business logic, repositories handle data |
| **O** — Open/Closed | Use strategy pattern for varying behavior; don't modify existing code for new cases |
| **L** — Liskov Substitution | Subtypes must be substitutable — PrismaService extends PrismaClient correctly |
| **I** — Interface Segregation | Small focused DTOs rather than one giant DTO with optional fields |
| **D** — Dependency Inversion | Inject services via constructor (`private readonly service: ServiceName`) |

## DRY (Don't Repeat Yourself)

- Extract shared logic into `libs/` packages
- Use barrel exports (`index.ts`) for clean imports
- Don't over-abstract — three similar lines of code is fine; wait for the third use case before extracting

## Imports Order

```typescript
// 1. NestJS core
import { Injectable, NotFoundException } from '@nestjs/common';
// 2. Third-party
import { ConfigService } from '@nestjs/config';
// 3. Internal shared libraries
import { JwtPayloadDto } from '@app/auth-utilities';
import { LogActivity } from '@app/app-logger';
// 4. Local imports
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto';
```
