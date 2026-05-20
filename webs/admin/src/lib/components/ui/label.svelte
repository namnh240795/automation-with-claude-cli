<script lang="ts">
  import type { HTMLLabelAttributes } from 'svelte';
  import { cn } from '$lib/utils';
  import type { Snippet } from 'svelte';

  let {
    class: className,
    children,
    ...props
  }: HTMLLabelAttributes & { children?: Snippet } = $props();
</script>

<label
  class={cn('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70', className)}
  {...props}
>
  {#if children}
    {@render children()}
  {/if}
</label>