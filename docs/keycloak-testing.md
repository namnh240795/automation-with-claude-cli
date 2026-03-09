# Keycloak Authentication Testing Guide

This guide provides comprehensive testing examples and verification steps for the multi-component Keycloak architecture.

## Prerequisites

- Keycloak running on `http://localhost:8080`
- Realm `app-realm` configured
- Test users created (see setup guide)
- All three services running (optional, for API testing)

## Test Users

| Username | Password | Roles | Component Access |
|----------|----------|-------|------------------|
| testuser | testpass123 | user | Frontend only |
| premiumuser | testpass123 | user, premium_user | Frontend (premium) |
| cmseditor | testpass123 | user, cms_editor | Frontend + CMS (edit) |
| cmspublisher | testpass123 | user, cms_publisher, cms_editor | Frontend + CMS (publish) |
| admin | adminpass123 | admin, user | Frontend + Admin |
| superadmin | superadmin123 | super_admin, admin, user | All components |

## Part 1: Test Keycloak Configuration

### 1.1 Test Health Endpoint

```bash
curl http://localhost:8080/health/ready
```

Expected response:
```json
{"status":"UP"}
```

### 1.2 Test Realm Discovery

```bash
curl http://localhost:8080/realms/app-realm/.well-known/openid-configuration
```

Expected response: JSON with OIDC configuration endpoints

### 1.3 Test Public Key Retrieval

```bash
curl http://localhost:8080/realms/app-realm/protocol/openid-connect/certs
```

Expected response: JSON with JWKS (public keys)

## Part 2: Test Authentication Flows

### 2.1 Test Resource Owner Password Flow

Get token for test user:

```bash
export KEYCLOAK_URL="http://localhost:8080"
export REALM="app-realm"
export CLIENT_ID="frontend-client"
export CLIENT_SECRET="" # Public client, no secret

# For confidential clients (cms-client, admin-client), include secret:
# export CLIENT_SECRET="<your-client-secret>"

curl -X POST "$KEYCLOAK_URL/realms/$REALM/protocol/openid-connect/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=password" \
  -d "client_id=$CLIENT_ID" \
  -d "client_secret=$CLIENT_SECRET" \
  -d "username=testuser" \
  -d "password=testpass123"
```

Expected response:
```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ...",
  "expires_in": 300,
  "refresh_expires_in": 1800,
  "refresh_token": "eyJhbGciOiJIUzUxMiIsInR5cCI6ICJCZWFyZXIiLCJraWQiOiI...",
  "token_type": "Bearer",
  "id_token": "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ...",
  "not-before-policy": 0,
  "session_state": "...",
  "scope": "openid profile email"
}
```

### 2.2 Test Token Structure

Decode and inspect the access token:

```bash
# Get token first (from previous command)
export ACCESS_TOKEN="<token-from-previous-response>"

# Decode (macOS)
echo $ACCESS_TOKEN | jq -R 'split(".") | .[1] | @base64d | fromjson'

# Decode (Linux with base64)
echo $ACCESS_TOKEN | cut -d. -f2 | base64 -d | jq
```

Expected token structure:
```json
{
  "exp": 1705310400,
  "iat": 1705310000,
  "jti": "...",
  "iss": "http://localhost:8080/realms/app-realm",
  "aud": "frontend-client",
  "sub": "user-uuid",
  "typ": "Bearer",
  "azp": "frontend-client",
  "session_state": "...",
  "acr": "1",
  "allowed-origins": [
    "http://localhost:3000"
  ],
  "realm_access": {
    "roles": ["user"]
  },
  "resource_access": {
    "frontend-client": {
      "roles": []
    },
    "account": {
      "roles": ["view-profile"]
    }
  },
  "scope": "openid profile email",
  "email_verified": true,
  "email": "testuser@example.com",
  "preferred_username": "testuser",
  "given_name": "Test",
  "family_name": "User"
}
```

### 2.3 Test Refresh Token Flow

```bash
export REFRESH_TOKEN="<refresh-token-from-initial-login>"

curl -X POST "$KEYCLOAK_URL/realms/$REALM/protocol/openid-connect/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=refresh_token" \
  -d "client_id=$CLIENT_ID" \
  -d "client_secret=$CLIENT_SECRET" \
  -d "refresh_token=$REFRESH_TOKEN"
```

### 2.4 Test Logout

```bash
curl -X POST "$KEYCLOAK_URL/realms/$REALM/protocol/openid-connect/logout" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "client_id=$CLIENT_ID" \
  -d "client_secret=$CLIENT_SECRET" \
  -d "refresh_token=$REFRESH_TOKEN"
```

## Part 3: Test Role-Based Access

### 3.1 Test User Role Access

Login as `testuser` (user role only):

```bash
export ACCESS_TOKEN="<token-from-testuser-login>"

# Test frontend profile endpoint
curl -H "Authorization: Bearer $ACCESS_TOKEN" \
  http://localhost:3000/api/user/profile

# Expected: 200 OK with user profile
```

Try accessing admin endpoint:

```bash
curl -H "Authorization: Bearer $ACCESS_TOKEN" \
  http://localhost:3002/admin/users

# Expected: 403 Forbidden (user role doesn't have admin access)
```

### 3.2 Test CMS Editor Role Access

Login as `cmseditor` (user + cms_editor roles):

```bash
export ACCESS_TOKEN="<token-from-cmseditor-login>"

# Test CMS content read
curl -H "Authorization: Bearer $ACCESS_TOKEN" \
  http://localhost:3001/cms/content

# Expected: 200 OK

# Test CMS content create
curl -X POST -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Content","body":"Test body"}' \
  http://localhost:3001/cms/content

# Expected: 201 Created

# Test CMS content publish (should fail)
curl -X POST -H "Authorization: Bearer $ACCESS_TOKEN" \
  http://localhost:3001/cms/content/1/publish

# Expected: 403 Forbidden (editor cannot publish)
```

### 3.3 Test CMS Publisher Role Access

Login as `cmspublisher` (user + cms_publisher + cms_editor roles):

```bash
export ACCESS_TOKEN="<token-from-cmspublisher-login>"

# Test CMS content publish
curl -X POST -H "Authorization: Bearer $ACCESS_TOKEN" \
  http://localhost:3001/cms/content/1/publish

# Expected: 200 OK (publisher can publish)

# Test CMS admin settings (should fail)
curl -H "Authorization: Bearer $ACCESS_TOKEN" \
  http://localhost:3001/cms/settings

# Expected: 403 Forbidden (publisher not admin)
```

### 3.4 Test Admin Role Access

Login as `admin` (admin + user roles):

```bash
export ACCESS_TOKEN="<token-from-admin-login>"

# Test admin users list
curl -H "Authorization: Bearer $ACCESS_TOKEN" \
  http://localhost:3002/admin/users

# Expected: 200 OK

# Test system config read
curl -H "Authorization: Bearer $ACCESS_TOKEN" \
  http://localhost:3002/admin/system/config

# Expected: 200 OK

# Test system config write (should fail)
curl -X PUT -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"maintenance_mode":true}' \
  http://localhost:3002/admin/system/config

# Expected: 403 Forbidden (admin cannot modify system config)
```

### 3.5 Test Super Admin Role Access

Login as `superadmin` (super_admin + admin + user roles):

```bash
export ACCESS_TOKEN="<token-from-superadmin-login>"

# Test system config write
curl -X PUT -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"maintenance_mode":true}' \
  http://localhost:3002/admin/system/config

# Expected: 200 OK (super admin can modify system config)

# Test delete user
curl -X DELETE -H "Authorization: Bearer $ACCESS_TOKEN" \
  http://localhost:3002/admin/users/testuser

# Expected: 200 OK (super admin can delete users)
```

## Part 4: Test Scope-Based Access

### 4.1 Test Profile Read Scope

```bash
export ACCESS_TOKEN="<token-with-profile-read-scope>"

curl -H "Authorization: Bearer $ACCESS_TOKEN" \
  http://localhost:3000/api/user/profile

# Expected: 200 OK if profile:read scope granted
```

### 4.2 Test Profile Write Scope

```bash
export ACCESS_TOKEN="<token-with-profile-write-scope>"

curl -X PUT -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"first_name":"Updated"}' \
  http://localhost:3000/api/user/profile

# Expected: 200 OK if profile:write scope granted
# Expected: 403 Forbidden if scope not granted
```

### 4.3 Test CMS Scopes

```bash
# Test cms:content:write scope
curl -X POST -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test"}' \
  http://localhost:3001/cms/content

# Expected: 200 OK if cms:content:write scope granted

# Test cms:content:publish scope
curl -X POST -H "Authorization: Bearer $ACCESS_TOKEN" \
  http://localhost:3001/cms/content/1/publish

# Expected: 200 OK if cms:content:publish scope granted
# Expected: 403 Forbidden if scope not granted
```

### 4.4 Test Admin Scopes

```bash
# Test admin:users:read scope
curl -H "Authorization: Bearer $ACCESS_TOKEN" \
  http://localhost:3002/admin/users

# Expected: 200 OK if admin:users:read scope granted

# Test admin:system:write scope
curl -X PUT -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"maintenance_mode":true}' \
  http://localhost:3002/admin/system/config

# Expected: 200 OK if admin:system:write scope granted
```

## Part 5: Test SSO Across Applications

### 5.1 Browser-Based SSO Test

1. **Login to Frontend**:
   - Navigate to `http://localhost:3000`
   - Click login
   - Redirected to Keycloak
   - Login with `testuser` / `testpass123`
   - Redirected back to frontend
   - Verify logged in

2. **Access CMS Without Re-login**:
   - Navigate to `http://localhost:3001`
   - Should be automatically logged in (SSO)
   - Verify you can access allowed endpoints

3. **Access Admin Without Re-login**:
   - Navigate to `http://localhost:3002`
   - Should be automatically logged in (SSO)
   - Verify you can access allowed endpoints

4. **Logout**:
   - Logout from any application
   - Try accessing other applications
   - Should be logged out from all

### 5.2 Cookie-Based SSO Test

Check Keycloak session cookies:

```bash
# After login, check cookies
curl -v -H "Authorization: Bearer $ACCESS_TOKEN" \
  http://localhost:8080/realms/app-realm/account

# Look for KEYCLOAK_SESSION, KEYCLOAK_IDENTITY, KEYCLOAK_REFRESH cookies
```

## Part 6: Test Resource-Based Authorization

If using Keycloak Authorization Services:

### 6.1 Test Resource Permissions

```bash
# Request with RPT (Requesting Party Token)
curl -X POST "$KEYCLOAK_URL/realms/$REALM/protocol/openid-connect/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=urn:ietf:params:oauth:grant-type:uma-ticket" \
  -d "client_id=$CLIENT_ID" \
  -d "client_secret=$CLIENT_SECRET" \
  -d "audience=cms-client" \
  -d "permission=cms_content#publish"

# Response contains RPT with permissions
```

### 6.2 Test Resource Access

```bash
export RPT="<rpt-from-previous-response>"

curl -H "Authorization: Bearer $RPT" \
  http://localhost:3001/cms/content/1/publish

# Expected: 200 OK if permission granted
# Expected: 403 Forbidden if permission denied
```

## Part 7: Automated Testing Scripts

### 7.1 Test All Users

```bash
#!/bin/bash
# test-all-users.sh

KEYCLOAK_URL="http://localhost:8080"
REALM="app-realm"
CLIENT_ID="frontend-client"

declare -A USERS=(
  ["testuser"]="testpass123"
  ["premiumuser"]="testpass123"
  ["cmseditor"]="testpass123"
  ["cmspublisher"]="testpass123"
  ["admin"]="adminpass123"
  ["superadmin"]="superadmin123"
)

echo "Testing all users..."

for username in "${!USERS[@]}"; do
  password="${USERS[$username]}"
  echo "Testing $username..."

  response=$(curl -s -X POST "$KEYCLOAK_URL/realms/$REALM/protocol/openid-connect/token" \
    -H "Content-Type: application/x-www-form-urlencoded" \
    -d "grant_type=password" \
    -d "client_id=$CLIENT_ID" \
    -d "username=$username" \
    -d "password=$password")

  if echo "$response" | grep -q "access_token"; then
    echo "✓ $username login successful"

    # Check roles
    access_token=$(echo "$response" | jq -r '.access_token')
    roles=$(echo "$access_token" | jq -R 'split(".") | .[1] | @base64d | fromjson | .realm_access.roles')
    echo "  Roles: $roles"
  else
    echo "✗ $username login failed"
  fi
  echo ""
done
```

### 7.2 Test All Endpoints

```bash
#!/bin/bash
# test-endpoints.sh

BASE_URL="http://localhost:3000"
CMS_URL="http://localhost:3001"
ADMIN_URL="http://localhost:3002"

echo "Testing Frontend endpoints..."
curl -s -H "Authorization: Bearer $FRONTEND_TOKEN" $BASE_URL/api/user/profile | jq .
curl -s -H "Authorization: Bearer $FRONTEND_TOKEN" $BASE_URL/api/user/content | jq .

echo "Testing CMS endpoints..."
curl -s -H "Authorization: Bearer $CMS_TOKEN" $CMS_URL/cms/content | jq .
curl -s -H "Authorization: Bearer $CMS_TOKEN" -X POST \
  -H "Content-Type: application/json" \
  -d '{"title":"Test"}' \
  $CMS_URL/cms/content | jq .

echo "Testing Admin endpoints..."
curl -s -H "Authorization: Bearer $ADMIN_TOKEN" $ADMIN_URL/admin/users | jq .
curl -s -H "Authorization: Bearer $ADMIN_TOKEN" $ADMIN_URL/admin/stats | jq .
```

## Part 8: Common Issues and Solutions

### Issue 1: 401 Unauthorized

**Cause**: Invalid or expired token
**Solution**: Get a fresh token using password flow or refresh token

### Issue 2: 403 Forbidden

**Cause**: User lacks required role or scope
**Solution**: Check user's role mappings in Keycloak Admin Console

### Issue 3: SSO Not Working

**Cause**: Different realms or incorrect cookie configuration
**Solution**: Ensure all clients use same realm and correct redirect URIs

### Issue 4: CORS Errors

**Cause**: Missing web origins in client configuration
**Solution**: Add all application URLs to client's web origins

### Issue 5: Token Doesn't Contain Roles

**Cause**: Roles not assigned or mapper not configured
**Solution**: Check role mappings in Keycloak user settings

## Part 9: Performance Testing

### 9.1 Load Testing Token Endpoint

```bash
# Install Apache Bench first
ab -n 1000 -c 10 \
  -p login-data.txt \
  -T application/x-www-form-urlencoded \
  http://localhost:8080/realms/app-realm/protocol/openid-connect/token

# login-data.txt content:
# grant_type=password&client_id=frontend-client&username=testuser&password=testpass123
```

### 9.2 Concurrent User Sessions

Test multiple simultaneous logins:

```bash
for i in {1..100}; do
  curl -s -X POST "$KEYCLOAK_URL/realms/$REALM/protocol/openid-connect/token" \
    -H "Content-Type: application/x-www-form-urlencoded" \
    -d "grant_type=password" \
    -d "client_id=$CLIENT_ID" \
    -d "username=testuser" \
    -d "password=testpass123" &
done

wait
echo "All logins completed"
```

## Part 10: Security Testing

### 10.1 Test Token Expiration

```bash
# Get token
export ACCESS_TOKEN="<your-token>"

# Wait 5 minutes (or reduce token timeout in Keycloak)
sleep 300

# Try to use expired token
curl -H "Authorization: Bearer $ACCESS_TOKEN" \
  http://localhost:3000/api/user/profile

# Expected: 401 Unauthorized
```

### 10.2 Test Invalid Token

```bash
curl -H "Authorization: Bearer invalid-token" \
  http://localhost:3000/api/user/profile

# Expected: 401 Unauthorized
```

### 10.3 Test Role Escalation

Try accessing admin endpoint with user token:

```bash
export USER_TOKEN="<user-role-token>"

curl -H "Authorization: Bearer $USER_TOKEN" \
  http://localhost:3002/admin/users

# Expected: 403 Forbidden (role-based access control working)
```

## Verification Checklist

After completing all tests, verify:

- [ ] All users can login successfully
- [ ] Tokens contain correct roles and scopes
- [ ] Role-based access control works correctly
- [ ] Scope-based access control works correctly
- [ ] SSO works across all applications
- [ ] Logout clears all sessions
- [ ] Invalid/expired tokens are rejected
- [ ] CORS configuration is correct
- [ ] Performance is acceptable
- [ ] Security controls prevent unauthorized access

## Next Steps

After completing testing:

1. Review failed tests and fix issues
2. Document custom configurations
3. Create monitoring dashboards
4. Set up automated testing in CI/CD
5. Plan load testing for production

## References

- [Keycloak Testing Guide](https://www.keycloak.org/docs/latest/testing.html)
- [OAuth 2.0 Security Best Current Practice](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics)
