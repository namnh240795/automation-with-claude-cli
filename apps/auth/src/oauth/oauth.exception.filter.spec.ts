import { ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { OAuthExceptionFilter } from './oauth.exception.filter';

describe('OAuthExceptionFilter', () => {
  let filter: OAuthExceptionFilter;
  let mockResponse: {
    code: jest.Mock;
    send: jest.Mock;
  };

  beforeEach(() => {
    filter = new OAuthExceptionFilter();
    mockResponse = {
      code: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockHost = (): ArgumentsHost => {
    return {
      switchToHttp: () => ({
        getResponse: () => mockResponse,
      }),
    } as unknown as ArgumentsHost;
  };

  describe('HttpException handling', () => {
    describe('when exception has OAuth error format (error property)', () => {
      it('should return the response directly with the OAuth error format', () => {
        const oauthError = {
          error: 'invalid_request',
          error_description: 'Missing required parameter',
        };
        const exception = new HttpException(oauthError, HttpStatus.BAD_REQUEST);
        const host = mockHost();

        filter.catch(exception, host);

        expect(mockResponse.code).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
        expect(mockResponse.send).toHaveBeenCalledWith(oauthError);
      });

      it('should pass through unauthorized OAuth error', () => {
        const oauthError = {
          error: 'invalid_client',
          error_description: 'Client authentication failed',
        };
        const exception = new HttpException(oauthError, HttpStatus.UNAUTHORIZED);
        const host = mockHost();

        filter.catch(exception, host);

        expect(mockResponse.code).toHaveBeenCalledWith(HttpStatus.UNAUTHORIZED);
        expect(mockResponse.send).toHaveBeenCalledWith(oauthError);
      });

      it('should pass through server_error OAuth response', () => {
        const oauthError = {
          error: 'server_error',
          error_description: 'Internal server error',
        };
        const exception = new HttpException(oauthError, HttpStatus.INTERNAL_SERVER_ERROR);
        const host = mockHost();

        filter.catch(exception, host);

        expect(mockResponse.code).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
        expect(mockResponse.send).toHaveBeenCalledWith(oauthError);
      });
    });

    describe('when exception has message property (default NestJS format)', () => {
      it('should convert 400 BAD_REQUEST to invalid_request', () => {
        const exception = new HttpException(
          { message: 'Validation failed' },
          HttpStatus.BAD_REQUEST,
        );
        const host = mockHost();

        filter.catch(exception, host);

        expect(mockResponse.code).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
        expect(mockResponse.send).toHaveBeenCalledWith({
          error: 'invalid_request',
          error_description: 'Validation failed',
        });
      });

      it('should convert 401 UNAUTHORIZED to invalid_client', () => {
        const exception = new HttpException(
          { message: 'Unauthorized' },
          HttpStatus.UNAUTHORIZED,
        );
        const host = mockHost();

        filter.catch(exception, host);

        expect(mockResponse.code).toHaveBeenCalledWith(HttpStatus.UNAUTHORIZED);
        expect(mockResponse.send).toHaveBeenCalledWith({
          error: 'invalid_client',
          error_description: 'Unauthorized',
        });
      });

      it('should convert 403 FORBIDDEN to access_denied', () => {
        const exception = new HttpException(
          { message: 'Access denied' },
          HttpStatus.FORBIDDEN,
        );
        const host = mockHost();

        filter.catch(exception, host);

        expect(mockResponse.code).toHaveBeenCalledWith(HttpStatus.FORBIDDEN);
        expect(mockResponse.send).toHaveBeenCalledWith({
          error: 'access_denied',
          error_description: 'Access denied',
        });
      });

      it('should convert 404 NOT_FOUND to invalid_grant', () => {
        const exception = new HttpException(
          { message: 'Resource not found' },
          HttpStatus.NOT_FOUND,
        );
        const host = mockHost();

        filter.catch(exception, host);

        expect(mockResponse.code).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
        expect(mockResponse.send).toHaveBeenCalledWith({
          error: 'invalid_grant',
          error_description: 'Resource not found',
        });
      });

      it('should convert any other status to server_error', () => {
        const exception = new HttpException(
          { message: 'Some error' },
          HttpStatus.CONFLICT,
        );
        const host = mockHost();

        filter.catch(exception, host);

        expect(mockResponse.code).toHaveBeenCalledWith(HttpStatus.CONFLICT);
        expect(mockResponse.send).toHaveBeenCalledWith({
          error: 'server_error',
          error_description: 'Some error',
        });
      });

      it('should convert 500 INTERNAL_SERVER_ERROR to server_error', () => {
        const exception = new HttpException(
          { message: 'Internal error' },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
        const host = mockHost();

        filter.catch(exception, host);

        expect(mockResponse.code).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
        expect(mockResponse.send).toHaveBeenCalledWith({
          error: 'server_error',
          error_description: 'Internal error',
        });
      });
    });

    describe('when exception has no error or message property', () => {
      it('should return exceptionResponse directly for string response', () => {
        const exception = new HttpException('Simple error message', HttpStatus.BAD_GATEWAY);
        const host = mockHost();

        filter.catch(exception, host);

        expect(mockResponse.code).toHaveBeenCalledWith(HttpStatus.BAD_GATEWAY);
        expect(mockResponse.send).toHaveBeenCalledWith('Simple error message');
      });

      it('should return exceptionResponse directly for object without error/message', () => {
        const exception = new HttpException(
          { statusCode: 400, someOtherField: 'value' },
          HttpStatus.BAD_REQUEST,
        );
        const host = mockHost();

        filter.catch(exception, host);

        expect(mockResponse.code).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
        expect(mockResponse.send).toHaveBeenCalledWith({
          statusCode: 400,
          someOtherField: 'value',
        });
      });
    });
  });

  describe('Non-HttpException handling', () => {
    it('should return server_error for generic Error', () => {
      const exception = new Error('Something went wrong');
      const host = mockHost();

      filter.catch(exception, host);

      expect(mockResponse.code).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
      expect(mockResponse.send).toHaveBeenCalledWith({
        error: 'server_error',
        error_description: 'Something went wrong',
      });
    });

    it('should return server_error for string exception', () => {
      const exception = 'Unexpected error string';
      const host = mockHost();

      filter.catch(exception, host);

      expect(mockResponse.code).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
      expect(mockResponse.send).toHaveBeenCalledWith({
        error: 'server_error',
        error_description: 'Unexpected error string',
      });
    });

    it('should return server_error for null exception', () => {
      const exception = null;
      const host = mockHost();

      filter.catch(exception, host);

      expect(mockResponse.code).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
      expect(mockResponse.send).toHaveBeenCalledWith({
        error: 'server_error',
        error_description: 'null',
      });
    });

    it('should return server_error for undefined exception', () => {
      const exception = undefined;
      const host = mockHost();

      filter.catch(exception, host);

      expect(mockResponse.code).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
      expect(mockResponse.send).toHaveBeenCalledWith({
        error: 'server_error',
        error_description: 'undefined',
      });
    });

    it('should return server_error for object without message property', () => {
      const exception = { code: 'ERR_SOMETHING', details: 'Some details' };
      const host = mockHost();

      filter.catch(exception, host);

      expect(mockResponse.code).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
      // String() on a plain object returns '[object Object]'
      expect(mockResponse.send).toHaveBeenCalledWith({
        error: 'server_error',
        error_description: '[object Object]',
      });
    });
  });

  describe('getOAuthErrorFromStatus', () => {
    it('should return invalid_request for 400', () => {
      const result = (filter as any).getOAuthErrorFromStatus(HttpStatus.BAD_REQUEST);
      expect(result).toBe('invalid_request');
    });

    it('should return invalid_client for 401', () => {
      const result = (filter as any).getOAuthErrorFromStatus(HttpStatus.UNAUTHORIZED);
      expect(result).toBe('invalid_client');
    });

    it('should return access_denied for 403', () => {
      const result = (filter as any).getOAuthErrorFromStatus(HttpStatus.FORBIDDEN);
      expect(result).toBe('access_denied');
    });

    it('should return invalid_grant for 404', () => {
      const result = (filter as any).getOAuthErrorFromStatus(HttpStatus.NOT_FOUND);
      expect(result).toBe('invalid_grant');
    });

    it('should return server_error for unhandled status codes', () => {
      const result = (filter as any).getOAuthErrorFromStatus(HttpStatus.CONFLICT);
      expect(result).toBe('server_error');
    });

    it('should return server_error for 500', () => {
      const result = (filter as any).getOAuthErrorFromStatus(HttpStatus.INTERNAL_SERVER_ERROR);
      expect(result).toBe('server_error');
    });

    it('should return server_error for 502', () => {
      const result = (filter as any).getOAuthErrorFromStatus(HttpStatus.BAD_GATEWAY);
      expect(result).toBe('server_error');
    });
  });
});