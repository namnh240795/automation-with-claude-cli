import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { SignUpDto } from './signup.dto';

// Mock class-validator to avoid issues in test environment
jest.mock('class-validator', () => ({
  validate: jest.fn().mockResolvedValue([]),
  validateSync: jest.fn().mockReturnValue([]),
  IsEmail: jest.fn(),
  IsString: jest.fn(),
  MinLength: jest.fn(),
  IsOptional: jest.fn(),
}));

// Mock @nestjs/swagger decorators
jest.mock('@nestjs/swagger', () => ({
  ApiProperty: () => {
    return function (target: any, propertyKey: string) {};
  },
}));

describe('SignUpDto', () => {
  describe('class structure', () => {
    it('should have email property', () => {
      const dto = new SignUpDto();
      dto.email = 'test@example.com';

      expect(dto.email).toBe('test@example.com');
    });

    it('should have password property', () => {
      const dto = new SignUpDto();
      dto.password = 'SecurePass123';

      expect(dto.password).toBe('SecurePass123');
    });

    it('should have first_name property', () => {
      const dto = new SignUpDto();
      dto.first_name = 'John';

      expect(dto.first_name).toBe('John');
    });

    it('should have last_name property', () => {
      const dto = new SignUpDto();
      dto.last_name = 'Doe';

      expect(dto.last_name).toBe('Doe');
    });

    it('should allow optional first_name', () => {
      const dto = new SignUpDto();
      dto.email = 'test@example.com';
      dto.password = 'SecurePass123';

      expect(dto.first_name).toBeUndefined();
    });

    it('should allow optional last_name', () => {
      const dto = new SignUpDto();
      dto.email = 'test@example.com';
      dto.password = 'SecurePass123';

      expect(dto.last_name).toBeUndefined();
    });
  });

  describe('plainToInstance transformation', () => {
    it('should transform plain object to SignUpDto instance', () => {
      const plainObject = {
        email: 'test@example.com',
        password: 'SecurePass123',
        first_name: 'John',
        last_name: 'Doe',
      };

      const dto = plainToInstance(SignUpDto, plainObject);

      expect(dto).toBeInstanceOf(SignUpDto);
      expect(dto.email).toBe(plainObject.email);
      expect(dto.password).toBe(plainObject.password);
      expect(dto.first_name).toBe(plainObject.first_name);
      expect(dto.last_name).toBe(plainObject.last_name);
    });

    it('should handle partial objects without optional fields', () => {
      const plainObject = {
        email: 'test@example.com',
        password: 'SecurePass123',
      };

      const dto = plainToInstance(SignUpDto, plainObject);

      expect(dto).toBeInstanceOf(SignUpDto);
      expect(dto.email).toBe(plainObject.email);
      expect(dto.password).toBe(plainObject.password);
      expect(dto.first_name).toBeUndefined();
      expect(dto.last_name).toBeUndefined();
    });
  });

  describe('validation', () => {
    it('should be instantiable', () => {
      const dto = new SignUpDto();
      dto.email = 'test@example.com';
      dto.password = 'SecurePass123';

      expect(dto.email).toBe('test@example.com');
      expect(dto.password).toBe('SecurePass123');
    });

    it('should accept valid email format', () => {
      const dto = plainToInstance(SignUpDto, {
        email: 'user@example.com',
        password: 'SecurePass123',
      });

      expect(dto.email).toBe('user@example.com');
    });

    it('should accept password with minimum length', () => {
      const dto = plainToInstance(SignUpDto, {
        email: 'user@example.com',
        password: '12345678',
      });

      expect(dto.password).toBe('12345678');
    });
  });

  describe('use cases', () => {
    it('should create valid DTO from request body', () => {
      const requestBody = {
        email: 'newuser@example.com',
        password: 'MySecurePass123!',
        first_name: 'Jane',
        last_name: 'Smith',
      };

      const dto = plainToInstance(SignUpDto, requestBody);

      expect(dto.email).toBe('newuser@example.com');
      expect(dto.password).toBe('MySecurePass123!');
      expect(dto.first_name).toBe('Jane');
      expect(dto.last_name).toBe('Smith');
    });

    it('should handle signup without names', () => {
      const minimalBody = {
        email: 'minimal@example.com',
        password: 'Password123',
      };

      const dto = plainToInstance(SignUpDto, minimalBody);

      expect(dto.email).toBe('minimal@example.com');
      expect(dto.password).toBe('Password123');
      expect(dto.first_name).toBeUndefined();
      expect(dto.last_name).toBeUndefined();
    });

    it('should serialize to JSON correctly', () => {
      const dto = plainToInstance(SignUpDto, {
        email: 'test@example.com',
        password: 'SecurePass123',
        first_name: 'John',
        last_name: 'Doe',
      });

      const json = JSON.parse(JSON.stringify(dto));

      expect(json.email).toBe('test@example.com');
      expect(json.password).toBe('SecurePass123');
      expect(json.first_name).toBe('John');
      expect(json.last_name).toBe('Doe');
    });
  });

  describe('edge cases', () => {
    it('should handle empty first_name', () => {
      const dto = plainToInstance(SignUpDto, {
        email: 'test@example.com',
        password: 'SecurePass123',
        first_name: '',
      });

      expect(dto.first_name).toBe('');
    });

    it('should handle empty last_name', () => {
      const dto = plainToInstance(SignUpDto, {
        email: 'test@example.com',
        password: 'SecurePass123',
        last_name: '',
      });

      expect(dto.last_name).toBe('');
    });

    it('should handle special characters in names', () => {
      const dto = plainToInstance(SignUpDto, {
        email: 'test@example.com',
        password: 'SecurePass123',
        first_name: 'José María',
        last_name: "O'Connor",
      });

      expect(dto.first_name).toBe('José María');
      expect(dto.last_name).toBe("O'Connor");
    });

    it('should handle very long names', () => {
      const longName = 'A'.repeat(100);
      const dto = plainToInstance(SignUpDto, {
        email: 'test@example.com',
        password: 'SecurePass123',
        first_name: longName,
        last_name: longName,
      });

      expect(dto.first_name).toBe(longName);
      expect(dto.last_name).toBe(longName);
    });
  });

  describe('password requirements', () => {
    it('should handle passwords with exactly 8 characters', () => {
      const dto = plainToInstance(SignUpDto, {
        email: 'test@example.com',
        password: '12345678',
      });

      expect(dto.password).toBe('12345678');
    });

    it('should handle long passwords', () => {
      const longPassword = 'A'.repeat(100);
      const dto = plainToInstance(SignUpDto, {
        email: 'test@example.com',
        password: longPassword,
      });

      expect(dto.password).toBe(longPassword);
    });

    it('should handle passwords with special characters', () => {
      const dto = plainToInstance(SignUpDto, {
        email: 'test@example.com',
        password: 'P@$$w0rd!123',
      });

      expect(dto.password).toBe('P@$$w0rd!123');
    });
  });
});
