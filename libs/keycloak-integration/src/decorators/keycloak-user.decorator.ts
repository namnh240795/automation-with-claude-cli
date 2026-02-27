import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { KeycloakUserInfo } from '../dto/keycloak.dto';

/**
 * Decorator to extract the authenticated Keycloak user from the request
 *
 * Usage:
 * @UseGuards(KeycloakAuthGuard)
 * @Get('profile')
 * async getProfile(@KeycloakUser() user: KeycloakUserInfo) {
 *   return { user_id: user.sub, email: user.email };
 * }
 */
export const KeycloakUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): KeycloakUserInfo => {
    const request = ctx.switchToHttp().getRequest();

    // The nest-keycloak-connect module attaches user info to the request
    // The structure may vary, so we'll normalize it
    if (!request.user) {
      throw new Error('User information not found in request');
    }

    // Return the user object as KeycloakUserInfo
    return request.user as KeycloakUserInfo;
  },
);

/**
 * Decorator to extract the user's ID (sub) from the Keycloak token
 *
 * Usage:
 * @Get('my-data')
 * async getMyData(@KeycloakUserId() userId: string) {
 *   return this.service.getDataByUser(userId);
 * }
 */
export const KeycloakUserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();

    if (!request.user?.sub) {
      throw new Error('User ID not found in request');
    }

    return request.user.sub;
  },
);

/**
 * Decorator to extract user's roles from Keycloak token
 *
 * Usage:
 * @Get('admin-only')
 * @Roles('admin')
 * async adminEndpoint(@KeycloakRoles() roles: string[]) {
 *   console.log('User roles:', roles);
 * }
 */
export const KeycloakRoles = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string[] => {
    const request = ctx.switchToHttp().getRequest();

    // Extract roles from realm_access
    const realmRoles = request.user?.realm_access?.roles || [];

    // Extract roles from resource_access (client-specific)
    const resourceAccess = request.user?.resource_access || {};
    const clientRoles: string[] = [];

    for (const [resource, access] of Object.entries(resourceAccess)) {
      if (access.roles && Array.isArray(access.roles)) {
        clientRoles.push(...access.roles);
      }
    }

    // Combine all roles
    return [...new Set([...realmRoles, ...clientRoles])];
  },
);

/**
 * Decorator to extract the user's email from Keycloak token
 *
 * Usage:
 * @Get('my-email')
 * async getMyEmail(@KeycloakEmail() email: string) {
 *   return { email };
 * }
 */
export const KeycloakEmail = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();

    if (!request.user?.email) {
      throw new Error('User email not found in request');
    }

    return request.user.email;
  },
);
