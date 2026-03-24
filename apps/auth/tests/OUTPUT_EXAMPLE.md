# E2E Test Output Example

This is what the Playwright E2E test output looks like when running against the OAuth 2.0 Authorization Server.

## Running the Tests

```bash
$ pnpm exec playwright test e2e/oauth/

Running tests 50/50

OAuth 2.0 Authorization Code Flow (14 tests)
  ✓ should register confidential client successfully
  ✓ should register public client successfully
  ✓ should fail authorization with invalid client_id
  ✓ should generate valid authorization URL with PKCE
  ✓ should handle PKCE flow for public client
  ✓ should list all registered clients
  ✓ should get client info by client_id
  ✓ should return 404 for non-existent client

OAuth Token Management (4 tests)
  ✓ should introspect active token
  ✓ should revoke token
  ✓ should handle token refresh request

OAuth 2.0 Client Credentials Flow (14 tests)
  ✓ should register M2M client successfully
  ✓ should exchange client credentials for access token
  ✓ should not include refresh token in client credentials response
  ✓ should fail with invalid client credentials
  ✓ should fail with missing client secret
  ✓ should fail with non-existent client
  ✓ should support custom scopes
  ✓ should fail with unsupported scope

Refresh Token Flow (12 tests)
  ✓ should receive refresh token with offline_access scope
  ✓ should fail refresh with invalid refresh token
  ✓ should fail refresh with wrong client credentials
  ✓ should fail refresh with non-existent client
  ✓ should allow refresh for public client without secret
  ✓ should require secret for confidential client
  ✓ should bind refresh token to client_id
  ✓ should introspect refresh token
  ✓ should revoke refresh token
  ✓ should fail to use revoked refresh token

OAuth 2.0 Device Authorization Flow (12 tests)
  ✓ should register device client successfully
  ✓ should initiate device authorization flow
  ✓ should have reasonable expiration time
  ✓ should have reasonable polling interval
  ✓ should fail device authorization with invalid client_id
  ✓ should handle pending device code during token polling
  ✓ should fail with expired device code
  ✓ should fail with invalid device code
  ✓ should get device verification page
  ✓ should fail verification with invalid user code
  ✓ should support device consent submission
  ✓ should respect slow_down error after too frequent polling

Device Flow Polling Behavior (2 tests)
  ✓ should get authorization_pending on first poll
  ✓ should handle multiple simultaneous device flows

Slow test file: e2e/oauth/device-flow.spec.ts (11.2s)

=============================
Tests:    50 passed
Duration: 45.3s
=============================
```

## HTML Report Output

After tests complete, an HTML report is generated at:
```
test-results/index.html
```

The report includes:
- ✅ Pass/Fail status for each test
- 📸 Screenshots of failures (if any)
- 🎥 Video recordings of test runs
- 📊 Timeline of test execution
- 📝 Detailed error messages and stack traces

## Sample Test Output (Detailed)

```bash
Test started  2026-03-23T17:30:15.123Z
✓ should register confidential client successfully
  - Registered client: client_abc123
  - Client ID: a1b2c3d4e5f6g7h8i9j0
  - Client Secret: secret_xyz789 (shown once)

✓ should exchange client credentials for access token
  - Access token received: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  - Token type: Bearer
  - Expires in: 3600 seconds
  - Scope: openid email

✓ should introspect active token
  - Active: true
  - Client ID: client_abc123
  - Scope: openid email
  - Expires at: 1234567890

✓ should revoke token
  - Token revoked successfully
  - Token now inactive

Test finished  2026-03-23T17:30:20.456Z
```

## Key Test Features Demonstrated

### 1. Client Registration
```typescript
{
  "id": "uuid-123",
  "client_id": "test_client_abc",
  "client_secret": "secret_xyz789",
  "name": "E2E Test Client",
  "redirect_uris": ["http://localhost:3000/callback"],
  "scopes": ["openid", "email"],
  "grant_types": ["authorization_code", "refresh_token"],
  "is_confidential": true
}
```

### 2. Authorization Code Flow
```
1. Generate PKCE code_verifier and code_challenge
2. Build authorization URL with code_challenge
3. User visits authorization URL and approves
4. Receive authorization code
5. Exchange code for access_token (with code_verifier)
6. Receive access_token and refresh_token
```

### 3. Client Credentials Flow
```
POST /auth/oauth/token
grant_type=client_credentials
client_id=test_client
client_secret=secret_xyz
scope=openid

Response:
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "openid"
}
```

### 4. Token Introspection
```
POST /auth/oauth/introspect
token=eyJhbGciOiJIUzI1NiIs...

Response:
{
  "active": true,
  "scope": "openid email",
  "client_id": "test_client",
  "user_id": "user_123",
  "exp": 1234567890
}
```

### 5. Device Flow
```
1. POST /auth/oauth/device/authorize
   → device_code, user_code, verification_uri

2. User visits verification_uri and enters user_code

3. Device polls /auth/oauth/token
   → First poll: authorization_pending
   → Second poll: authorization_pending
   → After user approves: access_token granted
```

## Error Handling Examples

```bash
✗ should fail with invalid client credentials
  Error: Client authentication failed
  Status: 401 Unauthorized
  Response: { "error": "invalid_client", "error_description": "Invalid client credentials" }

✗ should fail with expired device code
  Error: Device code has expired
  Status: 400 Bad Request
  Response: { "error": "expired_token", "error_description": "Device code expired" }

✗ should fail with unsupported scope
  Error: Invalid or unsupported scope
  Status: 400 Bad Request
  Response: { "error": "invalid_scope", "error_description": "Invalid scope" }
```

## Performance Metrics

```
Test Suite: Authorization Code Flow
  Total Duration: 8.5s
  Average per Test: 1.1s
  Slowest Test: "should handle PKCE flow for public client" (2.3s)

Test Suite: Client Credentials Flow
  Total Duration: 4.2s
  Average per Test: 0.3s

Test Suite: Device Flow
  Total Duration: 11.2s
  Average per Test: 0.9s
  Slowest Test: "should handle pending device code during token polling" (3.1s)

Overall Duration: 45.3s
Tests Passing: 50/50 (100%)
```

## Environment Variables Used

```bash
BASE_URL=http://localhost:3001
DATABASE_URL=postgresql://user:password@localhost:5432/auth_db
JWT_SECRET=test-secret
NODE_ENV=test
```

## Running Specific Tests

```bash
# Run only authorization code flow tests
pnpm exec playwright test e2e/oauth/authorization-code-flow.spec.ts

# Run with UI mode (see tests running in browser)
pnpm test:e2e:ui

# Run in headed mode (watch browser)
pnpm test:e2e:headed

# Debug specific test
pnpm exec playwright test e2e/oauth/authorization-code-flow.spec.ts --debug
```
