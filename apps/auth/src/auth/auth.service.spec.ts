import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { SignUpDto, SignInDto } from '../dto';

// Mock the logger decorator to reduce console spam
jest.mock('@app/app-logger', () => ({
  LogActivity: () => {
    return function (
      target: any,
      propertyKey: string,
      descriptor: PropertyDescriptor
    ) {
      const originalMethod = descriptor.value;
      descriptor.value = function (...args: any[]) {
        return originalMethod.apply(this, args);
      };
      return descriptor;
    };
  },
}));

// Mock bcrypt at module level
jest.mock('bcrypt', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let prisma: PrismaService;
  let jwtService: JwtService;

  // Mock user data
  const mockUser = {
    id: '550e8400-e29b-41d4-a716-446655440000',
    email: 'test@example.com',
    password_hash: '$2b$10$abcdefghijklmnopqrstuvwxyz123456',
    first_name: 'John',
    last_name: 'Doe',
    is_active: true,
    email_verified: false,
    created_at: new Date(),
    updated_at: new Date(),
  };

  const mockRefreshToken = {
    id: '1',
    token: 'refresh-token-123',
    user_id: mockUser.id,
    expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    revoked_at: null,
    user: mockUser,
  };

  beforeEach(async () => {
    // Set required environment variables
    process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test_db';
    process.env.JWT_SECRET = 'test-jwt-secret';
    process.env.JWT_REFRESH_SECRET = 'test-refresh-secret';
    process.env.JWT_EXPIRES_IN = '1h';
    process.env.JWT_REFRESH_EXPIRES_IN = '7d';

    // Reset bcrypt mocks
    (bcrypt.hash as jest.Mock).mockResolvedValue(mockUser.password_hash as never);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true as never);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
              create: jest.fn(),
            },
            refresh_token: {
              create: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              updateMany: jest.fn(),
            },
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
            verifyAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('AuthService', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('signUp', () => {
    const signUpDto: SignUpDto = {
      email: 'test@example.com',
      password: 'SecurePass123',
      first_name: 'John',
      last_name: 'Doe',
    };

    it('should successfully create a new user', async () => {
      // Arrange
      prisma.user.findUnique = jest.fn().mockResolvedValue(null);
      prisma.user.create = jest.fn().mockResolvedValue(mockUser);

      // Act
      const result = await service.signUp(signUpDto);

      // Assert
      expect(result).toEqual(mockUser);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: signUpDto.email },
      });
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          email: signUpDto.email,
          password_hash: mockUser.password_hash,
          first_name: signUpDto.first_name,
          last_name: signUpDto.last_name,
          is_active: true,
          email_verified: false,
        },
        select: {
          id: true,
          email: true,
          first_name: true,
          last_name: true,
          is_active: true,
          email_verified: true,
          created_at: true,
          updated_at: true,
        },
      });
    });

    it('should create user without optional fields', async () => {
      // Arrange
      const signUpDtoWithoutNames: SignUpDto = {
        email: 'test@example.com',
        password: 'SecurePass123',
      };
      prisma.user.findUnique = jest.fn().mockResolvedValue(null);
      prisma.user.create = jest.fn().mockResolvedValue({
        ...mockUser,
        first_name: undefined,
        last_name: undefined,
      });

      // Act
      const result = await service.signUp(signUpDtoWithoutNames);

      // Assert
      expect(result).toBeDefined();
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          first_name: undefined,
          last_name: undefined,
        }),
        select: expect.anything(),
      });
    });

    it('should throw ConflictException if user already exists', async () => {
      // Arrange
      prisma.user.findUnique = jest.fn().mockResolvedValue(mockUser);

      // Act & Assert
      await expect(service.signUp(signUpDto)).rejects.toThrow(ConflictException);
      await expect(service.signUp(signUpDto)).rejects.toThrow('User with this email already exists');
    });

    it('should hash password before storing', async () => {
      // Arrange
      prisma.user.findUnique = jest.fn().mockResolvedValue(null);
      prisma.user.create = jest.fn().mockResolvedValue(mockUser);

      // Act
      await service.signUp(signUpDto);

      // Assert
      expect(bcrypt.hash).toHaveBeenCalledWith(signUpDto.password, 10);
    });
  });

  describe('signIn', () => {
    const signInDto: SignInDto = {
      email: 'test@example.com',
      password: 'SecurePass123',
    };

    it('should successfully sign in with valid credentials', async () => {
      // Arrange
      prisma.user.findUnique = jest.fn().mockResolvedValue(mockUser);
      jwtService.signAsync = jest.fn()
        .mockResolvedValueOnce('access-token-123')
        .mockResolvedValueOnce('refresh-token-123');
      prisma.refresh_token.create = jest.fn().mockResolvedValue({});

      // Act
      const result = await service.signIn(signInDto);

      // Assert
      expect(result).toHaveProperty('access_token', 'access-token-123');
      expect(result).toHaveProperty('refresh_token', 'refresh-token-123');
      expect(result).toHaveProperty('token_type', 'Bearer');
      expect(result).toHaveProperty('expires_in', 3600);
    });

    it('should throw UnauthorizedException if user does not exist', async () => {
      // Arrange
      prisma.user.findUnique = jest.fn().mockResolvedValue(null);

      // Act & Assert
      await expect(service.signIn(signInDto)).rejects.toThrow(UnauthorizedException);
      await expect(service.signIn(signInDto)).rejects.toThrow('Invalid credentials');
    });

    it('should throw UnauthorizedException if password is invalid', async () => {
      // Arrange
      prisma.user.findUnique = jest.fn().mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false as never);

      // Act & Assert
      await expect(service.signIn(signInDto)).rejects.toThrow(UnauthorizedException);
      await expect(service.signIn(signInDto)).rejects.toThrow('Invalid credentials');
    });

    it('should throw UnauthorizedException if user is inactive', async () => {
      // Arrange
      const inactiveUser = { ...mockUser, is_active: false };
      prisma.user.findUnique = jest.fn().mockResolvedValue(inactiveUser);

      // Act & Assert
      await expect(service.signIn(signInDto)).rejects.toThrow(UnauthorizedException);
      await expect(service.signIn(signInDto)).rejects.toThrow('User account is inactive');
    });

    it('should store refresh token in database', async () => {
      // Arrange
      prisma.user.findUnique = jest.fn().mockResolvedValue(mockUser);
      jwtService.signAsync = jest.fn()
        .mockResolvedValueOnce('access-token-123')
        .mockResolvedValueOnce('refresh-token-123');
      const createSpy = prisma.refresh_token.create = jest.fn().mockResolvedValue({});

      // Act
      await service.signIn(signInDto);

      // Assert
      expect(createSpy).toHaveBeenCalledWith({
        data: expect.objectContaining({
          token: 'refresh-token-123',
          user_id: mockUser.id,
          expires_at: expect.any(Date),
        }),
      });
    });
  });

  describe('refreshAccessToken', () => {
    const validRefreshToken = 'valid-refresh-token';
    const mockPayload = {
      sub: mockUser.id,
      email: mockUser.email,
      first_name: mockUser.first_name,
      last_name: mockUser.last_name,
    };

    it('should successfully refresh access token with valid refresh token', async () => {
      // Arrange
      jwtService.verifyAsync = jest.fn().mockResolvedValue(mockPayload);
      prisma.refresh_token.findUnique = jest.fn().mockResolvedValue(mockRefreshToken);
      jwtService.signAsync = jest.fn()
        .mockResolvedValueOnce('new-access-token')
        .mockResolvedValueOnce('new-refresh-token');
      prisma.refresh_token.update = jest.fn().mockResolvedValue({});
      prisma.refresh_token.create = jest.fn().mockResolvedValue({});

      // Act
      const result = await service.refreshAccessToken(validRefreshToken);

      // Assert
      expect(result).toHaveProperty('access_token', 'new-access-token');
      expect(result).toHaveProperty('refresh_token', 'new-refresh-token');
      expect(prisma.refresh_token.update).toHaveBeenCalledWith({
        where: { id: mockRefreshToken.id },
        data: { revoked_at: expect.any(Date) },
      });
    });

    it('should throw UnauthorizedException if refresh token is invalid', async () => {
      // Arrange
      jwtService.verifyAsync = jest.fn().mockRejectedValue(new Error('Invalid token'));

      // Act & Assert
      await expect(service.refreshAccessToken(validRefreshToken)).rejects.toThrow(UnauthorizedException);
      await expect(service.refreshAccessToken(validRefreshToken)).rejects.toThrow('Invalid refresh token');
    });

    it('should throw UnauthorizedException if refresh token not found in database', async () => {
      // Arrange
      jwtService.verifyAsync = jest.fn().mockResolvedValue(mockPayload);
      prisma.refresh_token.findUnique = jest.fn().mockResolvedValue(null);

      // Act & Assert
      await expect(service.refreshAccessToken(validRefreshToken)).rejects.toThrow(UnauthorizedException);
      await expect(service.refreshAccessToken(validRefreshToken)).rejects.toThrow('Invalid refresh token');
    });

    it('should throw UnauthorizedException if refresh token is revoked', async () => {
      // Arrange
      const revokedToken = { ...mockRefreshToken, revoked_at: new Date() };
      jwtService.verifyAsync = jest.fn().mockResolvedValue(mockPayload);
      prisma.refresh_token.findUnique = jest.fn().mockResolvedValue(revokedToken);

      // Act & Assert
      await expect(service.refreshAccessToken(validRefreshToken)).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if refresh token is expired', async () => {
      // Arrange
      const expiredToken = { ...mockRefreshToken, expires_at: new Date(Date.now() - 1000) };
      jwtService.verifyAsync = jest.fn().mockResolvedValue(mockPayload);
      prisma.refresh_token.findUnique = jest.fn().mockResolvedValue(expiredToken);

      // Act & Assert
      await expect(service.refreshAccessToken(validRefreshToken)).rejects.toThrow(UnauthorizedException);
      await expect(service.refreshAccessToken(validRefreshToken)).rejects.toThrow('Refresh token expired');
    });

    it('should throw UnauthorizedException if user is inactive', async () => {
      // Arrange
      const inactiveUserToken = { ...mockRefreshToken, user: { ...mockUser, is_active: false } };
      jwtService.verifyAsync = jest.fn().mockResolvedValue(mockPayload);
      prisma.refresh_token.findUnique = jest.fn().mockResolvedValue(inactiveUserToken);

      // Act & Assert
      await expect(service.refreshAccessToken(validRefreshToken)).rejects.toThrow(UnauthorizedException);
      await expect(service.refreshAccessToken(validRefreshToken)).rejects.toThrow('User account is inactive');
    });

    it('should revoke old refresh token and create new one', async () => {
      // Arrange
      jwtService.verifyAsync = jest.fn().mockResolvedValue(mockPayload);
      prisma.refresh_token.findUnique = jest.fn().mockResolvedValue(mockRefreshToken);
      const updateSpy = prisma.refresh_token.update = jest.fn().mockResolvedValue({});
      const createSpy = prisma.refresh_token.create = jest.fn().mockResolvedValue({});
      jwtService.signAsync = jest.fn()
        .mockResolvedValueOnce('new-access-token')
        .mockResolvedValueOnce('new-refresh-token');

      // Act
      await service.refreshAccessToken(validRefreshToken);

      // Assert
      expect(updateSpy).toHaveBeenCalled();
      expect(createSpy).toHaveBeenCalled();
    });
  });

  describe('logout', () => {
    const refreshToken = 'refresh-token-to-revoke';

    it('should successfully revoke refresh token', async () => {
      // Arrange
      prisma.refresh_token.updateMany = jest.fn().mockResolvedValue({ count: 1 });

      // Act
      await service.logout(refreshToken);

      // Assert
      expect(prisma.refresh_token.updateMany).toHaveBeenCalledWith({
        where: { token: refreshToken },
        data: { revoked_at: expect.any(Date) },
      });
    });

    it('should not throw error if refresh token does not exist', async () => {
      // Arrange
      prisma.refresh_token.updateMany = jest.fn().mockResolvedValue({ count: 0 });

      // Act & Assert - should not throw
      await expect(service.logout(refreshToken)).resolves.toBeUndefined();
    });
  });

  describe('generateTokens (private method behavior tested through public methods)', () => {
    it('should generate access token with correct payload', async () => {
      // Arrange
      prisma.user.findUnique = jest.fn().mockResolvedValue(mockUser);
      jwtService.signAsync = jest.fn()
        .mockResolvedValueOnce('access-token')
        .mockResolvedValueOnce('refresh-token');
      prisma.refresh_token.create = jest.fn().mockResolvedValue({});

      const signInDto: SignInDto = { email: 'test@example.com', password: 'password' };

      // Act
      await service.signIn(signInDto);

      // Assert
      expect(jwtService.signAsync).toHaveBeenCalledWith(
        expect.objectContaining({
          sub: mockUser.id,
          email: mockUser.email,
          first_name: mockUser.first_name,
          last_name: mockUser.last_name,
        }),
        expect.objectContaining({
          secret: process.env.JWT_SECRET,
          expiresIn: '1h',
        })
      );
    });

    it('should generate refresh token with correct expiration', async () => {
      // Arrange
      prisma.user.findUnique = jest.fn().mockResolvedValue(mockUser);
      jwtService.signAsync = jest.fn()
        .mockResolvedValueOnce('access-token')
        .mockResolvedValueOnce('refresh-token');
      prisma.refresh_token.create = jest.fn().mockResolvedValue({});

      const signInDto: SignInDto = { email: 'test@example.com', password: 'password' };

      // Act
      await service.signIn(signInDto);

      // Assert
      expect(jwtService.signAsync).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          secret: process.env.JWT_REFRESH_SECRET,
          expiresIn: '7d',
        })
      );
    });

    it('should use fallback expiration values when env vars are not set', async () => {
      // Arrange - delete env vars to test fallback
      const originalJwtExpiresIn = process.env.JWT_EXPIRES_IN;
      const originalJwtRefreshExpiresIn = process.env.JWT_REFRESH_EXPIRES_IN;
      delete process.env.JWT_EXPIRES_IN;
      delete process.env.JWT_REFRESH_EXPIRES_IN;

      prisma.user.findUnique = jest.fn().mockResolvedValue(mockUser);
      jwtService.signAsync = jest.fn()
        .mockResolvedValueOnce('access-token')
        .mockResolvedValueOnce('refresh-token');
      prisma.refresh_token.create = jest.fn().mockResolvedValue({});

      const signInDto: SignInDto = { email: 'test@example.com', password: 'password' };

      // Act
      await service.signIn(signInDto);

      // Restore env vars
      if (originalJwtExpiresIn) process.env.JWT_EXPIRES_IN = originalJwtExpiresIn;
      if (originalJwtRefreshExpiresIn) process.env.JWT_REFRESH_EXPIRES_IN = originalJwtRefreshExpiresIn;

      // Assert - verify fallback values are used
      expect(jwtService.signAsync).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          secret: process.env.JWT_SECRET,
          expiresIn: '1h', // Fallback value
        })
      );
      expect(jwtService.signAsync).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          secret: process.env.JWT_REFRESH_SECRET,
          expiresIn: '7d', // Fallback value
        })
      );
    });

    it('should return correct token response structure', async () => {
      // Arrange
      prisma.user.findUnique = jest.fn().mockResolvedValue(mockUser);
      jwtService.signAsync = jest.fn()
        .mockResolvedValueOnce('access-token')
        .mockResolvedValueOnce('refresh-token');
      prisma.refresh_token.create = jest.fn().mockResolvedValue({});

      const signInDto: SignInDto = { email: 'test@example.com', password: 'password' };

      // Act
      const result = await service.signIn(signInDto);

      // Assert
      expect(result).toMatchObject({
        access_token: 'access-token',
        refresh_token: 'refresh-token',
        token_type: 'Bearer',
        expires_in: 3600,
      });
    });
  });
});
