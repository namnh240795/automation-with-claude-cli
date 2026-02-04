import { hashPassword, verifyPassword } from './password';

describe('Password Utilities', () => {
  describe('hashPassword', () => {
    it('should hash a password and return salt:hash format', () => {
      // Arrange
      const password = 'MySecurePassword123!';

      // Act
      const hashedPassword = hashPassword(password);

      // Assert
      expect(hashedPassword).toBeDefined();
      expect(typeof hashedPassword).toBe('string');
      expect(hashedPassword).toContain(':');
      const [salt, hash] = hashedPassword.split(':');
      expect(salt).toBeDefined();
      expect(salt.length).toBe(32); // 16 bytes = 32 hex chars
      expect(hash).toBeDefined();
      expect(hash.length).toBe(128); // 64 bytes = 128 hex chars
    });

    it('should generate different hashes for the same password', () => {
      // Arrange
      const password = 'SamePassword';

      // Act
      const hash1 = hashPassword(password);
      const hash2 = hashPassword(password);

      // Assert
      expect(hash1).not.toBe(hash2); // Different salts should produce different hashes
    });

    it('should hash empty string', () => {
      // Arrange
      const password = '';

      // Act
      const hashedPassword = hashPassword(password);

      // Assert
      expect(hashedPassword).toBeDefined();
      expect(hashedPassword).toContain(':');
    });
  });

  describe('verifyPassword', () => {
    it('should return true for correct password', () => {
      // Arrange
      const password = 'CorrectPassword123!';
      const hashedPassword = hashPassword(password);

      // Act
      const result = verifyPassword(password, hashedPassword);

      // Assert
      expect(result).toBe(true);
    });

    it('should return false for incorrect password', () => {
      // Arrange
      const correctPassword = 'CorrectPassword123!';
      const wrongPassword = 'WrongPassword456!';
      const hashedPassword = hashPassword(correctPassword);

      // Act
      const result = verifyPassword(wrongPassword, hashedPassword);

      // Assert
      expect(result).toBe(false);
    });

    it('should return false for empty password when hash is non-empty', () => {
      // Arrange
      const password = 'SomePassword123!';
      const hashedPassword = hashPassword(password);

      // Act
      const result = verifyPassword('', hashedPassword);

      // Assert
      expect(result).toBe(false);
    });

    it('should handle malformed hash gracefully', () => {
      // Arrange
      const password = 'SomePassword123!';
      const malformedHash = 'invalid-hash-format';

      // Act
      const result = verifyPassword(password, malformedHash);

      // Assert
      expect(result).toBe(false);
    });

    it('should verify password with special characters', () => {
      // Arrange
      const password = 'P@$$w0rd!#$%^&*()_+-=[]{}|;:\'",.<>?/~`';
      const hashedPassword = hashPassword(password);

      // Act
      const result = verifyPassword(password, hashedPassword);

      // Assert
      expect(result).toBe(true);
    });

    it('should verify password with unicode characters', () => {
      // Arrange
      const password = 'パスワード🔒密码123';
      const hashedPassword = hashPassword(password);

      // Act
      const result = verifyPassword(password, hashedPassword);

      // Assert
      expect(result).toBe(true);
    });

    it('should be case sensitive', () => {
      // Arrange
      const password = 'Password123';
      const hashedPassword = hashPassword(password);

      // Act
      const result = verifyPassword('password123', hashedPassword);

      // Assert
      expect(result).toBe(false);
    });
  });

  describe('hashPassword and verifyPassword integration', () => {
    it('should correctly verify multiple different passwords', () => {
      // Arrange
      const passwords = ['password1', 'P@ssw0rd!', 'VerySecurePassword123!', '12345678', ''];
      const hashedPasswords = passwords.map(p => hashPassword(p));

      // Act & Assert
      passwords.forEach((password, index) => {
        const result = verifyPassword(password, hashedPasswords[index]);
        expect(result).toBe(true);
      });
    });

    it('should not verify wrong password against correct hash', () => {
      // Arrange
      const passwords = ['password1', 'password2', 'password3'];
      const hashes = passwords.map(p => hashPassword(p));

      // Act & Assert
      expect(verifyPassword(passwords[0], hashes[1])).toBe(false);
      expect(verifyPassword(passwords[1], hashes[2])).toBe(false);
      expect(verifyPassword(passwords[2], hashes[0])).toBe(false);
    });
  });
});
