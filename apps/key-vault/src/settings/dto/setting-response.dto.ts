import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SettingResponseDto {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty({ example: 'auth' })
  service_name: string;

  @ApiProperty({ example: 'SMTP_PASSWORD' })
  key: string;

  @ApiProperty({ example: 'SECURE' })
  type: string;

  @ApiPropertyOptional({ example: 'SMTP server password' })
  description?: string;

  @ApiProperty()
  is_active: boolean;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
