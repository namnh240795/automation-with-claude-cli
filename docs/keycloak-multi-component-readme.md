# Multi-Component Keycloak Architecture Implementation

This document provides an overview of the implemented multi-component Keycloak architecture for this monorepo.

## Architecture Overview

The implementation uses a **Single Realm with Multiple Clients** approach, providing:

- ✅ Single Sign-On (SSO) across all components
- ✅ Unified user management
- ✅ Role-based access control (RBAC)
- ✅ Scope-based authorization
- ✅ Resource-based permissions (optional)
- ✅ Same domain deployment support

## Components

```
┌─────────────────────────────────────────────────────────────┐
│                     Keycloak Realm: app-realm                │
│                      http://localhost:8080                   │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Frontend   │  │     CMS      │  │    Admin     │      │
│  │              │  │              │  │              │      │
│  │    Client:   │  │    Client:   │  │    Client:   │      │
│  │  frontend-   │  │   cms-       │  │   admin-     │      │
│  │    client    │  │   client     │  │    client    │      │
│  │              │  │              │  │              │      │
│  │    Type:     │  │    Type:     │  │    Type:     │      │
│  │    public    │  │ confidential │  │ confidential │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                               │
│  Roles: super_admin, admin, user, premium_user,             │
│         cms_admin, cms_publisher, cms_editor                 │
│                                                               │
│  Scopes: profile:read, profile:write, content:view,          │
│          content:premium, cms:content:read,                  │
│          cms:content:write, cms:content:publish,             │
│          admin:users:read, admin:system:write, etc.          │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## Implementation Files

### 1. Keycloak Integration Library (`libs/keycloak-integration/`)

Enhanced library with new guards and decorators:

**New Files:**
- `guards/scopes.guard.ts` - Scope-based authorization guard
- `guards/resource.guard.ts` - Resource-based permission guard

**Existing Files:**
- `guards/keycloak-auth.guard.ts` - JWT authentication guard
- `guards/roles.guard.ts` - Role-based access control guard
- `decorators/keycloak-user.decorator.ts` - User info decorators
- `keycloak.module.ts` - Keycloak module configuration
- `keycloak.service.ts` - Keycloak service for token operations
- `dto/keycloak.dto.ts` - Type definitions

### 2. Environment Configuration

**New Files:**
- `.env.keycloak.multiclient` - Multi-client environment template
- `.env.frontend` - Frontend client configuration
- `.env.cms` - CMS client configuration
- `.env.admin` - Admin client configuration

### 3. Database Setup

**Modified:**
- `docker/init-postgres.sh` - Added cms_db and admin_db databases

### 4. Documentation

**New Files:**
- `docs/keycloak-multi-component-setup.md` - Comprehensive setup guide
- `docs/keycloak-testing.md` - Testing and verification guide
- `docs/examples/cms-auth-example.controller.ts` - CMS authentication examples
- `docs/examples/frontend-auth-example.controller.ts` - Frontend authentication examples
- `docs/examples/admin-auth-example.controller.ts` - Admin authentication examples

## Usage Examples

### Frontend Authentication

```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  KeycloakAuthGuard,
  KeycloakScopesGuard,
  Scope,
  Roles,
  KeycloakUser,
  KeycloakUserInfo,
} from '@app/keycloak-integration';

@Controller('api/user')
@UseGuards(KeycloakAuthGuard, KeycloakScopesGuard)
export class UserController {

  @Get('profile')
  @Roles('user', 'premium_user')
  @Scope('profile:read')
  getProfile(@KeycloakUser() user: KeycloakUserInfo) {
    return {
      user_id: user.sub,
      email: user.email,
      roles: user.realm_access?.roles || [],
    };
  }

  @Get('premium')
  @Roles('premium_user')
  @Scope('content:premium')
  getPremiumContent(@KeycloakUser() user: KeycloakUserInfo) {
    return { content: 'Premium content here' };
  }
}
```

### CMS Authentication

```typescript
import { Controller, Post, UseGuards } from '@nestjs/common';
import {
  KeycloakAuthGuard,
  KeycloakRolesGuard,
  KeycloakScopesGuard,
  Roles,
  Scope,
  KeycloakUser,
  KeycloakUserInfo,
} from '@app/keycloak-integration';

@Controller('cms')
@UseGuards(KeycloakAuthGuard, KeycloakRolesGuard, KeycloakScopesGuard)
export class CmsController {

  @Post('content')
  @Roles('cms_editor', 'cms_publisher')
  @Scope('cms:content:write')
  createContent(@Body() dto: CreateContentDto, @KeycloakUser() user: KeycloakUserInfo) {
    // Editors and publishers can create content
  }

  @Post('content/:id/publish')
  @Roles('cms_publisher')
  @Scope('cms:content:publish')
  publishContent(@Param('id') id: string) {
    // Only publishers can publish
  }
}
```

### Admin Authentication

```typescript
import { Controller, Delete, UseGuards } from '@nestjs/common';
import {
  KeycloakAuthGuard,
  KeycloakRolesGuard,
  Resource,
  Roles,
  KeycloakUser,
  KeycloakUserInfo,
} from '@app/keycloak-integration';

@Controller('admin')
@UseGuards(KeycloakAuthGuard, KeycloakRolesGuard)
export class AdminController {

  @Delete('users/:id')
  @Roles('super_admin')
  @Resource('admin_users', 'delete')
  deleteUser(@Param('id') id: string) {
    // Super admin only
  }
}
```

## Guards and Decorators

### Authentication Guards

- `KeycloakAuthGuard` - Validates JWT tokens
- `@Unprotected()` - Mark routes as public (bypass authentication)

### Authorization Guards

- `KeycloakRolesGuard` - Role-based access control
- `KeycloakScopesGuard` - Scope-based authorization
- `KeycloakResourceGuard` - Resource-based permissions

### Decorators

**User Information:**
- `@KeycloakUser()` - Extract full user object
- `@KeycloakUserId()` - Extract user ID (sub)
- `@KeycloakEmail()` - Extract user email
- `@KeycloakRoles()` - Extract user roles

**Role-Based:**
- `@Roles('admin', 'moderator')` - Require specific roles

**Scope-Based:**
- `@Scope('profile:read')` - Require single scope
- `@Scopes('scope1', 'scope2')` - Require any of the scopes

**Resource-Based:**
- `@Resource('cms_content', 'delete')` - Require resource permission
- `@RequireAllPermissions(...)` - Require all permissions
- `@RequireAnyPermission(...)` - Require any permission

## Role Structure

### Realm-Level Roles

| Role | Description | Component Access |
|------|-------------|------------------|
| `super_admin` | Full system access | All components |
| `admin` | Admin panel access | Frontend + Admin |
| `cms_admin` | Manage CMS settings | Frontend + CMS (admin) |
| `cms_publisher` | Publish content | Frontend + CMS (publish) |
| `cms_editor` | Create/edit content | Frontend + CMS (edit) |
| `premium_user` | Premium features | Frontend (premium) |
| `user` | Standard user (default) | Frontend |

### Groups (Optional)

- `administrators` → super_admin, admin
- `cms_admins` → cms_admin, cms_publisher
- `cms_editors` → cms_editor, user
- `premium_users` → premium_user, user
- `end_users` → user

## Scope Structure

### Frontend Scopes
- `profile:read` - Read user profile
- `profile:write` - Update user profile
- `content:view` - View published content
- `content:premium` - Access premium content

### CMS Scopes
- `cms:content:read` - Read content
- `cms:content:write` - Create/edit content
- `cms:content:publish` - Publish content
- `cms:media:manage` - Manage media files
- `cms:users:manage` - Manage CMS users
- `cms:analytics:view` - View analytics

### Admin Scopes
- `admin:users:read` - List users
- `admin:users:write` - Modify users
- `admin:system:read` - View system config
- `admin:system:write` - Modify system config
- `admin:logs:view` - View logs

## Quick Start

### 1. Start Keycloak

```bash
docker-compose -f docker/docker-compose.yml up -d
```

### 2. Create Realm and Clients

Follow the comprehensive setup guide:
```bash
# Open setup guide
cat docs/keycloak-multi-component-setup.md
```

### 3. Configure Environment

```bash
# Copy environment templates
cp .env.frontend apps/frontend/.env
cp .env.cms apps/cms/.env
cp .env.admin apps/admin/.env

# Update with your client secrets
```

### 4. Test Authentication

```bash
# Test login
curl -X POST "http://localhost:8080/realms/app-realm/protocol/openid-connect/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=password" \
  -d "client_id=frontend-client" \
  -d "username=testuser" \
  -d "password=testpass123"
```

## Testing

See the testing guide for comprehensive testing examples:
```bash
cat docs/keycloak-testing.md
```

### Quick Test

```bash
# Test all users
bash scripts/test-all-users.sh

# Test all endpoints
bash scripts/test-endpoints.sh
```

## Production Deployment

### Checklist

- [ ] Change default admin password
- [ ] Enable HTTPS
- [ ] Configure proper hostname
- [ ] Set strong database passwords
- [ ] Configure email for password reset
- [ ] Enable production cache
- [ ] Review and audit all roles
- [ ] Remove test accounts
- [ ] Set up monitoring
- [ ] Configure backup

### Environment Variables

```bash
# Production URLs
KEYCLOAK_SERVER_URL=https://auth.yourdomain.com
KEYCLOAK_REALM=app-realm
KEYCLOAK_ISSUER=https://auth.yourdomain.com/realms/app-realm

# Frontend
KEYCLOAK_CLIENT_ID=frontend-client
KEYCLOAK_CALLBACK_URL=https://app.yourdomain.com/auth/callback

# CMS
KEYCLOAK_CLIENT_ID=cms-client
KEYCLOAK_CLIENT_SECRET=<production-secret>
KEYCLOAK_CALLBACK_URL=https://cms.yourdomain.com/auth/callback

# Admin
KEYCLOAK_CLIENT_ID=admin-client
KEYCLOAK_CLIENT_SECRET=<production-secret>
KEYCLOAK_CALLBACK_URL=https://admin.yourdomain.com/auth/callback
```

## Migration Guide

### From Existing JWT Auth

1. **Install Keycloak integration:**
   ```bash
   pnpm add @app/keycloak-integration
   ```

2. **Update module imports:**
   ```typescript
   // Old
   import { JwtAuthGuard } from '@app/auth-utilities';

   // New
   import { KeycloakAuthGuard, KeycloakRolesGuard } from '@app/keycloak-integration';
   ```

3. **Update guards:**
   ```typescript
   // Old
   @UseGuards(JwtAuthGuard)
   @Roles('admin')

   // New
   @UseGuards(KeycloakAuthGuard, KeycloakRolesGuard)
   @Roles('admin')
   ```

4. **Update user decorator:**
   ```typescript
   // Old
   @AuthUser() user: JwtPayloadDto

   // New
   @KeycloakUser() user: KeycloakUserInfo
   ```

5. **Update user properties:**
   ```typescript
   // Old: user.user_id
   // New: user.sub

   // Old: user.first_name
   // New: user.given_name

   // Old: user.last_name
   // New: user.family_name

   // Roles access stays similar:
   user.realm_access?.roles || []
   ```

## Security Best Practices

1. **Use HTTPS in production** - Never use HTTP for authentication in production
2. **Validate all tokens** - Always use guards to validate JWT signatures
3. **Principle of least privilege** - Grant minimum required permissions
4. **Regular security audits** - Review roles and permissions periodically
5. **Monitor failed logins** - Set up alerts for suspicious activity
6. **Use short token expiration** - Balance security and user experience
7. **Implement rate limiting** - Prevent brute force attacks
8. **Keep Keycloak updated** - Apply security patches promptly

## Troubleshooting

### Common Issues

1. **401 Unauthorized**
   - Check token expiration
   - Verify client credentials
   - Ensure HTTPS in production

2. **403 Forbidden**
   - Check user roles in Keycloak
   - Verify required roles/scope on endpoint
   - Check guard configuration

3. **SSO Not Working**
   - Verify same realm for all clients
   - Check redirect URIs configuration
   - Ensure cookie domain settings

4. **CORS Errors**
   - Add all origins to client web origins
   - Verify CORS configuration in NestJS

See `docs/keycloak-testing.md` for detailed troubleshooting.

## References

- [Keycloak Documentation](https://www.keycloak.org/documentation)
- [OIDC Specification](https://openid.net/connect/)
- [OAuth 2.0 Specification](https://oauth.net/2/)
- [NestJS Documentation](https://docs.nestjs.com/)

## Support

For issues or questions:
1. Check the setup guide: `docs/keycloak-multi-component-setup.md`
2. Review testing examples: `docs/keycloak-testing.md`
3. See example controllers: `docs/examples/`
4. Check Keycloak logs: `docker-compose logs keycloak`

## License

This implementation follows the same license as the parent project.
