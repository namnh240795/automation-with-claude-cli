import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, Length, IsEnum } from 'class-validator';
import { SettingType } from '../../common/enum';

export class UpdateSettingDto {
  @ApiPropertyOptional({ enum: SettingType, description: 'Setting type' })
  @IsOptional()
  @IsEnum(SettingType)
  type?: SettingType;

  @ApiPropertyOptional({
    example: 'Updated description',
    description: 'Description',
  })
  @IsOptional()
  @IsString()
  @Length(0, 500)
  description?: string;
}
