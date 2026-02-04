import { BadRequestException } from '@nestjs/common';
import { AxiosError } from 'axios';
import { errorHandler } from './error-handler';

describe('errorHandler', () => {
  describe('AxiosError handling', () => {
    it('should handle AxiosError with full config and response', () => {
      // Arrange
      const axiosError = new AxiosError('Request failed');
      axiosError.config = {
        headers: {
          Authorization: 'Bearer secret-token',
          'Ocp-Apim-Subscription-Key': 'secret-key',
          'Content-Type': 'application/json',
        },
      } as any;
      axiosError.code = 'ERR_NETWORK';
      axiosError.response = {
        status: 500,
        statusText: 'Internal Server Error',
        data: { error: 'Something went wrong' },
      } as any;

      // Act
      const result = errorHandler(axiosError);

      // Assert
      expect(result).toEqual({
        message: 'Request failed',
        name: 'AxiosError',
        code: 'ERR_NETWORK',
        config: {
          headers: {
            Authorization: '***********',
            'Ocp-Apim-Subscription-Key': '***********',
            'Content-Type': 'application/json',
          },
        },
        response: {
          status: 500,
          statusText: 'Internal Server Error',
          data: { error: 'Something went wrong' },
        },
        status: 500,
      });
    });

    it('should handle AxiosError without config', () => {
      // Arrange
      const axiosError = new AxiosError('Network error');
      axiosError.code = 'ECONNABORTED';
      axiosError.response = undefined;

      // Act
      const result = errorHandler(axiosError);

      // Assert
      expect(result).toEqual({
        message: 'Network error',
        name: 'AxiosError',
        code: 'ECONNABORTED',
        response: undefined,
        status: undefined,
      });
    });

    it('should handle AxiosError without response', () => {
      // Arrange
      const axiosError = new AxiosError('Timeout');
      axiosError.config = {
        headers: { Authorization: 'Bearer token' },
      } as any;
      axiosError.code = 'ETIMEDOUT';

      // Act
      const result = errorHandler(axiosError);

      // Assert
      expect(result).toEqual({
        message: 'Timeout',
        name: 'AxiosError',
        code: 'ETIMEDOUT',
        config: {
          headers: {
            Authorization: '***********',
            'Ocp-Apim-Subscription-Key': '***********',
          },
        },
        response: undefined,
        status: undefined,
      });
    });

    it('should redact sensitive headers in AxiosError', () => {
      // Arrange
      const axiosError = new AxiosError('Request failed');
      axiosError.config = {
        headers: {
          Authorization: 'Bearer my-secret-token',
          'Ocp-Apim-Subscription-Key': 'my-subscription-key',
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      } as any;

      // Act
      const result = errorHandler(axiosError) as { config: { headers: Record<string, string> } };

      // Assert
      expect(result.config.headers.Authorization).toBe('***********');
      expect(result.config.headers['Ocp-Apim-Subscription-Key']).toBe('***********');
      expect(result.config.headers['Content-Type']).toBe('application/json');
      expect(result.config.headers.Accept).toBe('application/json');
    });

    it('should handle AxiosError with missing headers', () => {
      // Arrange
      const axiosError = new AxiosError('Bad request');
      axiosError.config = { headers: undefined } as any;
      axiosError.response = {
        status: 400,
        statusText: 'Bad Request',
        data: { message: 'Invalid input' },
      } as any;

      // Act
      const result = errorHandler(axiosError) as { config: { headers: Record<string, string> }; status: number };

      // Assert - When headers is undefined, the code creates headers object with masked values
      expect(result.config.headers).toEqual({
        Authorization: '***********',
        'Ocp-Apim-Subscription-Key': '***********',
      });
      expect(result.status).toBe(400);
    });
  });

  describe('BadRequestException handling', () => {
    it('should handle BadRequestException', () => {
      // Arrange
      const exception = new BadRequestException('Validation failed');

      // Act
      const result = errorHandler(exception);

      // Assert
      expect(result).toEqual({
        message: 'Validation failed',
        name: 'BadRequestException',
        response: expect.any(Object),
      });
    });

    it('should handle BadRequestException with custom response', () => {
      // Arrange
      const exception = new BadRequestException({
        error: 'Invalid data',
        fields: ['email', 'password'],
      });

      // Act
      const result = errorHandler(exception);

      // Assert
      expect(result).toHaveProperty('message');
      expect(result).toHaveProperty('name', 'BadRequestException');
      expect(result).toHaveProperty('response');
    });
  });

  describe('generic Error handling', () => {
    it('should handle standard Error', () => {
      // Arrange
      const error = new Error('Something went wrong');

      // Act
      const result = errorHandler(error);

      // Assert
      expect(result).toEqual({
        message: 'Something went wrong',
        name: 'Error',
        stack: expect.any(String),
      });
    });

    it('should handle Error with custom name', () => {
      // Arrange
      class CustomError extends Error {
        constructor(message: string) {
          super(message);
          this.name = 'CustomError';
        }
      }
      const error = new CustomError('Custom error occurred');

      // Act
      const result = errorHandler(error);

      // Assert
      expect(result).toEqual({
        message: 'Custom error occurred',
        name: 'CustomError',
        stack: expect.any(String),
      });
    });

    it('should handle Error without stack trace', () => {
      // Arrange
      const error = new Error('No stack error');
      delete (error as any).stack;

      // Act
      const result = errorHandler(error);

      // Assert
      expect(result).toEqual({
        message: 'No stack error',
        name: 'Error',
        stack: undefined,
      });
    });
  });

  describe('unknown error type', () => {
    it('should handle unknown error type', () => {
      // Arrange
      const unknownError = { custom: 'error object' };

      // Act
      const result = errorHandler(unknownError);

      // Assert
      expect(result).toEqual({
        message: 'Unknown Exception',
      });
    });

    it('should handle null', () => {
      // Arrange
      const error = null;

      // Act
      const result = errorHandler(error);

      // Assert
      expect(result).toEqual({
        message: 'Unknown Exception',
      });
    });

    it('should handle undefined', () => {
      // Arrange
      const error = undefined;

      // Act
      const result = errorHandler(error);

      // Assert
      expect(result).toEqual({
        message: 'Unknown Exception',
      });
    });

    it('should handle string error', () => {
      // Arrange
      const error = 'String error message';

      // Act
      const result = errorHandler(error);

      // Assert
      expect(result).toEqual({
        message: 'Unknown Exception',
      });
    });

    it('should handle number error', () => {
      // Arrange
      const error = 500;

      // Act
      const result = errorHandler(error);

      // Assert
      expect(result).toEqual({
        message: 'Unknown Exception',
      });
    });
  });
});
