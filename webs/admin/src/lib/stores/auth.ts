import { createAuthApiClient, authEndpoints } from '../api/auth';
import type {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  UserResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
} from '../api/types';

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: UserResponse | null;
  isAuthenticated: boolean;
}

export interface AuthActions {
  signIn: (email: string, password: string) => Promise<SignInResponse>;
  signUp: (data: SignUpRequest) => Promise<SignInResponse>;
  signOut: () => void;
  getAccessToken: () => string | null;
  getUser: () => UserResponse | null;
  isAuthenticated: () => boolean;
}

type AuthStore = AuthState & AuthActions;

const STORAGE_KEYS = {
  ACCESS_TOKEN: 'admin_access_token',
  REFRESH_TOKEN: 'admin_refresh_token',
  USER: 'admin_user',
} as const;

function getStoredUser(): UserResponse | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(STORAGE_KEYS.USER);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

function createAuthStore(): AuthStore {
  let state: AuthState = {
    accessToken: typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN) : null,
    refreshToken: typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN) : null,
    user: getStoredUser(),
    isAuthenticated: typeof window !== 'undefined' ? !!localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN) : false,
  };

  const listeners = new Set<() => void>();

  function notify() {
    listeners.forEach((listener) => listener());
  }

  function setState(newState: Partial<AuthState>) {
    state = { ...state, ...newState };
    notify();
  }

  const api = createAuthApiClient(
    () => state.accessToken,
    () => {
      signOut();
    }
  );

  async function signIn(email: string, password: string): Promise<SignInResponse> {
    const response = await api.post<SignInResponse>(authEndpoints.signIn({ email, password }));

    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, response.access_token);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.refresh_token);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user));

    setState({
      accessToken: response.access_token,
      refreshToken: response.refresh_token,
      user: response.user,
      isAuthenticated: true,
    });

    return response;
  }

  async function signUp(data: SignUpRequest): Promise<SignInResponse> {
    const response = await api.post<SignInResponse>(authEndpoints.signUp(data));

    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, response.access_token);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.refresh_token);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user));

    setState({
      accessToken: response.access_token,
      refreshToken: response.refresh_token,
      user: response.user,
      isAuthenticated: true,
    });

    return response;
  }

  function signOut() {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);

    setState({
      accessToken: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,
    });
  }

  function getAccessToken(): string | null {
    return state.accessToken;
  }

  function getUser(): UserResponse | null {
    return state.user;
  }

  function isAuthenticated(): boolean {
    return state.isAuthenticated;
  }

  return {
    get state() {
      return state;
    },
    signIn,
    signUp,
    signOut,
    getAccessToken,
    getUser,
    isAuthenticated,
    subscribe(listener: () => void) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

export const authStore = createAuthStore();