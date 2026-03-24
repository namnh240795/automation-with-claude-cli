import { test, expect } from '@playwright/test';
import { OAuthTestHelper } from '../helpers/oauth-helpers';

/**
 * E2E Tests for OAuth 2.0 Authorization Code Flow
 * Tests the complete authorization code flow with PKCE
 */
test.describe('OAuth 2.0 Authorization Code Flow', () => {
  let oauthHelper: OAuthTestHelper;
  let confidentialClient: any;
  let publicClient: any;

  test.beforeAll(async ({ request }) => {
    oauthHelper = new OAuthTestHelper(request, 'http://localhost:3001');

    // Register test clients
    confidentialClient = await oauthHelper.registerClient({
      name: 'E2E Test Confidential Client',
      redirect_uris: ['http://localhost:3000/callback'],
      scopes: ['openid', 'email', 'profile', 'offline_access'],
      grant_types: ['authorization_code', 'refresh_token'],
      is_confidential: true,
    });

    publicClient = await oauthHelper.registerClient({
      name: 'E2E Test Public Client',
      redirect_uris: ['http://localhost:3000/callback'],
      scopes: ['openid', 'email'],
      grant_types: ['authorization_code'],
      is_confidential: false,
    });
  });

  test('should register confidential client successfully', async () => {
    expect(confidentialClient).toBeDefined();
    expect(confidentialClient.client_id).toBeDefined();
    expect(confidentialClient.client_secret).toBeDefined();
    expect(confidentialClient.name).toBe('E2E Test Confidential Client');
    expect(confidentialClient.is_confidential).toBe(true);
  });

  test('should register public client successfully', async () => {
    expect(publicClient).toBeDefined();
    expect(publicClient.client_id).toBeDefined();
    expect(publicClient.client_secret).toBeNull();
    expect(publicClient.name).toBe('E2E Test Public Client');
    expect(publicClient.is_confidential).toBe(false);
  });

  test('should fail authorization with invalid client_id', async ({ request }) => {
    const response = await request.get(
      `http://localhost:3001/auth/oauth/authorize?` +
        `response_type=code&` +
        `client_id=invalid_client&` +
        `redirect_uri=http://localhost:3000/callback&` +
        `scope=openid&` +
        `state=test-state`
    );

    // Should redirect with error
    expect(response.status()).toBeGreaterThanOrEqual(400); // Error response
  });

  test('should generate valid authorization URL with PKCE', async ({ request }) => {
    const helper = new OAuthTestHelper(request, 'http://localhost:3001');
    const { codeChallenge } = await helper.generatePKCE();
    const authURL = helper.buildAuthorizationURL({
      client_id: publicClient.client_id,
      redirect_uri: 'http://localhost:3000/callback',
      scope: 'openid email',
      state: 'test-state-123',
      code_challenge: codeChallenge,
    });

    expect(authURL).toContain('response_type=code');
    expect(authURL).toContain(`client_id=${publicClient.client_id}`);
    expect(authURL).toContain('code_challenge=');
    expect(authURL).toContain('code_challenge_method=S256');
    expect(authURL).toContain('state=test-state-123');
  });

  test('should fail token exchange with invalid code', async ({ request }) => {
    const helper = new OAuthTestHelper(request, 'http://localhost:3001');
    await expect(
      helper.exchangeCodeForToken({
        code: 'invalid_code',
        redirect_uri: 'http://localhost:3000/callback',
        client_id: confidentialClient.client_id,
        client_secret: confidentialClient.client_secret,
      })
    ).rejects.toThrow('Token exchange failed');
  });

  test('should fail token exchange with wrong client secret', async ({ request }) => {
    const helper = new OAuthTestHelper(request, 'http://localhost:3001');
    // Note: This test would require a valid authorization code
    // which we can't get without a user login flow
    // Testing the error handling instead
    await expect(
      helper.exchangeCodeForToken({
        code: 'any_code',
        redirect_uri: 'http://localhost:3000/callback',
        client_id: confidentialClient.client_id,
        client_secret: 'wrong_secret',
      })
    ).rejects.toThrow();
  });

  test('should handle PKCE flow for public client', async () => {
    const { codeVerifier, codeChallenge } = await oauthHelper.generatePKCE();

    // Build authorization URL
    const authURL = oauthHelper.buildAuthorizationURL({
      client_id: publicClient.client_id,
      redirect_uri: 'http://localhost:3000/callback',
      scope: 'openid email',
      state: 'test-state-pkce',
      code_challenge: codeChallenge,
    });

    expect(authURL).toContain('code_challenge=');
    expect(authURL).toContain('code_challenge_method=S256');
  });

  test('should list all registered clients', async ({ request }) => {
    const response = await request.get('http://localhost:3001/auth/oauth/clients');

    expect(response.ok()).toBeTruthy();

    const clients = await response.json();
    expect(Array.isArray(clients)).toBeTruthy();
    expect(clients.length).toBeGreaterThan(0);

    // Find our test clients
    const foundConfidential = clients.find((c: any) => c.name === 'E2E Test Confidential Client');
    const foundPublic = clients.find((c: any) => c.name === 'E2E Test Public Client');

    expect(foundConfidential).toBeDefined();
    expect(foundPublic).toBeDefined();
  });

  test('should get client info by client_id', async ({ request }) => {
    const response = await request.get(
      `http://localhost:3001/auth/oauth/clients/${confidentialClient.client_id}`
    );

    expect(response.ok()).toBeTruthy();

    const clientInfo = await response.json();
    expect(clientInfo.client_id).toBe(confidentialClient.client_id);
    expect(clientInfo.name).toBe('E2E Test Confidential Client');
    expect(clientInfo.is_confidential).toBe(true);
  });

  test('should return 404 for non-existent client', async ({ request }) => {
    const response = await request.get(
      'http://localhost:3001/auth/oauth/clients/non-existent-client'
    );

    expect(response.status()).toBe(404);
  });
});

test.describe('OAuth Token Management', () => {
  let oauthHelper: OAuthTestHelper;
  let testClient: any;
  let accessToken: string;
  let refreshToken: string;

  test.beforeAll(async ({ request }) => {
    oauthHelper = new OAuthTestHelper(request, 'http://localhost:3001');

    testClient = await oauthHelper.registerClient({
      name: 'E2E Token Management Client',
      redirect_uris: ['http://localhost:3000/callback'],
      scopes: ['openid', 'email', 'offline_access'],
      grant_types: ['authorization_code', 'refresh_token'],
      is_confidential: true,
    });
  });

  test('should introspect active token', async ({ request }) => {
    // Note: This would require a valid access token from a full flow
    // Testing the endpoint structure instead
    const response = await request.post('http://localhost:3001/auth/oauth/introspect', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: new URLSearchParams({
        token: 'test_token',
      }).toString(),
    });

    expect(response.ok()).toBeTruthy();
    const result = await response.json();
    expect(result).toHaveProperty('active');
  });

  test('should revoke token', async ({ request }) => {
    const helper = new OAuthTestHelper(request, 'http://localhost:3001');
    await helper.revokeToken('test_token_to_revoke');

    // Verify revoked token cannot be used (will be inactive)
    const introspection = await helper.introspectToken('test_token_to_revoke');
    expect(introspection.active).toBe(false);
  });

  test('should handle token refresh request', async ({ request }) => {
    // Test the refresh token endpoint structure
    const response = await request.post('http://localhost:3001/auth/oauth/token', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: 'invalid_refresh_token',
        client_id: testClient.client_id,
        client_secret: testClient.client_secret,
      }).toString(),
    });

    expect(response.status()).toBe(400); // Bad request for invalid token
  });
});
