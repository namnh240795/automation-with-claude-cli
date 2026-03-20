import { Module } from '@nestjs/common';
import { OAuthController } from './oauth.controller';
import { OAuthService } from './oauth.service';
import { ClientService } from './client.service';
import { AuthorizationService } from './authorization.service';
import { TokenService } from './token.service';
import { DeviceFlowService } from './device-flow.service';

@Module({
  controllers: [OAuthController],
  providers: [
    OAuthService,
    ClientService,
    AuthorizationService,
    TokenService,
    DeviceFlowService,
  ],
  exports: [OAuthService, TokenService, ClientService],
})
export class OAuthModule {}
