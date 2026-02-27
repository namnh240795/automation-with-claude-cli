import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KeycloakUserInfo, KeycloakAuthGuard } from '@app/keycloak-integration';

// Mock guard to avoid dependency resolution issues in tests
class MockKeycloakAuthGuard {
  canActivate() {
    return true;
  }
}

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  const mockHelloResponse = {
    message: 'Hello from API!',
    timestamp: new Date(),
    request_id: '550e8400-e29b-41d4-a716-446655440000',
  };

  const mockHealthResponse = {
    status: 'ok',
    timestamp: new Date(),
    service: 'backend',
    version: '1.0.0',
    uptime: 123.456,
  };

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

  const mockUserInfoResponse = {
    sub: mockKeycloakUser.sub,
    email: mockKeycloakUser.email,
    first_name: mockKeycloakUser.given_name,
    last_name: mockKeycloakUser.family_name,
    message: 'This is a protected endpoint - you have access!',
    timestamp: new Date(),
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
            getUserInfo: jest.fn().mockReturnValue(mockUserInfoResponse),
          },
        },
        {
          provide: KeycloakAuthGuard,
          useClass: MockKeycloakAuthGuard,
        },
      ],
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
      jest.spyOn(appService, 'getHello').mockReturnValue(mockHelloResponse);

      // Act
      const result = appController.getHello();

      // Assert
      expect(result).toEqual(mockHelloResponse);
      expect(appService.getHello).toHaveBeenCalled();
    });

    it('should call AppService.getHello once', () => {
      // Arrange
      jest.spyOn(appService, 'getHello').mockReturnValue(mockHelloResponse);

      // Act
      appController.getHello();

      // Assert
      expect(appService.getHello).toHaveBeenCalledTimes(1);
    });

    it('should return HelloResponseDto with message, timestamp, and request_id', () => {
      // Arrange
      jest.spyOn(appService, 'getHello').mockReturnValue(mockHelloResponse);

      // Act
      const result = appController.getHello();

      // Assert
      expect(result).toHaveProperty('message');
      expect(result).toHaveProperty('timestamp');
      expect(result).toHaveProperty('request_id');
    });
  });

  describe('healthCheck', () => {
    it('should return health status', () => {
      // Arrange
      jest.spyOn(appService, 'getHealth').mockReturnValue(mockHealthResponse);

      // Act
      const result = appController.healthCheck();

      // Assert
      expect(result).toEqual(mockHealthResponse);
      expect(result).toHaveProperty('status', 'ok');
      expect(result).toHaveProperty('timestamp');
      expect(result).toHaveProperty('service', 'backend');
      expect(result).toHaveProperty('version');
      expect(result).toHaveProperty('uptime');
    });

    it('should call AppService.getHealth once', () => {
      // Arrange
      jest.spyOn(appService, 'getHealth').mockReturnValue(mockHealthResponse);

      // Act
      appController.healthCheck();

      // Assert
      expect(appService.getHealth).toHaveBeenCalledTimes(1);
    });

    it('should return status as ok', () => {
      // Arrange
      jest.spyOn(appService, 'getHealth').mockReturnValue(mockHealthResponse);

      // Act
      const result = appController.healthCheck();

      // Assert
      expect(result.status).toBe('ok');
    });

    it('should return uptime as number', () => {
      // Arrange
      jest.spyOn(appService, 'getHealth').mockReturnValue(mockHealthResponse);

      // Act
      const result = appController.healthCheck();

      // Assert
      expect(typeof result.uptime).toBe('number');
      expect(result.uptime).toBeGreaterThanOrEqual(0);
    });

    it('should return service name as backend', () => {
      // Arrange
      jest.spyOn(appService, 'getHealth').mockReturnValue(mockHealthResponse);

      // Act
      const result = appController.healthCheck();

      // Assert
      expect(result.service).toBe('backend');
    });
  });

  describe('getUserInfo', () => {
    it('should return user info from JWT payload', () => {
      // Arrange
      jest.spyOn(appService, 'getUserInfo').mockReturnValue(mockUserInfoResponse);

      // Act
      const result = appController.getUserInfo(mockKeycloakUser);

      // Assert
      expect(result).toEqual(mockUserInfoResponse);
      expect(appService.getUserInfo).toHaveBeenCalledWith(mockKeycloakUser);
    });

    it('should call AppService.getUserInfo once', () => {
      // Arrange
      jest.spyOn(appService, 'getUserInfo').mockReturnValue(mockUserInfoResponse);

      // Act
      appController.getUserInfo(mockKeycloakUser);

      // Assert
      expect(appService.getUserInfo).toHaveBeenCalledTimes(1);
    });

    it('should call AppService.getUserInfo with correct JWT payload', () => {
      // Arrange
      jest.spyOn(appService, 'getUserInfo').mockReturnValue(mockUserInfoResponse);

      // Act
      appController.getUserInfo(mockKeycloakUser);

      // Assert
      expect(appService.getUserInfo).toHaveBeenCalledWith(mockKeycloakUser);
    });

    it('should return UserInfoResponseDto with user properties', () => {
      // Arrange
      jest.spyOn(appService, 'getUserInfo').mockReturnValue(mockUserInfoResponse);

      // Act
      const result = appController.getUserInfo(mockKeycloakUser);

      // Assert
      expect(result).toHaveProperty('sub', mockKeycloakUser.sub);
      expect(result).toHaveProperty('email', mockKeycloakUser.email);
      expect(result).toHaveProperty('first_name', mockKeycloakUser.given_name);
      expect(result).toHaveProperty('last_name', mockKeycloakUser.family_name);
      expect(result).toHaveProperty('message');
      expect(result).toHaveProperty('timestamp');
    });

    it('should return correct message in user info', () => {
      // Arrange
      jest.spyOn(appService, 'getUserInfo').mockReturnValue(mockUserInfoResponse);

      // Act
      const result = appController.getUserInfo(mockKeycloakUser);

      // Assert
      expect(result.message).toBe('This is a protected endpoint - you have access!');
    });

    it('should handle Keycloak user info without optional fields', () => {
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

      const responseWithoutOptional = {
        sub: payloadWithoutOptional.sub,
        email: payloadWithoutOptional.email,
        first_name: undefined,
        last_name: undefined,
        message: 'This is a protected endpoint - you have access!',
        timestamp: new Date(),
      };

      jest.spyOn(appService, 'getUserInfo').mockReturnValue(responseWithoutOptional);

      // Act
      const result = appController.getUserInfo(payloadWithoutOptional);

      // Assert
      expect(result.first_name).toBeUndefined();
      expect(result.last_name).toBeUndefined();
      expect(appService.getUserInfo).toHaveBeenCalledWith(payloadWithoutOptional);
    });
  });
});
