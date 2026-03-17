import { ApiProperty } from '@nestjs/swagger';

export class RealmResponseDto {
  @ApiProperty({
    description: 'Realm unique identifier',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: 'Realm unique name',
    example: 'my-realm',
  })
  name: string;

  @ApiProperty({
    description: 'Whether the realm is enabled',
    example: true,
  })
  enabled: boolean;

  @ApiProperty({
    description: 'Whether SSL is required',
    example: 'external',
    required: false,
  })
  ssl_required?: string;

  @ApiProperty({
    description: 'Whether user registration is allowed',
    example: false,
  })
  registration_allowed: boolean;

  @ApiProperty({
    description: 'Login theme name',
    example: 'keycloak',
    required: false,
  })
  login_theme?: string;

  @ApiProperty({
    description: 'Account theme name',
    example: 'keycloak',
    required: false,
  })
  account_theme?: string;

  @ApiProperty({
    description: 'Admin theme name',
    example: 'keycloak',
    required: false,
  })
  admin_theme?: string;

  @ApiProperty({
    description: 'Email theme name',
    example: 'keycloak',
    required: false,
  })
  email_theme?: string;

  @ApiProperty({
    description: 'Whether internationalization is enabled',
    example: false,
  })
  internationalization_enabled: boolean;

  @ApiProperty({
    description: 'Default locale',
    example: 'en',
    required: false,
  })
  default_locale?: string;

  @ApiProperty({
    description: 'Access token lifespan in seconds',
    example: 300,
    required: false,
  })
  access_token_lifespan?: number;

  @ApiProperty({
    description: 'Access code lifespan in seconds',
    example: 60,
    required: false,
  })
  access_code_lifespan?: number;

  @ApiProperty({
    description: 'Reset password allowed',
    example: true,
  })
  reset_password_allowed: boolean;

  @ApiProperty({
    description: 'Edit username allowed',
    example: true,
  })
  edit_username_allowed: boolean;
}
