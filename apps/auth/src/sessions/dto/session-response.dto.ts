import { ApiProperty } from '@nestjs/swagger';

export class UserSessionResponseDto {
  @ApiProperty({ description: 'User session ID' })
  user_session_id: string;

  @ApiProperty({ description: 'User ID' })
  user_id: string;

  @ApiProperty({ description: 'Realm ID' })
  realm_id: string;

  @ApiProperty({ description: 'Session created timestamp' })
  created_on: number;

  @ApiProperty({ description: 'Last session refresh timestamp' })
  last_session_refresh: number;

  @ApiProperty({ description: 'Broker session ID' })
  broker_session_id?: string;

  @ApiProperty({ description: 'Session data' })
  data?: string;
}

export class ClientSessionResponseDto {
  @ApiProperty({ description: 'User session ID' })
  user_session_id: string;

  @ApiProperty({ description: 'Client ID' })
  client_id: string;

  @ApiProperty({ description: 'Session timestamp' })
  timestamp?: number;

  @ApiProperty({ description: 'Session data' })
  data?: string;

  @ApiProperty({ description: 'Client storage provider' })
  client_storage_provider: string;

  @ApiProperty({ description: 'External client ID' })
  external_client_id: string;

  @ApiProperty({ description: 'Offline flag' })
  offline_flag: string;
}

export class SessionsListResponseDto {
  @ApiProperty({
    description: 'Array of user sessions',
    isArray: true,
    type: UserSessionResponseDto,
  })
  data: UserSessionResponseDto[];

  @ApiProperty({ description: 'Total number of sessions' })
  total: number;
}

export class RevokeTokenDto {
  @ApiProperty({ description: 'Token to revoke' })
  token: string;

  @ApiProperty({ description: 'Expiration time for token (seconds since epoch)' })
  expire: number;
}
