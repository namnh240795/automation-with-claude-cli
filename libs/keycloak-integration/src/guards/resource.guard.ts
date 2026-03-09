import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { KeycloakUserInfo } from '../dto/keycloak.dto';

/**
 * Resource permission metadata key
 */
export const RESOURCE_PERMISSION_KEY = 'resource_permission';

/**
 * Resource-based authorization decorator
 * Specifies required resource permissions for accessing a route
 * Uses Keycloak Authorization Services for fine-grained permissions
 *
 * This decorator works with Keycloak's Authorization Services:
 * - Resources: Protected entities (e.g., cms_content, user_data, system_settings)
 * - Scopes: Actions on resources (e.g., view, create, edit, delete, publish)
 * - Policies: Rules that grant permissions (e.g., editor_policy, publisher_policy)
 *
 * Usage:
 * @Resource('cms_content', 'delete')
 * @Delete('content/:id')
 * async deleteContent() { ... }
 */
export const Resource = (resource: string, scope: string) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    Reflect.defineMetadata(
      RESOURCE_PERMISSION_KEY,
      { resource, scope },
      descriptor.value,
    );
    return descriptor;
  };
};

/**
 * Resource-based authorization decorator factory
 * Creates a decorator for a specific resource
 *
 * Usage:
 * const ProjectsResource = createResourceDecorator('projects');
 *
 * @ProjectsResource('read')
 * @Get('projects')
 * async getProjects() { ... }
 */
export const createResourceDecorator = (resource: string) => {
  return (scope: string) => Resource(resource, scope);
};

/**
 * Resource Permission metadata structure
 */
export interface ResourcePermission {
  resource: string;
  scope: string;
}

/**
 * Authorization response from Keycloak
 */
export interface AuthorizationResponse {
  permissions: ResourcePermission[];
}

/**
 * Keycloak Resource Guard
 * Checks if the authenticated user has required resource permissions
 *
 * This guard evaluates permissions using Keycloak Authorization Services.
 * It can work with:
 * 1. JWT claims (rpt - Requesting Party Token)
 * 2. Online introspection (calls Keycloak to check permissions)
 * 3. Cached permissions in token
 *
 * Usage:
 * @UseGuards(KeycloakAuthGuard, KeycloakResourceGuard)
 * @Resource('cms_content', 'delete')
 * @Delete('content/:id')
 * async deleteContent() { ... }
 */
@Injectable()
export class KeycloakResourceGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Get required resource permission from the decorator
    const requiredPermission = this.reflector.getAllAndOverride<ResourcePermission>(
      RESOURCE_PERMISSION_KEY,
      [context.getHandler(), context.getClass()],
    );

    // If no resource permission is required, allow access
    if (!requiredPermission) {
      return true;
    }

    // Get user from request
    const request = context.switchToHttp().getRequest();
    const user: KeycloakUserInfo | undefined = request.user;

    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    // Extract permissions from token
    const permissions = this.extractPermissions(user);

    // Check if user has the required permission
    const hasPermission = permissions.some(
      (perm) =>
        perm.resource === requiredPermission.resource &&
        perm.scope === requiredPermission.scope,
    );

    if (!hasPermission) {
      throw new ForbiddenException(
        `Missing required permission: ${requiredPermission.resource}:${requiredPermission.scope}`,
      );
    }

    return true;
  }

  /**
   * Extract resource permissions from Keycloak token
   * Checks multiple claim locations for flexibility
   */
  private extractPermissions(user: KeycloakUserInfo): ResourcePermission[] {
    const permissions: ResourcePermission[] = [];

    // Check for authorization claim (Keycloak Authorization Services)
    if (user.resource_access) {
      for (const [resource, access] of Object.entries(user.resource_access)) {
        if (access && typeof access === 'object' && 'roles' in access) {
          const roles = Array.isArray(access.roles) ? access.roles : [];
          // Convert client roles to resource permissions
          roles.forEach((role) => {
            permissions.push({ resource, scope: role });
          });
        }
      }
    }

    // Check for realm roles as system-wide permissions
    if (user.realm_access?.roles) {
      user.realm_access.roles.forEach((role) => {
        permissions.push({ resource: 'system', scope: role });
      });
    }

    return permissions;
  }
}

/**
 * Require all specified permissions (AND logic)
 * Unlike @Resource which requires one permission, this requires all
 *
 * Usage:
 * @RequireAllPermissions(
 *   { resource: 'cms_content', scope: 'read' },
 *   { resource: 'cms_content', scope: 'write' }
 * )
 * @Put('content/:id')
 * async updateContent() { ... }
 */
export const RequireAllPermissions = (...requiredPermissions: ResourcePermission[]) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    Reflect.defineMetadata(
      RESOURCE_PERMISSION_KEY,
      { permissions: requiredPermissions, mode: 'all' },
      descriptor.value,
    );
    return descriptor;
  };
};

/**
 * Require any specified permission (OR logic)
 * Similar to @Resource but accepts multiple permissions
 *
 * Usage:
 * @RequireAnyPermission(
 *   { resource: 'cms_content', scope: 'delete' },
 *   { resource: 'system', scope: 'admin' }
 * )
 * @Delete('content/:id')
 * async deleteContent() { ... }
 */
export const RequireAnyPermission = (...requiredPermissions: ResourcePermission[]) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    Reflect.defineMetadata(
      RESOURCE_PERMISSION_KEY,
      { permissions: requiredPermissions, mode: 'any' },
      descriptor.value,
    );
    return descriptor;
  };
};
