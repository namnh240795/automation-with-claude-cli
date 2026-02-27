import { Module, DynamicModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  KeycloakConnectModule,
  PolicyEnforcementMode,
  TokenValidation,
} from 'nest-keycloak-connect';
import { KeycloakService } from './keycloak.service';

/**
 * Keycloak module configuration options
 */
export interface KeycloakModuleOptions {
  authServerUrl: string;
  realm: string;
  clientId: string;
  secret: string;
  policyEnforcement?: PolicyEnforcementMode;
  tokenValidation?: TokenValidation;
}

/**
 * Async Keycloak module options
 */
export interface KeycloakModuleAsyncOptions {
  imports?: Array<DynamicModule>;
  useFactory: (
    configService: ConfigService,
  ) => Promise<KeycloakModuleOptions> | KeycloakModuleOptions;
  inject?: any[];
}

/**
 * Keycloak integration module
 * Provides OIDC authentication with Keycloak
 */
@Module({})
export class KeycloakModule {
  static registerAsync(options: KeycloakModuleAsyncOptions): DynamicModule {
    return {
      module: KeycloakModule,
      imports: [
        ...(options.imports || []),
        ConfigModule,
        KeycloakConnectModule.registerAsync({
          imports: [ConfigModule],
          useFactory: async (
            configService: ConfigService,
          ): Promise<KeycloakModuleOptions> => {
            const moduleOptions = await options.useFactory(configService);
            return {
              authServerUrl: moduleOptions.authServerUrl,
              realm: moduleOptions.realm,
              clientId: moduleOptions.clientId,
              secret: moduleOptions.secret,
              policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
              tokenValidation: TokenValidation.ONLINE,
            };
          },
          inject: options.inject || [ConfigService],
        }),
      ],
      providers: [KeycloakService],
      exports: [KeycloakService, KeycloakConnectModule],
    };
  }

  static forRoot(options: KeycloakModuleOptions): DynamicModule {
    return {
      module: KeycloakModule,
      imports: [
        KeycloakConnectModule.register({
          authServerUrl: options.authServerUrl,
          realm: options.realm,
          clientId: options.clientId,
          secret: options.secret,
          policyEnforcement: options.policyEnforcement || PolicyEnforcementMode.PERMISSIVE,
          tokenValidation: options.tokenValidation || TokenValidation.ONLINE,
        }),
      ],
      providers: [KeycloakService],
      exports: [KeycloakService, KeycloakConnectModule],
    };
  }
}
