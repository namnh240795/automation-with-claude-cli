import { ApiProperty } from '@nestjs/swagger';
import { TransformBigInt } from '../../common/decorators';

export class UserResponseDto {
  @ApiProperty({
    description: 'User unique identifier',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: 'User username',
    example: 'john.doe',
  })
  username: string;

  @ApiProperty({
    description: 'User email address',
    example: 'john.doe@example.com',
    required: false,
  })
  email?: string;

  @ApiProperty({
    description: "User's first name",
    example: 'John',
    required: false,
  })
  first_name?: string;

  @ApiProperty({
    description: "User's last name",
    example: 'Doe',
    required: false,
  })
  last_name?: string;

  @ApiProperty({
    description: 'Whether the user is enabled',
    example: true,
  })
  enabled: boolean;

  @ApiProperty({
    description: 'Whether the email is verified',
    example: false,
  })
  email_verified: boolean;

  @ApiProperty({
    description: 'Account creation timestamp',
    example: '1708790400000',
    required: false,
  })
  @TransformBigInt()
  created_timestamp?: bigint;

  @ApiProperty({
    description: 'Federation link',
    required: false,
  })
  federation_link?: string;

  @ApiProperty({
    description: 'Service account client link',
    required: false,
  })
  service_account_client_link?: string;
}
