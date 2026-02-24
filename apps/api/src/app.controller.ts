import { Controller, Get, Version } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
} from '@nestjs/swagger';
import { AppService } from './app.service';
import { HelloResponseDto, HealthResponseDto, ConfigResponseDto } from './dto';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Version('1')
  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiOkResponse({
    description: 'Service is running',
    type: HelloResponseDto,
  })
  getHello(): HelloResponseDto {
    return this.appService.getHello();
  }

  @Get('health')
  @Version('1')
  @ApiOperation({ summary: 'Health check' })
  @ApiOkResponse({
    description: 'Service health status',
    type: HealthResponseDto,
  })
  healthCheck(): HealthResponseDto {
    return this.appService.getHealth();
  }

  // @Get('config')
  // @Version('1')
  // @ApiOperation({ summary: 'Get service configuration' })
  // @ApiOkResponse({
  //   description: 'Service configuration and information',
  //   type: ConfigResponseDto,
  // })
  // getConfig(): ConfigResponseDto {
  //   return this.appService.getConfig();
  // }
}
