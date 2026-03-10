# Deployment Guide

This guide covers deploying your custom Keycloak theme to various environments.

## Quick Start

```bash
# Build everything
pnpm build:production

# The theme will be in:
# - dist-theme/custom/ (for copy deployment)
# - dist-jar/keycloak-custom-theme.jar (for provider deployment)
```

## Development Deployment

### 1. Copy to Keycloak Themes Directory

```bash
# Copy the theme directory
cp -r dist-theme/custom /path/to/keycloak/themes/

# Verify the structure
ls /path/to/keycloak/themes/custom/
# Should show: login/, account/
```

### 2. Start Keycloak with Caching Disabled

```bash
# For development, disable theme caching for hot reload
bin/kc.sh start \
  --spi-theme--static-max-age=-1 \
  --spi-theme--cache-themes=false \
  --spi-theme--cache-templates=false
```

### 3. Configure in Admin Console

1. Go to http://localhost:8080/admin
2. Select your realm
3. Navigate to **Realm Settings** → **Themes**
4. Set **Login Theme** to `custom`
5. Click **Save**
6. Navigate to your login page to see changes

## Production Deployment

### Option 1: JAR Provider (Recommended)

#### 1. Build the JAR

```bash
pnpm build:production

# Or build just the JAR
pnpm build:jar
```

#### 2. Deploy to Keycloak

```bash
# Copy JAR to providers directory
cp dist-jar/keycloak-custom-theme.jar /path/to/keycloak/providers/

# Restart Keycloak
/path/to/keycloak/bin/kc.sh restart
```

#### 3. Configure in Admin Console

Same as development deployment above.

### Option 2: Directory Copy

```bash
# Copy theme directory
cp -r dist-theme/custom /path/to/keycloak/themes/

# Set proper permissions
chmod -R 755 /path/to/keycloak/themes/custom

# Restart Keycloak
/path/to/keycloak/bin/kc.sh restart
```

## Docker Deployment

### Using Docker Compose

```yaml
version: '3.8'

services:
  keycloak:
    image: quay.io/keycloak/keycloak:26.0
    environment:
      KEYCLOAK_ADMIN: admin
      KEYCLOAK_ADMIN_PASSWORD: admin
    ports:
      - "8080:8080"
    volumes:
      - ./dist-theme/custom:/opt/keycloak/themes/custom:ro
    command: start-dev
```

### Using Custom Docker Image

```dockerfile
FROM quay.io/keycloak/keycloak:26.0

# Copy custom theme
COPY dist-theme/custom /opt/keycloak/themes/custom

# Optional: Copy JAR provider
COPY dist-jar/keycloak-custom-theme.jar /opt/keycloak/providers/

ENV KC_HEALTH_ENABLED=true
ENV KC_METRICS_ENABLED=true

CMD ["start-dev"]
```

## Kubernetes Deployment

### ConfigMap Approach

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: keycloak-custom-theme
data:
  # Add your theme files here
  login.ftl: |
    <#import "template.ftl" as layout>
    ...
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: keycloak
spec:
  template:
    spec:
      containers:
      - name: keycloak
        image: quay.io/keycloak/keycloak:26.0
        volumeMounts:
        - name: theme
          mountPath: /opt/keycloak/themes/custom
      volumes:
      - name: theme
        configMap:
          name: keycloak-custom-theme
```

### Using Init Container

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: keycloak
spec:
  template:
    spec:
      initContainers:
      - name: theme-setup
        image: busybox
        command: ['sh', '-c', 'cp -r /theme/* /keycloak/themes/']
        volumeMounts:
        - name: theme
          mountPath: /theme
        - name: keycloak-theme
          mountPath: /keycloak/themes
      containers:
      - name: keycloak
        image: quay.io/keycloak/keycloak:26.0
        volumeMounts:
        - name: keycloak-theme
          mountPath: /opt/keycloak/themes/custom
      volumes:
      - name: theme
        persistentVolumeClaim:
          claimName: theme-pvc
      - name: keycloak-theme
        emptyDir: {}
```

## Verification

### Check Theme is Loaded

```bash
# Check Keycloak logs
tail -f /path/to/keycloak/data/log/keycloak.log

# Look for theme registration messages
grep "theme" /path/to/keycloak/data/log/keycloak.log
```

### Test in Browser

1. Navigate to your realm's login page
2. Verify custom styles are applied
3. Check browser console for errors
4. Test all user flows

## Troubleshooting

### Theme Not Showing

1. **Clear Keycloak cache**
   ```bash
   rm -rf /path/to/keycloak/data/tmp/kc-gzip-cache
   /path/to/keycloak/bin/kc.sh restart
   ```

2. **Check file permissions**
   ```bash
   ls -la /path/to/keycloak/themes/custom/
   chmod -R 755 /path/to/keycloak/themes/custom/
   ```

3. **Verify theme structure**
   ```bash
   find /path/to/keycloak/themes/custom/ -type f
   ```

4. **Check Keycloak logs**
   ```bash
   tail -100 /path/to/keycloak/data/log/keycloak.log | grep -i theme
   ```

### Styles Not Applying

1. **Verify CSS is being loaded**
   - Open browser DevTools
   - Check Network tab for CSS files
   - Verify paths are correct

2. **Clear browser cache**
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
   - Or clear cache in DevTools

3. **Check theme.properties**
   ```properties
   styles=css/login.css
   ```

### Templates Not Found

1. **Check file extensions**
   - Templates must end in `.ftl`
   - HTML files are not recognized

2. **Verify template names**
   - Login templates must be in `login/` directory
   - Account templates must be in `account/` directory

## Performance Optimization

### Enable Caching in Production

```bash
# Start with caching enabled
bin/kc.sh start
```

### Use CDN for Assets

1. Upload `resources/css/` and `resources/js/` to CDN
2. Update `theme.properties`:
   ```properties
   styles=https://cdn.example.com/css/login.css
   scripts=https://cdn.example.com/js/app.js
   ```

### Minify Assets

1. Build with minification
2. Use Gzip compression
3. Enable HTTP/2 in Keycloak

## Updating Theme

### Development

```bash
# Make changes to React components
pnpm build:theme

# Refresh browser - changes should appear immediately
```

### Production

```bash
# Build and deploy
pnpm build:production

# Copy to server
scp dist-jar/keycloak-custom-theme.jar user@server:/path/to/keycloak/providers/

# Restart Keycloak
ssh user@server "/path/to/keycloak/bin/kc.sh restart"
```

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Build and Deploy Theme

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8

      - name: Install dependencies
        run: pnpm install

      - name: Build theme
        run: pnpm build:production

      - name: Upload artifact
        uses: actions/upload-artifact@v3
        with:
          name: keycloak-theme
          path: dist-jar/keycloak-custom-theme.jar

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Download artifact
        uses: actions/download-artifact@v3
        with:
          name: keycloak-theme

      - name: Deploy to server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            mkdir -p /opt/keycloak/providers
            cp keycloak-custom-theme.jar /opt/keycloak/providers/
            systemctl restart keycloak
```

## Monitoring

### Check Theme Usage

```bash
# Monitor theme access
tail -f /path/to/keycloak/data/log/keycloak.log | grep "custom"
```

### Performance Monitoring

1. Monitor page load times
2. Check asset delivery speed
3. Monitor CSS/JS file sizes
4. Track error rates

## Backup and Recovery

### Backup Custom Theme

```bash
# Create backup
tar -czf keycloak-theme-backup-$(date +%Y%m%d).tar.gz dist-theme/custom/

# Store in safe location
cp keycloak-theme-backup-*.tar.gz /backup/location/
```

### Restore from Backup

```bash
# Extract backup
tar -xzf keycloak-theme-backup-YYYYMMDD.tar.gz -C /path/to/keycloak/themes/

# Restart Keycloak
/path/to/keycloak/bin/kc.sh restart
```

## Security Considerations

1. **Don't expose sensitive data** in templates
2. **Use HTTPS** for all resources
3. **Validate all user inputs** in forms
4. **Keep theme updated** with security patches
5. **Review theme code** before deployment
6. **Use CSP headers** to prevent XSS attacks

## Support

For issues:
1. Check Keycloak logs
2. Verify theme structure
3. Test with default theme
4. Review Keycloak documentation
5. Check community forums
