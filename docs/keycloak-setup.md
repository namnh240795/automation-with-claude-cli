# Keycloak Setup Guide

This guide explains how to set up and configure Keycloak for local development and production.

## Overview

Keycloak is used as the centralized identity provider for this monorepo, providing:
- OIDC authentication flow
- Social login (Google, GitHub, Facebook)
- Role-based access control (RBAC)
- Single Sign-On (SSO) across services

## Prerequisites

- Docker and Docker Compose installed
- Node.js and pnpm installed
- PostgreSQL (via Docker Compose)

## Quick Start

### 1. Start Services

```bash
# Start PostgreSQL and Keycloak
docker-compose -f docker/docker-compose.yml up -d

# Verify services are running
docker-compose -f docker/docker-compose.yml ps
```

### 2. Access Keycloak Admin Console

- **URL:** http://localhost:8080
- **Admin Console:** http://localhost:8080/admin
- **Default Credentials:**
  - Username: `admin`
  - Password: `admin_change_this`

⚠️ **IMPORTANT:** Change the default admin password immediately after first login!

### 3. Create Realm

1. Log in to the admin console
2. Hover over the dropdown in the top-left corner (default: "master")
3. Click "Create Realm"
4. Enter realm name: `app-realm`
5. Click "Create"

### 4. Create Client

1. Navigate to: **Clients** → **Create Client**
2. Configure the client:
   - **Client type:** OpenID Connect
   - **Client ID:** `app-client`
   - Click **Next**
3. Configure client authentication:
   - **Client authentication:** ON
   - **Authorization:** OFF (for now)
   - Click **Next**
4. Login settings:
   - **Valid redirect URIs:**
     - `http://localhost:3000/*`
     - `http://localhost:3001/*`
   - **Valid post logout redirect URIs:**
     - `http://localhost:3000`
     - `http://localhost:3001`
   - **Web origins:**
     - `http://localhost:3000`
     - `http://localhost:3001`
   - Click **Save**

### 5. Get Client Secret

1. Go to **Clients** → **app-client** → **Credentials** tab
2. Copy the **Client secret** value
3. Update `.env.keycloak`:
   ```bash
   KEYCLOAK_CLIENT_SECRET=<copied-secret>
   ```

### 6. Configure Roles

1. Navigate to: **Realm Roles** → **Create Role**
2. Create standard roles:
   - `admin` - Full system access
   - `user` - Standard user access
   - `moderator` - Content moderation access

### 7. Create Test User (Optional)

1. Navigate to: **Users** → **Add User**
2. Enter user details:
   - **Username:** `testuser`
   - **Email:** `test@example.com`
   - **Email verified:** ON
   - Click **Create**
3. Set password:
   - Go to **Credentials** tab
   - Set password: `testpass123`
   - **Temporary:** OFF
   - Click **Set Password**
4. Assign roles:
   - Go to **Role mapping** tab
   - Add **user** role

## Environment Variables

Copy `.env.keycloak` to your service's `.env` file:

```bash
# For API service (apps/api)
cat .env.keycloak >> apps/api/.env

# For Auth service (apps/auth)
cat .env.keycloak >> apps/auth/.env
```

Key variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `KEYCLOAK_SERVER_URL` | Keycloak server URL | `http://localhost:8080` |
| `KEYCLOAK_REALM` | Realm name | `app-realm` |
| `KEYCLOAK_CLIENT_ID` | OIDC client ID | `app-client` |
| `KEYCLOAK_CLIENT_SECRET` | OIDC client secret | (from Keycloak admin console) |
| `KEYCLOAK_ADMIN_USER` | Admin username | `admin` |
| `KEYCLOAK_ADMIN_PASSWORD` | Admin password | (your secure password) |
| `KEYCLOAK_ISSUER` | Token issuer URL | `http://localhost:8080/realms/app-realm` |

## Social Login Configuration

### Google OAuth2

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new OAuth 2.0 client ID
3. Add authorized redirect URIs:
   - `http://localhost:8080/realms/app-realm/broker/google/endpoint`
4. Copy Client ID and Client Secret

In Keycloak:
1. Navigate to: **Identity Providers** → **Add provider** → **Google**
2. Enter your Google credentials
3. Set **Redirect URI** to the value shown in Keycloak

### GitHub OAuth2

1. Go to GitHub → **Settings** → **Developer settings** → **OAuth Apps**
2. Create a new OAuth App
3. Set Authorization callback URL:
   - `http://localhost:8080/realms/app-realm/broker/github/endpoint`
4. Copy Client ID and generate Client Secret

In Keycloak:
1. Navigate to: **Identity Providers** → **Add provider** → **GitHub**
2. Enter your GitHub credentials

### Facebook OAuth2

1. Go to [Meta for Developers](https://developers.facebook.com/)
2. Create a new App
3. Add **Facebook Login** product
4. Set Valid OAuth Redirect URIs:
   - `http://localhost:8080/realms/app-realm/broker/facebook/endpoint`
5. Copy App ID and App Secret

In Keycloak:
1. Navigate to: **Identity Providers** → **Add provider** → **Facebook**
2. Enter your Facebook credentials

## Verify Setup

### Test Health Endpoint

```bash
curl http://localhost:8080/health/ready
```

Expected response:
```json
{"status":"UP"}
```

### Test Realm Discovery

```bash
curl http://localhost:8080/realms/app-realm/.well-known/openid-configuration
```

Expected response: JSON with OIDC configuration endpoints

### Get Public Key (for JWT verification)

```bash
curl http://localhost:8080/realms/app-realm/protocol/openid-connect/certs
```

## Docker Commands

```bash
# View logs
docker-compose -f docker/docker-compose.yml logs -f keycloak

# Restart Keycloak
docker-compose -f docker/docker-compose.yml restart keycloak

# Stop all services
docker-compose -f docker/docker-compose.yml down

# Remove volumes (⚠️ deletes all data)
docker-compose -f docker/docker-compose.yml down -v
```

## Production Considerations

1. **HTTPS:** Enable HTTPS in production
   - Set `KC_HTTP_ENABLED=false`
   - Configure SSL certificates

2. **Database:** Use managed PostgreSQL
   - Set `KC_DB_URL` to production database
   - Use strong passwords

3. **Admin Credentials:** Change defaults
   - Set secure `KEYCLOAK_ADMIN_PASSWORD`
   - Use secrets management (e.g., AWS Secrets Manager)

4. **Hostname:** Configure proper hostname
   - Set `KC_HOSTNAME_STRICT=true`
   - Set `KC_HOSTNAME=<your-domain>`

5. **Caching:** Configure production cache
   - Set up Redis or infinispan for distributed caching

## Troubleshooting

### Keycloak won't start

```bash
# Check logs
docker-compose -f docker/docker-compose.yml logs keycloak

# Verify PostgreSQL is ready
docker-compose -f docker/docker-compose.yml ps
```

### Database connection errors

- Ensure PostgreSQL container is healthy
- Verify `KC_DB_URL` matches PostgreSQL service name
- Check database credentials match `init-postgres.sh`

### Cannot access admin console

- Verify port 8080 is not in use: `lsof -i :8080`
- Check Keycloak health: `curl http://localhost:8080/health/ready`

## Next Steps

After setting up Keycloak:

1. **Issue #3:** Implement Keycloak Authentication Flow
2. **Issue #4:** Add Social Login Providers
3. **Issue #5:** Migrate API Service to Keycloak
4. **Issue #6:** Update Shared Libraries for Keycloak
5. **Issue #7:** Remove Legacy JWT Code
6. **Issue #8:** Add Role-Based Access Control

## References

- [Keycloak Documentation](https://www.keycloak.org/documentation)
- [OIDC with Keycloak](https://www.keycloak.org/docs/latest/securing_apps/)
- [Docker Image Reference](https://hub.docker.com/r/quay.io/keycloak/keycloak)
