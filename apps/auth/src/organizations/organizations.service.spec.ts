import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { PrismaService } from '../prisma/prisma.service';
import {
  OrganizationNotFoundException,
  OrganizationDisplayIdExistsException,
} from './exceptions/organization.exceptions';
import { CreateOrganizationDto, OrganizationType } from './dto';

describe('OrganizationsService', () => {
  let service: OrganizationsService;
  let prisma: jest.Mocked<PrismaService>;

  const mockPrisma = {
    organization: {
      create: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
    },
    userOrganization: {
      findMany: jest.fn(),
      findFirst: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrganizationsService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<OrganizationsService>(OrganizationsService);
    prisma = module.get(PrismaService);
    jest.clearAllMocks();
  });

  describe('create', () => {
    const createDto: CreateOrganizationDto = {
      name: 'Acme Corporation',
      display_id: 'acme-corp',
      type: OrganizationType.BUSINESS,
    };

    const userId = 'user-id-1';

    const createdOrg = {
      id: 'org-id-1',
      name: 'Acme Corporation',
      display_id: 'acme-corp',
      type: 'BUSINESS',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    };

    it('should create an organization with audit fields', async () => {
      // Arrange
      mockPrisma.organization.create.mockResolvedValue(createdOrg as any);

      // Act
      const result = await service.create(createDto, userId);

      // Assert
      expect(result).toEqual({
        id: createdOrg.id,
        name: createdOrg.name,
        display_id: createdOrg.display_id,
        type: createdOrg.type,
        is_active: createdOrg.is_active,
        created_at: createdOrg.created_at,
        updated_at: createdOrg.updated_at,
      });
      expect(mockPrisma.organization.create).toHaveBeenCalledWith({
        data: {
          name: createDto.name,
          display_id: createDto.display_id,
          type: createDto.type,
          created_by: userId,
          updated_by: userId,
        },
      });
    });

    it('should set type to BUSINESS when not provided', async () => {
      // Arrange
      const dtoWithoutType = { name: 'Test Org', display_id: 'test-org' };
      mockPrisma.organization.create.mockResolvedValue({
        ...createdOrg,
        type: 'BUSINESS',
      } as any);

      // Act
      await service.create(dtoWithoutType, userId);

      // Assert
      expect(mockPrisma.organization.create).toHaveBeenCalledWith({
        data: {
          name: 'Test Org',
          display_id: 'test-org',
          type: 'BUSINESS',
          created_by: userId,
          updated_by: userId,
        },
      });
    });

    it('should throw OrganizationDisplayIdExistsException on P2002 error', async () => {
      // Arrange
      const p2002Error = { code: 'P2002' };
      mockPrisma.organization.create.mockRejectedValue(p2002Error);

      // Act & Assert
      await expect(service.create(createDto, userId)).rejects.toThrow(
        OrganizationDisplayIdExistsException,
      );
    });
  });

  describe('findAll', () => {
    const userId = 'user-id-1';

    it('should return organizations where user is a member and not deleted', async () => {
      // Arrange
      const memberships = [
        { organization_id: 'org-id-1' },
        { organization_id: 'org-id-2' },
      ];
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
        {
          id: 'org-id-2',
          name: 'Org 2',
          display_id: 'org-2',
          type: 'BUSINESS',
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];

      mockPrisma.userOrganization.findMany.mockResolvedValue(memberships as any);
      mockPrisma.organization.findMany.mockResolvedValue(organizations as any);

      // Act
      const result = await service.findAll(userId);

      // Assert
      expect(result).toHaveLength(2);
      expect(mockPrisma.userOrganization.findMany).toHaveBeenCalledWith({
        where: {
          user_id: userId,
          deleted_at: null,
          is_active: true,
        },
        select: { organization_id: true },
      });
      expect(mockPrisma.organization.findMany).toHaveBeenCalledWith({
        where: {
          id: { in: ['org-id-1', 'org-id-2'] },
          deleted_at: null,
          is_active: true,
        },
        orderBy: { created_at: 'desc' },
      });
    });

    it('should return empty array when user has no memberships', async () => {
      // Arrange
      mockPrisma.userOrganization.findMany.mockResolvedValue([]);

      // Act
      const result = await service.findAll(userId);

      // Assert
      expect(result).toEqual([]);
      expect(mockPrisma.organization.findMany).not.toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    const orgId = 'org-id-1';
    const userId = 'user-id-1';

    it('should return organization when found', async () => {
      // Arrange
      const org = {
        id: orgId,
        name: 'Acme Corporation',
        display_id: 'acme-corp',
        type: 'BUSINESS',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      };
      mockPrisma.userOrganization.findFirst.mockResolvedValue({ id: 'membership-id' } as any);
      mockPrisma.organization.findFirst.mockResolvedValue(org as any);

      // Act
      const result = await service.findOne(orgId, userId);

      // Assert
      expect(result.id).toBe(orgId);
      expect(mockPrisma.userOrganization.findFirst).toHaveBeenCalledWith({
        where: {
          user_id: userId,
          organization_id: orgId,
          deleted_at: null,
          is_active: true,
        },
      });
      expect(mockPrisma.organization.findFirst).toHaveBeenCalledWith({
        where: {
          id: orgId,
          deleted_at: null,
          is_active: true,
        },
      });
    });

    it('should throw OrganizationNotFoundException when not found', async () => {
      // Arrange
      mockPrisma.userOrganization.findFirst.mockResolvedValue(null);

      // Act & Assert
      await expect(service.findOne(orgId, userId)).rejects.toThrow(
        OrganizationNotFoundException,
      );
    });
  });

  describe('update', () => {
    const orgId = 'org-id-1';
    const userId = 'user-id-1';

    const existingOrg = {
      id: orgId,
      name: 'Old Name',
      display_id: 'acme-corp',
      type: 'BUSINESS',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    };

    it('should update organization name and set updated_by', async () => {
      // Arrange
      const updateDto = { name: 'New Name' };
      const updatedOrg = { ...existingOrg, name: 'New Name' };

      mockPrisma.organization.findFirst.mockResolvedValue(existingOrg as any);
      mockPrisma.organization.update.mockResolvedValue(updatedOrg as any);

      // Act
      const result = await service.update(orgId, updateDto, userId);

      // Assert
      expect(result.name).toBe('New Name');
      expect(mockPrisma.organization.update).toHaveBeenCalledWith({
        where: { id: orgId },
        data: {
          name: 'New Name',
          updated_by: userId,
          updated_at: expect.any(Date),
        },
      });
    });

    it('should update organization type', async () => {
      // Arrange
      const updateDto = { type: OrganizationType.PERSONAL };
      const updatedOrg = { ...existingOrg, type: 'PERSONAL' };

      mockPrisma.organization.findFirst.mockResolvedValue(existingOrg as any);
      mockPrisma.organization.update.mockResolvedValue(updatedOrg as any);

      // Act
      await service.update(orgId, updateDto, userId);

      // Assert
      expect(mockPrisma.organization.update).toHaveBeenCalledWith({
        where: { id: orgId },
        data: {
          type: 'PERSONAL',
          updated_by: userId,
          updated_at: expect.any(Date),
        },
      });
    });

    it('should throw OrganizationNotFoundException when org not found', async () => {
      // Arrange
      mockPrisma.organization.findFirst.mockResolvedValue(null);

      // Act & Assert
      await expect(
        service.update(orgId, { name: 'New Name' }, userId),
      ).rejects.toThrow(OrganizationNotFoundException);
    });
  });

  describe('remove', () => {
    const orgId = 'org-id-1';
    const userId = 'user-id-1';

    it('should soft delete organization', async () => {
      // Arrange
      const existingOrg = {
        id: orgId,
        name: 'Acme Corporation',
        display_id: 'acme-corp',
        type: 'BUSINESS',
        is_active: true,
      };
      mockPrisma.organization.findFirst.mockResolvedValue(existingOrg as any);
      mockPrisma.organization.update.mockResolvedValue({ ...existingOrg, is_active: false } as any);

      // Act
      await service.remove(orgId, userId);

      // Assert
      expect(mockPrisma.organization.update).toHaveBeenCalledWith({
        where: { id: orgId },
        data: {
          deleted_at: expect.any(Date),
          deleted_by: userId,
          is_active: false,
        },
      });
    });

    it('should throw OrganizationNotFoundException when org not found', async () => {
      // Arrange
      mockPrisma.organization.findFirst.mockResolvedValue(null);

      // Act & Assert
      await expect(service.remove(orgId, userId)).rejects.toThrow(
        OrganizationNotFoundException,
      );
    });
  });
});