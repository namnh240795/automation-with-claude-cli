import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

export class UserSecretResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  value?: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiProperty({ isArray: true, type: String })
  tags: string[];

  @ApiProperty()
  secret_type: string;

  @ApiProperty()
  is_active: boolean;

  @ApiProperty()
  created_at: Date;

  @ApiPropertyOptional()
  organization_id?: string;

  @ApiPropertyOptional()
  owned_by?: string;
}

export class UserSecretMetadataDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiProperty({ isArray: true, type: String })
  tags: string[];

  @ApiProperty()
  secret_type: string;

  @ApiProperty()
  is_active: boolean;

  @ApiProperty()
  created_at: Date;

  @ApiPropertyOptional()
  organization_id?: string;

  @ApiPropertyOptional()
  owned_by?: string;
}

export class UserSecretListResponseDto {
  @ApiProperty({ isArray: true, type: UserSecretMetadataDto })
  personal: UserSecretMetadataDto[];

  @ApiProperty({ isArray: true, type: UserSecretMetadataDto })
  organization: UserSecretMetadataDto[];

  @ApiProperty({ isArray: true, type: UserSecretMetadataDto })
  as_admin: UserSecretMetadataDto[];
}