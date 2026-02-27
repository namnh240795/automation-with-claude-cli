import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LogActivity } from '@app/app-logger';
import { HelloResponseDto, HealthResponseDto, UserInfoResponseDto } from './dto';
import { KeycloakUserInfo } from '@app/keycloak-integration';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  @LogActivity()
  getHello(): HelloResponseDto {
    return {
      message: 'Hello from API!',
      timestamp: new Date(),
      request_id: crypto.randomUUID(),
    };
  }

  @LogActivity()
  getHealth(): HealthResponseDto {
    return {
      status: 'ok',
      timestamp: new Date(),
      service: 'backend',
      version: '1.0.0',
      uptime: process.uptime(),
    };
  }

  @LogActivity()
  getUserInfo(user: KeycloakUserInfo): UserInfoResponseDto {
    return {
      sub: user.sub,
      email: user.email,
      first_name: user.given_name,
      last_name: user.family_name,
      message: 'This is a protected endpoint - you have access!',
      timestamp: new Date(),
    };
  }
}
