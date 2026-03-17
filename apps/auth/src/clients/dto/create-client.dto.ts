import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, MinLength, IsArray } from 'class-validator';

export class CreateClientDto {
  @ApiProperty({
    description: 'Client identifier (unique within realm)',
    example: 'my-app',
  })
  @IsString()
  @MinLength(1)
  client_id: string;

  @ApiProperty({
    description: 'Client name',
    example: 'My Application',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Client description',
    example: 'My web application',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Whether the client is enabled',
    example: true,
    default: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  enabled?: boolean;

  @ApiProperty({
    description: 'Client secret (for confidential clients)',
    example: 'my-secret-key',
    required: false,
  })
  @IsOptional()
  @IsString()
  secret?: string;

  @ApiProperty({
    description: 'Whether this is a public client',
    example: false,
    default: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  public_client?: boolean;

  @ApiProperty({
    description: 'Enable standard OAuth2 authorization code flow',
    example: true,
    default: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  standard_flow_enabled?: boolean;

  @ApiProperty({
    description: 'Enable implicit flow',
    example: false,
    default: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  implicit_flow_enabled?: boolean;

  @ApiProperty({
    description: 'Enable direct access grants (Resource Owner Password Credentials)',
    example: false,
    default: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  direct_access_grants_enabled?: boolean;

  @ApiProperty({
    description: 'Enable service accounts',
    example: false,
    default: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  service_accounts_enabled?: boolean;

  @ApiProperty({
    description: 'Require user consent',
    example: false,
    default: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  consent_required?: boolean;

  @ApiProperty({
    description: 'Whether this is a bearer-only client (no direct user access)',
    example: false,
    default: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  bearer_only?: boolean;

  @ApiProperty({
    description: 'Base URL',
    example: 'http://localhost:3000',
    required: false,
  })
  @IsOptional()
  @IsString()
  base_url?: string;

  @ApiProperty({
    description: 'Root URL',
    example: 'http://localhost:3000',
    required: false,
  })
  @IsOptional()
  @IsString()
  root_url?: string;

  @ApiProperty({
    description: 'Management URL',
    required: false,
  })
  @IsOptional()
  @IsString()
  management_url?: string;

  @ApiProperty({
    description: 'Valid redirect URIs',
    example: ['http://localhost:3000/callback'],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  redirect_uris?: string[];

  @ApiProperty({
    description: 'Valid web origins',
    example: ['http://localhost:3000'],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  web_origins?: string[];

  @ApiProperty({
    description: 'Protocol (openid-connect, saml)',
    example: 'openid-connect',
    required: false,
  })
  @IsOptional()
  @IsString()
  protocol?: string;
}
