import { Controller, Get, Version, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AppService } from './app.service';
import { HelloResponseDto, HealthResponseDto, UserInfoResponseDto } from './dto';
import { KeycloakAuthGuard, KeycloakUser, KeycloakUserInfo } from '@app/keycloak-integration';

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

  @Get('me')
  @Version('1')
  @UseGuards(KeycloakAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user info (Protected)' })
  @ApiOkResponse({
    description: 'User info retrieved successfully',
    type: UserInfoResponseDto,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized - Invalid or missing token' })
  getUserInfo(@KeycloakUser() user: KeycloakUserInfo): UserInfoResponseDto {
    // Extract user info directly from Keycloak token using @KeycloakUser() decorator
    return this.appService.getUserInfo(user);
  }
}
