import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { UserSecretsService } from './user-secrets.service';
import { PrismaService } from '../prisma/prisma.service';
import { EncryptionService } from '../encryption/encryption.service';

describe('UserSecretsService', () => {
  let service: UserSecretsService;
  let prisma: any;
  let encryption: any;

  const mockSecret = {
    id: 'secret-1',
    name: 'API_KEY',
    description: 'My API key',
    tags: ['api', 'key'],
    secret_type: 'PERSONAL',
    is_active: true,
    created_at: new Date(),
    updated_at: new Date(),
    organization_id: null,
    user_id: 'user-1',
    can_delete: false,
  };

  const mockOrgSecret = {
    id: 'org-secret-1',
    name: 'ORG_API_KEY',
    description: 'Org API key',
    tags: ['org', 'api'],
    secret_type: 'ORGANIZATION',
    is_active: true,
    created_at: new Date(),
    updated_at: new Date(),
    organization_id: 'org-1',
    user_id: 'user-1',
    can_delete: true,
    value: 'encrypted-org-value',
  };

  const mockUser: any = {
    sub: 'user-1',
    email: 'user@example.com',
    first_name: 'Test',
    last_name: 'User',
    organizations: [{ id: 'org-1', role: 'MEMBER', type: 'BUSINESS' }],
  };

  const mockAdminUser: any = {
    sub: 'user-2',
    email: 'admin@example.com',
    first_name: 'Admin',
    last_name: 'User',
    organizations: [{ id: 'org-1', role: 'ADMIN', type: 'BUSINESS' }],
  };

  beforeEach(async () => {
    prisma = {
      user_secret: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
      },
    };

    encryption = {
      encrypt: jest.fn().mockReturnValue('encrypted-value'),
      decrypt: jest.fn().mockReturnValue('decrypted-secret-value'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserSecretsService,
        { provide: PrismaService, useValue: prisma },
        { provide: EncryptionService, useValue: encryption },
      ],
    }).compile();

    service = module.get<UserSecretsService>(UserSecretsService);
  });

  afterEach(() => jest.clearAllMocks());

  describe('create', () => {
    const createDto = {
      name: 'API_KEY',
      value: 'secret-value',
      description: 'My API key',
      tags: ['api', 'key'],
    };

    it('should encrypt value and store with user_id', async () => {
      prisma.user_secret.create.mockResolvedValue(mockSecret);

      const result = await service.create(createDto, 'user-1');

      expect(encryption.encrypt).toHaveBeenCalledWith('secret-value');
      expect(prisma.user_secret.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          user_id: 'user-1',
          organization_id: null,
          name: 'API_KEY',
          value: 'encrypted-value',
          secret_type: 'PERSONAL',
          can_delete: false,
          created_by: 'user-1',
          updated_by: 'user-1',
        }),
        select: expect.any(Object),
      });
      expect(result).toHaveProperty('id');
      expect(result).not.toHaveProperty('value');
    });

    it('should throw ConflictException on duplicate name (P2002)', async () => {
      prisma.user_secret.create.mockRejectedValue({ code: 'P2002' });

      await expect(service.create(createDto, 'user-1')).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('createOrgSecret', () => {
    const createOrgDto = {
      name: 'ORG_API_KEY',
      value: 'org-secret-value',
      organization_id: 'org-1',
      description: 'Org API key',
      tags: ['org', 'api'],
    };

    it('should create org secret for BUSINESS ADMIN', async () => {
      prisma.user_secret.create.mockResolvedValue(mockOrgSecret);

      const result = await service.createOrgSecret(createOrgDto, mockAdminUser);

      expect(result).toHaveProperty('id');
      expect(prisma.user_secret.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          user_id: 'user-2',
          organization_id: 'org-1',
          name: 'ORG_API_KEY',
          secret_type: 'ORGANIZATION',
        }),
        select: expect.any(Object),
      });
    });

    it('should throw NotFoundException if user is not org ADMIN', async () => {
      await expect(
        service.createOrgSecret(createOrgDto, mockUser),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException if org not found in user orgs', async () => {
      const userWithDifferentOrg: any = {
        sub: 'user-3',
        email: 'other@example.com',
        organizations: [{ id: 'other-org', role: 'ADMIN' }],
      };

      await expect(
        service.createOrgSecret(createOrgDto, userWithDifferentOrg),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAllForUser', () => {
    it('PERSONAL user gets only their own personal secrets', async () => {
      const personalUser: any = {
        sub: 'user-personal',
        email: 'personal@example.com',
        organizations: [],
      };

      prisma.user_secret.findMany.mockResolvedValue([mockSecret]);

      const result = await service.findAllForUser(personalUser);

      expect(result.personal).toHaveLength(1);
      expect(result.organization).toHaveLength(0);
      expect(result.as_admin).toHaveLength(0);
    });

    it('BUSINESS ADMIN gets personal secrets of org members + all org secrets', async () => {
      const memberSecret = { ...mockSecret, id: 'member-secret-1', user_id: 'member-1' };
      prisma.user_secret.findMany
        .mockResolvedValueOnce([mockSecret]) // personal
        .mockResolvedValueOnce([mockOrgSecret]) // organization
        .mockResolvedValueOnce([memberSecret]); // as_admin

      const result = await service.findAllForUser(mockAdminUser);

      expect(result.personal).toHaveLength(1);
      expect(result.organization).toHaveLength(1);
      expect(result.as_admin).toHaveLength(1);
      expect(result.as_admin[0]).toHaveProperty('owned_by', 'member-1');
    });

    it('BUSINESS MEMBER gets own personal + all org secrets', async () => {
      prisma.user_secret.findMany
        .mockResolvedValueOnce([mockSecret]) // personal
        .mockResolvedValueOnce([mockOrgSecret]) // organization
        .mockResolvedValueOnce([]); // as_admin

      const result = await service.findAllForUser(mockUser);

      expect(result.personal).toHaveLength(1);
      expect(result.organization).toHaveLength(1);
      expect(result.as_admin).toHaveLength(0);
    });
  });

  describe('findOne', () => {
    it('should return secret metadata if user is owner', async () => {
      prisma.user_secret.findUnique.mockResolvedValue(mockSecret);

      const result = await service.findOne('secret-1', mockUser);

      expect(result).toHaveProperty('id', 'secret-1');
      expect(result).not.toHaveProperty('value');
    });

    it('should throw NotFoundException if secret not found', async () => {
      prisma.user_secret.findUnique.mockResolvedValue(null);

      await expect(service.findOne('nonexistent', mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw NotFoundException if user cannot access secret', async () => {
      const otherUser: any = {
        sub: 'other-user',
        email: 'other@example.com',
        organizations: [],
      };
      prisma.user_secret.findUnique.mockResolvedValue(mockSecret);

      await expect(service.findOne('secret-1', otherUser)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should return secret if user is org member', async () => {
      const orgSecretForUser = {
        ...mockOrgSecret,
        user_id: 'some-other-user',
      };
      prisma.user_secret.findUnique.mockResolvedValue(orgSecretForUser);

      const result = await service.findOne('org-secret-1', mockUser);

      expect(result).toHaveProperty('id');
    });
  });

  describe('getDecryptedValue', () => {
    it('should decrypt and return value if user is owner', async () => {
      prisma.user_secret.findUnique.mockResolvedValue({
        ...mockSecret,
        value: 'encrypted-value',
      });

      const result = await service.getDecryptedValue('secret-1', mockUser);

      expect(encryption.decrypt).toHaveBeenCalledWith('encrypted-value');
      expect(result).toBe('decrypted-secret-value');
    });

    it('should throw NotFoundException if secret not found', async () => {
      prisma.user_secret.findUnique.mockResolvedValue(null);

      await expect(
        service.getDecryptedValue('nonexistent', mockUser),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException if user cannot reveal secret', async () => {
      const otherUser: any = {
        sub: 'other-user',
        email: 'other@example.com',
        organizations: [],
      };
      prisma.user_secret.findUnique.mockResolvedValue(mockSecret);

      await expect(
        service.getDecryptedValue('secret-1', otherUser),
      ).rejects.toThrow(NotFoundException);
    });

    it('should return decrypted value for org member on ORGANIZATION secret', async () => {
      prisma.user_secret.findUnique.mockResolvedValue(mockOrgSecret);

      const result = await service.getDecryptedValue('org-secret-1', mockUser);

      expect(result).toBe('decrypted-secret-value');
    });
  });

  describe('update', () => {
    const updateDto = {
      name: 'NEW_API_KEY',
      description: 'Updated description',
      tags: ['updated'],
    };

    it('should update metadata without re-encrypting if no value provided', async () => {
      const updated = { ...mockSecret, name: 'NEW_API_KEY' };
      prisma.user_secret.findUnique.mockResolvedValue(mockSecret);
      prisma.user_secret.update.mockResolvedValue(updated);

      const result = await service.update('secret-1', updateDto, mockUser);

      expect(result.name).toBe('NEW_API_KEY');
      expect(encryption.encrypt).not.toHaveBeenCalled();
    });

    it('should re-encrypt if value is provided', async () => {
      const updated = { ...mockSecret, value: 'new-encrypted-value' };
      prisma.user_secret.findUnique.mockResolvedValue(mockSecret);
      prisma.user_secret.update.mockResolvedValue(updated);

      await service.update('secret-1', { value: 'new-secret-value' }, mockUser);

      expect(encryption.encrypt).toHaveBeenCalledWith('new-secret-value');
    });

    it('should throw NotFoundException if secret not found', async () => {
      prisma.user_secret.findUnique.mockResolvedValue(null);

      await expect(
        service.update('nonexistent', updateDto, mockUser),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException if user cannot modify secret', async () => {
      const otherUser: any = {
        sub: 'other-user',
        email: 'other@example.com',
        organizations: [],
      };
      prisma.user_secret.findUnique.mockResolvedValue(mockSecret);

      await expect(
        service.update('secret-1', updateDto, otherUser),
      ).rejects.toThrow(NotFoundException);
    });

    it('should allow org ADMIN to update ORGANIZATION secret', async () => {
      const updated = { ...mockOrgSecret, name: 'UPDATED_ORG_KEY' };
      prisma.user_secret.findUnique.mockResolvedValue(mockOrgSecret);
      prisma.user_secret.update.mockResolvedValue(updated);

      const result = await service.update('org-secret-1', updateDto, mockAdminUser);

      expect(result.name).toBe('UPDATED_ORG_KEY');
    });
  });

  describe('remove', () => {
    it('should soft delete personal secret if user is owner', async () => {
      prisma.user_secret.findUnique.mockResolvedValue(mockSecret);
      prisma.user_secret.update.mockResolvedValue({
        ...mockSecret,
        deleted_at: new Date(),
      });

      await service.remove('secret-1', mockUser);

      expect(prisma.user_secret.update).toHaveBeenCalledWith({
        where: { id: 'secret-1' },
        data: {
          deleted_at: expect.any(Date),
          deleted_by: 'user-1',
        },
      });
    });

    it('should throw NotFoundException if secret not found', async () => {
      prisma.user_secret.findUnique.mockResolvedValue(null);

      await expect(service.remove('nonexistent', mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw NotFoundException if user cannot delete secret', async () => {
      const otherUser: any = {
        sub: 'other-user',
        email: 'other@example.com',
        organizations: [],
      };
      prisma.user_secret.findUnique.mockResolvedValue(mockSecret);

      await expect(service.remove('secret-1', otherUser)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should allow org ADMIN to delete ORGANIZATION secret', async () => {
      prisma.user_secret.findUnique.mockResolvedValue(mockOrgSecret);
      prisma.user_secret.update.mockResolvedValue({
        ...mockOrgSecret,
        deleted_at: new Date(),
      });

      await service.remove('org-secret-1', mockAdminUser);

      expect(prisma.user_secret.update).toHaveBeenCalled();
    });

    it('should allow org MEMBER to delete if can_delete is true', async () => {
      prisma.user_secret.findUnique.mockResolvedValue(mockOrgSecret);
      prisma.user_secret.update.mockResolvedValue({
        ...mockOrgSecret,
        deleted_at: new Date(),
      });

      await service.remove('org-secret-1', mockUser);

      expect(prisma.user_secret.update).toHaveBeenCalled();
    });
  });

  describe('findOrgSecrets', () => {
    it('should return org secrets for org member', async () => {
      prisma.user_secret.findMany.mockResolvedValue([mockOrgSecret]);

      const result = await service.findOrgSecrets('org-1', mockUser);

      expect(result).toHaveLength(1);
      expect(prisma.user_secret.findMany).toHaveBeenCalledWith({
        where: {
          organization_id: 'org-1',
          secret_type: 'ORGANIZATION',
          deleted_at: null,
          is_active: true,
        },
        select: expect.any(Object),
      });
    });

    it('should throw NotFoundException if user is not org member', async () => {
      const nonMember: any = {
        sub: 'non-member',
        email: 'nonmember@example.com',
        organizations: [],
      };

      await expect(
        service.findOrgSecrets('org-1', nonMember),
      ).rejects.toThrow(NotFoundException);
    });
  });
});