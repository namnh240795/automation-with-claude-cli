import { ApiProperty } from '@nestjs/swagger';
import { ConsumedSettingDto } from './consumed-setting.dto';

export class ServiceSettingsResponseDto {
  @ApiProperty({ example: 'auth' })
  service_name: string;

  @ApiProperty({ example: 'production' })
  environment: string;

  @ApiProperty({ isArray: true, type: ConsumedSettingDto })
  settings: ConsumedSettingDto[];
}
