# Phần 14: API Reference & Examples

## 📋 Mục tiêu phần này

- ✅ Complete API endpoint reference
- ✅ Request/Response examples
- ✅ Error codes và handling
- ✅ Best practices

---

## 🔗 14.1 API Base URL

```
Development:  http://localhost:3001/auth/v1
Production:   https://auth-api.example.com/auth/v1
```

---

## 🔐 14.2 Authentication Endpoints

### Sign Up

```bash
POST /auth/signup
```

**Request**:
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "first_name": "John",
  "last_name": "Doe"
}
```

**Response** (201):
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "is_active": true,
  "email_verified": false,
  "created_at": "2025-03-18T10:00:00.000Z",
  "updated_at": "2025-03-18T10:00:00.000Z"
}
```

### Sign In

```bash
POST /auth/signin
```

**Request**:
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response** (200):
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

### Refresh Token

```bash
POST /auth/refresh
```

**Request**:
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response** (200):
```json
{
  "access_token": "new-access-token",
  "refresh_token": "new-refresh-token",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

### Logout

```bash
POST /auth/logout
```

**Request**:
```json
{
  "refreshToken": "your-refresh-token"
}
```

**Response** (200): Empty

### Get Profile

```bash
GET /auth/profile
Authorization: Bearer <access-token>
```

**Response** (200):
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "is_active": true,
  "email_verified": true,
  "created_at": "2025-03-18T10:00:00.000Z",
  "updated_at": "2025-03-18T10:00:00.000Z"
}
```

---

## 👥 14.3 User Management Endpoints

### List Users

```bash
GET /auth/v1/users?page=0&limit=20&realm_id=master
Authorization: Bearer <admin-token>
```

**Response** (200):
```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "email": "user@example.com",
      "username": "user123",
      "first_name": "John",
      "last_name": "Doe",
      "email_verified": true,
      "enabled": true,
      "realm_id": "master",
      "created_at": "2025-03-18T10:00:00.000Z",
      "updated_at": "2025-03-18T10:00:00.000Z"
    }
  ],
  "meta": {
    "total": 100,
    "page": 0,
    "limit": 20,
    "total_pages": 5
  }
}
```

### Create User

```bash
POST /auth/v1/users
Authorization: Bearer <admin-token>
```

**Request**:
```json
{
  "email": "newuser@example.com",
  "password": "SecurePass123!",
  "first_name": "New",
  "last_name": "User",
  "realm_id": "master"
}
```

**Response** (201):
```json
{
  "id": "new-user-id",
  "email": "newuser@example.com",
  "first_name": "New",
  "last_name": "User",
  "enabled": true,
  "email_verified": false,
  "created_at": "2025-03-18T10:00:00.000Z"
}
```

### Get User by ID

```bash
GET /auth/v1/users/:id
Authorization: Bearer <token>
```

### Update User

```bash
PATCH /auth/v1/users/:id
Authorization: Bearer <admin-token>
```

**Request**:
```json
{
  "first_name": "Updated",
  "email_verified": true
}
```

### Delete User

```bash
DELETE /auth/v1/users/:id
Authorization: Bearer <admin-token>
```

**Response** (204): No content

---

## 🌍 14.4 Realm Management Endpoints

### List Realms

```bash
GET /auth/v1/realms?page=0&limit=20
Authorization: Bearer <admin-token>
```

### Create Realm

```bash
POST /auth/v1/realms
Authorization: Bearer <admin-token>
```

**Request**:
```json
{
  "id": "acme",
  "name": "Acme Corporation",
  "enabled": true,
  "registration_allowed": true,
  "verify_email": true
}
```

### Get Realm by ID

```bash
GET /auth/v1/realms/:id
Authorization: Bearer <admin-token>
```

### Update Realm

```bash
PATCH /auth/v1/realms/:id
Authorization: Bearer <admin-token>
```

**Request**:
```json
{
  "registration_allowed": false,
  "access_token_lifespan": 7200
}
```

---

## 🔑 14.5 Role Management Endpoints

### List Roles

```bash
GET /auth/v1/roles?realm_id=master
Authorization: Bearer <admin-token>
```

### Create Role

```bash
POST /auth/v1/roles
Authorization: Bearer <admin-token>
```

**Request**:
```json
{
  "name": "admin",
  "description": "Administrator with full access",
  "realm_id": "master"
}
```

### Assign Role to User

```bash
POST /auth/v1/users/:userId/roles/:roleId
Authorization: Bearer <admin-token>
```

### Remove Role from User

```bash
DELETE /auth/v1/users/:userId/roles/:roleId
Authorization: Bearer <admin-token>
```

---

## 👨‍👩‍👧‍👦 14.6 Group Management Endpoints

### List Groups

```bash
GET /auth/v1/groups?realm_id=master
Authorization: Bearer <admin-token>
```

### Create Group

```bash
POST /auth/v1/groups
Authorization: Bearer <admin-token>
```

**Request**:
```json
{
  "name": "Engineering",
  "realm_id": "master"
}
```

### Add User to Group

```bash
POST /auth/v1/users/:userId/groups/:groupId
Authorization: Bearer <admin-token>
```

---

## 📱 14.7 Client Management Endpoints

### List Clients

```bash
GET /auth/v1/clients?realm_id=master
Authorization: Bearer <admin-token>
```

### Create Client

```bash
POST /auth/v1/clients
Authorization: Bearer <admin-token>
```

**Request**:
```json
{
  "client_id": "my-app",
  "name": "My Application",
  "standard_flow_enabled": true,
  "redirect_uris": ["http://localhost:3000/callback"],
  "web_origins": ["http://localhost:3000"]
}
```

**Response**:
```json
{
  "id": "client-id",
  "client_id": "my-app",
  "secret": "generated-secret",
  "name": "My Application",
  "enabled": true,
  "redirect_uris": ["http://localhost:3000/callback"],
  "web_origins": ["http://localhost:3000"]
}
```

---

## 📊 14.8 Event Logging Endpoints

### List User Events

```bash
GET /auth/v1/events?user_id=:userId&page=0&limit=20
Authorization: Bearer <admin-token>
```

### List Admin Events

```bash
GET /auth/v1/admin-events?realm_id=master&page=0&limit=20
Authorization: Bearer <admin-token>
```

---

## 🔐 14.9 Identity Provider Endpoints

### List Identity Providers

```bash
GET /auth/v1/identity-providers?realm_id=master
Authorization: Bearer <admin-token>
```

### Create Identity Provider

```bash
POST /auth/v1/identity-providers
Authorization: Bearer <admin-token>
```

**Request**:
```json
{
  "provider_alias": "google",
  "provider_id": "google",
  "enabled": true,
  "trust_email": true,
  "config": {
    "clientId": "your-client-id",
    "clientSecret": "your-client-secret"
  }
}
```

### Initiate Social Login

```bash
GET /auth/v1/identity-providers/:providerAlias/login?redirect_uri=:redirectUri
```

---

## ❌ 14.10 Error Responses

### Standard Error Format

```json
{
  "statusCode": 400,
  "message": "Error description",
  "error": "Bad Request"
}
```

### Common Error Codes

| Status | Code | Description |
|--------|------|-------------|
| 400 | BAD_REQUEST | Invalid request data |
| 401 | UNAUTHORIZED | Invalid or missing token |
| 403 | FORBIDDEN | Insufficient permissions |
| 404 | NOT_FOUND | Resource not found |
| 409 | CONFLICT | Resource already exists |
| 422 | UNPROCESSABLE_ENTITY | Validation error |
| 500 | INTERNAL_SERVER_ERROR | Server error |

### Error Examples

**401 Unauthorized**:
```json
{
  "statusCode": 401,
  "message": "Invalid credentials",
  "error": "Unauthorized"
}
```

**409 Conflict**:
```json
{
  "statusCode": 409,
  "message": "User with this email already exists",
  "error": "Conflict"
}
```

**422 Validation Error**:
```json
{
  "statusCode": 422,
  "message": "Validation failed",
  "error": "Unprocessable Entity",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    },
    {
      "field": "password",
      "message": "Password must be at least 8 characters"
    }
  ]
}
```

---

## 🔧 14.11 Best Practices

### Security

1. **Always use HTTPS in production**
2. **Never log sensitive data** (passwords, tokens)
3. **Validate all input** with DTOs
4. **Use short-lived access tokens** (1 hour)
5. **Implement rate limiting** for public endpoints

### Client Usage

1. **Store access token in memory**
2. **Store refresh token securely** (HttpOnly cookie or secure storage)
3. **Implement token refresh** automatically
4. **Handle 401 errors** by refreshing tokens
5. **Clear tokens on logout**

### API Design

1. **Use snake_case for API properties**
2. **Provide consistent error responses**
3. **Include pagination metadata** for list endpoints
4. **Use appropriate HTTP methods** (GET, POST, PATCH, DELETE)
5. **Version your API** (currently v1)

---

## 📝 14.12 Example: Complete Auth Flow

```typescript
// 1. Sign up
const signupResponse = await fetch('/auth/signup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'SecurePass123!',
    first_name: 'John',
    last_name: 'Doe',
  }),
});

// 2. Sign in
const signinResponse = await fetch('/auth/signin', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'SecurePass123!',
  }),
});

const { access_token, refresh_token } = await signinResponse.json();

// 3. Access protected endpoint
const profileResponse = await fetch('/auth/profile', {
  headers: {
    'Authorization': `Bearer ${access_token}`,
  },
});

// 4. Refresh token when expired
if (profileResponse.status === 401) {
  const refreshResponse = await fetch('/auth/refresh', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken: refresh_token }),
  });

  const newTokens = await refreshResponse.json();
  // Retry original request with new token
}

// 5. Logout
await fetch('/auth/logout', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ refreshToken: refresh_token }),
});
```

---

## ❓ FAQ

### Q1: How to handle token expiration gracefully?

**A**: Implement Axios interceptor:
```typescript
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const newToken = await refreshAccessToken();
      error.config.headers['Authorization'] = `Bearer ${newToken}`;
      return axios(error.config);
    }
    return Promise.reject(error);
  }
);
```

### Q2: How to implement retry logic?

**A**: Use exponential backoff:
```typescript
async function retryRequest(fn, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
    }
  }
}
```

---

## 🎯 Summary

### Key Endpoints

| Category | Endpoints |
|----------|-----------|
| Authentication | `/signup`, `/signin`, `/refresh`, `/logout`, `/profile` |
| Users | `/users` (CRUD) |
| Realms | `/realms` (CRUD) |
| Roles | `/roles` (CRUD) |
| Groups | `/groups` (CRUD) |
| Clients | `/clients` (CRUD) |
| Events | `/events`, `/admin-events` |
| IdPs | `/identity-providers` |

### Status Codes

- **200**: Success
- **201**: Created
- **204**: No content
- **400**: Bad request
- **401**: Unauthorized
- **403**: Forbidden
- **404**: Not found
- **409**: Conflict
- **500**: Server error

---

## 🎓 Congratulations!

You've completed the Auth Service documentation!

**What you've learned**:
- ✅ Architecture & design patterns
- ✅ JWT authentication flow
- ✅ User, Role, Group management
- ✅ Multi-tenant Realms
- ✅ OAuth/OIDC clients
- ✅ Session management
- ✅ Event logging
- ✅ Social login integration
- ✅ Complete API reference

**Next steps**:
1. Explore the codebase
2. Run the examples
3. Build your integration
4. Contribute to the project

---

**Document Version**: 1.0.0
**Last Updated**: 2025-03-18
