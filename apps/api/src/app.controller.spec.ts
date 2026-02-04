import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('AppController', () => {
    it('should be defined', () => {
      expect(appController).toBeDefined();
    });
  });

  describe('getHello', () => {
    it('should return a greeting message', () => {
      // Arrange
      const expectedMessage = { message: 'Hello from NestJS with Fastify!' };
      jest.spyOn(appService, 'getHello').mockReturnValue(expectedMessage);

      // Act
      const result = appController.getHello();

      // Assert
      expect(result).toEqual(expectedMessage);
      expect(appService.getHello).toHaveBeenCalled();
    });

    it('should call AppService.getHello once', () => {
      // Arrange
      const expectedMessage = { message: 'Hello from NestJS with Fastify!' };
      jest.spyOn(appService, 'getHello').mockReturnValue(expectedMessage);

      // Act
      appController.getHello();

      // Assert
      expect(appService.getHello).toHaveBeenCalledTimes(1);
    });
  });

  describe('healthCheck', () => {
    it('should return health status', () => {
      // Act
      const result = appController.healthCheck();

      // Assert
      expect(result).toHaveProperty('status', 'ok');
      expect(result).toHaveProperty('timestamp');
      expect(typeof result.timestamp).toBe('string');
    });

    it('should return valid ISO timestamp', () => {
      // Act
      const result = appController.healthCheck();

      // Assert
      const date = new Date(result.timestamp);
      expect(date.toISOString()).toBe(result.timestamp);
    });

    it('should return status ok', () => {
      // Act
      const result = appController.healthCheck();

      // Assert
      expect(result.status).toBe('ok');
    });
  });
});
