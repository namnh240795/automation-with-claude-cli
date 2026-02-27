import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';

/**
 * Login request DTO for Keycloak authentication
 */
export class KeycloakLoginDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

/**
 * Token response from Keycloak
 */
export class KeycloakTokenResponseDto {
  access_token: string;
  refresh_token?: string;
  id_token?: string;
  token_type: string;
  expires_in: number;
  refresh_expires_in?: number;
  scope: string;
}

/**
 * User info from Keycloak token
 * Based on standard OIDC claims
 */
export interface KeycloakUserInfo {
  sub: string; // Subject - User unique ID
  email: string;
  email_verified: boolean;
  preferred_username?: string;
  given_name?: string; // First name
  family_name?: string; // Last name
  name?: string; // Full name

  // Keycloak specific
  resource_access?: Record<string, { roles: string[] }>;
  realm_access?: {
    roles: string[];
  };

  // Token metadata
  iat: number; // Issued at
  exp: number; // Expiration time
  iss: string; // Issuer
  aud: string | string[]; // Audience
}

/**
 * Callback DTO for OAuth2 authorization code flow
 */
export class KeycloakCallbackDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsOptional()
  state?: string;

  @IsString()
  @IsOptional()
  session_state?: string;
}

/**
 * Logout request DTO
 */
export class KeycloakLogoutDto {
  @IsString()
  @IsNotEmpty()
  refresh_token: string;
}

/**
 * Refresh token request DTO
 */
export class KeycloakRefreshTokenDto {
  @IsString()
  @IsNotEmpty()
  refresh_token: string;

  @IsString()
  @IsOptional()
  client_id?: string;

  @IsString()
  @IsOptional()
  client_secret?: string;
}

/**
 * Register user request DTO
 * For Keycloak user registration
 */
export class KeycloakRegisterDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  roles?: string[];
}
