import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12;
const AUTH_TAG_LENGTH = 16;
const MASK = '••••••••';

@Injectable()
export class EncryptionService {
  private readonly logger = new Logger(EncryptionService.name);
  private readonly key: Buffer;

  constructor(private readonly configService: ConfigService) {
    const encryptionKey = this.configService.get<string>('ENCRYPTION_KEY');

    if (!encryptionKey) {
      throw new Error('ENCRYPTION_KEY is not defined. Generate one with: openssl rand -hex 32');
    }

    const keyBuffer = Buffer.from(encryptionKey, 'hex');
    if (keyBuffer.length !== 32) {
      throw new Error('ENCRYPTION_KEY must be a 64-character hex string (32 bytes)');
    }

    this.key = keyBuffer;
  }

  encrypt(plaintext: string): string {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, this.key, iv);

    const encrypted = Buffer.concat([
      cipher.update(plaintext, 'utf8'),
      cipher.final(),
    ]);

    const authTag = cipher.getAuthTag();

    // Format: iv (12 bytes) + ciphertext + authTag (16 bytes)
    const result = Buffer.concat([iv, encrypted, authTag]);
    return result.toString('base64');
  }

  decrypt(encryptedBase64: string): string {
    const buffer = Buffer.from(encryptedBase64, 'base64');

    if (buffer.length < IV_LENGTH + AUTH_TAG_LENGTH) {
      throw new Error('Invalid encrypted value: too short');
    }

    const iv = buffer.subarray(0, IV_LENGTH);
    const authTag = buffer.subarray(buffer.length - AUTH_TAG_LENGTH);
    const ciphertext = buffer.subarray(IV_LENGTH, buffer.length - AUTH_TAG_LENGTH);

    const decipher = crypto.createDecipheriv(ALGORITHM, this.key, iv);
    decipher.setAuthTag(authTag);

    const decrypted = Buffer.concat([
      decipher.update(ciphertext),
      decipher.final(),
    ]);

    return decrypted.toString('utf8');
  }

  mask(): string {
    return MASK;
  }

  isEncrypted(value: string): boolean {
    if (!value) return false;
    try {
      const buffer = Buffer.from(value, 'base64');
      return buffer.length >= IV_LENGTH + AUTH_TAG_LENGTH;
    } catch {
      return false;
    }
  }

  maskIfNeeded(value: string, type: string): string {
    if (type === 'SECURE') {
      return this.mask();
    }
    return value;
  }

  decryptIfNeeded(value: string, type: string, reveal: boolean): string {
    if (type === 'SECURE') {
      if (reveal) {
        return this.decrypt(value);
      }
      return this.mask();
    }
    return value;
  }
}
