import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
  Injectable,
  CanActivate,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export const ROLES_KEY = 'roles';
export const PERMISSIONS_KEY = 'permissions';

export interface OrganizationPayloadDto {
  id: string;
  display_id: string;
  name: string;
  role: 'ADMIN' | 'MEMBER';
}

export interface JwtPayloadDto {
  sub: string;
  email: string;
  first_name?: string;
  last_name?: string;
  user_type?: 'PERSONAL' | 'BUSINESS';
  roles?: string[];
  permissions?: string[];
  organizations?: OrganizationPayloadDto[];
  iat: number;
  exp: number;
  jti?: string;
}

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): JwtPayloadDto => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as JwtPayloadDto;
  },
);

export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
export const Permissions = (...permissions: string[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);

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

    const request = context.switchToHttp().getRequest();
    const user = request.user as JwtPayloadDto;

    if (!user || !user.roles) {
      return false;
    }

    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user as JwtPayloadDto;

    if (!user || !user.permissions) {
      return false;
    }

    return requiredPermissions.every((perm) =>
      user.permissions?.includes(perm),
    );
  }
}

@Injectable()
export class RolesOrPermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    const request = context.switchToHttp().getRequest();
    const user = request.user as JwtPayloadDto;

    if (!user) {
      return false;
    }

    const hasRole = requiredRoles?.some((role) => user.roles?.includes(role));
    const hasPermission = requiredPermissions?.every((perm) =>
      user.permissions?.includes(perm),
    );

    if (requiredRoles && requiredPermissions) {
      return hasRole || hasPermission;
    }

    if (requiredRoles) {
      return hasRole;
    }

    if (requiredPermissions) {
      return hasPermission;
    }

    return true;
  }
}

export { hashPassword, verifyPassword } from './password';
export { JwtAuthGuard } from './guards/jwt-auth.guard';
export { JwtStrategy } from './strategies/jwt.strategy';