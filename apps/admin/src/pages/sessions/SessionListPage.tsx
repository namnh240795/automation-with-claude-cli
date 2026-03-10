import { useState } from 'react'
import { Search, RefreshCw, LogOut, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { sessionService, Session } from '@/services/session.service'
import { useDataQuery } from '@/hooks/useDataQuery'
import { useConfirmDialog } from '@/components/modals/ConfirmDialog'
import { toast } from 'sonner'
import { formatDateTime, formatRelativeTime } from '@/lib/utils'

export function SessionListPage() {
  const { ConfirmDialog, confirm } = useConfirmDialog()
  const [realm] = useState('master')
  const [search, setSearch] = useState('')

  const { data: sessions = [], isLoading, refetch } = useDataQuery<Session[]>({
    queryFn: async () => {
      const response = await sessionService.getSessions(realm)
      return response.data
    },
    enabled: true,
  })

  const handleLogoutUser = async (session: Session) => {
    const confirmed = await confirm({
      title: 'Logout User',
      description: `Are you sure you want to logout "${session.username}" from all sessions?`,
      variant: 'default',
      onConfirm: async () => {
        await sessionService.logoutUser(realm, session.id)
        toast.success(`User "${session.username}" logged out successfully`)
        refetch()
      },
    })

    if (confirmed) {
      refetch()
    }
  }

  const handleLogoutAll = async () => {
    const confirmed = await confirm({
      title: 'Logout All Users',
      description: 'Are you sure you want to logout all users from all sessions?',
      variant: 'destructive',
      onConfirm: async () => {
        await sessionService.logoutAll(realm)
        toast.success('All users logged out successfully')
        refetch()
      },
    })

    if (confirmed) {
      refetch()
    }
  }

  const filteredSessions = sessions.filter(session =>
    session.username?.toLowerCase().includes(search.toLowerCase()) ||
    session.ipAddress?.includes(search)
  )

  return (
    <>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Sessions</h1>
            <p className="text-muted-foreground mt-2">
              Manage active user sessions
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => refetch()}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="destructive" onClick={handleLogoutAll}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout All
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
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
                <p className="text-sm font-medium text-muted-foreground">Unique Users</p>
                <p className="text-2xl font-bold mt-1">
                  {new Set(sessions.map(s => s.userId)).size}
                </p>
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

        {/* Search */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search sessions by username or IP..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Sessions List */}
        <div className="rounded-lg border bg-card">
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading sessions...</p>
              </div>
            </div>
          ) : filteredSessions.length === 0 ? (
            <div className="text-center py-16">
              <LogOut className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                {search ? 'No sessions found matching your search' : 'No active sessions'}
              </p>
            </div>
          ) : (
            <div className="divide-y">
              {filteredSessions.map((session) => (
                <div
                  key={session.id}
                  className="p-4 hover:bg-accent transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-medium text-primary">
                            {session.username?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{session.username}</p>
                          <p className="text-xs text-muted-foreground">{session.userId}</p>
                        </div>
                      </div>

                      {session.clients && session.clients.length > 0 && (
                        <div className="space-y-2 ml-13">
                          {session.clients.map((client, idx) => (
                            <div
                              key={`${session.id}-${idx}`}
                              className="flex items-center gap-4 text-sm p-2 rounded bg-muted/50"
                            >
                              <div className="flex-1">
                                <p className="font-medium">{client.clientId}</p>
                                <p className="text-xs text-muted-foreground">
                                  {client.ipAddress && `IP: ${client.ipAddress}`}
                                  {client.start && ` • Started: ${formatRelativeTime(new Date(client.start))}`}
                                </p>
                              </div>
                              {client.lastAccess && (
                                <span className="text-xs text-muted-foreground">
                                  Last active: {formatRelativeTime(new Date(client.lastAccess))}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleLogoutUser(session)}
                    >
                      <LogOut className="h-4 w-4" />
                    </Button>
                  </div>
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
