import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PermissionService {
  private readonly logger = new Logger(PermissionService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create a new permission
   */
  async create(data: {
    name: string;
    description?: string;
    resource: string;
    action: string;
  }) {
    // Validate name format: resource:action
    const namePattern = /^[^:]+:[^:]+$/;
    if (!namePattern.test(data.name)) {
      throw new BadRequestException(
        'Permission name must be in format: resource:action (e.g., users:read)',
      );
    }

    // Check for duplicate
    const existing = await this.prisma.permission.findUnique({
      where: { name: data.name },
    });

    if (existing) {
      throw new ConflictException(`Permission '${data.name}' already exists`);
    }

    const permission = await this.prisma.permission.create({
      data: {
        name: data.name,
        description: data.description,
        resource: data.resource,
        action: data.action,
      },
    });

    this.logger.log(`Created permission: ${data.name}`);
    return permission;
  }

  /**
   * Create multiple permissions at once
   */
  async createMany(permissions: Array<{
    name: string;
    description?: string;
    resource: string;
    action: string;
  }>) {
    const results = [];
    const errors = [];

    for (const perm of permissions) {
      try {
        const result = await this.create(perm);
        results.push(result);
      } catch (error) {
        errors.push({ name: perm.name, error: error.message });
      }
    }

    return { created: results, errors };
  }

  /**
   * Find permission by ID
   */
  async findById(id: string) {
    const permission = await this.prisma.permission.findUnique({
      where: { id },
    });

    if (!permission) {
      throw new NotFoundException('Permission not found');
    }

    return permission;
  }

  /**
   * Find permission by name
   */
  async findByName(name: string) {
    const permission = await this.prisma.permission.findUnique({
      where: { name },
    });

    if (!permission) {
      throw new NotFoundException(`Permission '${name}' not found`);
    }

    return permission;
  }

  /**
   * List all permissions
   */
  async findAll() {
    return this.prisma.permission.findMany({
      orderBy: { name: 'asc' },
    });
  }

  /**
   * List permissions by resource
   */
  async findByResource(resource: string) {
    return this.prisma.permission.findMany({
      where: { resource },
      orderBy: { action: 'asc' },
    });
  }

  /**
   * Get permissions by names
   */
  async getByNames(names: string[]) {
    return this.prisma.permission.findMany({
      where: { name: { in: names } },
    });
  }

  /**
   * Delete a permission
   */
  async delete(id: string) {
    const permission = await this.findById(id);

    await this.prisma.permission.delete({
      where: { id: permission.id },
    });

    this.logger.log(`Deleted permission: ${permission.name}`);
    return { message: 'Permission deleted successfully' };
  }

  /**
   * Seed default permissions for common resources
   */
  async seedDefaults() {
    const defaultPermissions = [
      // User management
      { resource: 'users', action: 'read', description: 'Read user data' },
      { resource: 'users', action: 'write', description: 'Create/update users' },
      { resource: 'users', action: 'delete', description: 'Delete users' },
      { resource: 'users', action: 'admin', description: 'Full user administration' },

      // Client management
      { resource: 'clients', action: 'read', description: 'Read OAuth clients' },
      { resource: 'clients', action: 'write', description: 'Create/update clients' },
      { resource: 'clients', action: 'delete', description: 'Delete clients' },
      { resource: 'clients', action: 'admin', description: 'Full client administration' },

      // Role management
      { resource: 'roles', action: 'read', description: 'Read roles' },
      { resource: 'roles', action: 'write', description: 'Create/update roles' },
      { resource: 'roles', action: 'delete', description: 'Delete roles' },
      { resource: 'roles', action: 'admin', description: 'Full role administration' },

      // Billing
      { resource: 'billing', action: 'read', description: 'Read billing data' },
      { resource: 'billing', action: 'write', description: 'Create/update billing' },
      { resource: 'billing', action: 'admin', description: 'Full billing administration' },

      // Reports
      { resource: 'reports', action: 'read', description: 'Read reports' },
      { resource: 'reports', action: 'write', description: 'Create reports' },
      { resource: 'reports', action: 'delete', description: 'Delete reports' },

      // Service accounts (M2M)
      { resource: 'serviceaccounts', action: 'read', description: 'Read service accounts' },
      { resource: 'serviceaccounts', action: 'write', description: 'Create/update service accounts' },
      { resource: 'serviceaccounts', action: 'delete', description: 'Delete service accounts' },
      { resource: 'serviceaccounts', action: 'admin', description: 'Full service account administration' },
    ];

    const results = [];
    for (const perm of defaultPermissions) {
      try {
        await this.create({
          name: `${perm.resource}:${perm.action}`,
          description: perm.description,
          resource: perm.resource,
          action: perm.action,
        });
        results.push(`${perm.resource}:${perm.action}`);
      } catch {
        // Already exists, skip
      }
    }

    this.logger.log(`Seeded ${results.length} default permissions`);
    return results;
  }
}