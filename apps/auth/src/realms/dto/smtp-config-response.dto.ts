import { ApiProperty } from '@nestjs/swagger';

export class SmtpConfigResponseDto {
  @ApiProperty({
    description: 'SMTP server host',
    example: 'smtp.example.com',
    required: false,
  })
  host?: string;

  @ApiProperty({
    description: 'SMTP server port',
    example: 587,
    required: false,
  })
  port?: number;

  @ApiProperty({
    description: 'SMTP username',
    required: false,
  })
  username?: string;

  @ApiProperty({
    description: 'Email from address',
    example: 'noreply@example.com',
    required: false,
  })
  from?: string;

  @ApiProperty({
    description: 'Reply-to address',
    required: false,
  })
  reply_to?: string;

  @ApiProperty({
    description: 'Enable SSL/TLS',
    example: true,
    required: false,
  })
  ssl?: boolean;

  @ApiProperty({
    description: 'Enable STARTTLS',
    example: true,
    required: false,
  })
  start_tls?: string;

  @ApiProperty({
    description: 'Email authentication enabled',
    example: true,
    required: false,
  })
  auth?: boolean;

  @ApiProperty({
    description: 'Envelope from address',
    required: false,
  })
  envelope_from?: string;

  @ApiProperty({
    description: 'SMTP server password (should not be returned)',
    required: false,
  })
  password?: string;
}
