import { Test, TestingModule } from '@nestjs/testing';
import { JwtAuthGuard } from '@app/auth-utilities';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsService } from './organizations.service';
import { UserOrganizationService } from '../user-organization/user-organization.service';
import { OrganizationType } from './dto';

describe('OrganizationsController', () => {
  let controller: OrganizationsController;
  let organizationsService: jest.Mocked<OrganizationsService>;
  let userOrganizationService: jest.Mocked<UserOrganizationService>;

  const mockUser: any = {
    sub: 'user-id-1',
    email: 'test@example.com',
    first_name: 'Test',
    last_name: 'User',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600,
  };

  const mockPrisma = {
    organization: {
      create: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationsController],
      providers: [
        {
          provide: OrganizationsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: UserOrganizationService,
          useValue: {
            addMember: jest.fn(),
            removeMember: jest.fn(),
            updateMemberRole: jest.fn(),
            getOrgMembers: jest.fn(),
            isOrgAdmin: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<OrganizationsController>(OrganizationsController);
    organizationsService = module.get(OrganizationsService);
    userOrganizationService = module.get(UserOrganizationService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create an organization', async () => {
      // Arrange
      const createDto = {
        name: 'Acme Corporation',
        display_id: 'acme-corp',
        type: OrganizationType.BUSINESS,
      };
      const response = {
        id: 'org-id-1',
        name: 'Acme Corporation',
        display_id: 'acme-corp',
        type: 'BUSINESS',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      };
      organizationsService.create.mockResolvedValue(response as any);

      // Act
      const result = await controller.create(mockUser, createDto);

      // Assert
      expect(result).toEqual(response);
      expect(organizationsService.create).toHaveBeenCalledWith(createDto, mockUser.sub);
    });
  });

  describe('findAll', () => {
    it('should return all organizations for user', async () => {
      // Arrange
      const organizations = [
        {
          id: 'org-id-1',
          name: 'Org 1',
          display_id: 'org-1',
          type: 'BUSINESS',
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];
      organizationsService.findAll.mockResolvedValue(organizations as any);

      // Act
      const result = await controller.findAll(mockUser);

      // Assert
      expect(result).toEqual(organizations);
      expect(organizationsService.findAll).toHaveBeenCalledWith(mockUser.sub);
    });
  });

  describe('findOne', () => {
    it('should return organization by id', async () => {
      // Arrange
      const orgId = 'org-id-1';
      const organization = {
        id: orgId,
        name: 'Acme Corporation',
        display_id: 'acme-corp',
        type: 'BUSINESS',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      };
      organizationsService.findOne.mockResolvedValue(organization as any);

      // Act
      const result = await controller.findOne(orgId, mockUser);

      // Assert
      expect(result).toEqual(organization);
      expect(organizationsService.findOne).toHaveBeenCalledWith(orgId, mockUser.sub);
    });
  });

  describe('update', () => {
    it('should update an organization', async () => {
      // Arrange
      const orgId = 'org-id-1';
      const updateDto = { name: 'New Name' };
      const updatedOrg = {
        id: orgId,
        name: 'New Name',
        display_id: 'acme-corp',
        type: 'BUSINESS',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      };
      organizationsService.update.mockResolvedValue(updatedOrg as any);

      // Act
      const result = await controller.update(orgId, mockUser, updateDto);

      // Assert
      expect(result).toEqual(updatedOrg);
      expect(organizationsService.update).toHaveBeenCalledWith(orgId, updateDto, mockUser.sub);
    });
  });

  describe('remove', () => {
    it('should soft delete an organization', async () => {
      // Arrange
      const orgId = 'org-id-1';
      organizationsService.remove.mockResolvedValue(undefined);

      // Act
      const result = await controller.remove(orgId, mockUser);

      // Assert
      expect(result).toBeUndefined();
      expect(organizationsService.remove).toHaveBeenCalledWith(orgId, mockUser.sub);
    });
  });

  describe('addMember', () => {
    it('should add a member to organization', async () => {
      // Arrange
      const orgId = 'org-id-1';
      const dto = { user_id: 'user-id-2', role: 'MEMBER' };
      userOrganizationService.isOrgAdmin.mockResolvedValue(true);
      userOrganizationService.addMember.mockResolvedValue(undefined);

      // Act
      const result = await controller.addMember(orgId, mockUser, dto);

      // Assert
      expect(result).toEqual({ message: 'Member added successfully' });
      expect(userOrganizationService.addMember).toHaveBeenCalledWith(
        orgId,
        dto.user_id,
        dto.role,
        mockUser.sub,
      );
    });
  });

  describe('removeMember', () => {
    it('should remove a member from organization', async () => {
      // Arrange
      const orgId = 'org-id-1';
      const userId = 'user-id-2';
      userOrganizationService.isOrgAdmin.mockResolvedValue(true);
      userOrganizationService.removeMember.mockResolvedValue(undefined);

      // Act
      const result = await controller.removeMember(orgId, userId, mockUser);

      // Assert
      expect(result).toEqual({ message: 'Member removed successfully' });
      expect(userOrganizationService.removeMember).toHaveBeenCalledWith(
        orgId,
        userId,
        mockUser.sub,
      );
    });
  });

  describe('updateMemberRole', () => {
    it('should update member role', async () => {
      // Arrange
      const orgId = 'org-id-1';
      const userId = 'user-id-2';
      const dto = { role: 'ADMIN' };
      userOrganizationService.isOrgAdmin.mockResolvedValue(true);
      userOrganizationService.updateMemberRole.mockResolvedValue(undefined);

      // Act
      const result = await controller.updateMemberRole(orgId, userId, mockUser, dto);

      // Assert
      expect(result).toEqual({ message: 'Member role updated successfully' });
      expect(userOrganizationService.updateMemberRole).toHaveBeenCalledWith(
        orgId,
        userId,
        dto.role,
        mockUser.sub,
      );
    });
  });

  describe('getMembers', () => {
    it('should return all org members', async () => {
      // Arrange
      const orgId = 'org-id-1';
      const members = [
        {
          user_id: 'user-id-1',
          email: 'user@example.com',
          first_name: 'Test',
          last_name: 'User',
          organization_role: 'ADMIN',
          is_active: true,
          created_at: new Date(),
        },
      ];
      userOrganizationService.getOrgMembers.mockResolvedValue(members as any);

      // Act
      const result = await controller.getMembers(orgId, mockUser);

      // Assert
      expect(result).toEqual(members);
      expect(userOrganizationService.getOrgMembers).toHaveBeenCalledWith(orgId);
    });
  });
});