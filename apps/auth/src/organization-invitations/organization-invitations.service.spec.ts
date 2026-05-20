import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { UserOrganizationService } from '../user-organization/user-organization.service';
import { PrismaService } from '../prisma/prisma.service';

describe('UserOrganizationService', () => {
  let service: UserOrganizationService;
  let prisma: jest.Mocked<PrismaService>;

  const mockPrisma = {
    userOrganization: {
      create: jest.fn(),
      updateMany: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn(),
    },
    organizationInvitation: {
      findFirst: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      findMany: jest.fn(),
    },
    $transaction: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserOrganizationService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<UserOrganizationService>(UserOrganizationService);
    prisma = module.get(PrismaService);
    jest.clearAllMocks();
  });

  describe('addMember', () => {
    const organizationId = 'org-id-1';
    const userId = 'user-id-2';
    const role = 'MEMBER';
    const invitedBy = 'user-id-1';

    it('should create user organization junction with audit fields', async () => {
      // Arrange
      mockPrisma.userOrganization.create.mockResolvedValue({} as any);

      // Act
      await service.addMember(organizationId, userId, role, invitedBy);

      // Assert
      expect(mockPrisma.userOrganization.create).toHaveBeenCalledWith({
        data: {
          user_id: userId,
          organization_id: organizationId,
          organization_role: role,
          created_by: invitedBy,
          updated_by: invitedBy,
        },
      });
    });
  });

  describe('removeMember', () => {
    const organizationId = 'org-id-1';
    const userId = 'user-id-2';
    const removedBy = 'user-id-1';

    it('should soft delete user from organization', async () => {
      // Arrange
      mockPrisma.userOrganization.updateMany.mockResolvedValue({ count: 1 } as any);

      // Act
      await service.removeMember(organizationId, userId, removedBy);

      // Assert
      expect(mockPrisma.userOrganization.updateMany).toHaveBeenCalledWith({
        where: {
          user_id: userId,
          organization_id: organizationId,
          deleted_at: null,
        },
        data: {
          deleted_at: expect.any(Date),
          deleted_by: removedBy,
          is_active: false,
        },
      });
    });
  });

  describe('updateMemberRole', () => {
    const organizationId = 'org-id-1';
    const userId = 'user-id-2';
    const newRole = 'ADMIN';
    const updatedBy = 'user-id-1';

    it('should update member role with audit fields', async () => {
      // Arrange
      mockPrisma.userOrganization.updateMany.mockResolvedValue({ count: 1 } as any);

      // Act
      await service.updateMemberRole(organizationId, userId, newRole, updatedBy);

      // Assert
      expect(mockPrisma.userOrganization.updateMany).toHaveBeenCalledWith({
        where: {
          user_id: userId,
          organization_id: organizationId,
          deleted_at: null,
          is_active: true,
        },
        data: {
          organization_role: newRole,
          updated_by: updatedBy,
          updated_at: expect.any(Date),
        },
      });
    });
  });

  describe('findUserOrganizations', () => {
    const userId = 'user-id-1';

    it('should return active memberships with organization details', async () => {
      // Arrange
      const memberships = [
        {
          organization_id: 'org-id-1',
          organization_role: 'ADMIN',
          is_active: true,
          organization: {
            id: 'org-id-1',
            name: 'Acme Corp',
            display_id: 'acme-corp',
            type: 'BUSINESS',
          },
        },
      ];
      mockPrisma.userOrganization.findMany.mockResolvedValue(memberships as any);

      // Act
      const result = await service.findUserOrganizations(userId);

      // Assert
      expect(result).toEqual(memberships);
      expect(mockPrisma.userOrganization.findMany).toHaveBeenCalledWith({
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
    });
  });

  describe('isOrgAdmin', () => {
    const userId = 'user-id-1';
    const organizationId = 'org-id-1';

    it('should return true when user is ADMIN', async () => {
      // Arrange
      mockPrisma.userOrganization.findFirst.mockResolvedValue({ id: 'membership-id' } as any);

      // Act
      const result = await service.isOrgAdmin(userId, organizationId);

      // Assert
      expect(result).toBe(true);
      expect(mockPrisma.userOrganization.findFirst).toHaveBeenCalledWith({
        where: {
          user_id: userId,
          organization_id: organizationId,
          organization_role: 'ADMIN',
          deleted_at: null,
          is_active: true,
        },
      });
    });

    it('should return false when user is not ADMIN', async () => {
      // Arrange
      mockPrisma.userOrganization.findFirst.mockResolvedValue(null);

      // Act
      const result = await service.isOrgAdmin(userId, organizationId);

      // Assert
      expect(result).toBe(false);
    });
  });

  describe('isOrgMember', () => {
    const userId = 'user-id-1';
    const organizationId = 'org-id-1';

    it('should return true when user is a member', async () => {
      // Arrange
      mockPrisma.userOrganization.findFirst.mockResolvedValue({ id: 'membership-id' } as any);

      // Act
      const result = await service.isOrgMember(userId, organizationId);

      // Assert
      expect(result).toBe(true);
      expect(mockPrisma.userOrganization.findFirst).toHaveBeenCalledWith({
        where: {
          user_id: userId,
          organization_id: organizationId,
          deleted_at: null,
          is_active: true,
        },
      });
    });

    it('should return false when user is not a member', async () => {
      // Arrange
      mockPrisma.userOrganization.findFirst.mockResolvedValue(null);

      // Act
      const result = await service.isOrgMember(userId, organizationId);

      // Assert
      expect(result).toBe(false);
    });
  });

  describe('getOrgMembers', () => {
    const organizationId = 'org-id-1';

    it('should return all active members with user details', async () => {
      // Arrange
      const memberships = [
        {
          user_id: 'user-id-1',
          organization_role: 'ADMIN',
          is_active: true,
          created_at: new Date(),
          user: {
            email: 'admin@example.com',
            first_name: 'Admin',
            last_name: 'User',
          },
        },
        {
          user_id: 'user-id-2',
          organization_role: 'MEMBER',
          is_active: true,
          created_at: new Date(),
          user: {
            email: 'member@example.com',
            first_name: 'Member',
            last_name: 'User',
          },
        },
      ];
      mockPrisma.userOrganization.findMany.mockResolvedValue(memberships as any);

      // Act
      const result = await service.getOrgMembers(organizationId);

      // Assert
      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        user_id: 'user-id-1',
        email: 'admin@example.com',
        first_name: 'Admin',
        last_name: 'User',
        organization_role: 'ADMIN',
        is_active: true,
        created_at: memberships[0].created_at,
      });
    });
  });

  describe('createInvitation', () => {
    const organizationId = 'org-id-1';
    const email = 'new@example.com';
    const role = 'MEMBER';
    const invitedBy = 'user-id-1';

    it('should create invitation with 7-day expiry', async () => {
      // Arrange
      mockPrisma.organizationInvitation.findFirst.mockResolvedValue(null);
      mockPrisma.organizationInvitation.create.mockResolvedValue({
        id: 'invitation-id-1',
        email,
        role,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      } as any);

      // Act
      const result = await service.createInvitation(organizationId, email, role, invitedBy);

      // Assert
      expect(result.id).toBe('invitation-id-1');
      expect(result.email).toBe(email);
      expect(result.role).toBe(role);
      expect(mockPrisma.organizationInvitation.findFirst).toHaveBeenCalledWith({
        where: {
          organization_id: organizationId,
          email,
          accepted_at: null,
        },
      });
    });

    it('should throw BadRequestException if invitation already exists', async () => {
      // Arrange
      mockPrisma.organizationInvitation.findFirst.mockResolvedValue({ id: 'existing' } as any);

      // Act & Assert
      await expect(
        service.createInvitation(organizationId, email, role, invitedBy),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('acceptInvitation', () => {
    const invitationId = 'invitation-id-1';
    const userId = 'user-id-2';

    it('should accept invitation and add user to organization', async () => {
      // Arrange
      const invitation = {
        id: invitationId,
        organization_id: 'org-id-1',
        role: 'MEMBER',
        accepted_at: null,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      };
      mockPrisma.organizationInvitation.findFirst.mockResolvedValue(invitation as any);
      mockPrisma.$transaction.mockImplementation(async (callback) => {
        return callback(mockPrisma);
      });

      // Act
      await service.acceptInvitation(invitationId, userId);

      // Assert
      expect(mockPrisma.$transaction).toHaveBeenCalled();
    });

    it('should throw BadRequestException if invitation not found', async () => {
      // Arrange
      mockPrisma.organizationInvitation.findFirst.mockResolvedValue(null);

      // Act & Assert
      await expect(service.acceptInvitation(invitationId, userId)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if invitation expired', async () => {
      // Arrange
      const expiredInvitation = {
        id: invitationId,
        organization_id: 'org-id-1',
        role: 'MEMBER',
        accepted_at: null,
        expires_at: new Date(Date.now() - 1000), // Expired
      };
      mockPrisma.organizationInvitation.findFirst.mockResolvedValue(expiredInvitation as any);

      // Act & Assert
      await expect(service.acceptInvitation(invitationId, userId)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('getPendingInvitations', () => {
    const organizationId = 'org-id-1';

    it('should return non-expired, non-accepted invitations', async () => {
      // Arrange
      const invitations = [
        {
          id: 'invitation-id-1',
          email: 'user1@example.com',
          role: 'MEMBER',
          invited_by: 'user-id-1',
          expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          created_at: new Date(),
        },
      ];
      mockPrisma.organizationInvitation.findMany.mockResolvedValue(invitations as any);

      // Act
      const result = await service.getPendingInvitations(organizationId);

      // Assert
      expect(result).toEqual(invitations);
      expect(mockPrisma.organizationInvitation.findMany).toHaveBeenCalledWith({
        where: {
          organization_id: organizationId,
          accepted_at: null,
          expires_at: { gte: expect.any(Date) },
        },
        orderBy: { created_at: 'desc' },
      });
    });
  });

  describe('cancelInvitation', () => {
    const invitationId = 'invitation-id-1';
    const cancelledBy = 'user-id-1';

    it('should cancel invitation by setting accepted_at', async () => {
      // Arrange
      mockPrisma.organizationInvitation.update.mockResolvedValue({} as any);

      // Act
      await service.cancelInvitation(invitationId, cancelledBy);

      // Assert
      expect(mockPrisma.organizationInvitation.update).toHaveBeenCalledWith({
        where: { id: invitationId },
        data: { accepted_at: expect.any(Date) },
      });
    });
  });
});