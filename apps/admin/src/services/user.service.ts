import api from './keycloak-admin.service'

export interface User {
  id: string
  username: string
  email?: string
  firstName?: string
  lastName?: string
  enabled: boolean
  emailVerified: boolean
  createdTimestamp?: number
  attributes?: Record<string, string[]>
  credentials?: Credential[]
  groups?: string[]
  realmRoles?: string[]
  clientRoles?: Record<string, string[]>
  requiredActions?: string[]
}

export interface Credential {
  id: string
  type: string
  userLabel?: string
  createdDate?: number
  priority?: number
  temporary: boolean
}

export interface UserRepresentation {
  id?: string
  username?: string
  email?: string
  firstName?: string
  lastName?: string
  enabled?: boolean
  emailVerified?: boolean
  attributes?: Record<string, string[]>
  credentials?: Credential[]
  groups?: string[]
  realmRoles?: string[]
  clientRoles?: Record<string, string[]>
  requiredActions?: string[]
}

export const userService = {
  list: (realm: string, params?: {
    first?: number
    max?: number
    search?: string
    email?: string
    username?: string
    firstName?: string
    lastName?: string
    exact?: boolean
    enabled?: boolean
  }) =>
    api.get<User[]>(`/admin/realms/${realm}/users`, { params }),

  get: (realm: string, id: string) =>
    api.get<User>(`/admin/realms/${realm}/users/${id}`),

  create: (realm: string, data: UserRepresentation) =>
    api.post(`/admin/realms/${realm}/users`, data),

  update: (realm: string, id: string, data: UserRepresentation) =>
    api.put(`/admin/realms/${realm}/users/${id}`, data),

  delete: (realm: string, id: string) =>
    api.delete(`/admin/realms/${realm}/users/${id}`),

  count: (realm: string) =>
    api.get<number>(`/admin/realms/${realm}/users/count`),

  getGroups: (realm: string, id: string) =>
    api.get(`/admin/realms/${realm}/users/${id}/groups`),

  joinGroup: (realm: string, id: string, groupId: string) =>
    api.put(`/admin/realms/${realm}/users/${id}/groups/${groupId}`),

  leaveGroup: (realm: string, id: string, groupId: string) =>
    api.delete(`/admin/realms/${realm}/users/${id}/groups/${groupId}`),

  getRealmRoles: (realm: string, id: string) =>
    api.get(`/admin/realms/${realm}/users/${id}/role-mappings/realm`),

  addRealmRoles: (realm: string, id: string, roles: any[]) =>
    api.post(`/admin/realms/${realm}/users/${id}/role-mappings/realm`, roles),

  deleteRealmRoles: (realm: string, id: string, roles: any[]) =>
    api.delete(`/admin/realms/${realm}/users/${id}/role-mappings/realm`, { data: roles }),

  getClientRoles: (realm: string, id: string, clientUuid: string) =>
    api.get(`/admin/realms/${realm}/users/${id}/role-mappings/clients/${clientUuid}`),

  addClientRoles: (realm: string, id: string, clientUuid: string, roles: any[]) =>
    api.post(`/admin/realms/${realm}/users/${id}/role-mappings/clients/${clientUuid}`, roles),

  deleteClientRoles: (realm: string, id: string, clientUuid: string, roles: any[]) =>
    api.delete(`/admin/realms/${realm}/users/${id}/role-mappings/clients/${clientUuid}`, { data: roles }),

  getSessions: (realm: string, id: string) =>
    api.get(`/admin/realms/${realm}/users/${id}/sessions`),

  logout: (realm: string, id: string) =>
    api.post(`/admin/realms/${realm}/users/${id}/logout`),

  resetPassword: (realm: string, id: string, credential: Credential) =>
    api.put(`/admin/realms/${realm}/users/${id}/reset-password`, credential),

  executeActionsEmail: (realm: string, id: string, actions: string[], clientId?: string) =>
    api.put(`/admin/realms/${realm}/users/${id}/execute-actions-email`, actions, {
      params: { clientId },
    }),
}
