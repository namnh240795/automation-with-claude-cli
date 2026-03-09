import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { KeycloakUserInfo } from '../dto/keycloak.dto';

/**
 * Scope metadata key
 */
export const SCOPES_KEY = 'keycloak_scopes';

/**
 * Scopes decorator for Keycloak
 * Specifies required OAuth2 scopes for accessing a route
 *
 * Usage:
 * @Scopes('profile:read', 'profile:write')
 * @Get('profile')
 * async getProfile() { ... }
 */
export const Scopes = (...scopes: string[]) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    Reflect.defineMetadata(SCOPES_KEY, scopes, descriptor.value);
    return descriptor;
  };
};

/**
 * Single scope decorator for Keycloak
 * Specifies a single required OAuth2 scope for accessing a route
 *
 * Usage:
 * @Scope('profile:read')
 * @Get('profile')
 * async getProfile() { ... }
 */
export const Scope = (scope: string) => {
  return Scopes(scope);
};

/**
 * Keycloak Scopes Guard
 * Checks if the authenticated user has the required OAuth2 scopes
 *
 * The guard extracts scopes from the Keycloak token's:
 * - scope claim - Space-separated list of granted scopes
 * - allowed_scopes claim - Custom claim with allowed scopes
 * - client_id - For client-specific scopes
 *
 * Usage:
 * @UseGuards(KeycloakAuthGuard, KeycloakScopesGuard)
 * @Scope('profile:read')
 * @Get('profile')
 * async getProfile() { ... }
 *
 * OR with multiple scopes (any one required):
 * @UseGuards(KeycloakAuthGuard, KeycloakScopesGuard)
 * @Scopes('profile:read', 'profile:write')
 * @Get('profile')
 * async getProfile() { ... }
 */
@Injectable()
export class KeycloakScopesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Get required scopes from the decorator
    const requiredScopes = this.reflector.getAllAndOverride<string[]>(
      SCOPES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // If no scopes are required, allow access
    if (!requiredScopes || requiredScopes.length === 0) {
      return true;
    }

    // Get user from request
    const request = context.switchToHttp().getRequest();
    const user: KeycloakUserInfo | undefined = request.user;

    if (!user) {
      return false;
    }

    // Extract user's scopes from Keycloak token
    const userScopes = this.extractUserScopes(user, request);

    // Check if user has any of the required scopes (OR logic)
    return requiredScopes.some((scope) => userScopes.includes(scope));
  }

  /**
   * Extract scopes from Keycloak user info
   * Checks multiple claim locations for flexibility
   */
  private extractUserScopes(user: KeycloakUserInfo, request: any): string[] {
    const scopes: string[] = [];

    // Check for 'scope' claim (space-separated)
    if (request.user?.scope) {
      const scopeClaim = request.user.scope;
      if (typeof scopeClaim === 'string') {
        scopes.push(...scopeClaim.split(' ').filter(Boolean));
      }
    }

    // Check for 'allowed_scopes' custom claim (array or space-separated)
    if (request.user?.allowed_scopes) {
      const allowedScopes = request.user.allowed_scopes;
      if (Array.isArray(allowedScopes)) {
        scopes.push(...allowedScopes);
      } else if (typeof allowedScopes === 'string') {
        scopes.push(...allowedScopes.split(' ').filter(Boolean));
      }
    }

    // Check client-specific scopes from resource_access
    if (user.resource_access) {
      for (const [resource, access] of Object.entries(user.resource_access)) {
        if (access && typeof access === 'object' && 'roles' in access) {
          // Convert roles to scope format (e.g., "resource:role")
          const roles = Array.isArray(access.roles) ? access.roles : [];
          roles.forEach((role: string) => {
            scopes.push(`${resource}:${role}`);
          });
        }
      }
    }

    // Add standard OIDC scopes (always present for authenticated users)
    scopes.push('openid', 'profile', 'email');

    // Return unique scopes
    return [...new Set(scopes)];
  }
}
