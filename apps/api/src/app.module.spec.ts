import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { AppModule } from './app.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppModule', () => {
  let appModule: TestingModule;

  beforeEach(async () => {
    appModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  afterEach(async () => {
    if (appModule) {
      await appModule.close();
    }
  });

  it('should compile the module', async () => {
    // Assert
    expect(appModule).toBeDefined();
    expect(appModule instanceof TestingModule).toBe(true);
  });

  it('should have ConfigModule loaded', () => {
    // Arrange & Act
    const configModule = appModule.get(ConfigModule);

    // Assert
    expect(configModule).toBeDefined();
  });

  it('should have AppController loaded', () => {
    // Arrange & Act
    const appController = appModule.get<AppController>(AppController);

    // Assert
    expect(appController).toBeDefined();
    expect(appController).toBeInstanceOf(AppController);
  });

  it('should have AppService loaded', () => {
    // Arrange & Act
    const appService = appModule.get<AppService>(AppService);

    // Assert
    expect(appService).toBeDefined();
    expect(appService).toBeInstanceOf(AppService);
  });
});
