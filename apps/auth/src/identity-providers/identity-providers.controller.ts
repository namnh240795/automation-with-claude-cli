import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { IdentityProvidersService } from './identity-providers.service';
import { JwtAuthGuard } from '@app/auth-utilities';
import {
  IdentityProviderResponseDto,
  IdentityProvidersPaginatedResponseDto,
  CreateIdentityProviderDto,
  UpdateIdentityProviderDto,
  IdentityProviderMapperResponseDto,
  IdentityProviderMappersPaginatedResponseDto,
  CreateIdentityProviderMapperDto,
  UpdateIdentityProviderMapperDto,
  FederatedIdentityResponseDto,
  FederatedIdentitiesListResponseDto,
} from './dto';

@ApiTags('Identity Providers')
@Controller()
export class IdentityProvidersController {
  constructor(private readonly identityProvidersService: IdentityProvidersService) {}

  // ==================== Identity Providers ====================

  /**
   * Get all identity providers for a realm
   */
  @Get('realms/:realmId/identity-providers')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'List identity providers',
    description: 'Get all identity providers configured for a realm (social login, SSO, etc.)',
  })
  @ApiResponse({
    status: 200,
    description: 'Identity providers retrieved successfully',
    type: IdentityProvidersPaginatedResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiParam({
    name: 'realmId',
    description: 'Realm ID',
    example: '08d0b91d-6897-4e8a-8012-1229a95c39d4',
  })
  @ApiQuery({ name: 'page', required: false, example: '0' })
  @ApiQuery({ name: 'limit', required: false, example: '20' })
  async getRealmProviders(
    @Param('realmId') realmId: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<IdentityProvidersPaginatedResponseDto> {
    return this.identityProvidersService.getRealmProviders(
      realmId,
      page ? parseInt(page, 10) : 0,
      limit ? parseInt(limit, 10) : 20,
    );
  }

  /**
   * Get a specific identity provider
   */
  @Get('identity-providers/:internalId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get identity provider',
    description: 'Get details of a specific identity provider',
  })
  @ApiResponse({
    status: 200,
    description: 'Identity provider retrieved successfully',
    type: IdentityProviderResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Identity provider not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiParam({
    name: 'internalId',
    description: 'Identity Provider internal ID',
    example: 'idp-123',
  })
  async getProvider(
    @Param('internalId') internalId: string,
  ): Promise<IdentityProviderResponseDto> {
    return this.identityProvidersService.getProvider(internalId);
  }

  /**
   * Create a new identity provider
   */
  @Post('realms/:realmId/identity-providers')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create identity provider',
    description: 'Create a new identity provider (social login, SAML, OIDC, etc.)',
  })
  @ApiResponse({
    status: 201,
    description: 'Identity provider created successfully',
    type: IdentityProviderResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 409, description: 'Identity provider with alias already exists' })
  @ApiParam({
    name: 'realmId',
    description: 'Realm ID',
    example: '08d0b91d-6897-4e8a-8012-1229a95c39d4',
  })
  @ApiBody({ type: CreateIdentityProviderDto })
  async createProvider(
    @Param('realmId') realmId: string,
    @Body() createProviderDto: CreateIdentityProviderDto,
  ): Promise<IdentityProviderResponseDto> {
    return this.identityProvidersService.createProvider(realmId, createProviderDto);
  }

  /**
   * Update an identity provider
   */
  @Put('identity-providers/:internalId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update identity provider',
    description: 'Update properties of an identity provider',
  })
  @ApiResponse({
    status: 200,
    description: 'Identity provider updated successfully',
    type: IdentityProviderResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Identity provider not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiParam({
    name: 'internalId',
    description: 'Identity Provider internal ID',
    example: 'idp-123',
  })
  @ApiBody({ type: UpdateIdentityProviderDto })
  async updateProvider(
    @Param('internalId') internalId: string,
    @Body() updateProviderDto: UpdateIdentityProviderDto,
  ): Promise<IdentityProviderResponseDto> {
    return this.identityProvidersService.updateProvider(internalId, updateProviderDto);
  }

  /**
   * Delete an identity provider
   */
  @Delete('identity-providers/:internalId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete identity provider',
    description: 'Delete an identity provider from the system',
  })
  @ApiResponse({ status: 204, description: 'Identity provider deleted successfully' })
  @ApiResponse({ status: 404, description: 'Identity provider not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiParam({
    name: 'internalId',
    description: 'Identity Provider internal ID',
    example: 'idp-123',
  })
  async deleteProvider(@Param('internalId') internalId: string): Promise<void> {
    return this.identityProvidersService.deleteProvider(internalId);
  }

  // ==================== Identity Provider Mappers ====================

  /**
   * Get all mappers for a realm
   */
  @Get('realms/:realmId/identity-provider-mappers')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'List identity provider mappers',
    description: 'Get all identity provider mappers for a realm',
  })
  @ApiResponse({
    status: 200,
    description: 'Identity provider mappers retrieved successfully',
    type: IdentityProviderMappersPaginatedResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiParam({
    name: 'realmId',
    description: 'Realm ID',
    example: '08d0b91d-6897-4e8a-8012-1229a95c39d4',
  })
  @ApiQuery({ name: 'page', required: false, example: '0' })
  @ApiQuery({ name: 'limit', required: false, example: '20' })
  async getProviderMappers(
    @Param('realmId') realmId: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<IdentityProviderMappersPaginatedResponseDto> {
    return this.identityProvidersService.getProviderMappers(
      realmId,
      page ? parseInt(page, 10) : 0,
      limit ? parseInt(limit, 10) : 20,
    );
  }

  /**
   * Get all mappers for a specific provider
   */
  @Get('realms/:realmId/identity-providers/:idpAlias/mappers')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'List mappers for identity provider',
    description: 'Get all mappers for a specific identity provider',
  })
  @ApiResponse({
    status: 200,
    description: 'Identity provider mappers retrieved successfully',
    type: IdentityProviderMappersPaginatedResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiParam({
    name: 'realmId',
    description: 'Realm ID',
    example: '08d0b91d-6897-4e8a-8012-1229a95c39d4',
  })
  @ApiParam({
    name: 'idpAlias',
    description: 'Identity Provider alias (e.g., google, facebook)',
    example: 'google',
  })
  async getMappersForProvider(
    @Param('realmId') realmId: string,
    @Param('idpAlias') idpAlias: string,
  ): Promise<IdentityProviderMappersPaginatedResponseDto> {
    return this.identityProvidersService.getMappersForProvider(idpAlias, realmId);
  }

  /**
   * Create a new identity provider mapper
   */
  @Post('realms/:realmId/identity-provider-mappers')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create identity provider mapper',
    description: 'Create a new identity provider mapper for mapping user attributes',
  })
  @ApiResponse({
    status: 201,
    description: 'Identity provider mapper created successfully',
    type: IdentityProviderMapperResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiParam({
    name: 'realmId',
    description: 'Realm ID',
    example: '08d0b91d-6897-4e8a-8012-1229a95c39d4',
  })
  @ApiBody({ type: CreateIdentityProviderMapperDto })
  async createMapper(
    @Param('realmId') realmId: string,
    @Body() createMapperDto: CreateIdentityProviderMapperDto,
  ): Promise<IdentityProviderMapperResponseDto> {
    return this.identityProvidersService.createMapper(realmId, createMapperDto);
  }

  /**
   * Update an identity provider mapper
   */
  @Put('identity-provider-mappers/:mapperId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update identity provider mapper',
    description: 'Update an identity provider mapper',
  })
  @ApiResponse({
    status: 200,
    description: 'Identity provider mapper updated successfully',
    type: IdentityProviderMapperResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Mapper not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiParam({
    name: 'mapperId',
    description: 'Mapper ID',
    example: 'mapper-123',
  })
  @ApiBody({ type: UpdateIdentityProviderMapperDto })
  async updateMapper(
    @Param('mapperId') mapperId: string,
    @Body() updateMapperDto: UpdateIdentityProviderMapperDto,
  ): Promise<IdentityProviderMapperResponseDto> {
    return this.identityProvidersService.updateMapper(mapperId, updateMapperDto);
  }

  /**
   * Delete an identity provider mapper
   */
  @Delete('identity-provider-mappers/:mapperId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete identity provider mapper',
    description: 'Delete an identity provider mapper',
  })
  @ApiResponse({ status: 204, description: 'Identity provider mapper deleted successfully' })
  @ApiResponse({ status: 404, description: 'Mapper not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiParam({
    name: 'mapperId',
    description: 'Mapper ID',
    example: 'mapper-123',
  })
  async deleteMapper(@Param('mapperId') mapperId: string): Promise<void> {
    return this.identityProvidersService.deleteMapper(mapperId);
  }

  // ==================== Federated Identities ====================

  /**
   * Get federated identities for a user
   */
  @Get('users/:userId/federated-identities')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Get user's federated identities",
    description: 'Get all linked social/external accounts for a user',
  })
  @ApiResponse({
    status: 200,
    description: 'Federated identities retrieved successfully',
    type: FederatedIdentitiesListResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiParam({
    name: 'userId',
    description: 'User ID',
    example: 'd7096ad8-f078-4179-882b-6dddc8033971',
  })
  async getUserFederatedIdentities(
    @Param('userId') userId: string,
  ): Promise<FederatedIdentitiesListResponseDto> {
    return this.identityProvidersService.getUserFederatedIdentities(userId);
  }

  /**
   * Unlink a federated identity from a user
   */
  @Delete('users/:userId/federated-identities/:identityProvider')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Unlink federated identity',
    description: 'Remove a linked social/external account from a user',
  })
  @ApiResponse({ status: 204, description: 'Federated identity unlinked successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Federated identity not found' })
  @ApiParam({
    name: 'userId',
    description: 'User ID',
    example: 'd7096ad8-f078-4179-882b-6dddc8033971',
  })
  @ApiParam({
    name: 'identityProvider',
    description: 'Identity Provider ID (e.g., google, facebook)',
    example: 'google',
  })
  async deleteFederatedIdentity(
    @Param('userId') userId: string,
    @Param('identityProvider') identityProvider: string,
  ): Promise<void> {
    return this.identityProvidersService.deleteFederatedIdentity(userId, identityProvider);
  }
}
