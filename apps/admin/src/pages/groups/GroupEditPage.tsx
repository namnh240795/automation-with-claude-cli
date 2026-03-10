import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Save, Users, Shield, Trash2, FolderTree } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { groupService, Group } from '@/services/group.service'
import { roleService } from '@/services/role.service'
import { useConfirmDialog } from '@/components/modals/ConfirmDialog'
import { toast } from 'sonner'

export function GroupEditPage() {
  const { id: groupId } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { ConfirmDialog, confirm } = useConfirmDialog()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [group, setGroup] = useState<Group | null>(null)
  const [members, setMembers] = useState<any[]>([])
  const [roles, setRoles] = useState<any[]>([])

  useEffect(() => {
    const loadData = async () => {
      if (!groupId) return

      try {
        const [groupResponse, membersResponse, rolesResponse] = await Promise.all([
          groupService.get('master', groupId),
          groupService.getMembers('master', groupId, { max: 20 }),
          roleService.getRealmRoles('master', groupId),
        ])

        setGroup(groupResponse.data)
        setMembers(membersResponse.data || [])
        setRoles(rolesResponse.data || [])
      } catch (error) {
        toast.error('Failed to load group')
        navigate('/admin/groups')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [groupId, navigate])

  const handleSave = async () => {
    if (!group || !groupId) return

    setSaving(true)

    try {
      await groupService.update('master', groupId, group)
      toast.success('Group updated successfully')

      const response = await groupService.get('master', groupId)
      setGroup(response.data)
    } catch (error: any) {
      toast.error(error.response?.data?.errorMessage || 'Failed to update group')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    const confirmed = await confirm({
      title: 'Delete Group',
      description: `Are you sure you want to delete the group "${group?.name}"? This action cannot be undone.`,
      variant: 'destructive',
      onConfirm: async () => {
        if (!groupId) return
        await groupService.delete('master', groupId)
        toast.success('Group deleted successfully')
        navigate('/admin/groups')
      },
    })
  }

  const handleRemoveMember = async (userId: string, userName: string) => {
    const confirmed = await confirm({
      title: 'Remove Member',
      description: `Are you sure you want to remove "${userName}" from this group?`,
      variant: 'default',
      onConfirm: async () => {
        if (!groupId) return
        await groupService.removeMember('master', userId, groupId)
        toast.success('Member removed successfully')
        setMembers(members.filter((m) => m.id !== userId))
      },
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading group...</p>
        </div>
      </div>
    )
  }

  if (!group) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Group not found</p>
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
            onClick={() => navigate('/admin/groups')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
              <FolderTree className="h-8 w-8 text-amber-600" />
              {group.name}
            </h1>
            <p className="text-muted-foreground mt-2">
              {group.path || 'Group'}
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

        {/* Group Info Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-amber-100 flex items-center justify-center">
                <FolderTree className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-medium">{group.name}</p>
                <p className="text-xs text-muted-foreground">Group Name</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-blue-100 flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium">{members.length}</p>
                <p className="text-xs text-muted-foreground">Members</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-purple-100 flex items-center justify-center">
                <Shield className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium">{roles.length}</p>
                <p className="text-xs text-muted-foreground">Realm Roles</p>
              </div>
            </div>
          </div>
        </div>

        {/* Basic Settings */}
        <div className="rounded-lg border bg-card p-6 space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Basic Settings</h2>
            <p className="text-sm text-muted-foreground">Configure group properties</p>
          </div>

          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Group Name</label>
              <input
                type="text"
                value={group.name}
                onChange={(e) => setGroup({ ...group, name: e.target.value })}
                className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Group Path</label>
              <input
                type="text"
                value={group.path || ''}
                disabled
                className="w-full px-3 py-2 border border-input rounded-md bg-muted disabled:opacity-50"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Path is automatically generated based on group hierarchy
              </p>
            </div>
          </div>
        </div>

        {/* Members */}
        <div className="rounded-lg border bg-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Group Members</h2>
              <p className="text-sm text-muted-foreground">Users in this group</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(`/admin/groups/${groupId}/users`)}
            >
              <Users className="h-4 w-4 mr-2" />
              Manage Members
            </Button>
          </div>

          {members.length > 0 ? (
            <div className="space-y-2">
              {members.slice(0, 10).map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent transition-colors"
                >
                  <div
                    className="flex items-center gap-3 flex-1 cursor-pointer"
                    onClick={() => navigate(`/admin/users/${member.id}`)}
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xs font-medium text-primary">
                        {member.username?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{member.username}</p>
                      <p className="text-xs text-muted-foreground">{member.email || 'No email'}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveMember(member.id, member.username)}
                  >
                    ×
                  </Button>
                </div>
              ))}
              {members.length > 10 && (
                <p className="text-sm text-muted-foreground text-center">
                  And {members.length - 10} more members
                </p>
              )}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No members in this group
            </p>
          )}
        </div>

        {/* Roles */}
        <div className="rounded-lg border bg-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Realm Roles</h2>
              <p className="text-sm text-muted-foreground">Roles assigned to this group</p>
            </div>
            <Button variant="outline" size="sm">
              <Shield className="h-4 w-4 mr-2" />
              Add Role
            </Button>
          </div>

          {roles.length > 0 ? (
            <div className="space-y-2">
              {roles.map((role) => (
                <div
                  key={role.id}
                  className="flex items-center justify-between p-3 rounded-lg border"
                >
                  <div className="flex items-center gap-3">
                    <Shield className="h-4 w-4 text-purple-600" />
                    <span className="font-medium">{role.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      // Handle remove role
                    }}
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No roles assigned to this group
            </p>
          )}
        </div>

        {/* Subgroups */}
        {group.subGroups && group.subGroups.length > 0 && (
          <div className="rounded-lg border bg-card p-6 space-y-4">
            <div>
              <h2 className="text-lg font-semibold">Subgroups</h2>
              <p className="text-sm text-muted-foreground">Child groups</p>
            </div>

            <div className="space-y-2">
              {group.subGroups.map((subGroup) => (
                <div
                  key={subGroup.id}
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent transition-colors cursor-pointer"
                  onClick={() => navigate(`/admin/groups/${subGroup.id}`)}
                >
                  <div className="flex items-center gap-3">
                    <FolderTree className="h-4 w-4 text-amber-600" />
                    <span className="font-medium">{subGroup.name}</span>
                  </div>
                  <ArrowLeft className="h-4 w-4 rotate-180 text-muted-foreground" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <ConfirmDialog />
    </>
  )
}
