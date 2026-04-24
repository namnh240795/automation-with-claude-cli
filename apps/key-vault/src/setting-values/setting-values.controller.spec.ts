import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { SettingValuesController } from './setting-values.controller';
import { SettingValuesService } from './setting-values.service';

describe('SettingValuesController', () => {
  let controller: SettingValuesController;
  let service: SettingValuesService;

  const mockUser = {
    sub: 'user-1',
    email: 'admin@example.com',
    iat: 1,
    exp: 2,
  };

  const mockValueResponse = {
    id: 'sv-1',
    setting_id: 'setting-1',
    environment_id: 'env-1',
    value: '••••••••',
    version: 1,
    change_reason: 'Initial',
    created_at: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SettingValuesController],
      providers: [
        {
          provide: SettingValuesService,
          useValue: {
            setValue: jest.fn(),
            getValue: jest.fn(),
            getHistory: jest.fn(),
            rollback: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(await import('@app/auth-utilities').then(m => m.JwtAuthGuard))
      .useValue({ canActivate: () => true })
      .overrideGuard(await import('@app/auth-utilities').then(m => m.RolesGuard))
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<SettingValuesController>(SettingValuesController);
    service = module.get<SettingValuesService>(SettingValuesService);
  });

  afterEach(() => jest.clearAllMocks());

  describe('setValue', () => {
    it('should call service with correct params', async () => {
      jest.spyOn(service, 'setValue').mockResolvedValue(mockValueResponse as any);

      const result = await controller.setValue(
        'setting-1', 'env-1',
        { value: 'my-secret', change_reason: 'Initial' },
        mockUser as any,
      );

      expect(service.setValue).toHaveBeenCalledWith(
        'setting-1', 'env-1',
        { value: 'my-secret', change_reason: 'Initial' },
        'user-1',
      );
      expect(result).toEqual(mockValueResponse);
    });
  });

  describe('getValue', () => {
    it('should get value without reveal', async () => {
      jest.spyOn(service, 'getValue').mockResolvedValue(mockValueResponse as any);

      const result = await controller.getValue('setting-1', 'env-1');

      expect(service.getValue).toHaveBeenCalledWith('setting-1', 'env-1', false);
      expect(result.value).toBe('••••••••');
    });

    it('should get value with reveal=true', async () => {
      const revealed = { ...mockValueResponse, value: 'my-secret' };
      jest.spyOn(service, 'getValue').mockResolvedValue(revealed as any);

      const result = await controller.getValue('setting-1', 'env-1', 'true');

      expect(service.getValue).toHaveBeenCalledWith('setting-1', 'env-1', true);
      expect(result.value).toBe('my-secret');
    });

    it('should treat non-"true" reveal as false', async () => {
      jest.spyOn(service, 'getValue').mockResolvedValue(mockValueResponse as any);

      await controller.getValue('setting-1', 'env-1', 'false');

      expect(service.getValue).toHaveBeenCalledWith('setting-1', 'env-1', false);
    });
  });

  describe('getHistory', () => {
    it('should return version history', async () => {
      const history = [
        { ...mockValueResponse, version: 2 },
        { ...mockValueResponse, version: 1 },
      ];
      jest.spyOn(service, 'getHistory').mockResolvedValue(history as any);

      const result = await controller.getHistory('setting-1', 'env-1');

      expect(service.getHistory).toHaveBeenCalledWith('setting-1', 'env-1');
      expect(result).toHaveLength(2);
    });
  });

  describe('rollback', () => {
    it('should call service with parsed version', async () => {
      jest.spyOn(service, 'rollback').mockResolvedValue(mockValueResponse as any);

      const result = await controller.rollback(
        'setting-1', 'env-1', '1',
        mockUser as any,
      );

      expect(service.rollback).toHaveBeenCalledWith(
        'setting-1', 'env-1', 1, 'user-1',
      );
      expect(result).toEqual(mockValueResponse);
    });

    it('should propagate NotFoundException', async () => {
      jest.spyOn(service, 'rollback').mockRejectedValue(
        new NotFoundException('Version 99 not found in history'),
      );

      await expect(
        controller.rollback('setting-1', 'env-1', '99', mockUser as any),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
