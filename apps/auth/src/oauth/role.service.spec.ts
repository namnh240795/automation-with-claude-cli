import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { RoleService } from './role.service';
import { PrismaService } from '../prisma/prisma.service';
import { PermissionService } from './permission.service';

describe('RoleService', () => {
  let service: RoleService;
  let prisma: jest.Mocked<PrismaService>;
  let permissionService: jest.Mocked<PermissionService>;

  const mockPrisma = {
    role: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    rolePermission: {
      createMany: jest.fn(),
      deleteMany: jest.fn(),
    },
  };

  const mockPermissionService = {
    getByNames: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: PermissionService, useValue: mockPermissionService },
      ],
    }).compile();

    service = module.get<RoleService>(RoleService);
    prisma = module.get(PrismaService);
    permissionService = module.get(PermissionService);
    jest.clearAllMocks();
  });

  describe('create', () => {
    const roleData = {
      name: 'admin',
      description: 'Administrator role',
    };

    it('should create a role successfully', async () => {
      const created = {
        id: 'role-1',
        name: 'admin',
        description: 'Administrator role',
        is_active: true,
        permissions: [],
      };
      mockPrisma.role.findUnique.mockResolvedValue(null);
      mockPrisma.role.create.mockResolvedValue(created as any);

      const result = await service.create(roleData);

      expect(result).toEqual(created);
    });

    it('should throw BadRequestException for invalid name format', async () => {
      await expect(service.create({ name: 'invalid role!' })).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw ConflictException if role already exists', async () => {
      mockPrisma.role.findUnique.mockResolvedValue({ id: 'existing' } as any);

      await expect(service.create(roleData)).rejects.toThrow(ConflictException);
    });

    it('should create role with permissions', async () => {
      const permissions = [
        { id: 'perm-1', name: 'users:read' },
        { id: 'perm-2', name: 'users:write' },
      ];
      const created = {
        id: 'role-1',
        name: 'admin',
        permissions: permissions.map((p) => ({ permission: p })),
      };
      mockPrisma.role.findUnique.mockResolvedValue(null);
      mockPermissionService.getByNames.mockResolvedValue(permissions as any);
      mockPrisma.role.create.mockResolvedValue(created as any);

      const result = await service.create({
        name: 'admin',
        permission_names: ['users:read', 'users:write'],
      });

      expect(result.permissions).toHaveLength(2);
    });
  });

  describe('findById', () => {
    it('should return role when found', async () => {
      const role = { id: 'role-1', name: 'admin', permissions: [] };
      mockPrisma.role.findUnique.mockResolvedValue(role as any);

      const result = await service.findById('role-1');

      expect(result).toEqual(role);
    });

    it('should throw NotFoundException when not found', async () => {
      mockPrisma.role.findUnique.mockResolvedValue(null);

      await expect(service.findById('nonexistent')).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByName', () => {
    it('should return role when found', async () => {
      const role = { id: 'role-1', name: 'admin', permissions: [] };
      mockPrisma.role.findUnique.mockResolvedValue(role as any);

      const result = await service.findByName('admin');

      expect(result).toEqual(role);
    });
  });

  describe('findAll', () => {
    it('should return all roles', async () => {
      const roles = [{ id: '1', name: 'admin' }, { id: '2', name: 'user' }];
      mockPrisma.role.findMany.mockResolvedValue(roles as any);

      const result = await service.findAll();

      expect(result).toEqual(roles);
    });
  });

  describe('update', () => {
    it('should update role successfully', async () => {
      const existing = { id: 'role-1', name: 'admin', is_active: true };
      const updated = { id: 'role-1', name: 'admin', description: 'Updated', is_active: true };
      mockPrisma.role.findUnique.mockResolvedValue(existing as any);
      mockPrisma.role.update.mockResolvedValue(updated as any);

      const result = await service.update('role-1', { description: 'Updated' });

      expect(result.description).toBe('Updated');
    });
  });

  describe('delete', () => {
    it('should delete role and return success message', async () => {
      const role = { id: 'role-1', name: 'admin' };
      mockPrisma.role.findUnique.mockResolvedValue(role as any);
      mockPrisma.role.delete.mockResolvedValue(role as any);

      const result = await service.delete('role-1');

      expect(result).toEqual({ message: 'Role deleted successfully' });
    });
  });

  describe('assignPermissions', () => {
    it('should assign permissions to a role', async () => {
      const role = {
        id: 'role-1',
        name: 'admin',
        permissions: [{ permission_id: 'existing-perm' }],
      };
      const permissions = [
        { id: 'perm-1', name: 'users:read' },
        { id: 'perm-2', name: 'users:write' },
      ];
      mockPrisma.role.findUnique.mockResolvedValue(role as any);
      mockPermissionService.getByNames.mockResolvedValue(permissions as any);
      mockPrisma.rolePermission.createMany.mockResolvedValue({ count: 2 } as any);

      const result = await service.assignPermissions('role-1', ['users:read', 'users:write']);

      expect(mockPrisma.rolePermission.createMany).toHaveBeenCalledWith({
        data: expect.arrayContaining([
          { role_id: 'role-1', permission_id: 'perm-1' },
          { role_id: 'role-1', permission_id: 'perm-2' },
        ]),
        skipDuplicates: true,
      });
    });

    it('should throw NotFoundException when permissions not found', async () => {
      const role = { id: 'role-1', name: 'admin', permissions: [] };
      mockPrisma.role.findUnique.mockResolvedValue(role as any);
      mockPermissionService.getByNames.mockResolvedValue([{ id: 'perm-1', name: 'users:read' }]);

      await expect(
        service.assignPermissions('role-1', ['users:read', 'nonexistent']),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('removePermissions', () => {
    it('should remove permissions from a role', async () => {
      const permissions = [
        { id: 'perm-1', name: 'users:read' },
        { id: 'perm-2', name: 'users:write' },
      ];
      mockPermissionService.getByNames.mockResolvedValue(permissions as any);
      mockPrisma.rolePermission.deleteMany.mockResolvedValue({ count: 2 } as any);
      mockPrisma.role.findUnique.mockResolvedValue({ id: 'role-1', name: 'admin', permissions: [] } as any);

      const result = await service.removePermissions('role-1', ['users:read', 'users:write']);

      expect(mockPrisma.rolePermission.deleteMany).toHaveBeenCalledWith({
        where: {
          role_id: 'role-1',
          permission_id: { in: ['perm-1', 'perm-2'] },
        },
      });
    });
  });
});