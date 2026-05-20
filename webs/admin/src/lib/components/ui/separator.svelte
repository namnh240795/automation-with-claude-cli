<script lang="ts">
  import type { HTMLAttributes } from 'svelte';
  import { cn } from '$lib/utils';

  let {
    class: className,
    orientation = 'horizontal',
    ...props
  }: HTMLAttributes<HTMLDivElement> & {
    orientation?: 'horizontal' | 'vertical';
  } = $props();
</script>

<div
  class={cn(
    'shrink-0 bg-border',
    orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
    className
  )}
  {...props}
></div>