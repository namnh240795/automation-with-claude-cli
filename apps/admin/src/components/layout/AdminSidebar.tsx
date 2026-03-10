import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Globe,
  Users,
  Briefcase,
  Shield,
  FolderTree,
  Activity,
  Settings,
  LogOut,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { logout, getUsername } from '@/lib/keycloak'
import { usePermissions } from '@/hooks/usePermissions'

interface NavItem {
  path: string
  icon: React.ComponentType<{ className?: string }>
  label: string
  resource: string
  action: string
}

const navItems: NavItem[] = [
  { path: '/admin', icon: LayoutDashboard, label: 'Dashboard', resource: '/admin', action: 'read' },
  { path: '/admin/realms', icon: Globe, label: 'Realms', resource: '/realms', action: 'read' },
  { path: '/admin/users', icon: Users, label: 'Users', resource: '/users', action: 'read' },
  { path: '/admin/clients', icon: Briefcase, label: 'Clients', resource: '/clients', action: 'read' },
  { path: '/admin/roles', icon: Shield, label: 'Roles', resource: '/roles', action: 'read' },
  { path: '/admin/groups', icon: FolderTree, label: 'Groups', resource: '/groups', action: 'read' },
  { path: '/admin/sessions', icon: Activity, label: 'Sessions', resource: '/sessions', action: 'read' },
]

export function AdminSidebar() {
  const location = useLocation()
  const { can } = usePermissions()
  const username = getUsername()

  // Filter navigation items based on permissions
  const visibleNavItems = navItems.filter(item => can(item.resource, item.action))

  const handleLogout = () => {
    logout()
  }

  return (
    <div className="flex flex-col h-full bg-card border-r">
      {/* Logo/Brand */}
      <div className="p-6 border-b">
        <h1 className="text-xl font-bold text-foreground">Keycloak Admin</h1>
        <p className="text-sm text-muted-foreground mt-1">Management Console</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {visibleNavItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive: isNavActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  isNavActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                )
              }
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          )
        })}
      </nav>

      {/* User Info */}
      <div className="p-4 border-t">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-medium text-primary">
              {username.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{username}</p>
            <p className="text-xs text-muted-foreground">Administrator</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  )
}
