# Auth & Guard Patterns — NestJS Security Rules

> Source: Monorepo JWT authentication and authorization patterns

## 🔐 JWT Authentication

### ✅ Always guard protected endpoints with JwtAuthGuard
```typescript
// ❌ Bad — no authentication
@Get('profile')
async getProfile() { ... }

// ✅ Good
@Get('profile')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
async getProfile(@AuthUser() user: JwtPayloadDto) { ... }
```

### ✅ Use @AuthUser() decorator — never access req.user directly
```typescript
// ❌ Bad
async getProfile(@Request() req) {
  const userId = req.user.sub;
}

// ✅ Good
async getProfile(@AuthUser() user: JwtPayloadDto) {
  const userId = user.sub;
}
```

### ✅ Combine guards in order: Auth → Role → Tenant
```typescript
// ❌ Bad — role guard without auth guard
@UseGuards(RolesGuard)

// ✅ Good — auth guard first, then role guard
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
```

---

## 🛡️ Role-Based Access Control

### ✅ Use @Roles() decorator for RBAC
```typescript
// ❌ Bad — manual role check in service
if (!user.roles.includes('ADMIN')) {
  throw new ForbiddenException();
}

// ✅ Good — declarative role guard
@Post('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'SUPER_ADMIN')
async adminAction(@AuthUser() user: JwtPayloadDto) { ... }
```

### ✅ Use @OrganizationTypes() for tenant-type restrictions
```typescript
@Post('collector-only')
@UseGuards(JwtAuthGuard, OrganizationTypeGuard)
@OrganizationTypes('COLLECTOR')
async collectorAction() { ... }
```

---

## 🏢 Multi-Tenant Patterns

### ✅ Always validate tenant matches token
```typescript
// ❌ Bad — trust any organization_id
const data = await this.prisma.feature.findMany({
  where: { organization_id: user.organization_id }
});

// ✅ Good — validate tenant from request context
const tenant = req.raw['tenant'];
if (tenant !== user.organization) {
  throw new ForbiddenException('Invalid tenant');
}
```

---

## 🔑 Token Management

### ✅ Use TokenService — never handle JWT manually
```typescript
// ❌ Bad
const token = jwt.sign(payload, secret, { expiresIn: '1h' });

// ✅ Good
const { access_token, expires_at } = this.tokenService.generateAccessToken(
  userId, organizationId, organizationDisplayId, organizationType, roles
);
```

### ✅ Full refresh token lifecycle
```typescript
// Generate
const { token, expires_at } = this.tokenService.generateRefreshToken();

// Store
await this.tokenService.storeRefreshToken(token, userId, organizationId);

// Validate
const payload = await this.tokenService.validateRefreshToken(token);

// Revoke on logout
await this.tokenService.revokeRefreshToken(token);
```

---

## 🔒 Password Utilities

### ✅ Always hash passwords — never store plain text
```typescript
// ❌ Bad
await this.prisma.user.create({
  data: { email, password: plainPassword }
});

// ✅ Good
import { hashPassword, verifyPassword } from '@app/auth-utilities';

const hashed = hashPassword(plainPassword);
const isValid = verifyPassword(plainPassword, storedHash);
```

---

## ⚡ Rate Limiting

### ✅ Implement rate limiting on all auth endpoints
```typescript
// ❌ Bad — unlimited login attempts
@Post('signin')
async signIn(@Body() dto: SignInDto) { ... }

// ✅ Good — with cache-based rate limiting
private readonly maxAttempts = 5;
private readonly lockoutDuration = 15 * 60; // 15 min

async checkRateLimit(identifier: string) {
  const key = `attempts:${identifier}`;
  const attempts = await this.cacheManager.get<number>(key);

  if (attempts >= this.maxAttempts) {
    throw new UnauthorizedException('Too many attempts');
  }

  await this.cacheManager.set(key, attempts + 1, this.lockoutDuration * 1000);
}
```

---

## 🔧 JWT Strategy Patterns

### ✅ Auth Service — strategy with DB lookup
```typescript
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
      select: { id: true, email: true, first_name: true, last_name: true, is_active: true },
    });
  }
}
```

### ✅ Other Services — validate JWT only, no DB lookup
```typescript
@Injectable()
export class JwtStrategy extends BaseJwtStrategy {
  constructor(configService: ConfigService) {
    super(configService);
  }

  async getUserById(userId: string) {
    return { id: userId, is_active: true }; // Trust the token from auth service
  }
}
```

---

## 📋 JWT Payload Reference

| Field | Type | Description |
|-------|------|-------------|
| `sub` | `string` | User ID (UUID) |
| `email` | `string` | User email |
| `first_name` | `string?` | First name |
| `last_name` | `string?` | Last name |
| `iat` | `number` | Issued at timestamp |
| `exp` | `number` | Expiration timestamp |

---

## 🚫 Security Checklist

- ❌ Never skip JWT validation on protected endpoints
- ❌ Never store plain-text passwords
- ❌ Never expose internal IDs in API responses
- ❌ Never implement custom auth — use `@app/auth-utilities`
- ❌ Never put RolesGuard before JwtAuthGuard
- ✅ Always use `@ApiBearerAuth()` for Swagger docs on protected endpoints
- ✅ Always log sensitive actions with `@LogActivity()` decorator
- ✅ Always use transactions for multi-step auth operations
- ✅ Always validate tenant in multi-tenant apps
- ✅ Always use soft deletes (`deleted_at: null`)
- ✅ Always implement rate limiting for auth endpoints
