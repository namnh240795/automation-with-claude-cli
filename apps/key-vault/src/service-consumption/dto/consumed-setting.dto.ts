import { ApiProperty } from '@nestjs/swagger';

export class ConsumedSettingDto {
  @ApiProperty({ example: 'SMTP_HOST' })
  key: string;

  @ApiProperty({ example: 'smtp.mailtrap.io' })
  value: string;
}
