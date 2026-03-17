import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional, IsInt, Min, Max } from 'class-validator';

export class CreateRealmDto {
  @ApiProperty({
    description: 'Realm unique name (used in URLs)',
    example: 'my-realm',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Whether the realm is enabled',
    example: true,
    default: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  enabled?: boolean;

  @ApiProperty({
    description: 'Whether SSL is required for this realm',
    example: 'external',
    required: false,
  })
  @IsOptional()
  @IsString()
  ssl_required?: string;

  @ApiProperty({
    description: 'Whether user registration is allowed',
    example: false,
    default: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  registration_allowed?: boolean;

  @ApiProperty({
    description: 'Login theme name',
    example: 'keycloak',
    required: false,
  })
  @IsOptional()
  @IsString()
  login_theme?: string;

  @ApiProperty({
    description: 'Account theme name',
    example: 'keycloak',
    required: false,
  })
  @IsOptional()
  @IsString()
  account_theme?: string;

  @ApiProperty({
    description: 'Admin theme name',
    example: 'keycloak',
    required: false,
  })
  @IsOptional()
  @IsString()
  admin_theme?: string;

  @ApiProperty({
    description: 'Email theme name',
    example: 'keycloak',
    required: false,
  })
  @IsOptional()
  @IsString()
  email_theme?: string;

  @ApiProperty({
    description: 'Whether internationalization is enabled',
    example: false,
    default: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  internationalization_enabled?: boolean;

  @ApiProperty({
    description: 'Default locale',
    example: 'en',
    required: false,
  })
  @IsOptional()
  @IsString()
  default_locale?: string;

  @ApiProperty({
    description: 'Access token lifespan in seconds',
    example: 300,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  access_token_lifespan?: number;

  @ApiProperty({
    description: 'Access code lifespan in seconds',
    example: 60,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  access_code_lifespan?: number;

  @ApiProperty({
    description: 'Reset password allowed',
    example: true,
    default: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  reset_password_allowed?: boolean;

  @ApiProperty({
    description: 'Edit username allowed',
    example: true,
    default: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  edit_username_allowed?: boolean;
}
