import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
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
} from '@nestjs/swagger';
import { EnvironmentsService } from './environments.service';
import { CreateEnvironmentDto, UpdateEnvironmentDto } from './dto';
import { JwtAuthGuard } from '@app/auth-utilities';
import {
  AuthUser,
  JwtPayloadDto,
  Roles,
  RolesGuard,
} from '@app/auth-utilities';

@ApiTags('Environments')
@ApiBearerAuth()
@Controller('environments')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SUPER_ADMIN')
export class EnvironmentsController {
  constructor(private readonly environmentsService: EnvironmentsService) {}

  @Post()
  @Version('1')
  @ApiOperation({ summary: 'Create environment' })
  @ApiResponse({ status: 201, description: 'Created' })
  @ApiResponse({ status: 409, description: 'Name already exists' })
  create(@Body() dto: CreateEnvironmentDto, @AuthUser() user: JwtPayloadDto) {
    return this.environmentsService.create(dto, user.sub);
  }

  @Get()
  @Version('1')
  @ApiOperation({ summary: 'List all environments' })
  @ApiResponse({ status: 200, description: 'Success' })
  findAll() {
    return this.environmentsService.findAll();
  }

  @Get(':id')
  @Version('1')
  @ApiOperation({ summary: 'Get environment by ID' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 404, description: 'Not found' })
  findOne(@Param('id') id: string) {
    return this.environmentsService.findOne(id);
  }

  @Patch(':id')
  @Version('1')
  @ApiOperation({ summary: 'Update environment' })
  @ApiResponse({ status: 200, description: 'Updated' })
  @ApiResponse({ status: 404, description: 'Not found' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateEnvironmentDto,
    @AuthUser() user: JwtPayloadDto,
  ) {
    return this.environmentsService.update(id, dto, user.sub);
  }

  @Delete(':id')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Soft delete environment' })
  @ApiResponse({ status: 204, description: 'Deleted' })
  @ApiResponse({ status: 404, description: 'Not found' })
  remove(@Param('id') id: string, @AuthUser() user: JwtPayloadDto) {
    return this.environmentsService.remove(id, user.sub);
  }
}
