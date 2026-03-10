import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Save, Users, Shield, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { roleService, Role } from '@/services/role.service'
import { useConfirmDialog } from '@/components/modals/ConfirmDialog'
import { toast } from 'sonner'

export function RoleEditPage() {
  const { name: roleName } = useParams<{ name: string }>()
  const navigate = useNavigate()
  const { ConfirmDialog, confirm } = useConfirmDialog()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [role, setRole] = useState<Role | null>(null)
  const [compositeRoles, setCompositeRoles] = useState<Role[]>([])
  const [roleUsers, setRoleUsers] = useState<any[]>([])

  useEffect(() => {
    const loadData = async () => {
      if (!roleName) return

      try {
        const decodedName = decodeURIComponent(roleName)
        const [roleResponse, compositesResponse, usersResponse] = await Promise.all([
          roleService.getRealmRole('master', decodedName),
          roleService.getComposites('master', decodedName).catch(() => ({ data: [] })),
          roleService.getRealmRoleUsers('master', decodedName, { max: 20 }).catch(() => ({ data: [] })),
        ])

        setRole(roleResponse.data)
        setCompositeRoles(compositesResponse.data || [])
        setRoleUsers(usersResponse.data || [])
      } catch (error) {
        toast.error('Failed to load role')
        navigate('/admin/roles')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [roleName, navigate])

  const handleSave = async () => {
    if (!role || !roleName) return

    setSaving(true)

    try {
      const decodedName = decodeURIComponent(roleName)
      await roleService.updateRealmRole('master', decodedName, role)
      toast.success('Role updated successfully')

      const response = await roleService.getRealmRole('master', decodedName)
      setRole(response.data)
    } catch (error: any) {
      toast.error(error.response?.data?.errorMessage || 'Failed to update role')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    const confirmed = await confirm({
      title: 'Delete Role',
      description: `Are you sure you want to delete the role "${role?.name}"? This action cannot be undone.`,
      variant: 'destructive',
      onConfirm: async () => {
        if (!roleName) return
        const decodedName = decodeURIComponent(roleName)
        await roleService.deleteRealmRole('master', decodedName)
        toast.success('Role deleted successfully')
        navigate('/admin/roles')
      },
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading role...</p>
        </div>
      </div>
    )
  }

  if (!role) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Role not found</p>
      </div>
    )
  }

  return (
    <>
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
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
              <Shield className="h-8 w-8 text-purple-600" />
              {role.name}
            </h1>
            <p className="text-muted-foreground mt-2">
              {role.description || 'No description'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleSave} disabled={saving}>
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Saving...' : 'Save'}
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>

        {/* Role Info Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-purple-100 flex items-center justify-center">
                <Shield className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium">{role.name}</p>
                <p className="text-xs text-muted-foreground">Role Name</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-blue-100 flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium">{roleUsers.length}</p>
                <p className="text-xs text-muted-foreground">Users with Role</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-green-100 flex items-center justify-center">
                <Shield className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium">{compositeRoles.length}</p>
                <p className="text-xs text-muted-foreground">Composite Roles</p>
              </div>
            </div>
          </div>
        </div>

        {/* Basic Settings */}
        <div className="rounded-lg border bg-card p-6 space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Basic Settings</h2>
            <p className="text-sm text-muted-foreground">Configure role properties</p>
          </div>

          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Role Name</label>
              <input
                type="text"
                value={role.name}
                disabled
                className="w-full px-3 py-2 border border-input rounded-md bg-muted disabled:opacity-50"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Role name cannot be changed
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={role.description || ''}
                onChange={(e) => setRole({ ...role, description: e.target.value })}
                className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Composite Roles */}
        {role.composite && (
          <div className="rounded-lg border bg-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Composite Roles</h2>
                <p className="text-sm text-muted-foreground">Roles included in this composite role</p>
              </div>
              <Button variant="outline" size="sm">
                <Shield className="h-4 w-4 mr-2" />
                Add Role
              </Button>
            </div>

            {compositeRoles.length > 0 ? (
              <div className="space-y-2">
                {compositeRoles.map((compositeRole) => (
                  <div
                    key={compositeRole.id}
                    className="flex items-center justify-between p-3 rounded-lg border"
                  >
                    <div className="flex items-center gap-3">
                      <Shield className="h-4 w-4 text-purple-600" />
                      <span className="font-medium">{compositeRole.name}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        // Handle remove composite role
                      }}
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No composite roles configured
              </p>
            )}
          </div>
        )}

        {/* Users with Role */}
        <div className="rounded-lg border bg-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Users with Role</h2>
              <p className="text-sm text-muted-foreground">Users assigned to this role</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(`/admin/roles/${encodeURIComponent(role.name)}/users`)}
            >
              View All
            </Button>
          </div>

          {roleUsers.length > 0 ? (
            <div className="space-y-2">
              {roleUsers.slice(0, 10).map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-3 rounded-lg border cursor-pointer hover:bg-accent"
                  onClick={() => navigate(`/admin/users/${user.id}`)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xs font-medium text-primary">
                        {user.username?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{user.username}</p>
                      <p className="text-xs text-muted-foreground">{user.email || 'No email'}</p>
                    </div>
                  </div>
                </div>
              ))}
              {roleUsers.length > 10 && (
                <p className="text-sm text-muted-foreground text-center">
                  And {roleUsers.length - 10} more users
                </p>
              )}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No users assigned to this role
            </p>
          )}
        </div>
      </div>

      <ConfirmDialog />
    </>
  )
}
