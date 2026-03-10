import { useState } from 'react'
import { Plus, Edit, Trash2, Power, PowerOff, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/data-table/DataTable'
import { clientService, Client } from '@/services/client.service'
import { useDataQuery } from '@/hooks/useDataQuery'
import { ColumnDef } from '@tanstack/react-table'
import { useConfirmDialog } from '@/components/modals/ConfirmDialog'
import { toast } from 'sonner'

export function ClientListPage() {
  const { ConfirmDialog, confirm } = useConfirmDialog()
  const [search, setSearch] = useState('')
  const [realm] = useState('master')

  const { data: clients = [], isLoading, refetch } = useDataQuery<Client[]>({
    queryFn: async () => {
      const response = await clientService.list(realm, {
        clientId: search || undefined,
        max: 100,
      })
      return response.data
    },
    enabled: true,
  })

  const handleToggleEnabled = async (client: Client) => {
    const confirmed = await confirm({
      title: `${client.enabled ? 'Disable' : 'Enable'} Client`,
      description: `Are you sure you want to ${client.enabled ? 'disable' : 'enable'} the client "${client.clientId}"?`,
      variant: 'default',
      onConfirm: async () => {
        await clientService.update(realm, client.id, { enabled: !client.enabled })
        toast.success(`Client "${client.clientId}" ${client.enabled ? 'disabled' : 'enabled'} successfully`)
        refetch()
      },
    })

    if (confirmed) {
      refetch()
    }
  }

  const handleDelete = async (client: Client) => {
    const confirmed = await confirm({
      title: 'Delete Client',
      description: `Are you sure you want to delete the client "${client.clientId}"? This action cannot be undone.`,
      variant: 'destructive',
      onConfirm: async () => {
        await clientService.delete(realm, client.id)
        toast.success(`Client "${client.clientId}" deleted successfully`)
        refetch()
      },
    })

    if (confirmed) {
      refetch()
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    refetch()
  }

  const columns: ColumnDef<Client>[] = [
    {
      accessorKey: 'clientId',
      header: 'Client ID',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
            <span className="text-xs font-medium text-primary">
              {row.original.clientId.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <span className="font-medium">{row.original.clientId}</span>
            {!row.original.enabled && (
              <span className="ml-2 text-xs text-muted-foreground">(Disabled)</span>
            )}
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => row.original.name || row.original.clientId,
    },
    {
      accessorKey: 'protocol',
      header: 'Protocol',
      cell: ({ row }) => {
        const protocol = row.original.protocol
        let badgeColor = 'bg-gray-100 text-gray-800'

        if (protocol === 'openid-connect') {
          badgeColor = 'bg-blue-100 text-blue-800'
        } else if (protocol === 'saml') {
          badgeColor = 'bg-purple-100 text-purple-800'
        }

        return (
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${badgeColor}`}>
            {protocol === 'openid-connect' ? 'OIDC' : protocol.toUpperCase()}
          </span>
        )
      },
    },
    {
      accessorKey: 'publicClient',
      header: 'Type',
      cell: ({ row }) => (
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
          row.original.publicClient
            ? 'bg-green-100 text-green-800'
            : 'bg-orange-100 text-orange-800'
        }`}>
          {row.original.publicClient ? 'Public' : 'Confidential'}
        </span>
      ),
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
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => window.location.href = `/admin/clients/${row.original.id}`}
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
            <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
            <p className="text-muted-foreground mt-2">
              Manage OAuth/OpenID Connect and SAML clients
            </p>
          </div>
          <Button onClick={() => window.location.href = '/admin/clients/new'}>
            <Plus className="h-4 w-4 mr-2" />
            Create Client
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Clients</p>
                <p className="text-2xl font-bold mt-1">{clients.length}</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Enabled</p>
                <p className="text-2xl font-bold mt-1">{clients.filter(c => c.enabled).length}</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Public Clients</p>
                <p className="text-2xl font-bold mt-1">{clients.filter(c => c.publicClient).length}</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">OIDC Clients</p>
                <p className="text-2xl font-bold mt-1">
                  {clients.filter(c => c.protocol === 'openid-connect').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center gap-4">
          <form onSubmit={handleSearch} className="flex-1 flex gap-2">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search clients by ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              />
            </div>
            <Button type="submit" variant="outline">
              Search
            </Button>
          </form>
        </div>

        {/* Clients Table */}
        <div className="rounded-lg border bg-card">
          <DataTable
            columns={columns}
            data={clients}
            isLoading={isLoading}
            onRowClick={(client) => window.location.href = `/admin/clients/${client.id}`}
          />
        </div>
      </div>

      <ConfirmDialog />
    </>
  )
}
