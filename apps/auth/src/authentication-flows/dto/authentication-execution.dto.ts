import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, IsBoolean, IsEnum } from 'class-validator';

export enum Requirement {
  REQUIRED = 'REQUIRED',
  OPTIONAL = 'OPTIONAL',
  DISABLED = 'DISABLED',
  ALTERNATIVE = 'ALTERNATIVE',
  CONDITIONAL = 'CONDITIONAL',
}

export class CreateAuthenticationExecutionDto {
  @ApiProperty({
    description: 'Execution alias',
    example: 'auth-cookie',
  })
  @IsString()
  alias?: string;

  @ApiProperty({
    description: 'Authenticator implementation',
    example: 'auth-cookie',
  })
  @IsString()
  authenticator: string;

  @ApiProperty({
    description: 'Requirement level',
    enum: Requirement,
    example: 'REQUIRED',
  })
  @IsEnum(Requirement)
  requirement: Requirement;

  @ApiProperty({
    description: 'Execution priority (lower is higher priority)',
    example: 0,
  })
  @IsInt()
  priority: number;

  @ApiProperty({
    description: 'Is this a sub-flow',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  authenticator_flow?: boolean;

  @ApiProperty({
    description: 'Auth flow ID if authenticator_flow is true',
    required: false,
  })
  @IsOptional()
  @IsString()
  auth_flow_id?: string;

  @ApiProperty({
    description: 'Authenticator config ID',
    required: false,
  })
  @IsOptional()
  @IsString()
  auth_config?: string;
}

export class UpdateAuthenticationExecutionDto {
  @ApiProperty({
    description: 'Execution alias',
    required: false,
  })
  @IsOptional()
  @IsString()
  alias?: string;

  @ApiProperty({
    description: 'Authenticator implementation',
    required: false,
  })
  @IsOptional()
  @IsString()
  authenticator?: string;

  @ApiProperty({
    description: 'Requirement level',
    enum: Requirement,
    required: false,
  })
  @IsOptional()
  @IsEnum(Requirement)
  requirement?: Requirement;

  @ApiProperty({
    description: 'Execution priority',
    required: false,
  })
  @IsOptional()
  @IsInt()
  priority?: number;

  @ApiProperty({
    description: 'Is this a sub-flow',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  authenticator_flow?: boolean;

  @ApiProperty({
    description: 'Auth flow ID if authenticator_flow is true',
    required: false,
  })
  @IsOptional()
  @IsString()
  auth_flow_id?: string;

  @ApiProperty({
    description: 'Authenticator config ID',
    required: false,
  })
  @IsOptional()
  @IsString()
  auth_config?: string;
}

export class AuthenticationExecutionResponseDto {
  @ApiProperty({ description: 'Execution ID' })
  id: string;

  @ApiProperty({ description: 'Execution alias' })
  alias?: string;

  @ApiProperty({ description: 'Authenticator implementation' })
  authenticator?: string;

  @ApiProperty({ description: 'Realm ID' })
  realm_id?: string;

  @ApiProperty({ description: 'Flow ID' })
  flow_id?: string;

  @ApiProperty({ description: 'Requirement level (0=REQUIRED, 1=OPTIONAL, 2=DISABLED, 3=ALTERNATIVE, 4=CONDITIONAL)' })
  requirement?: number;

  @ApiProperty({ description: 'Execution priority' })
  priority?: number;

  @ApiProperty({ description: 'Is this a sub-flow' })
  authenticator_flow: boolean;

  @ApiProperty({ description: 'Auth flow ID' })
  auth_flow_id?: string;

  @ApiProperty({ description: 'Authenticator config ID' })
  auth_config?: string;
}

export class AuthenticationExecutionsPaginatedResponseDto {
  @ApiProperty({ description: 'Array of authentication executions' })
  executions: AuthenticationExecutionResponseDto[];

  @ApiProperty({ description: 'Total number of executions' })
  total: number;
}
