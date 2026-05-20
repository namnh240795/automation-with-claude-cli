<script lang="ts">
  import { authStore } from '$lib/stores/auth';
  import { Bell, ChevronDown, LogOut, User, Settings, Search, Moon, HelpCircle } from 'lucide-svelte';
  import { Avatar, Button } from '$lib/components/ui';
  import { cn } from '$lib/utils';
  import type { Page } from '@sveltejs/kit';

  interface Props {
    sidebarCollapsed?: boolean;
    onToggleMobileSidebar?: () => void;
    mobileSidebarOpen?: boolean;
    currentPage?: string;
  }

  let {
    sidebarCollapsed = false,
    onToggleMobileSidebar,
    mobileSidebarOpen = false,
    currentPage = 'Dashboard',
  }: Props = $props();

  let showUserMenu = $state(false);
  let searchQuery = $state('');

  const user = $derived(authStore.state.user);
  const isAuthenticated = $derived(authStore.state.isAuthenticated);

  function getInitials(email: string) {
    return email.slice(0, 2).toUpperCase();
  }

  function handleSignOut() {
    showUserMenu = false;
    authStore.signOut();
  }
</script>

<header
  class="sticky top-0 z-30 flex h-16 items-center justify-between bg-white border-b px-4 sm:px-6 lg:px-8 gap-4"
>
  <!-- Left section: Page title + Mobile menu -->
  <div class="flex items-center gap-3 min-w-0">
    <!-- Mobile hamburger -->
    <button
      onclick={onToggleMobileSidebar}
      class="lg:hidden p-2 -ml-2 rounded-lg hover:bg-slate-100 transition-colors shrink-0"
      aria-label="Toggle menu"
    >
      {#if mobileSidebarOpen}
        <svg class="h-5 w-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      {:else}
        <svg class="h-5 w-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      {/if}
    </button>

    <!-- Page title breadcrumb -->
    <div class="flex items-center gap-2 min-w-0">
      <h1 class="text-base sm:text-lg font-semibold text-slate-900 truncate">{currentPage}</h1>
    </div>
  </div>

  <!-- Center section: Search bar (hidden on small screens) -->
  <div class="hidden md:flex flex-1 max-w-md mx-4">
    <div class="relative w-full">
      <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
      <input
        type="text"
        placeholder="Search..."
        bind:value={searchQuery}
        class="w-full h-9 pl-10 pr-4 rounded-lg border border-slate-200 bg-slate-50 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      />
    </div>
  </div>

  <!-- Right section: Actions -->
  <div class="flex items-center gap-1 sm:gap-2 shrink-0">
    <!-- Help icon (hidden on mobile) -->
    <button
      class="hidden sm:flex p-2 rounded-lg hover:bg-slate-100 transition-colors"
      aria-label="Help"
    >
      <HelpCircle class="h-5 w-5 text-slate-500" />
    </button>

    <!-- Notifications -->
    <button
      class="p-2 rounded-lg hover:bg-slate-100 transition-colors relative"
      aria-label="Notifications"
    >
      <Bell class="h-5 w-5 text-slate-500" />
      <span class="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
    </button>

    <!-- User Menu -->
    {#if isAuthenticated && user}
      <div class="relative ml-2">
        <button
          onclick={() => showUserMenu = !showUserMenu}
          class="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-slate-100 transition-colors"
        >
          <Avatar class="h-8 w-8 bg-gradient-to-br from-blue-500 to-blue-600">
            <span class="text-xs font-medium text-white">{getInitials(user.email)}</span>
          </Avatar>
          <div class="hidden lg:block text-left min-w-0">
            <p class="text-sm font-medium text-slate-900 truncate max-w-[120px]">{user.first_name || user.email}</p>
            <p class="text-xs text-slate-500 truncate max-w-[120px]">{user.email}</p>
          </div>
          <ChevronDown class={cn('h-4 w-4 text-slate-400 shrink-0 transition-transform', showUserMenu && 'rotate-180')} />
        </button>

        {#if showUserMenu}
          <div class="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-lg border overflow-hidden z-50">
            <!-- User info header -->
            <div class="px-4 py-3 bg-slate-50 border-b">
              <p class="text-sm font-medium text-slate-900">{user.first_name || 'User'}</p>
              <p class="text-xs text-slate-500">{user.email}</p>
            </div>

            <!-- Menu items -->
            <div class="py-2">
              <a href="/profile" class="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                <User class="h-4 w-4 text-slate-400" />
                Profile
              </a>
              <a href="/settings" class="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                <Settings class="h-4 w-4 text-slate-400" />
                Settings
              </a>
              <button
                onclick={handleSignOut}
                class="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut class="h-4 w-4" />
                Sign Out
              </button>
            </div>
          </div>
        {/if}
      </div>
    {:else}
      <a
        href="/login"
        class="text-sm font-medium text-blue-600 hover:text-blue-700 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors"
      >
        Sign In
      </a>
    {/if}
  </div>
</header>

<!-- Click outside to close user menu -->
{#if showUserMenu}
  <button
    onclick={() => showUserMenu = false}
    class="fixed inset-0 z-40"
    aria-label="Close menu"
  ></button>
{/if}