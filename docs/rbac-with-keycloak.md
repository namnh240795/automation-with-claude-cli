# Role-Based Access Control (RBAC) with Keycloak

This guide explains how to implement role-based access control using Keycloak and the `@app/keycloak-integration` library.

## Overview

Keycloak provides a robust RBAC system that supports:
- **Realm roles** - Global roles available across the entire realm
- **Client roles** - Roles specific to a particular client/application
- **Composite roles** - Roles that include other roles
- **Group-based roles** - Roles assigned through group membership

## Keycloak Role Configuration

### 1. Create Realm Roles

In Keycloak Admin Console:
1. Go to **Realm Roles** → **Create Role**
2. Enter role name (e.g., `admin`, `user`, `moderator`)
3. Add description if needed
4. Click **Create**

### 2. Assign Roles to Users

**Individual assignment:**
1. Go to **Users** → Select user
2. Go to **Role mapping** tab
3. Click **Add role assignment**
4. Select roles to assign
5. Click **Add selected**

**Group-based assignment:**
1. Go to **Groups** → Create group
2. Go to **Group roles** tab
3. Add roles to the group
4. Assign users to the group

### 3. Role Hierarchy Example

Recommended role structure:

```
admin
  ├── Full system access
  ├── User management
  ├── Configuration access
  └── All other roles

moderator
  ├── Content moderation
  ├── User management (read-only)
  └── Reporting

user
  ├── Basic access
  ├── Profile management
  └── Resource access (own resources)
```

## Using RBAC in Your Application

### Import Required Items

```typescript
import {
  KeycloakAuthGuard,
  KeycloakRolesGuard,
  Roles,
  KeycloakUser,
  KeycloakUserInfo,
} from '@app/keycloak-integration';
```

### Protect Endpoints with Roles

```typescript
import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Admin')
@Controller('admin')
@UseGuards(KeycloakAuthGuard, KeycloakRolesGuard)
@ApiBearerAuth()
export class AdminController {
  @Get('users')
  @Roles('admin')
  async listUsers(@KeycloakUser() user: KeycloakUserInfo) {
    // Only users with 'admin' role can access
    return { user: user.email, roles: user.realm_access?.roles };
  }

  @Post('users/:id/deactivate')
  @Roles('admin')
  async deactivateUser(@KeycloakUser() user: KeycloakUserInfo) {
    // Only admins can deactivate users
  }
}
```

### Multiple Roles

```typescript
@Get('moderation')
@Roles('admin', 'moderator')
async moderateContent(@KeycloakUser() user: KeycloakUserInfo) {
  // Users with 'admin' OR 'moderator' role can access
}
```

### Resource-Based Access Control

```typescript
import { Resource } from '@app/keycloak-integration';

@Controller('projects')
@UseGuards(KeycloakAuthGuard, KeycloakRolesGuard)
export class ProjectsController {
  @Get()
  @Resource('projects', 'read')
  async listProjects(@KeycloakUser() user: KeycloakUserInfo) {
    // Requires projects:read permission
  }

  @Post()
  @Resource('projects', 'write')
  async createProject(@KeycloakUser() user: KeycloakUserInfo) {
    // Requires projects:write permission
  }
}
```

### Custom Resource Decorators

```typescript
import { createResourceDecorator } from '@app/keycloak-integration';

const ProjectsResource = createResourceDecorator('projects');
const TasksResource = createResourceDecorator('tasks');

@Controller('api')
@UseGuards(KeycloakAuthGuard, KeycloakRolesGuard)
export class ApiController {
  @Get('projects')
  @ProjectsResource('read')
  async getProjects() { }

  @Post('projects')
  @ProjectsResource('write')
  async createProject() { }

  @Get('tasks')
  @TasksResource('read')
  async getTasks() { }
}
```

## Token Structure

Keycloak tokens include role information in this structure:

```json
{
  "sub": "user-uuid",
  "email": "user@example.com",
  "email_verified": true,
  "realm_access": {
    "roles": ["admin", "user"]
  },
  "resource_access": {
    "app-client": {
      "roles": ["project_read", "project_write"]
    }
  }
}
```

## Role Guard Behavior

The `KeycloakRolesGuard`:
1. Extracts roles from both `realm_access` and `resource_access`
2. Combines all unique roles
3. Checks if any of the required roles match

**Important:** The guard uses OR logic - a user needs at least ONE of the required roles.

## Best Practices

### 1. Use Specific Role Names

```typescript
// Good
@Roles('content:moderator', 'content:admin')

// Avoids conflicts with other services
```

### 2. Document Required Roles

```typescript
/**
 * @requires admin
 * Admin-only endpoint for system configuration
 */
@Get('config')
@Roles('admin')
async getConfig() { }
```

### 3. Combine Guards Appropriately

```typescript
// Authenticated + role check
@UseGuards(KeycloakAuthGuard, KeycloakRolesGuard)
@Roles('admin')
async adminMethod() { }

// Authenticated only (no role check)
@UseGuards(KeycloakAuthGuard)
async userMethod() { }
```

### 4. Use Resource Permissions for Fine-Grained Control

```typescript
// Resource:scope format
@Resource('documents', 'read')   // View documents
@Resource('documents', 'write')  // Create/edit documents
@Resource('documents', 'delete') // Delete documents
@Resource('documents', 'admin')   // Manage permissions
```

## Testing Role-Based Endpoints

### Unit Test Example

```typescript
describe('AdminController', () => {
  it('should allow admin users', async () => {
    const mockUser: KeycloakUserInfo = {
      sub: '123',
      email: 'admin@example.com',
      email_verified: true,
      realm_access: { roles: ['admin'] },
      // ... other fields
    };

    // Test endpoint access
  });

  it('should reject non-admin users', async () => {
    const mockUser: KeycloakUserInfo = {
      sub: '123',
      email: 'user@example.com',
      email_verified: true,
      realm_access: { roles: ['user'] },
      // ... other fields
    };

    // Test endpoint rejection
  });
});
```

### Integration Test Example

```typescript
describe('Role Protection', () => {
  it('should access /admin with admin role', async () => {
    const response = await request(app.getHttpServer())
      .get('/admin/users')
      .set('Authorization', 'Bearer ' + adminToken)
      .expect(200);
  });

  it('should reject /admin without admin role', async () => {
    const response = await request(app.getHttpServer())
      .get('/admin/users')
      .set('Authorization', 'Bearer ' + userToken)
      .expect(403);
  });
});
```

## Troubleshooting

### 403 Forbidden on Role-Protected Endpoint

1. Check if user has the role in Keycloak
2. Verify token includes the role in `realm_access.roles`
3. Ensure `KeycloakRolesGuard` is applied
4. Check role name spelling matches exactly

### Roles Not Showing in Token

1. Verify roles are assigned to the user
2. Check client has **Full Scope Allowed** or roles are in client scope
3. Ensure token is fresh (try logging out and in again)

### Composite Roles Not Working

1. Verify composite role includes the sub-roles
2. Check that associated roles are available to the client
3. Ensure proper role mappings

## References

- [Keycloak Authorization Services](https://www.keycloak.org/docs/latest/authorization_services/)
- [Role-Based Access Control](https://www.keycloak.org/docs/latest/authorization_services/#_resource_server_policies)
- [Keycloak Admin Console](http://localhost:8080/admin)

## Related Issues

- Issue #6: Update Shared Libraries for Keycloak (implements guards/decorators)
- Issue #8: Add Role-Based Access Control (this documentation)
