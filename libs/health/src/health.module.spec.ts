import { Test, TestingModule } from '@nestjs/testing';
import { HealthModule } from './health.module';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

describe('HealthModule', () => {
  let healthModule: TestingModule;

  beforeEach(async () => {
    healthModule = await Test.createTestingModule({
      imports: [HealthModule],
    }).compile();
  });

  afterEach(async () => {
    if (healthModule) {
      await healthModule.close();
    }
  });

  it('should compile the module', async () => {
    // Assert
    expect(healthModule).toBeDefined();
    expect(healthModule instanceof TestingModule).toBe(true);
  });

  it('should have HealthController loaded', () => {
    // Arrange & Act
    const healthController = healthModule.get<HealthController>(HealthController);

    // Assert
    expect(healthController).toBeDefined();
    expect(healthController).toBeInstanceOf(HealthController);
  });

  it('should have HealthService loaded', () => {
    // Arrange & Act
    const healthService = healthModule.get<HealthService>(HealthService);

    // Assert
    expect(healthService).toBeDefined();
    expect(healthService).toBeInstanceOf(HealthService);
  });
});
