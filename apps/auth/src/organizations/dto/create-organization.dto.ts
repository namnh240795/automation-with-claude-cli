import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  Length,
  IsEnum,
} from 'class-validator';

export enum OrganizationType {
  PERSONAL = 'PERSONAL',
  BUSINESS = 'BUSINESS',
}

export class CreateOrganizationDto {
  @ApiProperty({
    description: 'Organization name',
    example: 'Acme Corporation',
    minLength: 2,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  name: string;

  @ApiProperty({
    description: 'Public-facing organization ID (unique)',
    example: 'acme-corp',
    minLength: 2,
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  display_id: string;

  @ApiPropertyOptional({
    description: 'Organization type',
    enum: OrganizationType,
    default: OrganizationType.BUSINESS,
    example: 'BUSINESS',
  })
  @IsOptional()
  @IsEnum(OrganizationType)
  type?: OrganizationType;
}