import { useEffect, useState } from 'react'
import {
  Users,
  Briefcase,
  Activity,
  Globe,
  TrendingUp,
  Clock,
  Shield,
  Settings,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { realmService } from '@/services/realm.service'
import { userService } from '@/services/user.service'
import { clientService } from '@/services/client.service'
import { useKeycloakAdmin } from '@/hooks/useKeycloakAdmin'

interface StatCard {
  title: string
  value: string | number
  description?: string
  icon: React.ComponentType<{ className?: string }>
  trend?: 'up' | 'down' | 'neutral'
}

export function AdminDashboardPage() {
  const { userProfile } = useKeycloakAdmin()
  const [stats, setStats] = useState<StatCard[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [realms, users, clients] = await Promise.all([
          realmService.list().then(res => res.data),
          userService.count('master').then(res => res.data),
          clientService.list('master', { max: 20 }).then(res => res.data),
        ])

        setStats([
          {
            title: 'Total Realms',
            value: realms.length,
            description: `${realms.filter(r => r.enabled).length} enabled`,
            icon: Globe,
            trend: 'neutral',
          },
          {
            title: 'Total Users',
            value: users.toLocaleString(),
            description: 'Across all realms',
            icon: Users,
            trend: 'up',
          },
          {
            title: 'Total Clients',
            value: clients.length,
            description: `${clients.filter(c => c.enabled).length} enabled`,
            icon: Briefcase,
            trend: 'up',
          },
          {
            title: 'Active Sessions',
            value: '0',
            description: 'Currently active',
            icon: Activity,
            trend: 'neutral',
          },
        ])
      } catch (error) {
        console.error('Failed to load dashboard stats:', error)
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [])

  const quickActions = [
    { icon: Users, label: 'Add User', href: '/admin/users/new', color: 'bg-blue-500' },
    { icon: Briefcase, label: 'Add Client', href: '/admin/clients/new', color: 'bg-green-500' },
    { icon: Shield, label: 'Create Role', href: '/admin/roles/new', color: 'bg-purple-500' },
    { icon: Settings, label: 'Settings', href: '/admin/settings', color: 'bg-gray-500' },
  ]

  const recentActivity = [
    { id: 1, action: 'User created', user: 'john.doe', time: '2 minutes ago', type: 'user' },
    { id: 2, action: 'Role updated', user: 'admin', time: '15 minutes ago', type: 'role' },
    { id: 3, action: 'Client modified', user: 'admin', time: '1 hour ago', type: 'client' },
    { id: 4, action: 'User deleted', user: 'admin', time: '2 hours ago', type: 'user' },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back, {userProfile().fullName || userProfile().username}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold mt-2">{stat.value}</p>
                  {stat.description && (
                    <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                  )}
                </div>
                <div className="rounded-full bg-primary/10 p-3">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <a
                key={action.label}
                href={action.href}
                className="flex items-center gap-3 p-4 rounded-lg border hover:bg-accent transition-colors"
              >
                <div className={`rounded-full ${action.color} p-2`}>
                  <Icon className="h-4 w-4 text-white" />
                </div>
                <span className="font-medium">{action.label}</span>
              </a>
            )
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-lg border bg-card shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Recent Activity</h2>
        </div>
        <div className="p-6">
          {recentActivity.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No recent activity</p>
          ) : (
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">
                      by {activity.user} · {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* System Health */}
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">System Health</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex items-center justify-between p-4 rounded-lg border">
            <span className="text-sm font-medium">Keycloak Server</span>
            <span className="flex items-center gap-2 text-sm text-green-600">
              <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
              Online
            </span>
          </div>
          <div className="flex items-center justify-between p-4 rounded-lg border">
            <span className="text-sm font-medium">Database</span>
            <span className="flex items-center gap-2 text-sm text-green-600">
              <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
              Connected
            </span>
          </div>
          <div className="flex items-center justify-between p-4 rounded-lg border">
            <span className="text-sm font-medium">Cache</span>
            <span className="flex items-center gap-2 text-sm text-green-600">
              <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
              Active
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
