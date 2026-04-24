import { Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Force refresh the access token' })
  async refreshToken() {
    // This endpoint is for internal use to force token refresh
    // The actual token management is handled by AuthService
    return { message: 'Token refresh initiated' };
  }
}
