import { createApiClient, type ApiClient } from './client';
import type {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  RefreshTokenRequest,
  RefreshTokenResponse,
  UserResponse,
} from './types';

const AUTH_SERVICE_URL = 'http://localhost:3001/auth';

export function createAuthApiClient(
  getAccessToken: () => string | null,
  onUnauthorized: () => void
): ApiClient {
  return createApiClient({
    baseUrl: AUTH_SERVICE_URL,
    getAccessToken,
    onUnauthorized,
  });
}

export const authEndpoints = {
  signIn: (data: SignInRequest) =>
    `/v1/auth/signin` as const,

  signUp: (data: SignUpRequest) =>
    `/v1/auth/signup` as const,

  refreshToken: (data: RefreshTokenRequest) =>
    `/v1/auth/refresh` as const,

  getProfile: () =>
    `/v1/auth/me` as const,

  signOut: () =>
    `/v1/auth/logout` as const,
};

export type {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  RefreshTokenRequest,
  RefreshTokenResponse,
  UserResponse,
};