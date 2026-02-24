import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class HealthResponseDto {
  @ApiProperty({
    description: 'Service health status',
    example: 'ok',
    enum: ['ok', 'error', 'degraded'],
    enumName: 'HealthStatus'
  })
  status: string;

  @ApiProperty({
    description: 'Current timestamp in ISO format',
    type: Date,
    example: '2025-02-23T10:30:00.000Z'
  })
  timestamp: Date;

  @ApiPropertyOptional({
    description: 'Service name',
    example: 'auth'
  })
  service?: string;

  @ApiPropertyOptional({
    description: 'Service version',
    example: '1.0.0'
  })
  version?: string;

  @ApiPropertyOptional({
    description: 'Server uptime in seconds',
    type: 'integer',
    format: 'int64'
  })
  uptime?: number;
}
