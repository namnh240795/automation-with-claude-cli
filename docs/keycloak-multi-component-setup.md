# Keycloak Multi-Component Realm Setup Guide

This guide provides step-by-step instructions for setting up Keycloak with a single realm and multiple clients for a multi-component application architecture.

## Architecture Overview

```
Keycloak Realm: app-realm
├── Clients:
│   ├── frontend-client (User-facing app - public)
│   ├── cms-client (Content Management System - confidential)
│   └── admin-client (Administrator panel - confidential)
├── Realm Roles:
│   ├── super_admin (Full system access)
│   ├── admin (Admin panel access)
│   ├── cms_admin (Manage CMS settings)
│   ├── cms_publisher (Publish content)
│   ├── cms_editor (Create/edit content)
│   ├── premium_user (Premium features)
│   └── user (Standard user - default)
├── Client Scopes:
│   ├── profile:read
│   ├── profile:write
│   ├── content:view
│   ├── content:premium
│   ├── cms:content:read
│   ├── cms:content:write
│   ├── cms:content:publish
│   ├── cms:media:manage
│   ├── cms:users:manage
│   ├── cms:analytics:view
│   ├── admin:users:read
│   ├── admin:users:write
│   ├── admin:system:read
│   ├── admin:system:write
│   └── admin:logs:view
└── Groups (Optional):
    ├── administrators (super_admin, admin)
    ├── cms_admins (cms_admin, cms_publisher)
    ├── cms_editors (cms_editor, user)
    ├── premium_users (premium_user, user)
    └── end_users (user)
```

## Prerequisites

- Docker and Docker Compose installed
- Access to Keycloak Admin Console (http://localhost:8080/admin)
- Admin credentials (default: admin/admin_change_this)

## Step 1: Start Keycloak

```bash
# Start PostgreSQL and Keycloak
docker-compose -f docker/docker-compose.yml up -d

# Verify Keycloak is running
curl http://localhost:8080/health/ready
```

## Step 2: Create Realm

1. Log in to Keycloak Admin Console
2. Hover over the dropdown in the top-left corner (default: "master")
3. Click **"Create Realm"**
4. Enter realm name: `app-realm`
5. Click **"Create"**

### Configure Realm Settings

1. Navigate to **Realm Settings** → **Login**
2. Configure:
   - **User registration**: ON (allow users to self-register)
   - **Forgot password**: ON
   - **Remember me**: ON
3. Click **"Save"**

## Step 3: Create Clients

### 3.1 Create Frontend Client

1. Navigate to **Clients** → **Create Client**
2. Configure client:
   - **Client type**: OpenID Connect
   - **Client ID**: `frontend-client`
   - Click **"Next"**
3. Configure client authentication:
   - **Client authentication**: OFF (public client for SPA)
   - **Authorization**: OFF
   - Click **"Next"**
4. Login settings:
   - **Valid redirect URIs**:
     - `http://localhost:3000/*`
     - `https://app.yourdomain.com/*`
   - **Valid post logout redirect URIs**:
     - `http://localhost:3000`
     - `https://app.yourdomain.com`
   - **Web origins**:
     - `http://localhost:3000`
     - `https://app.yourdomain.com`
   - Click **"Save"**

### 3.2 Create CMS Client

1. Navigate to **Clients** → **Create Client**
2. Configure client:
   - **Client type**: OpenID Connect
   - **Client ID**: `cms-client`
   - Click **"Next"**
3. Configure client authentication:
   - **Client authentication**: ON (confidential client)
   - **Authorization**: OFF
   - Click **"Next"**
4. Login settings:
   - **Valid redirect URIs**:
     - `http://localhost:3001/*`
     - `https://cms.yourdomain.com/*`
   - **Valid post logout redirect URIs**:
     - `http://localhost:3001`
     - `https://cms.yourdomain.com`
   - **Web origins**:
     - `http://localhost:3001`
     - `https://cms.yourdomain.com`
   - Click **"Save"**
5. **Get Client Secret**:
   - Go to **Clients** → **cms-client** → **Credentials** tab
   - Copy the **Client secret** value
   - Update `.env.cms` with this secret

### 3.3 Create Admin Client

1. Navigate to **Clients** → **Create Client**
2. Configure client:
   - **Client type**: OpenID Connect
   - **Client ID**: `admin-client`
   - Click **"Next"**
3. Configure client authentication:
   - **Client authentication**: ON (confidential client)
   - **Authorization**: OFF
   - Click **"Next"**
4. Login settings:
   - **Valid redirect URIs**:
     - `http://localhost:3002/*`
     - `https://admin.yourdomain.com/*`
   - **Valid post logout redirect URIs**:
     - `http://localhost:3002`
     - `https://admin.yourdomain.com`
   - **Web origins**:
     - `http://localhost:3002`
     - `https://admin.yourdomain.com`
   - Click **"Save"**
5. **Get Client Secret**:
   - Go to **Clients** → **admin-client** → **Credentials** tab
   - Copy the **Client secret** value
   - Update `.env.admin` with this secret

## Step 4: Create Realm Roles

1. Navigate to **Realm Roles** → **Create Role**
2. Create the following roles:

### System-Wide Roles

| Role Name | Description |
|-----------|-------------|
| `super_admin` | Full system access (can access all components) |
| `admin` | Admin panel access |
| `user` | Standard frontend user (default role) |
| `premium_user` | Premium frontend features |

### CMS-Specific Roles

| Role Name | Description |
|-----------|-------------|
| `cms_admin` | Manage CMS settings and users |
| `cms_publisher` | Review/publish content (includes editor permissions) |
| `cms_editor` | Create/edit content (cannot publish) |

### Assign Default Role

1. Navigate to **Realm Settings** → **Login**
2. Find **"Default Role"** dropdown
3. Select `user` role
4. Click **"Save"**

## Step 5: Create Client Scopes

### 5.1 Create Profile Scopes

1. Navigate to **Client Scopes** → **Create Client Scope**
2. Create profile scopes:

**Scope 1: profile:read**
- **Name**: `profile:read`
- **Type**: Default
- **Protocol**: openid-connect
- Click **"Save"**

Add a **Mapper** (optional):
- Navigate to **Add Mapper** → **User Attribute**
- **Name**: `profile.read`
- **User Attribute**: `profile.read`
- **Token Claim Name**: `profile_read`
- **Claim JSON Type**: String
- Click **"Save"**

**Scope 2: profile:write**
- **Name**: `profile:write`
- **Type**: Optional
- **Protocol**: openid-connect
- Click **"Save"**

### 5.2 Create Content Scopes

**Scope 3: content:view**
- **Name**: `content:view`
- **Type**: Default
- Click **"Save"**

**Scope 4: content:premium**
- **Name**: `content:premium`
- **Type**: Optional
- Click **"Save"**

### 5.3 Create CMS Scopes

**Scope 5: cms:content:read**
- **Name**: `cms:content:read`
- **Type**: Optional
- Click **"Save"**

**Scope 6: cms:content:write**
- **Name**: `cms:content:write`
- **Type**: Optional
- Click **"Save"**

**Scope 7: cms:content:publish**
- **Name**: `cms:content:publish`
- **Type**: Optional
- Click **"Save"**

**Scope 8: cms:media:manage**
- **Name**: `cms:media:manage`
- **Type**: Optional
- Click **"Save"**

**Scope 9: cms:users:manage**
- **Name**: `cms:users:manage`
- **Type**: Optional
- Click **"Save"**

**Scope 10: cms:analytics:view**
- **Name**: `cms:analytics:view`
- **Type**: Optional
- Click **"Save"**

### 5.4 Create Admin Scopes

**Scope 11: admin:users:read**
- **Name**: `admin:users:read`
- **Type**: Optional
- Click **"Save"**

**Scope 12: admin:users:write**
- **Name**: `admin:users:write`
- **Type**: Optional
- Click **"Save"**

**Scope 13: admin:system:read**
- **Name**: `admin:system:read`
- **Type**: Optional
- Click **"Save"**

**Scope 14: admin:system:write**
- **Name**: `admin:system:write`
- **Type**: Optional
- Click **"Save"**

**Scope 15: admin:logs:view**
- **Name**: `admin:logs:view`
- **Type**: Optional
- Click **"Save"**

## Step 6: Assign Scopes to Clients

### 6.1 Assign Scopes to Frontend Client

1. Go to **Clients** → **frontend-client** → **Client Scopes** tab
2. Click **"Add client scope"** → select from **"Default client scopes"**:
   - `profile:read`
   - `profile:write`
   - `content:view`
   - `content:premium`
3. Click **"Add"** for each scope
4. Click **"Add client scope"** → select from **"Optional client scopes"**:
   - Add the same scopes as optional as well

### 6.2 Assign Scopes to CMS Client

1. Go to **Clients** → **cms-client** → **Client Scopes** tab
2. Click **"Add client scope"** → select from **"Default client scopes"**:
   - `profile:read`
   - `cms:content:read`
3. Click **"Add client scope"** → select from **"Optional client scopes"**:
   - `cms:content:write`
   - `cms:content:publish`
   - `cms:media:manage`
   - `cms:users:manage`
   - `cms:analytics:view`

### 6.3 Assign Scopes to Admin Client

1. Go to **Clients** → **admin-client** → **Client Scopes** tab
2. Click **"Add client scope"** → select from **"Default client scopes"**:
   - `profile:read`
   - `admin:system:read`
3. Click **"Add client scope"** → select from **"Optional client scopes"**:
   - `admin:users:read`
   - `admin:users:write`
   - `admin:system:write`
   - `admin:logs:view`

## Step 7: Create Groups (Optional)

Groups simplify role assignment by combining multiple roles.

1. Navigate to **Groups** → **Create Group**

### Group 1: administrators

1. Create group `administrators`
2. Go to **Role mapping** tab
3. Assign roles: `super_admin`, `admin`

### Group 2: cms_admins

1. Create group `cms_admins`
2. Assign roles: `cms_admin`, `cms_publisher`, `cms_editor`

### Group 3: cms_editors

1. Create group `cms_editors`
2. Assign roles: `cms_editor`, `user`

### Group 4: premium_users

1. Create group `premium_users`
2. Assign roles: `premium_user`, `user`

### Group 5: end_users

1. Create group `end_users`
2. Assign role: `user`

## Step 8: Create Test Users

### Test User 1: Regular User

1. Navigate to **Users** → **Add User**
2. Enter:
   - **Username**: `testuser`
   - **Email**: `testuser@example.com`
   - **Email verified**: ON
   - **First name**: Test
   - **Last name**: User
3. Click **"Create"**
4. Go to **Credentials** tab
5. Set password: `testpass123`
6. **Temporary**: OFF
7. Click **"Set Password"**
8. Go to **Role mapping** tab
9. Assign **"user"** role

### Test User 2: Premium User

1. Create user:
   - **Username**: `premiumuser`
   - **Email**: `premiumuser@example.com`
2. Set password: `testpass123`
3. Assign roles: `user`, `premium_user`

### Test User 3: CMS Editor

1. Create user:
   - **Username**: `cmseditor`
   - **Email**: `cmseditor@example.com`
2. Set password: `testpass123`
3. Assign roles: `user`, `cms_editor`

### Test User 4: CMS Publisher

1. Create user:
   - **Username**: `cmspublisher`
   - **Email**: `cmspublisher@example.com`
2. Set password: `testpass123`
3. Assign roles: `user`, `cms_publisher`, `cms_editor`

### Test User 5: Admin

1. Create user:
   - **Username**: `admin`
   - **Email**: `admin@example.com`
2. Set password: `adminpass123`
3. Assign roles: `admin`, `user`

### Test User 6: Super Admin

1. Create user:
   - **Username**: `superadmin`
   - **Email**: `superadmin@example.com`
2. Set password: `superadmin123`
3. Assign roles: `super_admin`, `admin`, `user`

## Step 9: Configure Fine-Grained Authorization (Optional)

For more advanced authorization using Keycloak Authorization Services:

### 9.1 Enable Authorization

1. Go to **Clients** → **cms-client** → **Settings** tab
2. Find **"Authorization"** setting
3. Turn **ON**
4. Click **"Save"**

### 9.2 Create Resources

1. Go to **Authorization** → **Resources** → **Create resource**
2. Create resources:

**Resource 1: cms_content**
- **Name**: `cms_content`
- **Type**: (optional)
- **Scopes**: view, create, edit, delete, publish
- Click **"Save"**

**Resource 2: cms_media**
- **Name**: `cms_media`
- **Scopes**: view, upload, delete

**Resource 3: cms_users**
- **Name**: `cms_users`
- **Scopes**: view, manage

### 9.3 Create Policies

**Policy 1: editor_policy**
- **Type**: Role-based
- **Roles**: cms_editor
- **Resources**: cms_content
- **Scopes**: view, create, edit

**Policy 2: publisher_policy**
- **Type**: Role-based
- **Roles**: cms_publisher
- **Resources**: cms_content
- **Scopes**: view, create, edit, publish

**Policy 3: admin_policy**
- **Type**: Role-based
- **Roles**: cms_admin, super_admin
- **Resources**: All resources
- **Scopes**: All scopes

### 9.4 Create Permissions

Link policies to resources:

**Permission 1: cms_content_view**
- **Resource**: cms_content
- **Scopes**: view
- **Policies**: editor_policy, publisher_policy, admin_policy

**Permission 2: cms_content_publish**
- **Resource**: cms_content
- **Scopes**: publish
- **Policies**: publisher_policy, admin_policy

## Step 10: Verify Setup

### Test Realm Discovery

```bash
curl http://localhost:8080/realms/app-realm/.well-known/openid-configuration
```

Expected response: JSON with OIDC configuration endpoints

### Test User Login

1. Navigate to **http://localhost:8080/realms/app-realm/account**
2. Login with test user: `testuser` / `testpass123`
3. Verify access to user profile

### Test Token Structure

1. Use the **Client Credentials** flow or **Resource Owner** flow to get a token
2. Decode the JWT at https://jwt.io
3. Verify token contains:
   - `realm_access.roles` array
   - `resource_access` object with client roles
   - Standard OIDC claims (sub, email, name, etc.)

Example decoded token:
```json
{
  "sub": "user-uuid",
  "email": "testuser@example.com",
  "email_verified": true,
  "preferred_username": "testuser",
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
  "client_id": "frontend-client",
  "exp": 1705310400,
  "iat": 1705310000
}
```

## Step 11: Update Environment Files

### Frontend (.env.frontend)

```bash
KEYCLOAK_SERVER_URL=http://localhost:8080
KEYCLOAK_REALM=app-realm
KEYCLOAK_CLIENT_ID=frontend-client
KEYCLOAK_CALLBACK_URL=http://localhost:3000/auth/callback
```

### CMS (.env.cms)

```bash
KEYCLOAK_SERVER_URL=http://localhost:8080
KEYCLOAK_REALM=app-realm
KEYCLOAK_CLIENT_ID=cms-client
KEYCLOAK_CLIENT_SECRET=<your-cms-client-secret>
KEYCLOAK_CALLBACK_URL=http://localhost:3001/auth/callback
```

### Admin (.env.admin)

```bash
KEYCLOAK_SERVER_URL=http://localhost:8080
KEYCLOAK_REALM=app-realm
KEYCLOAK_CLIENT_ID=admin-client
KEYCLOAK_CLIENT_SECRET=<your-admin-client-secret>
KEYCLOAK_CALLBACK_URL=http://localhost:3002/auth/callback
```

## Step 12: Test SSO Across Applications

1. **Login to Frontend**:
   - Navigate to `http://localhost:3000`
   - Login with `testuser`
   - Verify successful login

2. **Access CMS**:
   - Navigate to `http://localhost:3001`
   - Should already be authenticated (SSO working)
   - Login with `cmseditor` to test CMS-specific roles

3. **Access Admin Panel**:
   - Navigate to `http://localhost:3002`
   - Should already be authenticated
   - Login with `admin` to test admin-specific roles

4. **Logout**:
   - Logout from any application
   - Verify logged out from all applications

## Production Checklist

Before deploying to production:

- [ ] Change default admin password
- [ ] Enable HTTPS (set `KC_HTTP_ENABLED=false`)
- [ ] Configure proper hostname (`KC_HOSTNAME`)
- [ ] Set strong database passwords
- [ ] Enable production cache (Redis/Infinispan)
- [ ] Configure email for password reset
- [ ] Set up backup and recovery
- [ ] Configure session timeouts
- [ ] Enable brute force protection
- [ ] Set up monitoring and alerts
- [ ] Review and audit all roles and permissions
- [ ] Remove/disable unused test accounts
- [ ] Document custom flows and integrations

## Troubleshooting

### Issue: Cannot see roles in token

**Solution**: Ensure roles are assigned to users in **Role mapping** tab

### Issue: SSO not working across applications

**Solution**: Check that all clients use the same realm and have correct redirect URIs

### Issue: CORS errors

**Solution**: Add all application origins to **Web origins** in client settings

### Issue: Client secret not working

**Solution**: Verify **Client authentication** is ON and secret is copied correctly from **Credentials** tab

## Next Steps

After completing this setup:

1. Review example controllers:
   - `docs/examples/cms-auth-example.controller.ts`
   - `docs/examples/frontend-auth-example.controller.ts`
   - `docs/examples/admin-auth-example.controller.ts`

2. Test authentication flows:
   - See `docs/keycloak-testing.md` for testing examples

3. Implement in your applications:
   - Use `@app/keycloak-integration` library
   - Apply guards and decorators as shown in examples

## References

- [Keycloak Documentation](https://www.keycloak.org/documentation)
- [OIDC with Keycloak](https://www.keycloak.org/docs/latest/securing_apps/)
- [Authorization Services Guide](https://www.keycloak.org/docs/latest/authorization_services/)
