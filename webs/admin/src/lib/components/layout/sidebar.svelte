<script lang="ts">
  import { page } from '$app/stores';
  import { cn } from '$lib/utils';
  import { Home, Users, Building2, Settings, FileText, ChevronLeft, ChevronRight } from 'lucide-svelte';

  interface NavItem {
    label: string;
    href: string;
    icon: typeof Home;
  }

  const navItems: NavItem[] = [
    { label: 'Dashboard', href: '/', icon: Home },
    { label: 'Users', href: '/users', icon: Users },
    { label: 'Organizations', href: '/organizations', icon: Building2 },
    { label: 'Audit Logs', href: '/audit-logs', icon: FileText },
    { label: 'Settings', href: '/settings', icon: Settings },
  ];

  let { collapsed = $bindable(false) }: { collapsed?: boolean } = $props();

  function isActive(href: string, pathname: string) {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  }
</script>

<aside
  class={cn(
    'fixed left-0 top-0 bottom-0 z-40 flex flex-col bg-white border-r transition-all duration-300',
    collapsed ? 'w-16' : 'w-64'
  )}
>
  <!-- Logo -->
  <div class="flex h-16 items-center border-b px-4 shrink-0">
    <a href="/" class="flex items-center gap-3">
      <div class="h-9 w-9 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-sm">
        <span class="text-white font-bold text-sm">A</span>
      </div>
      {#if !collapsed}
        <span class="font-semibold text-slate-900 text-lg">Admin</span>
      {/if}
    </a>
  </div>

  <!-- Navigation -->
  <nav class="flex-1 overflow-y-auto py-4 px-3 space-y-1">
    {#each navItems as item}
      {@const active = isActive(item.href, $page.url.pathname)}
      <a
        href={item.href}
        class={cn(
          'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
          active
            ? 'bg-blue-50 text-blue-700 shadow-sm'
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
          collapsed && 'justify-center px-0 py-3'
        )}
        title={collapsed ? item.label : undefined}
      >
        <item.icon
          class={cn(
            'h-5 w-5 shrink-0',
            active ? 'text-blue-600' : 'text-slate-400'
          )}
        />
        {#if !collapsed}
          <span>{item.label}</span>
        {/if}
      </a>
    {/each}
  </nav>

  <!-- Collapse toggle at bottom -->
  <div class="border-t p-3 shrink-0">
    <button
      onclick={() => collapsed = !collapsed}
      class={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors w-full',
        'text-slate-500 hover:bg-slate-100 hover:text-slate-700',
        collapsed && 'justify-center px-0'
      )}
    >
      {#if collapsed}
        <ChevronRight class="h-5 w-5" />
      {:else}
        <ChevronLeft class="h-5 w-5" />
        <span>Collapse</span>
      {/if}
    </button>
  </div>
</aside>