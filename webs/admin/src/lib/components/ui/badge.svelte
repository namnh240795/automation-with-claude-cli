<script lang="ts">
  import type { HTMLAttributes } from 'svelte';
  import { cn } from '$lib/utils';
  import type { Snippet } from 'svelte';

  let {
    class: className,
    variant = 'default',
    children,
    ...props
  }: HTMLAttributes<HTMLSpanElement> & {
    variant?: 'default' | 'secondary' | 'outline' | 'destructive';
    children?: Snippet;
  } = $props();

  const variantClasses = {
    default: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    outline: 'border border-input bg-background',
    destructive: 'bg-destructive text-destructive-foreground',
  };
</script>

<span
  class={cn(
    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
    variantClasses[variant],
    className
  )}
  {...props}
>
  {#if children}
    {@render children()}
  {/if}
</span>