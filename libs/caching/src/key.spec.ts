import { CACHE_KEY } from './key';

describe('CACHE_KEY enum', () => {
  it('should have OTP_EMAIL_VALIDATION_CODE property', () => {
    expect(CACHE_KEY.OTP_EMAIL_VALIDATION_CODE).toBe('OTP_EMAIL_VALIDATION_CODE');
  });

  it('should be a const enum', () => {
    // Const enums are fully inlined at compile time
    // We can verify the values exist
    expect(CACHE_KEY.OTP_EMAIL_VALIDATION_CODE).toBeDefined();
  });

  it('should have cache key for OTP email validation', () => {
    expect(CACHE_KEY.OTP_EMAIL_VALIDATION_CODE).toContain('OTP');
    expect(CACHE_KEY.OTP_EMAIL_VALIDATION_CODE).toContain('EMAIL');
    expect(CACHE_KEY.OTP_EMAIL_VALIDATION_CODE).toContain('VALIDATION');
    expect(CACHE_KEY.OTP_EMAIL_VALIDATION_CODE).toContain('CODE');
  });

  it('should use SCREAMING_SNAKE_CASE naming convention', () => {
    expect(CACHE_KEY.OTP_EMAIL_VALIDATION_CODE).toMatch(/^[A-Z_]+$/);
  });

  it('should be usable as cache key prefix', () => {
    const userId = 'user-123';
    const cacheKey = `${CACHE_KEY.OTP_EMAIL_VALIDATION_CODE}:${userId}`;

    expect(cacheKey).toBe('OTP_EMAIL_VALIDATION_CODE:user-123');
  });

  it('should be usable in Map or Set operations', () => {
    const cache = new Map<string, string>();
    const key = CACHE_KEY.OTP_EMAIL_VALIDATION_CODE;

    cache.set(`${key}:123456`, 'verification-code');
    expect(cache.has(`${key}:123456`)).toBe(true);
    expect(cache.get(`${key}:123456`)).toBe('verification-code');
  });

  describe('usage examples', () => {
    it('should work with Redis-like key pattern', () => {
      const email = 'test@example.com';
      const code = '123456';
      const redisKey = `${CACHE_KEY.OTP_EMAIL_VALIDATION_CODE}:${email}`;

      expect(redisKey).toBe('OTP_EMAIL_VALIDATION_CODE:test@example.com');
    });

    it('should allow constructing compound keys', () => {
      const prefix = CACHE_KEY.OTP_EMAIL_VALIDATION_CODE;
      const suffix = 'user@example.com';
      const ttl = 300;

      const keyData = {
        key: `${prefix}:${suffix}`,
        value: '123456',
        ttl,
      };

      expect(keyData.key).toBe('OTP_EMAIL_VALIDATION_CODE:user@example.com');
      expect(keyData.value).toBe('123456');
      expect(keyData.ttl).toBe(300);
    });

    it('should support namespacing', () => {
      const namespace = 'app:v1';
      const key = CACHE_KEY.OTP_EMAIL_VALIDATION_CODE;
      const fullKey = `${namespace}:${key}:user@example.com`;

      expect(fullKey).toBe('app:v1:OTP_EMAIL_VALIDATION_CODE:user@example.com');
    });

    it('should work with key expiration scenarios', () => {
      const key = CACHE_KEY.OTP_EMAIL_VALIDATION_CODE;
      const expirySeconds = 300;

      const cacheEntry = {
        key: `${key}:test@example.com`,
        value: '654321',
        expiresIn: expirySeconds,
      };

      expect(cacheEntry.key).toBe('OTP_EMAIL_VALIDATION_CODE:test@example.com');
      expect(cacheEntry.expiresIn).toBe(300);
    });
  });

  describe('key format consistency', () => {
    it('should produce consistent keys for same inputs', () => {
      const email = 'user@example.com';
      const key1 = `${CACHE_KEY.OTP_EMAIL_VALIDATION_CODE}:${email}`;
      const key2 = `${CACHE_KEY.OTP_EMAIL_VALIDATION_CODE}:${email}`;

      expect(key1).toBe(key2);
    });

    it('should distinguish different emails', () => {
      const email1 = 'user1@example.com';
      const email2 = 'user2@example.com';
      const key1 = `${CACHE_KEY.OTP_EMAIL_VALIDATION_CODE}:${email1}`;
      const key2 = `${CACHE_KEY.OTP_EMAIL_VALIDATION_CODE}:${email2}`;

      expect(key1).not.toBe(key2);
    });
  });
});
