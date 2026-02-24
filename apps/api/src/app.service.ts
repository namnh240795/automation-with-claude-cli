import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HelloResponseDto, HealthResponseDto, ConfigResponseDto } from './dto';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getHello(): HelloResponseDto {
    return {
      message: 'Hello from API!',
      timestamp: new Date(),
      requestId: crypto.randomUUID(),
    };
  }

  getHealth(): HealthResponseDto {
    return {
      status: 'ok',
      timestamp: new Date(),
      service: 'backend',
      version: '1.0.0',
      uptime: process.uptime(),
    };
  }

  getConfig(): ConfigResponseDto {
    const jwtSecret = this.configService.get<string>('JWT_SECRET');
    const databaseUrl = this.configService.get<string>('DATABASE_URL');

    return {
      service: this.configService.get<string>('SERVICE_PREFIX', 'backend'),
      environment: this.configService.get<string>('NODE_ENV', 'development'),
      version: '1.0.0',
      timestamp: new Date(),
      nodeVersion: process.version,
      platform: process.platform,
      features: {
        authentication: Boolean(jwtSecret && jwtSecret !== 'your-jwt-secret-key-change-this'),
        database: Boolean(databaseUrl && databaseUrl.length > 0),
        cache: false,
      },
    };
  }
}
