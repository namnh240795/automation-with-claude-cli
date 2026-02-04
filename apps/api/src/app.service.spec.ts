import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('AppService', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('getHello', () => {
    it('should return a greeting message object', () => {
      // Act
      const result = service.getHello();

      // Assert
      expect(result).toBeInstanceOf(Object);
    });

    it('should return message property with correct value', () => {
      // Act
      const result = service.getHello();

      // Assert
      expect(result).toHaveProperty('message');
      expect(result.message).toBe('Hello from NestJS with Fastify!');
    });

    it('should return message as string', () => {
      // Act
      const result = service.getHello();

      // Assert
      expect(typeof result.message).toBe('string');
    });

    it('should return correct message structure', () => {
      // Act
      const result = service.getHello();

      // Assert
      expect(result).toEqual({
        message: 'Hello from NestJS with Fastify!',
      });
    });
  });
});
