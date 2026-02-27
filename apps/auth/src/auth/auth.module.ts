import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { KeycloakModule } from '@app/keycloak-integration';
import { SocialLoginController } from './social/social-login.controller';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
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
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'your-jwt-secret-key-change-this',
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN') || '1h',
        } as any,
      }),
    }),
  ],
  controllers: [AuthController, SocialLoginController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
