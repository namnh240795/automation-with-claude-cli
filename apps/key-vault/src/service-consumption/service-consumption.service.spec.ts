import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { ServiceConsumptionService } from './service-consumption.service';
import { PrismaService } from '../prisma/prisma.service';
import { SettingType } from '../common/enum';

describe('ServiceConsumptionService', () => {
  let service: ServiceConsumptionService;
  let prisma: any;

  const mockStaticSettings = [
    {
      id: 's-1',
      service_name: 'auth',
      key: 'SMTP_HOST',
      type: SettingType.STATIC,
      setting_values: [{ value: 'smtp.mailtrap.io' }],
    },
    {
      id: 's-2',
      service_name: 'auth',
      key: 'SMTP_PORT',
      type: SettingType.STATIC,
      setting_values: [{ value: '587' }],
    },
  ];

  beforeEach(async () => {
    prisma = {
      setting: { findMany: jest.fn() },
      environment: { findFirst: jest.fn() },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServiceConsumptionService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<ServiceConsumptionService>(ServiceConsumptionService);
  });

  afterEach(() => jest.clearAllMocks());

  describe('getServiceSettings', () => {
    it('should return only STATIC settings for a service', async () => {
      prisma.environment.findFirst.mockResolvedValue({ id: 'env-1', name: 'production' });
      prisma.setting.findMany.mockResolvedValue(mockStaticSettings);

      const result = await service.getServiceSettings('auth', 'production');

      expect(result.service_name).toBe('auth');
      expect(result.environment).toBe('production');
      expect(result.settings).toHaveLength(2);
      expect(result.settings[0]).toEqual({ key: 'SMTP_HOST', value: 'smtp.mailtrap.io' });
      expect(result.settings[1]).toEqual({ key: 'SMTP_PORT', value: '587' });
    });

    it('should throw BadRequestException if environment is missing', async () => {
      await expect(
        service.getServiceSettings('auth', ''),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException if environment not found', async () => {
      prisma.environment.findFirst.mockResolvedValue(null);

      await expect(
        service.getServiceSettings('auth', 'nonexistent'),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException if no settings found', async () => {
      prisma.environment.findFirst.mockResolvedValue({ id: 'env-1', name: 'production' });
      prisma.setting.findMany.mockResolvedValue([]);

      await expect(
        service.getServiceSettings('unknown-service', 'production'),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('getSingleSetting', () => {
    it('should return a single STATIC setting value', async () => {
      prisma.environment.findFirst.mockResolvedValue({ id: 'env-1', name: 'production' });
      prisma.setting.findMany.mockResolvedValue([
        {
          id: 's-1',
          service_name: 'auth',
          key: 'SMTP_HOST',
          type: SettingType.STATIC,
          setting_values: [{ value: 'smtp.mailtrap.io' }],
        },
      ]);

      const result = await service.getSingleSetting('auth', 'SMTP_HOST', 'production');

      expect(result).toEqual({ key: 'SMTP_HOST', value: 'smtp.mailtrap.io' });
    });

    it('should throw BadRequestException if environment is missing', async () => {
      await expect(
        service.getSingleSetting('auth', 'SMTP_HOST', ''),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException if setting not found', async () => {
      prisma.environment.findFirst.mockResolvedValue({ id: 'env-1', name: 'production' });
      prisma.setting.findMany.mockResolvedValue([]);

      await expect(
        service.getSingleSetting('auth', 'UNKNOWN_KEY', 'production'),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException for SECURE setting', async () => {
      prisma.environment.findFirst.mockResolvedValue({ id: 'env-1', name: 'production' });
      prisma.setting.findMany.mockResolvedValue([
        {
          id: 's-3',
          service_name: 'auth',
          key: 'SMTP_PASSWORD',
          type: SettingType.SECURE,
          setting_values: [{ value: 'encrypted' }],
        },
      ]);

      await expect(
        service.getSingleSetting('auth', 'SMTP_PASSWORD', 'production'),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
