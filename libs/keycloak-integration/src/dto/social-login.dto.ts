import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';

/**
 * Supported social login providers
 */
export enum SocialProvider {
  GOOGLE = 'google',
  GITHUB = 'github',
  FACEBOOK = 'facebook',
}

/**
 * Social login redirect request
 * Initiates OAuth2 flow with a social provider
 */
export class SocialLoginRedirectDto {
  @IsEnum(SocialProvider)
  @IsNotEmpty()
  provider: SocialProvider;

  @IsString()
  @IsOptional()
  state?: string;

  @IsString()
  @IsOptional()
  redirect_uri?: string;
}

/**
 * Social login callback request
 * Handles the callback from social provider
 */
export class SocialLoginCallbackDto {
  @IsEnum(SocialProvider)
  @IsNotEmpty()
  provider: SocialProvider;

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
 * Social login link request
 * Links a social provider to an existing account
 */
export class SocialLinkDto {
  @IsEnum(SocialProvider)
  @IsNotEmpty()
  provider: SocialProvider;

  @IsString()
  @IsNotEmpty()
  access_token: string;

  @IsString()
  @IsOptional()
  user_id?: string;
}

/**
 * Social login unlink request
 * Unlinks a social provider from an account
 */
export class SocialUnlinkDto {
  @IsEnum(SocialProvider)
  @IsNotEmpty()
  provider: SocialProvider;

  @IsString()
  @IsOptional()
  user_id?: string;
}

/**
 * Social login provider info
 * Returns information about configured providers
 */
export interface SocialProviderInfo {
  provider: SocialProvider;
  name: string;
  authorizationUrl: string;
  configured: boolean;
}

/**
 * Social login response
 * Returns after successful callback
 */
export interface SocialLoginResponse {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  user: {
    sub: string;
    email: string;
    email_verified: boolean;
    name?: string;
    given_name?: string;
    family_name?: string;
    picture?: string;
    provider: SocialProvider;
  };
}
