import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { EncryptionService } from './encryption.service';

describe('EncryptionService', () => {
  let service: EncryptionService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EncryptionService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string, defaultValue?: string) => {
              if (key === 'ENCRYPTION_KEY') {
                return 'a'.repeat(64); // 32-byte hex key for testing
              }
              return defaultValue;
            }),
          },
        },
      ],
    }).compile();

    service = module.get<EncryptionService>(EncryptionService);
    configService = module.get<ConfigService>(ConfigService);
  });

  describe('encrypt', () => {
    it('should encrypt a plaintext string and return base64', () => {
      const plaintext = 'my-secret-password';
      const encrypted = service.encrypt(plaintext);

      expect(typeof encrypted).toBe('string');
      expect(encrypted).not.toBe(plaintext);
      // Should be valid base64
      expect(() => Buffer.from(encrypted, 'base64')).not.toThrow();
    });

    it('should produce different ciphertext for same plaintext (unique IV)', () => {
      const plaintext = 'same-value';
      const encrypted1 = service.encrypt(plaintext);
      const encrypted2 = service.encrypt(plaintext);

      expect(encrypted1).not.toBe(encrypted2);
    });
  });

  describe('decrypt', () => {
    it('should decrypt an encrypted value back to original plaintext', () => {
      const plaintext = 'my-secret-password';
      const encrypted = service.encrypt(plaintext);
      const decrypted = service.decrypt(encrypted);

      expect(decrypted).toBe(plaintext);
    });

    it('should handle empty strings', () => {
      const plaintext = '';
      const encrypted = service.encrypt(plaintext);
      const decrypted = service.decrypt(encrypted);

      expect(decrypted).toBe(plaintext);
    });

    it('should handle long values', () => {
      const plaintext = 'a'.repeat(10000);
      const encrypted = service.encrypt(plaintext);
      const decrypted = service.decrypt(encrypted);

      expect(decrypted).toBe(plaintext);
    });

    it('should handle unicode characters', () => {
      const plaintext = 'p@$$w0rd!中文🔑';
      const encrypted = service.encrypt(plaintext);
      const decrypted = service.decrypt(encrypted);

      expect(decrypted).toBe(plaintext);
    });
  });

  describe('mask', () => {
    it('should return masked string', () => {
      expect(service.mask()).toBe('••••••••');
    });

    it('should always return the same mask', () => {
      expect(service.mask()).toBe(service.mask());
    });
  });

  describe('isEncrypted', () => {
    it('should return true for a valid encrypted value', () => {
      const encrypted = service.encrypt('test');
      expect(service.isEncrypted(encrypted)).toBe(true);
    });

    it('should return false for plain text', () => {
      expect(service.isEncrypted('hello world')).toBe(false);
    });

    it('should return false for empty string', () => {
      expect(service.isEncrypted('')).toBe(false);
    });
  });

  describe('maskIfNeeded', () => {
    it('should mask SECURE type values', () => {
      const encrypted = service.encrypt('secret');
      const result = service.maskIfNeeded(encrypted, 'SECURE');
      expect(result).toBe('••••••••');
    });

    it('should return plain value for STATIC type', () => {
      const result = service.maskIfNeeded('plain-value', 'STATIC');
      expect(result).toBe('plain-value');
    });
  });

  describe('decryptIfNeeded', () => {
    it('should decrypt SECURE type values when reveal is true', () => {
      const plaintext = 'my-secret';
      const encrypted = service.encrypt(plaintext);
      const result = service.decryptIfNeeded(encrypted, 'SECURE', true);
      expect(result).toBe(plaintext);
    });

    it('should mask SECURE type values when reveal is false', () => {
      const encrypted = service.encrypt('my-secret');
      const result = service.decryptIfNeeded(encrypted, 'SECURE', false);
      expect(result).toBe('••••••••');
    });

    it('should return plain value for STATIC type regardless of reveal', () => {
      expect(service.decryptIfNeeded('plain', 'STATIC', true)).toBe('plain');
      expect(service.decryptIfNeeded('plain', 'STATIC', false)).toBe('plain');
    });
  });

  describe('error handling', () => {
    it('should throw on decrypt with invalid base64', () => {
      expect(() => service.decrypt('not-valid-base64!!!')).toThrow();
    });

    it('should throw on decrypt with tampered ciphertext', () => {
      const encrypted = service.encrypt('test');
      const buffer = Buffer.from(encrypted, 'base64');
      // Tamper with the ciphertext portion (skip 12-byte IV)
      buffer[12] = buffer[12] ^ 0xff;
      const tampered = buffer.toString('base64');
      expect(() => service.decrypt(tampered)).toThrow();
    });
  });
});
