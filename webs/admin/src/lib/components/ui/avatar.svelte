<script lang="ts">
  import type { HTMLAttributes } from 'svelte';
  import { cn } from '$lib/utils';
  import type { Snippet } from 'svelte';

  let {
    class: className,
    children,
    ...props
  }: HTMLAttributes<HTMLDivElement> & { children?: Snippet } = $props();
</script>

<div
  class={cn('relative flex aspect-square items-center justify-center rounded-full bg-muted', className)}
  {...props}
>
  {#if children}
    {@render children()}
  {:else}
    <span class="text-sm font-medium">?</span>
  {/if}
</div>