import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { OAuthService } from './oauth.service';
import { ClientService } from './client.service';
import { AuthorizationService } from './authorization.service';
import { TokenService } from './token.service';
import { DeviceFlowService } from './device-flow.service';
import { PrismaService } from '../prisma/prisma.service';
import { GRANT_TYPES, OAUTH_ERRORS, OAUTH_STATUS_CODES } from './oauth.constants';
import { OAuthBadRequestException } from './oauth.exception';
import * as authUtilities from '@app/auth-utilities';

jest.mock('./client.service');
jest.mock('./authorization.service');
jest.mock('./token.service');
jest.mock('./device-flow.service');
jest.mock('../prisma/prisma.service');
jest.mock('@app/auth-utilities', () => ({
  ...jest.requireActual('@app/auth-utilities'),
  verifyPassword: jest.fn().mockReturnValue(true),
  hashPassword: jest.fn().mockReturnValue('hashed-password'),
}));

describe('OAuthService', () => {
  let service: OAuthService;
  let clientService: any;
  let authorizationService: any;
  let tokenService: any;
  let deviceFlowService: any;
  let prismaService: any;

  const mockClient = {
    id: 'client-id-1',
    client_id: 'test-client-id',
    name: 'Test Client',
    redirect_uris: ['https://example.com/callback'],
    scopes: ['openid', 'email'],
    grant_types: [GRANT_TYPES.AUTHORIZATION_CODE],
    is_confidential: true,
    is_public_client: false,
    require_pkce: false,
    client_secret_hash: 'hashed-secret-123',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OAuthService,
        {
          provide: ClientService,
          useValue: {
            findByClientId: jest.fn(),
            validateClient: jest.fn(),
            validateRedirectUri: jest.fn(),
            supportsGrantType: jest.fn(),
            supportsScope: jest.fn(),
          },
        },
        {
          provide: AuthorizationService,
          useValue: {
            generateAuthorizationCode: jest.fn(),
            validateAndConsumeAuthorizationCode: jest.fn(),
          },
        },
        {
          provide: TokenService,
          useValue: {
            generateAccessToken: jest.fn(),
            generateRefreshToken: jest.fn(),
            refreshAccessToken: jest.fn(),
            revokeToken: jest.fn(),
            introspectToken: jest.fn(),
            getUserTokens: jest.fn(),
          },
        },
        {
          provide: DeviceFlowService,
          useValue: {
            generateDeviceCode: jest.fn(),
            pollDeviceStatus: jest.fn(),
            completeDeviceFlow: jest.fn(),
            getDeviceCodeInfo: jest.fn(),
          },
        },
        {
          provide: PrismaService,
          useValue: {
            oAuthUserConsent: {
              upsert: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              create: jest.fn(),
              deleteMany: jest.fn(),
            },
            oAuthAccessToken: {
              findUnique: jest.fn(),
              updateMany: jest.fn(),
            },
            oAuthRefreshToken: {
              updateMany: jest.fn(),
            },
            user: {
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<OAuthService>(OAuthService);
    clientService = module.get(ClientService);
    authorizationService = module.get(AuthorizationService);
    tokenService = module.get(TokenService);
    deviceFlowService = module.get(DeviceFlowService);
    prismaService = module.get(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('handleAuthorizationRequest', () => {
    const mockAuthRequest = {
      response_type: 'code',
      client_id: 'test-client-id',
      redirect_uri: 'https://example.com/callback',
      scope: 'openid email',
      state: 'state-123',
      user_id: 'user-id-1',
    };

    it('should handle authorization code flow successfully', async () => {
      // Arrange
      clientService.findByClientId.mockResolvedValue(mockClient);
      clientService.validateRedirectUri.mockReturnValue(true);
      clientService.supportsGrantType.mockReturnValue(true);
      clientService.supportsScope.mockReturnValue(true);
      authorizationService.generateAuthorizationCode.mockResolvedValue('auth-code-123');
      prismaService.oAuthUserConsent.findUnique.mockResolvedValue(null);
      prismaService.oAuthUserConsent.create.mockResolvedValue({});

      // Act
      const result = await service.handleAuthorizationRequest(mockAuthRequest);

      // Assert
      expect(result).toMatchObject({
        redirect_uri: 'https://example.com/callback?code=auth-code-123&state=state-123',
        code: 'auth-code-123',
        state: 'state-123',
      });
    });

    it('should throw NotFoundException for non-existent client', async () => {
      // Arrange
      clientService.findByClientId.mockRejectedValue(new NotFoundException('Client not found'));

      // Act & Assert
      await expect(service.handleAuthorizationRequest(mockAuthRequest)).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException for invalid redirect URI', async () => {
      // Arrange
      clientService.findByClientId.mockResolvedValue(mockClient);
      clientService.validateRedirectUri.mockReturnValue(false);

      // Act & Assert
      await expect(service.handleAuthorizationRequest(mockAuthRequest)).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException for unsupported grant type', async () => {
      // Arrange
      clientService.findByClientId.mockResolvedValue(mockClient);
      clientService.validateRedirectUri.mockReturnValue(true);
      clientService.supportsGrantType.mockReturnValue(false);

      // Act & Assert
      await expect(service.handleAuthorizationRequest(mockAuthRequest)).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException for unsupported scope', async () => {
      // Arrange
      clientService.findByClientId.mockResolvedValue(mockClient);
      clientService.validateRedirectUri.mockReturnValue(true);
      clientService.supportsGrantType.mockReturnValue(true);
      clientService.supportsScope.mockReturnValue(false);

      // Act & Assert
      await expect(service.handleAuthorizationRequest(mockAuthRequest)).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException for invalid response_type', async () => {
      // Arrange
      clientService.findByClientId.mockResolvedValue(mockClient);
      clientService.validateRedirectUri.mockReturnValue(true);
      clientService.supportsGrantType.mockReturnValue(true);
      clientService.supportsScope.mockReturnValue(true);

      const invalidRequest = {
        ...mockAuthRequest,
        response_type: 'token' as any, // Invalid - only 'code' is supported
      };

      // Act & Assert
      await expect(service.handleAuthorizationRequest(invalidRequest)).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException when PKCE required but not provided', async () => {
      // Arrange
      const publicClient = {
        ...mockClient,
        is_public_client: true,
        require_pkce: true,
      };
      clientService.findByClientId.mockResolvedValue(publicClient);
      clientService.validateRedirectUri.mockReturnValue(true);
      clientService.supportsGrantType.mockReturnValue(true);
      clientService.supportsScope.mockReturnValue(true);

      const requestWithoutPKCE = {
        ...mockAuthRequest,
        code_challenge: undefined,
        code_challenge_method: undefined,
      };

      // Act & Assert
      await expect(service.handleAuthorizationRequest(requestWithoutPKCE)).rejects.toThrow(BadRequestException);
    });

    it('should update existing consent', async () => {
      // Arrange
      clientService.findByClientId.mockResolvedValue(mockClient);
      clientService.validateRedirectUri.mockReturnValue(true);
      clientService.supportsGrantType.mockReturnValue(true);
      clientService.supportsScope.mockReturnValue(true);
      authorizationService.generateAuthorizationCode.mockResolvedValue('auth-code-123');
      prismaService.oAuthUserConsent.findUnique.mockResolvedValue({
        id: 'consent-id-1',
        scope: 'openid',
      });
      prismaService.oAuthUserConsent.update.mockResolvedValue({});

      // Act
      const result = await service.handleAuthorizationRequest(mockAuthRequest);

      // Assert
      expect(prismaService.oAuthUserConsent.update).toHaveBeenCalledWith({
        where: { id: 'consent-id-1' },
        data: {
          scope: 'openid email',
          updated_at: expect.any(Date),
        },
      });
    });
  });

  describe('handleTokenRequest - Authorization Code Flow', () => {
    it('should handle authorization code grant successfully', async () => {
      // Arrange
      const data = {
        grant_type: GRANT_TYPES.AUTHORIZATION_CODE,
        code: 'auth-code-123',
        redirect_uri: 'https://example.com/callback',
        client_id: 'test-client-id',
      };

      clientService.validateClient.mockResolvedValue(true);
      authorizationService.validateAndConsumeAuthorizationCode.mockResolvedValue({
        user_id: 'user-id-1',
        scope: 'openid email offline_access',
        nonce: 'nonce-123',
      });
      prismaService.user.findUnique.mockResolvedValue({
        id: 'user-id-1',
        email: 'test@example.com',
        first_name: 'Test',
        last_name: 'User',
      });
      tokenService.generateAccessToken.mockResolvedValue({
        token: 'access-token-123',
        expires_at: new Date(Date.now() + 3600 * 1000),
      });
      prismaService.oAuthAccessToken.findUnique.mockResolvedValue({
        id: 'token-id-1',
      });
      tokenService.generateRefreshToken.mockResolvedValue({
        token: 'refresh-token-123',
        expires_at: new Date(Date.now() + 2592000 * 1000),
      });

      // Act
      const result = await service.handleTokenRequest(data);

      // Assert
      expect(result).toMatchObject({
        access_token: 'access-token-123',
        token_type: 'Bearer',
        expires_in: expect.any(Number),
        refresh_token: 'refresh-token-123',
      });
    });

    it('should handle authorization code with PKCE', async () => {
      // Arrange
      const data = {
        grant_type: GRANT_TYPES.AUTHORIZATION_CODE,
        code: 'auth-code-123',
        redirect_uri: 'https://example.com/callback',
        client_id: 'test-client-id',
        code_verifier: 'verifier-123',
      };

      clientService.validateClient.mockResolvedValue(true);
      authorizationService.validateAndConsumeAuthorizationCode.mockResolvedValue({
        user_id: 'user-id-1',
        scope: 'openid',
        nonce: 'nonce-123',
      });
      prismaService.user.findUnique.mockResolvedValue({
        id: 'user-id-1',
        email: 'test@example.com',
        first_name: 'Test',
        last_name: 'User',
      });
      tokenService.generateAccessToken.mockResolvedValue({
        token: 'access-token-123',
        expires_at: new Date(),
      });
      prismaService.oAuthAccessToken.findUnique.mockResolvedValue({
        id: 'token-id-1',
      });

      // Act
      const result = await service.handleTokenRequest(data);

      // Assert
      expect(result).toHaveProperty('access_token');
    });

    it('should throw BadRequestException for consumed authorization code', async () => {
      // Arrange
      const data = {
        grant_type: GRANT_TYPES.AUTHORIZATION_CODE,
        code: 'consumed-code',
        redirect_uri: 'https://example.com/callback',
        client_id: 'test-client-id',
      };

      clientService.validateClient.mockResolvedValue(true);
      authorizationService.validateAndConsumeAuthorizationCode.mockRejectedValue(
        new BadRequestException('Authorization code already consumed'),
      );

      // Act & Assert
      await expect(service.handleTokenRequest(data)).rejects.toThrow(BadRequestException);
    });
  });

  describe('handleTokenRequest - Client Credentials Flow', () => {
    it('should handle client credentials grant successfully', async () => {
      // Arrange
      const data = {
        grant_type: GRANT_TYPES.CLIENT_CREDENTIALS,
        client_id: 'test-client-id',
        client_secret: 'secret-123',
        scope: 'openid',
      };

      clientService.findByClientId.mockResolvedValue(mockClient);
      clientService.supportsGrantType.mockReturnValue(true);
      clientService.supportsScope.mockReturnValue(true);
      tokenService.generateAccessToken.mockResolvedValue({
        token: 'access-token-123',
        expires_at: new Date(Date.now() + 3600 * 1000),
      });

      // Act
      const result = await service.handleTokenRequest(data);

      // Assert
      expect(result).toMatchObject({
        access_token: 'access-token-123',
        token_type: 'Bearer',
        expires_in: expect.any(Number),
      });
    });

    it('should throw BadRequestException for public client attempting client credentials', async () => {
      // Arrange
      const publicClient = { ...mockClient, is_confidential: false, is_public_client: true };
      const data = {
        grant_type: GRANT_TYPES.CLIENT_CREDENTIALS,
        client_id: 'public-client-id',
        scope: 'openid',
      };

      clientService.findByClientId.mockResolvedValue(publicClient);

      // Act & Assert
      await expect(service.handleTokenRequest(data)).rejects.toThrow(BadRequestException);
    });
  });

  describe('handleTokenRequest - Refresh Token Flow', () => {
    it('should handle refresh token grant successfully', async () => {
      // Arrange
      const data = {
        grant_type: GRANT_TYPES.REFRESH_TOKEN,
        refresh_token: 'refresh-token-123',
        client_id: 'test-client-id',
      };

      clientService.validateClient.mockResolvedValue(true);
      tokenService.refreshAccessToken.mockResolvedValue({
        access_token: 'new-access-token',
        refresh_token: 'new-refresh-token',
        token_type: 'Bearer',
        expires_in: 3600,
      });

      // Act
      const result = await service.handleTokenRequest(data);

      // Assert
      expect(result).toMatchObject({
        access_token: 'new-access-token',
      });
    });

    it('should throw BadRequestException for invalid refresh token', async () => {
      // Arrange
      const data = {
        grant_type: GRANT_TYPES.REFRESH_TOKEN,
        refresh_token: 'invalid-token',
        client_id: 'test-client-id',
      };

      clientService.validateClient.mockResolvedValue(true);
      tokenService.refreshAccessToken.mockRejectedValue(
        new BadRequestException('Invalid refresh token'),
      );

      // Act & Assert
      await expect(service.handleTokenRequest(data)).rejects.toThrow(BadRequestException);
    });
  });

  describe('handleTokenRequest - Device Code Flow', () => {
    it('should handle pending device code', async () => {
      // Arrange
      const data = {
        grant_type: GRANT_TYPES.DEVICE_CODE,
        device_code: 'device-code-123',
        client_id: 'test-client-id',
      };

      deviceFlowService.getDeviceCodeInfo.mockResolvedValue({
        expires_at: new Date(Date.now() + 900000),
        completed_at: null,
        scope: 'openid',
        user_code: 'ABCD-1234',
      });
      deviceFlowService.pollDeviceStatus.mockResolvedValue({
        status: 'pending',
      });

      // Act
      await expect(service.handleTokenRequest(data)).rejects.toThrow(OAuthBadRequestException);
    });

    it('should handle authorized device code', async () => {
      // Arrange
      const data = {
        grant_type: GRANT_TYPES.DEVICE_CODE,
        device_code: 'device-code-123',
        client_id: 'test-client-id',
      };

      deviceFlowService.getDeviceCodeInfo.mockResolvedValue({
        expires_at: new Date(Date.now() + 900000),
        completed_at: null,
        scope: 'openid offline_access',
        user_code: 'ABCD-1234',
      });
      deviceFlowService.pollDeviceStatus.mockResolvedValue({
        status: 'authorized',
        user_id: 'user-id-1',
      });
      prismaService.user.findUnique.mockResolvedValue({
        id: 'user-id-1',
        email: 'test@example.com',
        first_name: 'Test',
        last_name: 'User',
      });
      tokenService.generateAccessToken.mockResolvedValue({
        token: 'access-token-123',
        expires_at: new Date(),
      });
      prismaService.oAuthAccessToken.findUnique.mockResolvedValue({
        id: 'token-id-1',
      });
      tokenService.generateRefreshToken.mockResolvedValue({
        token: 'refresh-token-123',
        expires_at: new Date(),
      });
      deviceFlowService.completeDeviceFlow.mockResolvedValue(undefined);

      // Act
      const result = await service.handleTokenRequest(data);

      // Assert
      expect(result).toHaveProperty('access_token');
    });

    it('should handle expired device code', async () => {
      // Arrange
      const data = {
        grant_type: GRANT_TYPES.DEVICE_CODE,
        device_code: 'expired-code',
        client_id: 'test-client-id',
      };

      deviceFlowService.getDeviceCodeInfo.mockResolvedValue({
        expires_at: new Date(Date.now() - 1000), // Expired
        completed_at: null,
        scope: 'openid',
        user_code: 'ABCD-1234',
      });

      // Act
      await expect(service.handleTokenRequest(data)).rejects.toThrow(BadRequestException);
    });
  });

  describe('handleTokenRequest - Unsupported Grant Type', () => {
    it('should throw BadRequestException for unsupported grant type', async () => {
      // Arrange
      const data = {
        grant_type: 'unsupported_grant' as any,
        client_id: 'test-client-id',
      };

      // Act & Assert
      await expect(service.handleTokenRequest(data)).rejects.toThrow(BadRequestException);
    });
  });

  describe('revokeToken', () => {
    it('should revoke active access token successfully', async () => {
      // Arrange
      tokenService.introspectToken.mockResolvedValue({
        active: true,
      });
      tokenService.revokeToken.mockResolvedValue(undefined);

      // Act
      await service.revokeToken({ token: 'access-token-123' });

      // Assert
      expect(tokenService.revokeToken).toHaveBeenCalled();
    });

    it('should handle revoking inactive token gracefully', async () => {
      // Arrange
      tokenService.revokeToken.mockResolvedValue(undefined);

      // Act - should not throw
      await service.revokeToken({ token: 'inactive-token' });

      // Assert - revokeToken should be called (token service handles the check)
      expect(tokenService.revokeToken).toHaveBeenCalledWith({ token: 'inactive-token' });
    });
  });

  describe('introspectToken', () => {
    it('should introspect active token successfully', async () => {
      // Arrange
      tokenService.introspectToken.mockResolvedValue({
        active: true,
        scope: 'openid email',
        client_id: 'test-client-id',
        user_id: 'user-id-1',
        exp: 1234567890,
      });

      // Act
      const result = await service.introspectToken({ token: 'access-token-123' });

      // Assert
      expect(result).toEqual({
        active: true,
        scope: 'openid email',
        client_id: 'test-client-id',
        user_id: 'user-id-1',
        exp: 1234567890,
      });
    });

    it('should introspect inactive token', async () => {
      // Arrange
      tokenService.introspectToken.mockResolvedValue({
        active: false,
      });

      // Act
      const result = await service.introspectToken({ token: 'inactive-token' });

      // Assert
      expect(result).toEqual({ active: false });
    });
  });

  describe('getUserClients', () => {
    it('should return user authorized clients', async () => {
      // Arrange
      const consents = [
        {
          client: {
            id: 'client-id-1',
            client_id: 'test-client-id',
            name: 'Test Client',
            description: 'A test client',
            logo_uri: 'https://example.com/logo.png',
          },
          scope: 'openid email',
          created_at: new Date(),
        },
      ];
      prismaService.oAuthUserConsent.findMany.mockResolvedValue(consents);

      // Act
      const result = await service.getUserClients('user-id-1');

      // Assert
      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        client_id: 'test-client-id',
        name: 'Test Client',
      });
    });

    it('should return empty array for user with no consents', async () => {
      // Arrange
      prismaService.oAuthUserConsent.findMany.mockResolvedValue([]);

      // Act
      const result = await service.getUserClients('user-id-1');

      // Assert
      expect(result).toEqual([]);
    });
  });

  describe('revokeClientAccess', () => {
    it('should revoke all tokens for a client', async () => {
      // Arrange
      const client = {
        id: 'client-id-1',
        client_id: 'test-client-id',
      };
      clientService.findByClientId.mockResolvedValue(client);
      prismaService.oAuthUserConsent.deleteMany.mockResolvedValue({ count: 1 });
      prismaService.oAuthAccessToken.updateMany.mockResolvedValue({ count: 2 });
      prismaService.oAuthRefreshToken.updateMany.mockResolvedValue({ count: 1 });

      // Act
      const result = await service.revokeClientAccess('user-id-1', 'test-client-id');

      // Assert
      expect(result).toEqual({ message: 'Client access revoked successfully' });
      expect(prismaService.oAuthUserConsent.deleteMany).toHaveBeenCalledWith({
        where: {
          user_id: 'user-id-1',
          client_id: 'client-id-1',
        },
      });
      expect(prismaService.oAuthAccessToken.updateMany).toHaveBeenCalledWith({
        where: {
          user_id: 'user-id-1',
          client_id: 'client-id-1',
        },
        data: { revoked_at: expect.any(Date) },
      });
      expect(prismaService.oAuthRefreshToken.updateMany).toHaveBeenCalledWith({
        where: {
          user_id: 'user-id-1',
          client_id: 'client-id-1',
        },
        data: { revoked_at: expect.any(Date) },
      });
    });

    it('should return message even when no tokens to revoke', async () => {
      // Arrange
      const client = {
        id: 'client-id-1',
        client_id: 'test-client-id',
      };
      clientService.findByClientId.mockResolvedValue(client);
      prismaService.oAuthUserConsent.deleteMany.mockResolvedValue({ count: 0 });
      prismaService.oAuthAccessToken.updateMany.mockResolvedValue({ count: 0 });
      prismaService.oAuthRefreshToken.updateMany.mockResolvedValue({ count: 0 });

      // Act
      const result = await service.revokeClientAccess('user-id-1', 'test-client-id');

      // Assert
      expect(result).toEqual({ message: 'Client access revoked successfully' });
    });
  });

  describe('getUserTokens', () => {
    it('should return user tokens successfully', async () => {
      // Arrange
      const tokens = {
        access_tokens: [
          {
            token: 'access-token-1',
            id: 'at-id-1',
            client_id: 'test-client-id',
            created_at: new Date(),
            user_id: 'user-id-1',
            scope: 'openid email',
            expires_at: new Date(),
            token_type: 'Bearer',
            revoked_at: null,
            client: { name: 'Test Client', client_id: 'test-client-id' },
          },
        ],
        refresh_tokens: [
          {
            token: 'refresh-token-1',
            id: 'rt-id-1',
            client_id: 'test-client-id',
            created_at: new Date(),
            user_id: 'user-id-1',
            scope: 'openid email offline_access',
            expires_at: new Date(),
            client: { name: 'Test Client', client_id: 'test-client-id' },
          },
        ],
      };
      tokenService.getUserTokens.mockResolvedValue(tokens);

      // Act
      const result = await service.getUserTokens('user-id-1');

      // Assert
      expect(result).toEqual(tokens);
    });
  });
});
