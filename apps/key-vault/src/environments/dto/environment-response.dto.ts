import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class EnvironmentResponseDto {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty({ example: 'production' })
  name: string;

  @ApiPropertyOptional({ example: 'Production environment' })
  description?: string;

  @ApiProperty()
  is_active: boolean;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
