import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let controller: AppController;
  let service: AppService;

  const mockHelloResponse = {
    message: 'Hello from Auth!',
    timestamp: new Date(),
    requestId: '550e8400-e29b-41d4-a716-446655440000',
  };

  const mockHealthResponse = {
    status: 'ok',
    timestamp: new Date(),
    service: 'auth',
    version: '1.0.0',
    uptime: 123.456,
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            getHello: jest.fn().mockReturnValue(mockHelloResponse),
            getHealth: jest.fn().mockReturnValue(mockHealthResponse),
          },
        },
      ],
    }).compile();

    controller = app.get<AppController>(AppController);
    service = app.get<AppService>(AppService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('AppController', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });
  });

  describe('getHello', () => {
    it('should return a greeting message', () => {
      // Arrange
      jest.spyOn(service, 'getHello').mockReturnValue(mockHelloResponse);

      // Act
      const result = controller.getHello();

      // Assert
      expect(result).toEqual(mockHelloResponse);
      expect(service.getHello).toHaveBeenCalled();
    });

    it('should call AppService.getHello once', () => {
      // Arrange
      jest.spyOn(service, 'getHello').mockReturnValue(mockHelloResponse);

      // Act
      controller.getHello();

      // Assert
      expect(service.getHello).toHaveBeenCalledTimes(1);
    });

    it('should return HelloResponseDto with message, timestamp, and requestId', () => {
      // Arrange
      jest.spyOn(service, 'getHello').mockReturnValue(mockHelloResponse);

      // Act
      const result = controller.getHello();

      // Assert
      expect(result).toHaveProperty('message');
      expect(result).toHaveProperty('timestamp');
      expect(result).toHaveProperty('requestId');
    });
  });

  describe('healthCheck', () => {
    it('should return health status', () => {
      // Arrange
      jest.spyOn(service, 'getHealth').mockReturnValue(mockHealthResponse);

      // Act
      const result = controller.healthCheck();

      // Assert
      expect(result).toEqual(mockHealthResponse);
      expect(result).toHaveProperty('status', 'ok');
      expect(result).toHaveProperty('timestamp');
      expect(result).toHaveProperty('service', 'auth');
      expect(result).toHaveProperty('version');
      expect(result).toHaveProperty('uptime');
    });

    it('should call AppService.getHealth once', () => {
      // Arrange
      jest.spyOn(service, 'getHealth').mockReturnValue(mockHealthResponse);

      // Act
      controller.healthCheck();

      // Assert
      expect(service.getHealth).toHaveBeenCalledTimes(1);
    });

    it('should return status as ok', () => {
      // Arrange
      jest.spyOn(service, 'getHealth').mockReturnValue(mockHealthResponse);

      // Act
      const result = controller.healthCheck();

      // Assert
      expect(result.status).toBe('ok');
    });

    it('should return uptime as number', () => {
      // Arrange
      jest.spyOn(service, 'getHealth').mockReturnValue(mockHealthResponse);

      // Act
      const result = controller.healthCheck();

      // Assert
      expect(typeof result.uptime).toBe('number');
      expect(result.uptime).toBeGreaterThanOrEqual(0);
    });

    it('should return service name as auth', () => {
      // Arrange
      jest.spyOn(service, 'getHealth').mockReturnValue(mockHealthResponse);

      // Act
      const result = controller.healthCheck();

      // Assert
      expect(result.service).toBe('auth');
    });
  });

  describe('endpoint paths and methods', () => {
    it('should have GET / endpoint', () => {
      expect(controller.getHello).toBeDefined();
    });

    it('should have GET /health endpoint', () => {
      expect(controller.healthCheck).toBeDefined();
    });
  });

  describe('DTO responses', () => {
    it('should return HelloResponseDto from getHello', () => {
      // Arrange
      jest.spyOn(service, 'getHello').mockReturnValue(mockHelloResponse);

      // Act
      const result = controller.getHello();

      // Assert
      expect(result).toMatchObject({
        message: expect.any(String),
        timestamp: expect.any(Date),
        requestId: expect.any(String),
      });
    });

    it('should return HealthResponseDto from healthCheck', () => {
      // Arrange
      jest.spyOn(service, 'getHealth').mockReturnValue(mockHealthResponse);

      // Act
      const result = controller.healthCheck();

      // Assert
      expect(result).toMatchObject({
        status: expect.any(String),
        timestamp: expect.any(Date),
        service: expect.any(String),
        version: expect.any(String),
        uptime: expect.any(Number),
      });
    });
  });
});
