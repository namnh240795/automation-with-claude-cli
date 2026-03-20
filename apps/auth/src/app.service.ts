import { Injectable } from '@nestjs/common';
import { HealthResponseDto } from './dto/health-response.dto';

@Injectable()
export class AppService {
  getHealth(): HealthResponseDto {
    return {
      status: 'ok',
      timestamp: new Date(),
      service: 'auth',
      version: '1.0.0',
      uptime: process.uptime(),
    };
  }
}
