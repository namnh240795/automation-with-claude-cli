import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

const ENVIRONMENT = {
  AUTH_SERVICE_URL: 'AUTH_SERVICE_URL',
};

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private accessToken: string | null = null;
  private tokenExpiresAt: Date | null = null;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async getAccessToken(): Promise<string> {
    // Check if we have a valid cached token
    if (this.accessToken && this.tokenExpiresAt && this.tokenExpiresAt > new Date()) {
      return this.accessToken;
    }

    const authServiceUrl = this.configService.get<string>(ENVIRONMENT.AUTH_SERVICE_URL, 'http://localhost:3001/auth');
    const clientId = this.configService.get<string>('API_CLIENT_ID');
    const clientSecret = this.configService.get<string>('API_CLIENT_SECRET');

    if (!clientId || !clientSecret) {
      throw new Error('API_CLIENT_ID and API_CLIENT_SECRET must be configured');
    }

    try {
      const response = await this.httpService.axiosRef.post(
        `${authServiceUrl}/v1/oauth/token`,
        {
          grant_type: 'client_credentials',
          client_id: clientId,
          client_secret: clientSecret,
          scope: 'keyvault:read',
        },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );

      this.accessToken = response.data.access_token;
      const expiresIn = response.data.expires_in;
      this.tokenExpiresAt = new Date(Date.now() + (expiresIn - 60) * 1000); // Refresh 60s before expiry

      this.logger.log('Successfully obtained access token from auth service');
      return this.accessToken;
    } catch (error) {
      this.logger.error(`Failed to get access token: ${error.message}`);
      throw new Error('Failed to authenticate with auth service');
    }
  }

  async invalidateToken(): Promise<void> {
    this.accessToken = null;
    this.tokenExpiresAt = null;
  }
}
