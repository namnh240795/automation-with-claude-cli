/**
 * OAuth 2.0 Grant Types
 */
export const GRANT_TYPES = {
  AUTHORIZATION_CODE: 'authorization_code',
  CLIENT_CREDENTIALS: 'client_credentials',
  REFRESH_TOKEN: 'refresh_token',
  DEVICE_CODE: 'urn:ietf:params:oauth:grant-type:device_code',
} as const;

/**
 * OAuth 2.0 Scopes
 */
export const SCOPES = {
  OPENID: 'openid',
  EMAIL: 'email',
  PROFILE: 'profile',
  OFFLINE_ACCESS: 'offline_access',
} as const;

/**
 * OAuth 2.0 Error Codes (RFC 6749)
 */
export const OAUTH_ERRORS = {
  INVALID_REQUEST: 'invalid_request',
  UNAUTHORIZED_CLIENT: 'unauthorized_client',
  ACCESS_DENIED: 'access_denied',
  INVALID_SCOPE: 'invalid_scope',
  INVALID_CLIENT: 'invalid_client',
  INVALID_GRANT: 'invalid_grant',
  UNSUPPORTED_GRANT_TYPE: 'unsupported_grant_type',
  INVALID_REQUEST_URI: 'invalid_request_uri',
  INVALID_REQUEST_OBJECT: 'invalid_request_object',
  SERVER_ERROR: 'server_error',
  TEMPORARILY_UNAVAILABLE: 'temporarily_unavailable',
  EXPIRED_TOKEN: 'expired_token', // Custom error for expired device codes
  AUTHORIZATION_PENDING: 'authorization_pending', // RFC 8628 - Device Authorization Grant
  SLOW_DOWN: 'slow_down', // RFC 8628 - Device Authorization Grant
} as const;

/**
 * OAuth 2.0 Token Lifetimes (in seconds)
 */
export const TOKEN_LIFETIMES = {
  AUTHORIZATION_CODE: 10 * 60,        // 10 minutes
  ACCESS_TOKEN: 60 * 60,              // 1 hour
  REFRESH_TOKEN: 30 * 24 * 60 * 60,   // 30 days
  DEVICE_CODE: 15 * 60,               // 15 minutes
} as const;

/**
 * OAuth 2.0 Token Types
 */
export const TOKEN_TYPES = {
  BEARER: 'Bearer',
} as const;

/**
 * PKCE Code Challenge Methods
 */
export const CODE_CHALLENGE_METHODS = {
  PLAIN: 'plain',
  S256: 'S256',
} as const;

/**
 * HTTP Status Codes for OAuth Errors
 */
export const OAUTH_STATUS_CODES = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
} as const;
