import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { KeycloakModule } from '@app/keycloak-integration';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: path.join(__dirname, '../.env'),
    }),
    PrismaModule,
    KeycloakModule.registerAsync({
      imports: [],
      useFactory: (configService: ConfigService) => ({
        authServerUrl: configService.get<string>('KEYCLOAK_SERVER_URL') || 'http://localhost:8080',
        realm: configService.get<string>('KEYCLOAK_REALM') || 'app-realm',
        clientId: configService.get<string>('KEYCLOAK_CLIENT_ID') || 'app-client',
        secret: configService.get<string>('KEYCLOAK_CLIENT_SECRET') || '',
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
