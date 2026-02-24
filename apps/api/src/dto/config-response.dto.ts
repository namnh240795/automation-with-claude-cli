import { ApiProperty } from '@nestjs/swagger';

export class ConfigResponseDto {
  @ApiProperty({
    description: 'Service name',
    example: 'backend',
  })
  service: string;

  @ApiProperty({
    description: 'Environment',
    example: 'development',
    enum: ['development', 'staging', 'production'],
  })
  environment: string;

  @ApiProperty({
    description: 'API version',
    example: '1.0.0',
  })
  version: string;

  @ApiProperty({
    description: 'Current timestamp in ISO format',
    type: Date,
    example: '2025-02-24T10:30:00.000Z',
  })
  timestamp: Date;

  @ApiProperty({
    description: 'Node.js version',
    example: 'v25.6.1',
  })
  nodeVersion: string;

  @ApiProperty({
    description: 'Platform information',
    example: 'darwin',
  })
  platform: string;

  @ApiProperty({
    description: 'Available features',
    type: 'object',
    example: {
      authentication: true,
      database: true,
      cache: false,
    },
  })
  features: Record<string, boolean>;
}
