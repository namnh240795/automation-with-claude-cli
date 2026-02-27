import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from 'nest-keycloak-connect';
import { KeycloakUserInfo } from '../dto/keycloak.dto';

/**
 * Keycloak authentication guard
 * Re-exports the nest-keycloak-connect AuthGuard for convenience
 *
 * Usage:
 * @UseGuards(KeycloakAuthGuard)
 * @ApiBearerAuth()
 * async getProfile(@KeycloakUser() user: KeycloakUserInfo) { ... }
 */

// Re-export the AuthGuard from nest-keycloak-connect
export { AuthGuard as KeycloakAuthGuard, EnforcerOptions } from 'nest-keycloak-connect';

/**
 * Public route decorator
 * Marks a route as public, bypassing authentication
 *
 * Usage:
 * @Public()
 * @Get('health')
 * async health() { ... }
 */
export const Public = () => {
  // The nest-keycloak-connect module uses a different approach
  // For public routes, use the @Unprotected decorator from nest-keycloak-connect
  // @Unprotected() is already exported by the library
};

// Re-export the Unprotected decorator for convenience
export { Unprotected } from 'nest-keycloak-connect';
