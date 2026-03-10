import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Save, FolderTree } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { groupService, Group } from '@/services/group.service'
import { toast } from 'sonner'

export function GroupCreatePage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    parentId: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim()) {
      toast.error('Group name is required')
      return
    }

    setLoading(true)

    try {
      const groupData: Partial<Group> = {
        name: formData.name,
      }

      const response = await groupService.create('master', groupData)

      // If parent group is specified, move the new group
      if (formData.parentId) {
        try {
          await groupService.addMember('master', formData.parentId, response.data.id)
          toast.success('Group created successfully under parent group')
        } catch (error) {
          toast.warn('Group created but could not be moved to parent group')
        }
      } else {
        toast.success('Group created successfully')
      }

      navigate('/admin/groups')
    } catch (error: any) {
      toast.error(error.response?.data?.errorMessage || 'Failed to create group')
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
          onClick={() => navigate('/admin/groups')}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create Group</h1>
          <p className="text-muted-foreground mt-2">
            Create a new user group
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-3xl space-y-8">
        {/* Basic Information */}
        <div className="rounded-lg border bg-card p-6 space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Basic Information</h2>
            <p className="text-sm text-muted-foreground">Enter the group's details</p>
          </div>

          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Group Name <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="my-group"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Unique identifier for the group
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Parent Group (Optional)</label>
              <select
                value={formData.parentId}
                onChange={(e) => setFormData({ ...formData, parentId: e.target.value })}
                className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">None (Root Group)</option>
                {/* Parent groups would be loaded here */}
              </select>
              <p className="text-xs text-muted-foreground mt-1">
                Select a parent group to create a hierarchy
              </p>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="rounded-lg border bg-blue-50 dark:bg-blue-950 p-4">
          <div className="flex gap-3">
            <FolderTree className="h-5 w-5 text-blue-600 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-blue-900 dark:text-blue-100">About Groups</h3>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                Groups are used to organize users and can be used to assign roles and permissions.
                You can create a hierarchy of groups by specifying a parent group.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Button type="submit" disabled={loading}>
            <Save className="h-4 w-4 mr-2" />
            {loading ? 'Creating...' : 'Create Group'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/admin/groups')}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
