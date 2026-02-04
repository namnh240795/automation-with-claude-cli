import { Test, TestingModule } from '@nestjs/testing';
import { HealthService } from './health.service';

describe('HealthService', () => {
  let service: HealthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HealthService],
    }).compile();

    service = module.get<HealthService>(HealthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('check', () => {
    it('should return { message: "Ok" }', async () => {
      const result = await service.check();
      expect(result).toEqual({ message: 'Ok' });
    });

    it('should always return an object with a message property', async () => {
      const result = await service.check();
      expect(result).toHaveProperty('message');
      expect(typeof result.message).toBe('string');
    });
  });
});
