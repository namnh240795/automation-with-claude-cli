---
name: security-and-hardening
description: Hardens code against vulnerabilities. Use when handling user input, authentication, data storage, or external integrations. Use when building any feature that accepts untrusted data, manages user sessions, or interacts with third-party services. For auth-specific patterns (JWT, guards, tokens), see the auth-guard-patterns rule.
---

# Security and Hardening

Security-first development for this NestJS + Fastify + Prisma monorepo. Treat every external input as hostile, every secret as sacred, and every authorization check as mandatory. This skill covers security concerns beyond authentication — for JWT, guards, RBAC, and token management, see the `auth-guard-patterns` rule.

## When to Use

- Building anything that accepts user input (DTOs, query params, file uploads)
- Storing or transmitting sensitive data
- Integrating with external APIs or services
- Adding file uploads via `@fastify/multipart`
- Handling PII or financial data
- Configuring CORS, headers, or rate limiting
- Writing Prisma queries that involve user-provided filters

**Already covered by `auth-guard-patterns` rule:** JWT setup, guard ordering, `@Roles()`, `@AuthUser()`, password hashing, TokenService, rate limiting patterns.

## The Three-Tier Boundary System

### Always Do (No Exceptions)

- **Validate all external input** via class-validator DTOs with `ValidationPipe({ transform: true })`
- **Use Prisma for all database queries** — never raw SQL with string concatenation
- **Always use `select`** in Prisma queries to exclude sensitive fields (never return `password_hash`)
- **Filter `deleted_at: null`** on every query to prevent data leakage
- **Use ConfigService** for secrets — never `process.env` directly in service code
- **Use `ENVIRONMENT` constants** — never hardcoded env var names
- **Set audit fields** (`created_by`, `updated_by`) on every write operation

### Ask First (Requires Human Approval)

- Adding new authentication flows or changing auth logic
- Storing new categories of sensitive data (PII, payment info)
- Adding new external service integrations
- Changing CORS configuration
- Adding file upload handlers beyond existing `@fastify/multipart` config
- Modifying rate limiting thresholds
- Granting elevated permissions or new roles

### Never Do

- **Never commit secrets** to version control (API keys, passwords, tokens)
- **Never log sensitive data** (passwords, tokens, full credit card numbers, JWT secrets)
- **Never disable `ValidationPipe`** or set `disableErrorMessages: true` globally
- **Never use `eval()` or `Function()`** constructors
- **Never expose stack traces** or Prisma error details to API consumers
- **Never return `password_hash`** or internal IDs in API responses
- **Never trust client-side validation** as the only security boundary

## OWASP Top 10 Prevention (NestJS Context)

### 1. Injection (SQL, NoSQL, OS Command)

Prisma parameterizes all queries by default — this is the primary defense.

```typescript
// SAFE: Prisma parameterizes automatically
const user = await this.prisma.user.findUnique({
  where: { id: userId, deleted_at: null },
  select: { id: true, email: true, first_name: true },
});

// SAFE: Prisma with user-provided search
const users = await this.prisma.user.findMany({
  where: {
    deleted_at: null,
    OR: [
      { email: { contains: searchTerm } },  // searchTerm is parameterized
      { first_name: { contains: searchTerm } },
    ],
  },
});

// DANGEROUS: Never use $queryRaw with string concatenation
await this.prisma.$queryRaw`SELECT * FROM user WHERE id = ${userId}`;  // OK — tagged template
await this.prisma.$queryRaw('SELECT * FROM user WHERE id = ' + userId);  // NEVER — SQL injection
```

### 2. Broken Authentication

Handled by `auth-guard-patterns` rule. Key points:

- Use `JwtAuthGuard` from `@app/auth-utilities` on all protected endpoints
- Use `TokenService` for token generation — never `jwt.sign()` directly
- Hash passwords via `hashPassword()` / `verifyPassword()` from `@app/auth-utilities`
- Rate limit auth endpoints (see `auth-guard-patterns` for cache-based pattern)

### 3. Cross-Site Scripting (XSS)

This is primarily a backend API monorepo — XSS risk is lower but still relevant for:
- Error messages that reflect user input
- Any endpoint that returns HTML (Swagger UI, health checks)
- Future frontend applications consuming these APIs

```typescript
// SAFE: NestJS does not render HTML by default — JSON API responses don't execute scripts
return { message: 'User created', email: userInput.email };

// DANGEROUS: If you ever return HTML content
@Get('profile-html')
getProfileHtml(@Query('name') name: string) {
  return `<div>Hello ${name}</div>`;  // XSS — name could be <script>alert(1)</script>
}

// SAFE: Use ValidationPipe + class-validator to sanitize input
@ApiProperty({ example: 'John' })
@IsString()
@IsNotEmpty()
@Length(1, 100)
name: string;
```

### 4. Broken Access Control

```typescript
// ALWAYS verify resource ownership — never trust the client
@Patch(':id')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
async update(
  @AuthUser() user: JwtPayloadDto,
  @Param('id') id: string,
  @Body() dto: UpdateFeatureDto,
) {
  // Verify the resource belongs to this user
  const existing = await this.prisma.feature.findUnique({
    where: { id, deleted_at: null },
    select: { id: true, created_by: true },
  });

  if (!existing) throw new NotFoundException('Resource not found');
  if (existing.created_by !== user.sub) throw new ForbiddenException('Not authorized');

  return this.featureService.update(user, id, dto);
}

// For multi-tenant: validate organization_id matches the token
const tenant = req.raw['tenant'];
if (tenant !== user.organization) {
  throw new ForbiddenException('Invalid tenant');
}
```

### 5. Security Misconfiguration

This project uses Fastify (not Express). Security headers and CORS are configured in `main.ts`:

```typescript
// CORS — restrict to known origins (never use '*')
const allowedOrigins = configService.get<string>(ENVIRONMENT.CORS_ORIGIN).split(',');
const regexPatterns = configService.get<string>(ENVIRONMENT.CORS_ORIGIN_REGEX)
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

// ValidationPipe — always enable transform
app.useGlobalPipes(new ValidationPipe({ transform: true }));
useContainer(app.select(AppModule), { fallbackOnErrors: true });
```

### 6. Sensitive Data Exposure

```typescript
// ALWAYS use select to exclude sensitive fields — never return full records
const user = await this.prisma.user.findUnique({
  where: { id: userId, deleted_at: null },
  select: {
    id: true,
    email: true,
    first_name: true,
    last_name: true,
    is_active: true,
    created_at: true,
    // password_hash is EXCLUDED
  },
});

// Response DTOs document what's returned — keep them in sync with select
export class UserResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  first_name?: string;

  // NO password_hash field — never add it
}
```

## Input Validation (class-validator)

This monorepo uses `class-validator` + `class-transformer` with NestJS `ValidationPipe`. All validation happens at the DTO boundary.

### DTO Validation Patterns

```typescript
export class CreateFeatureDto {
  // String with length constraints
  @ApiProperty({ example: 'Feature name' })
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  name: string;

  // Email validation
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  // Enum with restricted values
  @ApiProperty({ enum: FeatureType })
  @IsEnum(FeatureType)
  @IsNotEmpty()
  type: FeatureType;

  // Optional field
  @ApiPropertyOptional({ example: 'Description text' })
  @IsOptional()
  @IsString()
  @Length(0, 500)
  description?: string;

  // Number — always @Type for query params
  @ApiPropertyOptional({ default: 10, minimum: 1, maximum: 100 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number;

  // Boolean — always @Type
  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  is_active?: boolean;
}
```

### Custom Validators for Business Rules

```typescript
@ValidatorConstraint({ name: 'isStrongPassword', async: false })
export class IsStrongPasswordConstraint implements ValidatorConstraintInterface {
  validate(password: string) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/.test(password);
  }
  defaultMessage() {
    return 'Password must be at least 8 characters with uppercase, lowercase, and number';
  }
}
```

## File Upload Safety

The monorepo uses `@fastify/multipart` configured in `main.ts`:

```typescript
// Already configured in main.ts with limits
await fastifyAdapter.register(require('@fastify/multipart'), {
  attachFieldsToBody: false,
  limits: { fileSize: 20 * 1024 * 1024, files: 1, fieldSize: 1024 },
});
```

Additional validation in the controller:

```typescript
@Post('upload')
@ApiConsumes('multipart/form-data')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@UseInterceptors(FileInterceptor('file'))
async uploadFile(@AuthUser() user: JwtPayloadDto, @UploadedFile() file: Express.Multer.File) {
  // Validate file type — don't trust the client extension
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
  if (!ALLOWED_TYPES.includes(file.mimetype)) {
    throw new BadRequestException('File type not allowed');
  }

  // Size already limited by @fastify/multipart config (20MB)
  // Add additional business validation here
  return this.uploadService.process(user, file);
}
```

## Error Handling — Never Leak Internals

```typescript
// SAFE: NestJS exceptions return controlled messages
throw new NotFoundException('User not found');
throw new ConflictException('Email already exists');
throw new UnauthorizedException('Invalid credentials');
throw new ForbiddenException('Admin access required');

// DANGEROUS: Never expose Prisma errors to clients
try {
  await this.prisma.user.create({ data: { email } });
} catch (error) {
  // Handle specific Prisma errors internally
  if (error.code === 'P2002') {
    throw new ConflictException('Email already exists');
  }
  // Generic message for unexpected errors — no stack traces, no Prisma internals
  throw new InternalServerErrorException('Failed to create record');
}
```

## Secrets Management

### Environment Variables via ConfigService

```typescript
// SAFE: Use ConfigService with ENVIRONMENT constants
import { ConfigService } from '@nestjs/config';
import { ENVIRONMENT } from '../common/enum/environment';

@Injectable()
export class MyService {
  constructor(private readonly configService: ConfigService) {}

  getSecret() {
    return this.configService.get<string>(ENVIRONMENT.JWT_SECRET);
  }
}

// DANGEROUS: Never use process.env directly
const secret = process.env.JWT_SECRET;  // Never do this
```

### .env Files

```
.env.example  -> Committed (template with placeholder values)
.env          -> NOT committed (contains real secrets per service)
```

Each service has its own `.env` in `apps/<service>/.env`. All `.env` files must be in `.gitignore`.

### Pre-Commit Secret Check

```bash
# Check for accidentally staged secrets
git diff --cached | grep -i "password\|secret\|api_key\|token\|PRIVATE_KEY"
```

## Dependency Auditing

```bash
# Run audit for the monorepo
pnpm audit

# Audit a specific service's dependencies
cd apps/auth && pnpm audit

# Check for known vulnerabilities before every release
pnpm audit --audit-level=high
```

### Triaging Audit Results

```
pnpm audit reports a vulnerability
├── Severity: critical or high
│   ├── Is the vulnerable code reachable in your app?
│   │   ├── YES -> Fix immediately (update, patch, or replace)
│   │   └── NO (dev-only dep, unused code path) -> Fix soon, not a blocker
│   └── Is a fix available?
│       ├── YES -> Update to the patched version
│       └── NO -> Check workarounds, consider replacing, or document the risk
├── Severity: moderate
│   ├── Reachable in production? -> Fix in the next release
│   └── Dev-only? -> Fix when convenient
└── Severity: low
    └── Track and fix during regular dependency updates
```

## Security Headers Reference

For Fastify applications, configure headers in `main.ts` or via plugins:

| Header | Value | Purpose |
|--------|-------|---------|
| `X-Content-Type-Options` | `nosniff` | Prevent MIME type sniffing |
| `X-Frame-Options` | `DENY` | Prevent clickjacking |
| `X-XSS-Protection` | `0` | Disable buggy browser XSS filter |
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains` | Force HTTPS |
| `Content-Security-Policy` | Context-dependent | Control resource loading |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Control referrer leaking |

## Prisma Security Patterns

### Always Filter Soft Deletes

```typescript
// Every query must filter deleted_at — prevents data leakage
const users = await this.prisma.user.findMany({
  where: { deleted_at: null, organization_id: orgId },
});
```

### Always Use Select

```typescript
// Exclude sensitive fields at the query level
const user = await this.prisma.user.findUnique({
  where: { id: userId },
  select: { id: true, email: true, first_name: true },  // No password_hash
});
```

### Transactions for Multi-Step Operations

```typescript
// Atomic — no partial state if one step fails
await this.prisma.$transaction(async (tx) => {
  const user = await tx.user.create({ data: { email, password_hash: hashedPw } });
  await tx.user_role.create({ data: { user_id: user.id, role_id: defaultRoleId } });
  return user;
});
```

## Security Review Checklist

### Input Validation
- [ ] All DTOs have class-validator decorators (`@IsString`, `@IsEmail`, etc.)
- [ ] Query params use `@Type(() => Number)` for numeric fields
- [ ] File uploads validate type and size
- [ ] `ValidationPipe({ transform: true })` enabled in `main.ts`

### Data Access
- [ ] All Prisma queries filter `deleted_at: null`
- [ ] All queries use `select` to exclude sensitive fields
- [ ] No `password_hash` in any API response
- [ ] Multi-step writes use `$transaction`
- [ ] P2002 unique constraint errors handled with `ConflictException`

### Authentication & Authorization
- [ ] Protected endpoints have `@UseGuards(JwtAuthGuard)`
- [ ] `@ApiBearerAuth()` on protected Swagger endpoints
- [ ] Resource ownership verified before update/delete
- [ ] Role-based access uses `@Roles()` decorator (see `auth-guard-patterns`)

### Configuration
- [ ] Secrets via `ConfigService` + `ENVIRONMENT` constants — no `process.env`
- [ ] CORS configured with specific origins — no `*`
- [ ] `.env` files not committed to git
- [ ] No secrets in source code or commit history

### Error Handling
- [ ] Prisma errors caught and wrapped in NestJS exceptions
- [ ] No stack traces exposed to clients
- [ ] Generic error messages for unexpected failures

### Dependencies
- [ ] `pnpm audit` shows no critical/high vulnerabilities
- [ ] New packages added to rspack `externals` if needed

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "This is an internal service" | Internal services get compromised. Attackers target the weakest link. |
| "We'll add security later" | Security retrofitting is 10x harder than building it in. |
| "Prisma handles injection" | Prisma handles SQL injection. It doesn't handle authz, data exposure, or misconfiguration. |
| "The framework handles security" | NestJS provides tools. You must use them correctly. |
| "It's just a prototype" | Prototypes become production. Build security habits from day one. |
| "ValidationPipe catches everything" | ValidationPipe validates shape. You still need authorization checks and data filtering. |

## Red Flags

- Prisma `$queryRaw` with string concatenation (not tagged templates)
- DTO fields without class-validator decorators
- API responses containing `password_hash` or `token` fields
- `process.env` used directly in service code instead of ConfigService
- CORS set to `origin: '*'`
- `deleted_at: null` missing from Prisma query `where` clauses
- Stack traces or Prisma error codes in API responses
- Secrets in source code or `.env` files committed to git
- Endpoints with `@UseGuards(JwtAuthGuard)` missing but handling sensitive data
- `@fastify/multipart` not configured with size limits

## Integration with Other Skills

| Skill / Rule | Relationship |
|-------------|-------------|
| `auth-guard-patterns` rule | JWT, guards, RBAC, tokens, passwords, rate limiting |
| `dto-validation` rule | DTO creation with class-validator decorators |
| `error-handling` rule | NestJS exception types and patterns |
| `config-management` rule | ConfigService and ENVIRONMENT constants |
| `prisma-patterns` rule | Query safety, soft deletes, select, transactions |
| `nestjs-unit-testing` skill | Testing security patterns (guard overrides, P2002 handling) |
