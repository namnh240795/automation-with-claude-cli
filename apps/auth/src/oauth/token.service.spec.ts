import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { BadRequestException } from '@nestjs/common';
import { TokenService } from './token.service';
import { PrismaService } from '../prisma/prisma.service';
import { randomBytes, createHmac } from 'crypto';
import { TOKEN_TYPES, TOKEN_LIFETIMES } from './oauth.constants';

jest.mock('../prisma/prisma.service');
jest.mock('crypto', () => ({
  ...jest.requireActual('crypto'),
  randomBytes: jest.fn(),
  createHmac: jest.fn(),
}));

describe('TokenService', () => {
  let service: TokenService;
  let prismaService: any;
  let configService: any;

  const mockClient = {
    id: 'client-id-1',
    client_id: 'test-client-id',
    access_token_lifetime: 3600,
    refresh_token_lifetime: 2592000,
  };

  const mockUser = {
    id: 'user-id-1',
    email: 'test@example.com',
    first_name: 'Test',
    last_name: 'User',
  };

  const mockAccessToken = {
    id: 'token-id-1',
    token: 'access-token-123',
    client_id: 'client-id-1',
    user_id: 'user-id-1',
    scope: 'openid email',
    token_type: TOKEN_TYPES.BEARER,
    expires_at: new Date(Date.now() + 3600 * 1000),
    revoked_at: null,
    created_at: new Date(),
  };

  const mockRefreshToken = {
    id: 'refresh-token-id-1',
    token: 'refresh-token-123',
    access_token_id: 'token-id-1',
    client_id: 'client-id-1',
    user_id: 'user-id-1',
    scope: 'openid email offline_access',
    expires_at: new Date(Date.now() + 2592000 * 1000),
    revoked_at: null,
    created_at: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TokenService,
        {
          provide: PrismaService,
          useValue: {
            oAuthClient: {
              findUnique: jest.fn(),
            },
            oAuthAccessToken: {
              create: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              updateMany: jest.fn(),
              deleteMany: jest.fn(),
              findMany: jest.fn(),
            },
            oAuthRefreshToken: {
              create: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              updateMany: jest.fn(),
              deleteMany: jest.fn(),
              findMany: jest.fn(),
            },
            user: {
              findUnique: jest.fn(),
            },
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              const config = {
                JWT_SECRET: 'test-secret',
                JWT_EXPIRES_IN: '1h',
              };
              return config[key] || null;
            }),
          },
        },
      ],
    }).compile();

    service = module.get<TokenService>(TokenService);
    prismaService = module.get(PrismaService);
    configService = module.get(ConfigService);

    // Mock crypto functions
    (randomBytes as jest.Mock).mockReturnValue({
      toString: jest.fn().mockReturnValue('refresh-token-123'),
    });

    const mockCreateHmac = createHmac as jest.Mock;
    mockCreateHmac.mockReturnValue({
      update: jest.fn().mockReturnThis(),
      digest: jest.fn().mockReturnValue('signature'),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('generateAccessToken', () => {
    it('should generate access token successfully', async () => {
      // Arrange
      prismaService.oAuthClient.findUnique.mockResolvedValue(mockClient);
      prismaService.oAuthAccessToken.create.mockImplementation((data: any) => ({
        id: 'token-id-1',
        ...data.data,
      }));

      const data = {
        user_id: 'user-id-1',
        email: 'test@example.com',
        client_id: 'test-client-id',
        scope: 'openid email',
      };

      // Act
      const result = await service.generateAccessToken(data);

      // Assert
      expect(result).toBeDefined();
      expect(result.token).toBeDefined();
      expect(result.expires_at).toBeInstanceOf(Date);
      expect(prismaService.oAuthAccessToken.create).toHaveBeenCalled();
    });

    it('should generate access token for client credentials flow (no user)', async () => {
      // Arrange
      prismaService.oAuthClient.findUnique.mockResolvedValue(mockClient);
      prismaService.oAuthAccessToken.create.mockImplementation((data: any) => ({
        id: 'token-id-1',
        ...data.data,
      }));

      const data = {
        user_id: '',
        email: 'test-client@test.com',
        client_id: 'test-client-id',
        scope: 'openid',
      };

      // Act
      const result = await service.generateAccessToken(data);

      // Assert
      expect(result).toBeDefined();
      expect(prismaService.oAuthAccessToken.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          user_id: '',
        }),
      });
    });
  });

  describe('generateRefreshToken', () => {
    it('should generate refresh token successfully', async () => {
      // Arrange
      prismaService.oAuthClient.findUnique.mockResolvedValue(mockClient);
      prismaService.oAuthRefreshToken.create.mockImplementation((data: any) => ({
        id: 'refresh-token-id-1',
        ...data.data,
      }));

      const data = {
        user_id: 'user-id-1',
        client_id: 'test-client-id',
        access_token_id: 'token-id-1',
        scope: 'openid email offline_access',
      };

      // Act
      const result = await service.generateRefreshToken(data);

      // Assert
      expect(result).toBeDefined();
      expect(result.token).toBe('refresh-token-123');
      expect(result.expires_at).toBeInstanceOf(Date);
    });
  });

  describe('validateAccessToken', () => {
    it('should validate active access token', async () => {
      // Arrange
      prismaService.oAuthAccessToken.findUnique.mockResolvedValue(mockAccessToken);

      // Act
      const result = await service.validateAccessToken('access-token-123');

      // Assert
      expect(result).not.toBeNull();
      expect(result?.user_id).toBe('user-id-1');
    });

    it('should return null for non-existent token', async () => {
      // Arrange
      prismaService.oAuthAccessToken.findUnique.mockResolvedValue(null);

      // Act
      const result = await service.validateAccessToken('non-existent');

      // Assert
      expect(result).toBeNull();
    });

    it('should return null for revoked token', async () => {
      // Arrange
      prismaService.oAuthAccessToken.findUnique.mockResolvedValue({
        ...mockAccessToken,
        revoked_at: new Date(),
      });

      // Act
      const result = await service.validateAccessToken('revoked-token');

      // Assert
      expect(result).toBeNull();
    });

    it('should return null for expired token', async () => {
      // Arrange
      prismaService.oAuthAccessToken.findUnique.mockResolvedValue({
        ...mockAccessToken,
        expires_at: new Date(Date.now() - 1000),
      });

      // Act
      const result = await service.validateAccessToken('expired-token');

      // Assert
      expect(result).toBeNull();
    });
  });

  describe('validateRefreshToken', () => {
    it('should validate active refresh token', async () => {
      // Arrange
      prismaService.oAuthRefreshToken.findUnique.mockResolvedValue({
        ...mockRefreshToken,
        client: mockClient,
      });

      // Act
      const result = await service.validateRefreshToken('refresh-token-123');

      // Assert
      expect(result).not.toBeNull();
      expect(result?.user_id).toBe('user-id-1');
    });

    it('should return null for non-existent refresh token', async () => {
      // Arrange
      prismaService.oAuthRefreshToken.findUnique.mockResolvedValue(null);

      // Act
      const result = await service.validateRefreshToken('non-existent');

      // Assert
      expect(result).toBeNull();
    });
  });

  describe('refreshAccessToken', () => {
    it('should refresh access token successfully', async () => {
      // Arrange
      prismaService.oAuthRefreshToken.findUnique.mockResolvedValue({
        ...mockRefreshToken,
        client: mockClient,
      });
      prismaService.user.findUnique.mockResolvedValue(mockUser);
      prismaService.oAuthClient.findUnique.mockResolvedValue(mockClient);

      prismaService.oAuthAccessToken.updateMany.mockResolvedValue({ count: 1 });
      prismaService.oAuthRefreshToken.updateMany.mockResolvedValue({ count: 1 });
      prismaService.oAuthAccessToken.create.mockImplementation((data: any) => ({
        id: 'new-token-id-1',
        ...data.data,
      }));
      prismaService.oAuthAccessToken.findUnique.mockResolvedValue({
        id: 'new-token-id-1',
      });
      prismaService.oAuthRefreshToken.create.mockResolvedValue({
        id: 'new-refresh-token-id',
        token: 'new-refresh-token',
      });

      // Act
      const result = await service.refreshAccessToken({
        refresh_token: 'refresh-token-123',
        client_id: 'test-client-id',
      });

      // Assert
      expect(result).toBeDefined();
      expect(result.access_token).toBeDefined();
      expect(result.refresh_token).toBeDefined();
      expect(result.token_type).toBe(TOKEN_TYPES.BEARER);
    });

    it('should throw BadRequestException for invalid refresh token', async () => {
      // Arrange
      prismaService.oAuthRefreshToken.findUnique.mockResolvedValue(null);

      // Act & Assert
      await expect(
        service.refreshAccessToken({
          refresh_token: 'invalid',
          client_id: 'test-client-id',
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('revokeToken', () => {
    it('should revoke access token successfully', async () => {
      // Arrange
      prismaService.oAuthAccessToken.findUnique.mockResolvedValue(mockAccessToken);
      prismaService.oAuthAccessToken.update.mockResolvedValue({});

      // Act
      await service.revokeToken({ token: 'access-token-123' });

      // Assert
      expect(prismaService.oAuthAccessToken.update).toHaveBeenCalledWith({
        where: { id: 'token-id-1' },
        data: { revoked_at: expect.any(Date) },
      });
    });

    it('should revoke refresh token successfully', async () => {
      // Arrange
      prismaService.oAuthAccessToken.findUnique.mockResolvedValue(null);
      prismaService.oAuthRefreshToken.findUnique.mockResolvedValue(mockRefreshToken);
      prismaService.oAuthRefreshToken.update.mockResolvedValue({});

      // Act
      await service.revokeToken({ token: 'refresh-token-123' });

      // Assert
      expect(prismaService.oAuthRefreshToken.update).toHaveBeenCalledWith({
        where: { id: 'refresh-token-id-1' },
        data: { revoked_at: expect.any(Date) },
      });
    });
  });

  describe('introspectToken', () => {
    it('should introspect active access token', async () => {
      // Arrange
      prismaService.oAuthAccessToken.findUnique.mockResolvedValue({
        ...mockAccessToken,
        client: mockClient,
      });

      // Act
      const result = await service.introspectToken({ token: 'access-token-123' });

      // Assert
      expect(result).toEqual({
        active: true,
        scope: 'openid email',
        client_id: 'test-client-id',
        user_id: 'user-id-1',
        exp: expect.any(Number),
      });
    });

    it('should introspect active refresh token', async () => {
      // Arrange
      prismaService.oAuthAccessToken.findUnique.mockResolvedValue(null);
      prismaService.oAuthRefreshToken.findUnique.mockResolvedValue({
        ...mockRefreshToken,
        client: mockClient,
      });

      // Act
      const result = await service.introspectToken({ token: 'refresh-token-123' });

      // Assert
      expect(result).toEqual({
        active: true,
        scope: 'openid email offline_access',
        client_id: 'test-client-id',
        user_id: 'user-id-1',
        exp: expect.any(Number),
      });
    });

    it('should return active: false for invalid token', async () => {
      // Arrange
      prismaService.oAuthAccessToken.findUnique.mockResolvedValue(null);
      prismaService.oAuthRefreshToken.findUnique.mockResolvedValue(null);

      // Act
      const result = await service.introspectToken({ token: 'invalid-token' });

      // Assert
      expect(result).toEqual({ active: false });
    });

    it('should return active: false for revoked token', async () => {
      // Arrange
      prismaService.oAuthAccessToken.findUnique.mockResolvedValue({
        ...mockAccessToken,
        revoked_at: new Date(),
        client: mockClient,
      });

      // Act
      const result = await service.introspectToken({ token: 'access-token-123' });

      // Assert
      expect(result).toEqual({
        active: false,
        scope: 'openid email',
        client_id: 'test-client-id',
        user_id: 'user-id-1',
        exp: expect.any(Number),
      });
    });

    it('should return active: false for expired token', async () => {
      // Arrange
      prismaService.oAuthAccessToken.findUnique.mockResolvedValue({
        ...mockAccessToken,
        expires_at: new Date(Date.now() - 1000),
        client: mockClient,
      });

      // Act
      const result = await service.introspectToken({ token: 'access-token-123' });

      // Assert
      expect(result).toEqual({
        active: false,
        scope: 'openid email',
        client_id: 'test-client-id',
        user_id: 'user-id-1',
        exp: expect.any(Number),
      });
    });
  });

  describe('cleanupExpiredTokens', () => {
    it('should delete expired access and refresh tokens', async () => {
      // Arrange
      prismaService.oAuthAccessToken.deleteMany.mockResolvedValue({ count: 3 });
      prismaService.oAuthRefreshToken.deleteMany.mockResolvedValue({ count: 2 });

      // Act
      const result = await service.cleanupExpiredTokens();

      // Assert
      expect(result).toEqual({
        access_tokens: 3,
        refresh_tokens: 2,
      });
    });
  });

  describe('getUserTokens', () => {
    it('should return user access and refresh tokens', async () => {
      // Arrange
      prismaService.oAuthAccessToken.findMany.mockResolvedValue([mockAccessToken]);
      prismaService.oAuthRefreshToken.findMany.mockResolvedValue([mockRefreshToken]);

      // Act
      const result = await service.getUserTokens('user-id-1');

      // Assert
      expect(result).toEqual({
        access_tokens: [mockAccessToken],
        refresh_tokens: [mockRefreshToken],
      });
    });
  });
});
