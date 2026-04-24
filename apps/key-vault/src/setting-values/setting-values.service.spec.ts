import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { SettingValuesService } from './setting-values.service';
import { PrismaService } from '../prisma/prisma.service';
import { EncryptionService } from '../encryption/encryption.service';
import { SettingType } from '../common/enum';

describe('SettingValuesService', () => {
  let service: SettingValuesService;
  let prisma: any;
  let encryptionService: EncryptionService;

  const mockSetting = {
    id: 'setting-1',
    service_name: 'auth',
    key: 'SMTP_PASSWORD',
    type: SettingType.SECURE,
    deleted_at: null,
  };

  const mockStaticSetting = {
    id: 'setting-2',
    service_name: 'auth',
    key: 'SMTP_HOST',
    type: SettingType.STATIC,
    deleted_at: null,
  };

  const mockEnvironment = {
    id: 'env-1',
    name: 'production',
    deleted_at: null,
  };

  beforeEach(async () => {
    prisma = {
      setting: { findUnique: jest.fn() },
      environment: { findUnique: jest.fn() },
      setting_value: { findFirst: jest.fn(), delete: jest.fn(), create: jest.fn() },
      setting_value_history: { create: jest.fn(), findFirst: jest.fn(), findMany: jest.fn() },
      $transaction: jest.fn((fn) => fn({
        setting_value: { delete: jest.fn(), create: jest.fn() },
        setting_value_history: { create: jest.fn() },
      })),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SettingValuesService,
        { provide: PrismaService, useValue: prisma },
        {
          provide: EncryptionService,
          useValue: new EncryptionService({
            get: () => 'a'.repeat(64),
          } as any),
        },
      ],
    }).compile();

    service = module.get<SettingValuesService>(SettingValuesService);
    encryptionService = module.get<EncryptionService>(EncryptionService);
  });

  afterEach(() => jest.clearAllMocks());

  describe('setValue', () => {
    it('should create version 1 on first set', async () => {
      prisma.setting.findUnique.mockResolvedValue(mockSetting);
      prisma.environment.findUnique.mockResolvedValue(mockEnvironment);
      prisma.setting_value.findFirst.mockResolvedValue(null);
      prisma.$transaction.mockImplementation(async (fn) => {
        const tx = {
          setting_value_history: { create: jest.fn() },
          setting_value: { delete: jest.fn(), create: jest.fn().mockResolvedValue({
            id: 'sv-1', setting_id: 'setting-1', environment_id: 'env-1',
            value: 'encrypted-value', version: 1, change_reason: 'Initial', created_at: new Date(),
          }) },
        };
        return fn(tx);
      });

      const result = await service.setValue('setting-1', 'env-1', {
        value: 'my-secret', change_reason: 'Initial',
      }, 'user-1');

      expect(result.version).toBe(1);
      expect(result.value).toBe('••••••••'); // Masked
    });

    it('should increment version and archive on subsequent set', async () => {
      prisma.setting.findUnique.mockResolvedValue(mockSetting);
      prisma.environment.findUnique.mockResolvedValue(mockEnvironment);
      prisma.setting_value.findFirst.mockResolvedValue({
        id: 'sv-1', setting_id: 'setting-1', environment_id: 'env-1',
        value: 'old-encrypted', version: 1, change_reason: null, created_by: 'user-1',
      });
      prisma.$transaction.mockImplementation(async (fn) => {
        const tx = {
          setting_value_history: { create: jest.fn() },
          setting_value: {
            delete: jest.fn(),
            create: jest.fn().mockResolvedValue({
              id: 'sv-2', setting_id: 'setting-1', environment_id: 'env-1',
              value: 'new-encrypted', version: 2, change_reason: 'Rotated', created_at: new Date(),
            }),
          },
        };
        return fn(tx);
      });

      const result = await service.setValue('setting-1', 'env-1', {
        value: 'new-secret', change_reason: 'Rotated',
      }, 'user-1');

      expect(result.version).toBe(2);
    });

    it('should NOT encrypt STATIC values', async () => {
      prisma.setting.findUnique.mockResolvedValue(mockStaticSetting);
      prisma.environment.findUnique.mockResolvedValue(mockEnvironment);
      prisma.setting_value.findFirst.mockResolvedValue(null);
      prisma.$transaction.mockImplementation(async (fn) => {
        const tx = {
          setting_value_history: { create: jest.fn() },
          setting_value: { delete: jest.fn(), create: jest.fn().mockResolvedValue({
            id: 'sv-3', setting_id: 'setting-2', environment_id: 'env-1',
            value: 'smtp.mailtrap.io', version: 1, change_reason: null, created_at: new Date(),
          }) },
        };
        return fn(tx);
      });

      const result = await service.setValue('setting-2', 'env-1', {
        value: 'smtp.mailtrap.io',
      }, 'user-1');

      expect(result.value).toBe('smtp.mailtrap.io'); // Not masked
    });

    it('should throw NotFoundException if setting not found', async () => {
      prisma.setting.findUnique.mockResolvedValue(null);

      await expect(
        service.setValue('nonexistent', 'env-1', { value: 'test' }, 'user-1'),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException if environment not found', async () => {
      prisma.setting.findUnique.mockResolvedValue(mockSetting);
      prisma.environment.findUnique.mockResolvedValue(null);

      await expect(
        service.setValue('setting-1', 'nonexistent', { value: 'test' }, 'user-1'),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('getValue', () => {
    it('should mask SECURE values by default', async () => {
      prisma.setting.findUnique.mockResolvedValue(mockSetting);
      prisma.setting_value.findFirst.mockResolvedValue({
        id: 'sv-1', setting_id: 'setting-1', environment_id: 'env-1',
        value: encryptionService.encrypt('secret'), version: 1, change_reason: null, created_at: new Date(),
      });

      const result = await service.getValue('setting-1', 'env-1');

      expect(result.value).toBe('••••••••');
    });

    it('should decrypt SECURE values when reveal=true', async () => {
      const plaintext = 'my-decrypted-secret';
      const encrypted = encryptionService.encrypt(plaintext);
      prisma.setting.findUnique.mockResolvedValue(mockSetting);
      prisma.setting_value.findFirst.mockResolvedValue({
        id: 'sv-1', setting_id: 'setting-1', environment_id: 'env-1',
        value: encrypted, version: 1, change_reason: null, created_at: new Date(),
      });

      const result = await service.getValue('setting-1', 'env-1', true);

      expect(result.value).toBe(plaintext);
    });

    it('should return STATIC values as-is', async () => {
      prisma.setting.findUnique.mockResolvedValue(mockStaticSetting);
      prisma.setting_value.findFirst.mockResolvedValue({
        id: 'sv-2', setting_id: 'setting-2', environment_id: 'env-1',
        value: 'smtp.mailtrap.io', version: 1, change_reason: null, created_at: new Date(),
      });

      const result = await service.getValue('setting-2', 'env-1');

      expect(result.value).toBe('smtp.mailtrap.io');
    });

    it('should throw NotFoundException if no value exists', async () => {
      prisma.setting.findUnique.mockResolvedValue(mockSetting);
      prisma.setting_value.findFirst.mockResolvedValue(null);

      await expect(
        service.getValue('setting-1', 'env-1'),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('getHistory', () => {
    it('should return version history with masked SECURE values', async () => {
      prisma.setting.findUnique.mockResolvedValue(mockSetting);
      prisma.setting_value_history.findMany.mockResolvedValue([
        { id: 'h-1', setting_id: 'setting-1', environment_id: 'env-1',
          value: 'encrypted1', version: 1, change_reason: 'Initial', created_at: new Date() },
        { id: 'h-2', setting_id: 'setting-1', environment_id: 'env-1',
          value: 'encrypted2', version: 2, change_reason: 'Rotated', created_at: new Date() },
      ]);

      const result = await service.getHistory('setting-1', 'env-1');

      expect(result).toHaveLength(2);
      expect(result[0].value).toBe('••••••••');
      expect(result[1].value).toBe('••••••••');
    });
  });

  describe('rollback', () => {
    it('should throw NotFoundException if target version not in history', async () => {
      prisma.setting.findUnique.mockResolvedValue(mockSetting);
      prisma.setting_value_history.findFirst.mockResolvedValue(null);

      await expect(
        service.rollback('setting-1', 'env-1', 99, 'user-1'),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
