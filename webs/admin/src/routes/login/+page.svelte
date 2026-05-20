<script lang="ts">
  import { goto } from '$app/navigation';
  import { authStore } from '$lib/stores/auth';
  import { Button } from '$lib/components/ui';
  import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '$lib/components/ui';

  let email = $state('');
  let password = $state('');
  let error = $state('');
  let loading = $state(false);

  async function handleSubmit(e: Event) {
    e.preventDefault();
    error = '';
    loading = true;

    try {
      await authStore.signIn(email, password);
      await goto('/');
    } catch (err) {
      error = err instanceof Error ? err.message : 'Invalid email or password';
    } finally {
      loading = false;
    }
  }
</script>

<div class="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
  <Card class="w-full max-w-sm shadow-lg">
    <CardHeader class="space-y-1">
      <CardTitle class="text-xl font-bold">Welcome back</CardTitle>
      <CardDescription>Sign in to access the admin dashboard</CardDescription>
    </CardHeader>
    <CardContent>
      <form onsubmit={handleSubmit} class="space-y-4">
        {#if error}
          <div class="rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-600">
            {error}
          </div>
        {/if}

        <div class="space-y-2">
          <label for="email" class="text-sm font-medium text-slate-700">Email</label>
          <input
            id="email"
            type="email"
            bind:value={email}
            required
            class="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-transparent"
            placeholder="admin@example.com"
            disabled={loading}
          />
        </div>

        <div class="space-y-2">
          <label for="password" class="text-sm font-medium text-slate-700">Password</label>
          <input
            id="password"
            type="password"
            bind:value={password}
            required
            class="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-transparent"
            placeholder="Enter your password"
            disabled={loading}
          />
        </div>

        <Button type="submit" class="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>
    </CardContent>
  </Card>
</div>