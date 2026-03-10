import api from './keycloak-admin.service'

export interface Session {
  id: string
  username: string
  userId: string
  ipAddress?: string
  start?: number
  lastAccess?: number
  clients?: {
    id: string
    clientId: string
    ipAddress?: string
    start?: number
    lastAccess?: number
  }[]
}

export const sessionService = {
  getSessions: (realm: string) =>
    api.get<Session[]>(`/admin/realms/${realm}/sessions`),

  getUserSessions: (realm: string, userId: string) =>
    api.get<Session[]>(`/admin/realms/${realm}/users/${userId}/sessions`),

  getClientSessions: (realm: string, clientId: string) =>
    api.get(`/admin/realms/${realm}/clients/${clientId}/user-sessions`),

  logout: (realm: string, sessionId: string) =>
    api.delete(`/admin/realms/${realm}/sessions/${sessionId}`),

  logoutAll: (realm: string) =>
    api.post(`/admin/realms/${realm}/logout-all`),

  logoutUser: (realm: string, userId: string) =>
    api.post(`/admin/realms/${realm}/users/${userId}/logout`),

  revokeOfflineToken: (realm: string, userId: string) =>
    api.delete(`/admin/realms/${realm}/users/${userId}/offline-sessions`),
}
