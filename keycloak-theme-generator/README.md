# Keycloak Custom Theme Generator

A modern Keycloak theme generator using **React + Vite + Tailwind CSS + shadcn/ui**. This tool allows you to create beautiful, custom Keycloak themes without using libraries like Keycloakify.

## Features

- 🎨 **Modern UI Components** - Built with shadcn/ui and Tailwind CSS
- ⚡ **Fast Development** - Hot reload with Vite
- 🚀 **Production Ready** - Generates optimized, deployable themes
- 📱 **Responsive Design** - Mobile-first approach
- 🎯 **TypeScript** - Full type safety
- 🌙 **Dark Mode Support** - Built-in dark mode styling
- 🔐 **Complete Coverage** - All Keycloak pages included

## Theme Types

This generator supports all Keycloak theme types:

### Login Theme (25+ pages)
- Login
- Register
- Forgot Password
- Update Password
- Verify Email
- Terms & Conditions
- Error/Info Pages
- TOTP Configuration
- OAuth Grant
- Device Verification
- Profile Updates
- Identity Provider Linking
- WebAuthn Authentication
- SAML Integration
- And more...

### Account Theme
- Complete account console

### Email Theme
- HTML email templates
- Plain text versions

## Prerequisites

- Node.js 18+ and pnpm
- Java 17+ (for Keycloak)
- Keycloak 26+ instance

## Installation

```bash
# Clone or create the project
cd keycloak-theme-generator

# Install dependencies
cd vite-react-app
pnpm install
```

## Development

### Start Development Server

```bash
cd vite-react-app
pnpm dev
```

The dev server will start on `http://localhost:5173`

### Working with Pages

Each Keycloak page has its own entry point:

```
src/pages/
├── login/
│   ├── index.html
│   ├── main.tsx
│   └── LoginPage.tsx
├── register/
│   ├── index.html
│   ├── main.tsx
│   └── RegisterPage.tsx
└── ...
```

### Adding Custom Components

Install shadcn/ui components:

```bash
pnpm dlx shadcn@latest add [component-name]
```

Available components: button, input, label, card, alert, checkbox, separator, tabs, etc.

## Building

### Build React App

```bash
cd vite-react-app
pnpm build
```

### Generate Keycloak Theme

```bash
cd vite-react-app
pnpm build:theme
```

This will:
1. Build the React app
2. Convert HTML to Freemarker templates
3. Inject Keycloak variables
4. Package assets and styles
5. Create the complete theme structure

### Build Everything

```bash
cd vite-react-app
pnpm build:all
```

## Deployment

### Development Deployment

For development, copy the theme directory to Keycloak:

```bash
# Copy to Keycloak themes directory
cp -r dist-theme/custom /path/to/keycloak/themes/

# Start Keycloak with caching disabled
bin/kc.sh start --spi-theme--static-max-age=-1 --spi-theme--cache-themes=false --spi-theme--cache-templates=false
```

### Production Deployment (JAR)

Create a JAR archive for production:

```bash
cd theme-generator
node create-jar.js
```

Then deploy to Keycloak:

```bash
# Copy JAR to providers directory
cp dist-jar/keycloak-custom-theme.jar /path/to/keycloak/providers/

# Restart Keycloak
/path/to/keycloak/bin/kc.sh restart
```

### Configure in Keycloak Admin Console

1. Log into Admin Console
2. Select your realm
3. Navigate to **Realm Settings** → **Themes**
4. Set **Login Theme** to `custom`
5. Click **Save**

## Customization

### Styling

Edit `tailwind.config.js` to customize:

- Colors
- Fonts
- Spacing
- Border radius
- Animations

### Theme Properties

Edit `theme-generator/build.js` to customize:

- Theme properties
- Message bundles
- Freemarker variables
- Template structure

### Page Components

Each page can be customized independently:

```tsx
// src/pages/login/LoginPage.tsx
export function LoginPage() {
  return (
    <div className="kc-login-wrapper">
      <Card>
        {/* Your custom content */}
      </Card>
    </div>
  )
}
```

## Project Structure

```
keycloak-theme-generator/
├── vite-react-app/              # React + Vite application
│   ├── src/
│   │   ├── pages/              # Keycloak page components
│   │   ├── components/         # UI components (shadcn/ui)
│   │   ├── lib/                # Utilities
│   │   └── index.css           # Global styles
│   ├── index.html
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── package.json
├── theme-generator/            # Build scripts
│   ├── build.js               # Theme generator
│   └── create-jar.js          # JAR archive creator
├── dist-theme/                # Generated theme (for copy deployment)
│   └── custom/
│       ├── login/
│       └── account/
└── dist-jar/                  # JAR archive (for provider deployment)
    └── keycloak-custom-theme.jar
```

## Keycloak Freemarker Variables

The following variables are available in templates:

### URLs
- `${url.loginAction}` - Form submission URL
- `${url.loginUrl}` - Login page URL
- `${url.registrationUrl}` - Registration URL
- `${url.loginResetCredentialsUrl}` - Forgot password URL
- `${url.tcsUrl}` - Terms and conditions URL

### Realm
- `${realm.name}` - Realm name
- `${realm.displayName}` - Display name

### User
- `${auth.attemptedUsername}` - Attempted username

### Messages
- `${message?html}` - Error/info message
- `${messagesPerField.exists(...)}` - Field-specific messages

## Best Practices

### During Development

1. **Disable theme caching** for hot reload
2. **Use browser dev tools** to inspect elements
3. **Test on multiple devices** for responsiveness
4. **Check accessibility** with screen readers

### For Production

1. **Enable caching** for performance
2. **Minimize bundle size** - remove unused components
3. **Test thoroughly** - all user flows
4. **Version your themes** - use JAR archives

### Performance Tips

- Use CSS-in-JS sparingly
- Optimize images
- Lazy load components
- Minimize JavaScript bundle
- Enable compression in Keycloak

## Troubleshooting

### Theme not loading

1. Check Keycloak logs for errors
2. Verify theme directory structure
3. Check file permissions
4. Clear Keycloak cache: `rm -rf data/tmp/kc-gzip-cache`

### Build errors

1. Clear node_modules and reinstall
2. Check Node.js version (18+)
3. Verify pnpm is installed correctly
4. Check for TypeScript errors

### Styles not applying

1. Verify CSS is built
2. Check theme.properties for correct style paths
3. Clear browser cache
4. Disable Keycloak caching for development

## Contributing

To add new pages:

1. Create page directory in `src/pages/`
2. Add `index.html`, `main.tsx`, and component file
3. Update `vite.config.ts` with new entry point
4. Update `theme-generator/build.js` with page config
5. Build and test

## License

This project is open source and available under the MIT License.

## Resources

- [Keycloak Theme Documentation](https://www.keycloak.org/ui-customization/themes)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Vite Documentation](https://vitejs.dev/)
- [Freemarker Documentation](https://freemarker.apache.org/docs/)

## Support

For issues and questions:
- Check Keycloak logs
- Review theme structure
- Verify all paths are correct
- Test with default theme first
