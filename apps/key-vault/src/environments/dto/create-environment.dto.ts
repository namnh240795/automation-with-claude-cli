import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, Length } from 'class-validator';

export class CreateEnvironmentDto {
  @ApiProperty({ example: 'production', description: 'Environment name' })
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  name: string;

  @ApiPropertyOptional({
    example: 'Production environment',
    description: 'Description',
  })
  @IsOptional()
  @IsString()
  @Length(0, 500)
  description?: string;
}
