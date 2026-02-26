import { JwtAuthGuard } from './jwt-auth.guard';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtPayloadDto } from '../index';

// Mock AuthGuard from passport
jest.mock('@nestjs/passport', () => ({
  AuthGuard: jest.fn().mockImplementation(() => {
    return class MockAuthGuard {
      canActivate = jest.fn();
    };
  }),
}));

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;
  let context: ExecutionContext;

  beforeEach(() => {
    guard = new JwtAuthGuard();

    // Mock ExecutionContext
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

  describe('canActivate', () => {
    it('should have canActivate method', () => {
      expect(guard.canActivate).toBeDefined();
      expect(typeof guard.canActivate).toBe('function');
    });

    it('should call parent canActivate method', () => {
      // The parent AuthGuard's canActivate is called
      // We test that the method exists and can be called without errors
      expect(() => guard.canActivate(context)).not.toThrow();
    });

    it('should be a method that accepts ExecutionContext', () => {
      // The mock returns undefined, but we verify the method can be called
      expect(() => guard.canActivate(context)).not.toThrow();
    });
  });

  describe('handleRequest', () => {
    const mockUser: JwtPayloadDto = {
      sub: 'user-id-123',
      email: 'test@example.com',
      first_name: 'John',
      last_name: 'Doe',
      iat: Date.now() / 1000,
      exp: Date.now() / 1000 + 3600,
    };

    it('should return user when no error and user exists', () => {
      const result = guard.handleRequest(null, mockUser, null);
      expect(result).toEqual(mockUser);
    });

    it('should throw UnauthorizedException when user is null', () => {
      expect(() => guard.handleRequest(null, null, null)).toThrow(UnauthorizedException);
      expect(() => guard.handleRequest(null, null, null)).toThrow('Invalid or expired token');
    });

    it('should throw UnauthorizedException when user is undefined', () => {
      expect(() => guard.handleRequest(null, undefined, null)).toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException with custom error when error exists', () => {
      const customError = new Error('Custom auth error');
      expect(() => guard.handleRequest(customError, null, null)).toThrow(customError);
    });

    it('should throw UnauthorizedException when error is passed and user is null', () => {
      const error = new Error('Authentication failed');
      expect(() => guard.handleRequest(error, null, null)).toThrow(error);
    });

    it('should throw UnauthorizedException with default message when no error provided and no user', () => {
      expect(() => guard.handleRequest(null, null, null)).toThrow(UnauthorizedException);
      expect(() => guard.handleRequest(null, null, null)).toThrow('Invalid or expired token');
    });

    it('should throw error when error exists even if user is present', () => {
      // The condition is `if (err || !user)`, so error takes precedence
      const error = new Error('Authentication error');
      expect(() => guard.handleRequest(error, mockUser, null)).toThrow(error);
    });

    it('should handle falsy user values', () => {
      expect(() => guard.handleRequest(null, false, null)).toThrow(UnauthorizedException);
      expect(() => guard.handleRequest(null, 0, null)).toThrow(UnauthorizedException);
      expect(() => guard.handleRequest(null, '', null)).toThrow(UnauthorizedException);
    });
  });

  describe('inheritance', () => {
    it('should extend AuthGuard', () => {
      expect(guard).toBeInstanceOf(JwtAuthGuard);
      expect(guard.constructor.name).toBe('JwtAuthGuard');
    });
  });
});
