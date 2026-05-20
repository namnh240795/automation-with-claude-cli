<script lang="ts">
  import type { HTMLDivAttributes } from 'svelte';
  import { cn } from '$lib/utils';
  import type { Snippet } from 'svelte';

  let { class: className, children, ...props }: HTMLDivAttributes & { children?: Snippet } = $props();
</script>

<div class={cn('rounded-xl border bg-card text-card-foreground shadow-sm', className)} {...props}>
  {#if children}
    {@render children()}
  {/if}
</div>