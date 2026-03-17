import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateIdentityProviderMapperDto {
  @ApiProperty({
    description: 'Mapper name',
    example: 'user-attribute-mapper',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Identity provider alias',
    example: 'google',
  })
  @IsString()
  idp_alias: string;

  @ApiProperty({
    description: 'Identity provider mapper name (e.g., "google-user-attribute-mapper")',
    example: 'google-user-attribute-mapper',
  })
  @IsString()
  idp_mapper_name: string;

  @ApiProperty({
    description: 'Mapper configuration as key-value pairs',
    example: { 'user.attribute': 'email', 'attribute.name': 'google_email' },
    required: false,
  })
  @IsOptional()
  config?: Record<string, string>;
}

export class UpdateIdentityProviderMapperDto {
  @ApiProperty({
    description: 'Mapper name',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Identity provider mapper name',
    required: false,
  })
  @IsOptional()
  @IsString()
  idp_mapper_name?: string;

  @ApiProperty({
    description: 'Mapper configuration as key-value pairs',
    required: false,
  })
  @IsOptional()
  config?: Record<string, string>;
}

export class IdentityProviderMapperResponseDto {
  @ApiProperty({ description: 'Mapper ID' })
  id: string;

  @ApiProperty({ description: 'Mapper name' })
  name: string;

  @ApiProperty({ description: 'Identity provider alias' })
  idp_alias: string;

  @ApiProperty({ description: 'Identity provider mapper name' })
  idp_mapper_name: string;

  @ApiProperty({ description: 'Realm ID' })
  realm_id: string;

  @ApiProperty({ description: 'Mapper configuration' })
  config?: Record<string, string>;
}

export class IdentityProviderMappersPaginatedResponseDto {
  @ApiProperty({ description: 'Array of identity provider mappers' })
  mappers: IdentityProviderMapperResponseDto[];

  @ApiProperty({ description: 'Total number of mappers' })
  total: number;
}
