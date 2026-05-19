import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { hashPassword, verifyPassword } from '@app/auth-utilities';
import { randomBytes } from 'crypto';

@Injectable()
export class ClientService {
  private readonly logger = new Logger(ClientService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Register a new OAuth client application
   */
  async registerClient(data: {
    name: string;
    description?: string;
    redirect_uris: string[];
    post_logout_redirect_uris?: string[];
    scopes: string[];
    grant_types: string[];
    is_confidential?: boolean;
    require_pkce?: boolean;
    access_token_lifetime?: number;
    refresh_token_lifetime?: number;
    allowed_origins?: string[];
    logo_uri?: string;
    policy_uri?: string;
    tos_uri?: string;
  }) {
    // Generate client_id and client_secret
    const client_id = this.generateClientId();

    let client_secret: string | null = null;
    let client_secret_hash: string | null = null;

    if (data.is_confidential !== false) {
      // Confidential clients get a secret
      client_secret = this.generateClientSecret();
      client_secret_hash = hashPassword(client_secret);
    }

    // Validate grant types
    const validGrantTypes = [
      'authorization_code',
      'client_credentials',
      'refresh_token',
      'urn:ietf:params:oauth:grant-type:device_code',
    ];

    for (const grantType of data.grant_types) {
      if (!validGrantTypes.includes(grantType)) {
        throw new BadRequestException(`Invalid grant type: ${grantType}`);
      }
    }

    // Validate scopes
    const validScopes = ['openid', 'email', 'profile', 'offline_access'];
    for (const scope of data.scopes) {
      if (!validScopes.includes(scope)) {
        throw new BadRequestException(`Invalid scope: ${scope}`);
      }
    }

    // Validate redirect URIs
    this.validateRedirectUris(data.redirect_uris);

    const client = await this.prisma.oAuthClient.create({
      data: {
        client_id,
        client_secret_hash,
        name: data.name,
        description: data.description,
        redirect_uris: data.redirect_uris,
        post_logout_redirect_uris: data.post_logout_redirect_uris || [],
        scopes: data.scopes,
        grant_types: data.grant_types,
        is_confidential: data.is_confidential !== false,
        is_public_client: data.is_confidential === false,
        require_pkce: data.require_pkce ?? true,
        access_token_lifetime: data.access_token_lifetime ?? 3600,
        refresh_token_lifetime: data.refresh_token_lifetime ?? 2592000,
        allowed_origins: data.allowed_origins || [],
        logo_uri: data.logo_uri,
        policy_uri: data.policy_uri,
        tos_uri: data.tos_uri,
      },
    });

    this.logger.log(`Registered OAuth client: ${client_id} (${data.name})`);

    // Return client with secret only if confidential (will only be shown once)
    return {
      id: client.id,
      client_id: client.client_id,
      client_secret, // Only shown once during registration
      name: client.name,
      description: client.description,
      redirect_uris: client.redirect_uris,
      post_logout_redirect_uris: client.post_logout_redirect_uris,
      scopes: client.scopes,
      grant_types: client.grant_types,
      is_confidential: client.is_confidential,
      require_pkce: client.require_pkce,
      access_token_lifetime: client.access_token_lifetime,
      refresh_token_lifetime: client.refresh_token_lifetime,
      allowed_origins: client.allowed_origins,
      logo_uri: client.logo_uri,
      created_at: client.created_at,
    };
  }

  /**
   * Find client by client_id
   */
  async findByClientId(client_id: string) {
    const client = await this.prisma.oAuthClient.findUnique({
      where: { client_id },
    });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    if (!client.is_active) {
      throw new BadRequestException('Client is inactive');
    }

    return client;
  }

  /**
   * Validate client credentials
   */
  async validateClient(
    client_id: string,
    client_secret?: string,
  ): Promise<boolean> {
    try {
      const client = await this.findByClientId(client_id);

      // Public clients don't need secret
      if (client.is_public_client) {
        return true;
      }

      // Confidential clients require secret
      if (!client_secret || !client.client_secret_hash) {
        return false;
      }

      return verifyPassword(client_secret, client.client_secret_hash);
    } catch {
      return false;
    }
  }

  /**
   * Validate redirect URI
   */
  validateRedirectUri(client: any, redirect_uri: string): boolean {
    if (!client.redirect_uris.includes(redirect_uri)) {
      this.logger.warn(
        `Invalid redirect URI for client ${client.client_id}: ${redirect_uri}`,
      );
      return false;
    }
    return true;
  }

  /**
   * Validate redirect URIs format
   */
  private validateRedirectUris(uris: string[]): void {
    for (const uri of uris) {
      try {
        const url = new URL(uri);

        // Must be http or https
        if (url.protocol !== 'http:' && url.protocol !== 'https:') {
          throw new BadRequestException(
            `Invalid redirect URI protocol: ${uri}`,
          );
        }

        // HTTPS is required in production (except localhost)
        if (
          url.protocol === 'http:' &&
          url.hostname !== 'localhost' &&
          url.hostname !== '127.0.0.1'
        ) {
          this.logger.warn(
            `HTTP redirect URI detected (should use HTTPS in production): ${uri}`,
          );
        }
      } catch {
        throw new BadRequestException(`Invalid redirect URI format: ${uri}`);
      }
    }
  }

  /**
   * Check if client supports specific grant type
   */
  supportsGrantType(client: any, grant_type: string): boolean {
    return client.grant_types.includes(grant_type);
  }

  /**
   * Check if client supports specific scope
   */
  supportsScope(client: any, scope: string): boolean {
    if (!scope || scope.trim() === '') {
      return true; // Empty scope is valid
    }
    const requestedScopes = scope.split(' ').filter((s) => s.length > 0);
    return requestedScopes.every((s) => client.scopes.includes(s));
  }

  /**
   * List all clients (admin function)
   */
  async listClients() {
    return this.prisma.oAuthClient.findMany({
      select: {
        id: true,
        client_id: true,
        name: true,
        description: true,
        redirect_uris: true,
        scopes: true,
        grant_types: true,
        is_confidential: true,
        is_public_client: true,
        require_pkce: true,
        is_active: true,
        created_at: true,
        updated_at: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  /**
   * Delete a client (admin function)
   */
  async deleteClient(client_id: string) {
    const client = await this.findByClientId(client_id);

    await this.prisma.oAuthClient.delete({
      where: { id: client.id },
    });

    this.logger.log(`Deleted OAuth client: ${client_id}`);
    return { message: 'Client deleted successfully' };
  }

  /**
   * Generate a unique client_id
   */
  private generateClientId(): string {
    return randomBytes(16).toString('hex');
  }

  /**
   * Generate a client secret
   */
  private generateClientSecret(): string {
    return randomBytes(32).toString('base64url');
  }

  /**
   * Get client info for display
   */
  async getClientInfo(client_id: string) {
    const client = await this.findByClientId(client_id);

    return {
      id: client.id,
      client_id: client.client_id,
      name: client.name,
      description: client.description,
      redirect_uris: client.redirect_uris,
      post_logout_redirect_uris: client.post_logout_redirect_uris,
      scopes: client.scopes,
      grant_types: client.grant_types,
      is_confidential: client.is_confidential,
      require_pkce: client.require_pkce,
      access_token_lifetime: client.access_token_lifetime,
      refresh_token_lifetime: client.refresh_token_lifetime,
      allowed_origins: client.allowed_origins,
      logo_uri: client.logo_uri,
      policy_uri: client.policy_uri,
      tos_uri: client.tos_uri,
      is_active: client.is_active,
      created_at: client.created_at,
      updated_at: client.updated_at,
    };
  }

  // ============================================================
  // M2M RBAC METHODS - Role/Permission assignment for clients
  // ============================================================

  /**
   * Assign a role to a client (M2M RBAC)
   */
  async assignRole(client_id: string, role_name: string) {
    const client = await this.findByClientId(client_id);

    const role = await this.prisma.role.findUnique({
      where: { name: role_name },
    });

    if (!role) {
      throw new NotFoundException(`Role '${role_name}' not found`);
    }

    if (!role.is_active) {
      throw new BadRequestException(`Role '${role_name}' is inactive`);
    }

    // Check if already assigned
    const existing = await this.prisma.clientRole.findUnique({
      where: {
        client_id_role_id: {
          client_id: client.id,
          role_id: role.id,
        },
      },
    });

    if (existing) {
      return { message: 'Role already assigned', client_id, role_name };
    }

    await this.prisma.clientRole.create({
      data: {
        client_id: client.id,
        role_id: role.id,
      },
    });

    this.logger.log(`Assigned role '${role_name}' to client '${client_id}'`);
    return { message: 'Role assigned successfully', client_id, role_name };
  }

  /**
   * Remove a role from a client
   */
  async removeRole(client_id: string, role_name: string) {
    const client = await this.findByClientId(client_id);

    const role = await this.prisma.role.findUnique({
      where: { name: role_name },
    });

    if (!role) {
      throw new NotFoundException(`Role '${role_name}' not found`);
    }

    await this.prisma.clientRole.deleteMany({
      where: {
        client_id: client.id,
        role_id: role.id,
      },
    });

    this.logger.log(`Removed role '${role_name}' from client '${client_id}'`);
    return { message: 'Role removed successfully' };
  }

  /**
   * Get all roles assigned to a client
   */
  async getClientRoles(client_id: string): Promise<string[]> {
    const client = await this.findByClientId(client_id);

    const clientRoles = await this.prisma.clientRole.findMany({
      where: { client_id: client.id },
      include: { role: true },
    });

    return clientRoles
      .filter((cr) => cr.role.is_active)
      .map((cr) => cr.role.name);
  }

  /**
   * Get all permissions for a client (direct + from roles)
   */
  async getClientPermissions(client_id: string): Promise<string[]> {
    const client = await this.findByClientId(client_id);

    // Get direct permissions
    const directPermissions = client.permissions || [];

    // Get permissions from roles
    const clientRoles = await this.prisma.clientRole.findMany({
      where: { client_id: client.id },
      include: {
        role: {
          include: {
            permissions: {
              include: { permission: true },
            },
          },
        },
      },
    });

    const rolePermissions = clientRoles
      .filter((cr) => cr.role.is_active)
      .flatMap((cr) =>
        cr.role.permissions.map((rp) => rp.permission.name),
      );

    // Combine and dedupe
    const allPermissions = [...new Set([...directPermissions, ...rolePermissions])];
    return allPermissions;
  }

  /**
   * Get client with full RBAC info (roles + permissions)
   */
  async getClientWithRbac(client_id: string) {
    const client = await this.findByClientId(client_id);

    const roles = await this.getClientRoles(client_id);
    const permissions = await this.getClientPermissions(client_id);

    return {
      id: client.id,
      client_id: client.client_id,
      name: client.name,
      description: client.description,
      is_active: client.is_active,
      roles,
      permissions,
      created_at: client.created_at,
    };
  }

  /**
   * Update client RBAC settings (direct permissions)
   */
  async updateClientPermissions(client_id: string, permissions: string[]) {
    const client = await this.findByClientId(client_id);

    await this.prisma.oAuthClient.update({
      where: { id: client.id },
      data: { permissions },
    });

    this.logger.log(`Updated permissions for client '${client_id}'`);
    return this.getClientWithRbac(client_id);
  }
}
