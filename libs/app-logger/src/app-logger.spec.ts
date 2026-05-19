import { AppLogger, CustomLog, LogActivity } from './app-logger';
import { errorHandler } from './error-handler';
import { responseHandler } from './response-handler';
import { BadRequestException } from '@nestjs/common';
import { AxiosError, AxiosResponse } from 'axios';

describe('AppLogger', () => {
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    // Reset all static state before each test
    AppLogger.setLogPublisher(null);
    AppLogger.setServiceName('test-service');
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    jest.resetAllMocks();
  });

  function parseLogCall(index = 0): Record<string, unknown> {
    return JSON.parse(consoleLogSpy.mock.calls[index][0] as string);
  }

  describe('console fallback mode (no publisher set)', () => {
    it('should log a custom message with the correct structure', () => {
      const logger = new AppLogger('TestContext');
      const customLog: CustomLog = {
        input: { key: 'value' },
        output: { result: 'success' },
        function: 'testFunction',
      };
      logger.customLog(customLog);

      const log = parseLogCall();
      expect(log).toMatchObject({
        input_s: '{"key":"value"}',
        output_s: '{"result":"success"}',
        error_s: '',
        source_s: 'TestContext.testFunction',
        service_name: 'test-service',
      });
      expect(log).toHaveProperty('eventId');
      expect(log).toHaveProperty('timestamp');
    });

    it('should handle missing optional fields in CustomLog', () => {
      const logger = new AppLogger('TestContext');
      const customLog: CustomLog = { function: 'testFunction' };
      logger.customLog(customLog);

      const log = parseLogCall();
      expect(log).toMatchObject({
        input_s: '',
        output_s: '',
        error_s: '',
        source_s: 'TestContext.testFunction',
      });
    });

    it('should log only message field', () => {
      const logger = new AppLogger('TestContext');
      const customLog: CustomLog = {
        function: 'testFunction',
        message: 'Only message',
      };
      logger.customLog(customLog);

      const log = parseLogCall();
      expect(log).toMatchObject({
        input_s: '',
        output_s: '',
        error_s: '',
        source_s: 'TestContext.testFunction',
        message: 'Only message',
      });
    });

    it('should log only error field', () => {
      const logger = new AppLogger('TestContext');
      const customLog: CustomLog = {
        function: 'testFunction',
        error: 'Only error',
      };
      logger.customLog(customLog);

      const log = parseLogCall();
      expect(log).toMatchObject({
        input_s: '',
        output_s: '',
        error_s: 'Only error',
        source_s: 'TestContext.testFunction',
      });
    });

    it('should log with no optional fields at all', () => {
      const logger = new AppLogger('TestContext');
      logger.customLog({ function: 'testFunction' });

      const log = parseLogCall();
      expect(log).toMatchObject({
        input_s: '',
        output_s: '',
        error_s: '',
        source_s: 'TestContext.testFunction',
      });
    });

    it('should log falsy input/output values', () => {
      const logger = new AppLogger('TestContext');
      logger.customLog({ function: 'testFunction', input: 0, output: false });

      const log = parseLogCall();
      // JSON.stringify converts 0 to "0" and false to "false"
      expect(log.input_s).toBe('0');
      expect(log.output_s).toBe('false');
      expect(log.error_s).toBe('');
    });

    it('should log error and message fields together', () => {
      const logger = new AppLogger('TestContext');
      const customLog: CustomLog = {
        function: 'testFunction',
        error: 'Some error',
        message: 'Custom message',
      };
      logger.customLog(customLog);

      const log = parseLogCall();
      expect(log).toMatchObject({
        input_s: '',
        output_s: '',
        error_s: 'Some error',
        source_s: 'TestContext.testFunction',
        message: 'Custom message',
      });
    });

    it('should handle null and undefined input', () => {
      const logger = new AppLogger('TestContext');
      logger.customLog({
        function: 'testFunction',
        input: null,
        output: undefined,
      });

      const log = parseLogCall();
      // null becomes "null" after JSON.stringify, undefined becomes undefined
      expect(log.input_s).toBe('null');
      expect(log.output_s).toBe('');
      expect(log.error_s).toBe('');
    });

    it('should handle error as Error object and include exception', () => {
      const logger = new AppLogger('TestContext');
      const error = new Error('test error message');
      const customLog: CustomLog = {
        function: 'testFunction',
        error,
      };
      logger.customLog(customLog);

      const log = parseLogCall();
      expect(log.error_s).toBe('Error: test error message');
      expect(log).toHaveProperty('exception');
      expect((log as any).exception).toContain('Error: test error message');
    });

    it('should include duration_ms when provided', () => {
      const logger = new AppLogger('TestContext');
      const customLog: CustomLog = {
        function: 'testFunction',
        duration_ms: 150,
      };
      logger.customLog(customLog);

      const log = parseLogCall();
      expect(log.duration_ms).toBe(150);
    });

    it('should handle custom log with all fields', () => {
      const logger = new AppLogger('TestContext');
      const customLog: CustomLog = {
        function: 'testFunction',
        input: { data: 'input-data' },
        output: { data: 'output-data' },
        error: 'Test error',
        message: 'Test message',
        duration_ms: 42,
      };
      logger.customLog(customLog);

      const log = parseLogCall();
      expect(log).toMatchObject({
        input_s: '{"data":"input-data"}',
        output_s: '{"data":"output-data"}',
        error_s: 'Test error',
        source_s: 'TestContext.testFunction',
        message: 'Test message',
        duration_ms: 42,
        service_name: 'test-service',
      });
    });
  });

  describe('service name from SERVICE_PREFIX env', () => {
    it('should use SERVICE_PREFIX env var as service name', () => {
      // Reset and set new service name
      AppLogger.setServiceName('my-custom-service');
      const logger = new AppLogger('MyContext');
      logger.customLog({ function: 'testFn' });

      const log = parseLogCall();
      expect(log.service_name).toBe('my-custom-service');
    });

    it('should default to "unknown" when no SERVICE_PREFIX set', () => {
      AppLogger.setServiceName('unknown');
      const logger = new AppLogger('MyContext');
      logger.customLog({ function: 'testFn' });

      const log = parseLogCall();
      expect(log.service_name).toBe('unknown');
    });
  });

  describe('publisher mode', () => {
    it('should call publishLog when publisher is set', () => {
      const mockPublisher = {
        publishLog: jest.fn(),
      };
      AppLogger.setLogPublisher(mockPublisher as any);

      const logger = new AppLogger('TestContext');
      const customLog: CustomLog = {
        function: 'testFunction',
        input: { key: 'value' },
      };
      logger.customLog(customLog);

      expect(mockPublisher.publishLog).toHaveBeenCalledTimes(1);
      const publishedEvent = mockPublisher.publishLog.mock.calls[0][0];
      expect(publishedEvent).toMatchObject({
        source: 'test-service',
        action: 'testFunction',
        input: '{"key":"value"}',
      });
      expect(publishedEvent).toHaveProperty('eventId');
      expect(publishedEvent).toHaveProperty('timestamp');
    });

    it('should not call console.log when publisher is set', () => {
      const mockPublisher = {
        publishLog: jest.fn(),
      };
      AppLogger.setLogPublisher(mockPublisher as any);

      const logger = new AppLogger('TestContext');
      logger.customLog({ function: 'testFunction' });

      expect(console.log).not.toHaveBeenCalled();
    });
  });
});

describe('errorHandler', () => {
  it('should handle AxiosError with config.headers as null', () => {
    const error = new AxiosError('axios error', 'ERR_BAD_REQUEST', {
      headers: null,
    } as any);
    error.response = undefined;
    const result = errorHandler(error) as any;
    expect(result.config.headers.Authorization).toBe('***********');
    expect(result.config.headers['Ocp-Apim-Subscription-Key']).toBe('***********');
  });

  it('should handle AxiosError with config.headers as undefined', () => {
    const error = new AxiosError('axios error', 'ERR_BAD_REQUEST', {
      headers: undefined,
    } as any);
    error.response = undefined;
    const result = errorHandler(error) as any;
    expect(result.config.headers.Authorization).toBe('***********');
    expect(result.config.headers['Ocp-Apim-Subscription-Key']).toBe('***********');
  });

  it('should handle AxiosError with no sensitive headers', () => {
    const error = new AxiosError('axios error', 'ERR_BAD_REQUEST', {
      headers: {
        'Some-Header': 'value',
      },
    } as any);
    error.response = undefined;
    const result = errorHandler(error) as any;
    expect(result.config.headers['Authorization']).toBe('***********');
    expect(result.config.headers['Ocp-Apim-Subscription-Key']).toBe('***********');
    expect(result.config.headers['Some-Header']).toBe('value');
    expect(result.response).toBeUndefined();
    expect(result.status).toBeUndefined();
  });

  it('should handle AxiosError with no config', () => {
    const error = new AxiosError('axios error', 'ERR_BAD_REQUEST');
    error.config = undefined as any;
    error.response = undefined;
    const result = errorHandler(error) as any;
    expect(result.config).toBeUndefined();
    expect(result.response).toBeUndefined();
    expect(result.status).toBeUndefined();
  });

  it('should handle AxiosError', () => {
    const error = new AxiosError('axios error', 'ERR_BAD_REQUEST', {
      headers: {
        Authorization: 'secret',
        'Ocp-Apim-Subscription-Key': 'key',
      },
    } as any);
    error.response = {
      status: 400,
      statusText: 'Bad Request',
      data: 'data',
    } as AxiosResponse;
    const result = errorHandler(error) as any;
    expect(result).toMatchObject({
      message: 'axios error',
      name: 'AxiosError',
      code: 'ERR_BAD_REQUEST',
      config: expect.any(Object),
      response: expect.any(Object),
      status: 400,
    });
    expect(result.config.headers.Authorization).toBe('***********');
    expect(result.config.headers['Ocp-Apim-Subscription-Key']).toBe('***********');
  });

  it('should handle BadRequestException', () => {
    const error = new BadRequestException('bad request');
    const result = errorHandler(error);
    expect(result).toMatchObject({
      message: 'bad request',
      name: 'BadRequestException',
      response: expect.anything(),
    });
  });

  it('should handle generic Error', () => {
    const error = new Error('generic error');
    const result = errorHandler(error);
    expect(result).toMatchObject({
      message: 'generic error',
      name: 'Error',
      stack: expect.any(String),
    });
  });

  it('should handle unknown error', () => {
    const result = errorHandler('string error');
    expect(result).toMatchObject({ message: 'Unknown Exception' });
  });
});

describe('responseHandler', () => {
  it('should import AppLogger from index and use it', () => {
    const { AppLogger: IndexLogger } = require('./index');
    const logger = new IndexLogger('IndexTest');
    expect(logger).toBeInstanceOf(IndexLogger);
    jest.spyOn(console, 'log').mockImplementation(() => {});
    expect(() => logger.customLog({ function: 'testFunction' })).not.toThrow();
    jest.restoreAllMocks();
  });

  it('should return response data', () => {
    const response = { data: 'test data' } as AxiosResponse;
    expect(responseHandler(response)).toBe('test data');
  });
});

describe('LogActivity decorator', () => {
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    AppLogger.setLogPublisher(null);
    AppLogger.setServiceName('test-service');
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    jest.resetAllMocks();
  });

  function parseLogCall(index = 0): Record<string, unknown> {
    return JSON.parse(consoleLogSpy.mock.calls[index][0] as string);
  }

  it('should log successful method execution', async () => {
    class TestService {
      @LogActivity()
      async testMethod(input: string) {
        return `processed: ${input}`;
      }
    }

    const service = new TestService();
    const result = await service.testMethod('hello');

    expect(result).toBe('processed: hello');
    expect(consoleLogSpy).toHaveBeenCalled();
    const log = parseLogCall();
    expect(log.source_s).toBe('TestService.testMethod');
    expect(log.input_s).toBe('["hello"]');
    expect(log.output_s).toBe('"processed: hello"');
    expect(log.error_s).toBe('');
  });

  it('should log method execution errors', async () => {
    class TestService {
      @LogActivity()
      async failingMethod() {
        throw new Error('Test error');
      }
    }

    const service = new TestService();

    await expect(service.failingMethod()).rejects.toThrow('Test error');
    expect(consoleLogSpy).toHaveBeenCalled();
    const log = parseLogCall();
    expect(log.source_s).toBe('TestService.failingMethod');
    expect(log.error_s).toBeDefined();
    expect((log as any).error_s).toContain('Error: Test error');
  });

  it('should handle methods with multiple arguments', async () => {
    class TestService {
      @LogActivity()
      async multiArgMethod(a: number, b: string, c: boolean) {
        return { a, b, c };
      }
    }

    const service = new TestService();
    const result = await service.multiArgMethod(1, 'test', true);

    expect(result).toEqual({ a: 1, b: 'test', c: true });
    expect(consoleLogSpy).toHaveBeenCalled();
    const log = parseLogCall();
    expect(log.input_s).toBe('[1,"test",true]');
  });

  it('should handle methods with no arguments', async () => {
    class TestService {
      @LogActivity()
      async noArgMethod() {
        return 'success';
      }
    }

    const service = new TestService();
    const result = await service.noArgMethod();

    expect(result).toBe('success');
    expect(consoleLogSpy).toHaveBeenCalled();
  });

  it('should work with synchronous methods', async () => {
    class TestService {
      @LogActivity()
      syncMethod() {
        return 'sync result';
      }
    }

    const service = new TestService();
    const result = await service.syncMethod();

    expect(result).toBe('sync result');
    expect(consoleLogSpy).toHaveBeenCalled();
    const log = parseLogCall();
    expect(log.output_s).toBe('"sync result"');
  });

  it('should preserve method context (this)', async () => {
    class TestService {
      private value = 'context-value';

      @LogActivity()
      async contextMethod() {
        return this.value;
      }
    }

    const service = new TestService();
    const result = await service.contextMethod();

    expect(result).toBe('context-value');
  });

  it('should include duration_ms for successful methods', async () => {
    class TestService {
      @LogActivity()
      async slowMethod() {
        await new Promise(resolve => setTimeout(resolve, 50));
        return 'done';
      }
    }

    const service = new TestService();
    await service.slowMethod();

    const log = parseLogCall();
    expect(log.duration_ms).toBeGreaterThanOrEqual(50);
  });

  it('should include duration_ms for failed methods', async () => {
    class TestService {
      @LogActivity()
      async failingSlowMethod() {
        await new Promise(resolve => setTimeout(resolve, 30));
        throw new Error('fail');
      }
    }

    const service = new TestService();
    await expect(service.failingSlowMethod()).rejects.toThrow('fail');

    const log = parseLogCall();
    expect(log.duration_ms).toBeGreaterThanOrEqual(30);
  });
});