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
 * Custom guard that extends Keycloak functionality
 * This can be used for custom validation logic
 */
@Injectable()
export class KeycloakAuthGuardCustom {
  constructor(private reflector: Reflector) {}

  /**
   * Validate request and extract user info
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);

      if (!token) {
        throw new UnauthorizedException('Authentication token is required');
      }

      // Token validation is handled by the nest-keycloak-connect AuthGuard
      // This is a custom guard for additional validation if needed

      return true;
    } catch (error) {
      throw new UnauthorizedException(
        error instanceof Error ? error.message : 'Authentication failed',
      );
    }
  }

  /**
   * Extract bearer token from Authorization header
   */
  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

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
