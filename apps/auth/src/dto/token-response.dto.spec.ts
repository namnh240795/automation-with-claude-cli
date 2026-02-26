import { plainToInstance } from 'class-transformer';
import { TokenResponseDto } from './token-response.dto';

// Mock class-validator to avoid issues in test environment
jest.mock('class-validator', () => ({
  validate: jest.fn().mockResolvedValue([]),
  validateSync: jest.fn().mockReturnValue([]),
}));

describe('TokenResponseDto', () => {
  describe('class structure', () => {
    it('should have access_token property', () => {
      const dto = new TokenResponseDto();
      dto.access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';

      expect(dto.access_token).toBe('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');
    });

    it('should have refresh_token property', () => {
      const dto = new TokenResponseDto();
      dto.refresh_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.refresh';

      expect(dto.refresh_token).toBe('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.refresh');
    });

    it('should have token_type property', () => {
      const dto = new TokenResponseDto();
      dto.token_type = 'Bearer';

      expect(dto.token_type).toBe('Bearer');
    });

    it('should have expires_in property', () => {
      const dto = new TokenResponseDto();
      dto.expires_in = 3600;

      expect(dto.expires_in).toBe(3600);
    });
  });

  describe('plainToInstance transformation', () => {
    it('should transform plain object to TokenResponseDto instance', () => {
      const plainObject = {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
        refresh_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.refresh',
        token_type: 'Bearer',
        expires_in: 3600,
      };

      const dto = plainToInstance(TokenResponseDto, plainObject);

      expect(dto).toBeInstanceOf(TokenResponseDto);
      expect(dto.access_token).toBe(plainObject.access_token);
      expect(dto.refresh_token).toBe(plainObject.refresh_token);
      expect(dto.token_type).toBe(plainObject.token_type);
      expect(dto.expires_in).toBe(plainObject.expires_in);
    });
  });

  describe('validation', () => {
    it('should be instantiable', () => {
      const dto = new TokenResponseDto();
      dto.access_token = 'access-token';
      dto.refresh_token = 'refresh-token';
      dto.token_type = 'Bearer';
      dto.expires_in = 3600;

      expect(dto.access_token).toBe('access-token');
      expect(dto.token_type).toBe('Bearer');
      expect(dto.expires_in).toBe(3600);
    });
  });

  describe('use cases', () => {
    it('should create valid response from AuthService', () => {
      const serviceResponse = {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.access',
        refresh_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.refresh',
        token_type: 'Bearer',
        expires_in: 3600,
      };

      const dto = plainToInstance(TokenResponseDto, serviceResponse);

      expect(dto.access_token).toBe('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.access');
      expect(dto.refresh_token).toBe('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.refresh');
      expect(dto.token_type).toBe('Bearer');
      expect(dto.expires_in).toBe(3600);
    });

    it('should serialize to JSON correctly', () => {
      const dto = plainToInstance(TokenResponseDto, {
        access_token: 'access-token-123',
        refresh_token: 'refresh-token-456',
        token_type: 'Bearer',
        expires_in: 7200,
      });

      const json = JSON.parse(JSON.stringify(dto));

      expect(json.access_token).toBe('access-token-123');
      expect(json.refresh_token).toBe('refresh-token-456');
      expect(json.token_type).toBe('Bearer');
      expect(json.expires_in).toBe(7200);
    });
  });

  describe('token values', () => {
    it('should handle JWT access tokens', () => {
      const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
      const dto = plainToInstance(TokenResponseDto, {
        access_token: jwtToken,
        refresh_token: jwtToken,
        token_type: 'Bearer',
        expires_in: 3600,
      });

      expect(dto.access_token).toBe(jwtToken);
      expect(dto.refresh_token).toBe(jwtToken);
    });

    it('should handle Bearer token type', () => {
      const dto = plainToInstance(TokenResponseDto, {
        access_token: 'token',
        refresh_token: 'token',
        token_type: 'Bearer',
        expires_in: 3600,
      });

      expect(dto.token_type).toBe('Bearer');
    });

    it('should handle different expiration values', () => {
      const testCases = [
        3600,    // 1 hour
        7200,    // 2 hours
        86400,   // 1 day
        604800,  // 7 days
      ];

      testCases.forEach((expiresIn) => {
        const dto = plainToInstance(TokenResponseDto, {
          access_token: 'token',
          refresh_token: 'token',
          token_type: 'Bearer',
          expires_in: expiresIn,
        });

        expect(dto.expires_in).toBe(expiresIn);
      });
    });
  });

  describe('edge cases', () => {
    it('should handle empty access_token', () => {
      const dto = plainToInstance(TokenResponseDto, {
        access_token: '',
        refresh_token: 'refresh-token',
        token_type: 'Bearer',
        expires_in: 3600,
      });

      expect(dto.access_token).toBe('');
    });

    it('should handle empty refresh_token', () => {
      const dto = plainToInstance(TokenResponseDto, {
        access_token: 'access-token',
        refresh_token: '',
        token_type: 'Bearer',
        expires_in: 3600,
      });

      expect(dto.refresh_token).toBe('');
    });

    it('should handle zero expiration', () => {
      const dto = plainToInstance(TokenResponseDto, {
        access_token: 'token',
        refresh_token: 'token',
        token_type: 'Bearer',
        expires_in: 0,
      });

      expect(dto.expires_in).toBe(0);
    });

    it('should handle very long tokens', () => {
      const longToken = 'a'.repeat(10000);
      const dto = plainToInstance(TokenResponseDto, {
        access_token: longToken,
        refresh_token: longToken,
        token_type: 'Bearer',
        expires_in: 3600,
      });

      expect(dto.access_token).toBe(longToken);
      expect(dto.refresh_token).toBe(longToken);
    });

    it('should handle special characters in tokens', () => {
      const specialToken = '!@#$%^&*()_+-=[]{}|;:,.<>?';
      const dto = plainToInstance(TokenResponseDto, {
        access_token: specialToken,
        refresh_token: specialToken,
        token_type: 'Bearer',
        expires_in: 3600,
      });

      expect(dto.access_token).toBe(specialToken);
      expect(dto.refresh_token).toBe(specialToken);
    });
  });

  describe('required properties', () => {
    it('should require all properties', () => {
      const dto = new TokenResponseDto();

      expect(dto.access_token).toBeUndefined();
      expect(dto.refresh_token).toBeUndefined();
      expect(dto.token_type).toBeUndefined();
      expect(dto.expires_in).toBeUndefined();
    });
  });
});
