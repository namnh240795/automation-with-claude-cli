<script lang="ts">
  import { TrendingUp, TrendingDown } from 'lucide-svelte';
  import { Card, CardContent } from '$lib/components/ui';
  import { cn } from '$lib/utils';
  import type { Snippet } from 'svelte';
  import type { Component } from 'svelte';

  interface Props {
    title: string;
    value: string | number;
    description?: string;
    trend?: {
      value: number;
      positive: boolean;
    };
    icon?: Component;
    class?: string;
  }

  let {
    title,
    value,
    description,
    trend,
    icon: Icon,
    class: className,
  }: Props = $props();
</script>

<Card class={cn('relative overflow-hidden', className)}>
  <CardContent class="p-6">
    <div class="flex items-start justify-between">
      <div class="space-y-2">
        <p class="text-sm font-medium text-slate-600">{title}</p>
        <p class="text-3xl font-bold text-slate-900">{value}</p>
        {#if description}
          <p class="text-xs text-slate-500">{description}</p>
        {/if}
        {#if trend}
          <div class={cn(
            'flex items-center gap-1 text-xs font-medium',
            trend.positive ? 'text-green-600' : 'text-red-600'
          )}>
            {#if trend.positive}
              <TrendingUp class="h-3 w-3" />
            {:else}
              <TrendingDown class="h-3 w-3" />
            {/if}
            <span>{trend.value}%</span>
            <span class="text-slate-500 font-normal">vs last month</span>
          </div>
        {/if}
      </div>

      {#if Icon}
        <div class="rounded-lg bg-blue-50 p-3">
          <Icon class="h-6 w-6 text-blue-600" />
        </div>
      {/if}
    </div>
  </CardContent>
</Card>