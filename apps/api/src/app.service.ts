import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LogActivity } from '@app/app-logger';
import { HelloResponseDto, HealthResponseDto } from './dto';

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
}
