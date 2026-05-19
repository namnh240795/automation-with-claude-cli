import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PrismaService } from '../prisma/prisma.service';

describe('PermissionService', () => {
  let service: PermissionService;
  let prisma: jest.Mocked<PrismaService>;

  const mockPrisma = {
    permission: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PermissionService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<PermissionService>(PermissionService);
    prisma = module.get(PrismaService);
    jest.clearAllMocks();
  });

  describe('create', () => {
    const permissionData = {
      name: 'users:read',
      description: 'Read users',
      resource: 'users',
      action: 'read',
    };

    it('should create a permission successfully', async () => {
      const created = { id: 'perm-1', ...permissionData, created_at: new Date(), updated_at: new Date() };
      mockPrisma.permission.findUnique.mockResolvedValue(null);
      mockPrisma.permission.create.mockResolvedValue(created as any);

      const result = await service.create(permissionData);

      expect(result).toEqual(created);
      expect(mockPrisma.permission.create).toHaveBeenCalledWith({ data: permissionData });
    });

    it('should throw BadRequestException for invalid name format', async () => {
      await expect(service.create({
        ...permissionData,
        name: 'invalid-name',
      })).rejects.toThrow(BadRequestException);
    });

    it('should throw ConflictException if permission already exists', async () => {
      mockPrisma.permission.findUnique.mockResolvedValue({ id: 'existing' } as any);

      await expect(service.create(permissionData)).rejects.toThrow(ConflictException);
    });
  });

  describe('findById', () => {
    it('should return permission when found', async () => {
      const permission = { id: 'perm-1', name: 'users:read' };
      mockPrisma.permission.findUnique.mockResolvedValue(permission as any);

      const result = await service.findById('perm-1');

      expect(result).toEqual(permission);
    });

    it('should throw NotFoundException when not found', async () => {
      mockPrisma.permission.findUnique.mockResolvedValue(null);

      await expect(service.findById('nonexistent')).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByName', () => {
    it('should return permission when found', async () => {
      const permission = { id: 'perm-1', name: 'users:read' };
      mockPrisma.permission.findUnique.mockResolvedValue(permission as any);

      const result = await service.findByName('users:read');

      expect(result).toEqual(permission);
    });
  });

  describe('findAll', () => {
    it('should return all permissions ordered by name', async () => {
      const permissions = [
        { id: '1', name: 'users:read' },
        { id: '2', name: 'users:write' },
      ];
      mockPrisma.permission.findMany.mockResolvedValue(permissions as any);

      const result = await service.findAll();

      expect(result).toEqual(permissions);
      expect(mockPrisma.permission.findMany).toHaveBeenCalledWith({
        orderBy: { name: 'asc' },
      });
    });
  });

  describe('findByResource', () => {
    it('should return permissions for a resource', async () => {
      const permissions = [{ id: '1', name: 'users:read', resource: 'users' }];
      mockPrisma.permission.findMany.mockResolvedValue(permissions as any);

      const result = await service.findByResource('users');

      expect(result).toEqual(permissions);
    });
  });

  describe('delete', () => {
    it('should delete permission and return success message', async () => {
      const permission = { id: 'perm-1', name: 'users:read' };
      mockPrisma.permission.findUnique.mockResolvedValue(permission as any);
      mockPrisma.permission.delete.mockResolvedValue(permission as any);

      const result = await service.delete('perm-1');

      expect(result).toEqual({ message: 'Permission deleted successfully' });
      expect(mockPrisma.permission.delete).toHaveBeenCalledWith({ where: { id: 'perm-1' } });
    });
  });

  describe('getByNames', () => {
    it('should return permissions matching names', async () => {
      const permissions = [
        { id: '1', name: 'users:read' },
        { id: '2', name: 'users:write' },
      ];
      mockPrisma.permission.findMany.mockResolvedValue(permissions as any);

      const result = await service.getByNames(['users:read', 'users:write']);

      expect(result).toEqual(permissions);
      expect(mockPrisma.permission.findMany).toHaveBeenCalledWith({
        where: { name: { in: ['users:read', 'users:write'] } },
      });
    });
  });

  describe('createMany', () => {
    it('should create multiple permissions', async () => {
      const permissions = [
        { name: 'users:read', description: 'Read', resource: 'users', action: 'read' },
        { name: 'users:write', description: 'Write', resource: 'users', action: 'write' },
      ];
      mockPrisma.permission.findUnique.mockResolvedValue(null);
      mockPrisma.permission.create.mockResolvedValue({ id: 'created' } as any);

      const result = await service.createMany(permissions);

      expect(result.created).toHaveLength(2);
      expect(result.errors).toHaveLength(0);
    });

    it('should create multiple permissions and collect errors', async () => {
      const permissions = [
        { name: 'users:read', description: 'Read', resource: 'users', action: 'read' },
        { name: 'users:write', description: 'Write', resource: 'users', action: 'write' },
      ];
      mockPrisma.permission.findUnique.mockResolvedValue(null);
      mockPrisma.permission.create.mockResolvedValue({ id: 'created' } as any);

      const result = await service.createMany(permissions);

      expect(result.created).toHaveLength(2);
      expect(result.errors).toHaveLength(0);
    });
  });
});