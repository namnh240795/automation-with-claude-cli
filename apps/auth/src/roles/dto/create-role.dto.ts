import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, MinLength } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    description: 'Role name (unique within realm)',
    example: 'admin',
  })
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty({
    description: 'Role description',
    example: 'Administrator role with full access',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;
}
