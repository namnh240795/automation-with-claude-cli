import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { AuthService } from '../auth/auth.service';

const ENVIRONMENT = {
  KEYVAULT_SERVICE_URL: 'KEYVAULT_SERVICE_URL',
};

@Injectable()
export class SettingsService {
  private readonly logger = new Logger(SettingsService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly authService: AuthService,
  ) {}

  async getSettings(serviceName: string): Promise<any> {
    const keyvaultUrl = this.configService.get<string>(ENVIRONMENT.KEYVAULT_SERVICE_URL, 'http://localhost:3002/key-vault');

    const accessToken = await this.authService.getAccessToken();

    try {
      const response = await this.httpService.axiosRef.get(
        `${keyvaultUrl}/v1/settings/${serviceName}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      this.logger.log(`Retrieved settings for service: ${serviceName}`);
      return response.data;
    } catch (error) {
      this.logger.error(`Failed to get settings: ${error.message}`);
      throw error;
    }
  }

  async setSettings(serviceName: string, data: any): Promise<any> {
    const keyvaultUrl = this.configService.get<string>(ENVIRONMENT.KEYVAULT_SERVICE_URL, 'http://localhost:3002/key-vault');

    const accessToken = await this.authService.getAccessToken();

    try {
      const response = await this.httpService.axiosRef.post(
        `${keyvaultUrl}/v1/settings`,
        {
          service_name: serviceName,
          data: data,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      this.logger.log(`Set settings for service: ${serviceName}`);
      return response.data;
    } catch (error) {
      this.logger.error(`Failed to set settings: ${error.message}`);
      throw error;
    }
  }
}
