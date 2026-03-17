import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
  Query,
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
import { RequiredActionsService } from './required-actions.service';
import { JwtAuthGuard } from '@app/auth-utilities';
import {
  RequiredActionResponseDto,
  CreateRequiredActionDto,
  UpdateRequiredActionDto,
  UserRequiredActionResponseDto,
  RequiredActionsPaginatedResponseDto,
  SetUserRequiredActionsDto,
} from './dto';

@ApiTags('Required Actions')
@Controller()
export class RequiredActionsController {
  constructor(private readonly requiredActionsService: RequiredActionsService) {}

  /**
   * Get all required actions for a realm
   */
  @Get('realms/:realmId/required-actions')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'List required actions',
    description: 'Get all required actions configured for a realm',
  })
  @ApiResponse({
    status: 200,
    description: 'Required actions retrieved successfully',
    type: RequiredActionsPaginatedResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiParam({
    name: 'realmId',
    description: 'Realm ID',
    example: '08d0b91d-6897-4e8a-8012-1229a95c39d4',
  })
  @ApiQuery({ name: 'page', required: false, example: '0' })
  @ApiQuery({ name: 'limit', required: false, example: '20' })
  async getRealmRequiredActions(
    @Param('realmId') realmId: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<RequiredActionsPaginatedResponseDto> {
    return this.requiredActionsService.getRealmRequiredActions(
      realmId,
      page ? parseInt(page, 10) : 0,
      limit ? parseInt(limit, 10) : 20,
    );
  }

  /**
   * Create a new required action
   */
  @Post('realms/:realmId/required-actions')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create required action',
    description: 'Create a new required action for a realm',
  })
  @ApiResponse({
    status: 201,
    description: 'Required action created successfully',
    type: RequiredActionResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiParam({
    name: 'realmId',
    description: 'Realm ID',
    example: '08d0b91d-6897-4e8a-8012-1229a95c39d4',
  })
  @ApiBody({ type: CreateRequiredActionDto })
  async createRequiredAction(
    @Param('realmId') realmId: string,
    @Body() createActionDto: CreateRequiredActionDto,
  ): Promise<RequiredActionResponseDto> {
    return this.requiredActionsService.createRequiredAction(
      realmId,
      createActionDto,
    );
  }

  /**
   * Get a specific required action
   */
  @Get('required-actions/:actionId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get required action',
    description: 'Get details of a specific required action',
  })
  @ApiResponse({
    status: 200,
    description: 'Required action retrieved successfully',
    type: RequiredActionResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Required action not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiParam({
    name: 'actionId',
    description: 'Required Action ID',
    example: 'action-123',
  })
  async getRequiredAction(
    @Param('actionId') actionId: string,
  ): Promise<RequiredActionResponseDto> {
    return this.requiredActionsService.getRequiredAction(actionId);
  }

  /**
   * Update a required action
   */
  @Put('required-actions/:actionId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update required action',
    description: 'Update properties of a required action',
  })
  @ApiResponse({
    status: 200,
    description: 'Required action updated successfully',
    type: RequiredActionResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Required action not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiParam({
    name: 'actionId',
    description: 'Required Action ID',
    example: 'action-123',
  })
  @ApiBody({ type: UpdateRequiredActionDto })
  async updateRequiredAction(
    @Param('actionId') actionId: string,
    @Body() updateActionDto: UpdateRequiredActionDto,
  ): Promise<RequiredActionResponseDto> {
    return this.requiredActionsService.updateRequiredAction(
      actionId,
      updateActionDto,
    );
  }

  /**
   * Delete a required action
   */
  @Delete('required-actions/:actionId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete required action',
    description: 'Delete a required action from the system',
  })
  @ApiResponse({ status: 204, description: 'Required action deleted successfully' })
  @ApiResponse({ status: 404, description: 'Required action not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiParam({
    name: 'actionId',
    description: 'Required Action ID',
    example: 'action-123',
  })
  async deleteRequiredAction(@Param('actionId') actionId: string): Promise<void> {
    return this.requiredActionsService.deleteRequiredAction(actionId);
  }

  /**
   * Get required actions for a user
   */
  @Get('users/:userId/required-actions')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Get user's required actions",
    description: 'Get all required actions assigned to a specific user',
  })
  @ApiResponse({
    status: 200,
    description: 'User required actions retrieved successfully',
    isArray: true,
    type: UserRequiredActionResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiParam({
    name: 'userId',
    description: 'User ID',
    example: 'd7096ad8-f078-4179-882b-6dddc8033971',
  })
  async getUserRequiredActions(
    @Param('userId') userId: string,
  ): Promise<UserRequiredActionResponseDto[]> {
    return this.requiredActionsService.getUserRequiredActions(userId);
  }

  /**
   * Set required actions for a user
   */
  @Put('users/:userId/required-actions')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Set user's required actions",
    description: 'Replace all required actions for a user',
  })
  @ApiResponse({
    status: 200,
    description: 'Required actions set successfully',
    isArray: true,
    type: UserRequiredActionResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiParam({
    name: 'userId',
    description: 'User ID',
    example: 'd7096ad8-f078-4179-882b-6dddc8033971',
  })
  @ApiBody({ type: SetUserRequiredActionsDto })
  async setUserRequiredActions(
    @Param('userId') userId: string,
    @Body() setActionsDto: SetUserRequiredActionsDto,
  ): Promise<UserRequiredActionResponseDto[]> {
    return this.requiredActionsService.setUserRequiredActions(
      userId,
      setActionsDto,
    );
  }

  /**
   * Remove a specific required action from user
   */
  @Delete('users/:userId/required-actions/:actionName')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: "Remove user's required action",
    description: 'Remove a specific required action from a user',
  })
  @ApiResponse({ status: 204, description: 'Required action removed successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'User or action not found' })
  @ApiParam({
    name: 'userId',
    description: 'User ID',
    example: 'd7096ad8-f078-4179-882b-6dddc8033971',
  })
  @ApiParam({
    name: 'actionName',
    description: 'Required action name to remove',
    example: 'VERIFY_EMAIL',
  })
  async removeUserRequiredAction(
    @Param('userId') userId: string,
    @Param('actionName') actionName: string,
  ): Promise<void> {
    return this.requiredActionsService.removeUserRequiredAction(
      userId,
      actionName,
    );
  }

  /**
   * Get all available required action providers
   */
  @Get('required-actions-providers')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'List required action providers',
    description: 'Get all available required action providers in the system',
  })
  @ApiResponse({
    status: 200,
    description: 'Required action providers retrieved successfully',
    isArray: true,
    type: RequiredActionResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getRequiredActionProviders(): Promise<RequiredActionResponseDto[]> {
    return this.requiredActionsService.getRequiredActionProviders();
  }
}
