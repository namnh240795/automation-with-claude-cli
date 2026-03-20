import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { GRANT_TYPES } from '../oauth.constants';

export class TokenRequestDto {
  @ApiProperty({
    description: 'Grant type',
    example: 'authorization_code',
    enum: Object.values(GRANT_TYPES),
  })
  @IsString()
  @IsIn(Object.values(GRANT_TYPES))
  grant_type: string;

  @ApiPropertyOptional({
    description: 'Authorization code (for authorization_code grant)',
    example: 'SplxlOBeZQQYbYS6WxSbIA',
  })
  @IsString()
  @IsOptional()
  code?: string;

  @ApiPropertyOptional({
    description: 'Redirect URI (must match authorization request)',
    example: 'https://example.com/callback',
  })
  @IsString()
  @IsOptional()
  redirect_uri?: string;

  @ApiPropertyOptional({
    description: 'Client ID',
    example: 'abc123def456',
  })
  @IsString()
  @IsOptional()
  client_id?: string;

  @ApiPropertyOptional({
    description: 'Client secret (for confidential clients)',
    example: 'secret123',
  })
  @IsString()
  @IsOptional()
  client_secret?: string;

  @ApiPropertyOptional({
    description: 'Refresh token (for refresh_token grant)',
    example: 'tGzv3JOkF0XG5Qx2TlKWIA',
  })
  @IsString()
  @IsOptional()
  refresh_token?: string;

  @ApiPropertyOptional({
    description: 'PKCE code verifier (for authorization_code grant with PKCE)',
    example: 'dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk',
  })
  @IsString()
  @IsOptional()
  code_verifier?: string;

  @ApiPropertyOptional({
    description: 'Device code (for device authorization grant)',
    example: 'GmRhmhcxhwRkoJdQDxEyw0ensCl4',
  })
  @IsString()
  @IsOptional()
  device_code?: string;

  @ApiPropertyOptional({
    description: 'Requested scopes',
    example: 'openid email profile',
  })
  @IsString()
  @IsOptional()
  scope?: string;
}
