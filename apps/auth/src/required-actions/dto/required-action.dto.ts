import { ApiProperty } from '@nestjs/swagger';

export class RequiredActionResponseDto {
  @ApiProperty({ description: 'Required action ID' })
  id: string;

  @ApiProperty({ description: 'Action alias' })
  alias?: string;

  @ApiProperty({ description: 'Action name' })
  name?: string;

  @ApiProperty({ description: 'Action provider ID' })
  provider_id?: string;

  @ApiProperty({ description: 'Whether action is enabled' })
  enabled: boolean;

  @ApiProperty({ description: 'Whether this is a default action' })
  default_action: boolean;

  @ApiProperty({ description: 'Action priority' })
  priority?: number;

  @ApiProperty({ description: 'Realm ID' })
  realm_id?: string;
}

export class CreateRequiredActionDto {
  @ApiProperty({ description: 'Action alias', example: 'VERIFY_EMAIL' })
  alias: string;

  @ApiProperty({ description: 'Action name', example: 'Verify Email' })
  name?: string;

  @ApiProperty({ description: 'Provider ID', example: 'verify-email' })
  provider_id?: string;

  @ApiProperty({ description: 'Whether action is enabled', example: true })
  enabled: boolean;

  @ApiProperty({ description: 'Default action', example: false })
  default_action?: boolean;

  @ApiProperty({ description: 'Action priority', example: 10 })
  priority?: number;
}

export class UpdateRequiredActionDto {
  @ApiProperty({ description: 'Action alias' })
  alias?: string;

  @ApiProperty({ description: 'Action name' })
  name?: string;

  @ApiProperty({ description: 'Whether action is enabled' })
  enabled?: boolean;

  @ApiProperty({ description: 'Default action' })
  default_action?: boolean;

  @ApiProperty({ description: 'Action priority' })
  priority?: number;
}

export class UserRequiredActionResponseDto {
  @ApiProperty({ description: 'User ID' })
  user_id: string;

  @ApiProperty({ description: 'Required action' })
  required_action: string;
}

export class SetUserRequiredActionsDto {
  @ApiProperty({
    description: 'List of required actions to assign to user',
    isArray: true,
    type: String,
    example: ['VERIFY_EMAIL', 'UPDATE_PASSWORD'],
  })
  required_actions: string[];
}

export class RequiredActionsPaginatedResponseDto {
  @ApiProperty({
    description: 'Array of required actions',
    isArray: true,
    type: RequiredActionResponseDto,
  })
  data: RequiredActionResponseDto[];

  @ApiProperty({ description: 'Total number of required actions' })
  total: number;
}
