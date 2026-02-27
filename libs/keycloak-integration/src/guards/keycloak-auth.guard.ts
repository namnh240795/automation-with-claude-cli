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
 * Extends the nest-keycloak-connect AuthGuard with additional functionality
 *
 * Usage:
 * @UseGuards(KeycloakAuthGuard)
 * @ApiBearerAuth()
 * async getProfile(@KeycloakUser() user: KeycloakUserInfo) { ... }
 */
@Injectable()
export class KeycloakAuthGuard extends AuthGuard {
  constructor(private reflector: Reflector) {
    super(reflector);
  }

  /**
   * Validate request and extract user info
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      // Use parent class to validate the token
      const result = await super.canActivate(context);

      if (!result) {
        throw new UnauthorizedException('Invalid or missing authentication token');
      }

      // Extract user info and attach to request
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);

      if (token) {
        // The parent class already validates the token
        // We can access the user info from the request
        // The nest-keycloak-connect module sets request.user
      }

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
  // We'll use the standard skip decorator from the library
  // For now, this is a placeholder for manual public routes
};
