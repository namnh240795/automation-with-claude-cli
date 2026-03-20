import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { PrismaService } from '../prisma/prisma.service';
import { randomBytes, createHash } from 'crypto';
import { TOKEN_LIFETIMES, CODE_CHALLENGE_METHODS } from './oauth.constants';

jest.mock('../prisma/prisma.service');
jest.mock('crypto', () => ({
  ...jest.requireActual('crypto'),
  randomBytes: jest.fn(),
  createHash: jest.fn(),
}));

describe('AuthorizationService', () => {
  let service: AuthorizationService;
  let prismaService: any;

  const mockClient = {
    id: 'client-id-1',
    name: 'Test Client',
  };

  const mockUser = {
    id: 'user-id-1',
    email: 'test@example.com',
  };

  const mockAuthCode = {
    id: 'auth-code-1',
    code: 'generated-auth-code',
    client_id: 'client-id-1',
    user_id: 'user-id-1',
    redirect_uri: 'https://example.com/callback',
    scope: 'openid email',
    state: 'state-123',
    code_challenge: null,
    code_challenge_method: null,
    nonce: 'nonce-123',
    expires_at: new Date(Date.now() + TOKEN_LIFETIMES.AUTHORIZATION_CODE * 1000),
    consumed_at: null,
    created_at: new Date(),
  };

  const mockAuthCodeWithPKCE = {
    ...mockAuthCode,
    code_challenge: 'challenge-123',
    code_challenge_method: 'S256',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorizationService,
        {
          provide: PrismaService,
          useValue: {
            oAuthClient: {
              findUnique: jest.fn(),
            },
            oAuthAuthorizationCode: {
              create: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              deleteMany: jest.fn(),
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<AuthorizationService>(AuthorizationService);
    prismaService = module.get(PrismaService);

    // Mock randomBytes and createHash
    (randomBytes as jest.Mock).mockReturnValue({
      toString: jest.fn().mockReturnValue('generated-auth-code'),
    });

    (createHash as jest.Mock).mockReturnValue({
      update: jest.fn().mockReturnThis(),
      digest: jest.fn().mockReturnValue('challenge-123'),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('generateAuthorizationCode', () => {
    it('should generate authorization code successfully', async () => {
      // Arrange
      prismaService.oAuthClient.findUnique.mockResolvedValue(mockClient);
      prismaService.oAuthAuthorizationCode.create.mockResolvedValue(mockAuthCode);

      const data = {
        client_id: 'test-client-id',
        user_id: 'user-id-1',
        redirect_uri: 'https://example.com/callback',
        scope: 'openid email',
        state: 'state-123',
      };

      // Act
      const result = await service.generateAuthorizationCode(data);

      // Assert
      expect(result).toBe('generated-auth-code');
      expect(prismaService.oAuthAuthorizationCode.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          code: 'generated-auth-code',
          client_id: 'client-id-1',
          user_id: 'user-id-1',
          redirect_uri: 'https://example.com/callback',
          scope: 'openid email',
        }),
      });
    });

    it('should generate authorization code with PKCE', async () => {
      // Arrange
      prismaService.oAuthClient.findUnique.mockResolvedValue(mockClient);
      prismaService.oAuthAuthorizationCode.create.mockResolvedValue(mockAuthCode);

      const data = {
        client_id: 'test-client-id',
        user_id: 'user-id-1',
        redirect_uri: 'https://example.com/callback',
        scope: 'openid',
        code_challenge: 'challenge-123',
        code_challenge_method: 'S256',
      };

      // Act
      const result = await service.generateAuthorizationCode(data);

      // Assert
      expect(result).toBe('generated-auth-code');
      expect(prismaService.oAuthAuthorizationCode.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          code_challenge: 'challenge-123',
          code_challenge_method: 'S256',
        }),
      });
    });

    it('should throw NotFoundException if client not found', async () => {
      // Arrange
      prismaService.oAuthClient.findUnique.mockResolvedValue(null);

      const data = {
        client_id: 'non-existent',
        user_id: 'user-id-1',
        redirect_uri: 'https://example.com/callback',
        scope: 'openid',
      };

      // Act & Assert
      await expect(service.generateAuthorizationCode(data)).rejects.toThrow(NotFoundException);
    });
  });

  describe('validateAndConsumeAuthorizationCode', () => {
    it('should validate and consume authorization code successfully', async () => {
      // Arrange
      prismaService.oAuthClient.findUnique.mockResolvedValue({
        id: 'client-id-1',
        require_pkce: true,
        is_public_client: false,
      });
      prismaService.oAuthAuthorizationCode.findUnique.mockResolvedValue(mockAuthCode);
      prismaService.oAuthAuthorizationCode.update.mockResolvedValue({
        ...mockAuthCode,
        consumed_at: new Date(),
      });

      const data = {
        code: 'generated-auth-code',
        client_id: 'test-client-id',
        redirect_uri: 'https://example.com/callback',
      };

      // Act
      const result = await service.validateAndConsumeAuthorizationCode(data);

      // Assert
      expect(result).toEqual({
        user_id: 'user-id-1',
        scope: 'openid email',
        nonce: 'nonce-123',
      });
      expect(prismaService.oAuthAuthorizationCode.update).toHaveBeenCalledWith({
        where: { id: 'auth-code-1' },
        data: { consumed_at: expect.any(Date) },
      });
    });

    it('should validate code with PKCE verifier', async () => {
      // Arrange
      prismaService.oAuthClient.findUnique.mockResolvedValue({
        id: 'client-id-1',
        require_pkce: true,
        is_public_client: true,
      });
      prismaService.oAuthAuthorizationCode.findUnique.mockResolvedValue(mockAuthCodeWithPKCE);
      prismaService.oAuthAuthorizationCode.update.mockResolvedValue({
        ...mockAuthCodeWithPKCE,
        consumed_at: new Date(),
      });

      // The verifyCodeChallenge method will be called with the verifier
      // and should match the challenge in mockAuthCodeWithPKCE
      const data = {
        code: 'generated-auth-code',
        client_id: 'test-client-id',
        redirect_uri: 'https://example.com/callback',
        code_verifier: 'verifier',
      };

      // Act
      const result = await service.validateAndConsumeAuthorizationCode(data);

      // Assert
      expect(result).toBeDefined();
    });

    it('should throw BadRequestException for invalid code', async () => {
      // Arrange
      prismaService.oAuthClient.findUnique.mockResolvedValue({
        id: 'client-id-1',
        require_pkce: true,
        is_public_client: false,
      });
      prismaService.oAuthAuthorizationCode.findUnique.mockResolvedValue(null);

      const data = {
        code: 'invalid-code',
        client_id: 'test-client-id',
        redirect_uri: 'https://example.com/callback',
      };

      // Act & Assert
      await expect(service.validateAndConsumeAuthorizationCode(data)).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException for consumed code', async () => {
      // Arrange
      prismaService.oAuthClient.findUnique.mockResolvedValue({
        id: 'client-id-1',
        require_pkce: true,
        is_public_client: false,
      });
      prismaService.oAuthAuthorizationCode.findUnique.mockResolvedValue({
        ...mockAuthCode,
        consumed_at: new Date(),
      });

      const data = {
        code: 'consumed-code',
        client_id: 'test-client-id',
        redirect_uri: 'https://example.com/callback',
      };

      // Act & Assert
      await expect(service.validateAndConsumeAuthorizationCode(data)).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException for expired code', async () => {
      // Arrange
      prismaService.oAuthClient.findUnique.mockResolvedValue({
        id: 'client-id-1',
        require_pkce: true,
        is_public_client: false,
      });
      prismaService.oAuthAuthorizationCode.findUnique.mockResolvedValue({
        ...mockAuthCode,
        expires_at: new Date(Date.now() - 1000),
      });

      const data = {
        code: 'expired-code',
        client_id: 'test-client-id',
        redirect_uri: 'https://example.com/callback',
      };

      // Act & Assert
      await expect(service.validateAndConsumeAuthorizationCode(data)).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException for redirect URI mismatch', async () => {
      // Arrange
      prismaService.oAuthClient.findUnique.mockResolvedValue({
        id: 'client-id-1',
        require_pkce: true,
        is_public_client: false,
      });
      prismaService.oAuthAuthorizationCode.findUnique.mockResolvedValue({
        ...mockAuthCode,
        redirect_uri: 'https://other.com/callback',
      });

      const data = {
        code: 'code-123',
        client_id: 'test-client-id',
        redirect_uri: 'https://example.com/callback',
      };

      // Act & Assert
      await expect(service.validateAndConsumeAuthorizationCode(data)).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException when code_verifier required but missing', async () => {
      // Arrange
      prismaService.oAuthClient.findUnique.mockResolvedValue({
        id: 'client-id-1',
        require_pkce: true,
        is_public_client: true,
      });
      prismaService.oAuthAuthorizationCode.findUnique.mockResolvedValue({
        ...mockAuthCode,
        code_challenge: 'challenge-123',
      });

      const data = {
        code: 'code-123',
        client_id: 'test-client-id',
        redirect_uri: 'https://example.com/callback',
      };

      // Act & Assert
      await expect(service.validateAndConsumeAuthorizationCode(data)).rejects.toThrow(BadRequestException);
    });
  });

  describe('cleanupExpiredCodes', () => {
    it('should delete expired authorization codes', async () => {
      // Arrange
      prismaService.oAuthAuthorizationCode.deleteMany.mockResolvedValue({ count: 5 });

      // Act
      const result = await service.cleanupExpiredCodes();

      // Assert
      expect(result).toBe(5);
      expect(prismaService.oAuthAuthorizationCode.deleteMany).toHaveBeenCalledWith({
        where: {
          expires_at: {
            lt: expect.any(Date),
          },
        },
      });
    });
  });

  describe('getUserAuthorizationCodes', () => {
    it('should return active authorization codes for user', async () => {
      // Arrange
      const codes = [
        { ...mockAuthCode, client: mockClient },
      ];
      prismaService.oAuthAuthorizationCode.findMany.mockResolvedValue(codes);

      // Act
      const result = await service.getUserAuthorizationCodes('user-id-1');

      // Assert
      expect(result).toEqual(codes);
      expect(prismaService.oAuthAuthorizationCode.findMany).toHaveBeenCalledWith({
        where: {
          user_id: 'user-id-1',
          consumed_at: null,
          expires_at: {
            gt: expect.any(Date),
          },
        },
        include: {
          client: {
            select: {
              name: true,
              client_id: true,
            },
          },
        },
        orderBy: {
          created_at: 'desc',
        },
      });
    });
  });
});
