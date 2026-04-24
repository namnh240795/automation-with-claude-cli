import { Test, TestingModule } from '@nestjs/testing';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';
import { JwtAuthGuard, RolesGuard } from '@app/auth-utilities';
import { SettingType } from '../common/enum';

describe('SettingsController', () => {
  let controller: SettingsController;
  let service: SettingsService;

  const mockSetting = {
    id: 'setting-1',
    service_name: 'auth',
    key: 'SMTP_PASSWORD',
    type: 'SECURE',
    description: 'SMTP server password',
    is_active: true,
    created_at: new Date(),
    updated_at: new Date(),
  };

  const mockUser = {
    sub: 'user-1',
    email: 'admin@example.com',
    roles: ['SUPER_ADMIN'],
    iat: 1234567890,
    exp: 1234567890,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SettingsController],
      providers: [
        {
          provide: SettingsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<SettingsController>(SettingsController);
    service = module.get<SettingsService>(SettingsService);
  });

  afterEach(() => jest.clearAllMocks());

  describe('create', () => {
    it('should create a setting', async () => {
      jest.spyOn(service, 'create').mockResolvedValue(mockSetting as any);

      const result = await controller.create(
        {
          service_name: 'auth',
          key: 'SMTP_PASSWORD',
          type: SettingType.SECURE,
        },
        mockUser as any,
      );

      expect(result).toEqual(mockSetting);
      expect(service.create).toHaveBeenCalledWith(
        {
          service_name: 'auth',
          key: 'SMTP_PASSWORD',
          type: SettingType.SECURE,
        },
        'user-1',
      );
    });
  });

  describe('findAll', () => {
    it('should return all settings', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([mockSetting] as any);

      const result = await controller.findAll('auth', 'SECURE', 'SMTP');

      expect(result).toEqual([mockSetting]);
      expect(service.findAll).toHaveBeenCalledWith({
        service_name: 'auth',
        type: 'SECURE',
        search: 'SMTP',
      });
    });
  });

  describe('findOne', () => {
    it('should return a setting by ID', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockSetting as any);

      const result = await controller.findOne('setting-1');

      expect(result).toEqual(mockSetting);
      expect(service.findOne).toHaveBeenCalledWith('setting-1');
    });
  });

  describe('update', () => {
    it('should update a setting', async () => {
      const updated = { ...mockSetting, description: 'New' };
      jest.spyOn(service, 'update').mockResolvedValue(updated as any);

      const result = await controller.update(
        'setting-1',
        { description: 'New' },
        mockUser as any,
      );

      expect(result.description).toBe('New');
      expect(service.update).toHaveBeenCalledWith(
        'setting-1',
        { description: 'New' },
        'user-1',
      );
    });
  });

  describe('remove', () => {
    it('should soft delete a setting', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(undefined);

      await controller.remove('setting-1', mockUser as any);

      expect(service.remove).toHaveBeenCalledWith('setting-1', 'user-1');
    });
  });
});
