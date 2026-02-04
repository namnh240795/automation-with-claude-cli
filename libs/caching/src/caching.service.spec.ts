import { Test, TestingModule } from '@nestjs/testing';
import { CachingService } from './caching.service';
import { ConfigService } from '@nestjs/config';

describe('CachingService', () => {
  let service: CachingService;
  let configService: jest.Mocked<ConfigService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CachingService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CachingService>(CachingService);
    configService = module.get(ConfigService);

    // Mock Redis methods
    service.redis = {
      get: jest.fn(),
      set: jest.fn(),
      del: jest.fn(),
    } as any;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('get', () => {
    it('should get value from redis', async () => {
      // Arrange
      const key = 'test-key';
      const expectedValue = 'test-value';
      (service.redis.get as jest.Mock).mockResolvedValue(expectedValue);

      // Act
      const result = await service.get(key);

      // Assert
      expect(result).toBe(expectedValue);
      expect(service.redis.get).toHaveBeenCalledWith(key);
    });

    it('should return null for non-existent key', async () => {
      // Arrange
      const key = 'non-existent-key';
      (service.redis.get as jest.Mock).mockResolvedValue(null);

      // Act
      const result = await service.get(key);

      // Assert
      expect(result).toBeNull();
    });
  });

  describe('set', () => {
    it('should set value in redis without TTL', async () => {
      // Arrange
      const key = 'test-key';
      const value = 'test-value';
      (service.redis.set as jest.Mock).mockResolvedValue('OK');

      // Act
      const result = await service.set(key, value);

      // Assert
      expect(result).toBe('OK');
      expect(service.redis.set).toHaveBeenCalledWith(key, value);
    });

    it('should set value in redis with TTL', async () => {
      // Arrange
      const key = 'test-key';
      const value = 'test-value';
      const ttl = 3600;
      (service.redis.set as jest.Mock).mockResolvedValue('OK');

      // Act
      const result = await service.set(key, value, { ttl });

      // Assert
      expect(result).toBe('OK');
      expect(service.redis.set).toHaveBeenCalledWith(key, value, 'EX', ttl);
    });
  });

  describe('del', () => {
    it('should delete key from redis', async () => {
      // Arrange
      const key = 'test-key';
      (service.redis.del as jest.Mock).mockResolvedValue(1);

      // Act
      const result = await service.del(key);

      // Assert
      expect(result).toBe(1);
      expect(service.redis.del).toHaveBeenCalledWith(key);
    });

    it('should return 0 for non-existent key', async () => {
      // Arrange
      const key = 'non-existent-key';
      (service.redis.del as jest.Mock).mockResolvedValue(0);

      // Act
      const result = await service.del(key);

      // Assert
      expect(result).toBe(0);
    });
  });
});
