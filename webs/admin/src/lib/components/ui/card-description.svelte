<script lang="ts">
  import type { HTMLParagraphAttributes } from 'svelte';
  import { cn } from '$lib/utils';
  import type { Snippet } from 'svelte';

  let { class: className, children, ...props }: HTMLParagraphAttributes & { children?: Snippet } = $props();
</script>

<p class={cn('text-sm text-muted-foreground', className)} {...props}>
  {#if children}
    {@render children()}
  {/if}
</p>