import { plainToInstance } from 'class-transformer';
import { HelloResponseDto } from './hello-response.dto';

// Mock class-validator to avoid issues in test environment
jest.mock('class-validator', () => ({
  validate: jest.fn().mockResolvedValue([]),
  validateSync: jest.fn().mockReturnValue([]),
}));

describe('HelloResponseDto', () => {
  describe('class structure', () => {
    it('should have message property', () => {
      const dto = new HelloResponseDto();
      dto.message = 'Hello';

      expect(dto.message).toBe('Hello');
    });

    it('should have timestamp property', () => {
      const dto = new HelloResponseDto();
      const date = new Date();
      dto.timestamp = date;

      expect(dto.timestamp).toBe(date);
    });

    it('should have request_id property', () => {
      const dto = new HelloResponseDto();
      dto.request_id = '550e8400-e29b-41d4-a716-446655440000';

      expect(dto.request_id).toBe('550e8400-e29b-41d4-a716-446655440000');
    });

    it('should allow optional timestamp', () => {
      const dto = new HelloResponseDto();
      dto.message = 'Hello';
      dto.request_id = '550e8400-e29b-41d4-a716-446655440000';

      expect(dto.timestamp).toBeUndefined();
    });

    it('should allow optional request_id', () => {
      const dto = new HelloResponseDto();
      dto.message = 'Hello';

      expect(dto.request_id).toBeUndefined();
    });
  });

  describe('plainToInstance transformation', () => {
    it('should transform plain object to HelloResponseDto instance', () => {
      const plainObject = {
        message: 'Hello from API!',
        timestamp: new Date(),
        request_id: '550e8400-e29b-41d4-a716-446655440000',
      };

      const dto = plainToInstance(HelloResponseDto, plainObject);

      expect(dto).toBeInstanceOf(HelloResponseDto);
      expect(dto.message).toBe(plainObject.message);
      expect(dto.timestamp).toEqual(plainObject.timestamp);
      expect(dto.request_id).toBe(plainObject.request_id);
    });

    it('should handle partial objects', () => {
      const plainObject = {
        message: 'Hello from API!',
      };

      const dto = plainToInstance(HelloResponseDto, plainObject);

      expect(dto).toBeInstanceOf(HelloResponseDto);
      expect(dto.message).toBe(plainObject.message);
      expect(dto.timestamp).toBeUndefined();
      expect(dto.request_id).toBeUndefined();
    });
  });

  describe('validation', () => {
    it('should be instantiable', () => {
      const dto = new HelloResponseDto();
      dto.message = 'Hello from API!';

      expect(dto.message).toBe('Hello from API!');
    });
  });

  describe('use cases', () => {
    it('should create valid response from AppService', () => {
      const serviceResponse = {
        message: 'Hello from API!',
        timestamp: new Date(),
        request_id: crypto.randomUUID(),
      };

      const dto = plainToInstance(HelloResponseDto, serviceResponse);

      expect(dto.message).toBe('Hello from API!');
      expect(dto.timestamp).toBeInstanceOf(Date);
      expect(typeof dto.request_id).toBe('string');
      expect(dto.request_id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
    });

    it('should handle minimal response', () => {
      const minimalResponse = {
        message: 'Hello from API!',
      };

      const dto = plainToInstance(HelloResponseDto, minimalResponse);

      expect(dto.message).toBe('Hello from API!');
      expect(dto.timestamp).toBeUndefined();
      expect(dto.request_id).toBeUndefined();
    });

    it('should serialize to JSON correctly', () => {
      const dto = plainToInstance(HelloResponseDto, {
        message: 'Hello from API!',
        timestamp: new Date('2025-02-26T10:30:00.000Z'),
        request_id: '550e8400-e29b-41d4-a716-446655440000',
      });

      const json = JSON.parse(JSON.stringify(dto));

      expect(json.message).toBe('Hello from API!');
      expect(json.timestamp).toBe('2025-02-26T10:30:00.000Z');
      expect(json.request_id).toBe('550e8400-e29b-41d4-a716-446655440000');
    });
  });

  describe('edge cases', () => {
    it('should handle empty message', () => {
      const dto = plainToInstance(HelloResponseDto, {
        message: '',
      });

      expect(dto.message).toBe('');
    });

    it('should handle very long message', () => {
      const longMessage = 'A'.repeat(10000);
      const dto = plainToInstance(HelloResponseDto, {
        message: longMessage,
      });

      expect(dto.message).toBe(longMessage);
    });

    it('should handle invalid UUID format in request_id', () => {
      const dto = plainToInstance(HelloResponseDto, {
        message: 'Hello',
        request_id: 'not-a-uuid',
      });

      expect(dto.request_id).toBe('not-a-uuid');
    });

    it('should handle invalid date format', () => {
      const dto = plainToInstance(HelloResponseDto, {
        message: 'Hello',
        timestamp: new Date('invalid'),
      });

      expect(dto.timestamp).toBeInstanceOf(Date);
      expect(isNaN(dto.timestamp.getTime())).toBe(true);
    });
  });
});
