import { test, expect } from '@playwright/test';
import { OAuthTestHelper } from '../helpers/oauth-helpers';

/**
 * E2E Tests for OAuth 2.0 Client Credentials Flow
 * Tests machine-to-machine authentication
 */
test.describe('OAuth 2.0 Client Credentials Flow', () => {
  let oauthHelper: OAuthTestHelper;
  let m2mClient: any;
  let tokenResponse: any;

  test.beforeAll(async ({ request }) => {
    oauthHelper = new OAuthTestHelper(request, 'http://localhost:3001');

    // Register machine-to-machine client
    m2mClient = await oauthHelper.registerClient({
      name: 'E2E M2M Test Client',
      redirect_uris: [], // No redirect URIs needed for client credentials
      scopes: ['openid', 'email'],
      grant_types: ['client_credentials'],
      is_confidential: true,
    });
  });

  test('should register M2M client successfully', async () => {
    expect(m2mClient).toBeDefined();
    expect(m2mClient.client_id).toBeDefined();
    expect(m2mClient.client_secret).toBeDefined();
    expect(m2mClient.is_confidential).toBe(true);
  });

  test('should exchange client credentials for access token', async ({ request }) => {
    const helper = new OAuthTestHelper(request, 'http://localhost:3001');
    tokenResponse = await helper.clientCredentialsFlow({
      client_id: m2mClient.client_id,
      client_secret: m2mClient.client_secret,
      scope: 'openid email',
    });

    expect(tokenResponse).toBeDefined();
    expect(tokenResponse.access_token).toBeDefined();
    expect(tokenResponse.token_type).toBe('Bearer');
    expect(tokenResponse.expires_in).toBeGreaterThan(0);
    expect(tokenResponse.scope).toBe('openid email');
  });

  test('should not include refresh token in client credentials response', async () => {
    expect(tokenResponse.refresh_token).toBeUndefined();
  });

  test('should fail with invalid client credentials', async () => {
    await expect(
      oauthHelper.clientCredentialsFlow({
        client_id: m2mClient.client_id,
        client_secret: 'wrong_secret',
        scope: 'openid',
      })
    ).rejects.toThrow();
  });

  test('should fail with missing client secret', async () => {
    await expect(
      oauthHelper.clientCredentialsFlow({
        client_id: m2mClient.client_id,
        client_secret: '', // Empty secret
        scope: 'openid',
      })
    ).rejects.toThrow();
  });

  test('should fail with non-existent client', async () => {
    await expect(
      oauthHelper.clientCredentialsFlow({
        client_id: 'non_existent_client',
        client_secret: 'some_secret',
        scope: 'openid',
      })
    ).rejects.toThrow();
  });

  test('should support custom scopes', async ({ request }) => {
    const helper = new OAuthTestHelper(request, 'http://localhost:3001');

    // Register client with different scopes
    const scopedClient = await helper.registerClient({
      name: 'E2E Scoped M2M Client',
      redirect_uris: [],
      scopes: ['openid', 'email', 'profile'],
      grant_types: ['client_credentials'],
      is_confidential: true,
    });

    const response = await helper.clientCredentialsFlow({
      client_id: scopedClient.client_id,
      client_secret: scopedClient.client_secret,
      scope: 'openid',
    });

    expect(response.access_token).toBeDefined();
    expect(response.scope).toBe('openid');
  });

  test('should fail with unsupported scope', async ({ request }) => {
    const helper = new OAuthTestHelper(request, 'http://localhost:3001');

    const limitedClient = await helper.registerClient({
      name: 'E2E Limited M2M Client',
      redirect_uris: [],
      scopes: ['openid'], // Only openid
      grant_types: ['client_credentials'],
      is_confidential: true,
    });

    await expect(
      helper.clientCredentialsFlow({
        client_id: limitedClient.client_id,
        client_secret: limitedClient.client_secret,
        scope: 'openid profile email', // Request more than allowed
      })
    ).rejects.toThrow();
  });
});

test.describe('Token Introspection for M2M', () => {
  let oauthHelper: OAuthTestHelper;
  let m2mClient: any;
  let accessToken: string;

  test.beforeAll(async ({ request }) => {
    oauthHelper = new OAuthTestHelper(request, 'http://localhost:3001');

    m2mClient = await oauthHelper.registerClient({
      name: 'E2E M2M Introspection Client',
      redirect_uris: [],
      scopes: ['openid', 'email'],
      grant_types: ['client_credentials'],
      is_confidential: true,
    });

    const tokenResponse = await oauthHelper.clientCredentialsFlow({
      client_id: m2mClient.client_id,
      client_secret: m2mClient.client_secret,
      scope: 'openid',
    });

    accessToken = tokenResponse.access_token;
  });

  test('should introspect valid access token', async ({ request }) => {
    const helper = new OAuthTestHelper(request, 'http://localhost:3001');
    const introspection = await helper.introspectToken(accessToken);

    expect(introspection).toBeDefined();
    expect(introspection.active).toBe(true);
    expect(introspection.client_id).toBe(m2mClient.client_id);
    expect(introspection.scope).toBe('openid');
  });

  test('should show inactive for invalid token', async ({ request }) => {
    const helper = new OAuthTestHelper(request, 'http://localhost:3001');
    const introspection = await helper.introspectToken('invalid_token_string');

    expect(introspection).toBeDefined();
    expect(introspection.active).toBe(false);
  });

  test('should revoke access token', async ({ request }) => {
    const helper = new OAuthTestHelper(request, 'http://localhost:3001');

    // Get a new token to revoke
    const tokenResponse = await helper.clientCredentialsFlow({
      client_id: m2mClient.client_id,
      client_secret: m2mClient.client_secret,
      scope: 'openid',
    });

    const tokenToRevoke = tokenResponse.access_token;

    // Verify it's active before revocation
    const beforeRevoke = await helper.introspectToken(tokenToRevoke);
    expect(beforeRevoke.active).toBe(true);

    // Revoke the token
    await helper.revokeToken(tokenToRevoke);

    // Verify it's inactive after revocation
    const afterRevoke = await helper.introspectToken(tokenToRevoke);
    expect(afterRevoke.active).toBe(false);
  });
});
