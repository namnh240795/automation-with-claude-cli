<script lang="ts">
  import { Users, Building2, Activity, BarChart3 } from 'lucide-svelte';
  import { StatCard } from '$lib/components/dashboard';
  import { ActivityFeed } from '$lib/components/dashboard';

  const stats = [
    {
      title: 'Total Users',
      value: '127',
      description: 'Active users',
      trend: { value: 12, positive: true },
      icon: Users,
    },
    {
      title: 'Organizations',
      value: '24',
      description: 'Active organizations',
      trend: { value: 8, positive: true },
      icon: Building2,
    },
    {
      title: 'API Calls',
      value: '12.4K',
      description: 'This month',
      trend: { value: 23, positive: true },
      icon: BarChart3,
    },
    {
      title: 'System Health',
      value: 'Healthy',
      description: 'All systems operational',
      trend: undefined,
      icon: Activity,
    },
  ];

  const activities = [
    {
      id: '1',
      user: 'Sarah Chen',
      email: 'sarah@company.com',
      action: 'created new organization',
      target: 'Acme Corp',
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
    },
    {
      id: '2',
      user: 'Mike Johnson',
      email: 'mike@company.com',
      action: 'invited user',
      target: 'john@newco.com',
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
    },
    {
      id: '3',
      user: 'Lisa Park',
      email: 'lisa@company.com',
      action: 'updated role for',
      target: 'admin@org.com',
      timestamp: new Date(Date.now() - 1000 * 60 * 120),
    },
    {
      id: '4',
      user: 'Tom Wilson',
      email: 'tom@company.com',
      action: 'signed in from',
      target: 'Chrome / macOS',
      timestamp: new Date(Date.now() - 1000 * 60 * 180),
    },
  ];
</script>

<div class="space-y-6">
  <!-- Welcome section -->
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-2xl font-bold text-slate-900">Welcome back</h1>
      <p class="text-slate-600">Here's what's happening with your dashboard.</p>
    </div>
    <div class="text-sm text-slate-500">
      {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
    </div>
  </div>

  <!-- Stats grid -->
  <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    {#each stats as stat}
      <StatCard {...stat} />
    {/each}
  </div>

  <!-- Activity feed -->
  <div class="grid gap-6 lg:grid-cols-2">
    <ActivityFeed title="Recent Activity" {activities} />
    <div class="bg-white rounded-lg border shadow-sm p-6">
      <h3 class="font-semibold text-slate-900 mb-4">Quick Actions</h3>
      <div class="grid gap-3">
        <a href="/users/new" class="flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-300 px-4 py-3 text-sm font-medium text-slate-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
          + Add New User
        </a>
        <a href="/organizations/new" class="flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-300 px-4 py-3 text-sm font-medium text-slate-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
          + Create Organization
        </a>
      </div>
    </div>
  </div>
</div>