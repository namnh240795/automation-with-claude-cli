import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { OAUTH_ERRORS } from '../oauth.constants';

/**
 * OAuth 2.0 Error Response (RFC 6749)
 * Used for authorization endpoint errors
 */
export class OAuthErrorDto {
  @ApiProperty({
    description: 'OAuth 2.0 error code',
    example: OAUTH_ERRORS.INVALID_REQUEST,
    enum: Object.values(OAUTH_ERRORS),
  })
  error: string;

  @ApiPropertyOptional({
    description: 'Human-readable error description',
    example: 'The request is missing a required parameter',
  })
  error_description?: string;

  @ApiPropertyOptional({
    description: 'URI for more information about the error',
    example: 'https://example.com/oauth/errors',
  })
  error_uri?: string;

  @ApiPropertyOptional({
    description: 'State parameter from the authorization request (must be returned)',
    example: 'xyz789',
  })
  state?: string;
}

/**
 * OAuth 2.0 Token Error Response (RFC 6749)
 * Used for token endpoint errors
 */
export class TokenErrorDto {
  @ApiProperty({
    description: 'OAuth 2.0 error code',
    example: OAUTH_ERRORS.INVALID_GRANT,
    enum: Object.values(OAUTH_ERRORS),
  })
  error: string;

  @ApiPropertyOptional({
    description: 'Human-readable error description',
    example: 'The provided authorization code is invalid or expired',
  })
  error_description?: string;

  @ApiPropertyOptional({
    description: 'URI for more information about the error',
    example: 'https://example.com/oauth/errors',
  })
  error_uri?: string;
}

/**
 * Device Authorization Flow Error Response (RFC 8628)
 */
export class DeviceFlowErrorDto {
  @ApiProperty({
    description: 'OAuth 2.0 error code',
    example: OAUTH_ERRORS.AUTHORIZATION_PENDING,
    enum: [
      OAUTH_ERRORS.AUTHORIZATION_PENDING,
      OAUTH_ERRORS.SLOW_DOWN,
      OAUTH_ERRORS.ACCESS_DENIED,
      OAUTH_ERRORS.EXPIRED_TOKEN,
    ],
  })
  error: string;

  @ApiPropertyOptional({
    description: 'Human-readable error description',
    example: 'The authorization request is still pending',
  })
  error_description?: string;

  @ApiPropertyOptional({
    description: 'URI for more information about the error',
    example: 'https://example.com/oauth/errors',
  })
  error_uri?: string;
}

// Additional error codes for device flow
export const DEVICE_FLOW_ERRORS = {
  AUTHORIZATION_PENDING: 'authorization_pending',
  SLOW_DOWN: 'slow_down',
  ACCESS_DENIED: 'access_denied',
  EXPIRED_TOKEN: 'expired_token',
} as const;
