import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
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
} from '@nestjs/swagger';
import { SessionsService } from './sessions.service';
import { JwtAuthGuard } from '@app/auth-utilities';
import { AuthUser, JwtPayloadDto } from '@app/auth-utilities';
import {
  SessionsListResponseDto,
  ClientSessionResponseDto,
  RevokeTokenDto,
} from './dto';

@ApiTags('Sessions')
@Controller()
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  /**
   * Get all sessions in a realm
   */
  @Get('realms/:realmId/sessions')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'List all sessions in a realm',
    description: 'Get all offline user sessions for a specific realm',
  })
  @ApiResponse({
    status: 200,
    description: 'List of sessions retrieved successfully',
    type: SessionsListResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiParam({
    name: 'realmId',
    description: 'Realm ID',
    example: '08d0b91d-6897-4e8a-8012-1229a95c39d4',
  })
  async getRealmSessions(
    @Param('realmId') realmId: string,
  ): Promise<SessionsListResponseDto> {
    return this.sessionsService.getRealmSessions(realmId);
  }

  /**
   * Get all sessions for a specific user
   */
  @Get('users/:userId/sessions')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Get user's sessions",
    description: 'Get all offline sessions for a specific user',
  })
  @ApiResponse({
    status: 200,
    description: 'User sessions retrieved successfully',
    type: SessionsListResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiParam({
    name: 'userId',
    description: 'User ID',
    example: 'd7096ad8-f078-4179-882b-6dddc8033971',
  })
  async getUserSessions(
    @Param('userId') userId: string,
    @AuthUser() user: JwtPayloadDto,
  ): Promise<SessionsListResponseDto> {
    // Use realm from JWT payload if available, otherwise use default
    const realmId = (user as any).realm_id || 'master';
    return this.sessionsService.getUserSessions(realmId, userId);
  }

  /**
   * Get client sessions for a user
   */
  @Get('users/:userId/client-sessions')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Get user's client sessions",
    description: 'Get all offline client sessions for a specific user',
  })
  @ApiResponse({
    status: 200,
    description: 'Client sessions retrieved successfully',
    isArray: true,
    type: ClientSessionResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiParam({
    name: 'userId',
    description: 'User ID',
    example: 'd7096ad8-f078-4179-882b-6dddc8033971',
  })
  async getUserClientSessions(
    @Param('userId') userId: string,
    @AuthUser() user: JwtPayloadDto,
  ): Promise<ClientSessionResponseDto[]> {
    const realmId = (user as any).realm_id || 'master';
    return this.sessionsService.getUserClientSessions(realmId, userId);
  }

  /**
   * Terminate a specific session
   */
  @Delete('sessions/:sessionId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Terminate a session',
    description: 'Terminate a specific user session by ID',
  })
  @ApiResponse({ status: 204, description: 'Session terminated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Session not found' })
  @ApiParam({
    name: 'sessionId',
    description: 'Session ID',
    example: 'user-session-123',
  })
  async terminateSession(@Param('sessionId') sessionId: string): Promise<void> {
    return this.sessionsService.terminateSession(sessionId);
  }

  /**
   * Terminate all user sessions
   */
  @Delete('users/:userId/sessions')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: "Terminate all user's sessions",
    description: 'Terminate all sessions for a specific user',
  })
  @ApiResponse({
    status: 204,
    description: 'All sessions terminated successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiParam({
    name: 'userId',
    description: 'User ID',
    example: 'd7096ad8-f078-4179-882b-6dddc8033971',
  })
  async terminateAllUserSessions(
    @Param('userId') userId: string,
    @AuthUser() user: JwtPayloadDto,
  ): Promise<{ count: number }> {
    const realmId = (user as any).realm_id || 'master';
    const count = await this.sessionsService.terminateAllUserSessions(
      realmId,
      userId,
    );
    return { count };
  }

  /**
   * Revoke a token
   */
  @Post('tokens/revoke')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Revoke a token',
    description: 'Revoke an access or refresh token by adding it to the revoked tokens list',
  })
  @ApiResponse({ status: 204, description: 'Token revoked successfully' })
  @ApiResponse({ status: 400, description: 'Token already revoked or invalid request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBody({ type: RevokeTokenDto })
  async revokeToken(@Body() revokeTokenDto: RevokeTokenDto): Promise<void> {
    await this.sessionsService.revokeToken(
      revokeTokenDto.token,
      revokeTokenDto.expire,
    );
  }

  /**
   * Check if a token is revoked
   */
  @Get('tokens/:tokenId/revoked')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Check if token is revoked',
    description: 'Check if a specific token has been revoked',
  })
  @ApiResponse({
    status: 200,
    description: 'Token revocation status',
    schema: {
      type: 'object',
      properties: {
        revoked: {
          type: 'boolean',
          description: 'Whether the token is revoked',
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiParam({
    name: 'tokenId',
    description: 'Token ID to check',
    example: 'token-123',
  })
  async isTokenRevoked(@Param('tokenId') tokenId: string): Promise<{ revoked: boolean }> {
    const revoked = await this.sessionsService.isTokenRevoked(tokenId);
    return { revoked };
  }
}
