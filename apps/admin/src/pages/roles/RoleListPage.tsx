import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Shield, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/data-table/DataTable'
import { roleService, Role } from '@/services/role.service'
import { useDataQuery } from '@/hooks/useDataQuery'
import { ColumnDef } from '@tanstack/react-table'
import { useConfirmDialog } from '@/components/modals/ConfirmDialog'
import { toast } from 'sonner'

export function RoleListPage() {
  const { ConfirmDialog, confirm } = useConfirmDialog()
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)
  const [pageSize] = useState(20)
  const [realm] = useState('master')

  const { data: roles = [], isLoading, refetch } = useDataQuery<Role[]>({
    queryFn: async () => {
      const response = await roleService.listRealmRoles(realm, {
        first: page * pageSize,
        max: pageSize,
        search: search || undefined,
      })
      return response.data
    },
    enabled: true,
  })

  const handleDelete = async (role: Role) => {
    const confirmed = await confirm({
      title: 'Delete Role',
      description: `Are you sure you want to delete the role "${role.name}"? This action cannot be undone.`,
      variant: 'destructive',
      onConfirm: async () => {
        await roleService.deleteRealmRole(realm, role.name)
        toast.success(`Role "${role.name}" deleted successfully`)
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

  const columns: ColumnDef<Role>[] = [
    {
      accessorKey: 'name',
      header: 'Role Name',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-purple-100 flex items-center justify-center">
            <Shield className="h-4 w-4 text-purple-600" />
          </div>
          <div>
            <span className="font-medium">{row.original.name}</span>
            {row.original.composite && (
              <span className="ml-2 text-xs text-purple-600">(Composite)</span>
            )}
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'description',
      header: 'Description',
      cell: ({ row }) => row.original.description || '-',
    },
    {
      accessorKey: 'composite',
      header: 'Type',
      cell: ({ row }) => (
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
          row.original.composite
            ? 'bg-purple-100 text-purple-800'
            : 'bg-gray-100 text-gray-800'
        }`}>
          {row.original.composite ? 'Composite' : 'Simple'}
        </span>
      ),
    },
    {
      accessorKey: 'containerId',
      header: 'Scope',
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">Realm</span>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => window.location.href = `/admin/roles/${encodeURIComponent(row.original.name)}`}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => window.location.href = `/admin/roles/${encodeURIComponent(row.original.name)}/users`}
          >
            <Users className="h-4 w-4" />
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
            <h1 className="text-3xl font-bold tracking-tight">Roles</h1>
            <p className="text-muted-foreground mt-2">
              Manage realm roles and permissions
            </p>
          </div>
          <Button onClick={() => window.location.href = '/admin/roles/new'}>
            <Plus className="h-4 w-4 mr-2" />
            Add Role
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Roles</p>
                <p className="text-2xl font-bold mt-1">{roles.length}</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Composite Roles</p>
                <p className="text-2xl font-bold mt-1">
                  {roles.filter(r => r.composite).length}
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Simple Roles</p>
                <p className="text-2xl font-bold mt-1">
                  {roles.filter(r => !r.composite).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center gap-4">
          <form onSubmit={handleSearch} className="flex-1 flex gap-2">
            <input
              type="search"
              placeholder="Search roles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 max-w-md px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            />
            <Button type="submit" variant="outline">
              Search
            </Button>
          </form>
        </div>

        {/* Roles Table */}
        <div className="rounded-lg border bg-card">
          <DataTable
            columns={columns}
            data={roles}
            isLoading={isLoading}
            pageSize={pageSize}
            onRowClick={(role) => window.location.href = `/admin/roles/${encodeURIComponent(role.name)}`}
          />
        </div>
      </div>

      <ConfirmDialog />
    </>
  )
}
