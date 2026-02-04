# Auth & Guard Patterns

A skill for implementing authentication and authorization following traceability-backend security patterns.

## JWT Token Structure

The `JwtPayloadDto` contains:
```typescript
interface JwtPayloadDto {
  user_id: string;
  organization_id: string;
  organization: string;        // display_id (tenant)
  organization_type: string;   // FARMER, COLLECTOR, etc.
  roles: string[];
}
```

## Custom Decorators

### @AuthUser()
Extract authenticated user from request:
```typescript
import { AuthUser, JwtPayloadDto } from '@app/auth-utilities';

@Get('profile')
async getProfile(@AuthUser() user: JwtPayloadDto) {
  // user.user_id, user.organization_id, user.roles
}
```

### @Roles()
Restrict access by role:
```typescript
import { Roles } from '@app/auth-utilities';

@Post('admin')
@Roles('ADMIN', 'SUPER_ADMIN')
async adminAction() { }
```

### @OrganizationTypes()
Restrict by organization type:
```typescript
import { OrganizationTypes } from '../common/guard/organization-type.guard';

@Post('collector-only')
@OrganizationTypes('COLLECTOR')
async collectorAction() { }
```

## Guards

### JWT Authentication
```typescript
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt-token'))
@ApiBearerAuth()
async protectedEndpoint() { }
```

### Role-Based Access Control
```typescript
import { RolesGuard } from '@app/auth-utilities';

@UseGuards(AuthGuard('jwt-token'), RolesGuard)
@Roles('ADMIN')
async adminOnly() { }
```

### Tenant Validation
```typescript
import { TenantGuard } from '../common/guard/tenant.guard';

@UseGuards(TenantGuard)
async tenantSpecific() {
  // Validates tenant from subdomain matches token
}
```

### Organization Type Guard
```typescript
import { OrganizationTypeGuard } from '../common/guard/organization-type.guard';

@UseGuards(OrganizationTypeGuard)
@OrganizationTypes('FARMER', 'COLLECTOR')
async multiTypeAccess() { }
```

## Complete Auth Controller Example

```typescript
import { Controller, Post, Body, UseGuards, Version, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser, JwtPayloadDto } from '@app/auth-utilities';
import { MyService } from './my.service';

@ApiTags('MyFeature')
@Controller('my-feature')
export class MyController {
  constructor(private readonly service: MyService) {}

  @Post('public')
  @Version('1')
  @ApiOperation({ summary: 'Public endpoint' })
  async publicEndpoint(@Body() dto: PublicDto) {
    return this.service.publicAction(dto);
  }

  @Post('protected')
  @Version('1')
  @UseGuards(AuthGuard('jwt-token'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Protected endpoint' })
  async protectedEndpoint(
    @AuthUser() user: JwtPayloadDto,
    @Body() dto: ProtectedDto
  ) {
    return this.service.protectedAction(user, dto);
  }

  @Post('admin-only')
  @Version('1')
  @UseGuards(AuthGuard('jwt-token'), RolesGuard)
  @ApiBearerAuth()
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Admin only endpoint' })
  async adminEndpoint(@AuthUser() user: JwtPayloadDto) {
    return this.service.adminAction(user);
  }
}
```

## Password Utilities

```typescript
import { hashPassword, verifyPassword } from '@app/auth-utilities';

// Hash password
const hashed = hashPassword('plainPassword');

// Verify password
const isValid = verifyPassword('plainPassword', hashedPassword);
```

## Token Management

### Access Token
```typescript
// Generated with user info and roles
const tokenResult = this.tokenService.generateAccessToken(
  userId,
  organizationId,
  organizationDisplayId,
  organizationType,
  userRoles
);
// Returns: { access_token, expires_at }
```

### Refresh Token
```typescript
// Generate
const refreshToken = this.tokenService.generateRefreshToken();
// Returns: { token, expires_at }

// Store
await this.tokenService.storeRefreshToken(token, userId, organizationId);

// Validate
const payload = await this.tokenService.validateRefreshToken(token);

// Revoke
await this.tokenService.revokeRefreshToken(token);
```

## Common Auth Patterns

### Rate Limiting with Cache
```typescript
@Injectable()
export class MyService {
  private readonly maxAttempts = 5;
  private readonly lockoutDuration = 15 * 60; // 15 minutes

  async checkRateLimit(identifier: string) {
    const key = `attempts:${identifier}`;
    const attempts = await this.cacheManager.get(key);

    if (attempts >= this.maxAttempts) {
      throw new UnauthorizedException('Too many attempts');
    }

    await this.cacheManager.set(key, attempts + 1, 3600 * 1000);
  }
}
```

### Multi-Tenant Patterns
```typescript
// Get tenant from Fastify request
const tenant = req.raw['tenant'];

// Match against user's organization
if (tenant !== user.organization) {
  throw new ForbiddenException('Invalid tenant');
}
```

## Security Best Practices

1. **Always validate JWT** on protected endpoints with `@UseGuards(AuthGuard('jwt-token'))`
2. **Use @ApiBearerAuth()** for Swagger documentation
3. **Log sensitive actions** with `@LogActivity()` decorator
4. **Use Transactions** for multi-step auth operations
5. **Hash passwords** before storing
6. **Implement rate limiting** for auth endpoints
7. **Validate tenant** matches token in multi-tenant apps
8. **Use soft deletes** - check `deleted_at: null`
9. **Never expose internal IDs** in API responses
10. **Set appropriate CORS** origins with regex support
