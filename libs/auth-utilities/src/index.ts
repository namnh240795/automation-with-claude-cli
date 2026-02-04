import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
  Injectable,
  CanActivate,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export interface JwtPayloadDto {
  user_id: string;
  organization_id: string;
  organization: string;
  organization_type: string;
  roles: string[];
}

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): JwtPayloadDto => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as JwtPayloadDto;
  },
);

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const { user }: { user: JwtPayloadDto } = context
      .switchToHttp()
      .getRequest();

    if (!user || !user.roles) {
      return false;
    }

    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}

export { hashPassword, verifyPassword } from './password';
