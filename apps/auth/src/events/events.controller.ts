import {
  Controller,
  Get,
  Delete,
  Param,
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
  ApiQuery,
} from '@nestjs/swagger';
import { EventsService } from './events.service';
import { JwtAuthGuard } from '@app/auth-utilities';
import {
  EventResponseDto,
  EventsPaginatedResponseDto,
  AdminEventsPaginatedResponseDto,
  EventQueryDto,
  AdminEventQueryDto,
} from './dto';

@ApiTags('Events')
@Controller()
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  /**
   * Get events for a realm
   */
  @Get('realms/:realmId/events')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'List realm events',
    description: 'Get all user events for a realm with optional filtering',
  })
  @ApiResponse({
    status: 200,
    description: 'Events retrieved successfully',
    type: EventsPaginatedResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiParam({
    name: 'realmId',
    description: 'Realm ID',
    example: '08d0b91d-6897-4e8a-8012-1229a95c39d4',
  })
  @ApiQuery({ type: EventQueryDto })
  @ApiQuery({ name: 'page', required: false, example: '0' })
  @ApiQuery({ name: 'limit', required: false, example: '50' })
  async getRealmEvents(
    @Param('realmId') realmId: string,
    @Query() query?: EventQueryDto,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<EventsPaginatedResponseDto> {
    return this.eventsService.getEvents(
      realmId,
      query,
      page ? parseInt(page, 10) : 0,
      limit ? parseInt(limit, 10) : 50,
    );
  }

  /**
   * Get events for a specific user
   */
  @Get('users/:userId/events')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Get user's events",
    description: 'Get all events for a specific user',
  })
  @ApiResponse({
    status: 200,
    description: 'User events retrieved successfully',
    type: EventsPaginatedResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiParam({
    name: 'userId',
    description: 'User ID',
    example: 'd7096ad8-f078-4179-882b-6dddc8033971',
  })
  @ApiQuery({ name: 'page', required: false, example: '0' })
  @ApiQuery({ name: 'limit', required: false, example: '50' })
  async getUserEvents(
    @Param('userId') userId: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<EventsPaginatedResponseDto> {
    return this.eventsService.getUserEvents(
      userId,
      page ? parseInt(page, 10) : 0,
      limit ? parseInt(limit, 10) : 50,
    );
  }

  /**
   * Get admin events for a realm
   */
  @Get('realms/:realmId/admin-events')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'List admin events',
    description: 'Get all admin events for a realm with optional filtering',
  })
  @ApiResponse({
    status: 200,
    description: 'Admin events retrieved successfully',
    type: AdminEventsPaginatedResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiParam({
    name: 'realmId',
    description: 'Realm ID',
    example: '08d0b91d-6897-4e8a-8012-1229a95c39d4',
  })
  @ApiQuery({ type: AdminEventQueryDto })
  @ApiQuery({ name: 'page', required: false, example: '0' })
  @ApiQuery({ name: 'limit', required: false, example: '50' })
  async getAdminEvents(
    @Param('realmId') realmId: string,
    @Query() query?: AdminEventQueryDto,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<AdminEventsPaginatedResponseDto> {
    return this.eventsService.getAdminEvents(
      realmId,
      query,
      page ? parseInt(page, 10) : 0,
      limit ? parseInt(limit, 10) : 50,
    );
  }

  /**
   * Export events to JSON
   */
  @Get('realms/:realmId/events/export')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Export events',
    description: 'Export realm events to JSON for audit purposes',
  })
  @ApiResponse({
    status: 200,
    description: 'Events exported successfully',
    isArray: true,
    type: EventResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiParam({
    name: 'realmId',
    description: 'Realm ID',
    example: '08d0b91d-6897-4e8a-8012-1229a95c39d4',
  })
  @ApiQuery({ type: EventQueryDto })
  async exportEvents(
    @Param('realmId') realmId: string,
    @Query() query?: EventQueryDto,
  ): Promise<EventResponseDto[]> {
    return this.eventsService.exportEvents(realmId, query);
  }

  /**
   * Delete old events (cleanup)
   */
  @Delete('realms/:realmId/events/cleanup')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Clean up old events',
    description: 'Delete events older than specified number of days',
  })
  @ApiResponse({ status: 204, description: 'Old events deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiParam({
    name: 'realmId',
    description: 'Realm ID',
    example: '08d0b91d-6897-4e8a-8012-1229a95c39d4',
  })
  @ApiQuery({
    name: 'olderThanDays',
    description: 'Delete events older than this many days',
    required: false,
    example: '90',
  })
  async cleanupEvents(
    @Param('realmId') realmId: string,
    @Query('olderThanDays') olderThanDays?: string,
  ): Promise<{ count: number }> {
    const count = await this.eventsService.deleteOldEvents(
      realmId,
      olderThanDays ? parseInt(olderThanDays, 10) : 90,
    );
    return { count };
  }

  /**
   * Delete old admin events (cleanup)
   */
  @Delete('realms/:realmId/admin-events/cleanup')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Clean up old admin events',
    description: 'Delete admin events older than specified number of days',
  })
  @ApiResponse({
    status: 204,
    description: 'Old admin events deleted successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiParam({
    name: 'realmId',
    description: 'Realm ID',
    example: '08d0b91d-6897-4e8a-8012-1229a95c39d4',
  })
  @ApiQuery({
    name: 'olderThanDays',
    description: 'Delete admin events older than this many days',
    required: false,
    example: '365',
  })
  async cleanupAdminEvents(
    @Param('realmId') realmId: string,
    @Query('olderThanDays') olderThanDays?: string,
  ): Promise<{ count: number }> {
    const count = await this.eventsService.deleteOldAdminEvents(
      realmId,
      olderThanDays ? parseInt(olderThanDays, 10) : 365,
    );
    return { count };
  }
}
