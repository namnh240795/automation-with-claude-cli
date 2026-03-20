import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

class HealthResponseDto {
  status: string;
  timestamp: Date;
  service: string;
  version: string;
  uptime: number;
}

@ApiTags('Health')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  @ApiOperation({ summary: 'Health check' })
  @ApiOkResponse({
    description: 'Service health status',
    type: HealthResponseDto,
  })
  healthCheck(): HealthResponseDto {
    return this.appService.getHealth();
  }
}
