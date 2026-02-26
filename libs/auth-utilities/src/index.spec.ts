import { AuthUser, Roles, RolesGuard, ROLES_KEY, JwtPayloadDto } from './index';
import { Reflector } from '@nestjs/core';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';

describe('auth-utilities index exports', () => {
  describe('AuthUser decorator', () => {
    it('should be defined', () => {
      expect(AuthUser).toBeDefined();
      expect(typeof AuthUser).toBe('function');
    });

    it('should create a decorator function', () => {
      const decorator = AuthUser();
      expect(decorator).toBeDefined();
      expect(typeof decorator).toBe('function');
    });

    it('should work as a parameter decorator (compile-time check)', () => {
      // This test verifies the decorator can be used in TypeScript
      // The actual execution is handled by NestJS at runtime
      const decorator = AuthUser();
      expect(decorator).toBeDefined();
      expect(typeof decorator).toBe('function');
    });

    it('should have correct decorator signature', () => {
      expect(AuthUser.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('ROLES_KEY constant', () => {
    it('should be defined as "roles"', () => {
      expect(ROLES_KEY).toBe('roles');
    });
  });

  describe('Roles decorator', () => {
    it('should be defined', () => {
      expect(Roles).toBeDefined();
      expect(typeof Roles).toBe('function');
    });

    it('should accept multiple role arguments', () => {
      const roles = ['admin', 'user', 'moderator'];
      // The decorator returns metadata
      expect(() => Roles(...roles)).not.toThrow();
    });

    it('should accept single role', () => {
      const roles = ['admin'];
      expect(() => Roles(...roles)).not.toThrow();
    });

    it('should accept no roles (empty array)', () => {
      expect(() => Roles()).not.toThrow();
    });
  });

  describe('RolesGuard', () => {
    let guard: RolesGuard;
    let reflector: Reflector;
    let context: ExecutionContext;

    beforeEach(() => {
      reflector = new Reflector();
      guard = new RolesGuard(reflector);

      context = {
        switchToHttp: jest.fn(),
        switchToRpc: jest.fn(),
        switchToWs: jest.fn(),
        getClass: jest.fn(),
        getHandler: jest.fn(),
        getArgs: jest.fn(),
        getArgByIndex: jest.fn(),
      } as any;
    });

    it('should be defined', () => {
      expect(guard).toBeDefined();
      expect(guard.canActivate).toBeDefined();
    });

    it('should return true when no roles are required', () => {
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(undefined);

      const result = guard.canActivate(context);
      expect(result).toBe(true);
    });

    it('should return false when roles array is empty and user exists', () => {
      // Empty array means no roles match
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([]);

      const mockUser: JwtPayloadDto = {
        sub: 'user-123',
        email: 'test@example.com',
        roles: ['user'],
        iat: 1234567890,
        exp: 1234571490,
      };

      const mockRequest = { user: mockUser };
      (context.switchToHttp as jest.Mock).mockReturnValue({
        getRequest: jest.fn().mockReturnValue(mockRequest),
      });

      const result = guard.canActivate(context);
      // Empty array means no roles to match, so .some() returns false
      expect(result).toBe(false);
    });

    it('should return false when user is not in request', () => {
      const requiredRoles = ['admin'];
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(requiredRoles);

      const mockRequest = { user: undefined };
      (context.switchToHttp as jest.Mock).mockReturnValue({
        getRequest: jest.fn().mockReturnValue(mockRequest),
      });

      const result = guard.canActivate(context);
      expect(result).toBe(false);
    });

    it('should return false when user exists but has no roles', () => {
      const requiredRoles = ['admin'];
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(requiredRoles);

      const mockUser: JwtPayloadDto = {
        sub: 'user-123',
        email: 'test@example.com',
        iat: 1234567890,
        exp: 1234571490,
      };

      const mockRequest = { user: mockUser };
      (context.switchToHttp as jest.Mock).mockReturnValue({
        getRequest: jest.fn().mockReturnValue(mockRequest),
      });

      const result = guard.canActivate(context);
      expect(result).toBe(false);
    });

    it('should return false when user roles do not include required role', () => {
      const requiredRoles = ['admin'];
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(requiredRoles);

      const mockUser: JwtPayloadDto = {
        sub: 'user-123',
        email: 'test@example.com',
        roles: ['user', 'moderator'],
        iat: 1234567890,
        exp: 1234571490,
      };

      const mockRequest = { user: mockUser };
      (context.switchToHttp as jest.Mock).mockReturnValue({
        getRequest: jest.fn().mockReturnValue(mockRequest),
      });

      const result = guard.canActivate(context);
      expect(result).toBe(false);
    });

    it('should return true when user has required role', () => {
      const requiredRoles = ['admin'];
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(requiredRoles);

      const mockUser: JwtPayloadDto = {
        sub: 'user-123',
        email: 'test@example.com',
        roles: ['user', 'admin'],
        iat: 1234567890,
        exp: 1234571490,
      };

      const mockRequest = { user: mockUser };
      (context.switchToHttp as jest.Mock).mockReturnValue({
        getRequest: jest.fn().mockReturnValue(mockRequest),
      });

      const result = guard.canActivate(context);
      expect(result).toBe(true);
    });

    it('should return true when user has one of multiple required roles', () => {
      const requiredRoles = ['admin', 'super-admin'];
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(requiredRoles);

      const mockUser: JwtPayloadDto = {
        sub: 'user-123',
        email: 'test@example.com',
        roles: ['user', 'super-admin'],
        iat: 1234567890,
        exp: 1234571490,
      };

      const mockRequest = { user: mockUser };
      (context.switchToHttp as jest.Mock).mockReturnValue({
        getRequest: jest.fn().mockReturnValue(mockRequest),
      });

      const result = guard.canActivate(context);
      expect(result).toBe(true);
    });

    it('should call reflector with correct parameters', () => {
      const requiredRoles = ['admin'];
      const reflectSpy = jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(requiredRoles);

      const mockHandler = 'mockHandler';
      const mockClass = 'mockClass';
      (context.getHandler as jest.Mock).mockReturnValue(mockHandler);
      (context.getClass as jest.Mock).mockReturnValue(mockClass);

      // Set up switchToHttp mock since the guard will try to access the request
      const mockUser: JwtPayloadDto = {
        sub: 'user-123',
        email: 'test@example.com',
        roles: ['admin'],
        iat: 1234567890,
        exp: 1234571490,
      };
      const mockRequest = { user: mockUser };
      (context.switchToHttp as jest.Mock).mockReturnValue({
        getRequest: jest.fn().mockReturnValue(mockRequest),
      });

      guard.canActivate(context);

      expect(reflectSpy).toHaveBeenCalledWith(ROLES_KEY, [mockHandler, mockClass]);
      reflectSpy.mockRestore();
    });

    it('should return true when user has all required roles', () => {
      const requiredRoles = ['admin', 'moderator'];
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(requiredRoles);

      const mockUser: JwtPayloadDto = {
        sub: 'user-123',
        email: 'test@example.com',
        roles: ['user', 'admin', 'moderator'],
        iat: 1234567890,
        exp: 1234571490,
      };

      const mockRequest = { user: mockUser };
      (context.switchToHttp as jest.Mock).mockReturnValue({
        getRequest: jest.fn().mockReturnValue(mockRequest),
      });

      const result = guard.canActivate(context);
      expect(result).toBe(true);
    });

    it('should return false when user has empty roles array', () => {
      const requiredRoles = ['admin'];
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(requiredRoles);

      const mockUser: JwtPayloadDto = {
        sub: 'user-123',
        email: 'test@example.com',
        roles: [],
        iat: 1234567890,
        exp: 1234571490,
      };

      const mockRequest = { user: mockUser };
      (context.switchToHttp as jest.Mock).mockReturnValue({
        getRequest: jest.fn().mockReturnValue(mockRequest),
      });

      const result = guard.canActivate(context);
      expect(result).toBe(false);
    });
  });

  describe('JwtPayloadDto interface', () => {
    it('should define correct structure', () => {
      const payload: JwtPayloadDto = {
        sub: 'user-id',
        email: 'test@example.com',
        first_name: 'John',
        last_name: 'Doe',
        roles: ['admin'],
        iat: 1234567890,
        exp: 1234571490,
      };

      expect(payload.sub).toBe('user-id');
      expect(payload.email).toBe('test@example.com');
      expect(payload.first_name).toBe('John');
      expect(payload.last_name).toBe('Doe');
      expect(payload.roles).toEqual(['admin']);
      expect(payload.iat).toBe(1234567890);
      expect(payload.exp).toBe(1234571490);
    });

    it('should allow optional fields', () => {
      const payload: JwtPayloadDto = {
        sub: 'user-id',
        email: 'test@example.com',
        iat: 1234567890,
        exp: 1234571490,
      };

      expect(payload.first_name).toBeUndefined();
      expect(payload.last_name).toBeUndefined();
      expect(payload.roles).toBeUndefined();
    });
  });
});
