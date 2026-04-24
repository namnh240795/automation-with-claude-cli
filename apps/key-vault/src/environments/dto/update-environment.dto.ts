import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, Length } from 'class-validator';

export class UpdateEnvironmentDto {
  @ApiPropertyOptional({
    example: 'production',
    description: 'Environment name',
  })
  @IsOptional()
  @IsString()
  @Length(1, 50)
  name?: string;

  @ApiPropertyOptional({
    example: 'Updated description',
    description: 'Description',
  })
  @IsOptional()
  @IsString()
  @Length(0, 500)
  description?: string;
}
