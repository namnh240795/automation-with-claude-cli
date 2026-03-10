import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Power, PowerOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/data-table/DataTable'
import { realmService, Realm } from '@/services/realm.service'
import { useDataQuery } from '@/hooks/useDataQuery'
import { ColumnDef } from '@tanstack/react-table'
import { useConfirmDialog } from '@/components/modals/ConfirmDialog'
import { toast } from 'sonner'

export function RealmListPage() {
  const { ConfirmDialog, confirm } = useConfirmDialog()
  const [refreshKey, setRefreshKey] = useState(0)

  const { data: realms = [], isLoading, refetch } = useDataQuery<Realm[]>({
    queryFn: async () => {
      const response = await realmService.list()
      return response.data
    },
    enabled: true,
  })

  const handleToggleEnabled = async (realm: Realm) => {
    const confirmed = await confirm({
      title: `${realm.enabled ? 'Disable' : 'Enable'} Realm`,
      description: `Are you sure you want to ${realm.enabled ? 'disable' : 'enable'} the realm "${realm.realm}"?`,
      variant: 'default',
      onConfirm: async () => {
        await realmService.update(realm.realm, { enabled: !realm.enabled })
        toast.success(`Realm "${realm.realm}" ${realm.enabled ? 'disabled' : 'enabled'} successfully`)
        refetch()
      },
    })

    if (confirmed) {
      refetch()
    }
  }

  const handleDelete = async (realm: Realm) => {
    const confirmed = await confirm({
      title: 'Delete Realm',
      description: `Are you sure you want to delete the realm "${realm.realm}"? This action cannot be undone.`,
      variant: 'destructive',
      onConfirm: async () => {
        await realmService.delete(realm.realm)
        toast.success(`Realm "${realm.realm}" deleted successfully`)
        refetch()
      },
    })

    if (confirmed) {
      refetch()
    }
  }

  const columns: ColumnDef<Realm>[] = [
    {
      accessorKey: 'realm',
      header: 'Realm Name',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <span className="font-medium">{row.original.realm}</span>
          {!row.original.enabled && (
            <span className="text-xs text-muted-foreground">(Disabled)</span>
          )}
        </div>
      ),
    },
    {
      accessorKey: 'displayName',
      header: 'Display Name',
      cell: ({ row }) => row.original.displayName || '-',
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
          {row.original.enabled ? 'Enabled' : 'Disabled'}
        </span>
      ),
    },
    {
      accessorKey: 'registrationAllowed',
      header: 'Registration',
      cell: ({ row }) => (
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
          row.original.registrationAllowed
            ? 'bg-blue-100 text-blue-800'
            : 'bg-gray-100 text-gray-800'
        }`}>
          {row.original.registrationAllowed ? 'Open' : 'Closed'}
        </span>
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
            onClick={() => window.location.href = `/admin/realms/${row.original.realm}`}
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
          {row.original.realm !== 'master' && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDelete(row.original)}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          )}
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
            <h1 className="text-3xl font-bold tracking-tight">Realms</h1>
            <p className="text-muted-foreground mt-2">
              Manage Keycloak realms and their configurations
            </p>
          </div>
          <Button onClick={() => window.location.href = '/admin/realms/new'}>
            <Plus className="h-4 w-4 mr-2" />
            Create Realm
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Realms</p>
                <p className="text-2xl font-bold mt-1">{realms.length}</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Enabled Realms</p>
                <p className="text-2xl font-bold mt-1">{realms.filter(r => r.enabled).length}</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Registration Open</p>
                <p className="text-2xl font-bold mt-1">{realms.filter(r => r.registrationAllowed).length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Realms Table */}
        <div className="rounded-lg border bg-card">
          <DataTable
            columns={columns}
            data={realms}
            isLoading={isLoading}
            onRowClick={(row) => window.location.href = `/admin/realms/${row.realm}`}
          />
        </div>
      </div>

      <ConfirmDialog />
    </>
  )
}
