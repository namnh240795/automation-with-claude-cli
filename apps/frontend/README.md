# Frontend Application with Keycloak Authentication

Modern React application with Keycloak authentication, built with **Vite + React + TypeScript + Tailwind CSS + shadcn/ui**.

## 🚀 Quick Start

### 1. Start the development server

```bash
cd apps/frontend
pnpm dev
```

The app will be available at **http://localhost:5173** (or next available port)

### 2. Access the application

Open your browser and navigate to:
```
http://localhost:5173
```

You'll see the login page powered by Keycloak!

## 🎯 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Your React App                           │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Full UI with shadcn/ui + Tailwind CSS              │ │
│  │  - Login Page (your design!)                          │ │
│  │  - Dashboard (protected route)                        │ │
│  │  - All your pages, components, routing              │ │
│  └────────────────────────────────────────────────────────┘ │
│                         ↓                                     │
│              Uses Keycloak JS Adapter                      │
│                         ↓                                     │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              Keycloak (Auth Only)                     │ │
│  │  - Handles authentication                            │ │
│  │  - Manages users                                      │ │
│  │  - Issues JWT tokens                                  │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## 🔐 How Authentication Works

### 1. Initial Access
- User visits `http://localhost:5173`
- React app loads with Keycloak JS adapter
- If not authenticated, user sees login page

### 2. Login Flow
```tsx
// User clicks "Sign In with Keycloak"
keycloak.login({
  redirectUri: 'http://localhost:5173/dashboard'
})
```

### 3. Keycloak Redirect
- User is redirected to Keycloak at `http://localhost:8080`
- User authenticates (username/password, social login, etc.)
- Keycloak redirects back with JWT token

### 4. Token Received
- React app receives JWT token
- Token stored in memory
- All subsequent API calls include token in header:
  ```http
  Authorization: Bearer <jwt-token>
  ```

### 5. Protected Routes
- Dashboard requires authentication
- If not authenticated, redirect to login

## 📁 Project Structure

```
apps/frontend/
├── src/
│   ├── components/
│   │   └── ui/              # shadcn/ui components
│   │       ├── alert.tsx
│   │       ├── avatar.tsx
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── checkbox.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── separator.tsx
│   │       └── switch.tsx
│   ├── lib/
│   │   ├── keycloak.ts       # Keycloak configuration & helpers
│   │   └── utils.ts          # Utility functions
│   ├── pages/
│   │   ├── LoginPage.tsx     # Login page
│   │   ├── DashboardPage.tsx # Protected dashboard
│   │   ├── ProfilePage.tsx   # User profile page
│   │   └── SettingsPage.tsx  # Settings page
│   ├── App.tsx              # Main app with routing
│   ├── main.tsx             # Entry with Keycloak provider
│   └── index.css            # Tailwind styles
├── .env                     # Keycloak configuration
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## 🔧 Configuration

### Environment Variables (.env)

```env
VITE_KEYCLOAK_URL=http://localhost:8080
VITE_KEYCLOAK_REALM=test-realm
VITE_KEYCLOAK_CLIENT_ID=account-console
```

### Update these to match your Keycloak setup:
- `VITE_KEYCLOAK_URL` - Your Keycloak server URL
- `VITE_KEYCLOAK_REALM` - Your Keycloak realm name
- `VITE_KEYCLOAK_CLIENT_ID` - Your Keycloak client ID

## 🎨 Pages & Routes

### `/` - Login Page
- Welcome page with Keycloak authentication
- Shows user info if already logged in
- Options to login or register
- Modern UI with avatar, badges, and alerts
- Responsive design for all screen sizes

### `/dashboard` - Protected Dashboard
- Requires authentication
- Shows user profile with avatar
- Session info with token expiration countdown
- JWT token details (issued at, expires at)
- API integration example with test button
- Quick navigation cards to Profile and Settings
- Real-time session status indicators

### `/profile` - User Profile Page
- Requires authentication
- Displays comprehensive user information
- Account details (User ID, Username, Email, Name)
- Email verification status badge
- JWT token information (issued at, expires at, time remaining)
- Quick actions (Account Settings, Security Settings, Sign Out)
- Avatar with user initials

### `/settings` - Settings Page
- Requires authentication
- Notification preferences (Email, Push, Marketing)
- Security settings (Two-Factor Auth, Profile Visibility)
- Persistent settings (saved to localStorage)
- Reset to defaults option
- Danger zone (Download Data, Delete Account)
- Save confirmation with alert notification

## 🔌 API Integration

The dashboard includes an example of calling your protected NestJS API:

```tsx
const response = await fetch('http://localhost:3000/api/protected', {
  headers: {
    'Authorization': `Bearer ${keycloak.token}`,
    'Content-Type': 'application/json',
  },
})
```

### How to protect your NestJS services:

In your API service (apps/api), add JWT authentication:

```typescript
// Use the JWT guard from apps/auth
import { JwtAuthGuard } from '@app/auth-utilities'

@Controller('api')
export class ApiController {
  @Get('protected')
  @UseGuards(JwtAuthGuard)
  getProtectedData() {
    return { message: 'This is protected data' }
  }
}
```

## 🎨 Customization

### Add New Pages

1. Create page component:
```tsx
// src/pages/ProfilePage.tsx
export default function ProfilePage() {
  return <div>Profile Page</div>
}
```

2. Add route in App.tsx:
```tsx
<Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
```

### Add shadcn/ui Components

```bash
# Example: Add Alert component
pnpm dlx shadcn@latest add alert
```

### Customize Styles

Edit `tailwind.config.js`:
```js
colors: {
  primary: {
    DEFAULT: '#your-color',
  },
}
```

## 🔐 Keycloak Helpers

Available helper functions from `lib/keycloak.ts`:

```typescript
// Check authentication status
isAuthenticated() // boolean

// Get JWT token
getToken() // string | undefined

// User actions
login() // Initiate login
logout() // Logout

// User information
getUsername() // string
getUserProfile() // object with user details

// Role-based access
hasRole('admin') // boolean
hasAnyRole(['admin', 'user']) // boolean
```

## 🚀 Build for Production

```bash
pnpm build
```

The optimized build will be in the `dist/` directory.

## 🐳 Integration with Your Monorepo

This frontend integrates with your existing services:

- **Keycloak** (apps/auth) - Authentication server at `http://localhost:8080`
- **API Service** (apps/api) - Protected API at `http://localhost:3000`
- **Frontend** (apps/frontend) - React app at `http://localhost:5173`

### Start All Services:

```bash
# From project root
docker-compose up -d

# Start frontend (in separate terminal)
cd apps/frontend && pnpm dev
```

## 📚 Next Steps

1. **Customize the UI**: Edit pages in `src/pages/`
2. **Add more components**: More shadcn/ui components available (dropdown-menu, dialog, table, etc.)
3. **Connect to your APIs**: Use the token from `keycloak.token`
4. **Add routing**: Create more protected routes following the ProtectedRoute pattern
5. **Add state management**: Add Zustand, Redux, etc. if needed
6. **Add form validation**: Implement form validation with react-hook-form
7. **Add toast notifications**: Install sonner for toast notifications
8. **Integrate with NestJS APIs**: Set up JWT validation in your backend services

## 🆕 Recent Updates

### Added Pages
- **ProfilePage**: Comprehensive user profile with account details and token info
- **SettingsPage**: User settings with notification preferences and security options

### Added UI Components
- **Alert**: For displaying messages and notifications
- **Badge**: For status indicators and labels
- **Avatar**: For user profile images and initials
- **Checkbox**: For form inputs
- **Separator**: For visual content separation
- **Switch**: For toggle settings

### Enhanced Features
- Improved UI design with avatars and badges
- Better user experience with session status indicators
- Token expiration countdown on dashboard
- Persistent user settings (localStorage)
- Loading states with spinners
- Responsive design improvements

## 💡 Key Benefits

✅ **Full React Control** - No template limitations
✅ **Modern DX** - Hot reload, TypeScript, all React features
✅ **Secure** - Keycloak handles authentication
✅ **Scalable** - SPA architecture
✅ **Industry Standard** - This is how modern apps work

## 🎯 Quick Test

1. Start Keycloak: `docker-compose up -d`
2. Start frontend: `cd apps/frontend && pnpm dev`
3. Visit: `http://localhost:5173`
4. Click "Sign In with Keycloak"
5. Authenticate with Keycloak (admin/admin)
6. Get redirected to Dashboard
7. See your user info and JWT token!

This is the modern approach to authentication! 🚀
