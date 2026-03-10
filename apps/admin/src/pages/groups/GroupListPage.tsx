import { useState } from 'react'
import { Plus, Edit, Trash2, FolderTree, Users, ChevronRight, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { groupService, Group } from '@/services/group.service'
import { useDataQuery } from '@/hooks/useDataQuery'
import { useConfirmDialog } from '@/components/modals/ConfirmDialog'
import { toast } from 'sonner'

interface GroupNode extends Group {
  children?: GroupNode[]
  expanded?: boolean
}

export function GroupListPage() {
  const { ConfirmDialog, confirm } = useConfirmDialog()
  const [realm] = useState('master')
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set())

  const { data: groups = [], isLoading, refetch } = useDataQuery<Group[]>({
    queryFn: async () => {
      const response = await groupService.list(realm, { briefRepresentation: false })
      return response.data
    },
    enabled: true,
  })

  const toggleExpanded = (groupId: string) => {
    setExpandedGroups((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(groupId)) {
        newSet.delete(groupId)
      } else {
        newSet.add(groupId)
      }
      return newSet
    })
  }

  const handleDelete = async (group: Group) => {
    const confirmed = await confirm({
      title: 'Delete Group',
      description: `Are you sure you want to delete the group "${group.name}"? This action cannot be undone.`,
      variant: 'destructive',
      onConfirm: async () => {
        await groupService.delete(realm, group.id)
        toast.success(`Group "${group.name}" deleted successfully`)
        refetch()
      },
    })

    if (confirmed) {
      refetch()
    }
  }

  const buildGroupTree = (groups: Group[]): GroupNode[] => {
    const groupMap = new Map<string, GroupNode>()
    const rootGroups: GroupNode[] = []

    // First pass: create all group nodes
    groups.forEach((group) => {
      groupMap.set(group.id, { ...group, children: [], expanded: expandedGroups.has(group.id) })
    })

    // Second pass: build the tree structure
    groups.forEach((group) => {
      const node = groupMap.get(group.id)!
      const parentId = group.path?.split('/').slice(0, -1).join('/') || ''

      if (parentId && groupMap.has(parentId)) {
        groupMap.get(parentId)!.children!.push(node)
      } else {
        rootGroups.push(node)
      }
    })

    return rootGroups
  }

  const renderGroupNode = (group: GroupNode, depth: number = 0) => {
    const hasChildren = group.subGroups && group.subGroups.length > 0
    const isExpanded = expandedGroups.has(group.id)

    return (
      <div key={group.id} className="space-y-1">
        <div
          className={`flex items-center gap-2 p-2 rounded-lg hover:bg-accent transition-colors cursor-pointer`}
          style={{ paddingLeft: `${depth * 24 + 12}px` }}
          onClick={() => hasChildren && toggleExpanded(group.id)}
        >
          {hasChildren ? (
            isExpanded ? (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            )
          ) : (
            <div className="w-4 h-4" />
          )}

          <FolderTree className="h-4 w-4 text-amber-600" />

          <span className="font-medium flex-1">{group.name}</span>

          <span className="text-sm text-muted-foreground mr-4">
            {group.path?.split('/').length - 1} subgroups
          </span>

          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={(e) => {
                e.stopPropagation()
                window.location.href = `/admin/groups/${group.id}`
              }}
            >
              <Edit className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={(e) => {
                e.stopPropagation()
                window.location.href = `/admin/groups/${group.id}/users`
              }}
            >
              <Users className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={(e) => {
                e.stopPropagation()
                handleDelete(group)
              }}
            >
              <Trash2 className="h-3 w-3 text-destructive" />
            </Button>
          </div>
        </div>

        {hasChildren && isExpanded && group.subGroups && (
          <div className="space-y-1">
            {group.subGroups.map((childId) => {
              const childGroup = groups.find((g) => g.id === childId)
              if (!childGroup) return null
              return (
                <div key={childGroup.id}>
                  {renderGroupNode({ ...childGroup, children: [] }, depth + 1)}
                </div>
              )
            })}
          </div>
        )}
      </div>
    )
  }

  const groupTree = buildGroupTree(groups)

  return (
    <>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Groups</h1>
            <p className="text-muted-foreground mt-2">
              Manage user groups and group hierarchies
            </p>
          </div>
          <Button onClick={() => window.location.href = '/admin/groups/new'}>
            <Plus className="h-4 w-4 mr-2" />
            Create Group
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Groups</p>
                <p className="text-2xl font-bold mt-1">{groups.length}</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Root Groups</p>
                <p className="text-2xl font-bold mt-1">{groupTree.length}</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Members</p>
                <p className="text-2xl font-bold mt-1">
                  {groups.reduce((sum, g) => sum + (g.path?.split('/').length || 1), 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Group Tree */}
        <div className="rounded-lg border bg-card p-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Group Hierarchy</h2>
            <p className="text-sm text-muted-foreground">
              Click on groups with children to expand/collapse
            </p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                <p className="text-sm text-muted-foreground">Loading groups...</p>
              </div>
            </div>
          ) : groupTree.length === 0 ? (
            <div className="text-center py-8">
              <FolderTree className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No groups found</p>
              <p className="text-sm text-muted-foreground mt-2">
                Create your first group to get started
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {groupTree.map((group) => renderGroupNode(group))}
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog />
    </>
  )
}
