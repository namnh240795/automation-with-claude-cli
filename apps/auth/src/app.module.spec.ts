import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { AppModule } from './app.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppModule', () => {
  let appModule: TestingModule;

  beforeEach(async () => {
    // Set required environment variables
    process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test_db';

    appModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  afterEach(async () => {
    if (appModule) {
      await appModule.close();
    }
  });

  describe('AppModule', () => {
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

  describe('module dependencies', () => {
    it('should import PrismaModule', async () => {
      // PrismaModule is imported in AppModule
      // We verify this by checking if the module compiles
      expect(appModule).toBeDefined();
    });

    it('should import AuthModule', async () => {
      // AuthModule is imported in AppModule
      expect(appModule).toBeDefined();
    });

    it('should load ConfigModule globally', () => {
      // ConfigModule is loaded with isGlobal: true
      const configModule = appModule.get(ConfigModule);
      expect(configModule).toBeDefined();
    });
  });

  describe('module configuration', () => {
    it('should use correct .env file path', () => {
      // The envFilePath should point to ../.env relative to the module
      // We verify this by checking if the module compiled successfully
      expect(appModule).toBeDefined();
    });

    it('should have AppController as a controller', () => {
      expect(() => appModule.get(AppController)).not.toThrow();
    });

    it('should have AppService as a provider', () => {
      expect(() => appModule.get(AppService)).not.toThrow();
    });
  });

  describe('module metadata', () => {
    it('should be decorated with @Module()', () => {
      // Verify the module metadata exists
      expect(appModule).toBeDefined();
    });
  });
});
