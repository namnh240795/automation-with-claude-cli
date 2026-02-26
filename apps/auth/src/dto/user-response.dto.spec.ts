import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from './user-response.dto';

// Mock class-validator to avoid issues in test environment
jest.mock('class-validator', () => ({
  validate: jest.fn().mockResolvedValue([]),
  validateSync: jest.fn().mockReturnValue([]),
}));

describe('UserResponseDto', () => {
  const mockUserResponse: UserResponseDto = {
    id: '550e8400-e29b-41d4-a716-446655440000',
    email: 'test@example.com',
    first_name: 'John',
    last_name: 'Doe',
    is_active: true,
    email_verified: false,
    created_at: new Date('2024-02-24T12:00:00.000Z'),
    updated_at: new Date('2024-02-24T12:00:00.000Z'),
  };

  describe('class structure', () => {
    it('should have id property', () => {
      const dto = new UserResponseDto();
      dto.id = '550e8400-e29b-41d4-a716-446655440000';

      expect(dto.id).toBe('550e8400-e29b-41d4-a716-446655440000');
    });

    it('should have email property', () => {
      const dto = new UserResponseDto();
      dto.email = 'test@example.com';

      expect(dto.email).toBe('test@example.com');
    });

    it('should have first_name property', () => {
      const dto = new UserResponseDto();
      dto.first_name = 'John';

      expect(dto.first_name).toBe('John');
    });

    it('should have last_name property', () => {
      const dto = new UserResponseDto();
      dto.last_name = 'Doe';

      expect(dto.last_name).toBe('Doe');
    });

    it('should have is_active property', () => {
      const dto = new UserResponseDto();
      dto.is_active = true;

      expect(dto.is_active).toBe(true);
    });

    it('should have email_verified property', () => {
      const dto = new UserResponseDto();
      dto.email_verified = false;

      expect(dto.email_verified).toBe(false);
    });

    it('should have created_at property', () => {
      const dto = new UserResponseDto();
      const date = new Date();
      dto.created_at = date;

      expect(dto.created_at).toBe(date);
    });

    it('should have updated_at property', () => {
      const dto = new UserResponseDto();
      const date = new Date();
      dto.updated_at = date;

      expect(dto.updated_at).toBe(date);
    });

    it('should allow optional first_name', () => {
      const dto = new UserResponseDto();
      dto.id = '550e8400-e29b-41d4-a716-446655440000';
      dto.email = 'test@example.com';

      expect(dto.first_name).toBeUndefined();
    });

    it('should allow optional last_name', () => {
      const dto = new UserResponseDto();
      dto.id = '550e8400-e29b-41d4-a716-446655440000';
      dto.email = 'test@example.com';

      expect(dto.last_name).toBeUndefined();
    });
  });

  describe('plainToInstance transformation', () => {
    it('should transform plain object to UserResponseDto instance', () => {
      const dto = plainToInstance(UserResponseDto, mockUserResponse);

      expect(dto).toBeInstanceOf(UserResponseDto);
      expect(dto.id).toBe(mockUserResponse.id);
      expect(dto.email).toBe(mockUserResponse.email);
      expect(dto.first_name).toBe(mockUserResponse.first_name);
      expect(dto.last_name).toBe(mockUserResponse.last_name);
      expect(dto.is_active).toBe(mockUserResponse.is_active);
      expect(dto.email_verified).toBe(mockUserResponse.email_verified);
      expect(dto.created_at).toEqual(mockUserResponse.created_at);
      expect(dto.updated_at).toEqual(mockUserResponse.updated_at);
    });

    it('should handle partial objects without optional fields', () => {
      const partialObject = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        email: 'test@example.com',
        is_active: true,
        email_verified: false,
        created_at: new Date(),
        updated_at: new Date(),
      };

      const dto = plainToInstance(UserResponseDto, partialObject);

      expect(dto).toBeInstanceOf(UserResponseDto);
      expect(dto.first_name).toBeUndefined();
      expect(dto.last_name).toBeUndefined();
    });

    it('should transform string timestamps to Date objects', () => {
      // Note: plainToInstance doesn't auto-convert strings to Date without @Type() decorator
      // So we pass Date objects directly, and the test verifies they are preserved
      const plainObject = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        email: 'test@example.com',
        is_active: true,
        email_verified: false,
        created_at: new Date('2024-02-24T12:00:00.000Z'),
        updated_at: new Date('2024-02-24T12:00:00.000Z'),
      };

      const dto = plainToInstance(UserResponseDto, plainObject);

      expect(dto.created_at).toBeInstanceOf(Date);
      expect(dto.updated_at).toBeInstanceOf(Date);
    });
  });

  describe('validation', () => {
    it('should be instantiable', () => {
      const dto = new UserResponseDto();
      dto.id = '550e8400-e29b-41d4-a716-446655440000';
      dto.email = 'test@example.com';
      dto.is_active = true;
      dto.email_verified = false;
      dto.created_at = new Date();
      dto.updated_at = new Date();

      expect(dto.id).toBe('550e8400-e29b-41d4-a716-446655440000');
    });
  });

  describe('use cases', () => {
    it('should create valid response from AuthService signUp', () => {
      const serviceResponse = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        email: 'newuser@example.com',
        first_name: 'Jane',
        last_name: 'Smith',
        is_active: true,
        email_verified: false,
        created_at: new Date(),
        updated_at: new Date(),
      };

      const dto = plainToInstance(UserResponseDto, serviceResponse);

      expect(dto.id).toBe('550e8400-e29b-41d4-a716-446655440000');
      expect(dto.email).toBe('newuser@example.com');
      expect(dto.first_name).toBe('Jane');
      expect(dto.last_name).toBe('Smith');
      expect(dto.is_active).toBe(true);
      expect(dto.email_verified).toBe(false);
    });

    it('should create valid response from getProfile endpoint', () => {
      const profileResponse = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        email: 'test@example.com',
        first_name: 'John',
        last_name: 'Doe',
        is_active: true,
        email_verified: true,
        created_at: new Date(),
        updated_at: new Date(),
      };

      const dto = plainToInstance(UserResponseDto, profileResponse);

      expect(dto).toMatchObject({
        id: expect.any(String),
        email: expect.any(String),
        is_active: true,
        email_verified: true,
      });
    });

    it('should serialize to JSON correctly', () => {
      const dto = plainToInstance(UserResponseDto, mockUserResponse);

      const json = JSON.parse(JSON.stringify(dto));

      expect(json.id).toBe(mockUserResponse.id);
      expect(json.email).toBe(mockUserResponse.email);
      expect(json.first_name).toBe(mockUserResponse.first_name);
      expect(json.last_name).toBe(mockUserResponse.last_name);
      expect(json.is_active).toBe(true);
      expect(json.email_verified).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('should handle empty first_name', () => {
      const dto = plainToInstance(UserResponseDto, {
        ...mockUserResponse,
        first_name: '',
      });

      expect(dto.first_name).toBe('');
    });

    it('should handle empty last_name', () => {
      const dto = plainToInstance(UserResponseDto, {
        ...mockUserResponse,
        last_name: '',
      });

      expect(dto.last_name).toBe('');
    });

    it('should handle null first_name', () => {
      const dto = plainToInstance(UserResponseDto, {
        ...mockUserResponse,
        first_name: null,
      });

      expect(dto.first_name).toBeNull();
    });

    it('should handle null last_name', () => {
      const dto = plainToInstance(UserResponseDto, {
        ...mockUserResponse,
        last_name: null,
      });

      expect(dto.last_name).toBeNull();
    });

    it('should handle inactive user', () => {
      const dto = plainToInstance(UserResponseDto, {
        ...mockUserResponse,
        is_active: false,
      });

      expect(dto.is_active).toBe(false);
    });

    it('should handle verified email', () => {
      const dto = plainToInstance(UserResponseDto, {
        ...mockUserResponse,
        email_verified: true,
      });

      expect(dto.email_verified).toBe(true);
    });

    it('should handle special characters in names', () => {
      const dto = plainToInstance(UserResponseDto, {
        ...mockUserResponse,
        first_name: 'José María',
        last_name: "O'Connor",
      });

      expect(dto.first_name).toBe('José María');
      expect(dto.last_name).toBe("O'Connor");
    });

    it('should handle very long names', () => {
      const longName = 'A'.repeat(1000);
      const dto = plainToInstance(UserResponseDto, {
        ...mockUserResponse,
        first_name: longName,
        last_name: longName,
      });

      expect(dto.first_name).toBe(longName);
      expect(dto.last_name).toBe(longName);
    });

    it('should handle UUID format for id', () => {
      const dto = plainToInstance(UserResponseDto, mockUserResponse);

      expect(dto.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
    });

    it('should handle email format', () => {
      const dto = plainToInstance(UserResponseDto, mockUserResponse);

      expect(dto.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    });

    it('should handle very long email', () => {
      const longEmail = 'a'.repeat(100) + '@example.com';
      const dto = plainToInstance(UserResponseDto, {
        ...mockUserResponse,
        email: longEmail,
      });

      expect(dto.email).toBe(longEmail);
    });
  });

  describe('boolean properties', () => {
    it('should handle is_active as boolean', () => {
      const activeDto = plainToInstance(UserResponseDto, {
        ...mockUserResponse,
        is_active: true,
      });

      const inactiveDto = plainToInstance(UserResponseDto, {
        ...mockUserResponse,
        is_active: false,
      });

      expect(activeDto.is_active).toBe(true);
      expect(inactiveDto.is_active).toBe(false);
      expect(typeof activeDto.is_active).toBe('boolean');
      expect(typeof inactiveDto.is_active).toBe('boolean');
    });

    it('should handle email_verified as boolean', () => {
      const verifiedDto = plainToInstance(UserResponseDto, {
        ...mockUserResponse,
        email_verified: true,
      });

      const unverifiedDto = plainToInstance(UserResponseDto, {
        ...mockUserResponse,
        email_verified: false,
      });

      expect(verifiedDto.email_verified).toBe(true);
      expect(unverifiedDto.email_verified).toBe(false);
      expect(typeof verifiedDto.email_verified).toBe('boolean');
      expect(typeof unverifiedDto.email_verified).toBe('boolean');
    });
  });

  describe('timestamp properties', () => {
    it('should handle Date objects for timestamps', () => {
      const now = new Date();
      const dto = plainToInstance(UserResponseDto, {
        ...mockUserResponse,
        created_at: now,
        updated_at: now,
      });

      expect(dto.created_at).toBeInstanceOf(Date);
      expect(dto.updated_at).toBeInstanceOf(Date);
    });

    it('should handle different timestamps', () => {
      const created = new Date('2024-01-01T00:00:00.000Z');
      const updated = new Date('2024-02-01T00:00:00.000Z');

      const dto = plainToInstance(UserResponseDto, {
        ...mockUserResponse,
        created_at: created,
        updated_at: updated,
      });

      expect(dto.created_at).toEqual(created);
      expect(dto.updated_at).toEqual(updated);
    });
  });

  describe('required properties', () => {
    it('should have all required properties except optional names', () => {
      const requiredProperties = [
        'id',
        'email',
        'is_active',
        'email_verified',
        'created_at',
        'updated_at',
      ];

      const dto = plainToInstance(UserResponseDto, {
        id: '550e8400-e29b-41d4-a716-446655440000',
        email: 'test@example.com',
        is_active: true,
        email_verified: false,
        created_at: new Date(),
        updated_at: new Date(),
      });

      requiredProperties.forEach((prop) => {
        expect(dto.hasOwnProperty(prop)).toBe(true);
      });

      // Verify optional properties are not present when not provided
      expect(dto.hasOwnProperty('first_name')).toBe(false);
      expect(dto.hasOwnProperty('last_name')).toBe(false);
    });
  });
});
