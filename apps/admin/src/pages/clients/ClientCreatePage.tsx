import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { clientService, Client } from '@/services/client.service'
import { toast } from 'sonner'

export function ClientCreatePage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    clientId: '',
    name: '',
    description: '',
    enabled: true,
    protocol: 'openid-connect' as 'openid-connect' | 'saml',
    publicClient: false,
    standardFlowEnabled: true,
    implicitFlowEnabled: false,
    directAccessGrantsEnabled: true,
    serviceAccountsEnabled: false,
    validRedirectUris: [] as string[],
    webOrigins: [] as string[],
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.clientId.trim()) {
      toast.error('Client ID is required')
      return
    }

    setLoading(true)

    try {
      const clientData: Partial<Client> = {
        clientId: formData.clientId,
        name: formData.name || undefined,
        description: formData.description || undefined,
        enabled: formData.enabled,
        protocol: formData.protocol,
        publicClient: formData.publicClient,
        standardFlowEnabled: formData.standardFlowEnabled,
        implicitFlowEnabled: formData.implicitFlowEnabled,
        directAccessGrantsEnabled: formData.directAccessGrantsEnabled,
        serviceAccountsEnabled: formData.serviceAccountsEnabled,
        redirectUris: formData.validRedirectUris,
        webOrigins: formData.webOrigins,
        fullScopeAllowed: true,
        attributes: {},
      }

      const response = await clientService.create('master', clientData)
      const clientId = response.headers.location?.split('/').pop()
      toast.success('Client created successfully')

      if (clientId) {
        navigate(`/admin/clients/${clientId}`)
      } else {
        navigate('/admin/clients')
      }
    } catch (error: any) {
      toast.error(error.response?.data?.errorMessage || 'Failed to create client')
    } finally {
      setLoading(false)
    }
  }

  const addRedirectUri = () => {
    setFormData({
      ...formData,
      validRedirectUris: [...formData.validRedirectUris, ''],
    })
  }

  const updateRedirectUri = (index: number, value: string) => {
    const newUris = [...formData.validRedirectUris]
    newUris[index] = value
    setFormData({ ...formData, validRedirectUris: newUris })
  }

  const removeRedirectUri = (index: number) => {
    setFormData({
      ...formData,
      validRedirectUris: formData.validRedirectUris.filter((_, i) => i !== index),
    })
  }

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
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create Client</h1>
          <p className="text-muted-foreground mt-2">
            Create a new OAuth/OpenID Connect or SAML client
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-4xl space-y-8">
        {/* Basic Settings */}
        <div className="rounded-lg border bg-card p-6 space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Basic Settings</h2>
            <p className="text-sm text-muted-foreground">Configure basic client properties</p>
          </div>

          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Client ID <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.clientId}
                  onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="my-client"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Unique identifier for the client
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Client Protocol</label>
                <select
                  value={formData.protocol}
                  onChange={(e) => setFormData({ ...formData, protocol: e.target.value as 'openid-connect' | 'saml' })}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="openid-connect">OpenID Connect</option>
                  <option value="saml">SAML</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Client Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="My Application"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                rows={3}
                placeholder="Client description..."
              />
            </div>
          </div>
        </div>

        {/* Capability Config */}
        <div className="rounded-lg border bg-card p-6 space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Capability Config</h2>
            <p className="text-sm text-muted-foreground">Configure client authentication capabilities</p>
          </div>

          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium">Client Authentication</span>
                <p className="text-xs text-muted-foreground">
                  {formData.publicClient ? 'Public client (no secret required)' : 'Confidential client (secret required)'}
                </p>
              </div>
              <input
                type="checkbox"
                checked={formData.publicClient}
                onChange={(e) => setFormData({ ...formData, publicClient: e.target.checked })}
                className="w-4 h-4"
              />
            </label>

            <label className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium">Standard Flow</span>
                <p className="text-xs text-muted-foreground">Authorization Code Flow</p>
              </div>
              <input
                type="checkbox"
                checked={formData.standardFlowEnabled}
                onChange={(e) => setFormData({ ...formData, standardFlowEnabled: e.target.checked })}
                className="w-4 h-4"
              />
            </label>

            <label className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium">Implicit Flow</span>
                <p className="text-xs text-muted-foreground">Implicit Flow (deprecated)</p>
              </div>
              <input
                type="checkbox"
                checked={formData.implicitFlowEnabled}
                onChange={(e) => setFormData({ ...formData, implicitFlowEnabled: e.target.checked })}
                className="w-4 h-4"
              />
            </label>

            <label className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium">Direct Access Grants</span>
                <p className="text-xs text-muted-foreground">Resource Owner Password Credentials</p>
              </div>
              <input
                type="checkbox"
                checked={formData.directAccessGrantsEnabled}
                onChange={(e) => setFormData({ ...formData, directAccessGrantsEnabled: e.target.checked })}
                className="w-4 h-4"
              />
            </label>

            <label className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium">Service Accounts</span>
                <p className="text-xs text-muted-foreground">Enable service account for this client</p>
              </div>
              <input
                type="checkbox"
                checked={formData.serviceAccountsEnabled}
                onChange={(e) => setFormData({ ...formData, serviceAccountsEnabled: e.target.checked })}
                className="w-4 h-4"
              />
            </label>

            <label className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium">Enabled</span>
                <p className="text-xs text-muted-foreground">Enable the client</p>
              </div>
              <input
                type="checkbox"
                checked={formData.enabled}
                onChange={(e) => setFormData({ ...formData, enabled: e.target.checked })}
                className="w-4 h-4"
              />
            </label>
          </div>
        </div>

        {/* Login Settings */}
        <div className="rounded-lg border bg-card p-6 space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Login Settings</h2>
            <p className="text-sm text-muted-foreground">Configure valid redirect URIs and web origins</p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium">Valid Redirect URIs</label>
              <Button type="button" variant="outline" size="sm" onClick={addRedirectUri}>
                Add URI
              </Button>
            </div>
            <div className="space-y-2">
              {formData.validRedirectUris.map((uri, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={uri}
                    onChange={(e) => updateRedirectUri(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                    placeholder="https://example.com/callback"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeRedirectUri(index)}
                  >
                    ×
                  </Button>
                </div>
              ))}
              {formData.validRedirectUris.length === 0 && (
                <p className="text-sm text-muted-foreground">No redirect URIs configured</p>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Use + for valid redirect URIs and patterns, and use * for wildcards.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Web Origins</label>
            <input
              type="text"
              value={formData.webOrigins.join('\n')}
              onChange={(e) => setFormData({ ...formData, webOrigins: e.target.value.split('\n').filter(Boolean) })}
              className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring text-sm"
              placeholder="https://example.com"
              rows={3}
            />
            <p className="text-xs text-muted-foreground mt-1">
              One origin per line. Use + for valid web origins and patterns.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Button type="submit" disabled={loading}>
            <Save className="h-4 w-4 mr-2" />
            {loading ? 'Creating...' : 'Create Client'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/admin/clients')}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
