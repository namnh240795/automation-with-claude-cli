# Vite Web Development

Expert guide for developing web applications with Vite, including React, TypeScript, Tailwind CSS, and component libraries like shadcn/ui.

## Quick Start

### Development Server
```bash
# From the web app directory (e.g., webs/auth)
pnpm dev              # Start dev server (uses Vite)
pnpm --filter <name> dev  # Start from monorepo root
```

### Build & Preview
```bash
pnpm build           # Build for production
pnpm preview         # Preview production build locally
```

### Type Checking
```bash
pnpm exec tsc --noEmit  # TypeScript type check without emitting files
```

## Monorepo Setup

### Workspace Configuration

For a **pnpm workspace monorepo**, ensure `webs/*` is included in `pnpm-workspace.yaml`:

```yaml
packages:
  - apps/*
  - libs/*
  - packages/*
  - tools/*
  - webs/*  # Include web applications
```

### Installing Dependencies

**App-specific dependencies** (from web app directory):
```bash
pnpm add <package>           # Runtime dependency
pnpm add -D <package>         # Dev dependency
```

**From monorepo root:**
```bash
pnpm add --filter <web-app> <package>  # Install for specific web app
```

### Path Aliases

**CRITICAL:** Always update BOTH TypeScript and Vite configs when adding new libraries:

**tsconfig.app.json:**
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**vite.config.ts:**
```typescript
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

## Tailwind CSS Configuration

### Version Compatibility

**⚠️ CRITICAL:** shadcn/ui requires **Tailwind CSS v3**, NOT v4!

```bash
# CORRECT - Tailwind CSS v3
pnpm add -D tailwindcss@^3.4.0

# WRONG - Tailwind CSS v4 (not compatible with shadcn)
pnpm add -D tailwindcss@latest  # Avoid!
```

### PostCSS Configuration

**For Tailwind CSS v3 (shadcn compatible):**
```javascript
// postcss.config.js
export default {
  plugins: {
    tailwindcss: {},      // Use tailwindcss
    autoprefixer: {},
  },
}
```

**❌ WRONG for v3:**
```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},  // This is for v4 only!
  },
}
```

### Tailwind Config

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require("tailwindcss-animate")],
}
```

## shadcn/ui Integration

### Installation Steps

1. **Install required dependencies:**
```bash
pnpm add -D tailwindcss@^3.4.0 postcss autoprefixer
pnpm add -D tailwindcss-animate
pnpm add class-variance-authority clsx tailwind-merge
pnpm add lucide-react
```

2. **Create components.json:**
```bash
# This configures shadcn component installation
pnpm dlx shadcn@latest init
```

3. **Add components:**
```bash
# Single component
pnpm dlx shadcn@latest add button

# Multiple components
pnpm dlx shadcn@latest add button card input

# All components (⚠️ may fail if some aren't in registry)
pnpm dlx shadcn@latest add --all
```

### Component File Location

After installation with shadcn CLI, components are created in `@/components/ui/`. Move them to proper location:

```bash
# If created in literal @/ directory
mv @/components/* src/components/ui/
rm -rf @/
```

### Type Exports

When importing types from components, use `import type` to avoid runtime errors:

```typescript
// ✅ CORRECT - Type-only import
import type { ButtonProps } from "@/components/ui/button"

// ❌ WRONG - Regular import for types
import { ButtonProps } from "@/components/ui/button"
```

## Common Issues & Solutions

### Issue: "The requested module does not provide an export named"

**Problem:** Importing a TypeScript type from a component that exports it as `interface`.

**Solution:** Export the type explicitly:
```typescript
// button.tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

export { Button, buttonVariants }
export type { ButtonProps }  // Explicit type export
```

### Issue: Circular dependency errors

**Problem:** Component imports from itself (corrupted shadcn component).

**Example:**
```typescript
// ❌ WRONG - Self-import
import { OTPInput } from "@/components/ui/input-otp"
```

**Solution:** Rewrite the component without self-imports.

### Issue: react-resizable-panels exports

**Problem:** Named exports like `PanelGroup` don't exist.

**Solution:** Use the correct export names:
```typescript
// ✅ CORRECT
import * as ReactResizablePanels from "react-resizable-panels"

const ResizablePanelGroup = ReactResizablePanels.Group
const ResizablePanel = ReactResizablePanels.Panel
const ResizableHandle = ReactResizablePanels.Separator
```

### Issue: Vite cache causing stale errors

**Problem:** Fixed TypeScript errors still appear after editing.

**Solution:** Clear Vite's cache and restart:
```bash
rm -rf node_modules/.vite
pnpm dev
```

### Issue: Port already in use

**Problem:** Vite tries default ports (5173, 5174) that are in use.

**Solution:** Vite automatically tries the next available port. Check the console output for the actual port:
```
Port 5173 is in use, trying another one...
Port 5174 is in use, trying another one...
➜  Local:   http://localhost:5175/
```

## React Router Integration

### Setup

```bash
pnpm add react-router-dom
```

### main.tsx Configuration

```typescript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
```

### Route Structure

```typescript
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/components" element={<ComponentsShowcase />} />
    </Routes>
  )
}
```

## TypeScript Configuration

### Key Compiler Options

```json
{
  "compilerOptions": {
    "target": "ES2023",
    "useDefineForClassFields": true,
    "lib": ["ES2023", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "skipLibCheck": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## Development Workflow

### 1. Initial Setup
```bash
# From monorepo root
pnpm install                    # Install all workspace dependencies

# Or from web app directory
cd webs/auth
pnpm install                    # Install dependencies for this app only
```

### 2. Development
```bash
# Start dev server (auto-restarts on changes)
pnpm dev

# Or from monorepo root
pnpm --filter auth dev
```

### 3. Type Checking
```bash
# Run TypeScript compiler without emitting files
pnpm exec tsc --noEmit

# Check for errors without building
```

### 4. Build
```bash
# Production build
pnpm build

# This runs:
# 1. TypeScript check (tsc -b)
# 2. Vite bundle (vite build)
```

### 5. Preview
```bash
# Preview production build locally
pnpm preview
```

## Project Structure

```
webs/auth/
├── src/
│   ├── components/
│   │   ├── ui/          # shadcn/ui components
│   │   └── layout/      # Layout components (Navbar, etc.)
│   ├── pages/           # Page components
│   ├── lib/             # Utility functions (cn helper)
│   ├── hooks/           # Custom React hooks
│   ├── main.tsx         # Application entry point
│   └── index.css        # Global styles + Tailwind
├── components.json      # shadcn/ui configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
├── tsconfig.app.json    # TypeScript config (app code)
├── tsconfig.node.json   # TypeScript config (Node scripts)
├── vite.config.ts       # Vite bundler configuration
└── package.json         # Dependencies and scripts
```

## Best Practices

### 1. Always use workspace-aware commands
```bash
# ✅ GOOD - Works in monorepo
pnpm --filter <app> dev
pnpm --filter <app> build

# ❌ BAD - May not work from root
cd webs/<app> && pnpm dev
```

### 2. Update path aliases in BOTH places
When adding new libraries:
- Update `tsconfig.app.json` paths
- Update `vite.config.ts` resolve.alias

### 3. Use type-only imports
```typescript
// ✅ GOOD - Type-only import
import type { ComponentProps } from "@/components/ui/component"

// ❌ BAD - Runtime import for types
import { ComponentProps } from "@/components/ui/component"
```

### 4. Check Vite cache first
If you see unexpected errors:
```bash
rm -rf node_modules/.vite
pnpm dev
```

### 5. Verify Tailwind version
```bash
# Check installed version
pnpm list tailwindcss

# Should show: tailwindcss@^3.4.0 (NOT v4!)
```

## Troubleshooting Checklist

When facing issues with Vite web apps:

1. ✅ **Check Vite cache:** `rm -rf node_modules/.vite`
2. ✅ **Verify Tailwind version:** Must be v3 for shadcn
3. ✅ **Check PostCSS config:** Use `tailwindcss` not `@tailwindcss/postcss`
4. ✅ **Verify path aliases:** Updated in both tsconfig and vite.config
5. ✅ **Check for circular imports:** Component shouldn't import from itself
6. ✅ **Run TypeScript check:** `pnpm exec tsc --noEmit`
7. ✅ **Restart dev server:** Stop and start fresh

## External Dependencies

When adding packages that require externalization in Vite (like NestJS packages in a monorepo), update them in `rspack.config.js` for apps, but for Vite web apps, they should work without modification.

## Useful Commands

```bash
# List all workspace packages
pnpm list --depth 0

# Check dependency tree
pnpm why <package>

# Update dependencies
pnpm update

# Clean install
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

## Resources

- [Vite Documentation](https://vite.dev/)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [React Router Documentation](https://reactrouter.com/)
- [Tailwind CSS v3 Documentation](https://tailwindcss.com/docs/3.4)
- [pnpm Workspace Documentation](https://pnpm.io/)
