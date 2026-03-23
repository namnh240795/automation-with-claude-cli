import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { FastifyReply } from 'fastify';

/**
 * OAuth Exception Filter
 * Ensures OAuth 2.0 compliant error responses
 */
@Catch(HttpException)
export class OAuthExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    // Check if this is already an OAuth error format
    if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
      const responseObj = exceptionResponse as any;

      // If it has 'error' property, it's already in OAuth format
      if (responseObj.error) {
        return response.code(status).send(responseObj);
      }

      // Otherwise, it's the default NestJS format, convert to OAuth format
      if (responseObj.message) {
        return response.code(status).send({
          error: this.getOAuthErrorFromStatus(status),
          error_description: responseObj.message,
        });
      }
    }

    // Fallback to default error format
    return response.code(status).send(exceptionResponse);
  }

  /**
   * Convert HTTP status to OAuth error code
   */
  private getOAuthErrorFromStatus(status: number): string {
    switch (status) {
      case HttpStatus.BAD_REQUEST:
        return 'invalid_request';
      case HttpStatus.UNAUTHORIZED:
        return 'invalid_client';
      case HttpStatus.FORBIDDEN:
        return 'access_denied';
      case HttpStatus.NOT_FOUND:
        return 'invalid_grant';
      default:
        return 'server_error';
    }
  }
}
