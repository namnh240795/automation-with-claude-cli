import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, Length, IsEnum } from 'class-validator';
import { OrganizationType } from './create-organization.dto';

export class UpdateOrganizationDto {
  @ApiPropertyOptional({
    description: 'Organization name',
    example: 'Acme Corporation Updated',
    minLength: 2,
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @Length(2, 100)
  name?: string;

  @ApiPropertyOptional({
    description: 'Organization type',
    enum: OrganizationType,
    example: 'BUSINESS',
  })
  @IsOptional()
  @IsEnum(OrganizationType)
  type?: OrganizationType;

  @ApiPropertyOptional({
    description: 'Whether the organization is active',
    example: true,
  })
  @IsOptional()
  @IsString()
  is_active?: string;
}