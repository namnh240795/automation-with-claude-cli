import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { LogActivity } from '@app/app-logger';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  // @LogActivity()
  async findAll(realmId: string, page = 0, limit = 20, search?: string) {
    const skip = page * limit;

    const where: any = {
      realm_id: realmId,
    };

    // Add search conditions if search is provided
    if (search) {
      where.OR = [
        { username: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { first_name: { contains: search, mode: 'insensitive' } },
        { last_name: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [users, total] = await Promise.all([
      this.prisma.user_entity.findMany({
        where,
        skip,
        take: limit,
        orderBy: { username: 'asc' },
        select: {
          id: true,
          username: true,
          email: true,
          first_name: true,
          last_name: true,
          email_verified: true,
          enabled: true,
          created_timestamp: true,
          federation_link: true,
          service_account_client_link: true,
        },
      }),
      this.prisma.user_entity.count({ where }),
    ]);

    return {
      data: users,
      meta: {
        total,
        page,
        limit,
        total_pages: Math.ceil(total / limit),
      },
    };
  }

  @LogActivity()
  async findOne(realmId: string, userId: string) {
    const user = await this.prisma.user_entity.findFirst({
      where: {
        id: userId,
        realm_id: realmId,
      },
      select: {
        id: true,
        username: true,
        email: true,
        first_name: true,
        last_name: true,
        email_verified: true,
        enabled: true,
        created_timestamp: true,
        federation_link: true,
        service_account_client_link: true,
        not_before: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  @LogActivity()
  async create(realmId: string, createUserDto: CreateUserDto) {
    const { username, email, ...data } = createUserDto;

    // Check if user with this username already exists in realm
    const existingUser = await this.prisma.user_entity.findFirst({
      where: {
        realm_id: realmId,
        username,
      },
    });

    if (existingUser) {
      throw new ConflictException('User with this username already exists in this realm');
    }

    // Check if email is already used in realm (if email is provided)
    if (email) {
      const existingEmail = await this.prisma.user_entity.findFirst({
        where: {
          realm_id: realmId,
          email,
        },
      });

      if (existingEmail) {
        throw new ConflictException('User with this email already exists in this realm');
      }
    }

    const user = await this.prisma.user_entity.create({
      data: {
        realm_id: realmId,
        username,
        email,
        ...data,
        id: crypto.randomUUID(),
        created_timestamp: BigInt(Date.now()),
      },
      select: {
        id: true,
        username: true,
        email: true,
        first_name: true,
        last_name: true,
        email_verified: true,
        enabled: true,
        created_timestamp: true,
      },
    });

    return user;
  }

  @LogActivity()
  async update(realmId: string, userId: string, updateUserDto: UpdateUserDto) {
    // Check if user exists
    const existingUser = await this.prisma.user_entity.findFirst({
      where: {
        id: userId,
        realm_id: realmId,
      },
    });

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    // If username is being updated, check for duplicates
    if (updateUserDto.username && updateUserDto.username !== existingUser.username) {
      const duplicateUser = await this.prisma.user_entity.findFirst({
        where: {
          realm_id: realmId,
          username: updateUserDto.username,
        },
      });

      if (duplicateUser) {
        throw new ConflictException('User with this username already exists in this realm');
      }
    }

    // If email is being updated, check for duplicates
    if (updateUserDto.email && updateUserDto.email !== existingUser.email) {
      const duplicateEmail = await this.prisma.user_entity.findFirst({
        where: {
          realm_id: realmId,
          email: updateUserDto.email,
        },
      });

      if (duplicateEmail) {
        throw new ConflictException('User with this email already exists in this realm');
      }
    }

    const user = await this.prisma.user_entity.updateMany({
      where: {
        id: userId,
        realm_id: realmId,
      },
      data: updateUserDto,
    });

    return this.findOne(realmId, userId);
  }

  @LogActivity()
  async delete(realmId: string, userId: string) {
    // Check if user exists
    const existingUser = await this.prisma.user_entity.findFirst({
      where: {
        id: userId,
        realm_id: realmId,
      },
    });

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    await this.prisma.user_entity.deleteMany({
      where: {
        id: userId,
        realm_id: realmId,
      },
    });

    return { id: userId };
  }

  @LogActivity()
  async getCredentials(realmId: string, userId: string) {
    // Verify user exists
    const user = await this.prisma.user_entity.findFirst({
      where: {
        id: userId,
        realm_id: realmId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const credentials = await this.prisma.credential.findMany({
      where: { user_id: userId },
      select: {
        id: true,
        type: true,
        user_label: true,
        created_date: true,
        priority: true,
      },
    });

    return credentials;
  }

  @LogActivity()
  async getAttributes(realmId: string, userId: string) {
    // Verify user exists
    const user = await this.prisma.user_entity.findFirst({
      where: {
        id: userId,
        realm_id: realmId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const attributes = await this.prisma.user_attribute.findMany({
      where: { user_id: userId },
      select: {
        name: true,
        value: true,
      },
    });

    // Convert to key-value object
    const attributesObj: Record<string, string> = {};
    for (const attr of attributes) {
      if (attr.name) {
        attributesObj[attr.name] = attr.value || '';
      }
    }

    return attributesObj;
  }

  @LogActivity()
  async updateAttributes(realmId: string, userId: string, attributes: Record<string, string>) {
    // Verify user exists
    const user = await this.prisma.user_entity.findFirst({
      where: {
        id: userId,
        realm_id: realmId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Delete existing attributes
    await this.prisma.user_attribute.deleteMany({
      where: { user_id: userId },
    });

    // Create new attributes
    const data = Object.entries(attributes).map(([name, value]) => ({
      user_id: userId,
      name,
      value,
      id: crypto.randomUUID(),
    }));

    if (data.length > 0) {
      await this.prisma.user_attribute.createMany({
        data,
      });
    }

    return this.getAttributes(realmId, userId);
  }

  @LogActivity()
  async deleteAttribute(realmId: string, userId: string, name: string) {
    // Verify user exists
    const user = await this.prisma.user_entity.findFirst({
      where: {
        id: userId,
        realm_id: realmId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.prisma.user_attribute.deleteMany({
      where: {
        user_id: userId,
        name,
      },
    });

    return { name };
  }

  @LogActivity()
  async getRoles(realmId: string, userId: string) {
    // Verify user exists
    const user = await this.prisma.user_entity.findFirst({
      where: {
        id: userId,
        realm_id: realmId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const roleMappings = await this.prisma.user_role_mapping.findMany({
      where: { user_id: userId },
      select: {
        role_id: true,
      },
    });

    return roleMappings.map((mapping) => ({ id: mapping.role_id }));
  }

  @LogActivity()
  async addRoles(realmId: string, userId: string, roleIds: string[]) {
    // Verify user exists
    const user = await this.prisma.user_entity.findFirst({
      where: {
        id: userId,
        realm_id: realmId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Add role mappings
    const data = roleIds.map((role_id) => ({
      user_id: userId,
      role_id,
    }));

    await this.prisma.user_role_mapping.createMany({
      data,
      skipDuplicates: true,
    });

    return this.getRoles(realmId, userId);
  }

  @LogActivity()
  async removeRoles(realmId: string, userId: string, roleIds: string[]) {
    // Verify user exists
    const user = await this.prisma.user_entity.findFirst({
      where: {
        id: userId,
        realm_id: realmId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.prisma.user_role_mapping.deleteMany({
      where: {
        user_id: userId,
        role_id: { in: roleIds },
      },
    });

    return { removed: roleIds.length };
  }

  @LogActivity()
  async getGroups(realmId: string, userId: string) {
    // Verify user exists
    const user = await this.prisma.user_entity.findFirst({
      where: {
        id: userId,
        realm_id: realmId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const groupMemberships = await this.prisma.user_group_membership.findMany({
      where: { user_id: userId },
      select: {
        group_id: true,
        membership_type: true,
      },
    });

    return groupMemberships.map((membership) => ({
      id: membership.group_id,
      membership_type: membership.membership_type,
    }));
  }

  @LogActivity()
  async addGroups(realmId: string, userId: string, groupIds: string[]) {
    // Verify user exists
    const user = await this.prisma.user_entity.findFirst({
      where: {
        id: userId,
        realm_id: realmId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Add group memberships
    const data = groupIds.map((group_id) => ({
      user_id: userId,
      group_id,
      membership_type: 'DIRECT',
    }));

    await this.prisma.user_group_membership.createMany({
      data,
      skipDuplicates: true,
    });

    return this.getGroups(realmId, userId);
  }

  @LogActivity()
  async removeGroup(realmId: string, userId: string, groupId: string) {
    // Verify user exists
    const user = await this.prisma.user_entity.findFirst({
      where: {
        id: userId,
        realm_id: realmId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.prisma.user_group_membership.deleteMany({
      where: {
        user_id: userId,
        group_id: groupId,
      },
    });

    return { removed: groupId };
  }
}
