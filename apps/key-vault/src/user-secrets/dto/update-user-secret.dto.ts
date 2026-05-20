import {
  ApiPropertyOptional,
} from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsArray,
  IsBoolean,
  Length,
} from 'class-validator';

export class UpdateUserSecretDto {
  @ApiPropertyOptional({ example: 'new-secret-name', description: 'Secret name' })
  @IsOptional()
  @IsString()
  @Length(1, 255)
  name?: string;

  @ApiPropertyOptional({ example: 'new-secret-value', description: 'Secret value' })
  @IsOptional()
  @IsString()
  @Length(1, 10000)
  value?: string;

  @ApiPropertyOptional({ example: 'Updated description', description: 'Description' })
  @IsOptional()
  @IsString()
  @Length(0, 500)
  description?: string;

  @ApiPropertyOptional({ example: ['database', 'updated'], description: 'Tags' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({ example: true, description: 'Can other org members delete' })
  @IsOptional()
  @IsBoolean()
  can_delete?: boolean;
}