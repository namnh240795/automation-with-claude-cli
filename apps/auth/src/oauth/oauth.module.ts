import { Module } from '@nestjs/common';
import { OAuthController } from './oauth.controller';
import { OAuthService } from './oauth.service';
import { ClientService } from './client.service';
import { AuthorizationService } from './authorization.service';
import { TokenService } from './token.service';
import { DeviceFlowService } from './device-flow.service';
import { APP_FILTER } from '@nestjs/core';
import { OAuthExceptionFilter } from './oauth.exception.filter';

@Module({
  controllers: [OAuthController],
  providers: [
    OAuthService,
    ClientService,
    AuthorizationService,
    TokenService,
    DeviceFlowService,
    {
      provide: APP_FILTER,
      useClass: OAuthExceptionFilter,
    },
  ],
  exports: [OAuthService, TokenService, ClientService],
})
export class OAuthModule {}
