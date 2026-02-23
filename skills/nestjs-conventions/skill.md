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
