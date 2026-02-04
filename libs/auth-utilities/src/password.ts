import * as crypto from 'crypto';

/**
 * Hash a password using PBKDF2 with SHA-512
 * @param password The plain text password to hash
 * @returns A string in format "salt:hash"
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto
    .pbkdf2Sync(password, salt, 310000, 64, 'sha512')
    .toString('hex');
  return `${salt}:${hash}`;
}

/**
 * Verify a plain text password against a hashed password
 * @param password The plain text password to verify
 * @param hashedPassword The hashed password (in format "salt:hash")
 * @returns True if the password matches, false otherwise
 */
export function verifyPassword(
  password: string,
  hashedPassword: string,
): boolean {
  const [salt, hash] = hashedPassword.split(':');
  const verifyHash = crypto
    .pbkdf2Sync(password, salt, 310000, 64, 'sha512')
    .toString('hex');
  return hash === verifyHash;
}
