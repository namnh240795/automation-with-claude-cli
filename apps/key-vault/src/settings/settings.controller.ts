import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Version,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { SettingsService } from './settings.service';
import { CreateSettingDto, UpdateSettingDto } from './dto';
import { JwtAuthGuard } from '@app/auth-utilities';
import {
  AuthUser,
  JwtPayloadDto,
  Roles,
  RolesGuard,
} from '@app/auth-utilities';
import { SettingType } from '../common/enum';

@ApiTags('Settings')
@ApiBearerAuth()
@Controller('settings')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SUPER_ADMIN')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Post()
  @Version('1')
  @ApiOperation({ summary: 'Create setting' })
  @ApiResponse({ status: 201, description: 'Created' })
  @ApiResponse({ status: 409, description: 'Key already exists for service' })
  create(@Body() dto: CreateSettingDto, @AuthUser() user: JwtPayloadDto) {
    return this.settingsService.create(dto, user.sub);
  }

  @Get()
  @Version('1')
  @ApiOperation({ summary: 'List settings' })
  @ApiQuery({ name: 'service_name', required: false })
  @ApiQuery({ name: 'type', required: false, enum: SettingType })
  @ApiQuery({ name: 'search', required: false })
  @ApiResponse({ status: 200, description: 'Success' })
  findAll(
    @Query('service_name') serviceName?: string,
    @Query('type') type?: string,
    @Query('search') search?: string,
  ) {
    return this.settingsService.findAll({
      service_name: serviceName,
      type,
      search,
    });
  }

  @Get(':id')
  @Version('1')
  @ApiOperation({ summary: 'Get setting by ID with current values' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 404, description: 'Not found' })
  findOne(@Param('id') id: string) {
    return this.settingsService.findOne(id);
  }

  @Patch(':id')
  @Version('1')
  @ApiOperation({ summary: 'Update setting metadata' })
  @ApiResponse({ status: 200, description: 'Updated' })
  @ApiResponse({ status: 404, description: 'Not found' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateSettingDto,
    @AuthUser() user: JwtPayloadDto,
  ) {
    return this.settingsService.update(id, dto, user.sub);
  }

  @Delete(':id')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Soft delete setting' })
  @ApiResponse({ status: 204, description: 'Deleted' })
  @ApiResponse({ status: 404, description: 'Not found' })
  remove(@Param('id') id: string, @AuthUser() user: JwtPayloadDto) {
    return this.settingsService.remove(id, user.sub);
  }
}
