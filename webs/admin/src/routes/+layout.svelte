<script lang="ts">
  import '../app.css';
  import type { Snippet } from 'svelte';
  import { Sidebar, Header } from '$lib/components/layout';
  import { cn } from '$lib/utils';
  import { X } from 'lucide-svelte';

  interface Props {
    children: Snippet;
  }

  let { children }: Props = $props();
  let sidebarCollapsed = $state(false);
  let mobileSidebarOpen = $state(false);

  function toggleMobileSidebar() {
    mobileSidebarOpen = !mobileSidebarOpen;
  }

  function closeMobileSidebar() {
    mobileSidebarOpen = false;
  }
</script>

<div class="flex h-screen overflow-hidden bg-slate-50">
  <!-- Desktop Sidebar (fixed, hidden on mobile) -->
  <div class="hidden lg:block">
    <Sidebar bind:collapsed={sidebarCollapsed} />
  </div>

  <!-- Mobile Sidebar Overlay -->
  {#if mobileSidebarOpen}
    <!-- Backdrop -->
    <button
      onclick={closeMobileSidebar}
      class="fixed inset-0 z-40 bg-black/50 lg:hidden"
      aria-label="Close sidebar"
    ></button>

    <!-- Mobile Sidebar -->
    <div class="fixed inset-y-0 left-0 z-50 lg:hidden">
      <Sidebar bind:collapsed={mobileSidebarOpen} />

      <!-- Close button inside mobile sidebar -->
      <button
        onclick={closeMobileSidebar}
        class="absolute top-4 right-4 p-2 rounded-lg bg-white shadow-md hover:bg-slate-100"
        aria-label="Close sidebar"
      >
        <X class="h-5 w-5 text-slate-600" />
      </button>
    </div>
  {/if}

  <!-- Main area -->
  <div
    class={cn(
      'flex flex-1 flex-col transition-all duration-300',
      'lg:ml-0',
      sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
    )}
  >
    <!-- Header -->
    <Header
      {sidebarCollapsed}
      onToggleMobileSidebar={toggleMobileSidebar}
      {mobileSidebarOpen}
    />

    <!-- Content -->
    <main class="flex-1 overflow-y-auto">
      <div class="p-4 sm:p-6 lg:p-8">
        <div class="mx-auto max-w-7xl">
          {@render children()}
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="border-t bg-white px-4 sm:px-6 lg:px-8 py-4 shrink-0">
      <div class="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-2 text-xs sm:text-sm text-slate-500">
        <p>© 2024 Admin Dashboard. All rights reserved.</p>
        <p>Version 1.0.0</p>
      </div>
    </footer>
  </div>
</div>