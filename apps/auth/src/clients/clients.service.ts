import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { LogActivity } from '@app/app-logger';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClientDto, UpdateClientDto } from './dto';

@Injectable()
export class ClientsService {
  constructor(private readonly prisma: PrismaService) {}

  @LogActivity()
  async findAll(realmId: string, page = 0, limit = 20, search?: string) {
    const skip = page * limit;

    const where: any = {
      realm_id: realmId,
    };

    // Add search conditions if search is provided
    if (search) {
      where.OR = [
        { client_id: { contains: search, mode: 'insensitive' } },
        { name: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [clients, total] = await Promise.all([
      this.prisma.client.findMany({
        where,
        skip,
        take: limit,
        orderBy: { client_id: 'asc' },
        select: {
          id: true,
          client_id: true,
          name: true,
          description: true,
          enabled: true,
          public_client: true,
          standard_flow_enabled: true,
          implicit_flow_enabled: true,
          direct_access_grants_enabled: true,
          service_accounts_enabled: true,
          consent_required: true,
          bearer_only: true,
        },
      }),
      this.prisma.client.count({ where }),
    ]);

    return {
      data: clients,
      meta: {
        total,
        page,
        limit,
        total_pages: Math.ceil(total / limit),
      },
    };
  }

  @LogActivity()
  async findOne(realmId: string, clientId: string) {
    const client = await this.prisma.client.findFirst({
      where: {
        id: clientId,
        realm_id: realmId,
      },
      select: {
        id: true,
        client_id: true,
        name: true,
        description: true,
        enabled: true,
        public_client: true,
        standard_flow_enabled: true,
        implicit_flow_enabled: true,
        direct_access_grants_enabled: true,
        service_accounts_enabled: true,
        consent_required: true,
        bearer_only: true,
        base_url: true,
        root_url: true,
        management_url: true,
        web_origins: true,
        redirect_uris: true,
        protocol: true,
      },
    });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    return client;
  }

  @LogActivity()
  async create(realmId: string, createClientDto: CreateClientDto) {
    const { client_id, redirect_uris, web_origins, ...data } = createClientDto;

    // Check if client with this client_id already exists in realm
    const existingClient = await this.prisma.client.findFirst({
      where: {
        realm_id: realmId,
        client_id,
      },
    });

    if (existingClient) {
      throw new ConflictException('Client with this client_id already exists in this realm');
    }

    const client = await this.prisma.client.create({
      data: {
        realm_id: realmId,
        client_id,
        ...data,
        id: crypto.randomUUID(),
        redirect_uris: redirect_uris
          ? {
              create: redirect_uris.map((value) => ({ value })),
            }
          : undefined,
        web_origins: web_origins
          ? {
              create: web_origins.map((value) => ({ value })),
            }
          : undefined,
      },
      select: {
        id: true,
        client_id: true,
        name: true,
        description: true,
        enabled: true,
        public_client: true,
        standard_flow_enabled: true,
        implicit_flow_enabled: true,
        direct_access_grants_enabled: true,
        service_accounts_enabled: true,
        consent_required: true,
        bearer_only: true,
      },
    });

    return client;
  }

  @LogActivity()
  async update(realmId: string, clientId: string, updateClientDto: UpdateClientDto) {
    // Check if client exists
    const existingClient = await this.prisma.client.findFirst({
      where: {
        id: clientId,
        realm_id: realmId,
      },
    });

    if (!existingClient) {
      throw new NotFoundException('Client not found');
    }

    // If client_id is being updated, check for duplicates
    if (updateClientDto.client_id && updateClientDto.client_id !== existingClient.client_id) {
      const duplicateClient = await this.prisma.client.findFirst({
        where: {
          realm_id: realmId,
          client_id: updateClientDto.client_id,
        },
      });

      if (duplicateClient) {
        throw new ConflictException('Client with this client_id already exists in this realm');
      }
    }

    const { redirect_uris, web_origins, ...data } = updateClientDto;

    // Update client
    await this.prisma.client.update({
      where: { id: clientId },
      data: {
        ...data,
        redirect_uris: redirect_uris
          ? {
              deleteMany: {},
              create: redirect_uris.map((value) => ({ value })),
            }
          : undefined,
        web_origins: web_origins
          ? {
              deleteMany: {},
              create: web_origins.map((value) => ({ value })),
            }
          : undefined,
      },
    });

    return this.findOne(realmId, clientId);
  }

  @LogActivity()
  async delete(realmId: string, clientId: string) {
    // Check if client exists
    const existingClient = await this.prisma.client.findFirst({
      where: {
        id: clientId,
        realm_id: realmId,
      },
    });

    if (!existingClient) {
      throw new NotFoundException('Client not found');
    }

    await this.prisma.client.deleteMany({
      where: {
        id: clientId,
      },
    });

    return { id: clientId };
  }

  @LogActivity()
  async getRedirectUris(realmId: string, clientId: string) {
    // Verify client exists
    const client = await this.prisma.client.findFirst({
      where: {
        id: clientId,
        realm_id: realmId,
      },
    });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    const redirectUris = await this.prisma.redirect_uris.findMany({
      where: { client_id: clientId },
      select: {
        value: true,
      },
    });

    return redirectUris.map((uri) => uri.value);
  }

  @LogActivity()
  async addRedirectUri(realmId: string, clientId: string, uri: string) {
    // Verify client exists
    const client = await this.prisma.client.findFirst({
      where: {
        id: clientId,
        realm_id: realmId,
      },
    });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    await this.prisma.redirect_uris.create({
      data: {
        client_id: clientId,
        value: uri,
      },
    });

    return this.getRedirectUris(realmId, clientId);
  }

  @LogActivity()
  async removeRedirectUri(realmId: string, clientId: string, uri: string) {
    // Verify client exists
    const client = await this.prisma.client.findFirst({
      where: {
        id: clientId,
        realm_id: realmId,
      },
    });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    await this.prisma.redirect_uris.deleteMany({
      where: {
        client_id: clientId,
        value: uri,
      },
    });

    return { removed: uri };
  }

  @LogActivity()
  async getSecret(realmId: string, clientId: string) {
    const client = await this.prisma.client.findFirst({
      where: {
        id: clientId,
        realm_id: realmId,
      },
      select: {
        id: true,
        client_id: true,
        secret: true,
        public_client: true,
      },
    });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    return {
      id: client.id,
      client_id: client.client_id,
      secret: client.secret,
      public_client: client.public_client,
    };
  }

  @LogActivity()
  async regenerateSecret(realmId: string, clientId: string) {
    const client = await this.prisma.client.findFirst({
      where: {
        id: clientId,
        realm_id: realmId,
      },
    });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    if (client.public_client) {
      throw new ConflictException('Cannot regenerate secret for public client');
    }

    const newSecret = this.generateSecret();

    await this.prisma.client.update({
      where: { id: clientId },
      data: {
        secret: newSecret,
      },
    });

    return this.getSecret(realmId, clientId);
  }

  private generateSecret(): string {
    // Generate a random secret
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let secret = '';
    for (let i = 0; i < 64; i++) {
      secret += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return secret;
  }
}
