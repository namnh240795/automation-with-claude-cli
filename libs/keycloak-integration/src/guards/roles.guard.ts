import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { KeycloakUserInfo } from '../dto/keycloak.dto';

/**
 * Keycloak Roles metadata key
 */
export const KEYCLOAK_ROLES_KEY = 'keycloak_roles';

/**
 * Roles decorator for Keycloak
 * Specifies required roles for accessing a route
 *
 * Usage:
 * @Roles('admin', 'moderator')
 * @Get('admin-only')
 * async adminEndpoint() { ... }
 */
export const Roles = (...roles: string[]) => {
  const rolesKey = KEYCLOAK_ROLES_KEY;
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    Reflect.defineMetadata(rolesKey, roles, descriptor.value);
    return descriptor;
  };
};

/**
 * Keycloak Roles Guard
 * Checks if the authenticated user has the required roles
 *
 * The guard extracts roles from the Keycloak token's:
 * - realm_access.roles - Realm-level roles
 * - resource_access.{client}.roles - Client-specific roles
 *
 * Usage:
 * @UseGuards(KeycloakAuthGuard, KeycloakRolesGuard)
 * @Roles('admin')
 * @Get('admin-only')
 * async adminEndpoint() { ... }
 */
@Injectable()
export class KeycloakRolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Get required roles from the decorator
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      KEYCLOAK_ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // If no roles are required, allow access
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    // Get user from request
    const request = context.switchToHttp().getRequest();
    const user: KeycloakUserInfo | undefined = request.user;

    if (!user) {
      return false;
    }

    // Extract user's roles from Keycloak token
    const userRoles = this.extractUserRoles(user);

    // Check if user has any of the required roles
    return requiredRoles.some((role) => userRoles.includes(role));
  }

  /**
   * Extract roles from Keycloak user info
   * Combines realm roles and resource roles
   */
  private extractUserRoles(user: KeycloakUserInfo): string[] {
    const roles: string[] = [];

    // Add realm-level roles
    if (user.realm_access?.roles) {
      roles.push(...user.realm_access.roles);
    }

    // Add client-specific roles from resource_access
    if (user.resource_access) {
      for (const [resource, access] of Object.entries(user.resource_access)) {
        if (access && typeof access === 'object' && 'roles' in access && Array.isArray(access.roles)) {
          roles.push(...(access.roles as string[]));
        }
      }
    }

    // Return unique roles
    return [...new Set(roles)];
  }
}

/**
 * Resource-based access control decorator
 * Specifies required resource permissions for accessing a route
 *
 * Usage:
 * @Resource('projects', 'read')
 * @Get('projects')
 * async getProjects() { ... }
 */
export const RESOURCE_PERMISSION_KEY = 'resource_permission';

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
 * Resource-based access control decorator factory
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
