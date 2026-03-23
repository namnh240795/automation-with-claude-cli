import { APIRequestContext, APIResponse } from '@playwright/test';

export interface OAuthClient {
  id: string;
  client_id: string;
  client_secret?: string;
  name: string;
  redirect_uris: string[];
  scopes: string[];
  grant_types: string[];
  is_confidential: boolean;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  scope: string;
}

/**
 * OAuth Test Helpers
 */
export class OAuthTestHelper {
  constructor(private request: APIRequestContext, private baseURL: string) {}

  /**
   * Register a new OAuth client
   */
  async registerClient(data: {
    name: string;
    redirect_uris: string[];
    scopes: string[];
    grant_types: string[];
    is_confidential?: boolean;
  }): Promise<OAuthClient> {
    const response = await this.request.post(`${this.baseURL}/auth/oauth/register`, {
      data,
    });

    if (!response.ok()) {
      throw new Error(`Failed to register client: ${await response.text()}`);
    }

    return response.json();
  }

  /**
   * Generate PKCE code verifier and challenge
   */
  async generatePKCE(): Promise<{ codeVerifier: string; codeChallenge: string }> {
    // Generate random code verifier (43-128 characters)
    const codeVerifier = this.base64URLEncode(crypto.getRandomValues(new Uint8Array(32)));

    // Generate code challenge (SHA256 hash)
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const codeChallenge = this.base64URLEncode(new Uint8Array(hashBuffer));

    return { codeVerifier, codeChallenge };
  }

  /**
   * Build authorization URL
   */
  buildAuthorizationURL(params: {
    client_id: string;
    redirect_uri: string;
    scope: string;
    state: string;
    code_challenge?: string;
    response_type?: string;
  }): string {
    const queryParams = new URLSearchParams({
      response_type: params.response_type || 'code',
      client_id: params.client_id,
      redirect_uri: params.redirect_uri,
      scope: params.scope,
      state: params.state,
      ...(params.code_challenge && {
        code_challenge: params.code_challenge,
        code_challenge_method: 'S256',
      }),
    });

    return `${this.baseURL}/auth/oauth/authorize?${queryParams.toString()}`;
  }

  /**
   * Exchange authorization code for tokens
   */
  async exchangeCodeForToken(data: {
    code: string;
    redirect_uri: string;
    client_id: string;
    client_secret?: string;
    code_verifier?: string;
  }): Promise<TokenResponse> {
    const formData = new URLSearchParams();
    formData.append('grant_type', 'authorization_code');
    formData.append('code', data.code);
    formData.append('redirect_uri', data.redirect_uri);
    formData.append('client_id', data.client_id);
    if (data.client_secret) {
      formData.append('client_secret', data.client_secret);
    }
    if (data.code_verifier) {
      formData.append('code_verifier', data.code_verifier);
    }

    const response = await this.request.post(`${this.baseURL}/auth/oauth/token`, {
      data: formData.toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (!response.ok()) {
      const error = await response.json();
      throw new Error(`Token exchange failed: ${JSON.stringify(error)}`);
    }

    return response.json();
  }

  /**
   * Client credentials flow
   */
  async clientCredentialsFlow(data: {
    client_id: string;
    client_secret: string;
    scope?: string;
  }): Promise<TokenResponse> {
    const formData = new URLSearchParams();
    formData.append('grant_type', 'client_credentials');
    formData.append('client_id', data.client_id);
    formData.append('client_secret', data.client_secret);
    if (data.scope) {
      formData.append('scope', data.scope);
    }

    const response = await this.request.post(`${this.baseURL}/auth/oauth/token`, {
      data: formData.toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (!response.ok()) {
      const error = await response.json();
      throw new Error(`Client credentials flow failed: ${JSON.stringify(error)}`);
    }

    return response.json();
  }

  /**
   * Refresh token flow
   */
  async refreshToken(data: {
    refresh_token: string;
    client_id: string;
    client_secret?: string;
  }): Promise<TokenResponse> {
    const formData = new URLSearchParams();
    formData.append('grant_type', 'refresh_token');
    formData.append('refresh_token', data.refresh_token);
    formData.append('client_id', data.client_id);
    if (data.client_secret) {
      formData.append('client_secret', data.client_secret);
    }

    const response = await this.request.post(`${this.baseURL}/auth/oauth/token`, {
      data: formData.toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (!response.ok()) {
      const error = await response.json();
      throw new Error(`Refresh token flow failed: ${JSON.stringify(error)}`);
    }

    return response.json();
  }

  /**
   * Introspect token
   */
  async introspectToken(token: string): Promise<any> {
    const formData = new URLSearchParams();
    formData.append('token', token);

    const response = await this.request.post(`${this.baseURL}/auth/oauth/introspect`, {
      data: formData.toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (!response.ok()) {
      throw new Error(`Token introspection failed: ${await response.text()}`);
    }

    return response.json();
  }

  /**
   * Revoke token
   */
  async revokeToken(token: string): Promise<void> {
    const formData = new URLSearchParams();
    formData.append('token', token);

    const response = await this.request.post(`${this.baseURL}/auth/oauth/revoke`, {
      data: formData.toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (!response.ok()) {
      throw new Error(`Token revocation failed: ${await response.text()}`);
    }
  }

  /**
   * Base64URL encode
   */
  private base64URLEncode(buffer: Uint8Array): string {
    let str = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      str += String.fromCharCode(bytes[i]);
    }
    return btoa(str)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  }
}
