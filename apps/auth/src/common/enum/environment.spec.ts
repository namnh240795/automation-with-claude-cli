import { ENVIRONMENT } from './environment';

describe('ENVIRONMENT', () => {
  describe('should have all required environment variable keys', () => {
    it('should have SERVICE_PREFIX key', () => {
      expect(ENVIRONMENT.SERVICE_PREFIX).toBe('SERVICE_PREFIX');
    });

    it('should have PORT key', () => {
      expect(ENVIRONMENT.PORT).toBe('PORT');
    });

    it('should have CORS_ORIGIN key', () => {
      expect(ENVIRONMENT.CORS_ORIGIN).toBe('CORS_ORIGIN');
    });

    it('should have CORS_ORIGIN_REGEX key', () => {
      expect(ENVIRONMENT.CORS_ORIGIN_REGEX).toBe('CORS_ORIGIN_REGEX');
    });

    it('should have DATABASE_URL key', () => {
      expect(ENVIRONMENT.DATABASE_URL).toBe('DATABASE_URL');
    });

    it('should have JWT_SECRET key', () => {
      expect(ENVIRONMENT.JWT_SECRET).toBe('JWT_SECRET');
    });

    it('should have JWT_EXPIRES_IN key', () => {
      expect(ENVIRONMENT.JWT_EXPIRES_IN).toBe('JWT_EXPIRES_IN');
    });

    it('should have JWT_REFRESH_SECRET key', () => {
      expect(ENVIRONMENT.JWT_REFRESH_SECRET).toBe('JWT_REFRESH_SECRET');
    });

    it('should have JWT_REFRESH_EXPIRES_IN key', () => {
      expect(ENVIRONMENT.JWT_REFRESH_EXPIRES_IN).toBe('JWT_REFRESH_EXPIRES_IN');
    });
  });

  describe('should maintain const assertion', () => {
    it('should maintain consistent values', () => {
      // Verify values don't change across accesses
      expect(ENVIRONMENT.DATABASE_URL).toBe('DATABASE_URL');
      expect(ENVIRONMENT.DATABASE_URL).toBe('DATABASE_URL');
    });
  });

  describe('usage patterns', () => {
    it('should be usable with ConfigService', () => {
      // Simulate ConfigService usage
      const mockConfigService = {
        get: (key: string) => {
          if (key === ENVIRONMENT.SERVICE_PREFIX) return 'auth';
          if (key === ENVIRONMENT.PORT) return '3001';
          if (key === ENVIRONMENT.JWT_SECRET) return 'secret';
          return null;
        },
      };

      expect(mockConfigService.get(ENVIRONMENT.SERVICE_PREFIX)).toBe('auth');
      expect(mockConfigService.get(ENVIRONMENT.PORT)).toBe('3001');
      expect(mockConfigService.get(ENVIRONMENT.JWT_SECRET)).toBe('secret');
    });

    it('should provide type safety for environment keys', () => {
      // This test ensures type safety - TypeScript will catch errors
      const key: string = ENVIRONMENT.DATABASE_URL;
      expect(key).toBe('DATABASE_URL');

      // Valid keys should work
      const validKeys = [
        ENVIRONMENT.SERVICE_PREFIX,
        ENVIRONMENT.PORT,
        ENVIRONMENT.CORS_ORIGIN,
        ENVIRONMENT.DATABASE_URL,
        ENVIRONMENT.JWT_SECRET,
      ];

      expect(validKeys).toHaveLength(5);
    });

    it('should contain all CORS-related keys', () => {
      const corsKeys = [
        ENVIRONMENT.CORS_ORIGIN,
        ENVIRONMENT.CORS_ORIGIN_REGEX,
      ];

      expect(corsKeys).toContain('CORS_ORIGIN');
      expect(corsKeys).toContain('CORS_ORIGIN_REGEX');
    });

    it('should contain all JWT-related keys', () => {
      const jwtKeys = [
        ENVIRONMENT.JWT_SECRET,
        ENVIRONMENT.JWT_EXPIRES_IN,
        ENVIRONMENT.JWT_REFRESH_SECRET,
        ENVIRONMENT.JWT_REFRESH_EXPIRES_IN,
      ];

      expect(jwtKeys).toContain('JWT_SECRET');
      expect(jwtKeys).toContain('JWT_EXPIRES_IN');
      expect(jwtKeys).toContain('JWT_REFRESH_SECRET');
      expect(jwtKeys).toContain('JWT_REFRESH_EXPIRES_IN');
    });
  });

  describe('values should be uppercase strings', () => {
    it('should have all values in uppercase', () => {
      const allValues = Object.values(ENVIRONMENT);

      allValues.forEach((value) => {
        expect(value).toBe(value.toUpperCase());
      });
    });

    it('should use underscores for multi-word keys', () => {
      const keysWithUnderscores = [
        ENVIRONMENT.SERVICE_PREFIX,
        ENVIRONMENT.CORS_ORIGIN,
        ENVIRONMENT.CORS_ORIGIN_REGEX,
        ENVIRONMENT.DATABASE_URL,
        ENVIRONMENT.JWT_SECRET,
        ENVIRONMENT.JWT_EXPIRES_IN,
        ENVIRONMENT.JWT_REFRESH_SECRET,
        ENVIRONMENT.JWT_REFRESH_EXPIRES_IN,
      ];

      keysWithUnderscores.forEach((key) => {
        expect(key).toMatch(/^[A-Z_]+$/);
      });
    });
  });

  describe('complete key set', () => {
    it('should have exactly 9 keys', () => {
      const allKeys = Object.keys(ENVIRONMENT);
      expect(allKeys).toHaveLength(9);
    });

    it('should have all expected keys', () => {
      const expectedKeys = [
        'SERVICE_PREFIX',
        'PORT',
        'CORS_ORIGIN',
        'CORS_ORIGIN_REGEX',
        'DATABASE_URL',
        'JWT_SECRET',
        'JWT_EXPIRES_IN',
        'JWT_REFRESH_SECRET',
        'JWT_REFRESH_EXPIRES_IN',
      ];

      const actualKeys = Object.values(ENVIRONMENT);

      expectedKeys.forEach((key) => {
        expect(actualKeys).toContain(key);
      });
    });
  });
});
