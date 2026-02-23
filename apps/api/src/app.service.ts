import { Injectable } from '@nestjs/common';
import { HelloResponseDto, HealthResponseDto } from './dto';

@Injectable()
export class AppService {
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
