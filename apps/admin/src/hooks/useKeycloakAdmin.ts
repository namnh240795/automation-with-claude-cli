import { useKeycloak } from '@react-keycloak/web'
import { getToken } from '@/lib/keycloak'

export function useKeycloakAdmin() {
  const { keycloak, initialized } = useKeycloak()

  const getAdminToken = async () => {
    try {
      await keycloak.updateToken(30)
      return getToken()
    } catch (error) {
      console.error('Failed to refresh token:', error)
      return null
    }
  }

  const isAuthenticated = () => {
    return keycloak.authenticated || false
  }

  const hasRealmRole = (role: string) => {
    const token = keycloak.tokenParsed as any
    if (!token) return false

    const realmAccess = token.realm_access || {}
    const roles = realmAccess.roles || []

    return roles.includes(role)
  }

  const hasClientRole = (clientId: string, role: string) => {
    const token = keycloak.tokenParsed as any
    if (!token) return false

    const resourceAccess = token.resource_access || {}
    const client = resourceAccess[clientId]

    if (!client || !client.roles) return false

    return client.roles.includes(role)
  }

  const logout = () => {
    keycloak.logout({ redirectUri: window.location.origin })
  }

  const login = () => {
    keycloak.login()
  }

  const userProfile = () => {
    const token = keycloak.tokenParsed
    return {
      username: token?.preferred_username || '',
      email: token?.email || '',
      firstName: token?.given_name || '',
      lastName: token?.family_name || '',
      fullName: [token?.given_name, token?.family_name].filter(Boolean).join(' ') || token?.preferred_username || '',
    }
  }

  return {
    keycloak,
    initialized,
    isAuthenticated: isAuthenticated(),
    getAdminToken,
    hasRealmRole,
    hasClientRole,
    logout,
    login,
    userProfile,
  }
}
