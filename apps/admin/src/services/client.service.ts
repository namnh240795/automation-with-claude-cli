import api from './keycloak-admin.service'

export interface Client {
  id: string
  clientId: string
  name?: string
  description?: string
  enabled: boolean
  clientAuthenticatorType: string
  secret?: string
  registrationAccessToken?: string
  defaultRoles?: string[]
  redirectUris: string[]
  webOrigins: string[]
  bearerOnly: boolean
  consentRequired: boolean
  standardFlowEnabled: boolean
  implicitFlowEnabled: boolean
  directAccessGrantsEnabled: boolean
  serviceAccountsEnabled: boolean
  publicClient: boolean
  frontchannelLogout: boolean
  protocol: string
  attributes: Record<string, string>
  fullScopeAllowed: boolean
  nodeReRegistrationTimeout: number
  defaultClientScopes: string[]
  optionalClientScopes: string[]
}

export const clientService = {
  list: (realm: string, params?: {
    clientId?: string
    first?: number
    max?: number
    viewableOnly?: boolean
  }) =>
    api.get<Client[]>(`/admin/realms/${realm}/clients`, { params }),

  get: (realm: string, id: string) =>
    api.get<Client>(`/admin/realms/${realm}/clients/${id}`),

  create: (realm: string, data: Partial<Client>) =>
    api.post(`/admin/realms/${realm}/clients`, data),

  update: (realm: string, id: string, data: Partial<Client>) =>
    api.put(`/admin/realms/${realm}/clients/${id}`, data),

  delete: (realm: string, id: string) =>
    api.delete(`/admin/realms/${realm}/clients/${id}`),

  getClientSecret: (realm: string, id: string) =>
    api.get(`/admin/realms/${realm}/clients/${id}/client-secret`),

  regenerateClientSecret: (realm: string, id: string) =>
    api.post(`/admin/realms/${realm}/clients/${id}/client-secret`),

  getServiceAccountUser: (realm: string, id: string) =>
    api.get(`/admin/realms/${realm}/clients/${id}/service-account-user`),

  getSessions: (realm: string, id: string) =>
    api.get(`/admin/realms/${realm}/clients/${id}/user-sessions`),

  getOfflineSessions: (realm: string, id: string) =>
    api.get(`/admin/realms/${realm}/clients/${id}/offline-sessions`),

  getDefaultClientScopes: (realm: string, id: string) =>
    api.get(`/admin/realms/${realm}/clients/${id}/default-client-scopes`),

  addDefaultClientScope: (realm: string, id: string, scopeId: string) =>
    api.put(`/admin/realms/${realm}/clients/${id}/default-client-scopes/${scopeId}`),

  removeDefaultClientScope: (realm: string, id: string, scopeId: string) =>
    api.delete(`/admin/realms/${realm}/clients/${id}/default-client-scopes/${scopeId}`),

  getOptionalClientScopes: (realm: string, id: string) =>
    api.get(`/admin/realms/${realm}/clients/${id}/optional-client-scopes`),

  addOptionalClientScope: (realm: string, id: string, scopeId: string) =>
    api.put(`/admin/realms/${realm}/clients/${id}/optional-client-scopes/${scopeId}`),

  removeOptionalClientScope: (realm: string, id: string, scopeId: string) =>
    api.delete(`/admin/realms/${realm}/clients/${id}/optional-client-scopes/${scopeId}`),
}
