import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, LogOut, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { sessionService, Session } from '@/services/session.service'
import { userService } from '@/services/user.service'
import { useConfirmDialog } from '@/components/modals/ConfirmDialog'
import { toast } from 'sonner'
import { formatDateTime, formatRelativeTime } from '@/lib/utils'

export function UserSessionsPage() {
  const { id: userId } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { ConfirmDialog, confirm } = useConfirmDialog()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [sessions, setSessions] = useState<Session[]>([])

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
      } catch (error) {
        toast.error('Failed to load user sessions')
        navigate('/admin/sessions')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [userId, navigate])

  const handleLogout = async () => {
    const confirmed = await confirm({
      title: 'Logout User',
      description: `Are you sure you want to logout "${user?.username}" from all sessions?`,
      variant: 'default',
      onConfirm: async () => {
        if (!userId) return
        await sessionService.logoutUser('master', userId)
        toast.success('User logged out successfully')
        setSessions([])
      },
    })

    if (confirmed) {
      setSessions([])
    }
  }

  const handleRevokeOffline = async () => {
    const confirmed = await confirm({
      title: 'Revoke Offline Tokens',
      description: `Are you sure you want to revoke all offline tokens for "${user?.username}"?`,
      variant: 'destructive',
      onConfirm: async () => {
        if (!userId) return
        await sessionService.revokeOfflineToken('master', userId)
        toast.success('Offline tokens revoked successfully')
      },
    })

    if (confirmed) {
      // Refresh sessions
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading sessions...</p>
        </div>
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
            onClick={() => navigate('/admin/sessions')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight">
              {user?.username}'s Sessions
            </h1>
            <p className="text-muted-foreground mt-2">
              Active and offline sessions for this user
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleRevokeOffline}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Revoke Offline Tokens
            </Button>
            <Button variant="destructive" onClick={handleLogout} disabled={sessions.length === 0}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout All
            </Button>
          </div>
        </div>

        {/* User Info */}
        {user && (
          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-lg font-medium text-primary">
                  {user.username?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-medium text-lg">{user.username}</p>
                <p className="text-sm text-muted-foreground">{user.email || 'No email'}</p>
              </div>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Sessions</p>
                <p className="text-2xl font-bold mt-1">{sessions.length}</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Clients</p>
                <p className="text-2xl font-bold mt-1">
                  {new Set(sessions.flatMap(s => s.clients?.map(c => c.clientId) || [])).size}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sessions */}
        <div className="rounded-lg border bg-card">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">Active Sessions</h2>
          </div>

          {sessions.length === 0 ? (
            <div className="text-center py-16">
              <LogOut className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No active sessions for this user</p>
            </div>
          ) : (
            <div className="divide-y">
              {sessions.map((session) => (
                <div key={session.id} className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Session ID</p>
                      <p className="font-mono text-xs">{session.id}</p>
                    </div>
                    {session.start && (
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Started</p>
                        <p className="text-sm">{formatRelativeTime(new Date(session.start))}</p>
                      </div>
                    )}
                  </div>

                  {session.clients && session.clients.length > 0 && (
                    <div className="space-y-2 mt-4">
                      <p className="text-sm font-medium">Client Sessions</p>
                      {session.clients.map((client, idx) => (
                        <div
                          key={`${session.id}-${idx}`}
                          className="p-3 rounded bg-muted/50"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-sm">{client.clientId}</p>
                              <p className="text-xs text-muted-foreground">
                                {client.ipAddress && `IP: ${client.ipAddress}`}
                              </p>
                            </div>
                            {client.lastAccess && (
                              <div className="text-right">
                                <p className="text-xs text-muted-foreground">Last Access</p>
                                <p className="text-sm">{formatDateTime(new Date(client.lastAccess))}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog />
    </>
  )
}
