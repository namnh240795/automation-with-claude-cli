import { Test, TestingModule } from '@nestjs/testing';
import { JwtAuthGuard, RolesGuard } from '@app/auth-utilities';
import { OAuthAdminController } from './oauth-admin.controller';
import { PermissionService } from './permission.service';
import { RoleService } from './role.service';
import { ClientService } from './client.service';

describe('OAuthAdminController', () => {
  let controller: OAuthAdminController;
  let permissionService: any;
  let roleService: any;
  let clientService: any;

  // Mock permission data
  const mockPermission = {
    id: 'perm-1',
    name: 'users:read',
    description: 'Read users',
    resource: 'users',
    action: 'read',
    created_at: new Date(),
    updated_at: new Date(),
  };

  // Mock role data with permissions relation
  const mockRole = {
    id: 'role-1',
    name: 'developer',
    description: 'Developer role',
    is_active: true,
    created_at: new Date(),
    updated_at: new Date(),
    permissions: [
      {
        permission: { name: 'users:read' },
      },
      {
        permission: { name: 'users:write' },
      },
    ],
  };

  // Mock client RBAC data
  const mockClientRbac = {
    id: 'client-1',
    client_id: 'test-client',
    name: 'Test Client',
    roles: ['developer'],
    permissions: ['users:read', 'users:write'],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OAuthAdminController],
      providers: [
        {
          provide: PermissionService,
          useValue: {
            create: jest.fn(),
            seedDefaults: jest.fn(),
            findAll: jest.fn(),
            findByResource: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: RoleService,
          useValue: {
            create: jest.fn(),
            seedDefaults: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            assignPermissions: jest.fn(),
            removePermissions: jest.fn(),
          },
        },
        {
          provide: ClientService,
          useValue: {
            assignRole: jest.fn(),
            removeRole: jest.fn(),
            getClientWithRbac: jest.fn(),
            updateClientPermissions: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<OAuthAdminController>(OAuthAdminController);
    permissionService = module.get(PermissionService);
    roleService = module.get(RoleService);
    clientService = module.get(ClientService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // ============================================================
  // PERMISSION ENDPOINT TESTS
  // ============================================================

  describe('Permission Endpoints', () => {
    describe('createPermission', () => {
      it('should create a permission', async () => {
        const dto = {
          name: 'users:read',
          description: 'Read users',
          resource: 'users',
          action: 'read',
        };
        permissionService.create.mockResolvedValue(mockPermission);

        const result = await controller.createPermission(dto as any);

        expect(result).toEqual(mockPermission);
        expect(permissionService.create).toHaveBeenCalledWith(dto);
      });
    });

    describe('seedPermissions', () => {
      it('should seed default permissions', async () => {
        const seeded = [{ id: '1', name: 'users:read' }];
        permissionService.seedDefaults.mockResolvedValue(seeded);

        const result = await controller.seedPermissions();

        expect(result).toEqual(seeded);
        expect(permissionService.seedDefaults).toHaveBeenCalled();
      });
    });

    describe('listPermissions', () => {
      it('should list all permissions', async () => {
        const permissions = [mockPermission];
        permissionService.findAll.mockResolvedValue(permissions);

        const result = await controller.listPermissions();

        expect(result).toEqual(permissions);
        expect(permissionService.findAll).toHaveBeenCalled();
      });
    });

    describe('listPermissionsByResource', () => {
      it('should list permissions by resource', async () => {
        const permissions = [mockPermission];
        permissionService.findByResource.mockResolvedValue(permissions);

        const result = await controller.listPermissionsByResource('users');

        expect(result).toEqual(permissions);
        expect(permissionService.findByResource).toHaveBeenCalledWith('users');
      });
    });

    describe('deletePermission', () => {
      it('should delete a permission', async () => {
        permissionService.delete.mockResolvedValue({
          message: 'Permission deleted successfully',
        });

        const result = await controller.deletePermission('perm-1');

        expect(result).toEqual({ message: 'Permission deleted successfully' });
        expect(permissionService.delete).toHaveBeenCalledWith('perm-1');
      });
    });
  });

  // ============================================================
  // ROLE ENDPOINT TESTS
  // ============================================================

  describe('Role Endpoints', () => {
    describe('createRole', () => {
      it('should create a role with mapped permissions', async () => {
        const dto = { name: 'developer', description: 'Developer role' };
        roleService.create.mockResolvedValue(mockRole);

        const result = await controller.createRole(dto as any);

        expect(result).toEqual({
          id: mockRole.id,
          name: mockRole.name,
          description: mockRole.description,
          is_active: mockRole.is_active,
          permissions: ['users:read', 'users:write'],
          created_at: mockRole.created_at,
        });
        expect(roleService.create).toHaveBeenCalledWith(dto);
      });
    });

    describe('seedRoles', () => {
      it('should seed default roles', async () => {
        const seeded = [{ id: '1', name: 'admin' }];
        roleService.seedDefaults.mockResolvedValue(seeded);

        const result = await controller.seedRoles();

        expect(result).toEqual(seeded);
        expect(roleService.seedDefaults).toHaveBeenCalled();
      });
    });

    describe('listRoles', () => {
      it('should list all roles with mapped permissions', async () => {
        roleService.findAll.mockResolvedValue([mockRole]);

        const result = await controller.listRoles();

        expect(result).toEqual([
          {
            id: mockRole.id,
            name: mockRole.name,
            description: mockRole.description,
            is_active: mockRole.is_active,
            permissions: ['users:read', 'users:write'],
            created_at: mockRole.created_at,
          },
        ]);
        expect(roleService.findAll).toHaveBeenCalled();
      });
    });

    describe('getRole', () => {
      it('should get role by id with mapped permissions', async () => {
        roleService.findById.mockResolvedValue(mockRole);

        const result = await controller.getRole('role-1');

        expect(result).toEqual({
          id: mockRole.id,
          name: mockRole.name,
          description: mockRole.description,
          is_active: mockRole.is_active,
          permissions: ['users:read', 'users:write'],
          created_at: mockRole.created_at,
        });
        expect(roleService.findById).toHaveBeenCalledWith('role-1');
      });
    });

    describe('updateRole', () => {
      it('should update a role with mapped permissions', async () => {
        const dto = { name: 'senior-developer', description: 'Updated' };
        roleService.update.mockResolvedValue(mockRole);

        const result = await controller.updateRole('role-1', dto as any);

        expect(result).toEqual({
          id: mockRole.id,
          name: mockRole.name,
          description: mockRole.description,
          is_active: mockRole.is_active,
          permissions: ['users:read', 'users:write'],
          created_at: mockRole.created_at,
        });
        expect(roleService.update).toHaveBeenCalledWith('role-1', dto);
      });
    });

    describe('deleteRole', () => {
      it('should delete a role', async () => {
        roleService.delete.mockResolvedValue({ message: 'Role deleted successfully' });

        const result = await controller.deleteRole('role-1');

        expect(result).toEqual({ message: 'Role deleted successfully' });
        expect(roleService.delete).toHaveBeenCalledWith('role-1');
      });
    });
  });

  // ============================================================
  // ROLE-PERMISSION ASSIGNMENT TESTS
  // ============================================================

  describe('Role-Permission Assignment', () => {
    describe('assignPermissionsToRole', () => {
      it('should assign permissions to a role', async () => {
        const dto = { permission_names: ['users:read', 'users:write'] };
        roleService.assignPermissions.mockResolvedValue(mockRole);

        const result = await controller.assignPermissionsToRole('role-1', dto as any);

        expect(result).toEqual({
          id: mockRole.id,
          name: mockRole.name,
          description: mockRole.description,
          is_active: mockRole.is_active,
          permissions: ['users:read', 'users:write'],
          created_at: mockRole.created_at,
        });
        expect(roleService.assignPermissions).toHaveBeenCalledWith('role-1', dto.permission_names);
      });
    });

    describe('removePermissionsFromRole', () => {
      it('should remove permissions from a role', async () => {
        const dto = { permission_names: ['users:read'] };
        roleService.removePermissions.mockResolvedValue({
          ...mockRole,
          permissions: [{ permission: { name: 'users:write' } }],
        });

        const result = await controller.removePermissionsFromRole('role-1', dto as any);

        expect(result.permissions).toEqual(['users:write']);
        expect(roleService.removePermissions).toHaveBeenCalledWith('role-1', dto.permission_names);
      });
    });
  });

  // ============================================================
  // CLIENT-ROLE ASSIGNMENT TESTS (M2M)
  // ============================================================

  describe('Client-Role Assignment (M2M)', () => {
    describe('assignRoleToClient', () => {
      it('should assign a role to a client', async () => {
        const dto = { role_name: 'developer' };
        clientService.assignRole.mockResolvedValue({
          client_id: 'client-1',
          role_name: 'developer',
          created_at: new Date(),
        });

        const result = await controller.assignRoleToClient('client-1', dto as any);

        expect(result.role_name).toBe('developer');
        expect(clientService.assignRole).toHaveBeenCalledWith('client-1', dto.role_name);
      });
    });

    describe('removeRoleFromClient', () => {
      it('should remove a role from a client', async () => {
        clientService.removeRole.mockResolvedValue({
          message: 'Role removed successfully',
        });

        const result = await controller.removeRoleFromClient('client-1', 'developer');

        expect(result).toEqual({ message: 'Role removed successfully' });
        expect(clientService.removeRole).toHaveBeenCalledWith('client-1', 'developer');
      });
    });

    describe('getClientRbac', () => {
      it('should get client RBAC info', async () => {
        clientService.getClientWithRbac.mockResolvedValue(mockClientRbac);

        const result = await controller.getClientRbac('client-1');

        expect(result).toEqual(mockClientRbac);
        expect(clientService.getClientWithRbac).toHaveBeenCalledWith('client-1');
      });
    });

    describe('updateClientPermissions', () => {
      it('should update client direct permissions', async () => {
        const body = { permissions: ['users:read', 'users:write'] };
        clientService.updateClientPermissions.mockResolvedValue({
          message: 'Permissions updated successfully',
        });

        const result = await controller.updateClientPermissions('client-1', body);

        expect(result).toEqual({ message: 'Permissions updated successfully' });
        expect(clientService.updateClientPermissions).toHaveBeenCalledWith('client-1', body.permissions);
      });
    });
  });
});