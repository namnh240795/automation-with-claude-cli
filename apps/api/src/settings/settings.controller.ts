import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { SettingsService } from './settings.service';
import { JwtAuthGuard } from '@app/auth-utilities';

@ApiTags('Settings')
@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get(':serviceName')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get settings for a service' })
  async getSettings(@Param('serviceName') serviceName: string) {
    return this.settingsService.getSettings(serviceName);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Set settings for a service' })
  async setSettings(@Body() body: { service_name: string; data: any }) {
    return this.settingsService.setSettings(body.service_name, body.data);
  }
}
