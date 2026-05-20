export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  token_type: string;
  user: {
    id: string;
    email: string;
    first_name?: string;
    last_name?: string;
  };
}

export interface SignUpRequest {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
}

export interface RefreshTokenRequest {
  refresh_token: string;
}

export interface RefreshTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_at: number;
}

export interface UserResponse {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  is_active: boolean;
  created_at: string;
}