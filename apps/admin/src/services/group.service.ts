import api from './keycloak-admin.service'

export interface Group {
  id: string
  name: string
  path?: string
  realmRoles?: string[]
  clientRoles?: Record<string, string[]>
  subGroups?: Group[]
  attributes?: Record<string, string[]>
  access?: {
    view?: boolean
    manage?: boolean
    manageMembership?: boolean
  }
}

export const groupService = {
  list: (realm: string, params?: {
    first?: number
    max?: number
    search?: string
    briefRepresentation?: boolean
  }) =>
    api.get<Group[]>(`/admin/realms/${realm}/groups`, { params }),

  get: (realm: string, id: string) =>
    api.get<Group>(`/admin/realms/${realm}/groups/${id}`),

  create: (realm: string, data: Partial<Group>) =>
    api.post(`/admin/realms/${realm}/groups`, data),

  update: (realm: string, id: string, data: Partial<Group>) =>
    api.put(`/admin/realms/${realm}/groups/${id}`, data),

  delete: (realm: string, id: string) =>
    api.delete(`/admin/realms/${realm}/groups/${id}`),

  getMembers: (realm: string, id: string, params?: {
    first?: number
    max?: number
  }) =>
    api.get(`/admin/realms/${realm}/groups/${id}/members`, { params }),

  addMember: (realm: string, id: string, userId: string) =>
    api.put(`/admin/realms/${realm}/users/${userId}/groups/${id}`),

  removeMember: (realm: string, id: string, userId: string) =>
    api.delete(`/admin/realms/${realm}/users/${userId}/groups/${id}`),

  getRealmRoles: (realm: string, id: string) =>
    api.get(`/admin/realms/${realm}/groups/${id}/role-mappings/realm`),

  addRealmRoles: (realm: string, id: string, roles: any[]) =>
    api.post(`/admin/realms/${realm}/groups/${id}/role-mappings/realm`, roles),

  deleteRealmRoles: (realm: string, id: string, roles: any[]) =>
    api.delete(`/admin/realms/${realm}/groups/${id}/role-mappings/realm`, { data: roles }),

  getClientRoles: (realm: string, id: string, clientUuid: string) =>
    api.get(`/admin/realms/${realm}/groups/${id}/role-mappings/clients/${clientUuid}`),

  addClientRoles: (realm: string, id: string, clientUuid: string, roles: any[]) =>
    api.post(`/admin/realms/${realm}/groups/${id}/role-mappings/clients/${clientUuid}`, roles),

  deleteClientRoles: (realm: string, id: string, clientUuid: string, roles: any[]) =>
    api.delete(`/admin/realms/${realm}/groups/${id}/role-mappings/clients/${clientUuid}`, { data: roles }),

  countMembers: (realm: string, id: string) =>
    api.get<number>(`/admin/realms/${realm}/groups/${id}/members/count`),
}
