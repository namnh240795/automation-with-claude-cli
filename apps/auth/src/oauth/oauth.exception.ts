import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * OAuth 2.0 Error Exception
 * Used to return OAuth-compliant error responses with proper status codes
 */
export class OAuthException extends HttpException {
  constructor(error: string, error_description: string, status: HttpStatus = HttpStatus.BAD_REQUEST) {
    super(
      {
        error,
        error_description,
      },
      status,
    );
  }
}

/**
 * Pre-configured OAuth exceptions for common error codes
 */
export class OAuthBadRequestException extends OAuthException {
  constructor(error: string, error_description: string) {
    super(error, error_description, HttpStatus.BAD_REQUEST);
  }
}

export class OAuthUnauthorizedException extends OAuthException {
  constructor(error: string, error_description: string) {
    super(error, error_description, HttpStatus.UNAUTHORIZED);
  }
}
