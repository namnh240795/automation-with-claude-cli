import { AppLogger, CustomLog, LogActivity } from './app-logger';
import { errorHandler } from './error-handler';
import { responseHandler } from './response-handler';
import { BadRequestException } from '@nestjs/common';
import { AxiosError, AxiosResponse } from 'axios';

describe('AppLogger', () => {
  let appLogger: AppLogger;

  beforeEach(() => {
    appLogger = new AppLogger('TestContext');
    jest.spyOn(console, 'log').mockImplementation(() => {}); // Mock console.log
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Restore original implementations after each test
  });

  it('should log a custom message with the correct structure', () => {
    const customLog: CustomLog = {
      input: { key: 'value' },
      output: { result: 'success' },
      function: 'testFunction',
    };
    appLogger.customLog(customLog);
    const expectedLogMessage = JSON.stringify({
      input_s: customLog.input,
      output_s: customLog.output,
      error_s: '',
      source_s: 'TestContext.testFunction',
    });
    expect(console.log).toHaveBeenCalledWith(expectedLogMessage);
  });

  it('should handle missing optional fields in CustomLog', () => {
    const customLog: CustomLog = {
      function: 'testFunction',
    };
    appLogger.customLog(customLog);
    const expectedLogMessage = JSON.stringify({
      input_s: '',
      output_s: '',
      error_s: '',
      source_s: 'TestContext.testFunction',
    });
    expect(console.log).toHaveBeenCalledWith(expectedLogMessage);
  });

  it('should log only message field', () => {
    const customLog: CustomLog = {
      function: 'testFunction',
      message: 'Only message',
    };
    appLogger.customLog(customLog);
    const expectedLogMessage = JSON.stringify({
      input_s: '',
      output_s: '',
      error_s: '',
      source_s: 'TestContext.testFunction',
      message: 'Only message',
    });
    expect(console.log).toHaveBeenCalledWith(expectedLogMessage);
  });

  it('should log only error field', () => {
    const customLog: CustomLog = {
      function: 'testFunction',
      error: 'Only error',
    };
    appLogger.customLog(customLog);
    const expectedLogMessage = JSON.stringify({
      input_s: '',
      output_s: '',
      error_s: 'Only error',
      source_s: 'TestContext.testFunction',
    });
    expect(console.log).toHaveBeenCalledWith(expectedLogMessage);
  });

  it('should log with no optional fields at all', () => {
    appLogger.customLog({ function: 'testFunction' });
    const expectedLogMessage = JSON.stringify({
      input_s: '',
      output_s: '',
      error_s: '',
      source_s: 'TestContext.testFunction',
    });
    expect(console.log).toHaveBeenCalledWith(expectedLogMessage);
  });

  it('should log falsy input/output values', () => {
    appLogger.customLog({ function: 'testFunction', input: 0, output: false });
    const expectedLogMessage = JSON.stringify({
      input_s: 0,
      output_s: false,
      error_s: '',
      source_s: 'TestContext.testFunction',
    });
    expect(console.log).toHaveBeenCalledWith(expectedLogMessage);
    appLogger.customLog({ function: 'testFunction', input: '', output: '' });
    const expectedLogMessage2 = JSON.stringify({
      input_s: '',
      output_s: '',
      error_s: '',
      source_s: 'TestContext.testFunction',
    });
    expect(console.log).toHaveBeenCalledWith(expectedLogMessage2);
  });

  it('should log error and message fields', () => {
    const customLog: CustomLog = {
      function: 'testFunction',
      error: 'Some error',
      message: 'Custom message',
    };
    appLogger.customLog(customLog);
    const expectedLogMessage = JSON.stringify({
      input_s: '',
      output_s: '',
      error_s: 'Some error',
      source_s: 'TestContext.testFunction',
      message: 'Custom message',
    });
    expect(console.log).toHaveBeenCalledWith(expectedLogMessage);
  });

  it('should handle null and undefined input', () => {
    appLogger.customLog({
      function: 'testFunction',
      input: null,
      output: undefined,
    });
    const expectedLogMessage = JSON.stringify({
      input_s: null,
      output_s: undefined,
      error_s: '',
      source_s: 'TestContext.testFunction',
      message: undefined,
    });
    expect(console.log).toHaveBeenCalledWith(expectedLogMessage);
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
    expect(result.config.headers['Ocp-Apim-Subscription-Key']).toBe(
      '***********',
    );
  });

  it('should handle AxiosError with config.headers as undefined', () => {
    const error = new AxiosError('axios error', 'ERR_BAD_REQUEST', {
      headers: undefined,
    } as any);
    error.response = undefined;
    const result = errorHandler(error) as any;
    expect(result.config.headers.Authorization).toBe('***********');
    expect(result.config.headers['Ocp-Apim-Subscription-Key']).toBe(
      '***********',
    );
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
    expect(result.config.headers['Ocp-Apim-Subscription-Key']).toBe(
      '***********',
    );
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
    // Use a plain object for config and headers to avoid AxiosHeaders type issues
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
    expect(result.config.headers['Ocp-Apim-Subscription-Key']).toBe(
      '***********',
    );
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
  describe('index.ts re-export', () => {
    it('should import AppLogger from index and use it', () => {
      // Import via index
      const { AppLogger: IndexLogger } = require('./index');
      const logger = new IndexLogger('IndexTest');
      expect(logger).toBeInstanceOf(IndexLogger);
      // Should log without error
      jest.spyOn(console, 'log').mockImplementation(() => {});
      expect(() =>
        logger.customLog({ function: 'testFunction' }),
      ).not.toThrow();
      jest.restoreAllMocks();
    });
  });
  it('should return response data', () => {
    const response = { data: 'test data' } as AxiosResponse;
    expect(responseHandler(response)).toBe('test data');
  });
});

describe('LogActivity decorator', () => {
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

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
    const logCall = JSON.parse(consoleLogSpy.mock.calls[0][0]);
    expect(logCall.source_s).toBe('TestService.testMethod');
    expect(logCall.input_s).toEqual(['hello']);
    expect(logCall.output_s).toBe('processed: hello');
    expect(logCall.error_s).toBe('');
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
    const logCall = JSON.parse(consoleLogSpy.mock.calls[0][0]);
    expect(logCall.source_s).toBe('TestService.failingMethod');
    expect(logCall.error_s).toBeDefined();
    expect(logCall.error_s).toHaveProperty('message', 'Test error');
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
    const logCall = JSON.parse(consoleLogSpy.mock.calls[0][0]);
    expect(logCall.input_s).toEqual([1, 'test', true]);
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

  it('should work with synchronous methods decorated as async', async () => {
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
});
