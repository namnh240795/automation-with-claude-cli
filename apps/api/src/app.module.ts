import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { SettingsModule } from './settings/settings.module';
import { DemoModule } from './common/demo/demo.module';
import { MessagingModule } from '@app/messaging';
import { OpenSearchModule } from '@app/opensearch';
import { ConfigValidator } from '@app/app-logger';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule.register({
      timeout: 10000,
      maxRedirects: 5,
    }),
    AuthModule,
    SettingsModule,
    DemoModule,
    MessagingModule,
    OpenSearchModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigValidator],
})
export class AppModule {}
