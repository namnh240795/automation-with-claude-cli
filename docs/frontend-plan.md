# Frontend Architecture Plan: Svelte + Vite + shadcn-svelte + Tailwind

## Overview

Establish a scalable frontend architecture supporting **multiple Svelte frontends** in a monorepo, split from backend services (NestJS in `apps/`). Each frontend is independently deployable and shares common UI patterns.

## Current State

- `pnpm-workspace.yaml` already includes `webs/*` as a workspace (unused)
- `apps/` contains NestJS backends: `auth`, `api`, `key-vault`
- `libs/` contains shared backend libraries
- No frontend applications exist yet

## Architecture Decisions

### 1. Directory Split
```
/
├── apps/          # NestJS backends (auth, api, key-vault, etc.)
├── libs/          # Shared backend libraries
├── packages/      # Prisma clients
├── webs/          # Svelte frontend applications  <-- NEW
│   ├── admin/     # Admin dashboard
│   └── cms/       # CMS/portal (future)
└── tools/         # Build/dev tools
```

**Rationale:** `webs/` was already defined in `pnpm-workspace.yaml` as a workspace but never populated. Using it keeps all frontends in one place and matches the monorepo's organizational pattern.

### 2. Tech Stack per Frontend
| Role | Technology | Notes |
|------|------------|-------|
| Framework | SvelteKit 2 + Svelte 5 | SSR/SPA capable |
| Bundler | Vite | Fast HMR, standard Svelte tooling |
| UI Components | shadcn-svelte | Headless, accessible, themeable |
| Styling | Tailwind CSS 4 | Utility-first, design system-ready |
| Icons | Lucide Svelte | Consistent icon set |
| HTTP Client | ky / fetch | Lightweight, SvelteKit-native |

### 3. Path Aliases for Shared Code
```
@webs/common/ → webs/common/src    # Shared frontend utilities
@app/*        → libs/*/src         # Backend shared libs (if needed by frontend)
```

### 4. shadcn-svelte Setup
shadcn-svelte for Svelte uses a component-copy approach:
- Components live in each frontend app under `src/lib/components/ui/`
- `components.json` config file at each app root
- Shared config in `webs/common/` for type utilities (cn helper)

### 5. Service Communication
Frontends communicate with backend via REST API:
- Admin frontend → `http://localhost:3001/auth/v1/` (existing auth service)
- Admin frontend → `http://localhost:3000/api/v1/` (existing api service)

---

## Task List

### Phase 1: Core Structure

#### Task 1: Create `webs/common/` shared utility library
- [ ] Create `webs/common/` directory with package.json, tsconfig.json
- [ ] Add `src/lib/utils/index.ts` with `cn()` utility (clsx + tailwind-merge)
- [ ] Add `src/lib/index.ts` barrel export
- [ ] Configure pnpm workspace to recognize `webs/common`

**Files:**
- `webs/common/package.json`
- `webs/common/tsconfig.json`
- `webs/common/src/lib/utils/index.ts`
- `webs/common/src/index.ts`

**Verification:**
- `pnpm list --filter @webs/common` shows package
- TypeScript compiles `webs/common` without errors

---

#### Task 2: Create `webs/admin/` SvelteKit app (first frontend)
- [ ] Create `webs/admin/` with SvelteKit + TypeScript setup
- [ ] Add `package.json` with Svelte 5, SvelteKit, Vite
- [ ] Add `svelte.config.js` with `@sveltejs/adapter-auto`
- [ ] Add `vite.config.ts` with Tailwind CSS 4 plugin
- [ ] Add `tsconfig.json`

**Files:**
- `webs/admin/package.json`
- `webs/admin/svelte.config.js`
- `webs/admin/vite.config.ts`
- `webs/admin/tsconfig.json`
- `webs/admin/src/app.html`

**Dependencies:** Task 1 (needs `@webs/common` available)

---

#### Task 3: Configure Tailwind CSS 4 + shadcn-svelte
- [ ] Add Tailwind CSS 4 via `@tailwindcss/vite`
- [ ] Add `tailwind.config.js` (or `tailwind.config.ts`)
- [ ] Add PostCSS config
- [ ] Initialize shadcn-svelte with `components.json`
- [ ] Add shadcn components (button, card, input, label)
- [ ] Add `webs/admin/src/app.css` with Tailwind directives

**Files:**
- `webs/admin/vite.config.ts` (updated)
- `webs/admin/tailwind.config.js`
- `webs/admin/src/app.css`
- `webs/admin/components.json`

**Verification:**
- `pnpm build:admin` succeeds
- shadcn components render in dev server

---

#### Task 4: Set up API client with auth interceptor
- [ ] Create `webs/admin/src/lib/api/client.ts` - ky-based client
- [ ] Create `webs/admin/src/lib/api/endpoints.ts` - endpoint helpers
- [ ] Add auth token storage (localStorage / cookies)
- [ ] Add request interceptor for JWT Bearer token
- [ ] Add response interceptor for 401 redirect to login

**Files:**
- `webs/admin/src/lib/api/client.ts`
- `webs/admin/src/lib/api/endpoints.ts`
- `webs/admin/src/lib/stores/auth.ts` (Svelte store)

---

#### Task 5: Add routing structure
- [ ] Create `webs/admin/src/routes/+layout.svelte` (app shell)
- [ ] Create `webs/admin/src/routes/+page.svelte` (dashboard home)
- [ ] Create auth routes: `login/`, `auth/callback/`
- [ ] Add protected route guard in `+layout.server.ts`

**Files:**
- `webs/admin/src/routes/+layout.svelte`
- `webs/admin/src/routes/+page.svelte`
- `webs/admin/src/routes/login/+page.svelte`
- `webs/admin/src/routes/auth/callback/+page.svelte`
- `webs/admin/src/routes/auth/callback/+page.server.ts`

---

#### Task 6: Update workspace root configuration
- [ ] Update `tsconfig.json` to add `@webs/common` path aliases
- [ ] Update `tsconfig.json` to add `webs/admin` path
- [ ] Add `webs/admin` build scripts to root `package.json`
- [ ] Add `webs/common` build scripts if needed

**Files:**
- `tsconfig.json` (update paths)
- `package.json` (add scripts)

**Verification:**
- `pnpm list` shows all workspace packages
- `pnpm dev:admin` starts dev server
- `pnpm build:admin` produces production build

---

### Checkpoint: Structure
- [ ] `webs/admin/` builds with `pnpm build:admin`
- [ ] Dev server runs with `pnpm dev:admin`
- [ ] shadcn components render correctly
- [ ] TypeScript compiles without errors
- [ ] API client can make authenticated requests to backend

---

## File Structure (Target)

```
webs/
├── admin/                          # First frontend app
│   ├── src/
│   │   ├── lib/
│   │   │   ├── components/
│   │   │   │   └── ui/            # shadcn components (button, card, input, etc.)
│   │   │   ├── api/               # API client
│   │   │   │   ├── client.ts      # ky instance with interceptors
│   │   │   │   ├── endpoints.ts   # typed endpoint functions
│   │   │   │   └── index.ts
│   │   │   ├── stores/            # Svelte stores
│   │   │   │   └── auth.ts
│   │   │   └── utils/             # app-specific utils
│   │   │       └── index.ts
│   │   ├── routes/                # SvelteKit file-based routing
│   │   │   ├── +layout.svelte
│   │   │   ├── +layout.server.ts
│   │   │   ├── +page.svelte
│   │   │   └── (auth)/
│   │   │       ├── login/
│   │   │       │   └── +page.svelte
│   │   │       └── callback/
│   │   │           ├── +page.svelte
│   │   │           └── +page.server.ts
│   │   └── app.html
│   ├── svelte.config.js
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── components.json            # shadcn config
│   ├── package.json
│   └── tsconfig.json
│
├── common/                         # Shared across all frontends
│   ├── src/
│   │   ├── lib/
│   │   │   └── utils/
│   │   │       └── cn.ts          # clsx + tailwind-merge helper
│   │   └── index.ts
│   ├── package.json
│   └── tsconfig.json
│
└── tsconfig.json                   # Root frontend tsconfig (extends)
```

---

## Key Configuration Files

### `webs/admin/vite.config.ts`
```ts
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  resolve: {
    alias: {
      '$lib': './src/lib',
      '@webs/common': '../common/src',
    },
  },
});
```

### `webs/admin/components.json` (shadcn)
```json
{
  "$schema": "https://shadcn-svelte.com/schema.json",
  "components": "./src/lib/components/ui",
  "aliases": {
    "components": "$lib/components/ui",
    "utils": "@webs/common/src/lib/utils"
  }
}
```

### `webs/admin/tailwind.config.js`
```js
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

---

## Package Additions (devDependencies)

```
@sveltejs/kit: ^2.0.0        # SvelteKit framework
svelte: ^5.0.0                # Svelte 5
vite: ^6.0.0                  # Vite bundler
tailwindcss: ^4.0.0           # Tailwind CSS 4
@tailwindcss/vite: ^4.0.0     # Tailwind Vite plugin
tailwind-merge: ^3.0.0       # For cn() utility
clsx: ^2.1.0                  # For cn() utility
lucide-svelte: ^0.500.0      # Icons
@nestjs/core: ^11.0.0        # For TS reference only (no runtime)
typescript: ^5.7.0           # TypeScript
```

---

## Commands (After Setup)

```bash
pnpm dev:admin              # Start admin dev server
pnpm build:admin            # Production build
pnpm dev:cms                # Start CMS dev server (future)
```

---

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| shadcn-svelte + Svelte 5 compatibility | Medium | Use latest shadcn-svelte (supports Svelte 5 Runes mode) |
| Multiple frontends = duplicate deps | Low | Shared `webs/common`, deduplicated via pnpm workspaces |
| Tailwind 4 vs 3 differences | Medium | Use `@tailwindcss/vite` plugin for v4, not PostCSS |
| SvelteKit SSR vs SPA decision | Low | Start with adapter-auto (works for both), switch to adapter-static if pure SPA needed |
| Auth approach (JWT vs Keycloak) | Medium | Start with JWT to existing auth service; Keycloak can be added later |

---

## Open Questions

1. **Auth approach:** Continue with JWT-based auth to existing auth service, or use Keycloak (mentioned in `.env.frontend`)? The `.env.frontend` shows Keycloak config — should we integrate that now or later?

2. **First frontend scope:** Is `webs/admin/` a full admin dashboard, or a minimal shell (login + dashboard home) to prove the structure works first?

3. **Deployment:** Any specific deployment targets (Vercel, Cloudflare Pages, Docker)?

4. **Additional frontends:** What other frontends are planned? (CMS was mentioned in `.env.admin` — is that a separate frontend?)

---

## Verification Steps

After Phase 1 tasks:
```bash
# Verify workspace structure
ls webs/
# Expected: admin/ common/

# Verify pnpm recognizes workspaces
pnpm list --filter admin
# Should show admin package

# Verify SvelteKit builds
cd webs/admin && pnpm build
# Should produce build/

# Verify shadcn components work
cd webs/admin && pnpm exec shadcn@latest add button card -y
# Should create button.svelte, card.svelte in src/lib/components/ui/
```

---

## Summary: What Gets Added

| Component | Location | Purpose |
|-----------|----------|---------|
| Shared utils | `webs/common/` | `cn()` utility shared across all frontends |
| Admin frontend | `webs/admin/` | First SvelteKit + Svelte 5 + shadcn + Tailwind 4 app |
| Config updates | workspace root | Path aliases, build scripts |
| shadcn components | `webs/admin/src/lib/components/ui/` | Reusable UI primitives |
| API client | `webs/admin/src/lib/api/` | Typed HTTP client with auth interceptors |
| Routing | `webs/admin/src/routes/` | SvelteKit file-based routing with auth guards |