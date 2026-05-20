import { Injectable, Logger, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LogActivity } from '@app/app-logger';
import {
  CreateOrganizationDto,
  UpdateOrganizationDto,
  OrganizationResponseDto,
} from './dto';
import {
  OrganizationNotFoundException,
  OrganizationDisplayIdExistsException,
} from './exceptions/organization.exceptions';

@Injectable()
export class OrganizationsService {
  private readonly logger = new Logger(OrganizationsService.name);

  constructor(private readonly prisma: PrismaService) {}

  @LogActivity()
  async create(
    dto: CreateOrganizationDto,
    userId: string,
  ): Promise<OrganizationResponseDto> {
    try {
      const organization = await this.prisma.organization.create({
        data: {
          name: dto.name,
          display_id: dto.display_id,
          type: dto.type ?? 'BUSINESS',
          created_by: userId,
          updated_by: userId,
        },
      });

      this.logger.log(`Organization created: ${organization.id}`);
      return this.mapToResponse(organization);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new OrganizationDisplayIdExistsException(dto.display_id);
      }
      throw error;
    }
  }

  @LogActivity()
  async findAll(userId: string): Promise<OrganizationResponseDto[]> {
    // Find all organizations the user is a member of
    const memberships = await this.prisma.userOrganization.findMany({
      where: {
        user_id: userId,
        deleted_at: null,
        is_active: true,
      },
      select: {
        organization_id: true,
      },
    });

    if (memberships.length === 0) {
      return [];
    }

    const orgIds = memberships.map(m => m.organization_id);
    const organizations = await this.prisma.organization.findMany({
      where: {
        id: { in: orgIds },
        deleted_at: null,
        is_active: true,
      },
      orderBy: { created_at: 'desc' },
    });

    return organizations.map(org => this.mapToResponse(org));
  }

  @LogActivity()
  async findOne(id: string, userId: string): Promise<OrganizationResponseDto> {
    // Verify user has access to this organization
    const membership = await this.prisma.userOrganization.findFirst({
      where: {
        user_id: userId,
        organization_id: id,
        deleted_at: null,
        is_active: true,
      },
    });

    if (!membership) {
      throw new OrganizationNotFoundException(id);
    }

    const organization = await this.prisma.organization.findFirst({
      where: {
        id,
        deleted_at: null,
        is_active: true,
      },
    });

    if (!organization) {
      throw new OrganizationNotFoundException(id);
    }

    return this.mapToResponse(organization);
  }

  @LogActivity()
  async update(
    id: string,
    dto: UpdateOrganizationDto,
    userId: string,
  ): Promise<OrganizationResponseDto> {
    // Check if organization exists
    const existing = await this.prisma.organization.findFirst({
      where: {
        id,
        deleted_at: null,
        is_active: true,
      },
    });

    if (!existing) {
      throw new OrganizationNotFoundException(id);
    }

    try {
      const organization = await this.prisma.organization.update({
        where: { id },
        data: {
          ...(dto.name && { name: dto.name }),
          ...(dto.type && { type: dto.type }),
          ...(dto.is_active !== undefined && { is_active: dto.is_active === 'true' }),
          updated_by: userId,
          updated_at: new Date(),
        },
      });

      this.logger.log(`Organization updated: ${organization.id}`);
      return this.mapToResponse(organization);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException(
          `An organization with that display_id already exists`,
        );
      }
      throw error;
    }
  }

  @LogActivity()
  async remove(id: string, userId: string): Promise<void> {
    // Check if organization exists
    const existing = await this.prisma.organization.findFirst({
      where: {
        id,
        deleted_at: null,
        is_active: true,
      },
    });

    if (!existing) {
      throw new OrganizationNotFoundException(id);
    }

    // Soft delete the organization
    await this.prisma.organization.update({
      where: { id },
      data: {
        deleted_at: new Date(),
        deleted_by: userId,
        is_active: false,
      },
    });

    this.logger.log(`Organization soft deleted: ${id}`);
  }

  private mapToResponse(org: {
    id: string;
    name: string;
    display_id: string;
    type: string;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
  }): OrganizationResponseDto {
    return {
      id: org.id,
      name: org.name,
      display_id: org.display_id,
      type: org.type,
      is_active: org.is_active,
      created_at: org.created_at,
      updated_at: org.updated_at,
    };
  }
}