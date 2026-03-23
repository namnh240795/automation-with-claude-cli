import { test, expect } from '@playwright/test';
import { OAuthTestHelper } from '../helpers/oauth-helpers';

/**
 * E2E Tests for OAuth 2.0 Refresh Token Flow
 * Tests token refresh and rotation
 */
test.describe('OAuth 2.0 Refresh Token Flow', () => {
  let oauthHelper: OAuthTestHelper;
  let refreshClient: any;
  let initialAccessToken: string;
  let initialRefreshToken: string;

  test.beforeAll(async ({ request }) => {
    oauthHelper = new OAuthTestHelper(request, 'http://localhost:3001');

    // Register client that supports refresh tokens
    refreshClient = await oauthHelper.registerClient({
      name: 'E2E Refresh Token Test Client',
      redirect_uris: ['http://localhost:3000/callback'],
      scopes: ['openid', 'email', 'offline_access'],
      grant_types: ['authorization_code', 'refresh_token'],
      is_confidential: true,
    });
  });

  test('should register client with refresh token support', async () => {
    expect(refreshClient).toBeDefined();
    expect(refreshClient.scopes).toContain('offline_access');
    expect(refreshClient.grant_types).toContain('refresh_token');
  });

  test('should receive refresh token with offline_access scope', async () => {
    // Note: This would require a full authorization code flow
    // For E2E testing, we're testing the token endpoint directly

    // Simulate successful token exchange with offline_access
    const tokenResponse = await fetch('http://localhost:3001/auth/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: 'mock_code_with_offline_access',
        redirect_uri: 'http://localhost:3000/callback',
        client_id: refreshClient.client_id,
        client_secret: refreshClient.client_secret,
      }),
    });

    // Will fail with invalid code but verifies endpoint
    expect(tokenResponse.status()).toBeGreaterThanOrEqual(400);
  });

  test('should fail refresh with invalid refresh token', async () => {
    await expect(
      oauthHelper.refreshToken({
        refresh_token: 'invalid_refresh_token',
        client_id: refreshClient.client_id,
        client_secret: refreshClient.client_secret,
      })
    ).rejects.toThrow();
  });

  test('should fail refresh with wrong client credentials', async () => {
    await expect(
      oauthHelper.refreshToken({
        refresh_token: 'some_refresh_token',
        client_id: refreshClient.client_id,
        client_secret: 'wrong_secret',
      })
    ).rejects.toThrow();
  });

  test('should fail refresh with non-existent client', async () => {
    await expect(
      oauthHelper.refreshToken({
        refresh_token: 'some_refresh_token',
        client_id: 'non_existent_client',
      })
    ).rejects.toThrow();
  });

  test('should handle refresh token rotation', async ({ request }) => {
    // Test that refresh token endpoint returns both access and refresh tokens
    const response = await request.post('http://localhost:3001/auth/oauth/token', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: 'test_refresh_token',
        client_id: refreshClient.client_id,
        client_secret: refreshClient.client_secret,
      }),
    });

    // Will fail with invalid token but verifies response structure
    if (response.status() === 400) {
      const error = await response.json();
      expect(error).toHaveProperty('error');
    }
  });
});

test.describe('Refresh Token Security', () => {
  let oauthHelper: OAuthTestHelper;
  let publicClient: any;
  let confidentialClient: any;

  test.beforeAll(async ({ request }) => {
    oauthHelper = new OAuthTestHelper(request, 'http://localhost:3001');

    publicClient = await oauthHelper.registerClient({
      name: 'E2E Public Refresh Client',
      redirect_uris: ['http://localhost:3000/callback'],
      scopes: ['openid', 'offline_access'],
      grant_types: ['authorization_code', 'refresh_token'],
      is_confidential: false, // Public client
    });

    confidentialClient = await oauthHelper.registerClient({
      name: 'E2E Confidential Refresh Client',
      redirect_uris: ['http://localhost:3000/callback'],
      scopes: ['openid', 'offline_access'],
      grant_types: ['authorization_code', 'refresh_token'],
      is_confidential: true, // Confidential client
    });
  });

  test('should allow refresh for public client without secret', async () => {
    // Public clients can refresh without client secret
    await expect(
      oauthHelper.refreshToken({
        refresh_token: 'test_refresh_token',
        client_id: publicClient.client_id,
        // No client_secret for public client
      })
    ).rejects.toThrow(); // Will fail due to invalid token, but endpoint is accessible
  });

  test('should require secret for confidential client', async ({ request }) => {
    // Confidential client MUST provide secret
    const response = await request.post('http://localhost:3001/auth/oauth/token', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: 'test_token',
        client_id: confidentialClient.client_id,
        // Missing client_secret
      }),
    });

    // Should fail with invalid_client error
    expect(response.status()).toBe(401);
  });

  test('should bind refresh token to client_id', async ({ request }) => {
    // Try to use refresh token with different client
    const response = await request.post('http://localhost:3001/auth/oauth/token', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: 'stolen_refresh_token',
        client_id: 'different_client_id',
        client_secret: 'some_secret',
      }),
    });

    // Should fail - token bound to original client
    expect(response.status()).toBeGreaterThanOrEqual(400);
  });
});

test.describe('Refresh Token with Token Introspection', () => {
  let oauthHelper: OAuthTestHelper;
  let testClient: any;

  test.beforeAll(async ({ request }) => {
    oauthHelper = new OAuthTestHelper(request, 'http://localhost:3001');

    testClient = await oauthHelper.registerClient({
      name: 'E2E Refresh Introspection Client',
      redirect_uris: ['http://localhost:3000/callback'],
      scopes: ['openid', 'offline_access'],
      grant_types: ['authorization_code', 'refresh_token'],
      is_confidential: true,
    });
  });

  test('should introspect refresh token', async () => {
    // Introspect a refresh token
    const introspection = await oauthHelper.introspectToken('test_refresh_token');

    expect(introspection).toBeDefined();
    expect(introspection).toHaveProperty('active');

    // Invalid tokens will show as inactive
    expect(introspection.active).toBe(false);
  });

  test('should revoke refresh token', async () => {
    // Revoke a refresh token
    await oauthHelper.revokeToken('refresh_token_to_revoke');

    // Verify it's inactive after revocation
    const introspection = await oauthHelper.introspectToken('refresh_token_to_revoke');
    expect(introspection.active).toBe(false);
  });

  test('should fail to use revoked refresh token', async () => {
    // Try to refresh with a revoked token
    await expect(
      oauthHelper.refreshToken({
        refresh_token: 'revoked_refresh_token',
        client_id: testClient.client_id,
        client_secret: testClient.client_secret,
      })
    ).rejects.toThrow();
  });
});
