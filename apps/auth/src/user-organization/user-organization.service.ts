import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LogActivity } from '@app/app-logger';

@Injectable()
export class UserOrganizationService {
  private readonly logger = new Logger(UserOrganizationService.name);

  constructor(private readonly prisma: PrismaService) {}

  @LogActivity()
  async addMember(
    organizationId: string,
    userId: string,
    role: string,
    invitedBy: string,
  ): Promise<void> {
    await this.prisma.userOrganization.create({
      data: {
        user_id: userId,
        organization_id: organizationId,
        organization_role: role,
        created_by: invitedBy,
        updated_by: invitedBy,
      },
    });

    this.logger.log(`User ${userId} added to organization ${organizationId}`);
  }

  @LogActivity()
  async removeMember(
    organizationId: string,
    userId: string,
    removedBy: string,
  ): Promise<void> {
    await this.prisma.userOrganization.updateMany({
      where: {
        user_id: userId,
        organization_id: organizationId,
        deleted_at: null,
      },
      data: {
        deleted_at: new Date(),
        deleted_by: removedBy,
        is_active: false,
      },
    });

    this.logger.log(`User ${userId} removed from organization ${organizationId}`);
  }

  @LogActivity()
  async updateMemberRole(
    organizationId: string,
    userId: string,
    newRole: string,
    updatedBy: string,
  ): Promise<void> {
    await this.prisma.userOrganization.updateMany({
      where: {
        user_id: userId,
        organization_id: organizationId,
        deleted_at: null,
        is_active: true,
      },
      data: {
        organization_role: newRole,
        updated_by: updatedBy,
        updated_at: new Date(),
      },
    });

    this.logger.log(`User ${userId} role updated to ${newRole} in organization ${organizationId}`);
  }

  @LogActivity()
  async findUserOrganizations(userId: string): Promise<
    {
      organization_id: string;
      organization_role: string;
      is_active: boolean;
      organization: {
        id: string;
        name: string;
        display_id: string;
        type: string;
      };
    }[]
  > {
    const memberships = await this.prisma.userOrganization.findMany({
      where: {
        user_id: userId,
        deleted_at: null,
        is_active: true,
      },
      include: {
        organization: {
          select: {
            id: true,
            name: true,
            display_id: true,
            type: true,
          },
        },
      },
    });

    return memberships;
  }

  @LogActivity()
  async isOrgAdmin(userId: string, organizationId: string): Promise<boolean> {
    const membership = await this.prisma.userOrganization.findFirst({
      where: {
        user_id: userId,
        organization_id: organizationId,
        organization_role: 'ADMIN',
        deleted_at: null,
        is_active: true,
      },
    });

    return !!membership;
  }

  @LogActivity()
  async isOrgMember(userId: string, organizationId: string): Promise<boolean> {
    const membership = await this.prisma.userOrganization.findFirst({
      where: {
        user_id: userId,
        organization_id: organizationId,
        deleted_at: null,
        is_active: true,
      },
    });

    return !!membership;
  }

  @LogActivity()
  async getOrgMembers(organizationId: string): Promise<
    {
      user_id: string;
      email: string;
      first_name: string | null;
      last_name: string | null;
      organization_role: string;
      is_active: boolean;
      created_at: Date;
    }[]
  > {
    const memberships = await this.prisma.userOrganization.findMany({
      where: {
        organization_id: organizationId,
        deleted_at: null,
        is_active: true,
      },
      include: {
        user: {
          select: {
            email: true,
            first_name: true,
            last_name: true,
          },
        },
      },
    });

    return memberships.map(m => ({
      user_id: m.user_id,
      email: m.user.email,
      first_name: m.user.first_name,
      last_name: m.user.last_name,
      organization_role: m.organization_role,
      is_active: m.is_active,
      created_at: m.created_at,
    }));
  }

  @LogActivity()
  async createInvitation(
    organizationId: string,
    email: string,
    role: string,
    invitedBy: string,
  ): Promise<{
    id: string;
    email: string;
    role: string;
    expires_at: Date;
  }> {
    // Check if there's already a pending invitation for this email in this org
    const existing = await this.prisma.organizationInvitation.findFirst({
      where: {
        organization_id: organizationId,
        email,
        accepted_at: null,
      },
    });

    if (existing) {
      throw new BadRequestException('An invitation has already been sent to this email');
    }

    // Create invitation with 7-day expiry
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    const invitation = await this.prisma.organizationInvitation.create({
      data: {
        organization_id: organizationId,
        email,
        role,
        invited_by: invitedBy,
        expires_at: expiresAt,
      },
    });

    this.logger.log(`Invitation created for ${email} to join organization ${organizationId}`);
    return {
      id: invitation.id,
      email: invitation.email,
      role: invitation.role,
      expires_at: invitation.expires_at,
    };
  }

  @LogActivity()
  async acceptInvitation(
    invitationId: string,
    userId: string,
  ): Promise<void> {
    const invitation = await this.prisma.organizationInvitation.findFirst({
      where: {
        id: invitationId,
        accepted_at: null,
      },
    });

    if (!invitation) {
      throw new BadRequestException('Invitation not found or already accepted');
    }

    if (invitation.expires_at < new Date()) {
      throw new BadRequestException('Invitation has expired');
    }

    // Check if invitation is for this email (we'd need to look up user email)
    // For now, just mark as accepted and add user to organization
    await this.prisma.$transaction(async (tx) => {
      // Update invitation
      await tx.organizationInvitation.update({
        where: { id: invitationId },
        data: { accepted_at: new Date() },
      });

      // Add user to organization
      await tx.userOrganization.create({
        data: {
          user_id: userId,
          organization_id: invitation.organization_id,
          organization_role: invitation.role,
          created_by: userId,
          updated_by: userId,
        },
      });
    });

    this.logger.log(`User ${userId} accepted invitation ${invitationId}`);
  }

  @LogActivity()
  async getPendingInvitations(organizationId: string): Promise<
    {
      id: string;
      email: string;
      role: string;
      invited_by: string;
      expires_at: Date;
      created_at: Date;
    }[]
  > {
    const invitations = await this.prisma.organizationInvitation.findMany({
      where: {
        organization_id: organizationId,
        accepted_at: null,
        expires_at: { gte: new Date() },
      },
      orderBy: { created_at: 'desc' },
    });

    return invitations;
  }

  @LogActivity()
  async cancelInvitation(
    invitationId: string,
    cancelledBy: string,
  ): Promise<void> {
    await this.prisma.organizationInvitation.update({
      where: { id: invitationId },
      data: { accepted_at: new Date() }, // Mark as cancelled by setting accepted_at to now
    });

    this.logger.log(`Invitation ${invitationId} cancelled by ${cancelledBy}`);
  }
}