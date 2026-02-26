import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { HelloResponseDto, HealthResponseDto } from './dto';

// Mock the logger decorator to reduce console spam
jest.mock('@app/app-logger', () => ({
  LogActivity: () => {
    return function (
      target: any,
      propertyKey: string,
      descriptor: PropertyDescriptor
    ) {
      const originalMethod = descriptor.value;
      descriptor.value = function (...args: any[]) {
        return originalMethod.apply(this, args);
      };
      return descriptor;
    };
  },
}));

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
    it('should return a HelloResponseDto object', () => {
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
      expect(result.message).toBe('Hello from Auth!');
    });

    it('should return timestamp as Date object', () => {
      // Act
      const result = service.getHello();

      // Assert
      expect(result).toHaveProperty('timestamp');
      expect(result.timestamp).toBeInstanceOf(Date);
    });

    it('should return requestId as UUID string', () => {
      // Act
      const result = service.getHello();

      // Assert
      expect(result).toHaveProperty('requestId');
      expect(typeof result.requestId).toBe('string');
      expect(result.requestId).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
      );
    });

    it('should return correct response structure', () => {
      // Act
      const result = service.getHello();

      // Assert
      expect(result).toEqual({
        message: 'Hello from Auth!',
        timestamp: expect.any(Date),
        requestId: expect.any(String),
      });
    });

    it('should generate unique request IDs', () => {
      // Act
      const result1 = service.getHello();
      const result2 = service.getHello();

      // Assert
      expect(result1.requestId).not.toBe(result2.requestId);
    });
  });

  describe('getHealth', () => {
    it('should return a HealthResponseDto object', () => {
      // Act
      const result = service.getHealth();

      // Assert
      expect(result).toBeInstanceOf(Object);
    });

    it('should return status property with value "ok"', () => {
      // Act
      const result = service.getHealth();

      // Assert
      expect(result).toHaveProperty('status');
      expect(result.status).toBe('ok');
    });

    it('should return timestamp as Date object', () => {
      // Act
      const result = service.getHealth();

      // Assert
      expect(result).toHaveProperty('timestamp');
      expect(result.timestamp).toBeInstanceOf(Date);
    });

    it('should return service name as "auth"', () => {
      // Act
      const result = service.getHealth();

      // Assert
      expect(result).toHaveProperty('service');
      expect(result.service).toBe('auth');
    });

    it('should return version as string', () => {
      // Act
      const result = service.getHealth();

      // Assert
      expect(result).toHaveProperty('version');
      expect(typeof result.version).toBe('string');
      expect(result.version).toBe('1.0.0');
    });

    it('should return uptime as number', () => {
      // Act
      const result = service.getHealth();

      // Assert
      expect(result).toHaveProperty('uptime');
      expect(typeof result.uptime).toBe('number');
      expect(result.uptime).toBeGreaterThanOrEqual(0);
    });

    it('should return correct response structure', () => {
      // Act
      const result = service.getHealth();

      // Assert
      expect(result).toEqual({
        status: 'ok',
        timestamp: expect.any(Date),
        service: 'auth',
        version: '1.0.0',
        uptime: expect.any(Number),
      });
    });

    it('should return uptime from process.uptime()', () => {
      // Arrange - capture uptime before and after to get a range
      const uptimeBefore = process.uptime();

      // Act
      const result = service.getHealth();

      const uptimeAfter = process.uptime();

      // Assert - uptime should be between the two captured values
      expect(result.uptime).toBeGreaterThanOrEqual(uptimeBefore);
      expect(result.uptime).toBeLessThanOrEqual(uptimeAfter);
    });
  });
});
