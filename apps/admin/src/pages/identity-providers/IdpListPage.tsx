import { useState } from 'react'
import { Plus, Edit, Trash2, Power, PowerOff, Key } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/data-table/DataTable'
import { ColumnDef } from '@tanstack/react-table'
import { useConfirmDialog } from '@/components/modals/ConfirmDialog'
import { toast } from 'sonner'

// Mock identity provider data (in real implementation, fetch from API)
interface IdentityProvider {
  id: string
  alias: string
  displayName: string
  providerId: string
  enabled: boolean
  trustEmail: boolean
  firstLoginFlow: string
  storeToken: boolean
  addReadTokenRoleOnCreate: boolean
  authenticateByDefault: boolean
  linkOnly: boolean
}

const mockProviders: IdentityProvider[] = [
  {
    id: '1',
    alias: 'google',
    displayName: 'Google',
    providerId: 'google',
    enabled: true,
    trustEmail: true,
    firstLoginFlow: 'first-broker-login',
    storeToken: false,
    addReadTokenRoleOnCreate: false,
    authenticateByDefault: false,
    linkOnly: false,
  },
  {
    id: '2',
    alias: 'github',
    displayName: 'GitHub',
    providerId: 'github',
    enabled: true,
    trustEmail: true,
    firstLoginFlow: 'first-broker-login',
    storeToken: false,
    addReadTokenRoleOnCreate: false,
    authenticateByDefault: false,
    linkOnly: false,
  },
  {
    id: '3',
    alias: 'oidc',
    displayName: 'OpenID Connect',
    providerId: 'oidc',
    enabled: false,
    trustEmail: false,
    firstLoginFlow: 'first-broker-login',
    storeToken: false,
    addReadTokenRoleOnCreate: false,
    authenticateByDefault: false,
    linkOnly: false,
  },
]

export function IdpListPage() {
  const { ConfirmDialog, confirm } = useConfirmDialog()
  const [providers, setProviders] = useState<IdentityProvider[]>(mockProviders)
  const [loading] = useState(false)

  const handleToggleEnabled = async (provider: IdentityProvider) => {
    const confirmed = await confirm({
      title: `${provider.enabled ? 'Disable' : 'Enable'} Identity Provider`,
      description: `Are you sure you want to ${provider.enabled ? 'disable' : 'enable'} the identity provider "${provider.displayName}"?`,
      variant: 'default',
      onConfirm: async () => {
        setProviders(providers.map(p =>
          p.id === provider.id ? { ...p, enabled: !p.enabled } : p
        ))
        toast.success(`Identity provider "${provider.displayName}" ${provider.enabled ? 'disabled' : 'enabled'} successfully`)
      },
    })

    if (confirmed) {
      // Handle confirm
    }
  }

  const handleDelete = async (provider: IdentityProvider) => {
    const confirmed = await confirm({
      title: 'Delete Identity Provider',
      description: `Are you sure you want to delete the identity provider "${provider.displayName}"? This action cannot be undone.`,
      variant: 'destructive',
      onConfirm: async () => {
        setProviders(providers.filter(p => p.id !== provider.id))
        toast.success(`Identity provider "${provider.displayName}" deleted successfully`)
      },
    })

    if (confirmed) {
      // Handle confirm
    }
  }

  const columns: ColumnDef<IdentityProvider>[] = [
    {
      accessorKey: 'displayName',
      header: 'Provider Name',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center">
            <Key className="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <span className="font-medium">{row.original.displayName}</span>
            {!row.original.enabled && (
              <span className="ml-2 text-xs text-muted-foreground">(Disabled)</span>
            )}
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'providerId',
      header: 'Provider Type',
      cell: ({ row }) => {
        let badgeColor = 'bg-gray-100 text-gray-800'
        let label = row.original.providerId.toUpperCase()

        if (row.original.providerId === 'google') {
          badgeColor = 'bg-red-100 text-red-800'
        } else if (row.original.providerId === 'github') {
          badgeColor = 'bg-gray-800 text-white'
        } else if (row.original.providerId === 'oidc') {
          badgeColor = 'bg-orange-100 text-orange-800'
        } else if (row.original.providerId === 'saml') {
          badgeColor = 'bg-purple-100 text-purple-800'
        } else if (row.original.providerId === 'ldap') {
          badgeColor = 'bg-blue-100 text-blue-800'
        }

        return (
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${badgeColor}`}>
            {label}
          </span>
        )
      },
    },
    {
      accessorKey: 'alias',
      header: 'Alias',
      cell: ({ row }) => (
        <code className="text-sm px-2 py-1 rounded bg-muted">
          {row.original.alias}
        </code>
      ),
    },
    {
      accessorKey: 'trustEmail',
      header: 'Trust Email',
      cell: ({ row }) => (
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
          row.original.trustEmail
            ? 'bg-green-100 text-green-800'
            : 'bg-gray-100 text-gray-800'
        }`}>
          {row.original.trustEmail ? 'Yes' : 'No'}
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
            onClick={() => window.location.href = `/admin/identity-providers/${row.original.id}`}
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
            <h1 className="text-3xl font-bold tracking-tight">Identity Providers</h1>
            <p className="text-muted-foreground mt-2">
              Manage external authentication providers
            </p>
          </div>
          <Button onClick={() => window.location.href = '/admin/identity-providers/new'}>
            <Plus className="h-4 w-4 mr-2" />
            Add Provider
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Providers</p>
                <p className="text-2xl font-bold mt-1">{providers.length}</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Enabled</p>
                <p className="text-2xl font-bold mt-1">
                  {providers.filter(p => p.enabled).length}
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Social Providers</p>
                <p className="text-2xl font-bold mt-1">
                  {providers.filter(p => ['google', 'github', 'facebook', 'twitter'].includes(p.providerId)).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Providers Table */}
        <div className="rounded-lg border bg-card">
          <DataTable
            columns={columns}
            data={providers}
            isLoading={loading}
            onRowClick={(provider) => window.location.href = `/admin/identity-providers/${provider.id}`}
          />
        </div>

        {/* Info Card */}
        <div className="rounded-lg border border-blue-200 bg-blue-50 dark:bg-blue-950 p-4">
          <div className="flex gap-3">
            <Key className="h-5 w-5 text-blue-600 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-blue-900 dark:text-blue-100">About Identity Providers</h3>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                Identity providers allow users to authenticate using external accounts such as Google, GitHub, or enterprise SSO.
                Supported protocols include OpenID Connect, SAML, and LDAP.
              </p>
            </div>
          </div>
        </div>
      </div>

      <ConfirmDialog />
    </>
  )
}
