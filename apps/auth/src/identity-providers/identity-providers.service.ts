import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LogActivity } from '@app/app-logger';
import {
  CreateIdentityProviderDto,
  UpdateIdentityProviderDto,
  CreateIdentityProviderMapperDto,
  UpdateIdentityProviderMapperDto,
  IdentityProviderResponseDto,
  IdentityProvidersPaginatedResponseDto,
  IdentityProviderMapperResponseDto,
  IdentityProviderMappersPaginatedResponseDto,
  FederatedIdentityResponseDto,
  FederatedIdentitiesListResponseDto,
} from './dto';

@Injectable()
export class IdentityProvidersService {
  constructor(private readonly prisma: PrismaService) {}

  // ==================== Identity Providers ====================

  @LogActivity()
  async getRealmProviders(
    realmId: string,
    page: number = 0,
    limit: number = 20,
  ): Promise<IdentityProvidersPaginatedResponseDto> {
    const [providers, total] = await Promise.all([
      this.prisma.identity_provider.findMany({
        where: { realm_id: realmId },
        skip: page * limit,
        take: limit,
        orderBy: { provider_alias: 'asc' },
      }),
      this.prisma.identity_provider.count({
        where: { realm_id: realmId },
      }),
    ]);

    // Fetch config for each provider
    const providersWithConfig = await Promise.all(
      providers.map(async (provider) => {
        const configs = await this.prisma.identity_provider_config.findMany({
          where: { identity_provider_id: provider.internal_id },
        });

        const configObj: Record<string, string> = {};
        configs.forEach((config) => {
          if (config.value) {
            configObj[config.name] = config.value;
          }
        });

        return {
          internal_id: provider.internal_id,
          provider_alias: provider.provider_alias,
          provider_id: provider.provider_id,
          provider_display_name: provider.provider_display_name,
          realm_id: provider.realm_id,
          enabled: provider.enabled,
          store_token: provider.store_token,
          authenticate_by_default: provider.authenticate_by_default,
          add_token_role: provider.add_token_role,
          trust_email: provider.trust_email,
          link_only: provider.link_only,
          hide_on_login: provider.hide_on_login,
          organization_id: provider.organization_id,
          first_broker_login_flow_id: provider.first_broker_login_flow_id,
          post_broker_login_flow_id: provider.post_broker_login_flow_id,
          config: configObj,
        };
      }),
    );

    return {
      providers: providersWithConfig,
      total,
    };
  }

  @LogActivity()
  async getProvider(internalId: string): Promise<IdentityProviderResponseDto> {
    const provider = await this.prisma.identity_provider.findUnique({
      where: { internal_id: internalId },
    });

    if (!provider) {
      throw new NotFoundException('Identity provider not found');
    }

    // Fetch config
    const configs = await this.prisma.identity_provider_config.findMany({
      where: { identity_provider_id: provider.internal_id },
    });

    const configObj: Record<string, string> = {};
    configs.forEach((config) => {
      if (config.value) {
        configObj[config.name] = config.value;
      }
    });

    return {
      internal_id: provider.internal_id,
      provider_alias: provider.provider_alias,
      provider_id: provider.provider_id,
      provider_display_name: provider.provider_display_name,
      realm_id: provider.realm_id,
      enabled: provider.enabled,
      store_token: provider.store_token,
      authenticate_by_default: provider.authenticate_by_default,
      add_token_role: provider.add_token_role,
      trust_email: provider.trust_email,
      link_only: provider.link_only,
      hide_on_login: provider.hide_on_login,
      organization_id: provider.organization_id,
      first_broker_login_flow_id: provider.first_broker_login_flow_id,
      post_broker_login_flow_id: provider.post_broker_login_flow_id,
      config: configObj,
    };
  }

  @LogActivity()
  async createProvider(
    realmId: string,
    createProviderDto: CreateIdentityProviderDto,
  ): Promise<IdentityProviderResponseDto> {
    // Check if provider with alias already exists
    const existingProvider = await this.prisma.identity_provider.findFirst({
      where: {
        realm_id: realmId,
        provider_alias: createProviderDto.provider_alias,
      },
    });

    if (existingProvider) {
      throw new ConflictException('Identity provider with this alias already exists');
    }

    const providerId = crypto.randomUUID();

    const provider = await this.prisma.identity_provider.create({
      data: {
        internal_id: providerId,
        provider_alias: createProviderDto.provider_alias,
        provider_id: createProviderDto.provider_id,
        provider_display_name: createProviderDto.provider_display_name,
        realm_id: realmId,
        enabled: createProviderDto.enabled ?? false,
        store_token: createProviderDto.store_token ?? false,
        authenticate_by_default: createProviderDto.authenticate_by_default ?? false,
        add_token_role: createProviderDto.add_token_role ?? true,
        trust_email: createProviderDto.trust_email ?? false,
        link_only: createProviderDto.link_only ?? false,
        hide_on_login: createProviderDto.hide_on_login ?? false,
        organization_id: createProviderDto.organization_id,
        first_broker_login_flow_id: createProviderDto.first_broker_login_flow_id,
        post_broker_login_flow_id: createProviderDto.post_broker_login_flow_id,
      },
    });

    // Create config entries if provided
    if (createProviderDto.config && Object.keys(createProviderDto.config).length > 0) {
      const entries = Object.entries(createProviderDto.config).map(([name, value]) => ({
        identity_provider_id: providerId,
        name,
        value,
      }));

      await this.prisma.identity_provider_config.createMany({
        data: entries,
      });
    }

    return {
      internal_id: provider.internal_id,
      provider_alias: provider.provider_alias,
      provider_id: provider.provider_id,
      provider_display_name: provider.provider_display_name,
      realm_id: provider.realm_id,
      enabled: provider.enabled,
      store_token: provider.store_token,
      authenticate_by_default: provider.authenticate_by_default,
      add_token_role: provider.add_token_role,
      trust_email: provider.trust_email,
      link_only: provider.link_only,
      hide_on_login: provider.hide_on_login,
      organization_id: provider.organization_id,
      first_broker_login_flow_id: provider.first_broker_login_flow_id,
      post_broker_login_flow_id: provider.post_broker_login_flow_id,
      config: createProviderDto.config,
    };
  }

  @LogActivity()
  async updateProvider(
    internalId: string,
    updateProviderDto: UpdateIdentityProviderDto,
  ): Promise<IdentityProviderResponseDto> {
    const provider = await this.prisma.identity_provider.findUnique({
      where: { internal_id: internalId },
    });

    if (!provider) {
      throw new NotFoundException('Identity provider not found');
    }

    // Update provider
    const updatedProvider = await this.prisma.identity_provider.update({
      where: { internal_id: internalId },
      data: {
        ...(updateProviderDto.provider_display_name !== undefined && {
          provider_display_name: updateProviderDto.provider_display_name,
        }),
        ...(updateProviderDto.enabled !== undefined && { enabled: updateProviderDto.enabled }),
        ...(updateProviderDto.store_token !== undefined && { store_token: updateProviderDto.store_token }),
        ...(updateProviderDto.authenticate_by_default !== undefined && {
          authenticate_by_default: updateProviderDto.authenticate_by_default,
        }),
        ...(updateProviderDto.add_token_role !== undefined && { add_token_role: updateProviderDto.add_token_role }),
        ...(updateProviderDto.trust_email !== undefined && { trust_email: updateProviderDto.trust_email }),
        ...(updateProviderDto.link_only !== undefined && { link_only: updateProviderDto.link_only }),
        ...(updateProviderDto.hide_on_login !== undefined && { hide_on_login: updateProviderDto.hide_on_login }),
        ...(updateProviderDto.organization_id !== undefined && { organization_id: updateProviderDto.organization_id }),
        ...(updateProviderDto.first_broker_login_flow_id !== undefined && {
          first_broker_login_flow_id: updateProviderDto.first_broker_login_flow_id,
        }),
        ...(updateProviderDto.post_broker_login_flow_id !== undefined && {
          post_broker_login_flow_id: updateProviderDto.post_broker_login_flow_id,
        }),
      },
    });

    // Update config entries if provided
    let configObj: Record<string, string> = {};
    if (updateProviderDto.config) {
      // Delete existing entries
      await this.prisma.identity_provider_config.deleteMany({
        where: { identity_provider_id: internalId },
      });

      // Create new entries
      const entries = Object.entries(updateProviderDto.config).map(([name, value]) => ({
        identity_provider_id: internalId,
        name,
        value,
      }));

      await this.prisma.identity_provider_config.createMany({
        data: entries,
      });

      configObj = updateProviderDto.config;
    } else {
      // Fetch existing entries
      const configs = await this.prisma.identity_provider_config.findMany({
        where: { identity_provider_id: internalId },
      });

      configs.forEach((config) => {
        if (config.value) {
          configObj[config.name] = config.value;
        }
      });
    }

    return {
      internal_id: updatedProvider.internal_id,
      provider_alias: updatedProvider.provider_alias,
      provider_id: updatedProvider.provider_id,
      provider_display_name: updatedProvider.provider_display_name,
      realm_id: updatedProvider.realm_id,
      enabled: updatedProvider.enabled,
      store_token: updatedProvider.store_token,
      authenticate_by_default: updatedProvider.authenticate_by_default,
      add_token_role: updatedProvider.add_token_role,
      trust_email: updatedProvider.trust_email,
      link_only: updatedProvider.link_only,
      hide_on_login: updatedProvider.hide_on_login,
      organization_id: updatedProvider.organization_id,
      first_broker_login_flow_id: updatedProvider.first_broker_login_flow_id,
      post_broker_login_flow_id: updatedProvider.post_broker_login_flow_id,
      config: configObj,
    };
  }

  @LogActivity()
  async deleteProvider(internalId: string): Promise<void> {
    const provider = await this.prisma.identity_provider.findUnique({
      where: { internal_id: internalId },
    });

    if (!provider) {
      throw new NotFoundException('Identity provider not found');
    }

    // Delete config entries first
    await this.prisma.identity_provider_config.deleteMany({
      where: { identity_provider_id: internalId },
    });

    // Delete federated identities linked to this provider
    await this.prisma.federated_identity.deleteMany({
      where: { identity_provider: provider.provider_id },
    });

    // Delete the provider
    await this.prisma.identity_provider.delete({
      where: { internal_id: internalId },
    });
  }

  // ==================== Identity Provider Mappers ====================

  @LogActivity()
  async getProviderMappers(
    realmId: string,
    page: number = 0,
    limit: number = 20,
  ): Promise<IdentityProviderMappersPaginatedResponseDto> {
    const [mappers, total] = await Promise.all([
      this.prisma.identity_provider_mapper.findMany({
        where: { realm_id: realmId },
        skip: page * limit,
        take: limit,
        orderBy: { name: 'asc' },
      }),
      this.prisma.identity_provider_mapper.count({
        where: { realm_id: realmId },
      }),
    ]);

    // Fetch config for each mapper
    const mappersWithConfig = await Promise.all(
      mappers.map(async (mapper) => {
        const configs = await this.prisma.idp_mapper_config.findMany({
          where: { idp_mapper_id: mapper.id },
        });

        const configObj: Record<string, string> = {};
        configs.forEach((config) => {
          if (config.value) {
            configObj[config.name] = config.value;
          }
        });

        return {
          id: mapper.id,
          name: mapper.name,
          idp_alias: mapper.idp_alias,
          idp_mapper_name: mapper.idp_mapper_name,
          realm_id: mapper.realm_id,
          config: configObj,
        };
      }),
    );

    return {
      mappers: mappersWithConfig,
      total,
    };
  }

  @LogActivity()
  async getMappersForProvider(
    idpAlias: string,
    realmId: string,
  ): Promise<IdentityProviderMappersPaginatedResponseDto> {
    const mappers = await this.prisma.identity_provider_mapper.findMany({
      where: {
        realm_id: realmId,
        idp_alias: idpAlias,
      },
      orderBy: { name: 'asc' },
    });

    // Fetch config for each mapper
    const mappersWithConfig = await Promise.all(
      mappers.map(async (mapper) => {
        const configs = await this.prisma.idp_mapper_config.findMany({
          where: { idp_mapper_id: mapper.id },
        });

        const configObj: Record<string, string> = {};
        configs.forEach((config) => {
          if (config.value) {
            configObj[config.name] = config.value;
          }
        });

        return {
          id: mapper.id,
          name: mapper.name,
          idp_alias: mapper.idp_alias,
          idp_mapper_name: mapper.idp_mapper_name,
          realm_id: mapper.realm_id,
          config: configObj,
        };
      }),
    );

    return {
      mappers: mappersWithConfig,
      total: mappers.length,
    };
  }

  @LogActivity()
  async createMapper(
    realmId: string,
    createMapperDto: CreateIdentityProviderMapperDto,
  ): Promise<IdentityProviderMapperResponseDto> {
    const mapperId = crypto.randomUUID();

    const mapper = await this.prisma.identity_provider_mapper.create({
      data: {
        id: mapperId,
        name: createMapperDto.name,
        idp_alias: createMapperDto.idp_alias,
        idp_mapper_name: createMapperDto.idp_mapper_name,
        realm_id: realmId,
      },
    });

    // Create config entries if provided
    if (createMapperDto.config && Object.keys(createMapperDto.config).length > 0) {
      const entries = Object.entries(createMapperDto.config).map(([name, value]) => ({
        idp_mapper_id: mapperId,
        name,
        value,
      }));

      await this.prisma.idp_mapper_config.createMany({
        data: entries,
      });
    }

    return {
      id: mapper.id,
      name: mapper.name,
      idp_alias: mapper.idp_alias,
      idp_mapper_name: mapper.idp_mapper_name,
      realm_id: mapper.realm_id,
      config: createMapperDto.config,
    };
  }

  @LogActivity()
  async updateMapper(
    mapperId: string,
    updateMapperDto: UpdateIdentityProviderMapperDto,
  ): Promise<IdentityProviderMapperResponseDto> {
    const mapper = await this.prisma.identity_provider_mapper.findUnique({
      where: { id: mapperId },
    });

    if (!mapper) {
      throw new NotFoundException('Identity provider mapper not found');
    }

    // Update mapper
    const updatedMapper = await this.prisma.identity_provider_mapper.update({
      where: { id: mapperId },
      data: {
        ...(updateMapperDto.name !== undefined && { name: updateMapperDto.name }),
        ...(updateMapperDto.idp_mapper_name !== undefined && { idp_mapper_name: updateMapperDto.idp_mapper_name }),
      },
    });

    // Update config entries if provided
    let configObj: Record<string, string> = {};
    if (updateMapperDto.config) {
      // Delete existing entries
      await this.prisma.idp_mapper_config.deleteMany({
        where: { idp_mapper_id: mapperId },
      });

      // Create new entries
      const entries = Object.entries(updateMapperDto.config).map(([name, value]) => ({
        idp_mapper_id: mapperId,
        name,
        value,
      }));

      await this.prisma.idp_mapper_config.createMany({
        data: entries,
      });

      configObj = updateMapperDto.config;
    } else {
      // Fetch existing entries
      const configs = await this.prisma.idp_mapper_config.findMany({
        where: { idp_mapper_id: mapperId },
      });

      configs.forEach((config) => {
        if (config.value) {
          configObj[config.name] = config.value;
        }
      });
    }

    return {
      id: updatedMapper.id,
      name: updatedMapper.name,
      idp_alias: updatedMapper.idp_alias,
      idp_mapper_name: updatedMapper.idp_mapper_name,
      realm_id: updatedMapper.realm_id,
      config: configObj,
    };
  }

  @LogActivity()
  async deleteMapper(mapperId: string): Promise<void> {
    const mapper = await this.prisma.identity_provider_mapper.findUnique({
      where: { id: mapperId },
    });

    if (!mapper) {
      throw new NotFoundException('Identity provider mapper not found');
    }

    // Delete config entries first
    await this.prisma.idp_mapper_config.deleteMany({
      where: { idp_mapper_id: mapperId },
    });

    // Delete mapper
    await this.prisma.identity_provider_mapper.delete({
      where: { id: mapperId },
    });
  }

  // ==================== Federated Identities ====================

  @LogActivity()
  async getUserFederatedIdentities(
    userId: string,
  ): Promise<FederatedIdentitiesListResponseDto> {
    const identities = await this.prisma.federated_identity.findMany({
      where: { user_id: userId },
    });

    return {
      identities: identities.map((identity) => ({
        identity_provider: identity.identity_provider,
        realm_id: identity.realm_id,
        federated_user_id: identity.federated_user_id,
        federated_username: identity.federated_username,
        user_id: identity.user_id,
        token: identity.token,
      })),
      total: identities.length,
    };
  }

  @LogActivity()
  async deleteFederatedIdentity(
    userId: string,
    identityProvider: string,
  ): Promise<void> {
    const identity = await this.prisma.federated_identity.findUnique({
      where: {
        identity_provider_user_id: {
          identity_provider: identityProvider,
          user_id: userId,
        },
      },
    });

    if (!identity) {
      throw new NotFoundException('Federated identity not found');
    }

    await this.prisma.federated_identity.delete({
      where: {
        identity_provider_user_id: {
          identity_provider: identityProvider,
          user_id: userId,
        },
      },
    });
  }
}
