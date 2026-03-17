import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { LogActivity } from '@app/app-logger';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGroupDto, UpdateGroupDto } from './dto';

@Injectable()
export class GroupsService {
  constructor(private readonly prisma: PrismaService) {}

  @LogActivity()
  async findAll(realmId: string, page = 0, limit = 20, search?: string, parentId?: string) {
    const skip = page * limit;

    const where: any = {
      realm_id: realmId,
    };

    // Filter by parent group if provided
    if (parentId !== undefined) {
      where.parent_group = parentId;
    }

    // Add search conditions if search is provided
    if (search) {
      where.name = {
        contains: search,
        mode: 'insensitive',
      };
    }

    const [groups, total] = await Promise.all([
      this.prisma.keycloak_group.findMany({
        where,
        skip,
        take: limit,
        orderBy: { name: 'asc' },
        select: {
          id: true,
          name: true,
          parent_group: true,
          realm_id: true,
          type: true,
        },
      }),
      this.prisma.keycloak_group.count({ where }),
    ]);

    return {
      data: groups,
      meta: {
        total,
        page,
        limit,
        total_pages: Math.ceil(total / limit),
      },
    };
  }

  @LogActivity()
  async findOne(realmId: string, groupId: string) {
    const group = await this.prisma.keycloak_group.findFirst({
      where: {
        id: groupId,
        realm_id: realmId,
      },
      select: {
        id: true,
        name: true,
        parent_group: true,
        realm_id: true,
        type: true,
      },
    });

    if (!group) {
      throw new NotFoundException('Group not found');
    }

    return group;
  }

  @LogActivity()
  async create(realmId: string, createGroupDto: CreateGroupDto) {
    const { name, parent_id } = createGroupDto;

    // Check if group with this name already exists in realm with same parent
    const existingGroup = await this.prisma.keycloak_group.findFirst({
      where: {
        realm_id: realmId,
        parent_group: parent_id || realmId,
        name,
      },
    });

    if (existingGroup) {
      throw new ConflictException('Group with this name already exists in this context');
    }

    const group = await this.prisma.keycloak_group.create({
      data: {
        realm_id: realmId,
        name,
        parent_group: parent_id || realmId,
        id: crypto.randomUUID(),
      },
      select: {
        id: true,
        name: true,
        parent_group: true,
        realm_id: true,
        type: true,
      },
    });

    return group;
  }

  @LogActivity()
  async update(realmId: string, groupId: string, updateGroupDto: UpdateGroupDto) {
    // Check if group exists
    const existingGroup = await this.prisma.keycloak_group.findFirst({
      where: {
        id: groupId,
        realm_id: realmId,
      },
    });

    if (!existingGroup) {
      throw new NotFoundException('Group not found');
    }

    // If name is being updated, check for duplicates
    if (updateGroupDto.name && updateGroupDto.name !== existingGroup.name) {
      const duplicateGroup = await this.prisma.keycloak_group.findFirst({
        where: {
          realm_id: realmId,
          parent_group: existingGroup.parent_group,
          name: updateGroupDto.name,
        },
      });

      if (duplicateGroup) {
        throw new ConflictException('Group with this name already exists in this context');
      }
    }

    const group = await this.prisma.keycloak_group.updateMany({
      where: {
        id: groupId,
      },
      data: updateGroupDto,
    });

    return this.findOne(realmId, groupId);
  }

  @LogActivity()
  async delete(realmId: string, groupId: string) {
    // Check if group exists
    const existingGroup = await this.prisma.keycloak_group.findFirst({
      where: {
        id: groupId,
        realm_id: realmId,
      },
    });

    if (!existingGroup) {
      throw new NotFoundException('Group not found');
    }

    await this.prisma.keycloak_group.deleteMany({
      where: {
        id: groupId,
      },
    });

    return { id: groupId };
  }

  @LogActivity()
  async getRoles(realmId: string, groupId: string) {
    // Verify group exists
    const group = await this.prisma.keycloak_group.findFirst({
      where: {
        id: groupId,
        realm_id: realmId,
      },
    });

    if (!group) {
      throw new NotFoundException('Group not found');
    }

    const roleMappings = await this.prisma.group_role_mapping.findMany({
      where: {
        group_id: groupId,
      },
      select: {
        role_id: true,
      },
    });

    return roleMappings.map((mapping) => ({ id: mapping.role_id }));
  }

  @LogActivity()
  async addRoles(realmId: string, groupId: string, roleIds: string[]) {
    // Verify group exists
    const group = await this.prisma.keycloak_group.findFirst({
      where: {
        id: groupId,
        realm_id: realmId,
      },
    });

    if (!group) {
      throw new NotFoundException('Group not found');
    }

    // Add role mappings
    const data = roleIds.map((role_id) => ({
      group_id: groupId,
      role_id,
    }));

    await this.prisma.group_role_mapping.createMany({
      data,
      skipDuplicates: true,
    });

    return this.getRoles(realmId, groupId);
  }

  @LogActivity()
  async removeRole(realmId: string, groupId: string, roleId: string) {
    // Verify group exists
    const group = await this.prisma.keycloak_group.findFirst({
      where: {
        id: groupId,
        realm_id: realmId,
      },
    });

    if (!group) {
      throw new NotFoundException('Group not found');
    }

    await this.prisma.group_role_mapping.deleteMany({
      where: {
        group_id: groupId,
        role_id: roleId,
      },
    });

    return { removed: roleId };
  }

  @LogActivity()
  async getMembers(realmId: string, groupId: string) {
    // Verify group exists
    const group = await this.prisma.keycloak_group.findFirst({
      where: {
        id: groupId,
        realm_id: realmId,
      },
    });

    if (!group) {
      throw new NotFoundException('Group not found');
    }

    const memberships = await this.prisma.user_group_membership.findMany({
      where: {
        group_id: groupId,
      },
      select: {
        user_id: true,
        membership_type: true,
      },
    });

    return memberships.map((membership) => ({
      id: membership.user_id,
      membership_type: membership.membership_type,
    }));
  }

  @LogActivity()
  async addMember(realmId: string, groupId: string, userId: string) {
    // Verify group exists
    const group = await this.prisma.keycloak_group.findFirst({
      where: {
        id: groupId,
        realm_id: realmId,
      },
    });

    if (!group) {
      throw new NotFoundException('Group not found');
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

    // Add group membership
    await this.prisma.user_group_membership.create({
      data: {
        user_id: userId,
        group_id: groupId,
        membership_type: 'DIRECT',
      },
    });

    return this.getMembers(realmId, groupId);
  }

  @LogActivity()
  async removeMember(realmId: string, groupId: string, userId: string) {
    // Verify group exists
    const group = await this.prisma.keycloak_group.findFirst({
      where: {
        id: groupId,
        realm_id: realmId,
      },
    });

    if (!group) {
      throw new NotFoundException('Group not found');
    }

    await this.prisma.user_group_membership.deleteMany({
      where: {
        user_id: userId,
        group_id: groupId,
      },
    });

    return { removed: userId };
  }
}
