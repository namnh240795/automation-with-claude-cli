<script lang="ts">
  import { Avatar } from '$lib/components/ui';
  import { cn } from '$lib/utils';
  import type { Snippet } from 'svelte';

  interface Activity {
    id: string;
    user: string;
    email: string;
    action: string;
    target?: string;
    timestamp: Date;
  }

  interface Props {
    title?: string;
    activities: Activity[];
    class?: string;
  }

  let {
    title = 'Recent Activity',
    activities,
    class: className,
  }: Props = $props();

  function formatTime(date: Date) {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  }

  function getInitials(email: string) {
    return email.slice(0, 2).toUpperCase();
  }
</script>

<div class={cn('bg-white rounded-lg border shadow-sm', className)}>
  <div class="px-6 py-4 border-b">
    <h3 class="font-semibold text-slate-900">{title}</h3>
  </div>

  <div class="divide-y">
    {#each activities as activity}
      <div class="flex items-start gap-4 px-6 py-4">
        <Avatar class="h-8 w-8 shrink-0">
          <span class="text-xs font-medium text-slate-600">{getInitials(activity.email)}</span>
        </Avatar>
        <div class="flex-1 min-w-0">
          <p class="text-sm text-slate-900">
            <span class="font-medium">{activity.user}</span>
            <span class="text-slate-600"> {activity.action}</span>
            {#if activity.target}
              <span class="font-medium text-blue-600"> {activity.target}</span>
            {/if}
          </p>
          <p class="text-xs text-slate-500">{formatTime(activity.timestamp)}</p>
        </div>
      </div>
    {/each}

    {#if activities.length === 0}
      <div class="px-6 py-8 text-center text-sm text-slate-500">
        No recent activity
      </div>
    {/if}
  </div>
</div>