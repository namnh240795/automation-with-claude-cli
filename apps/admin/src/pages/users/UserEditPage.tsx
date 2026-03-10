import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Save, Key, Shield, Users, Clock, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { userService, User, UserRepresentation } from '@/services/user.service'
import { useConfirmDialog } from '@/components/modals/ConfirmDialog'
import { toast } from 'sonner'
import { formatDateTime } from '@/lib/utils'

export function UserEditPage() {
  const { id: userId } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { ConfirmDialog, confirm } = useConfirmDialog()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [sessions, setSessions] = useState<any[]>([])
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    enabled: true,
    emailVerified: false,
  })

  useEffect(() => {
    const loadData = async () => {
      if (!userId) return

      try {
        const [userResponse, sessionsResponse] = await Promise.all([
          userService.get('master', userId),
          userService.getSessions('master', userId),
        ])
        setUser(userResponse.data)
        setSessions(sessionsResponse.data || [])

        setFormData({
          username: userResponse.data.username || '',
          email: userResponse.data.email || '',
          firstName: userResponse.data.firstName || '',
          lastName: userResponse.data.lastName || '',
          enabled: userResponse.data.enabled || false,
          emailVerified: userResponse.data.emailVerified || false,
        })
      } catch (error) {
        toast.error('Failed to load user')
        navigate('/admin/users')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [userId, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!userId) return

    setSaving(true)

    try {
      const userData: UserRepresentation = {
        username: formData.username,
        email: formData.email,
        firstName: formData.firstName || undefined,
        lastName: formData.lastName || undefined,
        enabled: formData.enabled,
        emailVerified: formData.emailVerified,
      }

      await userService.update('master', userId, userData)
      toast.success('User updated successfully')

      // Reload user data
      const response = await userService.get('master', userId)
      setUser(response.data)
    } catch (error: any) {
      toast.error(error.response?.data?.errorMessage || 'Failed to update user')
    } finally {
      setSaving(false)
    }
  }

  const handleLogout = async () => {
    const confirmed = await confirm({
      title: 'Logout User',
      description: 'Are you sure you want to logout this user from all sessions?',
      variant: 'default',
      onConfirm: async () => {
        if (!userId) return
        await userService.logout('master', userId)
        toast.success('User logged out successfully')
        setSessions([])
      },
    })
  }

  const handleDelete = async () => {
    const confirmed = await confirm({
      title: 'Delete User',
      description: `Are you sure you want to delete the user "${user?.username}"? This action cannot be undone.`,
      variant: 'destructive',
      onConfirm: async () => {
        if (!userId) return
        await userService.delete('master', userId)
        toast.success('User deleted successfully')
        navigate('/admin/users')
      },
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading user...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">User not found</p>
      </div>
    )
  }

  return (
    <>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/admin/users')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight">{user.username}</h1>
            <p className="text-muted-foreground mt-2">
              {user.email || 'No email'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout All Sessions
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete User
            </Button>
          </div>
        </div>

        {/* User Info Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-medium text-primary">
                  {user.username.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium">{user.username}</p>
                <p className="text-xs text-muted-foreground">Username</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-xs text-green-600">
                  {user.enabled ? '✓' : '✗'}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium">{user.enabled ? 'Active' : 'Disabled'}</p>
                <p className="text-xs text-muted-foreground">Status</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium">{sessions.length} sessions</p>
                <p className="text-xs text-muted-foreground">Active Sessions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-w-3xl space-y-8">
          {/* Basic Information */}
          <div className="rounded-lg border bg-card p-6 space-y-4">
            <div>
              <h2 className="text-lg font-semibold">Basic Information</h2>
              <p className="text-sm text-muted-foreground">Update the user's basic details</p>
            </div>

            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Username <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">First Name</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Last Name</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Account Status */}
          <div className="rounded-lg border bg-card p-6 space-y-4">
            <div>
              <h2 className="text-lg font-semibold">Account Status</h2>
              <p className="text-sm text-muted-foreground">Configure the user's account status</p>
            </div>

            <div className="space-y-4">
              <label className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium">Enabled</span>
                  <p className="text-xs text-muted-foreground">User can login and access the system</p>
                </div>
                <input
                  type="checkbox"
                  checked={formData.enabled}
                  onChange={(e) => setFormData({ ...formData, enabled: e.target.checked })}
                  className="w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium">Email Verified</span>
                  <p className="text-xs text-muted-foreground">Mark the user's email as verified</p>
                </div>
                <input
                  type="checkbox"
                  checked={formData.emailVerified}
                  onChange={(e) => setFormData({ ...formData, emailVerified: e.target.checked })}
                  className="w-4 h-4"
                />
              </label>
            </div>
          </div>

          {/* Metadata */}
          {user.createdTimestamp && (
            <div className="rounded-lg border bg-card p-6 space-y-4">
              <div>
                <h2 className="text-lg font-semibold">Account Information</h2>
                <p className="text-sm text-muted-foreground">User account metadata</p>
              </div>

              <div className="grid gap-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">User ID:</span>
                  <span className="font-mono text-xs">{user.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created:</span>
                  <span>{formatDateTime(new Date(user.createdTimestamp))}</span>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Button type="submit" disabled={saving}>
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/users')}
            >
              Cancel
            </Button>
          </div>
        </form>

        {/* Active Sessions */}
        {sessions.length > 0 && (
          <div className="rounded-lg border bg-card p-6 space-y-4">
            <div>
              <h2 className="text-lg font-semibold">Active Sessions</h2>
              <p className="text-sm text-muted-foreground">User's current active sessions</p>
            </div>

            <div className="space-y-3">
              {sessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <p className="text-sm font-medium">{session.clients?.[0]?.client || 'Unknown Client'}</p>
                    <p className="text-xs text-muted-foreground">
                      {session.ipAddress && `IP: ${session.ipAddress}`}
                      {session.lastAccess && ` • Last seen: ${formatDateTime(new Date(session.lastAccess))}`}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Button
            variant="outline"
            className="h-auto py-4 flex-col gap-2"
            onClick={() => navigate(`/admin/users/${userId}/roles`)}
          >
            <Shield className="h-5 w-5" />
            <span>Role Mappings</span>
          </Button>
          <Button
            variant="outline"
            className="h-auto py-4 flex-col gap-2"
            onClick={() => navigate(`/admin/users/${userId}/groups`)}
          >
            <Users className="h-5 w-5" />
            <span>Groups</span>
          </Button>
          <Button
            variant="outline"
            className="h-auto py-4 flex-col gap-2"
            onClick={() => navigate(`/admin/users/${userId}/credentials`)}
          >
            <Key className="h-5 w-5" />
            <span>Credentials</span>
          </Button>
          <Button
            variant="outline"
            className="h-auto py-4 flex-col gap-2"
            onClick={() => navigate(`/admin/users/${userId}/sessions`)}
          >
            <Clock className="h-5 w-5" />
            <span>Sessions</span>
          </Button>
        </div>
      </div>

      <ConfirmDialog />
    </>
  )
}
