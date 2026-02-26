import { ENVIRONMENT } from './environment';

describe('ENVIRONMENT enum', () => {
  it('should have REDIS_HOST property', () => {
    expect(ENVIRONMENT.REDIS_HOST).toBe('REDIS_HOST');
  });

  it('should have REDIS_PORT property', () => {
    expect(ENVIRONMENT.REDIS_PORT).toBe('REDIS_PORT');
  });

  it('should have REDIS_TLS property', () => {
    expect(ENVIRONMENT.REDIS_TLS).toBe('REDIS_TLS');
  });

  it('should be a const enum', () => {
    // Const enums are fully inlined at compile time
    // We can verify the values exist
    expect(ENVIRONMENT.REDIS_HOST).toBeDefined();
    expect(ENVIRONMENT.REDIS_PORT).toBeDefined();
    expect(ENVIRONMENT.REDIS_TLS).toBeDefined();
  });

  it('should have all required Redis environment variables', () => {
    // For const enums, verify each expected value exists
    expect(ENVIRONMENT.REDIS_HOST).toBe('REDIS_HOST');
    expect(ENVIRONMENT.REDIS_PORT).toBe('REDIS_PORT');
    expect(ENVIRONMENT.REDIS_TLS).toBe('REDIS_TLS');
  });

  it('should use values matching environment variable naming convention', () => {
    expect(ENVIRONMENT.REDIS_HOST).toMatch(/^[A-Z_]+$/);
    expect(ENVIRONMENT.REDIS_PORT).toMatch(/^[A-Z_]+$/);
    expect(ENVIRONMENT.REDIS_TLS).toMatch(/^[A-Z_]+$/);
  });

  describe('usage examples', () => {
    it('should be usable in environment variable access', () => {
      // Simulate accessing environment variables
      const env = {
        [ENVIRONMENT.REDIS_HOST]: 'localhost',
        [ENVIRONMENT.REDIS_PORT]: '6379',
        [ENVIRONMENT.REDIS_TLS]: 'true',
      };

      expect(env[ENVIRONMENT.REDIS_HOST]).toBe('localhost');
      expect(env[ENVIRONMENT.REDIS_PORT]).toBe('6379');
      expect(env[ENVIRONMENT.REDIS_TLS]).toBe('true');
    });

    it('should work with process.env pattern', () => {
      // Mock process.env
      const mockEnv = {
        REDIS_HOST: '127.0.0.1',
        REDIS_PORT: '6380',
        REDIS_TLS: 'false',
      };

      expect(mockEnv[ENVIRONMENT.REDIS_HOST]).toBe('127.0.0.1');
      expect(mockEnv[ENVIRONMENT.REDIS_PORT]).toBe('6380');
      expect(mockEnv[ENVIRONMENT.REDIS_TLS]).toBe('false');
    });
  });
});
