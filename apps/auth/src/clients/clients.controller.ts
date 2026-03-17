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
import { RealmScopeGuard } from '../guards/realm-scope.guard';
import { ClientsService } from './clients.service';
import { CreateClientDto, UpdateClientDto, ClientResponseDto, ClientsPaginatedResponseDto, ClientSecretResponseDto } from './dto';
import { IdResponseDto } from '../dto';

@ApiTags('Clients')
@Controller('api/v1/realms/:realmId/clients')
@UseGuards(JwtAuthGuard, RealmScopeGuard)
@ApiBearerAuth()
@ApiParam({ name: 'realmId', description: 'Realm ID', example: '550e8400-e29b-41d4-a716-446655440000' })
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  @ApiOperation({ summary: 'List clients in a realm' })
  @ApiResponse({
    status: 200,
    description: 'List of clients',
    type: ClientsPaginatedResponseDto,
  })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 0 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 20 })
  @ApiQuery({ name: 'search', required: false, type: String, description: 'Search in client_id and name' })
  async findAll(
    @Param('realmId') realmId: string,
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page = 0,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit = 20,
    @Query('search') search?: string,
  ) {
    return this.clientsService.findAll(realmId, page, limit, search);
  }

  @Get(':clientId')
  @ApiOperation({ summary: 'Get client details' })
  @ApiParam({ name: 'clientId', description: 'Client ID', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiResponse({
    status: 200,
    description: 'Client details',
    type: ClientResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Client not found' })
  async findOne(
    @Param('realmId') realmId: string,
    @Param('clientId') clientId: string,
  ) {
    return this.clientsService.findOne(realmId, clientId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new client' })
  @ApiResponse({
    status: 201,
    description: 'Client successfully created',
    type: ClientResponseDto,
  })
  @ApiResponse({ status: 409, description: 'Client with this client_id already exists' })
  async create(
    @Param('realmId') realmId: string,
    @Body() createClientDto: CreateClientDto,
  ) {
    return this.clientsService.create(realmId, createClientDto);
  }

  @Put(':clientId')
  @ApiOperation({ summary: 'Update client' })
  @ApiParam({ name: 'clientId', description: 'Client ID', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiResponse({
    status: 200,
    description: 'Client successfully updated',
    type: ClientResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Client not found' })
  @ApiResponse({ status: 409, description: 'Client with this client_id already exists' })
  async update(
    @Param('realmId') realmId: string,
    @Param('clientId') clientId: string,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    return this.clientsService.update(realmId, clientId, updateClientDto);
  }

  @Delete(':clientId')
  @ApiOperation({ summary: 'Delete client' })
  @ApiParam({ name: 'clientId', description: 'Client ID', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiResponse({
    status: 200,
    description: 'Client successfully deleted',
    type: IdResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Client not found' })
  async delete(
    @Param('realmId') realmId: string,
    @Param('clientId') clientId: string,
  ) {
    return this.clientsService.delete(realmId, clientId);
  }

  @Get(':clientId/redirect-uris')
  @ApiOperation({ summary: 'Get client redirect URIs' })
  @ApiParam({ name: 'clientId', description: 'Client ID', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiResponse({
    status: 200,
    description: 'List of redirect URIs',
    isArray: true,
    type: String,
  })
  async getRedirectUris(
    @Param('realmId') realmId: string,
    @Param('clientId') clientId: string,
  ) {
    return this.clientsService.getRedirectUris(realmId, clientId);
  }

  @Post(':clientId/redirect-uris')
  @ApiOperation({ summary: 'Add redirect URI' })
  @ApiParam({ name: 'clientId', description: 'Client ID', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiResponse({
    status: 200,
    description: 'Redirect URI successfully added',
    isArray: true,
    type: String,
  })
  async addRedirectUri(
    @Param('realmId') realmId: string,
    @Param('clientId') clientId: string,
    @Body() body: { uri: string },
  ) {
    return this.clientsService.addRedirectUri(realmId, clientId, body.uri);
  }

  @Delete(':clientId/redirect-uris/:uri')
  @ApiOperation({ summary: 'Remove redirect URI' })
  @ApiParam({ name: 'clientId', description: 'Client ID', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiParam({ name: 'uri', description: 'Redirect URI to remove', example: 'http://localhost:3000/callback' })
  @ApiResponse({
    status: 200,
    description: 'Redirect URI successfully removed',
  })
  async removeRedirectUri(
    @Param('realmId') realmId: string,
    @Param('clientId') clientId: string,
    @Param('uri') uri: string,
  ) {
    return this.clientsService.removeRedirectUri(realmId, clientId, uri);
  }

  @Get(':clientId/secret')
  @ApiOperation({ summary: 'Get client secret' })
  @ApiParam({ name: 'clientId', description: 'Client ID', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiResponse({
    status: 200,
    description: 'Client secret',
    type: ClientsPaginatedResponseDto,
  })
  async getSecret(
    @Param('realmId') realmId: string,
    @Param('clientId') clientId: string,
  ) {
    return this.clientsService.getSecret(realmId, clientId);
  }

  @Post(':clientId/secret/regenerate')
  @ApiOperation({ summary: 'Regenerate client secret' })
  @ApiParam({ name: 'clientId', description: 'Client ID', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiResponse({
    status: 200,
    description: 'Client secret successfully regenerated',
    type: ClientSecretResponseDto,
  })
  async regenerateSecret(
    @Param('realmId') realmId: string,
    @Param('clientId') clientId: string,
  ) {
    return this.clientsService.regenerateSecret(realmId, clientId);
  }
}
