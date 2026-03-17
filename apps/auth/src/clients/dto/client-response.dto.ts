import { ApiProperty } from '@nestjs/swagger';

export class ClientResponseDto {
  @ApiProperty({
    description: 'Client unique identifier',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: 'Client identifier',
    example: 'my-app',
  })
  client_id: string;

  @ApiProperty({
    description: 'Client name',
    example: 'My Application',
    required: false,
  })
  name?: string;

  @ApiProperty({
    description: 'Client description',
    example: 'My web application',
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: 'Whether the client is enabled',
    example: true,
  })
  enabled: boolean;

  @ApiProperty({
    description: 'Whether this is a public client',
    example: false,
  })
  public_client: boolean;

  @ApiProperty({
    description: 'Enable standard OAuth2 authorization code flow',
    example: true,
  })
  standard_flow_enabled: boolean;

  @ApiProperty({
    description: 'Enable implicit flow',
    example: false,
  })
  implicit_flow_enabled: boolean;

  @ApiProperty({
    description: 'Enable direct access grants',
    example: false,
  })
  direct_access_grants_enabled: boolean;

  @ApiProperty({
    description: 'Enable service accounts',
    example: false,
  })
  service_accounts_enabled: boolean;

  @ApiProperty({
    description: 'Require user consent',
    example: false,
  })
  consent_required: boolean;

  @ApiProperty({
    description: 'Whether this is a bearer-only client',
    example: false,
  })
  bearer_only: boolean;
}
