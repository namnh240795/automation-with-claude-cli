# Quick Start Guide

Get your custom Keycloak theme up and running in 5 minutes!

## Prerequisites

- Node.js 18+ and pnpm
- A Keycloak instance (26+)

## 1. Install Dependencies

```bash
cd keycloak-theme-generator/vite-react-app
pnpm install
```

## 2. Start Development Server

```bash
pnpm dev
```

Open `http://localhost:5173` in your browser.

## 3. Build Theme

```bash
# Build React app and generate Keycloak theme
pnpm build:all
```

## 4. Deploy to Keycloak

### Quick Deploy (Development)

```bash
# Copy theme to Keycloak
cp -r dist-theme/custom /path/to/keycloak/themes/

# Start Keycloak with caching disabled
cd /path/to/keycloak
bin/kc.sh start --spi-theme--static-max-age=-1 --spi-theme--cache-themes=false --spi-theme--cache-templates=false
```

### Production Deploy

```bash
# Build JAR archive
pnpm build:production

# Deploy JAR to Keycloak
cp dist-jar/keycloak-custom-theme.jar /path/to/keycloak/providers/

# Restart Keycloak
/path/to/keycloak/bin/kc.sh restart
```

## 5. Activate Theme

1. Open Keycloak Admin Console: `http://localhost:8080/admin`
2. Sign in with admin credentials
3. Select your realm from the dropdown
4. Go to **Realm Settings** → **Themes**
5. Set **Login Theme** to `custom`
6. Click **Save**

## 6. Test

Open your realm's login page:
```
http://localhost:8080/realms/your-realm/protocol/openid-connect/auth
```

You should see your custom theme!

## Customize Your Theme

### Change Colors

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: 'hsl(221.2 83.2% 53.3%)', // Change this
      },
    },
  },
}
```

### Add Components

```bash
pnpm dlx shadcn@latest add button card input
```

### Edit Pages

Each page is in `src/pages/`:

```
src/pages/
├── login/LoginPage.tsx
├── register/RegisterPage.tsx
├── forgot-password/ForgotPasswordPage.tsx
└── ...
```

## Hot Reload Development

```bash
# Terminal 1: Start dev server
pnpm dev

# Terminal 2: Watch and rebuild theme
while true; do
  pnpm build:theme
  inotifywait -r src/ 2>/dev/null || sleep 2
done
```

## Common Tasks

### Add a New Page

1. Create directory: `src/pages/my-page/`
2. Create files:
   - `index.html`
   - `main.tsx`
   - `MyPage.tsx`
3. Update `vite.config.ts`
4. Update `theme-generator/build.js`

### Change Logo

Replace the icon in `LoginPage.tsx`:

```tsx
<div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
  <Shield className="w-8 h-8 text-primary" />
</div>
```

### Add Social Login

Edit `LoginPage.tsx` and add social providers section:

```tsx
<div className="kc-social-providers">
  {/* Social providers will be injected by Keycloak */}
</div>
```

### Customize Form Fields

Edit any page component:

```tsx
<Input
  id="my-field"
  name="myField"
  type="text"
  className="w-full"
  placeholder="Enter value"
/>
```

## Troubleshooting

### Theme not showing?

```bash
# Clear Keycloak cache
rm -rf /path/to/keycloak/data/tmp/kc-gzip-cache
/path/to/keycloak/bin/kc.sh restart
```

### Build errors?

```bash
# Clean and rebuild
rm -rf node_modules dist dist-theme
pnpm install
pnpm build:all
```

### Port already in use?

```bash
# Change port in vite.config.ts
server: {
  port: 3000,
}
```

## Next Steps

- Read the full [README.md](./README.md)
- Check [DEPLOYMENT.md](./DEPLOYMENT.md) for production deployment
- Customize colors, fonts, and styles
- Add your own branding and logo
- Test all user flows

## Need Help?

- Check Keycloak logs: `tail -f /path/to/keycloak/data/log/keycloak.log`
- Verify theme structure: `find dist-theme/custom/ -type f`
- Test with default theme first
- Review Keycloak documentation

Happy theming! 🎨
