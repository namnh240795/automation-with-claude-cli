import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateIdentityProviderDto {
  @ApiProperty({
    description: 'Provider alias (unique per realm)',
    example: 'google',
  })
  @IsString()
  provider_alias: string;

  @ApiProperty({
    description: 'Provider ID (e.g., google, facebook, github)',
    example: 'google',
  })
  @IsString()
  provider_id: string;

  @ApiProperty({
    description: 'Provider display name',
    example: 'Google',
    required: false,
  })
  @IsOptional()
  @IsString()
  provider_display_name?: string;

  @ApiProperty({
    description: 'Is the provider enabled',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  enabled?: boolean;

  @ApiProperty({
    description: 'Store tokens from this provider',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  store_token?: boolean;

  @ApiProperty({
    description: 'Authenticate by default',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  authenticate_by_default?: boolean;

  @ApiProperty({
    description: 'Add token role',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  add_token_role?: boolean;

  @ApiProperty({
    description: 'Trust email from provider',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  trust_email?: boolean;

  @ApiProperty({
    description: 'Link only (do not allow new users)',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  link_only?: boolean;

  @ApiProperty({
    description: 'Hide on login page',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  hide_on_login?: boolean;

  @ApiProperty({
    description: 'Organization ID',
    required: false,
  })
  @IsOptional()
  @IsString()
  organization_id?: string;

  @ApiProperty({
    description: 'First broker login flow ID',
    required: false,
  })
  @IsOptional()
  @IsString()
  first_broker_login_flow_id?: string;

  @ApiProperty({
    description: 'Post broker login flow ID',
    required: false,
  })
  @IsOptional()
  @IsString()
  post_broker_login_flow_id?: string;

  @ApiProperty({
    description: 'Provider configuration as key-value pairs',
    example: { 'clientId': 'your-client-id', 'clientSecret': 'your-secret' },
    required: false,
  })
  @IsOptional()
  config?: Record<string, string>;
}

export class UpdateIdentityProviderDto {
  @ApiProperty({
    description: 'Provider display name',
    required: false,
  })
  @IsOptional()
  @IsString()
  provider_display_name?: string;

  @ApiProperty({
    description: 'Is the provider enabled',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  enabled?: boolean;

  @ApiProperty({
    description: 'Store tokens from this provider',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  store_token?: boolean;

  @ApiProperty({
    description: 'Authenticate by default',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  authenticate_by_default?: boolean;

  @ApiProperty({
    description: 'Add token role',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  add_token_role?: boolean;

  @ApiProperty({
    description: 'Trust email from provider',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  trust_email?: boolean;

  @ApiProperty({
    description: 'Link only (do not allow new users)',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  link_only?: boolean;

  @ApiProperty({
    description: 'Hide on login page',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  hide_on_login?: boolean;

  @ApiProperty({
    description: 'Organization ID',
    required: false,
  })
  @IsOptional()
  @IsString()
  organization_id?: string;

  @ApiProperty({
    description: 'First broker login flow ID',
    required: false,
  })
  @IsOptional()
  @IsString()
  first_broker_login_flow_id?: string;

  @ApiProperty({
    description: 'Post broker login flow ID',
    required: false,
  })
  @IsOptional()
  @IsString()
  post_broker_login_flow_id?: string;

  @ApiProperty({
    description: 'Provider configuration as key-value pairs',
    required: false,
  })
  @IsOptional()
  config?: Record<string, string>;
}

export class IdentityProviderResponseDto {
  @ApiProperty({ description: 'Provider internal ID' })
  internal_id: string;

  @ApiProperty({ description: 'Provider alias' })
  provider_alias?: string;

  @ApiProperty({ description: 'Provider ID' })
  provider_id?: string;

  @ApiProperty({ description: 'Provider display name' })
  provider_display_name?: string;

  @ApiProperty({ description: 'Realm ID' })
  realm_id?: string;

  @ApiProperty({ description: 'Is the provider enabled' })
  enabled: boolean;

  @ApiProperty({ description: 'Store tokens from this provider' })
  store_token: boolean;

  @ApiProperty({ description: 'Authenticate by default' })
  authenticate_by_default: boolean;

  @ApiProperty({ description: 'Add token role' })
  add_token_role: boolean;

  @ApiProperty({ description: 'Trust email from provider' })
  trust_email: boolean;

  @ApiProperty({ description: 'Link only' })
  link_only: boolean;

  @ApiProperty({ description: 'Hide on login page' })
  hide_on_login?: boolean;

  @ApiProperty({ description: 'Organization ID' })
  organization_id?: string;

  @ApiProperty({ description: 'First broker login flow ID' })
  first_broker_login_flow_id?: string;

  @ApiProperty({ description: 'Post broker login flow ID' })
  post_broker_login_flow_id?: string;

  @ApiProperty({ description: 'Provider configuration' })
  config?: Record<string, string>;
}

export class IdentityProvidersPaginatedResponseDto {
  @ApiProperty({ description: 'Array of identity providers' })
  providers: IdentityProviderResponseDto[];

  @ApiProperty({ description: 'Total number of providers' })
  total: number;
}
