import { Module } from '@nestjs/common';
import { SettingValuesController } from './setting-values.controller';
import { SettingValuesService } from './setting-values.service';

@Module({
  controllers: [SettingValuesController],
  providers: [SettingValuesService],
})
export class SettingValuesModule {}
