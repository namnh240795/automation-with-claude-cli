import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { KeycloakUserInfo } from '@app/keycloak-integration';

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
  let configService: ConfigService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = app.get<AppService>(AppService);
    configService = app.get<ConfigService>(ConfigService);
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
      expect(result.message).toBe('Hello from API!');
    });

    it('should return timestamp as Date object', () => {
      // Act
      const result = service.getHello();

      // Assert
      expect(result).toHaveProperty('timestamp');
      expect(result.timestamp).toBeInstanceOf(Date);
    });

    it('should return request_id as UUID string', () => {
      // Act
      const result = service.getHello();

      // Assert
      expect(result).toHaveProperty('request_id');
      expect(typeof result.request_id).toBe('string');
      expect(result.request_id).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
      );
    });

    it('should return correct response structure', () => {
      // Act
      const result = service.getHello();

      // Assert
      expect(result).toEqual({
        message: 'Hello from API!',
        timestamp: expect.any(Date),
        request_id: expect.any(String),
      });
    });

    it('should generate unique request IDs', () => {
      // Act
      const result1 = service.getHello();
      const result2 = service.getHello();

      // Assert
      expect(result1.request_id).not.toBe(result2.request_id);
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

    it('should return service name as "backend"', () => {
      // Act
      const result = service.getHealth();

      // Assert
      expect(result).toHaveProperty('service');
      expect(result.service).toBe('backend');
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
        service: 'backend',
        version: '1.0.0',
        uptime: expect.any(Number),
      });
    });
  });

  describe('getUserInfo', () => {
    const mockKeycloakUser: KeycloakUserInfo = {
      sub: '123e4567-e89b-12d3-a456-426614174000',
      email: 'test@example.com',
      email_verified: true,
      given_name: 'John',
      family_name: 'Doe',
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600,
      iss: 'http://localhost:8080/realms/app-realm',
      aud: 'app-client',
    };

    it('should return a UserInfoResponseDto object', () => {
      // Act
      const result = service.getUserInfo(mockKeycloakUser);

      // Assert
      expect(result).toBeInstanceOf(Object);
    });

    it('should return user sub from JWT payload', () => {
      // Act
      const result = service.getUserInfo(mockKeycloakUser);

      // Assert
      expect(result).toHaveProperty('sub');
      expect(result.sub).toBe(mockKeycloakUser.sub);
    });

    it('should return user email from JWT payload', () => {
      // Act
      const result = service.getUserInfo(mockKeycloakUser);

      // Assert
      expect(result).toHaveProperty('email');
      expect(result.email).toBe(mockKeycloakUser.email);
    });

    it('should return first_name from Keycloak user info', () => {
      // Act
      const result = service.getUserInfo(mockKeycloakUser);

      // Assert
      expect(result).toHaveProperty('first_name');
      expect(result.first_name).toBe(mockKeycloakUser.given_name);
    });

    it('should return last_name from Keycloak user info', () => {
      // Act
      const result = service.getUserInfo(mockKeycloakUser);

      // Assert
      expect(result).toHaveProperty('last_name');
      expect(result.last_name).toBe(mockKeycloakUser.family_name);
    });

    it('should return success message', () => {
      // Act
      const result = service.getUserInfo(mockKeycloakUser);

      // Assert
      expect(result).toHaveProperty('message');
      expect(result.message).toBe('This is a protected endpoint - you have access!');
    });

    it('should return timestamp as Date object', () => {
      // Act
      const result = service.getUserInfo(mockKeycloakUser);

      // Assert
      expect(result).toHaveProperty('timestamp');
      expect(result.timestamp).toBeInstanceOf(Date);
    });

    it('should return correct response structure', () => {
      // Act
      const result = service.getUserInfo(mockKeycloakUser);

      // Assert
      expect(result).toMatchObject({
        sub: mockKeycloakUser.sub,
        email: mockKeycloakUser.email,
        first_name: mockKeycloakUser.given_name,
        last_name: mockKeycloakUser.family_name,
        message: 'This is a protected endpoint - you have access!',
      });
      expect(result.timestamp).toBeInstanceOf(Date);
    });

    it('should handle Keycloak user info with optional fields as undefined', () => {
      // Arrange
      const payloadWithoutOptional: KeycloakUserInfo = {
        sub: '123e4567-e89b-12d3-a456-426614174000',
        email: 'test@example.com',
        email_verified: false,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600,
        iss: 'http://localhost:8080/realms/app-realm',
        aud: 'app-client',
      };

      // Act
      const result = service.getUserInfo(payloadWithoutOptional);

      // Assert
      expect(result.first_name).toBeUndefined();
      expect(result.last_name).toBeUndefined();
    });

    it('should generate unique timestamps for each call', () => {
      // Act
      jest.useFakeTimers();
      const result1 = service.getUserInfo(mockKeycloakUser);
      jest.advanceTimersByTime(100);
      const result2 = service.getUserInfo(mockKeycloakUser);
      jest.useRealTimers();

      // Assert
      expect(result1.timestamp).not.toEqual(result2.timestamp);
    });
  });
});
