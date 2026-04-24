# API Conventions — NestJS Core Setup Rules

> Source: NestJS application bootstrap and API patterns for this monorepo

## 🔧 Fastify Adapter

### ✅ Always use Fastify — never Express
```typescript
// ❌ Bad
const app = await NestFactory.create(AppModule);

// ✅ Good
import { FastifyAdapter } from '@nestjs/platform-fastify';
const app = await NestFactory.create(AppModule, new FastifyAdapter());
```

### ✅ Register multipart for file uploads
```typescript
await fastifyAdapter.register(require('@fastify/multipart'), {
  attachFieldsToBody: false,
  limits: { fileSize: 20 * 1024 * 1024, files: 1, fieldSize: 1024 },
});
```

---

## ✅ Global Validation Pipe

### ✅ Always enable transform and useContainer
```typescript
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

// ❌ Bad — no transform, DTOs won't auto-convert types
app.useGlobalPipes(new ValidationPipe());

// ✅ Good
app.useGlobalPipes(new ValidationPipe({ transform: true }));
useContainer(app.select(AppModule), { fallbackOnErrors: true });
```

---

## 🔢 API Versioning

### ✅ Always use URI versioning on every endpoint
```typescript
// Bootstrap
import { VersioningType } from '@nestjs/common';
app.enableVersioning({ type: VersioningType.URI });

// ❌ Bad — no version
@Get('users')
async findAll() { ... }

// ✅ Good
@Get('users')
@Version('1')
async findAll() { ... }
```

### ✅ URL format: `/{globalPrefix}/v{version}/{route}`
```
Example: /backend/v1/me
         /auth/v1/signin
```

---

## 📖 Swagger Documentation

### ✅ Every endpoint MUST have ApiTags, ApiOperation, and ApiResponses
```typescript
// ❌ Bad — no documentation
@Post('users')
async create(@Body() dto: CreateUserDto) { ... }

// ✅ Good
@ApiTags('Users')
@Controller('users')
export class UsersController {
  @Post()
  @Version('1')
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, description: 'Created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  async create(@Body() dto: CreateUserDto) { ... }
}
```

### ✅ Protected endpoints MUST include @ApiBearerAuth()
```typescript
// ❌ Bad
@UseGuards(JwtAuthGuard)
@ApiOperation({ summary: 'Get profile' })
async getProfile() { ... }

// ✅ Good
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiOperation({ summary: 'Get profile' })
async getProfile() { ... }
```

---

## 🌐 CORS Configuration

### ✅ Support both exact origins and regex patterns
```typescript
// ❌ Bad — open CORS
app.enableCors({ origin: '*' });

// ✅ Good — configurable origins
const allowedOrigins = configService.get<string>('CORS_ORIGIN').split(',');
const regexPatterns = configService.get<string>('CORS_ORIGIN_REGEX')
  ?.split(',')
  .map(p => new RegExp(p.trim()))
  .filter(Boolean) || [];

const corsValidator = (origin, callback) => {
  if (!origin) return callback(null, true);
  if (allowedOrigins.includes(origin)) return callback(null, true);
  if (regexPatterns.some(p => p.test(origin))) return callback(null, true);
  callback(new Error('Not allowed by CORS'));
};

app.enableCors({ origin: corsValidator });
```

---

## 🚫 Checklist

- ❌ Never use Express adapter — always Fastify
- ❌ Never skip `transform: true` on ValidationPipe
- ❌ Never forget `@Version('1')` on endpoints
- ❌ Never leave endpoints without Swagger decorators
- ❌ Never use `origin: '*'` for CORS
- ✅ Always use `useContainer()` for class-validator DI
- ✅ Always document protected endpoints with `@ApiBearerAuth()`
