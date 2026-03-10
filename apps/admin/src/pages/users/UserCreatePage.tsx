import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Save, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { userService, UserRepresentation } from '@/services/user.service'
import { toast } from 'sonner'

export function UserCreatePage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    enabled: true,
    emailVerified: false,
    password: '',
    temporaryPassword: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.username.trim()) {
      toast.error('Username is required')
      return
    }

    if (!formData.email.trim()) {
      toast.error('Email is required')
      return
    }

    if (!formData.password) {
      toast.error('Password is required')
      return
    }

    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters')
      return
    }

    setLoading(true)

    try {
      const userData: UserRepresentation = {
        username: formData.username,
        email: formData.email,
        firstName: formData.firstName || undefined,
        lastName: formData.lastName || undefined,
        enabled: formData.enabled,
        emailVerified: formData.emailVerified,
        credentials: formData.password ? [{
          type: 'password',
          value: formData.password,
          temporary: formData.temporaryPassword,
        }] : undefined,
      }

      await userService.create('master', userData)
      toast.success('User created successfully')
      navigate('/admin/users')
    } catch (error: any) {
      toast.error(error.response?.data?.errorMessage || 'Failed to create user')
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
          onClick={() => navigate('/admin/users')}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add User</h1>
          <p className="text-muted-foreground mt-2">
            Create a new user account
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-3xl space-y-8">
        {/* Basic Information */}
        <div className="rounded-lg border bg-card p-6 space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Basic Information</h2>
            <p className="text-sm text-muted-foreground">Enter the user's basic details</p>
          </div>

          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Username <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="johndoe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Email <span className="text-destructive">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="john.doe@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">First Name</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="John"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Last Name</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Doe"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Account Status */}
        <div className="rounded-lg border bg-card p-6 space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Account Status</h2>
            <p className="text-sm text-muted-foreground">Configure the user's account status</p>
          </div>

          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium">Enabled</span>
                <p className="text-xs text-muted-foreground">User can login and access the system</p>
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
                <span className="text-sm font-medium">Email Verified</span>
                <p className="text-xs text-muted-foreground">Mark the user's email as verified</p>
              </div>
              <input
                type="checkbox"
                checked={formData.emailVerified}
                onChange={(e) => setFormData({ ...formData, emailVerified: e.target.checked })}
                className="w-4 h-4"
              />
            </label>
          </div>
        </div>

        {/* Credentials */}
        <div className="rounded-lg border bg-card p-6 space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Credentials</h2>
            <p className="text-sm text-muted-foreground">Set the user's initial password</p>
          </div>

          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Password <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-3 py-2 pr-10 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Minimum 8 characters. Use a strong password.
              </p>
            </div>

            <label className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium">Temporary Password</span>
                <p className="text-xs text-muted-foreground">User must change password on first login</p>
              </div>
              <input
                type="checkbox"
                checked={formData.temporaryPassword}
                onChange={(e) => setFormData({ ...formData, temporaryPassword: e.target.checked })}
                className="w-4 h-4"
              />
            </label>
          </div>
        </div>

        {/* Required Actions */}
        <div className="rounded-lg border bg-card p-6 space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Required Actions</h2>
            <p className="text-sm text-muted-foreground">Actions the user must complete on next login</p>
          </div>

          <div className="text-sm text-muted-foreground">
            No required actions configured. You can add required actions after creating the user.
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Button type="submit" disabled={loading}>
            <Save className="h-4 w-4 mr-2" />
            {loading ? 'Creating...' : 'Create User'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/admin/users')}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
