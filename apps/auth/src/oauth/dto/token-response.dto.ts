import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TokenResponseDto {
  @ApiProperty({ description: 'Access token (JWT)', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  access_token: string;

  @ApiProperty({ description: 'Token type', example: 'Bearer' })
  token_type: string;

  @ApiProperty({ description: 'Token lifetime in seconds', example: 3600 })
  expires_in: number;

  @ApiPropertyOptional({ description: 'Refresh token', example: 'tGzv3JOkF0XG5Qx2TlKWIA' })
  refresh_token?: string;

  @ApiPropertyOptional({
    description: 'Granted scope(s)',
    example: 'openid email profile',
  })
  scope?: string;

  @ApiPropertyOptional({ description: 'ID token (for OpenID Connect)', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  id_token?: string;
}

export class RevokeTokenDto {
  @ApiProperty({ description: 'Token to revoke', example: 'tGzv3JOkF0XG5Qx2TlKWIA' })
  token: string;

  @ApiPropertyOptional({
    description: 'Token type hint',
    example: 'refresh_token',
    enum: ['access_token', 'refresh_token'],
  })
  token_type_hint?: 'access_token' | 'refresh_token';
}

export class IntrospectTokenDto {
  @ApiProperty({ description: 'Token to introspect', example: 'tGzv3JOkF0XG5Qx2TlKWIA' })
  token: string;

  @ApiPropertyOptional({
    description: 'Token type hint',
    example: 'access_token',
    enum: ['access_token', 'refresh_token'],
  })
  token_type_hint?: 'access_token' | 'refresh_token';
}

export class IntrospectResponseDto {
  @ApiProperty({ description: 'Is token active', example: true })
  active: boolean;

  @ApiPropertyOptional({ description: 'Token scope', example: 'openid email profile' })
  scope?: string;

  @ApiPropertyOptional({ description: 'Client ID', example: 'abc123def456' })
  client_id?: string;

  @ApiPropertyOptional({ description: 'User ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  user_id?: string;

  @ApiPropertyOptional({ description: 'Token expiration (Unix timestamp)', example: 1735689600 })
  exp?: number;
}
