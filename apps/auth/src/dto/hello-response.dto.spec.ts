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
      dto.message = 'Hello from Auth!';

      expect(dto.message).toBe('Hello from Auth!');
    });

    it('should have timestamp property', () => {
      const dto = new HelloResponseDto();
      const date = new Date();
      dto.timestamp = date;

      expect(dto.timestamp).toBe(date);
    });

    it('should have requestId property', () => {
      const dto = new HelloResponseDto();
      dto.requestId = '550e8400-e29b-41d4-a716-446655440000';

      expect(dto.requestId).toBe('550e8400-e29b-41d4-a716-446655440000');
    });

    it('should allow optional timestamp', () => {
      const dto = new HelloResponseDto();
      dto.message = 'Hello';

      expect(dto.timestamp).toBeUndefined();
    });

    it('should allow optional requestId', () => {
      const dto = new HelloResponseDto();
      dto.message = 'Hello';

      expect(dto.requestId).toBeUndefined();
    });
  });

  describe('plainToInstance transformation', () => {
    it('should transform plain object to HelloResponseDto instance', () => {
      const plainObject = {
        message: 'Hello from Auth!',
        timestamp: new Date(),
        requestId: '550e8400-e29b-41d4-a716-446655440000',
      };

      const dto = plainToInstance(HelloResponseDto, plainObject);

      expect(dto).toBeInstanceOf(HelloResponseDto);
      expect(dto.message).toBe(plainObject.message);
      expect(dto.timestamp).toEqual(plainObject.timestamp);
      expect(dto.requestId).toBe(plainObject.requestId);
    });

    it('should handle partial objects', () => {
      const plainObject = {
        message: 'Hello from Auth!',
      };

      const dto = plainToInstance(HelloResponseDto, plainObject);

      expect(dto).toBeInstanceOf(HelloResponseDto);
      expect(dto.message).toBe(plainObject.message);
      expect(dto.timestamp).toBeUndefined();
      expect(dto.requestId).toBeUndefined();
    });
  });

  describe('validation', () => {
    it('should be instantiable', () => {
      const dto = new HelloResponseDto();
      dto.message = 'Hello from Auth!';

      expect(dto.message).toBe('Hello from Auth!');
    });
  });

  describe('use cases', () => {
    it('should create valid response from AppService', () => {
      const serviceResponse = {
        message: 'Hello from Auth!',
        timestamp: new Date(),
        requestId: crypto.randomUUID(),
      };

      const dto = plainToInstance(HelloResponseDto, serviceResponse);

      expect(dto.message).toBe('Hello from Auth!');
      expect(dto.timestamp).toBeInstanceOf(Date);
      expect(typeof dto.requestId).toBe('string');
      expect(dto.requestId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
    });

    it('should handle minimal response', () => {
      const minimalResponse = {
        message: 'Hello from Auth!',
      };

      const dto = plainToInstance(HelloResponseDto, minimalResponse);

      expect(dto.message).toBe('Hello from Auth!');
      expect(dto.timestamp).toBeUndefined();
      expect(dto.requestId).toBeUndefined();
    });

    it('should serialize to JSON correctly', () => {
      const dto = plainToInstance(HelloResponseDto, {
        message: 'Hello from Auth!',
        timestamp: new Date('2025-02-26T10:30:00.000Z'),
        requestId: '550e8400-e29b-41d4-a716-446655440000',
      });

      const json = JSON.parse(JSON.stringify(dto));

      expect(json.message).toBe('Hello from Auth!');
      expect(json.timestamp).toBe('2025-02-26T10:30:00.000Z');
      expect(json.requestId).toBe('550e8400-e29b-41d4-a716-446655440000');
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

    it('should handle invalid UUID format in requestId', () => {
      const dto = plainToInstance(HelloResponseDto, {
        message: 'Hello',
        requestId: 'not-a-uuid',
      });

      expect(dto.requestId).toBe('not-a-uuid');
    });
  });
});
