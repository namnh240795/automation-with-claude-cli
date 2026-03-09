import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import {
  KeycloakTokenResponseDto,
  KeycloakUserInfo,
  KeycloakLoginDto,
  KeycloakRefreshTokenDto,
  KeycloakLogoutDto,
} from './dto/keycloak.dto';

/**
 * Service for Keycloak authentication operations
 * Handles login, token refresh, logout, and user info retrieval
 */
@Injectable()
export class KeycloakService {
  private readonly logger = new Logger(KeycloakService.name);
  private readonly authServerUrl: string;
  private readonly realm: string;
  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly issuer: string;

  constructor(private configService: ConfigService) {
    this.authServerUrl = this.configService.get<string>('KEYCLOAK_SERVER_URL') || '';
    this.realm = this.configService.get<string>('KEYCLOAK_REALM') || '';
    this.clientId = this.configService.get<string>('KEYCLOAK_CLIENT_ID') || '';
    this.clientSecret = this.configService.get<string>('KEYCLOAK_CLIENT_SECRET') || '';
    this.issuer = `${this.authServerUrl}/realms/${this.realm}`;
  }

  /**
   * Get the token endpoint URL
   */
  private getTokenEndpoint(): string {
    return `${this.authServerUrl}/realms/${this.realm}/protocol/openid-connect/token`;
  }

  /**
   * Get the logout endpoint URL
   */
  private getLogoutEndpoint(): string {
    return `${this.authServerUrl}/realms/${this.realm}/protocol/openid-connect/logout`;
  }

  /**
   * Get the user info endpoint URL
   */
  private getUserInfoEndpoint(): string {
    return `${this.authServerUrl}/realms/${this.realm}/protocol/openid-connect/userinfo`;
  }

  /**
   * Get the authorization endpoint URL
   */
  getAuthorizationEndpoint(): string {
    return `${this.authServerUrl}/realms/${this.realm}/protocol/openid-connect/auth`;
  }

  /**
   * Get the callback URL for OAuth2 flow
   */
  getCallbackUrl(): string {
    return this.configService.get<string>('KEYCLOAK_CALLBACK_URL') || 'http://localhost:3000/auth/callback';
  }

  /**
   * Get the post logout redirect URI
   */
  getPostLogoutRedirectUri(): string {
    return this.configService.get<string>('KEYCLOAK_POST_LOGOUT_REDIRECT_URI') || 'http://localhost:3000';
  }

  /**
   * Login with username and password (Resource Owner Password Credentials flow)
   * Returns access token and refresh token
   */
  async login(credentials: KeycloakLoginDto): Promise<KeycloakTokenResponseDto> {
    try {
      const params = new URLSearchParams();
      params.append('grant_type', 'password');
      params.append('client_id', this.clientId);
      params.append('client_secret', this.clientSecret);
      params.append('username', credentials.username);
      params.append('password', credentials.password);

      const response = await axios.post<KeycloakTokenResponseDto>(
        this.getTokenEndpoint(),
        params,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      this.logger.log(`User logged in successfully: ${credentials.username}`);
      return response.data;
    } catch (error) {
      this.logger.error(`Login failed for user: ${credentials.username}`, error instanceof Error ? error.message : String(error));
      throw new Error('Authentication failed');
    }
  }

  /**
   * Exchange authorization code for tokens (Authorization Code flow)
   */
  async exchangeCodeForToken(
    code: string,
    redirectUri?: string,
  ): Promise<KeycloakTokenResponseDto> {
    try {
      const params = new URLSearchParams();
      params.append('grant_type', 'authorization_code');
      params.append('client_id', this.clientId);
      params.append('client_secret', this.clientSecret);
      params.append('code', code);
      params.append('redirect_uri', redirectUri || this.getCallbackUrl());

      const response = await axios.post<KeycloakTokenResponseDto>(
        this.getTokenEndpoint(),
        params,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      this.logger.log('Token exchanged successfully');
      return response.data;
    } catch (error) {
      this.logger.error('Token exchange failed', error instanceof Error ? error.message : String(error));
      throw new Error('Token exchange failed');
    }
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshToken(refreshDto: KeycloakRefreshTokenDto): Promise<KeycloakTokenResponseDto> {
    try {
      const params = new URLSearchParams();
      params.append('grant_type', 'refresh_token');
      params.append('client_id', this.clientId);
      params.append('client_secret', this.clientSecret);
      params.append('refresh_token', refreshDto.refresh_token);

      const response = await axios.post<KeycloakTokenResponseDto>(
        this.getTokenEndpoint(),
        params,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      this.logger.log('Token refreshed successfully');
      return response.data;
    } catch (error) {
      this.logger.error('Token refresh failed', error instanceof Error ? error.message : String(error));
      throw new Error('Token refresh failed');
    }
  }

  /**
   * Logout user and invalidate refresh token
   */
  async logout(logoutDto: KeycloakLogoutDto): Promise<void> {
    try {
      const params = new URLSearchParams();
      params.append('client_id', this.clientId);
      params.append('client_secret', this.clientSecret);
      params.append('refresh_token', logoutDto.refresh_token);

      await axios.post(this.getLogoutEndpoint(), params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      this.logger.log('User logged out successfully');
    } catch (error) {
      this.logger.error('Logout failed', error instanceof Error ? error.message : String(error));
      throw new Error('Logout failed');
    }
  }

  /**
   * Get user info from Keycloak using access token
   */
  async getUserInfo(accessToken: string): Promise<KeycloakUserInfo> {
    try {
      const response = await axios.get<KeycloakUserInfo>(this.getUserInfoEndpoint(), {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response.data;
    } catch (error) {
      this.logger.error('Failed to get user info', error instanceof Error ? error.message : String(error));
      throw new Error('Failed to get user info');
    }
  }

  /**
   * Decode JWT token (without verification - for debugging only)
   * Note: This does not verify the signature
   */
  decodeToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = Buffer.from(base64, 'base64').toString();
      return JSON.parse(jsonPayload);
    } catch (error) {
      this.logger.error('Failed to decode token', error instanceof Error ? error.message : String(error));
      return null;
    }
  }

  /**
   * Extract user info from JWT token
   * This is a lightweight alternative to calling getUserInfo
   */
  extractUserInfo(token: string): KeycloakUserInfo | null {
    const decoded = this.decodeToken(token);
    if (!decoded) {
      return null;
    }

    return {
      sub: decoded.sub,
      email: decoded.email,
      email_verified: decoded.email_verified || false,
      preferred_username: decoded.preferred_username,
      given_name: decoded.given_name,
      family_name: decoded.family_name,
      name: decoded.name,
      resource_access: decoded.resource_access,
      realm_access: decoded.realm_access,
      iat: decoded.iat,
      exp: decoded.exp,
      iss: decoded.iss,
      aud: decoded.aud,
    };
  }

  /**
   * Check if token is expired
   */
  isTokenExpired(token: string): boolean {
    const decoded = this.decodeToken(token);
    if (!decoded || !decoded.exp) {
      return true;
    }
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  }

  /**
   * Get authorization URL for OAuth2 flow
   */
  getAuthorizationUrl(state?: string): string {
    const params = new URLSearchParams({
      client_id: this.clientId,
      redirect_uri: this.getCallbackUrl(),
      response_type: 'code',
      scope: 'openid profile email',
    });

    if (state) {
      params.append('state', state);
    }

    return `${this.getAuthorizationEndpoint()}?${params.toString()}`;
  }
}
