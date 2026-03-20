import { Injectable, BadRequestException, UnauthorizedException, Logger } from '@nestjs/common';
import { ClientService } from './client.service';
import { AuthorizationService } from './authorization.service';
import { TokenService } from './token.service';
import { DeviceFlowService } from './device-flow.service';
import { PrismaService } from '../prisma/prisma.service';
import { hashPassword, verifyPassword } from '@app/auth-utilities';
import { OAUTH_ERRORS, GRANT_TYPES } from './oauth.constants';

@Injectable()
export class OAuthService {
  private readonly logger = new Logger(OAuthService.name);

  constructor(
    private readonly clientService: ClientService,
    private readonly authorizationService: AuthorizationService,
    private readonly tokenService: TokenService,
    private readonly deviceFlowService: DeviceFlowService,
    private readonly prisma: PrismaService,
  ) {}

  /**
   * Handle authorization code request
   */
  async handleAuthorizationRequest(data: {
    response_type: string;
    client_id: string;
    redirect_uri: string;
    scope?: string;
    state?: string;
    code_challenge?: string;
    code_challenge_method?: string;
    nonce?: string;
    user_id: string;
  }): Promise<{ redirect_uri: string; code?: string; state?: string }> {
    const { response_type, client_id, redirect_uri, scope, state, code_challenge, code_challenge_method, nonce, user_id } = data;

    // Validate response_type
    if (response_type !== 'code') {
      throw new BadRequestException({
        error: OAUTH_ERRORS.UNSUPPORTED_GRANT_TYPE,
        error_description: 'Only authorization code flow is supported',
        state,
      });
    }

    // Get client
    const client = await this.clientService.findByClientId(client_id);

    // Validate redirect URI
    if (!this.clientService.validateRedirectUri(client, redirect_uri)) {
      throw new BadRequestException({
        error: OAUTH_ERRORS.INVALID_REQUEST,
        error_description: 'Invalid redirect URI',
        state,
      });
    }

    // Check if client supports authorization code grant
    if (!this.clientService.supportsGrantType(client, GRANT_TYPES.AUTHORIZATION_CODE)) {
      throw new BadRequestException({
        error: OAUTH_ERRORS.UNAUTHORIZED_CLIENT,
        error_description: 'Client does not support authorization code grant',
        state,
      });
    }

    // Validate scope
    const requestedScope = scope || 'openid';
    if (!this.clientService.supportsScope(client, requestedScope)) {
      throw new BadRequestException({
        error: OAUTH_ERRORS.INVALID_SCOPE,
        error_description: 'Invalid or unsupported scope',
        state,
      });
    }

    // For public clients, require PKCE
    if (client.is_public_client && client.require_pkce && !code_challenge) {
      throw new BadRequestException({
        error: OAUTH_ERRORS.INVALID_REQUEST,
        error_description: 'PKCE is required for this client',
        state,
      });
    }

    // Check existing user consent
    await this.checkOrCreateUserConsent(user_id, client.id, requestedScope);

    // Generate authorization code
    const code = await this.authorizationService.generateAuthorizationCode({
      client_id,
      user_id,
      redirect_uri,
      scope: requestedScope,
      state,
      code_challenge,
      code_challenge_method,
      nonce,
    });

    return {
      redirect_uri: `${redirect_uri}${redirect_uri.includes('?') ? '&' : '?'}code=${code}${state ? `&state=${state}` : ''}`,
      code,
      state,
    };
  }

  /**
   * Handle token request
   */
  async handleTokenRequest(data: {
    grant_type: string;
    code?: string;
    redirect_uri?: string;
    client_id?: string;
    client_secret?: string;
    refresh_token?: string;
    code_verifier?: string;
    device_code?: string;
    scope?: string;
  }) {
    const { grant_type } = data;

    switch (grant_type) {
      case GRANT_TYPES.AUTHORIZATION_CODE:
        return this.handleAuthorizationCodeGrant(data);
      case GRANT_TYPES.REFRESH_TOKEN:
        return this.handleRefreshTokenGrant(data);
      case GRANT_TYPES.CLIENT_CREDENTIALS:
        return this.handleClientCredentialsGrant(data);
      case GRANT_TYPES.DEVICE_CODE:
        return this.handleDeviceCodeGrant(data);
      default:
        throw new BadRequestException({
          error: OAUTH_ERRORS.UNSUPPORTED_GRANT_TYPE,
          error_description: 'Unsupported grant type',
        });
    }
  }

  /**
   * Handle authorization code grant
   */
  private async handleAuthorizationCodeGrant(data: any) {
    const { code, redirect_uri, client_id, client_secret, code_verifier } = data;

    if (!code || !redirect_uri || !client_id) {
      throw new BadRequestException({
        error: OAUTH_ERRORS.INVALID_REQUEST,
        error_description: 'Missing required parameters',
      });
    }

    // Validate client credentials
    const isValidClient = await this.clientService.validateClient(client_id, client_secret);
    if (!isValidClient) {
      throw new UnauthorizedException({
        error: OAUTH_ERRORS.INVALID_CLIENT,
        error_description: 'Invalid client credentials',
      });
    }

    // Validate and consume authorization code
    const authResult = await this.authorizationService.validateAndConsumeAuthorizationCode({
      code,
      client_id,
      redirect_uri,
      code_verifier,
    });

    // Get user details
    const user = await this.prisma.user.findUnique({
      where: { id: authResult.user_id },
      select: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
      },
    });

    if (!user) {
      throw new BadRequestException({
        error: OAUTH_ERRORS.INVALID_GRANT,
        error_description: 'User not found',
      });
    }

    // Generate access token
    const { token: accessToken, expires_at: accessTokenExpires } =
      await this.tokenService.generateAccessToken({
        user_id: user.id,
        email: user.email,
        first_name: user.first_name || undefined,
        last_name: user.last_name || undefined,
        client_id,
        scope: authResult.scope,
      });

    // Get the access token ID for refresh token binding
    const accessTokenRecord = await this.prisma.oAuthAccessToken.findUnique({
      where: { token: accessToken },
      select: { id: true },
    });

    // Generate refresh token if offline_access was requested
    let refreshToken: string | undefined;
    if (authResult.scope.includes('offline_access') && accessTokenRecord) {
      const { token: rt } = await this.tokenService.generateRefreshToken({
        user_id: user.id,
        client_id,
        access_token_id: accessTokenRecord.id,
        scope: authResult.scope,
      });
      refreshToken = rt;
    }

    const expiresIn = Math.floor((accessTokenExpires.getTime() - Date.now()) / 1000);

    return {
      access_token: accessToken,
      token_type: 'Bearer',
      expires_in: expiresIn,
      refresh_token: refreshToken,
      scope: authResult.scope,
    };
  }

  /**
   * Handle refresh token grant
   */
  private async handleRefreshTokenGrant(data: any) {
    const { refresh_token, client_id, client_secret } = data;

    if (!refresh_token || !client_id) {
      throw new BadRequestException({
        error: OAUTH_ERRORS.INVALID_REQUEST,
        error_description: 'Missing required parameters',
      });
    }

    // Validate client credentials
    const isValidClient = await this.clientService.validateClient(client_id, client_secret);
    if (!isValidClient) {
      throw new UnauthorizedException({
        error: OAUTH_ERRORS.INVALID_CLIENT,
        error_description: 'Invalid client credentials',
      });
    }

    return this.tokenService.refreshAccessToken({
      refresh_token,
      client_id,
    });
  }

  /**
   * Handle client credentials grant
   */
  private async handleClientCredentialsGrant(data: any) {
    const { client_id, client_secret, scope } = data;

    if (!client_id || !client_secret) {
      throw new BadRequestException({
        error: OAUTH_ERRORS.INVALID_REQUEST,
        error_description: 'Missing required parameters',
      });
    }

    // Validate client credentials
    const client = await this.clientService.findByClientId(client_id);
    if (!verifyPassword(client_secret, client.client_secret_hash || '')) {
      throw new UnauthorizedException({
        error: OAUTH_ERRORS.INVALID_CLIENT,
        error_description: 'Invalid client credentials',
      });
    }

    // Check if client supports client credentials grant
    if (!this.clientService.supportsGrantType(client, GRANT_TYPES.CLIENT_CREDENTIALS)) {
      throw new BadRequestException({
        error: OAUTH_ERRORS.UNAUTHORIZED_CLIENT,
        error_description: 'Client does not support client credentials grant',
      });
    }

    // Validate scope
    const requestedScope = scope || client.scopes.join(' ');
    if (!this.clientService.supportsScope(client, requestedScope)) {
      throw new BadRequestException({
        error: OAUTH_ERRORS.INVALID_SCOPE,
        error_description: 'Invalid or unsupported scope',
      });
    }

    // Generate access token (no user context for client credentials)
    const { token: accessToken, expires_at: accessTokenExpires } =
      await this.tokenService.generateAccessToken({
        user_id: '', // No user for client credentials
        email: `${client.name}@client`, // Placeholder
        client_id,
        scope: requestedScope,
      });

    const expiresIn = Math.floor((accessTokenExpires.getTime() - Date.now()) / 1000);

    return {
      access_token: accessToken,
      token_type: 'Bearer',
      expires_in: expiresIn,
      scope: requestedScope,
    };
  }

  /**
   * Handle device code grant
   */
  private async handleDeviceCodeGrant(data: any) {
    const { device_code, client_id } = data;

    if (!device_code || !client_id) {
      throw new BadRequestException({
        error: OAUTH_ERRORS.INVALID_REQUEST,
        error_description: 'Missing required parameters',
      });
    }

    // Get device code info
    const deviceCodeInfo = await this.deviceFlowService.getDeviceCodeInfo(device_code);

    if (!deviceCodeInfo) {
      throw new BadRequestException({
        error: OAUTH_ERRORS.INVALID_GRANT,
        error_description: 'Invalid device code',
      });
    }

    // Check if expired
    if (deviceCodeInfo.expires_at < new Date()) {
      throw new BadRequestException({
        error: OAUTH_ERRORS.EXPIRED_TOKEN,
        error_description: 'Device code has expired',
      });
    }

    // Check if already completed
    if (deviceCodeInfo.completed_at) {
      throw new BadRequestException({
        error: OAUTH_ERRORS.INVALID_GRANT,
        error_description: 'Device code already used',
      });
    }

    // Poll device status
    const status = await this.deviceFlowService.pollDeviceStatus(device_code);

    if (status.status === 'pending') {
      throw new BadRequestException({
        error: 'authorization_pending',
        error_description: 'Authorization pending',
      });
    }

    if (status.status === 'expired') {
      throw new BadRequestException({
        error: OAUTH_ERRORS.EXPIRED_TOKEN,
        error_description: 'Device code has expired',
      });
    }

    if (!status.user_id) {
      throw new BadRequestException({
        error: OAUTH_ERRORS.ACCESS_DENIED,
        error_description: 'Access denied',
      });
    }

    // Get user details
    const user = await this.prisma.user.findUnique({
      where: { id: status.user_id },
      select: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
      },
    });

    if (!user) {
      throw new BadRequestException({
        error: OAUTH_ERRORS.INVALID_GRANT,
        error_description: 'User not found',
      });
    }

    // Generate access token
    const { token: accessToken, expires_at: accessTokenExpires } =
      await this.tokenService.generateAccessToken({
        user_id: user.id,
        email: user.email,
        first_name: user.first_name || undefined,
        last_name: user.last_name || undefined,
        client_id,
        scope: deviceCodeInfo.scope,
      });

    // Get the access token ID for refresh token binding
    const accessTokenRecord = await this.prisma.oAuthAccessToken.findUnique({
      where: { token: accessToken },
      select: { id: true },
    });

    // Generate refresh token if offline_access was requested
    let refreshToken: string | undefined;
    if (deviceCodeInfo.scope.includes('offline_access') && accessTokenRecord) {
      const { token: rt } = await this.tokenService.generateRefreshToken({
        user_id: user.id,
        client_id,
        access_token_id: accessTokenRecord.id,
        scope: deviceCodeInfo.scope,
      });
      refreshToken = rt;
    }

    // Mark device flow as completed
    await this.deviceFlowService.completeDeviceFlow(device_code);

    const expiresIn = Math.floor((accessTokenExpires.getTime() - Date.now()) / 1000);

    return {
      access_token: accessToken,
      token_type: 'Bearer',
      expires_in: expiresIn,
      refresh_token: refreshToken,
      scope: deviceCodeInfo.scope,
    };
  }

  /**
   * Revoke a token
   */
  async revokeToken(data: { token: string; token_type_hint?: string }) {
    await this.tokenService.revokeToken(data);
    return {};
  }

  /**
   * Introspect a token
   */
  async introspectToken(data: { token: string; token_type_hint?: string }) {
    return this.tokenService.introspectToken(data);
  }

  /**
   * Get user's authorized clients
   */
  async getUserClients(userId: string) {
    const consents = await this.prisma.oAuthUserConsent.findMany({
      where: {
        user_id: userId,
      },
      include: {
        client: {
          select: {
            id: true,
            client_id: true,
            name: true,
            description: true,
            logo_uri: true,
          },
        },
      },
      orderBy: {
        updated_at: 'desc',
      },
    });

    return consents.map((consent) => ({
      client_id: consent.client.client_id,
      name: consent.client.name,
      description: consent.client.description,
      logo_uri: consent.client.logo_uri,
      scope: consent.scope,
      granted_at: consent.created_at,
    }));
  }

  /**
   * Revoke client access
   */
  async revokeClientAccess(userId: string, client_id: string) {
    const client = await this.clientService.findByClientId(client_id);

    // Delete user consent
    await this.prisma.oAuthUserConsent.deleteMany({
      where: {
        user_id: userId,
        client_id: client.id,
      },
    });

    // Revoke all tokens for this user and client
    await Promise.all([
      this.prisma.oAuthAccessToken.updateMany({
        where: {
          user_id: userId,
          client_id: client.id,
        },
        data: { revoked_at: new Date() },
      }),
      this.prisma.oAuthRefreshToken.updateMany({
        where: {
          user_id: userId,
          client_id: client.id,
        },
        data: { revoked_at: new Date() },
      }),
    ]);

    this.logger.log(`Revoked access for user ${userId} from client ${client_id}`);

    return { message: 'Client access revoked successfully' };
  }

  /**
   * Check or create user consent
   */
  private async checkOrCreateUserConsent(userId: string, clientId: string, scope: string) {
    const existingConsent = await this.prisma.oAuthUserConsent.findUnique({
      where: {
        client_id_user_id: {
          client_id: clientId,
          user_id: userId,
        },
      },
    });

    if (existingConsent) {
      // Update consent timestamp and scope
      await this.prisma.oAuthUserConsent.update({
        where: { id: existingConsent.id },
        data: {
          scope,
          updated_at: new Date(),
        },
      });
    } else {
      // Create new consent
      await this.prisma.oAuthUserConsent.create({
        data: {
          client_id: clientId,
          user_id: userId,
          scope,
        },
      });
    }
  }

  /**
   * Get user tokens
   */
  async getUserTokens(userId: string) {
    return this.tokenService.getUserTokens(userId);
  }
}
