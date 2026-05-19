import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    description: 'User ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: 'Email address',
    example: 'user@example.com',
  })
  email: string;

  @ApiPropertyOptional({
    description: 'First name',
    example: 'John',
  })
  first_name?: string;

  @ApiPropertyOptional({
    description: 'Last name',
    example: 'Doe',
  })
  last_name?: string;

  @ApiProperty({
    description: 'User role',
    example: 'USER',
  })
  role: string;

  @ApiProperty({
    description: 'Whether the user is active',
    example: true,
  })
  is_active: boolean;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2025-01-15T10:30:00.000Z',
  })
  created_at: Date;
}