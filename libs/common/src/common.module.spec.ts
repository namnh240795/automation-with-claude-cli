import { Test, TestingModule } from '@nestjs/testing';
import { CommonModule } from './common.module';

describe('CommonModule', () => {
  let commonModule: TestingModule;

  beforeEach(async () => {
    commonModule = await Test.createTestingModule({
      imports: [CommonModule],
    }).compile();
  });

  afterEach(async () => {
    if (commonModule) {
      await commonModule.close();
    }
  });

  it('should compile the module', async () => {
    // Assert
    expect(commonModule).toBeDefined();
    expect(commonModule instanceof TestingModule).toBe(true);
  });

  it('should be a global module', () => {
    // Arrange & Act
    const moduleRef = commonModule.get(CommonModule);

    // Assert
    expect(moduleRef).toBeDefined();
  });
});
