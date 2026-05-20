<script lang="ts">
  import type { HTMLHeadingAttributes } from 'svelte';
  import { cn } from '$lib/utils';
  import type { Snippet } from 'svelte';

  let { class: className, children, ...props }: HTMLHeadingAttributes & { children?: Snippet } = $props();
</script>

<h3 class={cn('text-2xl font-semibold leading-none tracking-tight', className)} {...props}>
  {#if children}
    {@render children()}
  {/if}
</h3>