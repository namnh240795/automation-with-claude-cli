# OAuth 2.0 E2E Tests

End-to-end tests for the OAuth 2.0 Authorization Server using Playwright.

## Test Coverage

### Grant Types
- **Authorization Code Flow** - Tests authorization code generation and token exchange
- **Authorization Code Flow with PKCE** - Tests PKCE for public clients (SPAs, mobile apps)
- **Client Credentials Flow** - Tests machine-to-machine authentication
- **Refresh Token Flow** - Tests token refresh and rotation
- **Device Authorization Flow** - Tests device flow for IoT/TV devices (RFC 8628)

### Features
- OAuth client registration and management
- Token introspection (RFC 7662)
- Token revocation
- PKCE code challenge generation
- Scope validation
- Client authentication
- Error handling

## Prerequisites

1. **Install Dependencies**
   ```bash
   pnpm install
   ```

2. **Install Playwright Browsers**
   ```bash
   pnpm exec playwright install
   ```

3. **Set Environment Variables**
   ```bash
   export DATABASE_URL="postgresql://user:password@localhost:5432/auth_db"
   export JWT_SECRET="your-jwt-secret"
   ```

4. **Ensure Database is Running**
   ```bash
   # Start PostgreSQL
   docker-compose up -d postgres
   ```

## Running Tests

### Run All E2E Tests
```bash
pnpm test:e2e
```

### Run with UI (Recommended for Development)
```bash
pnpm test:e2e:ui
```

### Run in Headed Mode (Watch Browser)
```bash
pnpm test:e2e:headed
```

### Debug Tests
```bash
pnpm test:e2e:debug
```

### View Test Report
After running tests, view the HTML report:
```bash
pnpm test:e2e:report
```

## Test Structure

```
tests/
├── helpers/
│   └── oauth-helpers.ts      # OAuth test helper utilities
├── oauth/
│   ├── authorization-code-flow.spec.ts
│   ├── client-credentials-flow.spec.ts
│   ├── device-flow.spec.ts
│   └── refresh-token-flow.spec.ts
└── README.md
```

## Key Test Scenarios

### Authorization Code Flow
- ✅ Register confidential and public clients
- ✅ Generate authorization URLs with PKCE
- ✅ Exchange authorization codes for tokens
- ✅ Handle invalid/expired codes
- ✅ Token introspection and revocation

### Client Credentials Flow
- ✅ Register M2M clients
- ✅ Exchange client credentials for access tokens
- ✅ Validate client authentication
- ✅ Scope validation
- ✅ No refresh tokens returned

### Device Authorization Flow
- ✅ Initiate device authorization
- ✅ Generate device and user codes
- ✅ Handle pending/authorized/expired states
- ✅ Verification page
- ✅ Consent submission

### Refresh Token Flow
- ✅ Refresh access tokens
- ✅ Token rotation
- ✅ Public vs confidential client handling
- ✅ Revoked token handling

## Configuration

Playwright configuration is in `playwright.config.ts`:

- **Base URL**: `http://localhost:3001` (configurable via `BASE_URL`)
- **Browsers**: Chromium, Firefox, WebKit
- **Workers**: 1 (sequential to avoid database conflicts)
- **Auto-start**: Dev server starts automatically before tests

## CI/CD Integration

For CI/CD pipelines:

```yaml
# Example GitHub Actions
- name: Install Playwright
  run: pnpm exec playwright install --with-deps

- name: Run E2E Tests
  run: pnpm test:e2e
  env:
    CI: true

- name: Upload Test Report
  if: always()
  uses: actions/upload-artifact@v3
  with:
    name: playwright-report
    path: test-results/
```

## Troubleshooting

### Tests Fail with Connection Refused
- Ensure the auth service is running on port 3001
- Check that `BASE_URL` is correct

### Tests Fail with Database Errors
- Ensure PostgreSQL is running
- Verify `DATABASE_URL` is set correctly
- Run migrations: `pnpm prisma:migrate`

### PKCE Generation Fails
- Ensure running in Node.js environment (not browser)
- Check crypto.subtle is available

### Timeouts
- Increase timeout in `playwright.config.ts`
- Check if tests are waiting for external services

## Writing New Tests

```typescript
import { test, expect } from '@playwright/test';
import { OAuthTestHelper } from '../helpers/oauth-helpers';

test.describe('My OAuth Feature', () => {
  let oauthHelper: OAuthTestHelper;

  test.beforeAll(async ({ request }) => {
    oauthHelper = new OAuthTestHelper(request, 'http://localhost:3001');
  });

  test('should do something', async () => {
    const client = await oauthHelper.registerClient({
      name: 'Test Client',
      redirect_uris: ['http://localhost:3000/callback'],
      scopes: ['openid'],
      grant_types: ['authorization_code'],
      is_confidential: true,
    });

    expect(client).toBeDefined();
  });
});
```

## Best Practices

1. **Use Test Helpers** - Leverage `OAuthTestHelper` for common operations
2. **Clean Up** - Delete test clients after tests if needed
3. **Isolate Tests** - Each test should be independent
4. **Mock External Services** - Don't rely on external authentication providers
5. **Test Error Cases** - Verify proper error handling
6. **Use Descriptive Names** - Test names should clearly describe what's being tested

## Resources

- [Playwright Documentation](https://playwright.dev)
- [OAuth 2.0 RFC 6749](https://datatracker.ietf.org/doc/html/rfc6749)
- [PKCE RFC 7636](https://datatracker.ietf.org/doc/html/rfc7636)
- [Device Flow RFC 8628](https://datatracker.ietf.org/doc/html/rfc8628)
- [Token Introspection RFC 7662](https://datatracker.ietf.org/doc/html/rfc7662)
