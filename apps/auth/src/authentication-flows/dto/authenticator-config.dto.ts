import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsInt } from 'class-validator';

export class CreateAuthenticatorConfigDto {
  @ApiProperty({
    description: 'Config alias',
    example: 'totp-config',
  })
  @IsString()
  alias: string;

  @ApiProperty({
    description: 'Configuration entries as key-value pairs',
    example: { 'key': 'value' },
    required: false,
  })
  @IsOptional()
  config?: Record<string, string>;
}

export class UpdateAuthenticatorConfigDto {
  @ApiProperty({
    description: 'Config alias',
    required: false,
  })
  @IsOptional()
  @IsString()
  alias?: string;

  @ApiProperty({
    description: 'Configuration entries as key-value pairs',
    required: false,
  })
  @IsOptional()
  config?: Record<string, string>;
}

export class AuthenticatorConfigResponseDto {
  @ApiProperty({ description: 'Config ID' })
  id: string;

  @ApiProperty({ description: 'Config alias' })
  alias?: string;

  @ApiProperty({ description: 'Realm ID' })
  realm_id?: string;

  @ApiProperty({ description: 'Config entries' })
  config?: Record<string, string>;
}

export class AuthenticatorConfigsPaginatedResponseDto {
  @ApiProperty({ description: 'Array of authenticator configs' })
  configs: AuthenticatorConfigResponseDto[];

  @ApiProperty({ description: 'Total number of configs' })
  total: number;
}
