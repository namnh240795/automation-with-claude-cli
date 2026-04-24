import {
  Controller, Get, Put, Post, Body, Param, Query,
  UseGuards, Version,
} from '@nestjs/common';
import {
  ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery,
} from '@nestjs/swagger';
import { SettingValuesService } from './setting-values.service';
import { SetValueDto } from './dto';
import { JwtAuthGuard } from '@app/auth-utilities';
import { AuthUser, JwtPayloadDto, Roles, RolesGuard } from '@app/auth-utilities';

@ApiTags('Setting Values')
@ApiBearerAuth()
@Controller('settings/:settingId/values/:environmentId')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SUPER_ADMIN')
export class SettingValuesController {
  constructor(
    private readonly settingValuesService: SettingValuesService,
  ) {}

  @Put()
  @Version('1')
  @ApiOperation({ summary: 'Set or update a setting value' })
  @ApiResponse({ status: 200, description: 'Value set successfully' })
  @ApiResponse({ status: 404, description: 'Setting or environment not found' })
  setValue(
    @Param('settingId') settingId: string,
    @Param('environmentId') environmentId: string,
    @Body() dto: SetValueDto,
    @AuthUser() user: JwtPayloadDto,
  ) {
    return this.settingValuesService.setValue(
      settingId,
      environmentId,
      dto,
      user.sub,
    );
  }

  @Get()
  @Version('1')
  @ApiOperation({ summary: 'Get current setting value' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 404, description: 'Value not found' })
  @ApiQuery({ name: 'reveal', required: false, type: Boolean, description: 'Reveal decrypted SECURE value' })
  getValue(
    @Param('settingId') settingId: string,
    @Param('environmentId') environmentId: string,
    @Query('reveal') reveal?: string,
  ) {
    const shouldReveal = reveal === 'true';
    return this.settingValuesService.getValue(
      settingId,
      environmentId,
      shouldReveal,
    );
  }

  @Get('history')
  @Version('1')
  @ApiOperation({ summary: 'Get version history' })
  @ApiResponse({ status: 200, description: 'Success' })
  getHistory(
    @Param('settingId') settingId: string,
    @Param('environmentId') environmentId: string,
  ) {
    return this.settingValuesService.getHistory(settingId, environmentId);
  }

  @Post('rollback/:version')
  @Version('1')
  @ApiOperation({ summary: 'Rollback to a previous version' })
  @ApiResponse({ status: 200, description: 'Rolled back successfully' })
  @ApiResponse({ status: 404, description: 'Version not found in history' })
  rollback(
    @Param('settingId') settingId: string,
    @Param('environmentId') environmentId: string,
    @Param('version') version: string,
    @AuthUser() user: JwtPayloadDto,
  ) {
    return this.settingValuesService.rollback(
      settingId,
      environmentId,
      parseInt(version, 10),
      user.sub,
    );
  }
}
