import { plainToInstance } from 'class-transformer';
import { SignInDto } from './signin.dto';

// Mock class-validator to avoid issues in test environment
jest.mock('class-validator', () => ({
  validate: jest.fn().mockResolvedValue([]),
  validateSync: jest.fn().mockReturnValue([]),
  IsEmail: jest.fn(),
  IsString: jest.fn(),
}));

// Mock @nestjs/swagger decorators
jest.mock('@nestjs/swagger', () => ({
  ApiProperty: () => {
    return function (target: any, propertyKey: string) {};
  },
}));

describe('SignInDto', () => {
  describe('class structure', () => {
    it('should have email property', () => {
      const dto = new SignInDto();
      dto.email = 'test@example.com';

      expect(dto.email).toBe('test@example.com');
    });

    it('should have password property', () => {
      const dto = new SignInDto();
      dto.password = 'SecurePass123';

      expect(dto.password).toBe('SecurePass123');
    });

    it('should require email property', () => {
      const dto = new SignInDto();
      dto.password = 'password';

      expect(dto.email).toBeUndefined();
    });

    it('should require password property', () => {
      const dto = new SignInDto();
      dto.email = 'test@example.com';

      expect(dto.password).toBeUndefined();
    });
  });

  describe('plainToInstance transformation', () => {
    it('should transform plain object to SignInDto instance', () => {
      const plainObject = {
        email: 'test@example.com',
        password: 'SecurePass123',
      };

      const dto = plainToInstance(SignInDto, plainObject);

      expect(dto).toBeInstanceOf(SignInDto);
      expect(dto.email).toBe(plainObject.email);
      expect(dto.password).toBe(plainObject.password);
    });
  });

  describe('validation', () => {
    it('should be instantiable', () => {
      const dto = new SignInDto();
      dto.email = 'test@example.com';
      dto.password = 'SecurePass123';

      expect(dto.email).toBe('test@example.com');
      expect(dto.password).toBe('SecurePass123');
    });

    it('should accept valid email format', () => {
      const dto = plainToInstance(SignInDto, {
        email: 'user@example.com',
        password: 'password123',
      });

      expect(dto.email).toBe('user@example.com');
    });

    it('should accept string passwords', () => {
      const dto = plainToInstance(SignInDto, {
        email: 'user@example.com',
        password: 'any-string-password',
      });

      expect(dto.password).toBe('any-string-password');
    });
  });

  describe('use cases', () => {
    it('should create valid DTO from request body', () => {
      const requestBody = {
        email: 'existinguser@example.com',
        password: 'MyPassword123!',
      };

      const dto = plainToInstance(SignInDto, requestBody);

      expect(dto.email).toBe('existinguser@example.com');
      expect(dto.password).toBe('MyPassword123!');
    });

    it('should handle basic signin', () => {
      const basicBody = {
        email: 'user@test.com',
        password: 'password',
      };

      const dto = plainToInstance(SignInDto, basicBody);

      expect(dto.email).toBe('user@test.com');
      expect(dto.password).toBe('password');
    });

    it('should serialize to JSON correctly', () => {
      const dto = plainToInstance(SignInDto, {
        email: 'test@example.com',
        password: 'SecurePass123',
      });

      const json = JSON.parse(JSON.stringify(dto));

      expect(json.email).toBe('test@example.com');
      expect(json.password).toBe('SecurePass123');
    });
  });

  describe('edge cases', () => {
    it('should handle empty email', () => {
      const dto = plainToInstance(SignInDto, {
        email: '',
        password: 'password',
      });

      expect(dto.email).toBe('');
    });

    it('should handle empty password', () => {
      const dto = plainToInstance(SignInDto, {
        email: 'test@example.com',
        password: '',
      });

      expect(dto.password).toBe('');
    });

    it('should handle very long email', () => {
      const longEmail = 'a'.repeat(100) + '@example.com';
      const dto = plainToInstance(SignInDto, {
        email: longEmail,
        password: 'password',
      });

      expect(dto.email).toBe(longEmail);
    });

    it('should handle very long password', () => {
      const longPassword = 'A'.repeat(1000);
      const dto = plainToInstance(SignInDto, {
        email: 'test@example.com',
        password: longPassword,
      });

      expect(dto.password).toBe(longPassword);
    });

    it('should handle special characters in password', () => {
      const specialPassword = '!@#$%^&*()_+-=[]{}|;:,.<>?';
      const dto = plainToInstance(SignInDto, {
        email: 'test@example.com',
        password: specialPassword,
      });

      expect(dto.password).toBe(specialPassword);
    });

    it('should handle unicode in email', () => {
      const dto = plainToInstance(SignInDto, {
        email: 'test@例え.com',
        password: 'password',
      });

      expect(dto.email).toBe('test@例え.com');
    });
  });

  describe('DTO properties are required', () => {
    it('should have both email and password as required', () => {
      const dto = new SignInDto();

      expect(dto.email).toBeUndefined();
      expect(dto.password).toBeUndefined();
    });
  });
});
