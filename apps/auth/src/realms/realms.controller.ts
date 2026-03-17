import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@app/auth-utilities';
import { RealmsService } from './realms.service';
import { CreateRealmDto, UpdateRealmDto, RealmResponseDto, RealmsPaginatedResponseDto, SmtpConfigResponseDto } from './dto';
import { PaginationDto, IdResponseDto } from '../dto';

@ApiTags('Realms')
@Controller('api/v1/realms')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class RealmsController {
  constructor(private readonly realmsService: RealmsService) {}

  @Get()
  @ApiOperation({ summary: 'List all realms' })
  @ApiResponse({
    status: 200,
    description: 'List of realms',
    type: RealmsPaginatedResponseDto,
  })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 0 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 20 })
  async findAll(
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page = 0,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit = 20,
  ) {
    return this.realmsService.findAll(page, limit);
  }

  @Get(':realmId')
  @ApiOperation({ summary: 'Get realm details' })
  @ApiParam({ name: 'realmId', description: 'Realm ID', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiResponse({
    status: 200,
    description: 'Realm details',
    type: RealmResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Realm not found' })
  async findOne(@Param('realmId') realmId: string) {
    return this.realmsService.findOne(realmId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new realm' })
  @ApiResponse({
    status: 201,
    description: 'Realm successfully created',
    type: RealmResponseDto,
  })
  @ApiResponse({ status: 409, description: 'Realm with this name already exists' })
  async create(@Body() createRealmDto: CreateRealmDto) {
    return this.realmsService.create(createRealmDto);
  }

  @Put(':realmId')
  @ApiOperation({ summary: 'Update realm' })
  @ApiParam({ name: 'realmId', description: 'Realm ID', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiResponse({
    status: 200,
    description: 'Realm successfully updated',
    type: RealmResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Realm not found' })
  @ApiResponse({ status: 409, description: 'Realm with this name already exists' })
  async update(
    @Param('realmId') realmId: string,
    @Body() updateRealmDto: UpdateRealmDto,
  ) {
    return this.realmsService.update(realmId, updateRealmDto);
  }

  @Delete(':realmId')
  @ApiOperation({ summary: 'Delete realm' })
  @ApiParam({ name: 'realmId', description: 'Realm ID', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiResponse({
    status: 200,
    description: 'Realm successfully deleted',
    type: IdResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Realm not found' })
  @ApiResponse({ status: 409, description: 'Cannot delete master realm' })
  async delete(@Param('realmId') realmId: string) {
    return this.realmsService.delete(realmId);
  }

  @Get(':realmId/attributes')
  @ApiOperation({ summary: 'Get realm attributes' })
  @ApiParam({ name: 'realmId', description: 'Realm ID', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiResponse({
    status: 200,
    description: 'Realm attributes as key-value pairs',
    type: 'object',
  })
  async getAttributes(@Param('realmId') realmId: string) {
    return this.realmsService.getAttributes(realmId);
  }

  @Put(':realmId/attributes')
  @ApiOperation({ summary: 'Update realm attributes' })
  @ApiParam({ name: 'realmId', description: 'Realm ID', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiResponse({
    status: 200,
    description: 'Realm attributes successfully updated',
    type: 'object',
  })
  async updateAttributes(
    @Param('realmId') realmId: string,
    @Body() attributes: Record<string, string>,
  ) {
    return this.realmsService.updateAttributes(realmId, attributes);
  }

  @Delete(':realmId/attributes/:name')
  @ApiOperation({ summary: 'Delete realm attribute' })
  @ApiParam({ name: 'realmId', description: 'Realm ID', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiParam({ name: 'name', description: 'Attribute name', example: 'customAttribute' })
  @ApiResponse({
    status: 200,
    description: 'Attribute successfully deleted',
  })
  async deleteAttribute(
    @Param('realmId') realmId: string,
    @Param('name') name: string,
  ) {
    return this.realmsService.deleteAttribute(realmId, name);
  }

  @Get(':realmId/smtp')
  @ApiOperation({ summary: 'Get realm SMTP configuration' })
  @ApiParam({ name: 'realmId', description: 'Realm ID', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiResponse({
    status: 200,
    description: 'Realm SMTP configuration',
    type: 'object',
  })
  async getSmtpConfig(@Param('realmId') realmId: string) {
    return this.realmsService.getSmtpConfig(realmId);
  }

  @Put(':realmId/smtp')
  @ApiOperation({ summary: 'Update realm SMTP configuration' })
  @ApiParam({ name: 'realmId', description: 'Realm ID', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiResponse({
    status: 200,
    description: 'SMTP configuration successfully updated',
    type: SmtpConfigResponseDto,
  })
  async updateSmtpConfig(
    @Param('realmId') realmId: string,
    @Body() config: any,
  ) {
    return this.realmsService.updateSmtpConfig(realmId, config);
  }
}
