import { ApiProperty } from '@nestjs/swagger';

export class RoleResponseDto {
  @ApiProperty({
    description: 'Role unique identifier',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: 'Role name',
    example: 'admin',
  })
  name: string;

  @ApiProperty({
    description: 'Role description',
    example: 'Administrator role with full access',
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: 'Whether this is a client-specific role',
    example: false,
  })
  client_role: boolean;

  @ApiProperty({
    description: 'Realm ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  realm: string;
}
