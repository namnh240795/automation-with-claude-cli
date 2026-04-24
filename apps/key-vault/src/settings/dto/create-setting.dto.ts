import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  Length,
  IsEnum,
} from 'class-validator';
import { SettingType } from '../../common/enum';

export class CreateSettingDto {
  @ApiProperty({ example: 'auth', description: 'Service name' })
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  service_name: string;

  @ApiProperty({ example: 'SMTP_PASSWORD', description: 'Setting key' })
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  key: string;

  @ApiProperty({
    enum: SettingType,
    example: SettingType.SECURE,
    description: 'Setting type',
  })
  @IsEnum(SettingType)
  @IsNotEmpty()
  type: SettingType;

  @ApiPropertyOptional({
    example: 'SMTP server password',
    description: 'Description',
  })
  @IsOptional()
  @IsString()
  @Length(0, 500)
  description?: string;
}
