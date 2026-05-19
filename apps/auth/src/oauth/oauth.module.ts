import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { JwtStrategy } from '@app/auth-utilities';
import { OAuthController } from './oauth.controller';
import { OAuthAdminController } from './oauth-admin.controller';
import { OAuthService } from './oauth.service';
import { ClientService } from './client.service';
import { AuthorizationService } from './authorization.service';
import { TokenService } from './token.service';
import { DeviceFlowService } from './device-flow.service';
import { PermissionService } from './permission.service';
import { RoleService } from './role.service';
import { OAuthExceptionFilter } from './oauth.exception.filter';

@Module({
  controllers: [OAuthController, OAuthAdminController],
  providers: [
    OAuthService,
    ClientService,
    AuthorizationService,
    TokenService,
    DeviceFlowService,
    PermissionService,
    RoleService,
    JwtStrategy,
    {
      provide: APP_FILTER,
      useClass: OAuthExceptionFilter,
    },
  ],
  exports: [OAuthService, TokenService, ClientService, PermissionService, RoleService],
})
export class OAuthModule {}
