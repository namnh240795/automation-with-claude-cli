import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  Version,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { ServiceConsumptionService } from './service-consumption.service';
import { JwtAuthGuard } from '@app/auth-utilities';
import { AuthUser, JwtPayloadDto } from '@app/auth-utilities';

@ApiTags('Service Consumption')
@ApiBearerAuth()
@Controller('service')
@UseGuards(JwtAuthGuard)
export class ServiceConsumptionController {
  constructor(
    private readonly serviceConsumptionService: ServiceConsumptionService,
  ) {}

  @Get(':serviceName/settings')
  @Version('1')
  @ApiOperation({ summary: 'Get all STATIC settings for a service' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Missing environment parameter' })
  @ApiResponse({ status: 404, description: 'Service or environment not found' })
  @ApiQuery({
    name: 'environment',
    type: String,
    description: 'Environment name (required)',
  })
  getServiceSettings(
    @Param('serviceName') serviceName: string,
    @Query('environment') environment: string,
    @AuthUser() _user: JwtPayloadDto,
  ) {
    return this.serviceConsumptionService.getServiceSettings(
      serviceName,
      environment,
    );
  }

  @Get(':serviceName/settings/:key')
  @Version('1')
  @ApiOperation({ summary: 'Get a single STATIC setting by key' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Missing environment parameter' })
  @ApiResponse({ status: 404, description: 'Setting not found' })
  @ApiQuery({
    name: 'environment',
    type: String,
    description: 'Environment name (required)',
  })
  getSingleSetting(
    @Param('serviceName') serviceName: string,
    @Param('key') key: string,
    @Query('environment') environment: string,
    @AuthUser() _user: JwtPayloadDto,
  ) {
    return this.serviceConsumptionService.getSingleSetting(
      serviceName,
      key,
      environment,
    );
  }
}
