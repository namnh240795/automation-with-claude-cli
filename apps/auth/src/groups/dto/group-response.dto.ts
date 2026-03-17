import { ApiProperty } from '@nestjs/swagger';

export class GroupResponseDto {
  @ApiProperty({
    description: 'Group unique identifier',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: 'Group name',
    example: 'administrators',
  })
  name: string;

  @ApiProperty({
    description: 'Parent group ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
    required: false,
  })
  parent_group?: string;

  @ApiProperty({
    description: 'Realm ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  realm_id: string;

  @ApiProperty({
    description: 'Group type',
    example: 0,
  })
  type: number;
}
