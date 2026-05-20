<script lang="ts">
  import type { HTMLDivAttributes } from 'svelte';
  import { cn } from '$lib/utils';
  import type { Snippet } from 'svelte';

  let { class: className, children, ...props }: HTMLDivAttributes & { children?: Snippet } = $props();
</script>

<div class={cn('p-6 pt-0', className)} {...props}>
  {#if children}
    {@render children()}
  {/if}
</div>