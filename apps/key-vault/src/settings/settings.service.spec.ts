import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { PrismaService } from '../prisma/prisma.service';
import { SettingType } from '../common/enum';

describe('SettingsService', () => {
  let service: SettingsService;
  let prisma: any;

  const mockSetting = {
    id: 'setting-1',
    service_name: 'auth',
    key: 'SMTP_PASSWORD',
    type: 'SECURE',
    description: 'SMTP server password',
    is_active: true,
    created_at: new Date(),
    created_by: 'user-1',
    updated_at: new Date(),
    updated_by: 'user-1',
    deleted_at: null,
    deleted_by: null,
  };

  beforeEach(async () => {
    prisma = {
      setting: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SettingsService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<SettingsService>(SettingsService);
  });

  afterEach(() => jest.clearAllMocks());

  describe('create', () => {
    it('should create a setting', async () => {
      prisma.setting.create.mockResolvedValue(mockSetting);

      const result = await service.create(
        { service_name: 'auth', key: 'SMTP_PASSWORD', type: SettingType.SECURE, description: 'SMTP server password' },
        'user-1',
      );

      expect(result).toEqual(mockSetting);
      expect(prisma.setting.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          service_name: 'auth',
          key: 'SMTP_PASSWORD',
          type: SettingType.SECURE,
          created_by: 'user-1',
          updated_by: 'user-1',
        }),
        select: expect.any(Object),
      });
    });

    it('should throw ConflictException on duplicate key (P2002)', async () => {
      prisma.setting.create.mockRejectedValue({ code: 'P2002' });

      await expect(
        service.create({ service_name: 'auth', key: 'SMTP_PASSWORD', type: SettingType.SECURE }, 'user-1'),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('findAll', () => {
    it('should return all active settings', async () => {
      prisma.setting.findMany.mockResolvedValue([mockSetting]);

      const result = await service.findAll();

      expect(result).toEqual([mockSetting]);
      expect(prisma.setting.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { deleted_at: null },
        }),
      );
    });

    it('should filter by service_name', async () => {
      prisma.setting.findMany.mockResolvedValue([mockSetting]);

      await service.findAll({ service_name: 'auth' });

      expect(prisma.setting.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { deleted_at: null, service_name: 'auth' },
        }),
      );
    });

    it('should filter by type', async () => {
      prisma.setting.findMany.mockResolvedValue([mockSetting]);

      await service.findAll({ type: SettingType.SECURE });

      expect(prisma.setting.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { deleted_at: null, type: SettingType.SECURE },
        }),
      );
    });

    it('should search by key, description, service_name', async () => {
      prisma.setting.findMany.mockResolvedValue([mockSetting]);

      await service.findAll({ search: 'SMTP' });

      expect(prisma.setting.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            deleted_at: null,
            OR: expect.arrayContaining([
              { key: expect.objectContaining({ contains: 'SMTP' }) },
            ]),
          }),
        }),
      );
    });
  });

  describe('findOne', () => {
    it('should return a setting with its values', async () => {
      const settingWithValues = { ...mockSetting, setting_values: [] };
      prisma.setting.findUnique.mockResolvedValue(settingWithValues);

      const result = await service.findOne('setting-1');

      expect(result).toEqual(settingWithValues);
      expect(result.setting_values).toBeDefined();
    });

    it('should throw NotFoundException when not found', async () => {
      prisma.setting.findUnique.mockResolvedValue(null);

      await expect(service.findOne('nonexistent')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a setting', async () => {
      const updated = { ...mockSetting, description: 'New description' };
      prisma.setting.findUnique.mockResolvedValue(mockSetting);
      prisma.setting.update.mockResolvedValue(updated);

      const result = await service.update('setting-1', { description: 'New description' }, 'user-1');

      expect(result.description).toBe('New description');
      expect(prisma.setting.update).toHaveBeenCalledWith({
        where: { id: 'setting-1' },
        data: { description: 'New description', updated_by: 'user-1' },
        select: expect.any(Object),
      });
    });

    it('should throw NotFoundException when setting not found', async () => {
      prisma.setting.findUnique.mockResolvedValue(null);

      await expect(
        service.update('nonexistent', { description: 'test' }, 'user-1'),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should soft delete a setting', async () => {
      prisma.setting.findUnique.mockResolvedValue(mockSetting);
      prisma.setting.update.mockResolvedValue({
        ...mockSetting,
        deleted_at: new Date(),
        deleted_by: 'user-1',
      });

      await service.remove('setting-1', 'user-1');

      expect(prisma.setting.update).toHaveBeenCalledWith({
        where: { id: 'setting-1' },
        data: {
          deleted_at: expect.any(Date),
          deleted_by: 'user-1',
        },
      });
    });

    it('should throw NotFoundException when setting not found', async () => {
      prisma.setting.findUnique.mockResolvedValue(null);

      await expect(service.remove('nonexistent', 'user-1')).rejects.toThrow(NotFoundException);
    });
  });
});
