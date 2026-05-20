import { Test, TestingModule } from '@nestjs/testing';
import { JwtAuthGuard } from '@app/auth-utilities';
import { OrganizationInvitationsController } from './organization-invitations.controller';
import { UserOrganizationService } from '../user-organization/user-organization.service';

describe('OrganizationInvitationsController', () => {
  let controller: OrganizationInvitationsController;
  let userOrganizationService: jest.Mocked<UserOrganizationService>;

  const mockUser: any = {
    sub: 'user-id-1',
    email: 'test@example.com',
    first_name: 'Test',
    last_name: 'User',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationInvitationsController],
      providers: [
        {
          provide: UserOrganizationService,
          useValue: {
            createInvitation: jest.fn(),
            getPendingInvitations: jest.fn(),
            acceptInvitation: jest.fn(),
            cancelInvitation: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<OrganizationInvitationsController>(
      OrganizationInvitationsController,
    );
    userOrganizationService = module.get(UserOrganizationService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createInvitation', () => {
    it('should create an invitation', async () => {
      // Arrange
      const orgId = 'org-id-1';
      const dto = { email: 'new@example.com', role: 'MEMBER' };
      const invitation = {
        id: 'invitation-id-1',
        email: dto.email,
        role: dto.role,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      };
      userOrganizationService.createInvitation.mockResolvedValue(invitation);

      // Act
      const result = await controller.createInvitation(orgId, mockUser, dto);

      // Assert
      expect(result).toEqual(invitation);
      expect(userOrganizationService.createInvitation).toHaveBeenCalledWith(
        orgId,
        dto.email,
        dto.role,
        mockUser.sub,
      );
    });
  });

  describe('getPendingInvitations', () => {
    it('should return pending invitations', async () => {
      // Arrange
      const orgId = 'org-id-1';
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
      userOrganizationService.getPendingInvitations.mockResolvedValue(invitations as any);

      // Act
      const result = await controller.getPendingInvitations(orgId);

      // Assert
      expect(result).toEqual(invitations);
      expect(userOrganizationService.getPendingInvitations).toHaveBeenCalledWith(orgId);
    });
  });

  describe('acceptInvitation', () => {
    it('should accept an invitation', async () => {
      // Arrange
      const orgId = 'org-id-1';
      const invitationId = 'invitation-id-1';
      userOrganizationService.acceptInvitation.mockResolvedValue(undefined);

      // Act
      const result = await controller.acceptInvitation(orgId, invitationId, mockUser);

      // Assert
      expect(result).toEqual({ message: 'Invitation accepted successfully' });
      expect(userOrganizationService.acceptInvitation).toHaveBeenCalledWith(
        invitationId,
        mockUser.sub,
      );
    });
  });

  describe('cancelInvitation', () => {
    it('should cancel an invitation', async () => {
      // Arrange
      const orgId = 'org-id-1';
      const invitationId = 'invitation-id-1';
      userOrganizationService.cancelInvitation.mockResolvedValue(undefined);

      // Act
      const result = await controller.cancelInvitation(orgId, invitationId, mockUser);

      // Assert
      expect(result).toEqual({ message: 'Invitation cancelled successfully' });
      expect(userOrganizationService.cancelInvitation).toHaveBeenCalledWith(
        invitationId,
        mockUser.sub,
      );
    });
  });
});