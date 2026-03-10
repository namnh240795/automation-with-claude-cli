import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Save, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { realmService, Realm } from '@/services/realm.service'
import { toast } from 'sonner'

export function RealmEditPage() {
  const { realm: realmName } = useParams<{ realm: string }>()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState<Partial<Realm>>({})

  useEffect(() => {
    const loadRealm = async () => {
      if (!realmName) return

      try {
        const response = await realmService.get(realmName)
        setFormData(response.data)
      } catch (error: any) {
        toast.error('Failed to load realm')
        navigate('/admin/realms')
      } finally {
        setLoading(false)
      }
    }

    loadRealm()
  }, [realmName, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!realmName) return

    setSaving(true)

    try {
      await realmService.update(realmName, formData)
      toast.success('Realm updated successfully')
    } catch (error: any) {
      toast.error(error.response?.data?.errorMessage || 'Failed to update realm')
    } finally {
      setSaving(false)
    }
  }

  const handleClearCache = async (cacheType: 'realm' | 'keys' | 'users') => {
    if (!realmName) return

    try {
      switch (cacheType) {
        case 'realm':
          await realmService.clearRealmCache(realmName)
          break
        case 'keys':
          await realmService.clearKeysCache(realmName)
          break
        case 'users':
          await realmService.clearUserCache(realmName)
          break
      }
      toast.success(`${cacheType} cache cleared successfully`)
    } catch (error) {
      toast.error(`Failed to clear ${cacheType} cache`)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading realm...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/admin/realms')}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">{realmName}</h1>
          <p className="text-muted-foreground mt-2">
            Configure realm settings and options
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={() => handleClearCache('realm')}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Clear Realm Cache
        </Button>
        <Button
          variant="outline"
          onClick={() => handleClearCache('keys')}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Clear Keys Cache
        </Button>
        <Button
          variant="outline"
          onClick={() => handleClearCache('users')}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Clear User Cache
        </Button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-3xl space-y-8">
        {/* Basic Settings */}
        <div className="rounded-lg border bg-card p-6 space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Basic Settings</h2>
            <p className="text-sm text-muted-foreground">Configure basic realm properties</p>
          </div>

          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Realm Name</label>
              <input
                type="text"
                value={formData.realm || ''}
                disabled
                className="w-full px-3 py-2 border border-input rounded-md bg-muted disabled:opacity-50"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Realm name cannot be changed
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Display Name</label>
              <input
                type="text"
                value={formData.displayName || ''}
                onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">HTML Display Name</label>
              <input
                type="text"
                value={formData.displayNameHtml || ''}
                onChange={(e) => setFormData({ ...formData, displayNameHtml: e.target.value })}
                className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <p className="text-xs text-muted-foreground mt-1">
                HTML display name for the realm
              </p>
            </div>
          </div>
        </div>

        {/* Login Settings */}
        <div className="rounded-lg border bg-card p-6 space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Login Settings</h2>
            <p className="text-sm text-muted-foreground">Configure login and authentication options</p>
          </div>

          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium">User Registration</span>
                <p className="text-xs text-muted-foreground">Allow users to register new accounts</p>
              </div>
              <input
                type="checkbox"
                checked={formData.registrationAllowed || false}
                onChange={(e) => setFormData({ ...formData, registrationAllowed: e.target.checked })}
                className="w-4 h-4"
              />
            </label>

            <label className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium">Email Login</span>
                <p className="text-xs text-muted-foreground">Allow users to login with email</p>
              </div>
              <input
                type="checkbox"
                checked={formData.loginWithEmailAllowed || false}
                onChange={(e) => setFormData({ ...formData, loginWithEmailAllowed: e.target.checked })}
                className="w-4 h-4"
              />
            </label>

            <label className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium">Duplicate Emails</span>
                <p className="text-xs text-muted-foreground">Allow multiple users with same email</p>
              </div>
              <input
                type="checkbox"
                checked={formData.duplicateEmailsAllowed || false}
                onChange={(e) => setFormData({ ...formData, duplicateEmailsAllowed: e.target.checked })}
                className="w-4 h-4"
              />
            </label>

            <label className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium">Forgot Password</span>
                <p className="text-xs text-muted-foreground">Allow users to reset their password</p>
              </div>
              <input
                type="checkbox"
                checked={formData.resetPasswordAllowed || false}
                onChange={(e) => setFormData({ ...formData, resetPasswordAllowed: e.target.checked })}
                className="w-4 h-4"
              />
            </label>

            <label className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium">Edit Username</span>
                <p className="text-xs text-muted-foreground">Allow users to change their username</p>
              </div>
              <input
                type="checkbox"
                checked={formData.editUsernameAllowed || false}
                onChange={(e) => setFormData({ ...formData, editUsernameAllowed: e.target.checked })}
                className="w-4 h-4"
              />
            </label>
          </div>
        </div>

        {/* Security Settings */}
        <div className="rounded-lg border bg-card p-6 space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Security Settings</h2>
            <p className="text-sm text-muted-foreground">Configure security and protection options</p>
          </div>

          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium">Enabled</span>
                <p className="text-xs text-muted-foreground">Enable the realm</p>
              </div>
              <input
                type="checkbox"
                checked={formData.enabled || false}
                onChange={(e) => setFormData({ ...formData, enabled: e.target.checked })}
                className="w-4 h-4"
              />
            </label>

            <label className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium">Brute Force Protection</span>
                <p className="text-xs text-muted-foreground">Protect against brute force attacks</p>
              </div>
              <input
                type="checkbox"
                checked={formData.bruteForceProtected || false}
                onChange={(e) => setFormData({ ...formData, bruteForceProtected: e.target.checked })}
                className="w-4 h-4"
              />
            </label>

            <div>
              <label className="block text-sm font-medium mb-2">SSL Required</label>
              <select
                value={formData.sslRequired || 'external'}
                onChange={(e) => setFormData({ ...formData, sslRequired: e.target.value })}
                className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="external">External (requests only)</option>
                <option value="all">All (requests)</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Button type="submit" disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/admin/realms')}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
