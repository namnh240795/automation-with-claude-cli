import { Test, TestingModule } from '@nestjs/testing';
import { UserSecretsController } from './user-secrets.controller';
import { UserSecretsService } from './user-secrets.service';
import { JwtAuthGuard } from '@app/auth-utilities';

describe('UserSecretsController', () => {
  let controller: UserSecretsController;
  let service: UserSecretsService;

  const mockSecret = {
    id: 'secret-1',
    name: 'API_KEY',
    description: 'My API key',
    tags: ['api'],
    secret_type: 'PERSONAL',
    is_active: true,
    created_at: new Date(),
    updated_at: new Date(),
    organization_id: null,
  };

  const mockOrgSecret = {
    id: 'org-secret-1',
    name: 'ORG_API_KEY',
    description: 'Org API key',
    tags: ['org'],
    secret_type: 'ORGANIZATION',
    is_active: true,
    created_at: new Date(),
    updated_at: new Date(),
    organization_id: 'org-1',
  };

  const mockUser: any = {
    sub: 'user-1',
    email: 'user@example.com',
    first_name: 'Test',
    last_name: 'User',
    organizations: [{ id: 'org-1', role: 'MEMBER', type: 'BUSINESS' }],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserSecretsController],
      providers: [
        {
          provide: UserSecretsService,
          useValue: {
            create: jest.fn(),
            createOrgSecret: jest.fn(),
            findAllForUser: jest.fn(),
            findOne: jest.fn(),
            getDecryptedValue: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            findOrgSecrets: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<UserSecretsController>(UserSecretsController);
    service = module.get<UserSecretsService>(UserSecretsService);
  });

  afterEach(() => jest.clearAllMocks());

  describe('create', () => {
    it('should create personal secret', async () => {
      jest.spyOn(service, 'create').mockResolvedValue(mockSecret as any);

      const result = await controller.create(
        { name: 'API_KEY', value: 'secret-value' },
        mockUser as any,
      );

      expect(result).toEqual(mockSecret);
      expect(service.create).toHaveBeenCalledWith(
        { name: 'API_KEY', value: 'secret-value' },
        'user-1',
      );
    });
  });

  describe('createOrgSecret', () => {
    it('should create organization secret for ADMIN', async () => {
      jest.spyOn(service, 'createOrgSecret').mockResolvedValue(mockOrgSecret as any);

      const result = await controller.createOrgSecret(
        { name: 'ORG_API_KEY', value: 'org-value', organization_id: 'org-1' },
        mockUser as any,
      );

      expect(result).toEqual(mockOrgSecret);
      expect(service.createOrgSecret).toHaveBeenCalledWith(
        { name: 'ORG_API_KEY', value: 'org-value', organization_id: 'org-1' },
        mockUser,
      );
    });
  });

  describe('findAll', () => {
    it('should return all accessible secrets', async () => {
      const mockResponse = {
        personal: [mockSecret],
        organization: [mockOrgSecret],
        as_admin: [],
      };
      jest.spyOn(service, 'findAllForUser').mockResolvedValue(mockResponse);

      const result = await controller.findAll(mockUser as any);

      expect(result).toEqual(mockResponse);
      expect(service.findAllForUser).toHaveBeenCalledWith(mockUser);
    });
  });

  describe('findOrgSecrets', () => {
    it('should return organization secrets', async () => {
      jest.spyOn(service, 'findOrgSecrets').mockResolvedValue([mockOrgSecret] as any);

      const result = await controller.findOrgSecrets('org-1', mockUser as any);

      expect(result).toEqual([mockOrgSecret]);
      expect(service.findOrgSecrets).toHaveBeenCalledWith('org-1', mockUser);
    });
  });

  describe('findOne', () => {
    it('should return secret metadata without value', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockSecret as any);

      const result = await controller.findOne('secret-1', undefined, mockUser as any);

      expect(result).toEqual(mockSecret);
      expect(service.findOne).toHaveBeenCalledWith('secret-1', mockUser);
      expect(service.getDecryptedValue).not.toHaveBeenCalled();
    });

    it('should return decrypted value when reveal=true', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockSecret as any);
      jest.spyOn(service, 'getDecryptedValue').mockResolvedValue('decrypted-value');

      const result = await controller.findOne('secret-1', 'true', mockUser as any);

      expect(result).toEqual({ ...mockSecret, value: 'decrypted-value' });
      expect(service.getDecryptedValue).toHaveBeenCalledWith('secret-1', mockUser);
    });
  });

  describe('update', () => {
    it('should update secret', async () => {
      const updated = { ...mockSecret, name: 'UPDATED_KEY' };
      jest.spyOn(service, 'update').mockResolvedValue(updated as any);

      const result = await controller.update(
        'secret-1',
        { name: 'UPDATED_KEY' },
        mockUser as any,
      );

      expect(result.name).toBe('UPDATED_KEY');
      expect(service.update).toHaveBeenCalledWith(
        'secret-1',
        { name: 'UPDATED_KEY' },
        mockUser,
      );
    });
  });

  describe('remove', () => {
    it('should soft delete secret', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(undefined as any);

      await controller.remove('secret-1', mockUser as any);

      expect(service.remove).toHaveBeenCalledWith('secret-1', mockUser);
    });
  });
});