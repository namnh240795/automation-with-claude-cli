import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class OrganizationResponseDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id: string;

  @ApiProperty({ example: 'Acme Corporation' })
  name: string;

  @ApiProperty({ example: 'acme-corp' })
  display_id: string;

  @ApiProperty({ example: 'BUSINESS' })
  type: string;

  @ApiProperty({ example: true })
  is_active: boolean;

  @ApiProperty({ example: '2026-05-20T10:00:00.000Z' })
  created_at: Date;

  @ApiPropertyOptional({ example: '2026-05-20T10:00:00.000Z' })
  updated_at?: Date;
}

export class OrganizationMemberResponseDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  user_id: string;

  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty({ example: 'John' })
  first_name?: string;

  @ApiProperty({ example: 'Doe' })
  last_name?: string;

  @ApiProperty({ example: 'ADMIN' })
  organization_role: string;

  @ApiProperty({ example: true })
  is_active: boolean;

  @ApiProperty({ example: '2026-05-20T10:00:00.000Z' })
  created_at: Date;
}