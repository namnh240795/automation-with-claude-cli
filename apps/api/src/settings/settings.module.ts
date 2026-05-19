import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [HttpModule, AuthModule],
  providers: [SettingsService],
  controllers: [SettingsController],
  exports: [SettingsService],
})
export class SettingsModule {}
