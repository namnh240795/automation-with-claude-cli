import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, MinLength } from 'class-validator';

export class CreateGroupDto {
  @ApiProperty({
    description: 'Group name',
    example: 'administrators',
  })
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty({
    description: 'Parent group ID (optional, for hierarchical groups)',
    example: '550e8400-e29b-41d4-a716-446655440000',
    required: false,
  })
  @IsOptional()
  @IsString()
  parent_id?: string;
}
