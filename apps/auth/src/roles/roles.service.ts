import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { LogActivity } from '@app/app-logger';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoleDto, UpdateRoleDto } from './dto';

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}

  @LogActivity()
  async findAll(realmId: string, page = 0, limit = 20, search?: string) {
    const skip = page * limit;

    const where: any = {
      realm: realmId,
      client_role: false, // Only return realm roles, not client roles
    };

    // Add search conditions if search is provided
    if (search) {
      where.name = {
        contains: search,
        mode: 'insensitive',
      };
    }

    const [roles, total] = await Promise.all([
      this.prisma.keycloak_role.findMany({
        where,
        skip,
        take: limit,
        orderBy: { name: 'asc' },
        select: {
          id: true,
          name: true,
          description: true,
          client_role: true,
          realm: true,
        },
      }),
      this.prisma.keycloak_role.count({ where }),
    ]);

    return {
      data: roles,
      meta: {
        total,
        page,
        limit,
        total_pages: Math.ceil(total / limit),
      },
    };
  }

  @LogActivity()
  async findOne(realmId: string, roleId: string) {
    const role = await this.prisma.keycloak_role.findFirst({
      where: {
        id: roleId,
        realm: realmId,
        client_role: false,
      },
      select: {
        id: true,
        name: true,
        description: true,
        client_role: true,
        realm: true,
      },
    });

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    return role;
  }

  @LogActivity()
  async create(realmId: string, createRoleDto: CreateRoleDto) {
    const { name, description } = createRoleDto;

    // Check if role with this name already exists in realm
    const existingRole = await this.prisma.keycloak_role.findFirst({
      where: {
        realm: realmId,
        name,
        client_role: false,
      },
    });

    if (existingRole) {
      throw new ConflictException('Role with this name already exists in this realm');
    }

    const role = await this.prisma.keycloak_role.create({
      data: {
        realm: realmId,
        name,
        description,
        client_role: false,
        client_realm_constraint: realmId,
        id: crypto.randomUUID(),
      },
      select: {
        id: true,
        name: true,
        description: true,
        client_role: true,
        realm: true,
      },
    });

    return role;
  }

  @LogActivity()
  async update(realmId: string, roleId: string, updateRoleDto: UpdateRoleDto) {
    // Check if role exists
    const existingRole = await this.prisma.keycloak_role.findFirst({
      where: {
        id: roleId,
        realm: realmId,
        client_role: false,
      },
    });

    if (!existingRole) {
      throw new NotFoundException('Role not found');
    }

    // If name is being updated, check for duplicates
    if (updateRoleDto.name && updateRoleDto.name !== existingRole.name) {
      const duplicateRole = await this.prisma.keycloak_role.findFirst({
        where: {
          realm: realmId,
          name: updateRoleDto.name,
          client_role: false,
        },
      });

      if (duplicateRole) {
        throw new ConflictException('Role with this name already exists in this realm');
      }
    }

    const role = await this.prisma.keycloak_role.updateMany({
      where: {
        id: roleId,
        realm: realmId,
      },
      data: updateRoleDto,
    });

    return this.findOne(realmId, roleId);
  }

  @LogActivity()
  async delete(realmId: string, roleId: string) {
    // Check if role exists
    const existingRole = await this.prisma.keycloak_role.findFirst({
      where: {
        id: roleId,
        realm: realmId,
        client_role: false,
      },
    });

    if (!existingRole) {
      throw new NotFoundException('Role not found');
    }

    await this.prisma.keycloak_role.deleteMany({
      where: {
        id: roleId,
        realm: realmId,
      },
    });

    return { id: roleId };
  }

  @LogActivity()
  async getComposites(realmId: string, roleId: string) {
    // Verify role exists
    const role = await this.prisma.keycloak_role.findFirst({
      where: {
        id: roleId,
        realm: realmId,
        client_role: false,
      },
    });

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    const composites = await this.prisma.composite_role.findMany({
      where: {
        composite: roleId,
      },
      select: {
        child_role: true,
      },
    });

    return composites.map((c) => ({ id: c.child_role }));
  }

  @LogActivity()
  async addComposites(realmId: string, roleId: string, compositeRoleIds: string[]) {
    // Verify role exists
    const role = await this.prisma.keycloak_role.findFirst({
      where: {
        id: roleId,
        realm: realmId,
        client_role: false,
      },
    });

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    // Add composite role mappings
    const data = compositeRoleIds.map((child_role) => ({
      composite: roleId,
      child_role,
    }));

    await this.prisma.composite_role.createMany({
      data,
      skipDuplicates: true,
    });

    return this.getComposites(realmId, roleId);
  }

  @LogActivity()
  async removeComposite(realmId: string, roleId: string, compositeId: string) {
    // Verify role exists
    const role = await this.prisma.keycloak_role.findFirst({
      where: {
        id: roleId,
        realm: realmId,
        client_role: false,
      },
    });

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    await this.prisma.composite_role.deleteMany({
      where: {
        composite: roleId,
        child_role: compositeId,
      },
    });

    return { removed: compositeId };
  }

  @LogActivity()
  async getUsers(realmId: string, roleId: string) {
    // Verify role exists
    const role = await this.prisma.keycloak_role.findFirst({
      where: {
        id: roleId,
        realm: realmId,
        client_role: false,
      },
    });

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    const roleMappings = await this.prisma.user_role_mapping.findMany({
      where: {
        role_id: roleId,
      },
      select: {
        user_id: true,
      },
    });

    return roleMappings.map((mapping) => ({ id: mapping.user_id }));
  }

  @LogActivity()
  async addUser(realmId: string, roleId: string, userId: string) {
    // Verify role exists
    const role = await this.prisma.keycloak_role.findFirst({
      where: {
        id: roleId,
        realm: realmId,
        client_role: false,
      },
    });

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    // Verify user exists in realm
    const user = await this.prisma.user_entity.findFirst({
      where: {
        id: userId,
        realm_id: realmId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found in this realm');
    }

    // Add role mapping
    await this.prisma.user_role_mapping.create({
      data: {
        user_id: userId,
        role_id: roleId,
      },
    });

    return this.getUsers(realmId, roleId);
  }

  @LogActivity()
  async removeUser(realmId: string, roleId: string, userId: string) {
    // Verify role exists
    const role = await this.prisma.keycloak_role.findFirst({
      where: {
        id: roleId,
        realm: realmId,
        client_role: false,
      },
    });

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    await this.prisma.user_role_mapping.deleteMany({
      where: {
        user_id: userId,
        role_id: roleId,
      },
    });

    return { removed: userId };
  }
}
