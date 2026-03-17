import { ApiProperty } from '@nestjs/swagger';

export class EventResponseDto {
  @ApiProperty({ description: 'Event ID' })
  id: string;

  @ApiProperty({ description: 'Event type' })
  type?: string;

  @ApiProperty({ description: 'Realm ID' })
  realm_id?: string;

  @ApiProperty({ description: 'User ID' })
  user_id?: string;

  @ApiProperty({ description: 'Client ID' })
  client_id?: string;

  @ApiProperty({ description: 'Session ID' })
  session_id?: string;

  @ApiProperty({ description: 'IP address' })
  ip_address?: string;

  @ApiProperty({ description: 'Event time' })
  event_time?: number;

  @ApiProperty({ description: 'Error message' })
  error?: string;

  @ApiProperty({ description: 'Event details (JSON)' })
  details_json?: string;

  @ApiProperty({ description: 'Long value details' })
  details_json_long_value?: string;
}

export class AdminEventResponseDto {
  @ApiProperty({ description: 'Admin event ID' })
  id: string;

  @ApiProperty({ description: 'Operation type' })
  operation_type?: string;

  @ApiProperty({ description: 'Realm ID' })
  realm_id?: string;

  @ApiProperty({ description: 'Resource type' })
  resource_type?: string;

  @ApiProperty({ description: 'Resource path' })
  resource_path?: string;

  @ApiProperty({ description: 'Authentication realm ID' })
  auth_realm_id?: string;

  @ApiProperty({ description: 'Authentication client ID' })
  auth_client_id?: string;

  @ApiProperty({ description: 'Authentication user ID' })
  auth_user_id?: string;

  @ApiProperty({ description: 'IP address' })
  ip_address?: string;

  @ApiProperty({ description: 'Admin event time' })
  admin_event_time?: number;

  @ApiProperty({ description: 'Error message' })
  error?: string;

  @ApiProperty({ description: 'Event representation' })
  representation?: string;

  @ApiProperty({ description: 'Event details (JSON)' })
  details_json?: string;
}

export class EventsPaginatedResponseDto {
  @ApiProperty({
    description: 'Array of events',
    isArray: true,
    type: EventResponseDto,
  })
  data: EventResponseDto[];

  @ApiProperty({ description: 'Total number of events' })
  total: number;
}

export class AdminEventsPaginatedResponseDto {
  @ApiProperty({
    description: 'Array of admin events',
    isArray: true,
    type: AdminEventResponseDto,
  })
  data: AdminEventResponseDto[];

  @ApiProperty({ description: 'Total number of admin events' })
  total: number;
}

export class EventQueryDto {
  @ApiProperty({ description: 'Filter by user ID', required: false })
  user_id?: string;

  @ApiProperty({ description: 'Filter by client ID', required: false })
  client_id?: string;

  @ApiProperty({ description: 'Filter by event type', required: false })
  type?: string;

  @ApiProperty({ description: 'Filter by date from (timestamp)', required: false })
  date_from?: number;

  @ApiProperty({ description: 'Filter by date to (timestamp)', required: false })
  date_to?: number;
}

export class AdminEventQueryDto {
  @ApiProperty({ description: 'Filter by operation type', required: false })
  operation_type?: string;

  @ApiProperty({ description: 'Filter by resource type', required: false })
  resource_type?: string;

  @ApiProperty({ description: 'Filter by resource path', required: false })
  resource_path?: string;

  @ApiProperty({ description: 'Filter by auth realm', required: false })
  auth_realm_id?: string;

  @ApiProperty({ description: 'Filter by date from (timestamp)', required: false })
  date_from?: number;

  @ApiProperty({ description: 'Filter by date to (timestamp)', required: false })
  date_to?: number;
}
