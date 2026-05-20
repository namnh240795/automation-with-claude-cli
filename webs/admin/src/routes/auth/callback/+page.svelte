<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { authStore } from '$lib/stores/auth';

  let error = $state('');

  onMount(async () => {
    const code = $page.url.searchParams.get('code');
    const state = $page.url.searchParams.get('state');

    if (!code) {
      error = 'No authorization code received';
      return;
    }

    try {
      // For now, redirect to login with code for manual handling
      // In a real OAuth flow, you'd exchange the code for tokens here
      await goto('/');
    } catch (err) {
      error = err instanceof Error ? err.message : 'Authentication failed';
    }
  });
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-50">
  <div class="text-center">
    {#if error}
      <p class="text-destructive">{error}</p>
    {:else}
      <p>Processing authentication...</p>
    {/if}
  </div>
</div>