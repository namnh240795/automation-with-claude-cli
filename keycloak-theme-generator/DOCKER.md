# Docker Compose Setup for Keycloak Custom Theme

This guide shows how to run Keycloak with your custom theme using Docker Compose.

## Prerequisites

- Docker and Docker Compose installed
- Theme already built (`pnpm build:all`)

## Quick Start

### 1. Start the services

```bash
docker-compose up -d
```

### 2. Wait for Keycloak to start

Keycloak takes about 30-60 seconds to fully start. Check the logs:

```bash
docker-compose logs -f keycloak
```

Look for this message:
```
Keycloak 26.0 started
```

### 3. Access Keycloak

- **Admin Console**: http://localhost:8080/admin
  - Username: `admin`
  - Password: `admin`

- **Realm Login**: http://localhost:8080/realms/myrealm/protocol/openid-connect/auth

## Development Workflow

### Rebuild theme after changes

1. Make changes to React components
2. Rebuild theme:
   ```bash
   pnpm build:all
   ```
3. Restart Keycloak (theme is mounted as volume, so changes are reflected):
   ```bash
   docker-compose restart keycloak
   ```

### Hot reload development

For faster development, you can run Keycloak with theme caching disabled (already configured in docker-compose.yml).

## Configuration

### Environment Variables

Edit `docker-compose.yml` to customize:

```yaml
environment:
  KEYCLOAK_ADMIN: your_admin_username
  KEYCLOAK_ADMIN_PASSWORD: your_secure_password
  KC_DB_PASSWORD: your_db_password
```

### Theme Properties

The theme is mounted as a read-only volume at `/opt/keycloak/themes/custom`.

To customize:
1. Edit theme in `vite-react-app/src/pages/`
2. Rebuild: `pnpm build:all`
3. Restart: `docker-compose restart keycloak`

## Activate Custom Theme

1. Go to http://localhost:8080/admin
2. Sign in with admin credentials
3. Create a new realm or select existing
4. Navigate to **Realm Settings** → **Themes**
5. Set **Login Theme** to `custom`
6. Click **Save**

## Test the Theme

1. Navigate to your realm's login page:
   ```
   http://localhost:8080/realms/myrealm/protocol/openid-connect/auth
   ```
2. You should see your custom theme!

## Useful Commands

### View logs
```bash
docker-compose logs -f keycloak
```

### Stop services
```bash
docker-compose down
```

### Restart Keycloak only
```bash
docker-compose restart keycloak
```

### Rebuild and restart
```bash
pnpm build:all && docker-compose restart keycloak
```

### Check health
```bash
curl http://localhost:8080/health/ready
```

### Access PostgreSQL
```bash
docker-compose exec postgres psql -U keycloak -d keycloak
```

## Troubleshooting

### Theme not showing

1. Check theme is mounted:
   ```bash
   docker-compose exec keycloak ls -la /opt/keycloak/themes/custom/
   ```

2. Check Keycloak logs:
   ```bash
   docker-compose logs keycloak
   ```

3. Verify theme is selected in Admin Console

4. Clear browser cache

### Port already in use

Edit `docker-compose.yml` to change the port:
```yaml
ports:
  - "9090:8080"  # Use port 9090 instead
```

### Database connection issues

Check PostgreSQL is healthy:
```bash
docker-compose ps
```

Restart services:
```bash
docker-compose restart
```

### Memory issues

Increase Docker memory limit:
1. Docker Desktop → Settings → Resources → Memory
2. Set to at least 4GB

## Production Deployment

For production, consider:

1. Use strong passwords (environment variables from secrets)
2. Enable HTTPS
3. Use persistent volumes for data
4. Configure proper backup strategy
5. Enable theme caching for performance
6. Use proper health checks

### Production docker-compose.yml

```yaml
version: '3.8'

services:
  keycloak:
    image: quay.io/keycloak/keycloak:26.0
    environment:
      KEYCLOAK_ADMIN: ${KEYCLOAK_ADMIN}
      KEYCLOAK_ADMIN_PASSWORD: ${KEYCLOAK_ADMIN_PASSWORD}
      KC_DB: postgres
      KC_DB_URL: ${KC_DB_URL}
      KC_DB_USERNAME: ${KC_DB_USERNAME}
      KC_DB_PASSWORD: ${KC_DB_PASSWORD}
      KC_HOSTNAME: your-domain.com
      KC_HTTP_ENABLED: "false"
      KC_HOSTNAME_STRICT: "true"
      KC_HOSTNAME_STRICT_HTTPS: "true"
    ports:
      - "8443:8443"
    volumes:
      - ./dist-jar/keycloak-custom-theme.jar:/opt/keycloak/providers/keycloak-custom-theme.jar:ro
      - keycloak_data:/opt/keycloak/data
```

## Cleanup

Remove all containers and volumes:
```bash
docker-compose down -v
```

## Next Steps

- Customize the theme to match your brand
- Add your logo and branding
- Test all user flows
- Deploy to production
