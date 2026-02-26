import { plainToInstance } from 'class-transformer';
import { HealthResponseDto } from './health-response.dto';

// Mock class-validator to avoid issues in test environment
jest.mock('class-validator', () => ({
  validate: jest.fn().mockResolvedValue([]),
  validateSync: jest.fn().mockReturnValue([]),
}));

describe('HealthResponseDto', () => {
  describe('class structure', () => {
    it('should have status property', () => {
      const dto = new HealthResponseDto();
      dto.status = 'ok';

      expect(dto.status).toBe('ok');
    });

    it('should have timestamp property', () => {
      const dto = new HealthResponseDto();
      const date = new Date();
      dto.timestamp = date;

      expect(dto.timestamp).toBe(date);
    });

    it('should have service property', () => {
      const dto = new HealthResponseDto();
      dto.service = 'backend';

      expect(dto.service).toBe('backend');
    });

    it('should have version property', () => {
      const dto = new HealthResponseDto();
      dto.version = '1.0.0';

      expect(dto.version).toBe('1.0.0');
    });

    it('should have uptime property', () => {
      const dto = new HealthResponseDto();
      dto.uptime = 123.456;

      expect(dto.uptime).toBe(123.456);
    });

    it('should allow optional service', () => {
      const dto = new HealthResponseDto();
      dto.status = 'ok';
      dto.timestamp = new Date();

      expect(dto.service).toBeUndefined();
    });

    it('should allow optional version', () => {
      const dto = new HealthResponseDto();
      dto.status = 'ok';
      dto.timestamp = new Date();

      expect(dto.version).toBeUndefined();
    });

    it('should allow optional uptime', () => {
      const dto = new HealthResponseDto();
      dto.status = 'ok';
      dto.timestamp = new Date();

      expect(dto.uptime).toBeUndefined();
    });
  });

  describe('plainToInstance transformation', () => {
    it('should transform plain object to HealthResponseDto instance', () => {
      const plainObject = {
        status: 'ok',
        timestamp: new Date(),
        service: 'backend',
        version: '1.0.0',
        uptime: 123.456,
      };

      const dto = plainToInstance(HealthResponseDto, plainObject);

      expect(dto).toBeInstanceOf(HealthResponseDto);
      expect(dto.status).toBe(plainObject.status);
      expect(dto.timestamp).toEqual(plainObject.timestamp);
      expect(dto.service).toBe(plainObject.service);
      expect(dto.version).toBe(plainObject.version);
      expect(dto.uptime).toBe(plainObject.uptime);
    });

    it('should handle partial objects', () => {
      const plainObject = {
        status: 'ok',
        timestamp: new Date(),
      };

      const dto = plainToInstance(HealthResponseDto, plainObject);

      expect(dto).toBeInstanceOf(HealthResponseDto);
      expect(dto.status).toBe(plainObject.status);
      expect(dto.timestamp).toEqual(plainObject.timestamp);
      expect(dto.service).toBeUndefined();
      expect(dto.version).toBeUndefined();
      expect(dto.uptime).toBeUndefined();
    });
  });

  describe('validation', () => {
    it('should be instantiable', () => {
      const dto = new HealthResponseDto();
      dto.status = 'ok';
      dto.timestamp = new Date();

      expect(dto.status).toBe('ok');
      expect(dto.timestamp).toBeInstanceOf(Date);
    });
  });

  describe('use cases', () => {
    it('should create valid response from AppService', () => {
      const serviceResponse = {
        status: 'ok',
        timestamp: new Date(),
        service: 'backend',
        version: '1.0.0',
        uptime: process.uptime(),
      };

      const dto = plainToInstance(HealthResponseDto, serviceResponse);

      expect(dto.status).toBe('ok');
      expect(dto.timestamp).toBeInstanceOf(Date);
      expect(dto.service).toBe('backend');
      expect(dto.version).toBe('1.0.0');
      expect(typeof dto.uptime).toBe('number');
      expect(dto.uptime).toBeGreaterThanOrEqual(0);
    });

    it('should handle minimal health check response', () => {
      const minimalResponse = {
        status: 'ok',
        timestamp: new Date(),
      };

      const dto = plainToInstance(HealthResponseDto, minimalResponse);

      expect(dto.status).toBe('ok');
      expect(dto.timestamp).toBeInstanceOf(Date);
      expect(dto.service).toBeUndefined();
      expect(dto.version).toBeUndefined();
      expect(dto.uptime).toBeUndefined();
    });

    it('should serialize to JSON correctly', () => {
      const dto = plainToInstance(HealthResponseDto, {
        status: 'ok',
        timestamp: new Date('2025-02-26T10:30:00.000Z'),
        service: 'backend',
        version: '1.0.0',
        uptime: 123.456,
      });

      const json = JSON.parse(JSON.stringify(dto));

      expect(json.status).toBe('ok');
      expect(json.timestamp).toBe('2025-02-26T10:30:00.000Z');
      expect(json.service).toBe('backend');
      expect(json.version).toBe('1.0.0');
      expect(json.uptime).toBe(123.456);
    });
  });

  describe('status values', () => {
    it('should accept "ok" as status', () => {
      const dto = plainToInstance(HealthResponseDto, {
        status: 'ok',
        timestamp: new Date(),
      });

      expect(dto.status).toBe('ok');
    });

    it('should accept "error" as status', () => {
      const dto = plainToInstance(HealthResponseDto, {
        status: 'error',
        timestamp: new Date(),
      });

      expect(dto.status).toBe('error');
    });

    it('should accept "degraded" as status', () => {
      const dto = plainToInstance(HealthResponseDto, {
        status: 'degraded',
        timestamp: new Date(),
      });

      expect(dto.status).toBe('degraded');
    });

    it('should accept any string as status', () => {
      const customStatus = 'maintenance';
      const dto = plainToInstance(HealthResponseDto, {
        status: customStatus,
        timestamp: new Date(),
      });

      expect(dto.status).toBe(customStatus);
    });
  });

  describe('edge cases', () => {
    it('should handle zero uptime', () => {
      const dto = plainToInstance(HealthResponseDto, {
        status: 'ok',
        timestamp: new Date(),
        uptime: 0,
      });

      expect(dto.uptime).toBe(0);
    });

    it('should handle very large uptime', () => {
      const largeUptime = 9999999.999;
      const dto = plainToInstance(HealthResponseDto, {
        status: 'ok',
        timestamp: new Date(),
        uptime: largeUptime,
      });

      expect(dto.uptime).toBe(largeUptime);
    });

    it('should handle empty service name', () => {
      const dto = plainToInstance(HealthResponseDto, {
        status: 'ok',
        timestamp: new Date(),
        service: '',
      });

      expect(dto.service).toBe('');
    });

    it('should handle empty version string', () => {
      const dto = plainToInstance(HealthResponseDto, {
        status: 'ok',
        timestamp: new Date(),
        version: '',
      });

      expect(dto.version).toBe('');
    });

    it('should handle negative uptime (edge case)', () => {
      const dto = plainToInstance(HealthResponseDto, {
        status: 'ok',
        timestamp: new Date(),
        uptime: -1,
      });

      expect(dto.uptime).toBe(-1);
    });
  });
});
