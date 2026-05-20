import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsBoolean,
  Length,
  IsUUID,
} from 'class-validator';

export class CreateOrgSecretDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'Organization ID' })
  @IsUUID()
  @IsNotEmpty()
  organization_id: string;

  @ApiProperty({ example: 'org-api-key', description: 'Secret name' })
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  name: string;

  @ApiProperty({ example: 'shared-api-key-value', description: 'Secret value' })
  @IsString()
  @IsNotEmpty()
  @Length(1, 10000)
  value: string;

  @ApiPropertyOptional({ example: 'Shared API key for team', description: 'Description' })
  @IsOptional()
  @IsString()
  @Length(0, 500)
  description?: string;

  @ApiPropertyOptional({ example: ['api', 'shared'], description: 'Tags' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({ example: true, description: 'Allow org members to delete' })
  @IsOptional()
  @IsBoolean()
  can_delete?: boolean;
}