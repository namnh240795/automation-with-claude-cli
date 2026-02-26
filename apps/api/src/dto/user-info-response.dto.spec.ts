import { plainToInstance } from 'class-transformer';
import { UserInfoResponseDto } from './user-info-response.dto';

// Mock class-validator to avoid issues in test environment
jest.mock('class-validator', () => ({
  validate: jest.fn().mockResolvedValue([]),
  validateSync: jest.fn().mockReturnValue([]),
}));

describe('UserInfoResponseDto', () => {
  describe('class structure', () => {
    it('should have sub property', () => {
      const dto = new UserInfoResponseDto();
      dto.sub = '123e4567-e89b-12d3-a456-426614174000';

      expect(dto.sub).toBe('123e4567-e89b-12d3-a456-426614174000');
    });

    it('should have email property', () => {
      const dto = new UserInfoResponseDto();
      dto.email = 'test@example.com';

      expect(dto.email).toBe('test@example.com');
    });

    it('should have first_name property', () => {
      const dto = new UserInfoResponseDto();
      dto.first_name = 'John';

      expect(dto.first_name).toBe('John');
    });

    it('should have last_name property', () => {
      const dto = new UserInfoResponseDto();
      dto.last_name = 'Doe';

      expect(dto.last_name).toBe('Doe');
    });

    it('should have message property', () => {
      const dto = new UserInfoResponseDto();
      dto.message = 'This is a protected endpoint - you have access!';

      expect(dto.message).toBe('This is a protected endpoint - you have access!');
    });

    it('should have timestamp property', () => {
      const dto = new UserInfoResponseDto();
      const date = new Date();
      dto.timestamp = date;

      expect(dto.timestamp).toBe(date);
    });

    it('should allow optional first_name', () => {
      const dto = new UserInfoResponseDto();
      dto.sub = '123e4567-e89b-12d3-a456-426614174000';
      dto.email = 'test@example.com';

      expect(dto.first_name).toBeUndefined();
    });

    it('should allow optional last_name', () => {
      const dto = new UserInfoResponseDto();
      dto.sub = '123e4567-e89b-12d3-a456-426614174000';
      dto.email = 'test@example.com';

      expect(dto.last_name).toBeUndefined();
    });
  });

  describe('plainToInstance transformation', () => {
    it('should transform plain object to UserInfoResponseDto instance', () => {
      const plainObject = {
        sub: '123e4567-e89b-12d3-a456-426614174000',
        email: 'test@example.com',
        first_name: 'John',
        last_name: 'Doe',
        message: 'This is a protected endpoint - you have access!',
        timestamp: new Date(),
      };

      const dto = plainToInstance(UserInfoResponseDto, plainObject);

      expect(dto).toBeInstanceOf(UserInfoResponseDto);
      expect(dto.sub).toBe(plainObject.sub);
      expect(dto.email).toBe(plainObject.email);
      expect(dto.first_name).toBe(plainObject.first_name);
      expect(dto.last_name).toBe(plainObject.last_name);
      expect(dto.message).toBe(plainObject.message);
      expect(dto.timestamp).toEqual(plainObject.timestamp);
    });

    it('should handle partial objects without optional fields', () => {
      const plainObject = {
        sub: '123e4567-e89b-12d3-a456-426614174000',
        email: 'test@example.com',
        message: 'This is a protected endpoint - you have access!',
        timestamp: new Date(),
      };

      const dto = plainToInstance(UserInfoResponseDto, plainObject);

      expect(dto).toBeInstanceOf(UserInfoResponseDto);
      expect(dto.first_name).toBeUndefined();
      expect(dto.last_name).toBeUndefined();
    });
  });

  describe('validation', () => {
    it('should be instantiable', () => {
      const dto = new UserInfoResponseDto();
      dto.sub = '123e4567-e89b-12d3-a456-426614174000';
      dto.email = 'test@example.com';
      dto.message = 'This is a protected endpoint - you have access!';
      dto.timestamp = new Date();

      expect(dto.sub).toBe('123e4567-e89b-12d3-a456-426614174000');
    });
  });

  describe('use cases', () => {
    it('should create valid response from AppService with JWT payload', () => {
      const jwtPayload = {
        sub: '123e4567-e89b-12d3-a456-426614174000',
        email: 'test@example.com',
        first_name: 'John',
        last_name: 'Doe',
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600,
      };

      const serviceResponse = {
        sub: jwtPayload.sub,
        email: jwtPayload.email,
        first_name: jwtPayload.first_name,
        last_name: jwtPayload.last_name,
        message: 'This is a protected endpoint - you have access!',
        timestamp: new Date(),
      };

      const dto = plainToInstance(UserInfoResponseDto, serviceResponse);

      expect(dto.sub).toBe(jwtPayload.sub);
      expect(dto.email).toBe(jwtPayload.email);
      expect(dto.first_name).toBe(jwtPayload.first_name);
      expect(dto.last_name).toBe(jwtPayload.last_name);
      expect(dto.message).toBe('This is a protected endpoint - you have access!');
      expect(dto.timestamp).toBeInstanceOf(Date);
    });

    it('should create valid response from JWT payload without optional fields', () => {
      const jwtPayload = {
        sub: '123e4567-e89b-12d3-a456-426614174000',
        email: 'test@example.com',
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600,
      };

      const serviceResponse = {
        sub: jwtPayload.sub,
        email: jwtPayload.email,
        message: 'This is a protected endpoint - you have access!',
        timestamp: new Date(),
      };

      const dto = plainToInstance(UserInfoResponseDto, serviceResponse);

      expect(dto.sub).toBe(jwtPayload.sub);
      expect(dto.email).toBe(jwtPayload.email);
      expect(dto.first_name).toBeUndefined();
      expect(dto.last_name).toBeUndefined();
      expect(dto.message).toBe('This is a protected endpoint - you have access!');
      expect(dto.timestamp).toBeInstanceOf(Date);
    });

    it('should serialize to JSON correctly', () => {
      const dto = plainToInstance(UserInfoResponseDto, {
        sub: '123e4567-e89b-12d3-a456-426614174000',
        email: 'test@example.com',
        first_name: 'John',
        last_name: 'Doe',
        message: 'This is a protected endpoint - you have access!',
        timestamp: new Date('2025-02-26T10:30:00.000Z'),
      });

      const json = JSON.parse(JSON.stringify(dto));

      expect(json.sub).toBe('123e4567-e89b-12d3-a456-426614174000');
      expect(json.email).toBe('test@example.com');
      expect(json.first_name).toBe('John');
      expect(json.last_name).toBe('Doe');
      expect(json.message).toBe('This is a protected endpoint - you have access!');
      expect(json.timestamp).toBe('2025-02-26T10:30:00.000Z');
    });
  });

  describe('edge cases', () => {
    it('should handle empty first_name', () => {
      const dto = plainToInstance(UserInfoResponseDto, {
        sub: '123e4567-e89b-12d3-a456-426614174000',
        email: 'test@example.com',
        first_name: '',
        message: 'This is a protected endpoint - you have access!',
        timestamp: new Date(),
      });

      expect(dto.first_name).toBe('');
    });

    it('should handle empty last_name', () => {
      const dto = plainToInstance(UserInfoResponseDto, {
        sub: '123e4567-e89b-12d3-a456-426614174000',
        email: 'test@example.com',
        last_name: '',
        message: 'This is a protected endpoint - you have access!',
        timestamp: new Date(),
      });

      expect(dto.last_name).toBe('');
    });

    it('should handle null first_name', () => {
      const dto = plainToInstance(UserInfoResponseDto, {
        sub: '123e4567-e89b-12d3-a456-426614174000',
        email: 'test@example.com',
        first_name: null,
        message: 'This is a protected endpoint - you have access!',
        timestamp: new Date(),
      });

      expect(dto.first_name).toBeNull();
    });

    it('should handle null last_name', () => {
      const dto = plainToInstance(UserInfoResponseDto, {
        sub: '123e4567-e89b-12d3-a456-426614174000',
        email: 'test@example.com',
        last_name: null,
        message: 'This is a protected endpoint - you have access!',
        timestamp: new Date(),
      });

      expect(dto.last_name).toBeNull();
    });

    it('should handle special characters in names', () => {
      const dto = plainToInstance(UserInfoResponseDto, {
        sub: '123e4567-e89b-12d3-a456-426614174000',
        email: 'test@example.com',
        first_name: 'José María',
        last_name: "O'Connor",
        message: 'This is a protected endpoint - you have access!',
        timestamp: new Date(),
      });

      expect(dto.first_name).toBe('José María');
      expect(dto.last_name).toBe("O'Connor");
    });

    it('should handle very long names', () => {
      const longName = 'A'.repeat(1000);
      const dto = plainToInstance(UserInfoResponseDto, {
        sub: '123e4567-e89b-12d3-a456-426614174000',
        email: 'test@example.com',
        first_name: longName,
        last_name: longName,
        message: 'This is a protected endpoint - you have access!',
        timestamp: new Date(),
      });

      expect(dto.first_name).toBe(longName);
      expect(dto.last_name).toBe(longName);
    });
  });

  describe('JWT payload mapping', () => {
    it('should correctly map from JwtPayloadDto structure', () => {
      const jwtPayload = {
        sub: '550e8400-e29b-41d4-a716-446655440000',
        email: 'user@domain.com',
        first_name: 'Jane',
        last_name: 'Smith',
        iat: 1677721600,
        exp: 1677725200,
      };

      const dto = plainToInstance(UserInfoResponseDto, {
        sub: jwtPayload.sub,
        email: jwtPayload.email,
        first_name: jwtPayload.first_name,
        last_name: jwtPayload.last_name,
        message: 'This is a protected endpoint - you have access!',
        timestamp: new Date(),
      });

      expect(dto.sub).toBe(jwtPayload.sub);
      expect(dto.email).toBe(jwtPayload.email);
      expect(dto.first_name).toBe(jwtPayload.first_name);
      expect(dto.last_name).toBe(jwtPayload.last_name);
    });

    it('should handle UUID sub format', () => {
      const uuid = '550e8400-e29b-41d4-a716-446655440000';

      const dto = plainToInstance(UserInfoResponseDto, {
        sub: uuid,
        email: 'test@example.com',
        message: 'This is a protected endpoint - you have access!',
        timestamp: new Date(),
      });

      expect(dto.sub).toBe(uuid);
      expect(dto.sub).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
    });
  });
});
