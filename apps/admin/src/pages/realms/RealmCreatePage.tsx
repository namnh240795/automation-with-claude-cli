import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { realmService } from '@/services/realm.service'
import { toast } from 'sonner'

export function RealmCreatePage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    realm: '',
    displayName: '',
    enabled: true,
    registrationAllowed: false,
    loginWithEmailAllowed: true,
    duplicateEmailsAllowed: false,
    resetPasswordAllowed: true,
    editUsernameAllowed: true,
    bruteForceProtected: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.realm.trim()) {
      toast.error('Realm name is required')
      return
    }

    setLoading(true)

    try {
      await realmService.create(formData)
      toast.success('Realm created successfully')
      navigate(`/admin/realms/${formData.realm}`)
    } catch (error: any) {
      toast.error(error.response?.data?.errorMessage || 'Failed to create realm')
    } finally {
      setLoading(false)
    }
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
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create Realm</h1>
          <p className="text-muted-foreground mt-2">
            Create a new Keycloak realm with custom configuration
          </p>
        </div>
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
              <label className="block text-sm font-medium mb-2">
                Realm Name <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.realm}
                onChange={(e) => setFormData({ ...formData, realm: e.target.value })}
                className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="my-realm"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Unique identifier for the realm (lowercase, hyphens allowed)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Display Name</label>
              <input
                type="text"
                value={formData.displayName}
                onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="My Realm"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Human-readable name for the realm
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
                checked={formData.registrationAllowed}
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
                checked={formData.loginWithEmailAllowed}
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
                checked={formData.duplicateEmailsAllowed}
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
                checked={formData.resetPasswordAllowed}
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
                checked={formData.editUsernameAllowed}
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
                <p className="text-xs text-muted-foreground">Enable the realm immediately</p>
              </div>
              <input
                type="checkbox"
                checked={formData.enabled}
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
                checked={formData.bruteForceProtected}
                onChange={(e) => setFormData({ ...formData, bruteForceProtected: e.target.checked })}
                className="w-4 h-4"
              />
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Button type="submit" disabled={loading}>
            <Save className="h-4 w-4 mr-2" />
            {loading ? 'Creating...' : 'Create Realm'}
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
