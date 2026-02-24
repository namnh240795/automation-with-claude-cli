import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class HelloResponseDto {
  @ApiProperty({
    description: 'Greeting message',
    example: 'Hello from Auth!'
  })
  message: string;

  @ApiPropertyOptional({
    description: 'Response timestamp in ISO format',
    type: Date,
    example: '2025-02-23T10:30:00.000Z'
  })
  timestamp?: Date;

  @ApiPropertyOptional({
    description: 'Request ID for tracing',
    type: String,
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  requestId?: string;
}
