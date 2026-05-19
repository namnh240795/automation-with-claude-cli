import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PermissionService } from './permission.service';

@Injectable()
export class RoleService {
  private readonly logger = new Logger(RoleService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly permissionService: PermissionService,
  ) {}

  /**
   * Create a new role with optional permissions
   */
  async create(data: {
    name: string;
    description?: string;
    permission_names?: string[];
  }) {
    // Validate name format (alphanumeric with underscores/hyphens)
    const namePattern = /^[a-zA-Z0-9_-]+$/;
    if (!namePattern.test(data.name)) {
      throw new BadRequestException(
        'Role name must be alphanumeric with underscores or hyphens',
      );
    }

    // Check for duplicate
    const existing = await this.prisma.role.findUnique({
      where: { name: data.name },
    });

    if (existing) {
      throw new ConflictException(`Role '${data.name}' already exists`);
    }

    // Resolve permission names to IDs
    let permissionIds: string[] = [];
    if (data.permission_names && data.permission_names.length > 0) {
      const permissions = await this.permissionService.getByNames(
        data.permission_names,
      );
      permissionIds = permissions.map((p) => p.id);

      if (permissionIds.length !== data.permission_names.length) {
        const found = permissions.map((p) => p.name);
        const notFound = data.permission_names.filter(
          (n) => !found.includes(n),
        );
        throw new NotFoundException(
          `Permissions not found: ${notFound.join(', ')}`,
        );
      }
    }

    const role = await this.prisma.role.create({
      data: {
        name: data.name,
        description: data.description,
        permissions: {
          create: permissionIds.map((permId) => ({
            permission_id: permId,
          })),
        },
      },
      include: {
        permissions: {
          include: {
            permission: true,
          },
        },
      },
    });

    this.logger.log(`Created role: ${data.name} with ${permissionIds.length} permissions`);
    return role;
  }

  /**
   * Update a role
   */
  async update(id: string, data: { name?: string; description?: string; is_active?: boolean }) {
    const role = await this.findById(id);

    // If changing name, check for duplicates
    if (data.name && data.name !== role.name) {
      const existing = await this.prisma.role.findUnique({
        where: { name: data.name },
      });

      if (existing) {
        throw new ConflictException(`Role '${data.name}' already exists`);
      }
    }

    const updated = await this.prisma.role.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.is_active !== undefined && { is_active: data.is_active }),
      },
      include: {
        permissions: {
          include: {
            permission: true,
          },
        },
      },
    });

    this.logger.log(`Updated role: ${updated.name}`);
    return updated;
  }

  /**
   * Find role by ID
   */
  async findById(id: string) {
    const role = await this.prisma.role.findUnique({
      where: { id },
      include: {
        permissions: {
          include: {
            permission: true,
          },
        },
      },
    });

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    return role;
  }

  /**
   * Find role by name
   */
  async findByName(name: string) {
    const role = await this.prisma.role.findUnique({
      where: { name },
      include: {
        permissions: {
          include: {
            permission: true,
          },
        },
      },
    });

    if (!role) {
      throw new NotFoundException(`Role '${name}' not found`);
    }

    return role;
  }

  /**
   * List all roles
   */
  async findAll() {
    return this.prisma.role.findMany({
      include: {
        permissions: {
          include: {
            permission: true,
          },
        },
      },
      orderBy: { name: 'asc' },
    });
  }

  /**
   * Assign permissions to a role
   */
  async assignPermissions(roleId: string, permissionNames: string[]) {
    const role = await this.findById(roleId);

    // Get permission records
    const permissions = await this.permissionService.getByNames(permissionNames);

    if (permissions.length !== permissionNames.length) {
      const found = permissions.map((p) => p.name);
      const notFound = permissionNames.filter((n) => !found.includes(n));
      throw new NotFoundException(
        `Permissions not found: ${notFound.join(', ')}`,
      );
    }

    // Add new permissions (skip existing)
    const existingPermIds = role.permissions.map((rp) => rp.permission_id);
    const newPerms = permissions.filter((p) => !existingPermIds.includes(p.id));

    if (newPerms.length > 0) {
      await this.prisma.rolePermission.createMany({
        data: newPerms.map((p) => ({
          role_id: roleId,
          permission_id: p.id,
        })),
        skipDuplicates: true,
      });
    }

    this.logger.log(
      `Assigned ${newPerms.length} new permissions to role ${role.name}`,
    );

    return this.findById(roleId);
  }

  /**
   * Remove permissions from a role
   */
  async removePermissions(roleId: string, permissionNames: string[]) {
    const permissions = await this.permissionService.getByNames(permissionNames);

    await this.prisma.rolePermission.deleteMany({
      where: {
        role_id: roleId,
        permission_id: { in: permissions.map((p) => p.id) },
      },
    });

    this.logger.log(
      `Removed ${permissions.length} permissions from role`,
    );

    return this.findById(roleId);
  }

  /**
   * Delete a role
   */
  async delete(id: string) {
    const role = await this.findById(id);

    await this.prisma.role.delete({
      where: { id: role.id },
    });

    this.logger.log(`Deleted role: ${role.name}`);
    return { message: 'Role deleted successfully' };
  }

  /**
   * Get all permissions for a role
   */
  async getPermissions(roleId: string): Promise<string[]> {
    const role = await this.findById(roleId);
    return role.permissions.map((rp) => rp.permission.name);
  }

  /**
   * Seed default roles
   */
  async seedDefaults() {
    const defaultRoles = [
      {
        name: 'admin',
        description: 'Full system administration',
        permission_names: [
          'users:admin',
          'clients:admin',
          'roles:admin',
          'serviceaccounts:admin',
          'billing:admin',
          'reports:read',
        ],
      },
      {
        name: 'developer',
        description: 'Development team access',
        permission_names: [
          'users:read',
          'users:write',
          'clients:read',
          'serviceaccounts:write',
          'reports:read',
          'reports:write',
        ],
      },
      {
        name: 'viewer',
        description: 'Read-only access',
        permission_names: [
          'users:read',
          'clients:read',
          'reports:read',
        ],
      },
      {
        name: 'billing-manager',
        description: 'Billing management access',
        permission_names: [
          'billing:read',
          'billing:write',
          'invoices:create',
          'reports:read',
        ],
      },
    ];

    const results = [];
    for (const roleData of defaultRoles) {
      try {
        await this.create(roleData);
        results.push(roleData.name);
      } catch {
        // Already exists, skip
      }
    }

    this.logger.log(`Seeded ${results.length} default roles`);
    return results;
  }
}