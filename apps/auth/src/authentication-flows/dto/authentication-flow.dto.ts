import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateAuthenticationFlowDto {
  @ApiProperty({
    description: 'Flow alias/identifier',
    example: 'browser-flow',
  })
  @IsString()
  alias: string;

  @ApiProperty({
    description: 'Flow description',
    example: 'Browser based authentication',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Provider ID',
    example: 'basic-flow',
    required: false,
  })
  @IsOptional()
  @IsString()
  provider_id?: string;

  @ApiProperty({
    description: 'Is this a top level flow',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  top_level?: boolean;
}

export class UpdateAuthenticationFlowDto {
  @ApiProperty({
    description: 'Flow alias/identifier',
    required: false,
  })
  @IsOptional()
  @IsString()
  alias?: string;

  @ApiProperty({
    description: 'Flow description',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Provider ID',
    required: false,
  })
  @IsOptional()
  @IsString()
  provider_id?: string;

  @ApiProperty({
    description: 'Is this a top level flow',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  top_level?: boolean;
}

export class AuthenticationFlowResponseDto {
  @ApiProperty({ description: 'Flow ID' })
  id: string;

  @ApiProperty({ description: 'Flow alias/identifier' })
  alias?: string;

  @ApiProperty({ description: 'Flow description' })
  description?: string;

  @ApiProperty({ description: 'Realm ID' })
  realm_id?: string;

  @ApiProperty({ description: 'Provider ID' })
  provider_id: string;

  @ApiProperty({ description: 'Is top level flow' })
  top_level: boolean;

  @ApiProperty({ description: 'Is built-in flow' })
  built_in: boolean;
}

export class AuthenticationFlowsPaginatedResponseDto {
  @ApiProperty({ description: 'Array of authentication flows' })
  flows: AuthenticationFlowResponseDto[];

  @ApiProperty({ description: 'Total number of flows' })
  total: number;
}
