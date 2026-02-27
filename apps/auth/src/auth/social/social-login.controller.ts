import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Redirect,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiParam } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { KeycloakService } from '@app/keycloak-integration';
import {
  SocialProvider,
  SocialLoginRedirectDto,
  SocialLoginCallbackDto,
  SocialProviderInfo,
  SocialLoginResponse,
} from '@app/keycloak-integration';

/**
 * Social Login Controller
 * Handles OAuth2 social login flows with Keycloak identity providers
 */
@ApiTags('Social Login')
@Controller('auth/social')
export class SocialLoginController {
  private readonly logger = new Logger(SocialLoginController.name);

  constructor(
    private readonly keycloakService: KeycloakService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Get list of available social login providers
   */
  @Get('providers')
  @ApiOperation({ summary: 'Get available social login providers' })
  getProviders(): SocialProviderInfo[] {
    const providers: SocialProviderInfo[] = [
      {
        provider: SocialProvider.GOOGLE,
        name: 'Google',
        authorizationUrl: this.buildAuthorizationUrl(SocialProvider.GOOGLE),
        configured: !!this.configService.get<string>('GOOGLE_CLIENT_ID'),
      },
      {
        provider: SocialProvider.GITHUB,
        name: 'GitHub',
        authorizationUrl: this.buildAuthorizationUrl(SocialProvider.GITHUB),
        configured: !!this.configService.get<string>('GITHUB_CLIENT_ID'),
      },
      {
        provider: SocialProvider.FACEBOOK,
        name: 'Facebook',
        authorizationUrl: this.buildAuthorizationUrl(SocialProvider.FACEBOOK),
        configured: !!this.configService.get<string>('FACEBOOK_CLIENT_ID'),
      },
    ];

    return providers;
  }

  /**
   * Redirect to social provider for OAuth2 login
   * Initiates the OAuth2 authorization code flow
   */
  @Get('login/:provider')
  @Redirect()
  @ApiOperation({ summary: 'Redirect to social provider for login' })
  @ApiParam({
    name: 'provider',
    enum: SocialProvider,
    description: 'Social login provider',
  })
  @ApiQuery({
    name: 'redirect_uri',
    required: false,
    description: 'Custom redirect URI after successful login',
  })
  @ApiQuery({
    name: 'state',
    required: false,
    description: 'Opaque value to maintain state between request and callback',
  })
  login(@Param('provider') provider: SocialProvider, @Query('redirect_uri') redirectUri?: string, @Query('state') state?: string): { url: string } {
    // Validate provider
    if (!Object.values(SocialProvider).includes(provider)) {
      throw new HttpException('Invalid provider', HttpStatus.BAD_REQUEST);
    }

    // Check if provider is configured
    const clientId = this.configService.get<string>(`${this.getProviderEnvPrefix(provider)}CLIENT_ID`);
    if (!clientId) {
      throw new HttpException(
        `${provider} login is not configured`,
        HttpStatus.BAD_REQUEST,
      );
    }

    // Generate state if not provided
    const finalState = state || this.generateState();

    // Build authorization URL
    const authUrl = this.buildAuthorizationUrl(provider, finalState);

    this.logger.log(`Initiating ${provider} login with state: ${finalState}`);

    return { url: authUrl };
  }

  /**
   * Handle callback from social provider
   * Receives authorization code and exchanges for tokens
   */
  @Get('callback/:provider')
  @ApiOperation({ summary: 'Handle callback from social provider' })
  @ApiParam({
    name: 'provider',
    enum: SocialProvider,
    description: 'Social login provider',
  })
  @ApiQuery({
    name: 'code',
    required: true,
    description: 'Authorization code from provider',
  })
  @ApiQuery({
    name: 'state',
    required: false,
    description: 'State value from initial request',
  })
  @ApiQuery({
    name: 'session_state',
    required: false,
    description: 'Session state from Keycloak',
  })
  async callback(
    @Param('provider') provider: SocialProvider,
    @Query('code') code: string,
    @Query('state') state?: string,
    @Query('session_state') sessionState?: string,
  ): Promise<SocialLoginResponse> {
    try {
      if (!code) {
        throw new HttpException('Authorization code is required', HttpStatus.BAD_REQUEST);
      }

      this.logger.log(`Received ${provider} callback with code: ${code.substring(0, 10)}...`);

      // Exchange authorization code for tokens
      const tokenResponse = await this.keycloakService.exchangeCodeForToken(code);

      // Get user info
      const userInfo = await this.keycloakService.getUserInfo(tokenResponse.access_token);

      this.logger.log(`User ${userInfo.sub} logged in successfully via ${provider}`);

      return {
        access_token: tokenResponse.access_token,
        refresh_token: tokenResponse.refresh_token,
        expires_in: tokenResponse.expires_in,
        user: {
          sub: userInfo.sub,
          email: userInfo.email,
          email_verified: userInfo.email_verified,
          name: userInfo.name,
          given_name: userInfo.given_name,
          family_name: userInfo.family_name,
          provider,
        },
      };
    } catch (error) {
      this.logger.error(
        `${provider} callback failed: ${error instanceof Error ? error.message : String(error)}`,
      );
      throw new HttpException(
        `Authentication with ${provider} failed`,
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  /**
   * Build Keycloak broker URL for social provider
   * Keycloak acts as the broker for OAuth2 flows
   */
  private buildAuthorizationUrl(provider: SocialProvider, state?: string): string {
    const keycloakUrl = this.configService.get<string>('KEYCLOAK_SERVER_URL');
    const realm = this.configService.get<string>('KEYCLOAK_REALM');
    const clientId = this.configService.get<string>('KEYCLOAK_CLIENT_ID');
    const redirectUri = this.configService.get<string>('KEYCLOAK_CALLBACK_URL');

    const params = new URLSearchParams({
      client_id: clientId || '',
      redirect_uri: redirectUri || 'http://localhost:3001/auth/callback',
      response_type: 'code',
      scope: 'openid profile email',
      kc_idp_hint: provider,
    });

    if (state) {
      params.append('state', state);
    }

    return `${keycloakUrl}/realms/${realm}/protocol/openid-connect/auth?${params.toString()}`;
  }

  /**
   * Get environment variable prefix for provider
   */
  private getProviderEnvPrefix(provider: SocialProvider): string {
    switch (provider) {
      case SocialProvider.GOOGLE:
        return 'GOOGLE_';
      case SocialProvider.GITHUB:
        return 'GITHUB_';
      case SocialProvider.FACEBOOK:
        return 'FACEBOOK_';
      default:
        return '';
    }
  }

  /**
   * Generate a random state value for OAuth2 security
   */
  private generateState(): string {
    return Math.random().toString(36).substring(2, 15) +
           Math.random().toString(36).substring(2, 15);
  }
}
