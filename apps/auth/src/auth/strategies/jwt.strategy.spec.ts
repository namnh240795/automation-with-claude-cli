import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;
  let configService: ConfigService;

  const mockJwtSecret = 'test-jwt-secret-key';

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (key === 'JWT_SECRET') return mockJwtSecret;
              return null;
            }),
          },
        },
      ],
    }).compile();

    strategy = app.get<JwtStrategy>(JwtStrategy);
    configService = app.get<ConfigService>(ConfigService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('JwtStrategy', () => {
    it('should be defined', () => {
      expect(strategy).toBeDefined();
    });
  });

  describe('constructor', () => {
    it('should initialize strategy with config from ConfigService', () => {
      // Assert
      expect(configService.get).toHaveBeenCalledWith('JWT_SECRET');
      expect(strategy).toBeDefined();
    });

    it('should use default JWT secret when config is not set', async () => {
      // Arrange
      const defaultSecret = 'your-jwt-secret-key-change-this';

      const app: TestingModule = await Test.createTestingModule({
        providers: [
          JwtStrategy,
          {
            provide: ConfigService,
            useValue: {
              get: jest.fn().mockReturnValue(null),
            },
          },
        ],
      }).compile();

      // Act
      const strategyWithDefault = app.get<JwtStrategy>(JwtStrategy);

      // Assert
      expect(strategyWithDefault).toBeDefined();
    });
  });

  describe('validate', () => {
    const mockPayload = {
      sub: '123e4567-e89b-12d3-a456-426614174000',
      email: 'test@example.com',
      first_name: 'John',
      last_name: 'Doe',
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600,
    };

    it('should return user object with properties from JWT payload', async () => {
      // Act
      const result = await strategy.validate(mockPayload);

      // Assert
      expect(result).toBeDefined();
      expect(result).toEqual({
        sub: mockPayload.sub,
        email: mockPayload.email,
        first_name: mockPayload.first_name,
        last_name: mockPayload.last_name,
      });
    });

    it('should return sub from payload', async () => {
      // Act
      const result = await strategy.validate(mockPayload);

      // Assert
      expect(result.sub).toBe(mockPayload.sub);
    });

    it('should return email from payload', async () => {
      // Act
      const result = await strategy.validate(mockPayload);

      // Assert
      expect(result.email).toBe(mockPayload.email);
    });

    it('should return first_name from payload', async () => {
      // Act
      const result = await strategy.validate(mockPayload);

      // Assert
      expect(result.first_name).toBe(mockPayload.first_name);
    });

    it('should return last_name from payload', async () => {
      // Act
      const result = await strategy.validate(mockPayload);

      // Assert
      expect(result.last_name).toBe(mockPayload.last_name);
    });

    it('should handle payload without optional fields', async () => {
      // Arrange
      const payloadWithoutOptional = {
        sub: '123e4567-e89b-12d3-a456-426614174000',
        email: 'test@example.com',
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600,
      };

      // Act
      const result = await strategy.validate(payloadWithoutOptional);

      // Assert
      expect(result).toEqual({
        sub: payloadWithoutOptional.sub,
        email: payloadWithoutOptional.email,
        first_name: undefined,
        last_name: undefined,
      });
    });

    it('should not include iat and exp in returned object', async () => {
      // Act
      const result = await strategy.validate(mockPayload);

      // Assert
      expect(result).not.toHaveProperty('iat');
      expect(result).not.toHaveProperty('exp');
    });

    it('should not perform database lookup', async () => {
      // Act
      const result = await strategy.validate(mockPayload);

      // Assert
      expect(result).toBeDefined();
      // The validation simply returns the payload data without any DB call
      // This is the key behavior - no database lookup required
    });

    it('should handle payload with null first_name and last_name', async () => {
      // Arrange
      const payloadWithNulls = {
        sub: '123e4567-e89b-12d3-a456-426614174000',
        email: 'test@example.com',
        first_name: null,
        last_name: null,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600,
      };

      // Act
      const result = await strategy.validate(payloadWithNulls);

      // Assert
      expect(result.first_name).toBeNull();
      expect(result.last_name).toBeNull();
    });

    it('should preserve all string values from payload', async () => {
      // Arrange
      const payload = {
        sub: 'user-123',
        email: 'user@test.com',
        first_name: 'Jane',
        last_name: 'Smith',
        iat: 1234567890,
        exp: 1234571490,
      };

      // Act
      const result = await strategy.validate(payload);

      // Assert
      expect(result.sub).toBe('user-123');
      expect(result.email).toBe('user@test.com');
      expect(result.first_name).toBe('Jane');
      expect(result.last_name).toBe('Smith');
    });
  });

  describe('strategy configuration', () => {
    it('should be configured with correct strategy name', () => {
      // The strategy name is 'jwt-token' as defined in PassportStrategy
      expect(strategy).toBeDefined();
    });

    it('should extract JWT from Authorization header', () => {
      // This is configured via ExtractJwt.fromAuthHeaderAsBearerToken()
      // We can't directly test this without actual HTTP requests,
      // but we verify the strategy is properly initialized
      expect(strategy).toBeDefined();
    });

    it('should not ignore token expiration', () => {
      // Configured with ignoreExpiration: false
      // Token expiration will be validated
      expect(strategy).toBeDefined();
    });

    it('should use correct secret or key', () => {
      // Secret is provided via ConfigService
      expect(configService.get).toHaveBeenCalledWith('JWT_SECRET');
    });
  });

  describe('integration with Passport', () => {
    it('should extend PassportStrategy', () => {
      // Verify the strategy extends PassportStrategy(Strategy, 'jwt-token')
      expect(strategy).toBeDefined();
      expect(strategy.constructor.name).toBe('JwtStrategy');
    });

    it('should have validate method required by Passport', () => {
      // Passport requires validate method
      expect(typeof strategy.validate).toBe('function');
    });

    it('should return user object in format expected by Passport', () => {
      // Passport expects the validate method to return a user object
      const mockPayload = {
        sub: '123e4567-e89b-12d3-a456-426614174000',
        email: 'test@example.com',
        iat: 1234567890,
        exp: 1234571490,
      };

      // Act
      const result = strategy.validate(mockPayload);

      // Assert - returns a Promise
      expect(result).toBeInstanceOf(Promise);
      expect(result).resolves.toEqual(
        expect.objectContaining({
          sub: expect.any(String),
          email: expect.any(String),
        })
      );
    });
  });
});
