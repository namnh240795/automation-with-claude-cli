import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

describe('HealthController', () => {
  let controller: HealthController;
  let healthService: HealthService;

  beforeEach(async () => {
    const mockHealthService = {
      check: jest.fn().mockReturnValue({ message: 'Ok' }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        {
          provide: HealthService,
          useValue: mockHealthService,
        },
      ],
    }).compile();

    controller = module.get<HealthController>(HealthController);
    healthService = module.get<HealthService>(HealthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('check', () => {
    it('should call healthService.check and return its result', () => {
      const result = controller.check();
      expect(healthService.check).toHaveBeenCalled();
      expect(result).toEqual({ message: 'Ok' });
    });

    it('should handle different service responses', () => {
      (healthService.check as jest.Mock).mockReturnValueOnce({
        message: 'Healthy',
      });
      const result = controller.check();
      expect(result).toEqual({ message: 'Healthy' });
    });
  });
});
