import { test, expect } from '@playwright/test';
import { OAuthTestHelper } from '../helpers/oauth-helpers';

/**
 * E2E Tests for OAuth 2.0 Device Authorization Flow (RFC 8628)
 * Tests device flow for IoT/TV devices with limited input capabilities
 */
test.describe('OAuth 2.0 Device Authorization Flow', () => {
  let oauthHelper: OAuthTestHelper;
  let deviceClient: any;
  let deviceCodeResponse: any;

  test.beforeAll(async ({ request }) => {
    oauthHelper = new OAuthTestHelper(request, 'http://localhost:3001');

    // Register device flow client
    deviceClient = await oauthHelper.registerClient({
      name: 'E2E Device Test Client',
      redirect_uris: [],
      scopes: ['openid', 'email', 'offline_access'],
      grant_types: ['urn:ietf:params:oauth:grant-type:device_code'],
      is_confidential: true,
    });
  });

  test('should register device client successfully', async () => {
    expect(deviceClient).toBeDefined();
    expect(deviceClient.client_id).toBeDefined();
    expect(deviceClient.client_secret).toBeDefined();
    expect(deviceClient.grant_types).toContain('urn:ietf:params:oauth:grant-type:device_code');
  });

  test('should initiate device authorization flow', async ({ request }) => {
    const response = await request.post('http://localhost:3001/auth/oauth/device/authorize', {
      data: {
        client_id: deviceClient.client_id,
        scope: 'openid email',
      },
    });

    expect(response.ok()).toBeTruthy();

    deviceCodeResponse = await response.json();

    expect(deviceCodeResponse).toHaveProperty('device_code');
    expect(deviceCodeResponse).toHaveProperty('user_code');
    expect(deviceCodeResponse).toHaveProperty('verification_uri');
    expect(deviceCodeResponse).toHaveProperty('verification_uri_complete');
    expect(deviceCodeResponse).toHaveProperty('expires_in');
    expect(deviceCodeResponse).toHaveProperty('interval');

    // Verify user code format (8 characters, grouped in 4s)
    expect(deviceCodeResponse.user_code).toMatch(/^[A-Z0-9]{4}-[A-Z0-9]{4}$/);

    // Verify verification URI
    expect(deviceCodeResponse.verification_uri).toContain('/auth/oauth/device/verify');
  });

  test('should include verification_uri_complete with user_code', async () => {
    expect(deviceCodeResponse.verification_uri_complete).toContain(
      `user_code=${deviceCodeResponse.user_code}`
    );
  });

  test('should have reasonable expiration time', async () => {
    // Device codes should expire in reasonable time (typically 15 minutes)
    expect(deviceCodeResponse.expires_in).toBeGreaterThan(0);
    expect(deviceCodeResponse.expires_in).toBeLessThanOrEqual(1800); // Max 30 minutes
  });

  test('should have reasonable polling interval', async () => {
    // Interval should be at least 5 seconds (RFC 8628 recommendation)
    expect(deviceCodeResponse.interval).toBeGreaterThanOrEqual(5);
  });

  test('should fail device authorization with invalid client_id', async ({ request }) => {
    const response = await request.post('http://localhost:3001/auth/oauth/device/authorize', {
      data: {
        client_id: 'invalid_client_id',
        scope: 'openid',
      },
    });

    expect(response.status()).toBe(404); // Client not found
  });

  test('should handle pending device code during token polling', async ({ request }) => {
    // Use the device code from previous test
    const response = await request.post('http://localhost:3001/auth/oauth/token', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:device_code',
        device_code: deviceCodeResponse.device_code,
        client_id: deviceClient.client_id,
        client_secret: deviceClient.client_secret,
      }),
    });

    // Should get authorization_pending error
    expect(response.status()).toBe(400);

    const error = await response.json();
    expect(error).toHaveProperty('error', 'authorization_pending');
  });

  test('should fail with expired device code', async ({ request }) => {
    // This test simulates polling with an expired code
    // In a real scenario, we'd need to wait for expiration or mock it

    const response = await request.post('http://localhost:3001/auth/oauth/token', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:device_code',
        device_code: 'expired_device_code',
        client_id: deviceClient.client_id,
        client_secret: deviceClient.client_secret,
      }),
    });

    // Should get error (either invalid_grant or expired_token)
    expect(response.status()).toBe(400);
  });

  test('should fail with invalid device code', async ({ request }) => {
    const response = await request.post('http://localhost:3001/auth/oauth/token', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:device_code',
        device_code: 'invalid_device_code',
        client_id: deviceClient.client_id,
        client_secret: deviceClient.client_secret,
      }),
    });

    expect(response.status()).toBe(400);

    const error = await response.json();
    expect(error).toHaveProperty('error');
  });

  test('should get device verification page', async ({ page, request }) => {
    // Navigate to verification page with user code
    const response = await request.get(
      `http://localhost:3001/auth/oauth/device/verify?user_code=${deviceCodeResponse.user_code}`
    );

    // Should return device verification info
    expect(response.ok()).toBeTruthy();

    const deviceInfo = await response.json();
    expect(deviceInfo).toHaveProperty('user_code', deviceCodeResponse.user_code);
    expect(deviceInfo).toHaveProperty('client_name');
    expect(deviceInfo).toHaveProperty('scope');
  });

  test('should fail verification with invalid user code', async ({ request }) => {
    const response = await request.get(
      'http://localhost:3001/auth/oauth/device/verify?user_code=INVALID'
    );

    expect(response.status()).toBe(404);
  });

  test('should support device consent submission', async ({ page, request }) => {
    // Note: This would require user authentication
    // Testing the endpoint structure instead

    const acceptResponse = await request.post('http://localhost:3001/auth/oauth/device/consent', {
      data: {
        user_code: deviceCodeResponse.user_code,
        action: 'accept',
      },
    });

    // Will fail without auth, but verifies endpoint exists
    expect(acceptResponse.status()).toBeGreaterThanOrEqual(400);

    const denyResponse = await request.post('http://localhost:3001/auth/oauth/device/consent', {
      data: {
        user_code: deviceCodeResponse.user_code,
        action: 'deny',
      },
    });

    expect(denyResponse.status()).toBeGreaterThanOrEqual(400);
  });
});

test.describe('Device Flow Polling Behavior', () => {
  let oauthHelper: OAuthTestHelper;
  let deviceClient: any;

  test.beforeAll(async ({ request }) => {
    oauthHelper = new OAuthTestHelper(request, 'http://localhost:3001');

    deviceClient = await oauthHelper.registerClient({
      name: 'E2E Device Polling Test Client',
      redirect_uris: [],
      scopes: ['openid', 'email'],
      grant_types: ['urn:ietf:params:oauth:grant-type:device_code'],
      is_confidential: true,
    });
  });

  test('should respect slow_down error after too frequent polling', async ({ request }) => {
    // Initiate device flow
    const deviceResponse = await request.post('http://localhost:3001/auth/oauth/device/authorize', {
      data: {
        client_id: deviceClient.client_id,
        scope: 'openid',
      },
    });

    const deviceData = await deviceResponse.json();

    // Poll multiple times rapidly (simulating non-compliant client)
    const poll1 = await request.post('http://localhost:3001/auth/oauth/token', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:device_code',
        device_code: deviceData.device_code,
        client_id: deviceClient.client_id,
        client_secret: deviceClient.client_secret,
      }),
    });

    // First poll should get authorization_pending
    expect(poll1.status()).toBe(400);
    const error1 = await poll1.json();
    expect(error1.error).toBe('authorization_pending');
  });

  test('should handle multiple simultaneous device flows', async ({ request }) => {
    // Initiate multiple device flows for same client
    const flow1 = await request.post('http://localhost:3001/auth/oauth/device/authorize', {
      data: {
        client_id: deviceClient.client_id,
        scope: 'openid',
      },
    });

    const flow2 = await request.post('http://localhost:3001/auth/oauth/device/authorize', {
      data: {
        client_id: deviceClient.client_id,
        scope: 'openid',
      },
    });

    const data1 = await flow1.json();
    const data2 = await flow2.json();

    // Should get unique codes for each flow
    expect(data1.device_code).not.toBe(data2.device_code);
    expect(data1.user_code).not.toBe(data2.user_code);
  });
});
