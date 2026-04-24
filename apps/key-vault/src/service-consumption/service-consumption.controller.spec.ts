import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { ServiceConsumptionController } from './service-consumption.controller';
import { ServiceConsumptionService } from './service-consumption.service';

describe('ServiceConsumptionController', () => {
  let controller: ServiceConsumptionController;
  let service: ServiceConsumptionService;

  const mockUser = {
    sub: 'service-account',
    email: 'service@example.com',
    iat: 1,
    exp: 2,
  };

  const mockSettingsResponse = {
    service_name: 'auth',
    environment: 'production',
    settings: [
      { key: 'SMTP_HOST', value: 'smtp.mailtrap.io' },
      { key: 'SMTP_PORT', value: '587' },
    ],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceConsumptionController],
      providers: [
        {
          provide: ServiceConsumptionService,
          useValue: {
            getServiceSettings: jest.fn(),
            getSingleSetting: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(
        await import('@app/auth-utilities').then((m) => m.JwtAuthGuard),
      )
      .useValue({ canActivate: () => true })
      .overrideGuard(
        await import('@app/auth-utilities').then((m) => m.RolesGuard),
      )
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<ServiceConsumptionController>(
      ServiceConsumptionController,
    );
    service = module.get<ServiceConsumptionService>(ServiceConsumptionService);
  });

  afterEach(() => jest.clearAllMocks());

  describe('getServiceSettings', () => {
    it('should return all settings for a service', async () => {
      jest
        .spyOn(service, 'getServiceSettings')
        .mockResolvedValue(mockSettingsResponse as any);

      const result = await controller.getServiceSettings(
        'auth',
        'production',
        mockUser as any,
      );

      expect(service.getServiceSettings).toHaveBeenCalledWith(
        'auth',
        'production',
      );
      expect(result.settings).toHaveLength(2);
    });

    it('should throw BadRequestException when environment is missing', async () => {
      jest
        .spyOn(service, 'getServiceSettings')
        .mockRejectedValue(new BadRequestException('Environment required'));

      await expect(
        controller.getServiceSettings('auth', '', mockUser as any),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException for unknown service', async () => {
      jest
        .spyOn(service, 'getServiceSettings')
        .mockRejectedValue(new NotFoundException('No STATIC settings found'));

      await expect(
        controller.getServiceSettings('unknown', 'production', mockUser as any),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('getSingleSetting', () => {
    it('should return a single setting', async () => {
      jest.spyOn(service, 'getSingleSetting').mockResolvedValue({
        key: 'SMTP_HOST',
        value: 'smtp.mailtrap.io',
      });

      const result = await controller.getSingleSetting(
        'auth',
        'SMTP_HOST',
        'production',
        mockUser as any,
      );

      expect(service.getSingleSetting).toHaveBeenCalledWith(
        'auth',
        'SMTP_HOST',
        'production',
      );
      expect(result.value).toBe('smtp.mailtrap.io');
    });

    it('should throw NotFoundException for SECURE setting', async () => {
      jest
        .spyOn(service, 'getSingleSetting')
        .mockRejectedValue(new NotFoundException('Not found'));

      await expect(
        controller.getSingleSetting(
          'auth',
          'SMTP_PASSWORD',
          'production',
          mockUser as any,
        ),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
