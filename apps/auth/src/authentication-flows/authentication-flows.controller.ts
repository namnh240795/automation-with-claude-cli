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
import { AuthenticationService } from './authentication-flows.service';
import { JwtAuthGuard } from '@app/auth-utilities';
import {
  AuthenticationFlowResponseDto,
  AuthenticationFlowsPaginatedResponseDto,
  CreateAuthenticationFlowDto,
  UpdateAuthenticationFlowDto,
  AuthenticationExecutionResponseDto,
  AuthenticationExecutionsPaginatedResponseDto,
  CreateAuthenticationExecutionDto,
  UpdateAuthenticationExecutionDto,
  AuthenticatorConfigResponseDto,
  AuthenticatorConfigsPaginatedResponseDto,
  CreateAuthenticatorConfigDto,
  UpdateAuthenticatorConfigDto,
} from './dto';

@ApiTags('Authentication Flows')
@Controller()
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  // ==================== Authentication Flows ====================

  /**
   * Get all authentication flows for a realm
   */
  @Get('realms/:realmId/authentication-flows')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'List authentication flows',
    description: 'Get all authentication flows configured for a realm',
  })
  @ApiResponse({
    status: 200,
    description: 'Authentication flows retrieved successfully',
    type: AuthenticationFlowsPaginatedResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiParam({
    name: 'realmId',
    description: 'Realm ID',
    example: '08d0b91d-6897-4e8a-8012-1229a95c39d4',
  })
  @ApiQuery({ name: 'page', required: false, example: '0' })
  @ApiQuery({ name: 'limit', required: false, example: '20' })
  async getRealmFlows(
    @Param('realmId') realmId: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<AuthenticationFlowsPaginatedResponseDto> {
    return this.authenticationService.getRealmFlows(
      realmId,
      page ? parseInt(page, 10) : 0,
      limit ? parseInt(limit, 10) : 20,
    );
  }

  /**
   * Get a specific authentication flow
   */
  @Get('authentication-flows/:flowId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get authentication flow',
    description: 'Get details of a specific authentication flow',
  })
  @ApiResponse({
    status: 200,
    description: 'Authentication flow retrieved successfully',
    type: AuthenticationFlowResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Flow not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiParam({
    name: 'flowId',
    description: 'Flow ID',
    example: 'flow-123',
  })
  async getFlow(
    @Param('flowId') flowId: string,
  ): Promise<AuthenticationFlowResponseDto> {
    return this.authenticationService.getFlow(flowId);
  }

  /**
   * Create a new authentication flow
   */
  @Post('realms/:realmId/authentication-flows')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create authentication flow',
    description: 'Create a new authentication flow for a realm',
  })
  @ApiResponse({
    status: 201,
    description: 'Authentication flow created successfully',
    type: AuthenticationFlowResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 409, description: 'Flow with alias already exists' })
  @ApiParam({
    name: 'realmId',
    description: 'Realm ID',
    example: '08d0b91d-6897-4e8a-8012-1229a95c39d4',
  })
  @ApiBody({ type: CreateAuthenticationFlowDto })
  async createFlow(
    @Param('realmId') realmId: string,
    @Body() createFlowDto: CreateAuthenticationFlowDto,
  ): Promise<AuthenticationFlowResponseDto> {
    return this.authenticationService.createFlow(realmId, createFlowDto);
  }

  /**
   * Update an authentication flow
   */
  @Put('authentication-flows/:flowId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update authentication flow',
    description: 'Update properties of an authentication flow',
  })
  @ApiResponse({
    status: 200,
    description: 'Authentication flow updated successfully',
    type: AuthenticationFlowResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Flow not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 409, description: 'Cannot update built-in flows' })
  @ApiParam({
    name: 'flowId',
    description: 'Flow ID',
    example: 'flow-123',
  })
  @ApiBody({ type: UpdateAuthenticationFlowDto })
  async updateFlow(
    @Param('flowId') flowId: string,
    @Body() updateFlowDto: UpdateAuthenticationFlowDto,
  ): Promise<AuthenticationFlowResponseDto> {
    return this.authenticationService.updateFlow(flowId, updateFlowDto);
  }

  /**
   * Delete an authentication flow
   */
  @Delete('authentication-flows/:flowId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete authentication flow',
    description: 'Delete an authentication flow from the system',
  })
  @ApiResponse({ status: 204, description: 'Authentication flow deleted successfully' })
  @ApiResponse({ status: 404, description: 'Flow not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 409, description: 'Cannot delete built-in flows' })
  @ApiParam({
    name: 'flowId',
    description: 'Flow ID',
    example: 'flow-123',
  })
  async deleteFlow(@Param('flowId') flowId: string): Promise<void> {
    return this.authenticationService.deleteFlow(flowId);
  }

  // ==================== Authentication Executions ====================

  /**
   * Get all executions for a flow
   */
  @Get('authentication-flows/:flowId/executions')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'List flow executions',
    description: 'Get all execution steps for an authentication flow',
  })
  @ApiResponse({
    status: 200,
    description: 'Flow executions retrieved successfully',
    type: AuthenticationExecutionsPaginatedResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Flow not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiParam({
    name: 'flowId',
    description: 'Flow ID',
    example: 'flow-123',
  })
  @ApiQuery({ name: 'page', required: false, example: '0' })
  @ApiQuery({ name: 'limit', required: false, example: '20' })
  async getFlowExecutions(
    @Param('flowId') flowId: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<AuthenticationExecutionsPaginatedResponseDto> {
    return this.authenticationService.getFlowExecutions(
      flowId,
      page ? parseInt(page, 10) : 0,
      limit ? parseInt(limit, 10) : 20,
    );
  }

  /**
   * Add an execution to a flow
   */
  @Post('realms/:realmId/authentication-flows/:flowId/executions')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Add flow execution',
    description: 'Add an execution step to an authentication flow',
  })
  @ApiResponse({
    status: 201,
    description: 'Flow execution added successfully',
    type: AuthenticationExecutionResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Flow not found' })
  @ApiParam({
    name: 'realmId',
    description: 'Realm ID',
    example: '08d0b91d-6897-4e8a-8012-1229a95c39d4',
  })
  @ApiParam({
    name: 'flowId',
    description: 'Flow ID',
    example: 'flow-123',
  })
  @ApiBody({ type: CreateAuthenticationExecutionDto })
  async addExecution(
    @Param('realmId') realmId: string,
    @Param('flowId') flowId: string,
    @Body() createExecutionDto: CreateAuthenticationExecutionDto,
  ): Promise<AuthenticationExecutionResponseDto> {
    return this.authenticationService.addExecution(
      flowId,
      realmId,
      createExecutionDto,
    );
  }

  /**
   * Update an execution
   */
  @Put('authentication-flows/executions/:executionId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update flow execution',
    description: 'Update an execution step in an authentication flow',
  })
  @ApiResponse({
    status: 200,
    description: 'Flow execution updated successfully',
    type: AuthenticationExecutionResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Execution not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiParam({
    name: 'executionId',
    description: 'Execution ID',
    example: 'exec-123',
  })
  @ApiBody({ type: UpdateAuthenticationExecutionDto })
  async updateExecution(
    @Param('executionId') executionId: string,
    @Body() updateExecutionDto: UpdateAuthenticationExecutionDto,
  ): Promise<AuthenticationExecutionResponseDto> {
    return this.authenticationService.updateExecution(
      executionId,
      updateExecutionDto,
    );
  }

  /**
   * Delete an execution from a flow
   */
  @Delete('authentication-flows/executions/:executionId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete flow execution',
    description: 'Remove an execution step from an authentication flow',
  })
  @ApiResponse({ status: 204, description: 'Flow execution deleted successfully' })
  @ApiResponse({ status: 404, description: 'Execution not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiParam({
    name: 'executionId',
    description: 'Execution ID',
    example: 'exec-123',
  })
  async deleteExecution(@Param('executionId') executionId: string): Promise<void> {
    return this.authenticationService.deleteExecution(executionId);
  }

  // ==================== Authenticator Configs ====================

  /**
   * Get all authenticator configs for a realm
   */
  @Get('realms/:realmId/authenticator-configs')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'List authenticator configs',
    description: 'Get all authenticator configurations for a realm',
  })
  @ApiResponse({
    status: 200,
    description: 'Authenticator configs retrieved successfully',
    type: AuthenticatorConfigsPaginatedResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiParam({
    name: 'realmId',
    description: 'Realm ID',
    example: '08d0b91d-6897-4e8a-8012-1229a95c39d4',
  })
  @ApiQuery({ name: 'page', required: false, example: '0' })
  @ApiQuery({ name: 'limit', required: false, example: '20' })
  async getRealmConfigs(
    @Param('realmId') realmId: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<AuthenticatorConfigsPaginatedResponseDto> {
    return this.authenticationService.getRealmConfigs(
      realmId,
      page ? parseInt(page, 10) : 0,
      limit ? parseInt(limit, 10) : 20,
    );
  }

  /**
   * Create a new authenticator config
   */
  @Post('realms/:realmId/authenticator-configs')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create authenticator config',
    description: 'Create a new authenticator configuration for a realm',
  })
  @ApiResponse({
    status: 201,
    description: 'Authenticator config created successfully',
    type: AuthenticatorConfigResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiParam({
    name: 'realmId',
    description: 'Realm ID',
    example: '08d0b91d-6897-4e8a-8012-1229a95c39d4',
  })
  @ApiBody({ type: CreateAuthenticatorConfigDto })
  async createConfig(
    @Param('realmId') realmId: string,
    @Body() createConfigDto: CreateAuthenticatorConfigDto,
  ): Promise<AuthenticatorConfigResponseDto> {
    return this.authenticationService.createConfig(realmId, createConfigDto);
  }

  /**
   * Update an authenticator config
   */
  @Put('authenticator-configs/:configId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update authenticator config',
    description: 'Update an authenticator configuration',
  })
  @ApiResponse({
    status: 200,
    description: 'Authenticator config updated successfully',
    type: AuthenticatorConfigResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Config not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiParam({
    name: 'configId',
    description: 'Config ID',
    example: 'config-123',
  })
  @ApiBody({ type: UpdateAuthenticatorConfigDto })
  async updateConfig(
    @Param('configId') configId: string,
    @Body() updateConfigDto: UpdateAuthenticatorConfigDto,
  ): Promise<AuthenticatorConfigResponseDto> {
    return this.authenticationService.updateConfig(configId, updateConfigDto);
  }

  /**
   * Delete an authenticator config
   */
  @Delete('authenticator-configs/:configId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete authenticator config',
    description: 'Delete an authenticator configuration',
  })
  @ApiResponse({ status: 204, description: 'Authenticator config deleted successfully' })
  @ApiResponse({ status: 404, description: 'Config not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiParam({
    name: 'configId',
    description: 'Config ID',
    example: 'config-123',
  })
  async deleteConfig(@Param('configId') configId: string): Promise<void> {
    return this.authenticationService.deleteConfig(configId);
  }
}
