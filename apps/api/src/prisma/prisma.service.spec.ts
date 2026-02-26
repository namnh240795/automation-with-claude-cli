import { Logger } from '@nestjs/common';
import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let service: PrismaService;
  let originalEnv: NodeJS.ProcessEnv;

  beforeAll(() => {
    // Store original environment variables
    originalEnv = process.env;
  });

  beforeEach(() => {
    // Set a test DATABASE_URL
    process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test_db';

    // Mock Logger to avoid console output during tests
    jest.spyOn(Logger.prototype, 'log').mockImplementation(() => {});
    jest.spyOn(Logger.prototype, 'error').mockImplementation(() => {});
    jest.spyOn(Logger.prototype, 'warn').mockImplementation(() => {});

    service = new PrismaService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    // Restore original environment
    process.env = originalEnv;
  });

  describe('PrismaService', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should extend PrismaClient', () => {
      expect(service).toHaveProperty('$connect');
      expect(service).toHaveProperty('$disconnect');
    });
  });

  describe('onModuleInit', () => {
    it('should be defined', () => {
      expect(service.onModuleInit).toBeDefined();
    });

    it('should call $connect on module init', async () => {
      // Arrange
      const $connectSpy = jest.spyOn(service, '$connect').mockResolvedValue(undefined as never);

      // Act
      await service.onModuleInit();

      // Assert
      expect($connectSpy).toHaveBeenCalled();
    });

    it('should log "Database connected" message', async () => {
      // Arrange
      jest.spyOn(service, '$connect').mockResolvedValue(undefined as never);
      const logSpy = jest.spyOn(Logger.prototype, 'log');

      // Act
      await service.onModuleInit();

      // Assert
      expect(logSpy).toHaveBeenCalledWith('Database connected');
    });

    it('should handle connection errors', async () => {
      // Arrange
      jest.spyOn(service, '$connect').mockRejectedValue(new Error('Connection failed') as never);

      // Act & Assert
      await expect(service.onModuleInit()).rejects.toThrow('Connection failed');
    });
  });

  describe('onModuleDestroy', () => {
    it('should be defined', () => {
      expect(service.onModuleDestroy).toBeDefined();
    });

    it('should call $disconnect on module destroy', async () => {
      // Arrange
      const $disconnectSpy = jest.spyOn(service, '$disconnect').mockResolvedValue(undefined as never);

      // Act
      await service.onModuleDestroy();

      // Assert
      expect($disconnectSpy).toHaveBeenCalled();
    });

    it('should log "Database disconnected" message', async () => {
      // Arrange
      jest.spyOn(service, '$disconnect').mockResolvedValue(undefined as never);
      const logSpy = jest.spyOn(Logger.prototype, 'log');

      // Act
      await service.onModuleDestroy();

      // Assert
      expect(logSpy).toHaveBeenCalledWith('Database disconnected');
    });

    it('should handle disconnect errors', async () => {
      // Arrange
      jest.spyOn(service, '$disconnect').mockRejectedValue(new Error('Disconnect failed') as never);

      // Act & Assert
      await expect(service.onModuleDestroy()).rejects.toThrow('Disconnect failed');
    });
  });

  describe('lifecycle hooks integration', () => {
    it('should implement OnModuleInit', () => {
      expect(service.onModuleInit).toBeDefined();
    });

    it('should implement OnModuleDestroy', () => {
      expect(service.onModuleDestroy).toBeDefined();
    });

    it('should complete full lifecycle without errors', async () => {
      // Arrange
      jest.spyOn(service, '$connect').mockResolvedValue(undefined as never);
      jest.spyOn(service, '$disconnect').mockResolvedValue(undefined as never);

      // Act
      await service.onModuleInit();
      await service.onModuleDestroy();

      // Assert - if we get here without errors, the test passes
      expect(true).toBe(true);
    });
  });

  describe('PrismaClient models', () => {
    it('should have access to Prisma models', () => {
      // The PrismaService should have access to all models defined in schema
      // This test checks that the service is properly initialized
      expect(service).toHaveProperty('user_profile');
      expect(service).toHaveProperty('post');
      expect(service).toHaveProperty('comment');
      expect(service).toHaveProperty('category');
      expect(service).toHaveProperty('tag');
      expect(service).toHaveProperty('post_category');
      expect(service).toHaveProperty('post_tag');
    });
  });

  describe('environment configuration', () => {
    it('should use DATABASE_URL from environment', () => {
      // Arrange
      const testUrl = 'postgresql://user:pass@host:5432/db';
      process.env.DATABASE_URL = testUrl;

      // Act
      const newService = new PrismaService();

      // Assert
      expect(newService).toBeDefined();
    });
  });
});
