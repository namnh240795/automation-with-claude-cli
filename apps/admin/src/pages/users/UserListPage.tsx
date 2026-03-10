import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Power, PowerOff, Search, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/data-table/DataTable'
import { userService, User } from '@/services/user.service'
import { useDataQuery } from '@/hooks/useDataQuery'
import { ColumnDef } from '@tanstack/react-table'
import { useConfirmDialog } from '@/components/modals/ConfirmDialog'
import { toast } from 'sonner'
import { formatDate } from '@/lib/utils'

export function UserListPage() {
  const { ConfirmDialog, confirm } = useConfirmDialog()
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)
  const [pageSize] = useState(20)
  const [realm] = useState('master')

  const { data: users = [], isLoading, refetch } = useDataQuery<User[]>({
    queryFn: async () => {
      const response = await userService.list(realm, {
        first: page * pageSize,
        max: pageSize,
        search: search || undefined,
      })
      return response.data
    },
    enabled: true,
  })

  const handleToggleEnabled = async (user: User) => {
    const confirmed = await confirm({
      title: `${user.enabled ? 'Disable' : 'Enable'} User`,
      description: `Are you sure you want to ${user.enabled ? 'disable' : 'enable'} the user "${user.username}"?`,
      variant: 'default',
      onConfirm: async () => {
        await userService.update(realm, user.id, { enabled: !user.enabled })
        toast.success(`User "${user.username}" ${user.enabled ? 'disabled' : 'enabled'} successfully`)
        refetch()
      },
    })

    if (confirmed) {
      refetch()
    }
  }

  const handleDelete = async (user: User) => {
    const confirmed = await confirm({
      title: 'Delete User',
      description: `Are you sure you want to delete the user "${user.username}"? This action cannot be undone.`,
      variant: 'destructive',
      onConfirm: async () => {
        await userService.delete(realm, user.id)
        toast.success(`User "${user.username}" deleted successfully`)
        refetch()
      },
    })

    if (confirmed) {
      refetch()
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPage(0)
    refetch()
  }

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: 'username',
      header: 'Username',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-xs font-medium text-primary">
              {row.original.username.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <span className="font-medium">{row.original.username}</span>
            {!row.original.enabled && (
              <span className="ml-2 text-xs text-muted-foreground">(Disabled)</span>
            )}
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }) => (
        <div>
          <span>{row.original.email || '-'}</span>
          {row.original.email && row.original.emailVerified && (
            <span className="ml-2 text-xs text-green-600">✓ Verified</span>
          )}
        </div>
      ),
    },
    {
      accessorKey: 'firstName',
      header: 'Name',
      cell: ({ row }) => {
        const firstName = row.original.firstName || ''
        const lastName = row.original.lastName || ''
        const fullName = [firstName, lastName].filter(Boolean).join(' ')
        return fullName || '-'
      },
    },
    {
      accessorKey: 'enabled',
      header: 'Status',
      cell: ({ row }) => (
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
          row.original.enabled
            ? 'bg-green-100 text-green-800'
            : 'bg-gray-100 text-gray-800'
        }`}>
          {row.original.enabled ? 'Active' : 'Disabled'}
        </span>
      ),
    },
    {
      accessorKey: 'createdTimestamp',
      header: 'Created',
      cell: ({ row }) =>
        row.original.createdTimestamp
          ? formatDate(new Date(row.original.createdTimestamp))
          : '-',
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => window.location.href = `/admin/users/${row.original.id}`}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleToggleEnabled(row.original)}
          >
            {row.original.enabled ? (
              <PowerOff className="h-4 w-4" />
            ) : (
              <Power className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleDelete(row.original)}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Users</h1>
            <p className="text-muted-foreground mt-2">
              Manage user accounts and permissions
            </p>
          </div>
          <Button onClick={() => window.location.href = '/admin/users/new'}>
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex items-center gap-4">
          <form onSubmit={handleSearch} className="flex-1 flex gap-2">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search users by username, email, or name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              />
            </div>
            <Button type="submit" variant="outline">
              Search
            </Button>
          </form>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Users Table */}
        <div className="rounded-lg border bg-card">
          <DataTable
            columns={columns}
            data={users}
            isLoading={isLoading}
            pageSize={pageSize}
            onRowClick={(user) => window.location.href = `/admin/users/${user.id}`}
          />
        </div>
      </div>

      <ConfirmDialog />
    </>
  )
}
