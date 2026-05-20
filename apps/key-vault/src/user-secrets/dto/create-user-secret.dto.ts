import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  Length,
} from 'class-validator';

export class CreateUserSecretDto {
  @ApiProperty({ example: 'my-db-password', description: 'Secret name' })
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  name: string;

  @ApiProperty({ example: 'super-secret-value', description: 'Secret value' })
  @IsString()
  @IsNotEmpty()
  @Length(1, 10000)
  value: string;

  @ApiPropertyOptional({ example: 'Production DB password', description: 'Description' })
  @IsOptional()
  @IsString()
  @Length(0, 500)
  description?: string;

  @ApiPropertyOptional({ example: ['database', 'prod'], description: 'Tags' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}