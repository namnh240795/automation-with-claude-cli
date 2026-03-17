import { ApiProperty } from '@nestjs/swagger';

export class FederatedIdentityResponseDto {
  @ApiProperty({ description: 'Identity provider ID' })
  identity_provider: string;

  @ApiProperty({ description: 'Realm ID' })
  realm_id?: string;

  @ApiProperty({ description: 'Federated user ID' })
  federated_user_id?: string;

  @ApiProperty({ description: 'Federated username' })
  federated_username?: string;

  @ApiProperty({ description: 'Local user ID' })
  user_id: string;

  @ApiProperty({ description: 'Federated token' })
  token?: string;
}

export class FederatedIdentitiesListResponseDto {
  @ApiProperty({ description: 'Array of federated identities' })
  identities: FederatedIdentityResponseDto[];

  @ApiProperty({ description: 'Total number of identities' })
  total: number;
}
