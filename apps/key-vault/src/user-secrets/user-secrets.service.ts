import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EncryptionService } from '../encryption/encryption.service';
import { JwtPayloadDto } from '@app/auth-utilities';
import { LogActivity } from '@app/app-logger';
import {
  CreateUserSecretDto,
  UpdateUserSecretDto,
  CreateOrgSecretDto,
} from './dto';

export interface UserSecretListResponse {
  personal: UserSecretMetadata[];
  organization: UserSecretMetadata[];
  as_admin: UserSecretMetadata[];
}

export interface UserSecretMetadata {
  id: string;
  name: string;
  description?: string;
  tags: string[];
  secret_type: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  organization_id?: string;
  owned_by?: string;
}

const SECRET_SELECT = {
  id: true,
  name: true,
  description: true,
  tags: true,
  secret_type: true,
  is_active: true,
  created_at: true,
  updated_at: true,
  organization_id: true,
  user_id: true,
  can_delete: true,
};

@Injectable()
export class UserSecretsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly encryption: EncryptionService,
  ) {}

  @LogActivity()
  async create(dto: CreateUserSecretDto, userId: string): Promise<UserSecretMetadata> {
    const encryptedValue = this.encryption.encrypt(dto.value);

    try {
      const secret = await this.prisma.user_secret.create({
        data: {
          user_id: userId,
          organization_id: null,
          name: dto.name,
          value: encryptedValue,
          description: dto.description,
          tags: dto.tags || [],
          secret_type: 'PERSONAL',
          can_delete: false,
          created_by: userId,
          updated_by: userId,
        },
        select: SECRET_SELECT,
      });

      return this.toMetadata(secret);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException(
          `A secret with name "${dto.name}" already exists for your account`,
        );
      }
      throw error;
    }
  }

  @LogActivity()
  async createOrgSecret(
    dto: CreateOrgSecretDto,
    user: JwtPayloadDto,
  ): Promise<UserSecretMetadata> {
    const org = user.organizations?.find(o => o.id === dto.organization_id);
    if (!org || org.role !== 'ADMIN') {
      throw new NotFoundException('Organization not found or access denied');
    }

    const encryptedValue = this.encryption.encrypt(dto.value);

    try {
      const secret = await this.prisma.user_secret.create({
        data: {
          user_id: user.sub,
          organization_id: dto.organization_id,
          name: dto.name,
          value: encryptedValue,
          description: dto.description,
          tags: dto.tags || [],
          secret_type: 'ORGANIZATION',
          can_delete: dto.can_delete ?? false,
          created_by: user.sub,
          updated_by: user.sub,
        },
        select: SECRET_SELECT,
      });

      return this.toMetadata(secret);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException(
          `A secret with name "${dto.name}" already exists for this organization`,
        );
      }
      throw error;
    }
  }

  @LogActivity()
  async findAllForUser(user: JwtPayloadDto): Promise<UserSecretListResponse> {
    const orgIds = user.organizations?.map(o => o.id) || [];
    const isAdminInOrgs = user.organizations
      ?.filter(o => o.role === 'ADMIN')
      .map(o => o.id) || [];

    const [personal, organization, asAdmin] = await Promise.all([
      this.prisma.user_secret.findMany({
        where: {
          user_id: user.sub,
          organization_id: null,
          deleted_at: null,
          is_active: true,
        },
        select: SECRET_SELECT,
      }),
      orgIds.length > 0
        ? this.prisma.user_secret.findMany({
            where: {
              organization_id: { in: orgIds },
              secret_type: 'ORGANIZATION',
              deleted_at: null,
              is_active: true,
            },
            select: SECRET_SELECT,
          })
        : Promise.resolve([]),
      isAdminInOrgs.length > 0
        ? this.prisma.user_secret.findMany({
            where: {
              organization_id: { in: isAdminInOrgs },
              secret_type: 'PERSONAL',
              user_id: { not: user.sub },
              deleted_at: null,
              is_active: true,
            },
            select: { ...SECRET_SELECT, user_id: true },
          })
        : Promise.resolve([]),
    ]);

    return {
      personal: personal.map(s => this.toMetadata(s)),
      organization: organization.map(s => this.toMetadata(s)),
      as_admin: asAdmin.map(s => ({ ...this.toMetadata(s), owned_by: s.user_id })),
    };
  }

  @LogActivity()
  async findOne(id: string, user: JwtPayloadDto): Promise<UserSecretMetadata> {
    const secret = await this.prisma.user_secret.findUnique({
      where: { id, deleted_at: null },
      select: { ...SECRET_SELECT, user_id: true },
    });

    if (!secret) {
      throw new NotFoundException('Secret not found');
    }

    if (!this.canAccessSecret(secret, secret.user_id, user)) {
      throw new NotFoundException('Secret not found');
    }

    return this.toMetadata(secret);
  }

  @LogActivity()
  async getDecryptedValue(id: string, user: JwtPayloadDto): Promise<string> {
    const secret = await this.prisma.user_secret.findUnique({
      where: { id, deleted_at: null },
      select: { ...SECRET_SELECT, value: true },
    });

    if (!secret) {
      throw new NotFoundException('Secret not found');
    }

    if (!this.canRevealSecret(secret, user)) {
      throw new NotFoundException('Secret not found');
    }

    return this.encryption.decrypt((secret as any).value);
  }

  @LogActivity()
  async update(
    id: string,
    dto: UpdateUserSecretDto,
    user: JwtPayloadDto,
  ): Promise<UserSecretMetadata> {
    const secret = await this.prisma.user_secret.findUnique({
      where: { id, deleted_at: null },
      select: SECRET_SELECT,
    });

    if (!secret) {
      throw new NotFoundException('Secret not found');
    }

    if (!this.canModifySecret(secret, user)) {
      throw new NotFoundException('Secret not found');
    }

    const updateData: any = {
      updated_by: user.sub,
    };

    if (dto.name !== undefined) updateData.name = dto.name;
    if (dto.description !== undefined) updateData.description = dto.description;
    if (dto.tags !== undefined) updateData.tags = dto.tags;
    if (dto.can_delete !== undefined) updateData.can_delete = dto.can_delete;
    if (dto.value !== undefined) {
      updateData.value = this.encryption.encrypt(dto.value);
    }

    const updated = await this.prisma.user_secret.update({
      where: { id },
      data: updateData,
      select: SECRET_SELECT,
    });

    return this.toMetadata(updated);
  }

  @LogActivity()
  async remove(id: string, user: JwtPayloadDto): Promise<void> {
    const secret = await this.prisma.user_secret.findUnique({
      where: { id, deleted_at: null },
      select: { ...SECRET_SELECT, user_id: true },
    });

    if (!secret) {
      throw new NotFoundException('Secret not found');
    }

    if (!this.canDeleteSecret(secret, user)) {
      throw new NotFoundException('Secret not found');
    }

    await this.prisma.user_secret.update({
      where: { id },
      data: {
        deleted_at: new Date(),
        deleted_by: user.sub,
      },
    });
  }

  @LogActivity()
  async findOrgSecrets(
    organizationId: string,
    user: JwtPayloadDto,
  ): Promise<UserSecretMetadata[]> {
    const org = user.organizations?.find(o => o.id === organizationId);
    if (!org) {
      throw new NotFoundException('Organization not found');
    }

    const secrets = await this.prisma.user_secret.findMany({
      where: {
        organization_id: organizationId,
        secret_type: 'ORGANIZATION',
        deleted_at: null,
        is_active: true,
      },
      select: SECRET_SELECT,
    });

    return secrets.map(s => this.toMetadata(s));
  }

  private canAccessSecret(
    secret: { organization_id: string | null; user_id: string; secret_type: string },
    ownerUserId: string,
    user: JwtPayloadDto,
  ): boolean {
    if (ownerUserId === user.sub) return true;

    if (secret.organization_id) {
      const org = user.organizations?.find(o => o.id === secret.organization_id);
      if (org) return true;
    }

    if (secret.organization_id && secret.secret_type === 'PERSONAL') {
      const org = user.organizations?.find(o => o.id === secret.organization_id);
      if (org?.role === 'ADMIN') return true;
    }

    return false;
  }

  private canRevealSecret(
    secret: { organization_id: string | null; user_id: string; secret_type: string },
    user: JwtPayloadDto,
  ): boolean {
    if (secret.user_id === user.sub) return true;

    if (secret.organization_id && secret.secret_type === 'ORGANIZATION') {
      const org = user.organizations?.find(o => o.id === secret.organization_id);
      if (org) return true;
    }

    if (secret.organization_id && secret.secret_type === 'PERSONAL') {
      const org = user.organizations?.find(o => o.id === secret.organization_id);
      if (org?.role === 'ADMIN') return true;
    }

    return false;
  }

  private canModifySecret(
    secret: { organization_id: string | null; user_id: string; secret_type: string },
    user: JwtPayloadDto,
  ): boolean {
    if (secret.user_id === user.sub) return true;

    if (secret.organization_id && secret.secret_type === 'ORGANIZATION') {
      const org = user.organizations?.find(o => o.id === secret.organization_id);
      if (org?.role === 'ADMIN') return true;
    }

    return false;
  }

  private canDeleteSecret(
    secret: { organization_id: string | null; user_id: string; secret_type: string; can_delete: boolean },
    user: JwtPayloadDto,
  ): boolean {
    if (secret.user_id === user.sub && secret.secret_type === 'PERSONAL') {
      return true;
    }

    if (secret.organization_id && secret.secret_type === 'ORGANIZATION') {
      const org = user.organizations?.find(o => o.id === secret.organization_id);
      if (org?.role === 'ADMIN') return true;
      if (org && secret.can_delete) return true;
    }

    return false;
  }

  private toMetadata(secret: any): UserSecretMetadata {
    const { user_id, ...rest } = secret;
    return rest;
  }
}