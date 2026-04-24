# Config Management — NestJS Environment Rules

> Source: NestJS configuration and environment variable patterns

## 🔑 Environment Variables

### ✅ Use a typed ENVIRONMENT constant — never raw strings
```typescript
// common/enum/environment.ts
export const ENVIRONMENT = {
  PORT: 'PORT',
  CORS_ORIGIN: 'CORS_ORIGIN',
  CORS_ORIGIN_REGEX: 'CORS_ORIGIN_REGEX',
  DATABASE_URL: 'DATABASE_URL',
  JWT_SECRET: 'JWT_SECRET',
  JWT_EXPIRES_IN: 'JWT_EXPIRES_IN',
};

// ❌ Bad — magic string
const dbUrl = this.configService.get<string>('DATABASE_URL');

// ✅ Good — typed constant
const dbUrl = this.configService.get<string>(ENVIRONMENT.DATABASE_URL);
```

### ✅ Always provide defaults for non-critical values
```typescript
// ❌ Bad — crashes if missing
const port = this.configService.get<number>('PORT');

// ✅ Good — safe default
const port = this.configService.get<number>(ENVIRONMENT.PORT, 3000);
```

---

## ⚙️ ConfigService Usage

### ✅ Inject ConfigService — never access process.env directly
```typescript
// ❌ Bad
const secret = process.env.JWT_SECRET;

// ✅ Good
@Injectable()
export class AuthService {
  constructor(private readonly configService: ConfigService) {}

  getSecret() {
    return this.configService.get<string>(ENVIRONMENT.JWT_SECRET);
  }
}
```

---

## 📋 Common Imports Reference

### ✅ Use these standard import groups
```typescript
// Controllers
import {
  Controller, Get, Post, Put, Patch, Delete,
  Body, Param, Query, UseGuards, Version, HttpCode,
} from '@nestjs/common';

// Swagger
import {
  ApiTags, ApiOperation, ApiResponse,
  ApiBearerAuth, ApiProperty, ApiPropertyOptional,
} from '@nestjs/swagger';

// Auth
import { JwtAuthGuard } from '@app/auth-utilities';
import { AuthUser, JwtPayloadDto, Roles, RolesGuard } from '@app/auth-utilities';

// Validation
import {
  IsString, IsEmail, IsOptional, IsEnum,
  IsInt, IsBoolean, IsNotEmpty, Length,
} from 'class-validator';

// Logging
import { LogActivity } from '@app/app-logger';

// Database
import { PrismaService } from '../path/to/prisma.service';
```

---

## 🚫 Checklist

- ❌ Never use `process.env` directly in service code
- ❌ Never hardcode environment variable names as strings
- ❌ Never forget defaults for optional config values
- ❌ Never commit `.env` files to version control
- ✅ Always use `ConfigService` via dependency injection
- ✅ Always reference `ENVIRONMENT` constants
- ✅ Always validate required env vars at startup
