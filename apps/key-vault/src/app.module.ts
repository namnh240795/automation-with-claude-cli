import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { EncryptionModule } from './encryption/encryption.module';
import { EnvironmentsModule } from './environments/environments.module';
import { SettingsModule } from './settings/settings.module';
import { SettingValuesModule } from './setting-values/setting-values.module';
import { ServiceConsumptionModule } from './service-consumption/service-consumption.module';
import { UserSecretsModule } from './user-secrets/user-secrets.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '@app/auth-utilities';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: path.join(__dirname, '../.env'),
    }),
    PrismaModule,
    EncryptionModule,
    EnvironmentsModule,
    SettingsModule,
    SettingValuesModule,
    ServiceConsumptionModule,
    UserSecretsModule,
    PassportModule.register({ defaultStrategy: 'jwt-token' }),
    JwtModule.register({}),
  ],
  providers: [JwtStrategy],
})
export class AppModule {}
