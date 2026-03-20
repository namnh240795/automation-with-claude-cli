import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from '@app/auth-utilities';
import { OAuthController } from './oauth.controller';
import { OAuthService } from './oauth.service';
import { ClientService } from './client.service';
import { DeviceFlowService } from './device-flow.service';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';

jest.mock('./oauth.service');
jest.mock('./client.service');
jest.mock('./device-flow.service');

describe('OAuthController', () => {
  let controller: OAuthController;
  let oauthService: any;
  let clientService: any;
  let deviceFlowService: any;

  const mockClient = {
    id: 'client-id-1',
    client_id: 'test-client-id',
    name: 'Test Client',
    client_secret: 'secret-123',
    description: 'A test client',
    redirect_uris: ['https://example.com/callback'],
    post_logout_redirect_uris: [],
    scopes: ['openid', 'email'],
    grant_types: ['authorization_code', 'refresh_token'],
    is_confidential: true,
    is_public_client: false,
    require_pkce: false,
    access_token_lifetime: 3600,
    refresh_token_lifetime: 2592000,
    allowed_origins: ['https://example.com'],
    is_active: true,
    created_at: new Date(),
    updated_at: new Date(),
  };

  const mockAccessToken = {
    access_token: 'access-token-123',
    token_type: 'Bearer',
    expires_in: 3600,
    refresh_token: 'refresh-token-123',
    scope: 'openid email',
  };

  const mockUser: any = {
    sub: 'user-id-1',
    email: 'test@example.com',
    first_name: 'Test',
    last_name: 'User',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OAuthController],
      providers: [
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              const config = {
                JWT_SECRET: 'test-secret',
                JWT_EXPIRES_IN: '1h',
                PORT: '3001',
                SERVICE_PREFIX: 'auth',
              };
              return config[key] || null;
            }),
          },
        },
        {
          provide: OAuthService,
          useValue: {
            registerClient: jest.fn(),
            handleAuthorizationRequest: jest.fn(),
            handleTokenRequest: jest.fn(),
            revokeToken: jest.fn(),
            introspectToken: jest.fn(),
            getUserClients: jest.fn(),
            revokeClientAccess: jest.fn(),
            getUserTokens: jest.fn(),
          },
        },
        {
          provide: ClientService,
          useValue: {
            listClients: jest.fn(),
            findByClientId: jest.fn(),
            getClientInfo: jest.fn(),
            deleteClient: jest.fn(),
            validateRedirectUri: jest.fn(),
            supportsGrantType: jest.fn(),
            registerClient: jest.fn(),
          },
        },
        {
          provide: DeviceFlowService,
          useValue: {
            generateDeviceCode: jest.fn(),
            getDeviceCodeByUserCode: jest.fn(),
            verifyDeviceCode: jest.fn(),
            denyDeviceCode: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<OAuthController>(OAuthController);
    oauthService = module.get(OAuthService);
    clientService = module.get(ClientService);
    deviceFlowService = module.get(DeviceFlowService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('registerClient', () => {
    it('should register OAuth client', async () => {
      // Arrange
      const registerDto = {
        name: 'Test Client',
        redirect_uris: ['https://example.com/callback'],
        scopes: ['openid'],
        grant_types: ['authorization_code'],
      };
      clientService.registerClient.mockResolvedValue(mockClient);

      // Act
      const result = await controller.registerClient(registerDto as any);

      // Assert
      expect(result).toEqual(mockClient);
      expect(clientService.registerClient).toHaveBeenCalledWith(registerDto);
    });
  });

  describe('listClients', () => {
    it('should list all OAuth clients', async () => {
      // Arrange
      const clients = [mockClient];
      clientService.listClients.mockResolvedValue(clients);

      // Act
      const result = await controller.listClients();

      // Assert
      expect(result).toEqual(clients);
    });
  });

  describe('getClientInfo', () => {
    it('should get client info', async () => {
      // Arrange
      clientService.getClientInfo.mockResolvedValue(mockClient);

      // Act
      const result = await controller.getClientInfo('test-client-id');

      // Assert
      expect(result).toEqual(mockClient);
    });
  });

  describe('deleteClient', () => {
    it('should delete OAuth client', async () => {
      // Arrange
      clientService.deleteClient.mockResolvedValue({ message: 'Client deleted successfully' });

      // Act
      const result = await controller.deleteClient('test-client-id');

      // Assert
      expect(result).toEqual({ message: 'Client deleted successfully' });
    });
  });

  describe('authorize', () => {
    it('should handle authorization request', async () => {
      // Arrange
      const mockReq = {
        res: {
          redirect: jest.fn(),
        },
      };

      const authResult = {
        redirect_uri: 'https://example.com/callback?code=auth-code-123&state=state-123',
      };
      oauthService.handleAuthorizationRequest.mockResolvedValue(authResult);

      const query = {
        response_type: 'code',
        client_id: 'test-client-id',
        redirect_uri: 'https://example.com/callback',
        scope: 'openid',
        state: 'state-123',
      };

      // Act
      await controller.authorize(query as any, mockUser, mockReq as any);

      // Assert
      expect(oauthService.handleAuthorizationRequest).toHaveBeenCalledWith({
        ...query,
        user_id: mockUser.sub,
      });
      expect(mockReq.res.redirect).toHaveBeenCalledWith(
        'https://example.com/callback?code=auth-code-123&state=state-123',
      );
    });

    it('should handle authorization error with redirect', async () => {
      // Arrange
      const mockReq = {
        res: {
          redirect: jest.fn(),
        },
      };

      const error = {
        error: 'invalid_request',
        error_description: 'Missing required parameter',
      };
      oauthService.handleAuthorizationRequest.mockRejectedValue(error);

      const query = {
        response_type: 'code',
        client_id: 'test-client-id',
        redirect_uri: 'https://example.com/callback',
        state: 'state-123',
      };

      // Act
      await controller.authorize(query as any, mockUser, mockReq as any);

      // Assert
      // Both %20 and + are valid for encoding spaces in URLs
      const expectedUrl = 'https://example.com/callback?error=invalid_request&error_description=Missing+required+parameter&state=state-123';
      expect(mockReq.res.redirect).toHaveBeenCalledWith(expectedUrl);
    });
  });

  describe('getToken', () => {
    it('should exchange authorization code for access token', async () => {
      // Arrange
      const tokenDto = {
        grant_type: 'authorization_code',
        code: 'auth-code-123',
        redirect_uri: 'https://example.com/callback',
        client_id: 'test-client-id',
        code_verifier: 'verifier-123',
      };
      oauthService.handleTokenRequest.mockResolvedValue(mockAccessToken);

      // Act
      const result = await controller.getToken(tokenDto as any);

      // Assert
      expect(result).toEqual(mockAccessToken);
      expect(oauthService.handleTokenRequest).toHaveBeenCalledWith(tokenDto);
    });

    it('should handle token request errors', async () => {
      // Arrange
      const error = new Error('Invalid authorization code') as any;
      error.error = 'invalid_grant';
      error.error_description = 'Invalid authorization code';
      oauthService.handleTokenRequest.mockRejectedValue(error);

      const tokenDto = {
        grant_type: 'authorization_code',
        code: 'invalid-code',
        redirect_uri: 'https://example.com/callback',
        client_id: 'test-client-id',
      };

      // Act & Assert
      await expect(controller.getToken(tokenDto as any)).rejects.toMatchObject({
        error: 'invalid_grant',
        error_description: 'Invalid authorization code',
      });
    });
  });

  describe('revokeToken', () => {
    it('should revoke token successfully', async () => {
      // Arrange
      const revokeDto = {
        token: 'access-token-123',
        token_type_hint: 'access_token',
      };
      oauthService.revokeToken.mockResolvedValue({});

      // Act
      const result = await controller.revokeToken(revokeDto as any);

      // Assert
      expect(result).toEqual({});
    });
  });

  describe('introspectToken', () => {
    it('should introspect token successfully', async () => {
      // Arrange
      const introspectDto = {
        token: 'access-token-123',
      };
      const introspectResult = {
        active: true,
        scope: 'openid email',
        client_id: 'test-client-id',
        user_id: 'user-id-1',
        exp: 1234567890,
      };
      oauthService.introspectToken.mockResolvedValue(introspectResult);

      // Act
      const result = await controller.introspectToken(introspectDto as any);

      // Assert
      expect(result).toEqual(introspectResult);
    });
  });

  describe('deviceAuthorization', () => {
    it('should start device authorization flow', async () => {
      // Arrange
      const deviceCodeDto = {
        client_id: 'test-client-id',
        scope: 'openid',
      };
      const deviceCodeResult = {
        device_code: 'device-code-123',
        user_code: 'ABCD-1234',
        verification_uri: 'http://localhost:3001/auth/oauth/device/verify',
        verification_uri_complete: 'http://localhost:3001/auth/oauth/device/verify?user_code=ABCD-1234',
        expires_in: 900,
        interval: 5,
      };
      deviceFlowService.generateDeviceCode.mockResolvedValue(deviceCodeResult);

      // Act
      const result = await controller.deviceAuthorization(deviceCodeDto as any);

      // Assert
      expect(result).toEqual(deviceCodeResult);
    });
  });

  describe('getDeviceVerificationPage', () => {
    it('should return device verification info', async () => {
      // Arrange
      const deviceInfo = {
        device_code: 'device-code-123',
        user_code: 'ABCD-1234',
        client_name: 'Test Device Client',
        client_logo_uri: 'https://example.com/logo.png',
        scope: 'openid email',
        expires_at: new Date(),
      };
      deviceFlowService.getDeviceCodeByUserCode.mockResolvedValue(deviceInfo);

      // Act
      const result = await controller.getDeviceVerificationPage('ABCD-1234', mockUser);

      // Assert
      expect(result).toBeDefined();
      expect(result.user_code).toBe('ABCD-1234');
    });
  });

  describe('submitDeviceConsent', () => {
    it('should accept device consent', async () => {
      // Arrange
      const consentDto = {
        user_code: 'ABCD-1234',
        action: 'accept',
      };
      deviceFlowService.verifyDeviceCode.mockResolvedValue(undefined);

      // Act
      const result = await controller.submitDeviceConsent(consentDto as any, mockUser);

      // Assert
      expect(result).toEqual({ message: 'Device verified successfully' });
      expect(deviceFlowService.verifyDeviceCode).toHaveBeenCalledWith({
        user_code: 'ABCD-1234',
        user_id: mockUser.sub,
      });
    });

    it('should deny device consent', async () => {
      // Arrange
      const consentDto = {
        user_code: 'ABCD-1234',
        action: 'deny',
      };
      deviceFlowService.denyDeviceCode.mockResolvedValue(undefined);

      // Act
      const result = await controller.submitDeviceConsent(consentDto as any, mockUser);

      // Assert
      expect(result).toEqual({ message: 'Device authorization denied' });
      expect(deviceFlowService.denyDeviceCode).toHaveBeenCalledWith('ABCD-1234');
    });
  });

  describe('getUserClients', () => {
    it('should return user authorized clients', async () => {
      // Arrange
      const clients = [
        {
          client_id: 'test-client-id',
          name: 'Test Client',
          description: 'A test client',
          logo_uri: 'https://example.com/logo.png',
          scope: 'openid email',
          granted_at: new Date(),
        },
      ];
      oauthService.getUserClients.mockResolvedValue(clients);

      // Act
      const result = await controller.getUserClients(mockUser);

      // Assert
      expect(result).toEqual(clients);
      expect(oauthService.getUserClients).toHaveBeenCalledWith(mockUser.sub);
    });
  });

  describe('revokeClientAccess', () => {
    it('should revoke client access', async () => {
      // Arrange
      oauthService.revokeClientAccess.mockResolvedValue({
        message: 'Client access revoked successfully',
      });

      // Act
      const result = await controller.revokeClientAccess('test-client-id', mockUser);

      // Assert
      expect(result).toEqual({ message: 'Client access revoked successfully' });
      expect(oauthService.revokeClientAccess).toHaveBeenCalledWith(
        mockUser.sub,
        'test-client-id',
      );
    });
  });

  describe('getUserTokens', () => {
    it('should return user tokens', async () => {
      // Arrange
      const tokens = {
        access_tokens: [{
          token: 'access-token-123',
          id: 'token-id-1',
          client_id: 'test-client-id',
          created_at: new Date(),
          user_id: 'user-id-1',
          scope: 'openid email',
          expires_at: new Date(),
          token_type: 'Bearer',
          revoked_at: null,
          client: {
            name: 'Test Client',
            client_id: 'test-client-id',
          },
        }],
        refresh_tokens: [{
          token: 'refresh-token-123',
          id: 'refresh-token-id-1',
          client_id: 'test-client-id',
          created_at: new Date(),
          user_id: 'user-id-1',
          scope: 'openid email',
          expires_at: new Date(),
          client: {
            name: 'Test Client',
            client_id: 'test-client-id',
          },
        }],
      };
      oauthService.getUserTokens.mockResolvedValue(tokens);

      // Act
      const result = await controller.getUserTokens(mockUser);

      // Assert
      expect(result).toEqual(tokens);
      expect(oauthService.getUserTokens).toHaveBeenCalledWith(mockUser.sub);
    });
  });
});
