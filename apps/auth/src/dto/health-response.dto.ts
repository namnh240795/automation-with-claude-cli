import { ApiProperty } from '@nestjs/swagger';

export class HealthResponseDto {
  @ApiProperty({
    description: 'Health status of the service',
    example: 'ok',
  })
  status: string;

  @ApiProperty({
    description: 'Current timestamp',
    type: Date,
    example: '2026-03-20T10:30:00.000Z',
  })
  timestamp: Date;

  @ApiProperty({
    description: 'Service name',
    example: 'auth',
  })
  service: string;

  @ApiProperty({
    description: 'Service version',
    example: '1.0.0',
  })
  version: string;

  @ApiProperty({
    description: 'Server uptime in seconds',
    example: 123.45,
  })
  uptime: number;
}
