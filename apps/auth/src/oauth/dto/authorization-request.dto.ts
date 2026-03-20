import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsIn, IsOptional, IsString, IsUrl } from 'class-validator';
import { GRANT_TYPES, SCOPES } from '../oauth.constants';

export class AuthorizationRequestDto {
  @ApiProperty({
    description: 'Response type',
    example: 'code',
    enum: ['code', 'token'],
  })
  @IsString()
  @IsIn(['code', 'token'])
  response_type: string;

  @ApiProperty({ description: 'Client ID', example: 'abc123def456' })
  @IsString()
  client_id: string;

  @ApiProperty({
    description: 'Redirect URI after authorization',
    example: 'https://example.com/callback',
  })
  @IsString()
  @IsUrl()
  redirect_uri: string;

  @ApiPropertyOptional({
    description: 'Requested scopes (space-separated)',
    example: 'openid email profile',
  })
  @IsString()
  @IsOptional()
  scope?: string;

  @ApiPropertyOptional({
    description: 'State parameter for CSRF protection',
    example: 'xyz789',
  })
  @IsString()
  @IsOptional()
  state?: string;

  @ApiPropertyOptional({
    description: 'PKCE code challenge (for public clients)',
    example: 'dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk',
  })
  @IsString()
  @IsOptional()
  code_challenge?: string;

  @ApiPropertyOptional({
    description: 'PKCE code challenge method',
    example: 'S256',
    enum: ['plain', 'S256'],
  })
  @IsString()
  @IsIn(['plain', 'S256'])
  @IsOptional()
  code_challenge_method?: string;

  @ApiPropertyOptional({
    description: 'Nonce for OpenID Connect',
    example: 'n-0S6_WzA2Mj',
  })
  @IsString()
  @IsOptional()
  nonce?: string;
}

export class ConsentRequestDto {
  @ApiProperty({ description: 'Authorization code', example: 'auth_code_xyz' })
  @IsString()
  code: string;

  @ApiProperty({
    description: 'User consent decision',
    example: 'accept',
    enum: ['accept', 'deny'],
  })
  @IsString()
  @IsIn(['accept', 'deny'])
  action: 'accept' | 'deny';

  @ApiPropertyOptional({
    description: 'Approved scopes (if accepting)',
    example: 'openid email',
  })
  @IsString()
  @IsOptional()
  scope?: string;
}
