# Spec: Admin Dashboard UI

## Objective

Build a polished, professional admin dashboard for the monorepo using **SvelteKit + Svelte 5** with **shadcn-svelte** components and **Tailwind CSS 4**. Target users are internal administrators managing users, organizations, and system settings.

## ASSUMPTIONS I'M MAKING

1. Dashboard connects to existing auth API at `localhost:3001`
2. Dashboard will show mock/placeholder data initially
3. Using existing shadcn-svelte component patterns already established
4. Dark mode support is optional (can be added later)
5. No real charts/data visualization yet — just stat cards
6. Single-page dashboard with sidebar navigation structure ready for future pages

**Correct me now or I'll proceed with these.**

---

## Tech Stack

- **Framework:** SvelteKit 2 + Svelte 5 (Runes mode)
- **UI Components:** shadcn-svelte (button, card, input, label, badge, avatar, dropdown-menu, etc.)
- **Styling:** Tailwind CSS 4 with CSS variables for theming
- **Icons:** Lucide Svelte
- **Build:** Vite
- **Target:** `webs/admin/` package

## Commands

```bash
# Development
pnpm dev:admin              # Start dev server (port 4200)

# Production
pnpm --filter @webs/admin exec vite build   # Build for production

# Preview
pnpm --filter @webs/admin exec vite preview  # Preview production build
```

## Project Structure

```
webs/admin/src/
├── lib/
│   ├── components/
│   │   ├── ui/              # shadcn components (existing)
│   │   ├── layout/          # Layout components
│   │   │   ├── sidebar.svelte
│   │   │   ├── header.svelte
│   │   │   └── nav-item.svelte
│   │   └── dashboard/
│   │       ├── stat-card.svelte
│   │       └── activity-feed.svelte
│   ├── api/                 # Existing API client
│   ├── stores/auth.ts       # Existing auth store
│   └── utils/               # Existing utils
├── routes/
│   ├── +layout.svelte       # App shell with sidebar
│   ├── +page.svelte         # Dashboard home
│   ├── (auth)/
│   │   └── login/           # Login page (existing)
│   └── (dashboard)/
│       ├── users/           # Users page (future)
│       ├── organizations/     # Orgs page (future)
│       └── settings/         # Settings page (future)
└── app.css                  # Tailwind + theme variables
```

## Design System

### Color Palette (CSS Variables)

```css
/* Light mode - Professional blue theme */
--background: oklch(0.99 0 0);
--foreground: oklch(0.15 0 0);
--card: oklch(1 0 0);
--card-foreground: oklch(0.15 0 0);
--primary: oklch(0.55 0.2 250);      /* Blue */
--primary-foreground: oklch(0.98 0 0);
--secondary: oklch(0.95 0 0);
--secondary-foreground: oklch(0.15 0 0);
--muted: oklch(0.95 0 0);
--muted-foreground: oklch(0.55 0 0);
--accent: oklch(0.95 0 0);
--accent-foreground: oklch(0.15 0 0);
--border: oklch(0.90 0 0);
--ring: oklch(0.55 0.2 250);

/* Status colors */
--success: oklch(0.65 0.2 145);
--warning: oklch(0.75 0.2 85);
--destructive: oklch(0.55 0.2 25);
```

### Typography

- **Font:** system-ui stack (Tailwind default)
- **Headings:** font-semibold, tracking-tight
- **Body:** text-sm for secondary text, text-base for primary

### Spacing & Layout

- **Sidebar:** 256px wide, collapsible
- **Header:** 64px tall
- **Content area:** p-6 with max-w-7xl centered
- **Card padding:** p-6
- **Gap between cards:** gap-4 or gap-6

### Components

#### Sidebar
- Fixed left sidebar with logo at top
- Navigation links with icons (Lucide)
- Active state: bg-primary/10 + text-primary
- Hover state: bg-accent
- Collapsible on mobile

#### Header
- Logo/title on left
- Search input (center or right)
- User avatar + dropdown on right
- Notification bell icon

#### Stat Cards
- Icon + label on top
- Large number (text-3xl font-bold)
- Trend indicator (+/- % with color)
- Subtle shadow and border

#### Activity Feed
- Timeline-style list
- User avatar + action + timestamp
- Grouped by date

## Pages & Features

### 1. Dashboard Home (`/`)
**Layout:** Header + Sidebar + Main content

**Content:**
- Welcome message with user name
- 4 stat cards in grid (2x2 on desktop)
  - Total Users (with +X% trend)
  - Active Organizations (with trend)
  - System Health (green/yellow/red indicator)
  - API Calls (this month)
- Recent Activity feed (last 5 activities)
- Quick Actions buttons

### 2. Login Page (`/login`)
**Layout:** Centered card on gradient background

**Content:**
- Logo
- "Welcome back" heading
- Email + password form
- Error message display
- "Sign In" button

### 3. Users Page (`/users`) — Future
### 4. Organizations Page (`/organizations`) — Future
### 5. Settings Page (`/settings`) — Future

## shadcn Components Needed

```
button, card, input, label, badge,
avatar, dropdown-menu, separator,
scroll-area (if available), sheet (mobile sidebar)
```

## What "Beautiful" Means

1. **Consistent spacing** — 4px grid (Tailwind default)
2. **Professional color palette** — Blue primary, neutral grays
3. **Subtle shadows** — `shadow-sm` on cards, `shadow-md` on elevated elements
4. **Rounded corners** — `rounded-lg` on cards, `rounded-full` on avatars
5. **Whitespace** — Generous padding, not cramped
6. **Typography hierarchy** — Clear headings vs body text
7. **Icon consistency** — All Lucide icons at same size (h-4 w-4 or h-5 w-5)
8. **Micro-interactions** — Hover states, focus rings, transitions

## Success Criteria

- [ ] Login page renders with professional styling
- [ ] Dashboard home shows stat cards with mock data
- [ ] Sidebar navigation is visible and interactive
- [ ] Header shows user avatar and sign out
- [ ] Responsive: sidebar collapses on mobile (sheet)
- [ ] All hover/focus states work
- [ ] Build succeeds without errors

## What's NOT in Scope

- Real API integration (mock data only)
- User management CRUD pages
- Organization management pages
- Charts/graphs
- Dark mode
- Real-time updates
- File uploads

## Open Questions

1. **Sidebar pages:** What pages do you want in the sidebar? (Users, Organizations, Settings, something else?)
2. **Real data:** When should we connect to real APIs vs mock data?
3. **Charts:** Do you want any charts/graphs, or just stat cards?
4. **Mobile:** Is responsive design important for the admin dashboard?

---

**Once you review and approve, I'll break this into implementable tasks and start building.**

For now, the immediate next step is:
1. Add more shadcn components (avatar, dropdown-menu, badge)
2. Build proper sidebar with navigation
3. Enhance dashboard home with stat cards
4. Polish the login page styling