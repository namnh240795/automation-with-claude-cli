# Frontend Conventions — React + React Router + Tailwind + Radix UI

> Source: Frontend conventions for the auth web app and any future frontend services

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| React | UI library |
| React Router | Client-side routing |
| Tailwind CSS | Utility-first styling |
| Radix UI | Accessible headless components |
| Lucide icons | Icon library |
| Vite | Development server and bundler |

---

## File Organization

### Component Structure
```
src/
├── components/
│   ├── ui/                    # Shared UI primitives (Radix-based)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   └── index.ts           # Barrel export
│   ├── layout/
│   │   ├── header.tsx
│   │   ├── sidebar.tsx
│   │   ├── footer.tsx
│   │   └── index.ts
│   └── forms/
│       ├── sign-in-form.tsx
│       ├── sign-up-form.tsx
│       └── index.ts
├── pages/
│   ├── sign-in.tsx
│   ├── sign-up.tsx
│   ├── dashboard.tsx
│   └── index.ts
├── hooks/
│   ├── use-auth.ts
│   ├── use-fetch.ts
│   └── index.ts
├── lib/
│   ├── api-client.ts          # Axios instance with interceptors
│   ├── auth.ts                # Auth utilities
│   └── utils.ts               # Tailwind cn() helper
├── routes/
│   ├── index.tsx              # Route definitions
│   ├── protected-route.tsx    # Auth guard wrapper
│   └── public-route.tsx
├── types/
│   ├── auth.ts
│   └── api.ts
└── App.tsx
```

---

## Component Patterns

### Radix UI Component Wrapper
```tsx
// components/ui/dialog.tsx
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cn } from '@/lib/utils';

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 bg-black/50" />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
        'bg-white rounded-lg p-6 shadow-lg w-full max-w-md',
        className,
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));
DialogContent.displayName = 'DialogContent';

export { Dialog, DialogTrigger, DialogContent };
```

### Form Component Pattern
```tsx
// components/forms/sign-in-form.tsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/use-auth';

export function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signIn({ email, password });
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={loading}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        disabled={loading}
      />
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Signing in...' : 'Sign In'}
      </Button>
    </form>
  );
}
```

---

## Styling with Tailwind

### Use cn() for conditional classes
```tsx
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Usage
<div className={cn('p-4 rounded-lg', isActive && 'bg-blue-50', className)} />
```

### Spacing and sizing scale
```
Use Tailwind defaults — don't create custom spacing values:
p-2 (8px), p-4 (16px), p-6 (24px), p-8 (32px)
gap-2, gap-4, gap-6
w-full, max-w-md, max-w-lg, max-w-xl
```

### Responsive breakpoints
```tsx
// Mobile-first: base = mobile, md: = tablet, lg: = desktop
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
```

---

## Routing with React Router

### Route definitions
```tsx
// routes/index.tsx
import { createBrowserRouter } from 'react-router';
import { Layout } from '@/components/layout';
import { SignIn } from '@/pages/sign-in';
import { Dashboard } from '@/pages/dashboard';
import { ProtectedRoute } from './protected-route';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <SignIn /> },
      { path: 'sign-up', element: <SignUp /> },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
```

### Protected route wrapper
```tsx
// routes/protected-route.tsx
import { Navigate, Outlet } from 'react-router';
import { useAuth } from '@/hooks/use-auth';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/" replace />;

  return children ? <>{children}</> : <Outlet />;
}
```

---

## API Client Pattern

### Axios instance with auth interceptors
```typescript
// lib/api-client.ts
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/auth',
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  },
);
```

---

## Icons with Lucide

```tsx
import { Mail, Lock, LogOut, Settings, User } from 'lucide-react';

// Standard size is 4 (16px) for inline, 6 (24px) for standalone
<Mail className="h-4 w-4" />
<Settings className="h-6 w-6" />

// With button
<Button variant="ghost" size="icon">
  <LogOut className="h-4 w-4" />
</Button>
```

---

## Checklist

- Always use Radix UI primitives for interactive components (accessibility built-in)
- Always use `cn()` for conditional Tailwind classes
- Always wrap authenticated routes in `ProtectedRoute`
- Always handle loading and error states in forms
- Always use `apiClient` instance for API calls — never raw `fetch` or `axios.create()`
- Never build custom dropdown/dialog/modal components — use Radix UI
- Never hardcode colors — use Tailwind's default palette
- Never store auth tokens in cookies without httpOnly + secure flags
