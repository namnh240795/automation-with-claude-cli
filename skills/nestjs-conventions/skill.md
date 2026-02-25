# NestJS Conventions

A skill for developing NestJS applications with enterprise-grade patterns and conventions.

## Project Structure

```
apps/backend/src/
├── [feature]/              # Feature modules (e.g., auth, users, products)
│   ├── [feature].controller.ts
│   ├── [feature].service.ts
│   ├── [feature].module.ts
│   └── dto/               # Feature-specific DTOs
├── common/                # Shared utilities
│   ├── guard/            # Custom guards
│   ├── middleware/       # Custom middleware
│   ├── pipes/            # Custom pipes
│   ├── validator/        # Custom validators
│   ├── enum/             # Shared enums
│   └── dto/              # Shared DTOs
└── prisma.service.ts     # Prisma service (if using Prisma)

libs/
├── auth-utilities/       # Auth decorators, guards, utilities
├── app-logger/          # Logging decorators and services
├── caching/             # Cache manager integration
├── health/              # Health check utilities
└── [other-libs]         # Additional shared libraries
```

## Naming Conventions

This project follows these naming conventions:

### DTO Properties
- **Use `snake_case`** for all DTO properties (API response/request)
- Matches database field naming for consistency
- Examples: `first_name`, `access_token`, `is_active`, `created_at`

```typescript
// Request DTO
export class SignUpDto {
  email: string;
  password: string;
  first_name?: string;   // snake_case
  last_name?: string;    // snake_case
}

// Response DTO
export class UserResponseDto {
  id: string;
  email: string;
  first_name?: string;     // snake_case
  last_name?: string;      // snake_case
  is_active: boolean;      // snake_case
  email_verified: boolean; // snake_case
  created_at: Date;        // snake_case
  updated_at: Date;        // snake_case
}
```

### TypeScript Variables
- **Use `camelCase`** for all variables and parameters (standard JS convention)
- Examples: `passwordHash`, `existingUser`, `storedToken`

```typescript
async signUp(signUpDto: SignUpDto): Promise<UserResponseDto> {
  const passwordHash = await bcrypt.hash(password, 10); // camelCase
  const existingUser = await this.prisma.user.findUnique({ where: { email } }); // camelCase

  return user; // DTO has snake_case properties
}
```

### Database Fields (Prisma)
- **Use `snake_case`** for all database fields
- **Use singular table names** (set explicitly with `@@map()`)

See **prisma-patterns** skill for database naming conventions.

## Core Patterns

### 1. Fastify Adapter Setup
```typescript
import { FastifyAdapter } from '@nestjs/platform-fastify';

const fastifyAdapter = new FastifyAdapter();
await fastifyAdapter.register(require('@fastify/multipart'), {
  attachFieldsToBody: false,
  limits: {
    fileSize: 20 * 1024 * 1024,  // 20MB
    files: 1,
    fieldSize: 1024             // 1KB
  }
});
```

### 2. Global Validation Pipe
Enable transform for DTO auto-parsing:
```typescript
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

app.useGlobalPipes(new ValidationPipe({ transform: true }));
useContainer(app.select(AppModule), { fallbackOnErrors: true });
```

### 3. API Versioning
Always use URI versioning:
```typescript
import { VersioningType } from '@nestjs/common';

app.enableVersioning({
  type: VersioningType.URI,
});

// In controllers
@Version('1')
```

### 4. Swagger Documentation
```typescript
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('FeatureName')
@Controller('feature-route')
export class FeatureController {
  @Post()
  @Version('1')
  @ApiOperation({ summary: 'Create feature' })
  @ApiResponse({ status: 201, description: 'Created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  async create(@Body() dto: CreateDto) { }
}
```

### 5. Path Aliases
Use path aliases for libs:
```typescript
// In tsconfig.json
"paths": {
  "@app/auth-utilities": ["libs/auth-utilities/src"],
  "@app/app-logger": ["libs/app-logger/src"],
  "@app/caching": ["libs/caching/src"]
}

// In code
import { AuthUser, JwtPayloadDto } from '@app/auth-utilities';
import { LogActivity } from '@app/app-logger';
```

### 6. CORS Configuration
Support both exact origins and regex patterns:
```typescript
const allowedOrigins = configService.get<string>('CORS_ORIGIN').split(',');
const regexPatterns = configService.get<string>('CORS_ORIGIN_REGEX')
  ?.split(',')
  .map(pattern => new RegExp(pattern.trim()))
  .filter(Boolean);

const corsValidator = (origin, callback) => {
  if (!origin) return callback(null, true);
  if (allowedOrigins.includes(origin)) return callback(null, true);
  if (regexPatterns.some(pattern => pattern.test(origin))) return callback(null, true);
  callback(new Error('Not allowed by CORS'));
};

app.enableCors({ origin: corsValidator });
```

## Module Structure

### Creating a New Module

1. **Feature Folder Structure**
```typescript
feature/
├── feature.controller.ts
├── feature.service.ts
├── feature.module.ts
└── dto/
    ├── create-feature.dto.ts
    ├── update-feature.dto.ts
    ├── feature-response.dto.ts
    └── index.ts
```

2. **Controller Pattern**
```typescript
import { Controller, Get, Post, Body, UseGuards, Version } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser, JwtPayloadDto } from '@app/auth-utilities';

@ApiTags('Feature')
@Controller('feature')
export class FeatureController {
  constructor(private readonly featureService: FeatureService) {}

  @Get()
  @Version('1')
  @ApiOperation({ summary: 'Get all items' })
  @UseGuards(AuthGuard('jwt-token'))
  @ApiBearerAuth()
  async findAll(@AuthUser() user: JwtPayloadDto) {
    return this.featureService.findAll(user);
  }

  @Post()
  @Version('1')
  @ApiOperation({ summary: 'Create item' })
  @UseGuards(AuthGuard('jwt-token'))
  @ApiBearerAuth()
  async create(@AuthUser() user: JwtPayloadDto, @Body() dto: CreateDto) {
    return this.featureService.create(user, dto);
  }
}
```

3. **Service Pattern**
```typescript
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { LogActivity } from '@app/app-logger';
import { JwtPayloadDto } from '@app/auth-utilities';

@Injectable()
export class FeatureService {
  constructor(private readonly prisma: PrismaService) {}

  @LogActivity()
  async findAll(user: JwtPayloadDto) {
    return this.prisma.feature.findMany({
      where: {
        organization_id: user.organization_id,
        deleted_at: null
      }
    });
  }

  @LogActivity()
  async create(user: JwtPayloadDto, dto: CreateDto) {
    return this.prisma.feature.create({
      data: {
        ...dto,
        created_by: user.user_id,
        updated_by: user.user_id
      }
    });
  }
}
```

## Error Handling

Use standard NestJS exceptions:
```typescript
import {
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
  ConflictException,
  InternalServerErrorException
} from '@nestjs/common';

// Resource not found
throw new NotFoundException('User not found');

// Invalid input
throw new BadRequestException('Invalid email format');

// Auth failures
throw new UnauthorizedException('Invalid credentials');
throw new ForbiddenException('Access denied');

// Duplicate records
throw new ConflictException('Email already exists');

// Server errors
throw new InternalServerErrorException('Failed to process request');
```

## Config Management

```typescript
// In common/enum/environment.ts
export const ENVIRONMENT = {
  PORT: 'PORT',
  CORS_ORIGIN: 'CORS_ORIGIN',
  CORS_ORIGIN_REGEX: 'CORS_ORIGIN_REGEX',
  DATABASE_URL: 'DATABASE_URL',
  JWT_SECRET: 'JWT_SECRET',
  JWT_EXPIRES_IN: 'JWT_EXPIRES_IN',
};

// Usage
import { ConfigService } from '@nestjs/config';
import { ENVIRONMENT } from './common/enum/environment';

@Injectable()
export class MyService {
  constructor(private readonly configService: ConfigService) {}

  getDatabaseUrl() {
    return this.configService.get<string>(ENVIRONMENT.DATABASE_URL);
  }
}
```

## Common Imports Template

```typescript
// Controllers
import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Version,
  HttpCode,
} from '@nestjs/common';

// Swagger
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

// Auth
import { AuthGuard } from '@nestjs/passport';
import { AuthUser, JwtPayloadDto, Roles, RolesGuard } from '@app/auth-utilities';

// Validation
import {
  IsString,
  IsEmail,
  IsOptional,
  IsEnum,
  IsInt,
  IsBoolean,
  IsNotEmpty,
  Length,
} from 'class-validator';

// Logging
import { LogActivity } from '@app/app-logger';

// Database (if using Prisma)
import { PrismaService } from '../path/to/prisma.service';
```

## JWT Bearer Authentication

### Adding JWT Guard to a Controller

```typescript
import { Controller, Get, UseGuards, Request, Version } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@app/auth-utilities';

@ApiTags('Feature')
@Controller('feature')
export class FeatureController {
  @Get('me')
  @Version('1')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user info (Protected)' })
  @ApiResponse({ status: 200, description: 'User info retrieved' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getUserInfo(@Request() req) {
    // req.user contains the decoded JWT payload: { sub, email, first_name, last_name }
    return {
      sub: req.user.sub,
      email: req.user.email,
      message: 'This is a protected endpoint',
    };
  }
}
```

### Module Setup

```typescript
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-jwt-secret-key-change-this',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [JwtStrategy],
})
export class FeatureModule {}
```

### JWT Strategy (for services that validate tokens)

**For Auth Service** (with database lookup):
```typescript
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BaseJwtStrategy } from '@app/auth-utilities';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends BaseJwtStrategy {
  constructor(
    configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    super(configService);
  }

  async getUserById(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
        is_active: true,
      },
    });
  }
}
```

**For Other Services** (JWT validation only, no DB lookup):
```typescript
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BaseJwtStrategy } from '@app/auth-utilities';

@Injectable()
export class JwtStrategy extends BaseJwtStrategy {
  constructor(configService: ConfigService) {
    super(configService);
  }

  async getUserById(userId: string) {
    // In microservices, call auth service API if needed
    return {
      id: userId,
      is_active: true, // Trust the token from auth service
    };
  }

  async validate(payload: any) {
    return {
      sub: payload.sub,
      email: payload.email,
      first_name: payload.first_name,
      last_name: payload.last_name,
    };
  }
}
```

### Testing Bearer Auth

```bash
# 1. Sign in to get token
TOKEN=$(curl -s -X POST "http://localhost:3001/auth/signin" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test1234"}' | jq -r '.access_token')

# 2. Access protected endpoint
curl -X GET "http://localhost:3000/backend/v1/me" \
  -H "Authorization: Bearer $TOKEN"

# 3. Without token (will fail)
curl -X GET "http://localhost:3000/backend/v1/me"
```

### Important Notes

- **Auth Service**: Only the auth service should access the auth database
- **Other Services**: Validate JWT tokens only, don't access auth database
- **BaseJwtStrategy**: Extensible base class from `@app/auth-utilities` for reuse across services
- **JWT Payload**: Contains `sub` (user ID), `email`, `first_name`, `last_name`
- **Path Format**: With URI versioning: `{globalPrefix}/v{version}/{route}`
  - Example: `/backend/v1/me` for global prefix `backend`, version `1`, route `me`

## Related Skills

- **auth-guard-patterns** - Authentication and authorization
- **prisma-patterns** - Database operations with Prisma
- **dto-validation** - DTO creation and validation
- **nestjs-helper** - CLI commands and generation

## CLI Generation Commands

### Generate Feature Module

```bash
# Generate complete feature structure
nest g module feature
nest g controller feature
nest g service feature

# Or use resource command
nest g resource feature
```

### Generate Individual Components

```bash
# Module
nest g mo feature

# Controller
nest g co feature --no-spec

# Service
nest g s feature --no-spec

# Guard
nest g gu auth

# Pipe
nest g pi validation

# Interceptor
nest g itc logging
```

### Monorepo Commands

```bash
# Generate library
nest g lib shared

# Generate sub-app
nest g app auth-service

# Generate in specific project
nest g mo feature --project backend
```
