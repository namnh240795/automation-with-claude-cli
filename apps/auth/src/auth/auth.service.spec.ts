import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { hashPassword } from '@app/auth-utilities';

describe('AuthService', () => {
  let service: AuthService;
  let prisma: jest.Mocked<PrismaService>;

  const mockPrisma = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
    refreshToken: {
      create: jest.fn(),
    },
  };

  const mockConfigService = {
    get: jest.fn().mockImplementation((key: string, defaultValue: string) => {
      if (key === 'JWT_SECRET') return 'test-secret-key';
      if (key === 'JWT_EXPIRES_IN') return '1h';
      return defaultValue;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get(PrismaService);
    jest.clearAllMocks();
  });

  describe('signup', () => {
    const signUpDto = {
      email: 'test@example.com',
      password: 'Password123!',
      first_name: 'John',
      last_name: 'Doe',
    };

    const existingUser = { id: 'existing-id', email: 'test@example.com' };
    const createdUser = {
      id: 'new-user-id',
      email: 'test@example.com',
      first_name: 'John',
      last_name: 'Doe',
      role: 'USER',
      is_active: true,
    };

    it('should create a new user successfully', async () => {
      mockPrisma.user.findUnique
        .mockResolvedValueOnce(null)  // First call - check existing (returns null = user doesn't exist)
        .mockResolvedValueOnce(createdUser as any);  // Second call - generate tokens
      mockPrisma.user.create.mockResolvedValue(createdUser as any);
      mockPrisma.refreshToken.create.mockResolvedValue({} as any);

      const result = await service.signup(signUpDto);

      expect(result).toHaveProperty('access_token');
      expect(result).toHaveProperty('refresh_token');
      expect(result.token_type).toBe('Bearer');
      expect(result.expires_in).toBe(3600);
      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
        select: { id: true },
      });
      expect(mockPrisma.user.create).toHaveBeenCalledWith({
        data: {
          email: 'test@example.com',
          password_hash: expect.any(String),
          first_name: 'John',
          last_name: 'Doe',
          role: 'USER',
          user_type: 'PERSONAL',
          is_active: true,
          email_verified: false,
        },
      });
    });

    it('should throw ConflictException when email already exists', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(existingUser as any);

      await expect(service.signup(signUpDto)).rejects.toThrow(
        ConflictException,
      );
      expect(mockPrisma.user.create).not.toHaveBeenCalled();
    });
  });

  describe('signin', () => {
    const signInDto = {
      email: 'test@example.com',
      password: 'Password123!',
    };

    const hashedPassword = hashPassword('Password123!');
    const user = {
      id: 'user-id',
      email: 'test@example.com',
      password_hash: hashedPassword,
      is_active: true,
      first_name: 'John',
      last_name: 'Doe',
      role: 'USER',
    };

    it('should sign in user successfully', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(user as any);
      mockPrisma.refreshToken.create.mockResolvedValue({} as any);

      const result = await service.signin(signInDto);

      expect(result).toHaveProperty('access_token');
      expect(result).toHaveProperty('refresh_token');
      expect(result.token_type).toBe('Bearer');
      expect(result.expires_in).toBe(3600);
    });

    it('should throw UnauthorizedException when user not found', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);

      await expect(service.signin(signInDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException when account is disabled', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        ...user,
        is_active: false,
      } as any);

      await expect(service.signin(signInDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException when password is invalid', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(user as any);

      await expect(
        service.signin({ email: 'test@example.com', password: 'WrongPassword!' }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('getProfile', () => {
    const userId = 'user-id';
    const user = {
      id: userId,
      email: 'test@example.com',
      first_name: 'John',
      last_name: 'Doe',
      role: 'USER',
      is_active: true,
      created_at: new Date(),
    };

    it('should return user profile', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(user as any);

      const result = await service.getProfile(userId);

      expect(result).toEqual(user);
      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          first_name: true,
          last_name: true,
          role: true,
          is_active: true,
          created_at: true,
        },
      });
    });

    it('should throw UnauthorizedException when user not found', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);

      await expect(service.getProfile(userId)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});