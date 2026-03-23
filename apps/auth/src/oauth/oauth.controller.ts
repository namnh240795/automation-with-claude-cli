import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Query,
  Param,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
  Logger,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery, ApiOkResponse, ApiBadRequestResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { OAuthService } from './oauth.service';
import { ClientService } from './client.service';
import { DeviceFlowService } from './device-flow.service';
import { JwtAuthGuard } from '@app/auth-utilities';
import { AuthUser, JwtPayloadDto } from '@app/auth-utilities';
import { RegisterClientDto, ClientResponseDto } from './dto/register-client.dto';
import { AuthorizationRequestDto } from './dto/authorization-request.dto';
import { TokenRequestDto } from './dto/token-request.dto';
import { TokenResponseDto } from './dto/token-response.dto';
import { DeviceCodeResponseDto, DeviceConsentDto } from './dto/device-code-response.dto';
import { RevokeTokenDto, IntrospectTokenDto, IntrospectResponseDto } from './dto/token-response.dto';
import { OAUTH_ERRORS } from './oauth.constants';

@ApiTags('oauth')
@Controller('oauth')
export class OAuthController {
  private readonly logger = new Logger(OAuthController.name);

  constructor(
    private readonly oauthService: OAuthService,
    private readonly clientService: ClientService,
    private readonly deviceFlowService: DeviceFlowService,
  ) {}

  /**
   * Register a new OAuth client (admin endpoint)
   */
  @Post('register')
  @ApiOperation({ summary: 'Register OAuth client' })
  @ApiOkResponse({ type: ClientResponseDto })
  async registerClient(@Body() dto: RegisterClientDto): Promise<ClientResponseDto> {
    return this.clientService.registerClient(dto) as any;
  }

  /**
   * List OAuth clients (public endpoint for discovery)
   * Returns public client information only (no secrets)
   */
  @Get('clients')
  @ApiOperation({ summary: 'List all OAuth clients' })
  async listClients() {
    return this.clientService.listClients();
  }

  /**
   * Get client info
   */
  @Get('clients/:clientId')
  @ApiOperation({ summary: 'Get OAuth client info' })
  @ApiOkResponse({ type: ClientResponseDto })
  async getClientInfo(@Param('clientId') clientId: string) {
    return this.clientService.getClientInfo(clientId);
  }

  /**
   * Delete OAuth client (admin endpoint)
   */
  @Delete('clients/:clientId')
  @ApiOperation({ summary: 'Delete OAuth client' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('bearer-auth')
  async deleteClient(@Param('clientId') clientId: string) {
    return this.clientService.deleteClient(clientId);
  }

  /**
   * Authorization endpoint - initiates OAuth 2.0 authorization flow
   * User is redirected here by client application
   */
  @Get('authorize')
  @ApiOperation({ summary: 'OAuth 2.0 authorization endpoint' })
  @ApiQuery({ name: 'response_type', required: true, example: 'code' })
  @ApiQuery({ name: 'client_id', required: true })
  @ApiQuery({ name: 'redirect_uri', required: true })
  @ApiQuery({ name: 'scope', required: false })
  @ApiQuery({ name: 'state', required: false })
  @ApiQuery({ name: 'code_challenge', required: false })
  @ApiQuery({ name: 'code_challenge_method', required: false })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('bearer-auth')
  async authorize(
    @Query() query: AuthorizationRequestDto,
    @AuthUser() user: JwtPayloadDto,
    @Req() req: any,
  ) {
    try {
      const result = await this.oauthService.handleAuthorizationRequest({
        ...query,
        user_id: user.sub,
      });

      // Return redirect URL - NestJS/Fastify will handle the redirect
      req.res.redirect(result.redirect_uri);
      return;
    } catch (error: any) {
      this.logger.error(`Authorization error: ${error.message}`);

      // Extract state from query
      const state = query.state;
      const redirectUri = query.redirect_uri;

      if (error.error) {
        // OAuth error - redirect to client with error details
        const errorParams = new URLSearchParams({
          error: error.error || OAUTH_ERRORS.INVALID_REQUEST,
          ...(error.error_description && { error_description: error.error_description }),
          ...(state && { state }),
        });
        req.res.redirect(`${redirectUri}?${errorParams.toString()}`);
        return;
      }

      throw error;
    }
  }

  /**
   * Token endpoint - exchange authorization code for access token
   * Client makes POST request to this endpoint
   */
  @Post('token')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'OAuth 2.0 token endpoint' })
  @ApiOkResponse({ type: TokenResponseDto })
  @ApiBadRequestResponse({ description: 'OAuth 2.0 error response' })
  @ApiUnauthorizedResponse({ description: 'Invalid client credentials' })
  async getToken(@Body() dto: TokenRequestDto) {
    return await this.oauthService.handleTokenRequest(dto);
  }

  /**
   * Revoke token endpoint
   */
  @Post('revoke')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Revoke OAuth token' })
  @ApiOkResponse({ description: 'Token revoked successfully' })
  async revokeToken(@Body() dto: RevokeTokenDto) {
    await this.oauthService.revokeToken(dto);
    return {};
  }

  /**
   * Introspect token endpoint (RFC 7662)
   */
  @Post('introspect')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Introspect OAuth token' })
  @ApiOkResponse({ type: IntrospectResponseDto })
  async introspectToken(@Body() dto: IntrospectTokenDto) {
    return this.oauthService.introspectToken(dto);
  }

  /**
   * Device Authorization Flow - Start device authorization
   */
  @Post('device/authorize')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Start device authorization flow' })
  @ApiOkResponse({ type: DeviceCodeResponseDto })
  async deviceAuthorization(@Body() dto: { client_id: string; scope?: string }) {
    return await this.deviceFlowService.generateDeviceCode({
      client_id: dto.client_id,
      scope: dto.scope || 'openid',
    });
  }

  /**
   * Device Authorization Flow - Get device verification page
   * Returns public device info for users to verify their device code
   * No authentication required - user will authenticate when submitting consent
   */
  @Get('device/verify')
  @ApiOperation({ summary: 'Get device verification page' })
  @ApiQuery({ name: 'user_code', required: true })
  async getDeviceVerificationPage(@Query('user_code') userCode: string) {
    try {
      const deviceInfo = await this.deviceFlowService.getDeviceCodeByUserCode(userCode);
      return deviceInfo;
    } catch (error: any) {
      this.logger.error(`Device verification error: ${error.message}`);
      throw error;
    }
  }

  /**
   * Device Authorization Flow - Submit user consent
   */
  @Post('device/consent')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Submit device consent' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('bearer-auth')
  async submitDeviceConsent(
    @Body() dto: DeviceConsentDto,
    @AuthUser() user: JwtPayloadDto,
  ) {
    try {
      if (dto.action === 'deny') {
        await this.deviceFlowService.denyDeviceCode(dto.user_code);
        return { message: 'Device authorization denied' };
      }

      await this.deviceFlowService.verifyDeviceCode({
        user_code: dto.user_code,
        user_id: user.sub,
      });

      return { message: 'Device verified successfully' };
    } catch (error: any) {
      this.logger.error(`Device consent error: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get user's authorized clients
   */
  @Get('user/clients')
  @ApiOperation({ summary: 'Get user authorized clients' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('bearer-auth')
  async getUserClients(@AuthUser() user: JwtPayloadDto) {
    return this.oauthService.getUserClients(user.sub);
  }

  /**
   * Revoke client access for user
   */
  @Delete('user/clients/:clientId')
  @ApiOperation({ summary: 'Revoke client access' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('bearer-auth')
  async revokeClientAccess(
    @Param('clientId') clientId: string,
    @AuthUser() user: JwtPayloadDto,
  ) {
    return this.oauthService.revokeClientAccess(user.sub, clientId);
  }

  /**
   * Get user tokens
   */
  @Get('user/tokens')
  @ApiOperation({ summary: 'Get user tokens' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('bearer-auth')
  async getUserTokens(@AuthUser() user: JwtPayloadDto) {
    return this.oauthService.getUserTokens(user.sub);
  }
}
