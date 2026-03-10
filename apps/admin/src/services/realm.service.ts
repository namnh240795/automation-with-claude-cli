import api from './keycloak-admin.service'

export interface Realm {
  id: string
  realm: string
  displayName?: string
  displayNameHtml?: string
  enabled: boolean
  sslRequired: string
  registrationAllowed: boolean
  loginWithEmailAllowed: boolean
  duplicateEmailsAllowed: boolean
  resetPasswordAllowed: boolean
  editUsernameAllowed: boolean
  bruteForceProtected: boolean
  internationalizationEnabled: boolean
  defaultLocale: string
  browserFlow: string
  registrationFlow: string
  directGrantFlow: string
  resetCredentialsFlow: string
  clientAuthenticationFlow: string
  dockerAuthenticationFlow: string
  attributes?: Record<string, string[]>
}

export const realmService = {
  list: () => api.get<Realm[]>('/admin/realms'),

  get: (realm: string) => api.get<Realm>(`/admin/realms/${realm}`),

  create: (data: Partial<Realm>) => api.post('/admin/realms', data),

  update: (realm: string, data: Partial<Realm>) =>
    api.put(`/admin/realms/${realm}`, data),

  delete: (realm: string) => api.delete(`/admin/realms/${realm}`),

  getEvents: (realm: string, params?: any) =>
    api.get(`/admin/realms/${realm}/events`, { params }),

  getClientSessionStats: (realm: string) =>
    api.get(`/admin/realms/${realm}/client-session-stats`),

  getRealmSpecificClientStats: (realm: string) =>
    api.get(`/admin/realms/${realm}/client-stats`),

  clearRealmCache: (realm: string) =>
    api.post(`/admin/realms/${realm}/clear-realm-cache`),

  clearKeysCache: (realm: string) =>
    api.post(`/admin/realms/${realm}/clear-keys-cache`),

  clearUserCache: (realm: string) =>
    api.post(`/admin/realms/${realm}/clear-user-cache`),

  testLDAPConnection: (realm: string, data: any) =>
    api.post(`/admin/realms/${realm}/testLDAPConnection`, data),

  testLDAPAuth: (realm: string, data: any) =>
    api.post(`/admin/realms/${realm}/testLDAPUserAuthentication`, data),
}
