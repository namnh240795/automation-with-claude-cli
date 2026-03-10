import api from './keycloak-admin.service'

export interface Role {
  id: string
  name: string
  description?: string
  scopeParamRequired: boolean
  composite: boolean
  clientRole: boolean
  containerId: string
  attributes?: Record<string, string[]>
}

export const roleService = {
  listRealmRoles: (realm: string, params?: {
    first?: number
    max?: number
    search?: string
  }) =>
    api.get<Role[]>(`/admin/realms/${realm}/roles`, { params }),

  listClientRoles: (realm: string, clientId: string, params?: {
    first?: number
    max?: number
    search?: string
  }) =>
    api.get<Role[]>(`/admin/realms/${realm}/clients/${clientId}/roles`, { params }),

  getRealmRole: (realm: string, roleName: string) =>
    api.get<Role>(`/admin/realms/${realm}/roles/${roleName}`),

  getClientRole: (realm: string, clientId: string, roleName: string) =>
    api.get<Role>(`/admin/realms/${realm}/clients/${clientId}/roles/${roleName}`),

  createRealmRole: (realm: string, role: Partial<Role>) =>
    api.post(`/admin/realms/${realm}/roles`, role),

  createClientRole: (realm: string, clientId: string, role: Partial<Role>) =>
    api.post(`/admin/realms/${realm}/clients/${clientId}/roles`, role),

  updateRealmRole: (realm: string, roleName: string, role: Partial<Role>) =>
    api.put(`/admin/realms/${realm}/roles/${roleName}`, role),

  updateClientRole: (realm: string, clientId: string, roleName: string, role: Partial<Role>) =>
    api.put(`/admin/realms/${realm}/clients/${clientId}/roles/${roleName}`, role),

  deleteRealmRole: (realm: string, roleName: string) =>
    api.delete(`/admin/realms/${realm}/roles/${roleName}`),

  deleteClientRole: (realm: string, clientId: string, roleName: string) =>
    api.delete(`/admin/realms/${realm}/clients/${clientId}/roles/${roleName}`),

  getRealmRoleUsers: (realm: string, roleName: string, params?: {
    first?: number
    max?: number
  }) =>
    api.get(`/admin/realms/${realm}/roles/${roleName}/users`, { params }),

  getClientRoleUsers: (realm: string, clientId: string, roleName: string, params?: {
    first?: number
    max?: number
  }) =>
    api.get(`/admin/realms/${realm}/clients/${clientId}/roles/${roleName}/users`, { params }),

  getRealmRoleGroups: (realm: string, roleName: string, params?: {
    first?: number
    max?: number
  }) =>
    api.get(`/admin/realms/${realm}/roles/${roleName}/groups`, { params }),

  addComposites: (realm: string, roleName: string, roles: Role[]) =>
    api.post(`/admin/realms/${realm}/roles/${roleName}/composites`, roles),

  getComposites: (realm: string, roleName: string) =>
    api.get<Role[]>(`/admin/realms/${realm}/roles/${roleName}/composites`),

  deleteComposites: (realm: string, roleName: string, roles: Role[]) =>
    api.delete(`/admin/realms/${realm}/roles/${roleName}/composites`, { data: roles }),
}
