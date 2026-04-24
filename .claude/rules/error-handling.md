# Error Handling — NestJS Exception Rules

> Source: NestJS error handling patterns for this monorepo

## 🚨 Use Standard NestJS Exceptions

### ✅ Always use the correct HTTP exception type

| Scenario | Exception | Status |
|----------|-----------|--------|
| Resource not found | `NotFoundException` | 404 |
| Invalid input / validation | `BadRequestException` | 400 |
| Auth failure (wrong creds) | `UnauthorizedException` | 401 |
| Insufficient permissions | `ForbiddenException` | 403 |
| Duplicate resource | `ConflictException` | 409 |
| Server error | `InternalServerErrorException` | 500 |

---

## 📋 Exception Patterns

### ✅ NotFoundException — when a resource doesn't exist
```typescript
// ❌ Bad — generic error
throw new Error('User not found');

// ✅ Good
throw new NotFoundException('User not found');
```

### ✅ BadRequestException — invalid input or business rule violation
```typescript
// ❌ Bad
throw new Error('Invalid email format');

// ✅ Good
throw new BadRequestException('Invalid email format');
```

### ✅ UnauthorizedException vs ForbiddenException
```typescript
// ❌ Bad — wrong exception type
throw new ForbiddenException('Invalid credentials');

// ✅ Good — wrong credentials = Unauthorized (401)
throw new UnauthorizedException('Invalid credentials');

// ✅ Good — lacks permission = Forbidden (403)
throw new ForbiddenException('Admin access required');
```

### ✅ ConflictException — duplicate or state conflict
```typescript
// ❌ Bad
throw new BadRequestException('Email already exists');

// ✅ Good
throw new ConflictException('Email already exists');
```

---

## 🧱 Import Pattern

### ✅ Import all exceptions from @nestjs/common
```typescript
import {
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
```

---

## 🚫 Checklist

- ❌ Never throw raw `Error()` in service code
- ❌ Never use `ForbiddenException` for wrong credentials (use `UnauthorizedException`)
- ❌ Never use `BadRequestException` for duplicates (use `ConflictException`)
- ❌ Never expose stack traces or internal details in error messages
- ✅ Always use descriptive, user-friendly error messages
- ✅ Always use the most specific exception type available
