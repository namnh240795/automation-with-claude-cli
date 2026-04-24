import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, Length } from 'class-validator';

export class SetValueDto {
  @ApiProperty({ example: 'my-secret-password', description: 'Setting value (will be encrypted for SECURE type)' })
  @IsString()
  @IsNotEmpty()
  @Length(1, 10000)
  value: string;

  @ApiPropertyOptional({ example: 'Rotated password for Q2 2026', description: 'Reason for the change' })
  @IsOptional()
  @IsString()
  @Length(0, 500)
  change_reason?: string;
}
