import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Save, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { roleService, Role } from '@/services/role.service'
import { toast } from 'sonner'

export function RoleCreatePage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    composite: false,
    clientRole: false,
    containerId: 'master',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim()) {
      toast.error('Role name is required')
      return
    }

    setLoading(true)

    try {
      const roleData: Partial<Role> = {
        name: formData.name,
        description: formData.description || undefined,
        composite: formData.composite,
        clientRole: formData.clientRole,
        containerId: formData.containerId,
      }

      await roleService.createRealmRole('master', roleData)
      toast.success('Role created successfully')
      navigate('/admin/roles')
    } catch (error: any) {
      toast.error(error.response?.data?.errorMessage || 'Failed to create role')
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
          onClick={() => navigate('/admin/roles')}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add Role</h1>
          <p className="text-muted-foreground mt-2">
            Create a new realm role
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-3xl space-y-8">
        {/* Basic Information */}
        <div className="rounded-lg border bg-card p-6 space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Basic Information</h2>
            <p className="text-sm text-muted-foreground">Enter the role's details</p>
          </div>

          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Role Name <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="my-role"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Unique identifier for the role (no spaces)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                rows={3}
                placeholder="Role description..."
              />
            </div>
          </div>
        </div>

        {/* Role Type */}
        <div className="rounded-lg border bg-card p-6 space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Role Type</h2>
            <p className="text-sm text-muted-foreground">Configure the role type</p>
          </div>

          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium">Composite Role</span>
                <p className="text-xs text-muted-foreground">
                  A composite role can include other roles
                </p>
              </div>
              <input
                type="checkbox"
                checked={formData.composite}
                onChange={(e) => setFormData({ ...formData, composite: e.target.checked })}
                className="w-4 h-4"
              />
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Button type="submit" disabled={loading}>
            <Save className="h-4 w-4 mr-2" />
            {loading ? 'Creating...' : 'Create Role'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/admin/roles')}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
