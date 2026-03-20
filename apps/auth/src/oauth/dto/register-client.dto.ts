import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsInt, IsOptional, IsString, IsUrl, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class RegisterClientDto {
  @ApiProperty({ description: 'Application name', example: 'My App' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Application description', example: 'My OAuth 2.0 application' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Allowed redirect URIs',
    example: ['https://example.com/callback', 'http://localhost:3000/callback'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  @IsUrl({}, { each: true })
  redirect_uris: string[];

  @ApiPropertyOptional({
    description: 'Post-logout redirect URIs',
    example: ['https://example.com/logout'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  @IsUrl({}, { each: true })
  @IsOptional()
  post_logout_redirect_uris?: string[];

  @ApiProperty({
    description: 'Allowed OAuth scopes',
    example: ['openid', 'email', 'profile'],
    enum: ['openid', 'email', 'profile', 'offline_access'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  scopes: string[];

  @ApiProperty({
    description: 'Allowed grant types',
    example: ['authorization_code', 'refresh_token'],
    enum: ['authorization_code', 'client_credentials', 'refresh_token', 'urn:ietf:params:oauth:grant-type:device_code'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  grant_types: string[];

  @ApiPropertyOptional({
    description: 'Is this a confidential client (requires client secret)',
    example: true,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  is_confidential?: boolean;

  @ApiPropertyOptional({
    description: 'Require PKCE for authorization code flow',
    example: true,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  require_pkce?: boolean;

  @ApiPropertyOptional({
    description: 'Access token lifetime in seconds',
    example: 3600,
    default: 3600,
    minimum: 60,
    maximum: 86400,
  })
  @IsInt()
  @Min(60)
  @Max(86400)
  @IsOptional()
  @Type(() => Number)
  access_token_lifetime?: number;

  @ApiPropertyOptional({
    description: 'Refresh token lifetime in seconds',
    example: 2592000,
    default: 2592000,
    minimum: 60,
    maximum: 7776000,
  })
  @IsInt()
  @Min(60)
  @Max(7776000)
  @IsOptional()
  @Type(() => Number)
  refresh_token_lifetime?: number;

  @ApiPropertyOptional({
    description: 'Allowed CORS origins',
    example: ['https://example.com', 'http://localhost:3000'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  allowed_origins?: string[];

  @ApiPropertyOptional({
    description: 'Application logo URI',
    example: 'https://example.com/logo.png',
  })
  @IsUrl()
  @IsOptional()
  logo_uri?: string;

  @ApiPropertyOptional({
    description: 'Privacy policy URI',
    example: 'https://example.com/privacy',
  })
  @IsUrl()
  @IsOptional()
  policy_uri?: string;

  @ApiPropertyOptional({
    description: 'Terms of service URI',
    example: 'https://example.com/terms',
  })
  @IsUrl()
  @IsOptional()
  tos_uri?: string;
}

export class ClientResponseDto {
  @ApiProperty({ description: 'Client ID' })
  id: string;

  @ApiProperty({ description: 'Client identifier' })
  client_id: string;

  @ApiPropertyOptional({ description: 'Client secret (only shown during registration)' })
  client_secret?: string;

  @ApiProperty({ description: 'Application name' })
  name: string;

  @ApiPropertyOptional({ description: 'Application description' })
  description?: string;

  @ApiProperty({ description: 'Allowed redirect URIs', type: [String] })
  redirect_uris: string[];

  @ApiPropertyOptional({ description: 'Post-logout redirect URIs', type: [String] })
  post_logout_redirect_uris?: string[];

  @ApiProperty({ description: 'Allowed OAuth scopes', type: [String] })
  scopes: string[];

  @ApiProperty({ description: 'Allowed grant types', type: [String] })
  grant_types: string[];

  @ApiProperty({ description: 'Is confidential client' })
  is_confidential: boolean;

  @ApiProperty({ description: 'Require PKCE' })
  require_pkce: boolean;

  @ApiProperty({ description: 'Access token lifetime (seconds)' })
  access_token_lifetime: number;

  @ApiProperty({ description: 'Refresh token lifetime (seconds)' })
  refresh_token_lifetime: number;

  @ApiProperty({ description: 'Allowed origins', type: [String] })
  allowed_origins: string[];

  @ApiPropertyOptional({ description: 'Logo URI' })
  logo_uri?: string;

  @ApiProperty({ description: 'Creation date' })
  created_at: Date;
}
