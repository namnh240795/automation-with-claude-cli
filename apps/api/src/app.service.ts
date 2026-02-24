import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HelloResponseDto, HealthResponseDto } from './dto';

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
}
