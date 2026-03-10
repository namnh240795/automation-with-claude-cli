import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Save, Copy, Key } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { clientService, Client } from '@/services/client.service'
import { toast } from 'sonner'

export function ClientEditPage() {
  const { id: clientId } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [client, setClient] = useState<Client | null>(null)
  const [secret, setSecret] = useState<string>('')
  const [activeTab, setActiveTab] = useState('settings')

  useEffect(() => {
    const loadClient = async () => {
      if (!clientId) return

      try {
        const response = await clientService.get('master', clientId)
        setClient(response.data)

        if (!response.data.publicClient) {
          const secretResponse = await clientService.getClientSecret('master', clientId)
          setSecret(secretResponse.data.value)
        }
      } catch (error) {
        toast.error('Failed to load client')
        navigate('/admin/clients')
      } finally {
        setLoading(false)
      }
    }

    loadClient()
  }, [clientId, navigate])

  const handleSave = async () => {
    if (!client || !clientId) return

    setSaving(true)

    try {
      await clientService.update('master', clientId, client)
      toast.success('Client updated successfully')

      const response = await clientService.get('master', clientId)
      setClient(response.data)
    } catch (error: any) {
      toast.error(error.response?.data?.errorMessage || 'Failed to update client')
    } finally {
      setSaving(false)
    }
  }

  const handleRegenerateSecret = async () => {
    if (!clientId) return

    try {
      const response = await clientService.regenerateClientSecret('master', clientId)
      setSecret(response.data.value)
      toast.success('Client secret regenerated successfully')
    } catch (error) {
      toast.error('Failed to regenerate secret')
    }
  }

  const copySecret = () => {
    navigator.clipboard.writeText(secret)
    toast.success('Secret copied to clipboard')
  }

  const tabs = [
    { id: 'settings', label: 'Settings' },
    { id: 'credentials', label: 'Credentials' },
    { id: 'openid', label: 'OpenID Connect', show: client?.protocol === 'openid-connect' },
    { id: 'saml', label: 'SAML', show: client?.protocol === 'saml' },
    { id: 'scopes', label: 'Client Scopes' },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading client...</p>
        </div>
      </div>
    )
  }

  if (!client) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Client not found</p>
      </div>
    )
  }

  const visibleTabs = tabs.filter(t => t.show === undefined || t.show === true)

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/admin/clients')}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">{client.clientId}</h1>
          <p className="text-muted-foreground mt-2">
            {client.name || client.clientId}
          </p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? 'Saving...' : 'Save'}
        </Button>
      </div>

      {/* Tabs */}
      <div className="border-b">
        <nav className="flex gap-4">
          {visibleTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'settings' && (
        <div className="max-w-4xl space-y-6">
          <div className="rounded-lg border bg-card p-6 space-y-4">
            <div>
              <h2 className="text-lg font-semibold">Basic Settings</h2>
              <p className="text-sm text-muted-foreground">Configure basic client properties</p>
            </div>

            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Client ID</label>
                <input
                  type="text"
                  value={client.clientId}
                  disabled
                  className="w-full px-3 py-2 border border-input rounded-md bg-muted disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Client Name</label>
                <input
                  type="text"
                  value={client.name || ''}
                  onChange={(e) => setClient({ ...client, name: e.target.value })}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={client.description || ''}
                  onChange={(e) => setClient({ ...client, description: e.target.value })}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  rows={3}
                />
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-6 space-y-4">
            <div>
              <h2 className="text-lg font-semibold">Capability Config</h2>
              <p className="text-sm text-muted-foreground">Configure client capabilities</p>
            </div>

            <div className="space-y-4">
              <label className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium">Enabled</span>
                </div>
                <input
                  type="checkbox"
                  checked={client.enabled}
                  onChange={(e) => setClient({ ...client, enabled: e.target.checked })}
                  className="w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium">Public Client</span>
                </div>
                <input
                  type="checkbox"
                  checked={client.publicClient}
                  disabled
                  className="w-4 h-4"
                />
              </label>

              {client.protocol === 'openid-connect' && (
                <>
                  <label className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium">Standard Flow</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={client.standardFlowEnabled}
                      onChange={(e) => setClient({ ...client, standardFlowEnabled: e.target.checked })}
                      className="w-4 h-4"
                    />
                  </label>

                  <label className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium">Direct Access Grants</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={client.directAccessGrantsEnabled}
                      onChange={(e) => setClient({ ...client, directAccessGrantsEnabled: e.target.checked })}
                      className="w-4 h-4"
                    />
                  </label>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'credentials' && (
        <div className="max-w-4xl space-y-6">
          <div className="rounded-lg border bg-card p-6 space-y-4">
            <div>
              <h2 className="text-lg font-semibold">Client Credentials</h2>
              <p className="text-sm text-muted-foreground">Manage client authentication credentials</p>
            </div>

            {client.publicClient ? (
              <div className="text-sm text-muted-foreground">
                This is a public client and does not require a secret.
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Client Secret</label>
                  <div className="flex gap-2">
                    <input
                      type={secret ? 'password' : 'text'}
                      value={secret}
                      readOnly
                      className="flex-1 px-3 py-2 border border-input rounded-md bg-muted font-mono text-sm"
                    />
                    <Button type="button" variant="outline" onClick={copySecret}>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                    <Button type="button" variant="outline" onClick={handleRegenerateSecret}>
                      <Key className="h-4 w-4 mr-2" />
                      Regenerate
                    </Button>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  <p><strong>Client Authenticator:</strong> {client.clientAuthenticatorType}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'openid' && client.protocol === 'openid-connect' && (
        <div className="max-w-4xl space-y-6">
          <div className="rounded-lg border bg-card p-6 space-y-4">
            <div>
              <h2 className="text-lg font-semibold">OpenID Connect Configuration</h2>
              <p className="text-sm text-muted-foreground">Configure OIDC-specific settings</p>
            </div>

            <div className="text-sm text-muted-foreground">
              OpenID Connect configuration options would go here.
            </div>
          </div>
        </div>
      )}

      {activeTab === 'scopes' && (
        <div className="max-w-4xl space-y-6">
          <div className="rounded-lg border bg-card p-6 space-y-4">
            <div>
              <h2 className="text-lg font-semibold">Client Scopes</h2>
              <p className="text-sm text-muted-foreground">Configure assigned client scopes</p>
            </div>

            <div className="grid gap-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Default Client Scopes</h3>
                <div className="text-sm text-muted-foreground">
                  {client.defaultClientScopes?.length ? (
                    <ul className="list-disc list-inside">
                      {client.defaultClientScopes.map((scope) => (
                        <li key={scope}>{scope}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>No default client scopes assigned</p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Optional Client Scopes</h3>
                <div className="text-sm text-muted-foreground">
                  {client.optionalClientScopes?.length ? (
                    <ul className="list-disc list-inside">
                      {client.optionalClientScopes.map((scope) => (
                        <li key={scope}>{scope}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>No optional client scopes assigned</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
