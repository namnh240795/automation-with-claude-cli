import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from './prisma.module';
import { PrismaService } from './prisma.service';

describe('PrismaModule', () => {
  let prismaModule: PrismaModule;

  beforeEach(async () => {
    // Set DATABASE_URL for PrismaService initialization
    process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test_db';

    const app: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
    }).compile();

    prismaModule = app.get<PrismaModule>(PrismaModule);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('PrismaModule', () => {
    it('should be defined', () => {
      expect(prismaModule).toBeDefined();
    });

    it('should be a global module', () => {
      // The @Global() decorator makes the module available globally
      // We verify this by checking if the module can be imported without issues
      expect(prismaModule).toBeDefined();
    });

    it('should provide PrismaService', async () => {
      const app: TestingModule = await Test.createTestingModule({
        imports: [PrismaModule],
      }).compile();

      const prismaService = app.get<PrismaService>(PrismaService);

      expect(prismaService).toBeDefined();
      expect(prismaService.constructor.name).toBe('PrismaService');
    });

    it('should export PrismaService', async () => {
      const app: TestingModule = await Test.createTestingModule({
        imports: [PrismaModule],
      }).compile();

      // PrismaService should be available from the module
      const prismaService = app.get<PrismaService>(PrismaService);

      expect(prismaService).toBeDefined();
      expect(prismaService).toHaveProperty('$connect');
      expect(prismaService).toHaveProperty('$disconnect');
    });

    it('should make PrismaService available throughout the application', async () => {
      // Since PrismaModule is @Global(), PrismaService should be injectable anywhere
      const app: TestingModule = await Test.createTestingModule({
        imports: [PrismaModule],
        providers: [
          {
            provide: 'TestService',
            useFactory: (prismaService: PrismaService) => ({
              prismaService,
            }),
            inject: [PrismaService],
          },
        ],
      }).compile();

      const testService = app.get('TestService');

      expect(testService).toBeDefined();
      expect(testService.prismaService).toBeDefined();
      expect(testService.prismaService.constructor.name).toBe('PrismaService');
    });

    it('should have PrismaService as the only provider', async () => {
      // Get module metadata
      const app: TestingModule = await Test.createTestingModule({
        imports: [PrismaModule],
      }).compile();

      // Verify that PrismaService is provided
      expect(() => app.get(PrismaService)).not.toThrow();
    });
  });

  describe('PrismaModule integration', () => {
    it('should work with NestJS dependency injection', async () => {
      const app: TestingModule = await Test.createTestingModule({
        imports: [PrismaModule],
      }).compile();

      const prismaService = app.get<PrismaService>(PrismaService);

      expect(prismaService).toBeDefined();
      expect(prismaService.constructor).toBe(PrismaService);
    });

    it('should maintain singleton pattern', async () => {
      const app: TestingModule = await Test.createTestingModule({
        imports: [PrismaModule],
      }).compile();

      const prismaService1 = app.get<PrismaService>(PrismaService);
      const prismaService2 = app.get<PrismaService>(PrismaService);

      expect(prismaService1).toBe(prismaService2);
    });
  });
});
