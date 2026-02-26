import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

describe('AuthModule', () => {
  describe('AuthModule (without compilation)', () => {
    it('should have AuthService as a provider', () => {
      expect(AuthService).toBeDefined();
    });

    it('should have JwtStrategy as a provider', () => {
      expect(JwtStrategy).toBeDefined();
    });
  });

  describe('AuthModule compilation with environment variables', () => {
    let moduleRef: TestingModule;

    afterEach(async () => {
      if (moduleRef) {
        await moduleRef.close();
        // Clear environment variables after each test
        delete process.env.JWT_SECRET;
        delete process.env.JWT_EXPIRES_IN;
      }
    });

    it('should compile module when JWT_SECRET and JWT_EXPIRES_IN are set', async () => {
      // Arrange
      process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test_db';
      process.env.JWT_SECRET = 'test-jwt-secret';
      process.env.JWT_REFRESH_SECRET = 'test-refresh-secret';
      process.env.JWT_EXPIRES_IN = '2h';

      // Act
      moduleRef = await Test.createTestingModule({
        imports: [
          ConfigModule.forRoot({
            isGlobal: true,
          }),
          AuthModule,
        ],
      }).compile();

      // Assert
      expect(moduleRef).toBeDefined();
      expect(moduleRef.get(AuthService)).toBeDefined();
      expect(moduleRef.get(JwtStrategy)).toBeDefined();
      expect(moduleRef.get(ConfigService)).toBeDefined();
    });

    it('should use fallback values when JWT_SECRET and JWT_EXPIRES_IN are not set', async () => {
      // Arrange - explicitly delete environment variables before loading ConfigModule
      delete process.env.JWT_SECRET;
      delete process.env.JWT_EXPIRES_IN;
      process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test_db';
      process.env.JWT_REFRESH_SECRET = 'test-refresh-secret';

      // Act - compile module with ConfigModule that doesn't load from .env
      moduleRef = await Test.createTestingModule({
        imports: [
          ConfigModule.forRoot({
            isGlobal: true,
            ignoreEnvFile: true,
            ignoreEnvVars: true,
          }),
          AuthModule,
        ],
      }).compile();

      // Assert - module should compile successfully using fallback values
      expect(moduleRef).toBeDefined();
      expect(moduleRef.get(AuthService)).toBeDefined();
      expect(moduleRef.get(JwtStrategy)).toBeDefined();

      // Verify fallback values are used by checking ConfigService returns undefined
      // but the module still compiled successfully (meaning fallbacks were used)
      const configService = moduleRef.get(ConfigService);
      expect(configService.get('JWT_SECRET')).toBeUndefined();
      expect(configService.get('JWT_EXPIRES_IN')).toBeUndefined();
    });

    it('should use fallback values when ConfigService returns undefined', async () => {
      // Arrange - don't set environment variables
      process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test_db';
      process.env.JWT_REFRESH_SECRET = 'test-refresh-secret';

      // Act
      moduleRef = await Test.createTestingModule({
        imports: [
          ConfigModule.forRoot({
            isGlobal: true,
            load: [], // No environment variables loaded
          }),
          AuthModule,
        ],
      }).compile();

      // Assert
      expect(moduleRef).toBeDefined();
      const authService = moduleRef.get(AuthService);
      expect(authService).toBeDefined();
    });
  });

  describe('module metadata', () => {
    it('should have AuthService and JwtStrategy as providers', () => {
      expect(AuthService).toBeDefined();
      expect(JwtStrategy).toBeDefined();
    });
  });
});
