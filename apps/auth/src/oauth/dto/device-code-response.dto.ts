import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class DeviceCodeResponseDto {
  @ApiProperty({
    description: 'Device code (used by device to poll for token)',
    example: 'GmRhmhcxhwRkoJdQDxEyw0ensCl4',
  })
  device_code: string;

  @ApiProperty({
    description: 'User code (user enters this on verification page)',
    example: 'WDJB-MJHT',
  })
  user_code: string;

  @ApiProperty({
    description: 'Verification URI (user visits this to enter code)',
    example: 'http://localhost:3001/auth/oauth/device/verify',
  })
  verification_uri: string;

  @ApiPropertyOptional({
    description: 'Complete verification URI with pre-filled code',
    example: 'http://localhost:3001/auth/oauth/device/verify?user_code=WDJB-MJHT',
  })
  verification_uri_complete?: string;

  @ApiProperty({
    description: 'Device code + user code lifetime in seconds',
    example: 900,
  })
  expires_in: number;

  @ApiProperty({
    description: 'Polling interval in seconds',
    example: 5,
  })
  interval: number;
}

export class DeviceVerifyRequestDto {
  @ApiProperty({
    description: 'User code displayed on device',
    example: 'WDJB-MJHT',
  })
  user_code: string;
}

export class DeviceVerifyResponseDto {
  @ApiProperty({ description: 'Device code' })
  device_code: string;

  @ApiProperty({ description: 'User code' })
  user_code: string;

  @ApiProperty({ description: 'Client name' })
  client_name: string;

  @ApiPropertyOptional({ description: 'Client logo URI' })
  client_logo_uri?: string;

  @ApiProperty({ description: 'Requested scopes' })
  scope: string;

  @ApiProperty({ description: 'Expiration time' })
  expires_at: Date;
}

export class DeviceConsentDto {
  @ApiProperty({ description: 'User code' })
  user_code: string;

  @ApiProperty({
    description: 'User consent decision',
    example: 'accept',
    enum: ['accept', 'deny'],
  })
  action: 'accept' | 'deny';
}
