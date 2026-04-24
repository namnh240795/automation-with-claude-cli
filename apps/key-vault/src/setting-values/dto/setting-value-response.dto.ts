import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SettingValueResponseDto {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty({ format: 'uuid' })
  setting_id: string;

  @ApiProperty({ format: 'uuid' })
  environment_id: string;

  @ApiProperty({
    example: '••••••••',
    description: 'Value (masked for SECURE type)',
  })
  value: string;

  @ApiProperty({ example: 1 })
  version: number;

  @ApiPropertyOptional({ example: 'Rotated password' })
  change_reason?: string;

  @ApiProperty()
  created_at: Date;
}
