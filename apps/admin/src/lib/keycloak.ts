import Keycloak from 'keycloak-js'

// Keycloak configuration
const keycloakConfig = {
  url: import.meta.env.VITE_KEYCLOAK_URL || 'http://localhost:8080',
  realm: import.meta.env.VITE_KEYCLOAK_REALM || 'master',
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID || 'admin-cli',
}

// Create Keycloak instance
export const keycloak = new Keycloak(keycloakConfig)

// Keycloak initialization options
export const keycloakInitOptions = {
  onLoad: 'login-required' as const,
  checkLoginIframe: false,
  pkceMethod: 'S256' as const,
}

// Helper functions for authentication
export const isAuthenticated = () => keycloak.authenticated || false

export const getToken = () => keycloak.token

export const login = () => keycloak.login()

export const logout = () => keycloak.logout({ redirectUri: window.location.origin })

export const getUsername = () => keycloak.tokenParsed?.preferred_username || keycloak.tokenParsed?.email || 'User'

export const getUserProfile = () => ({
  username: keycloak.tokenParsed?.preferred_username || '',
  email: keycloak.tokenParsed?.email || '',
  firstName: keycloak.tokenParsed?.given_name || '',
  lastName: keycloak.tokenParsed?.family_name || '',
})

export const hasRole = (role: string) => {
  const token = keycloak.tokenParsed as any
  if (!token) return false

  const resourceAccess = token.resource_access || {}
  const realmAccess = token.realm_access || {}

  // Check realm roles
  if (realmAccess.roles && Array.isArray(realmAccess.roles) && realmAccess.roles.includes(role)) {
    return true
  }

  // Check resource roles
  for (const resource in resourceAccess) {
    const resourceRoles = resourceAccess[resource]?.roles
    if (Array.isArray(resourceRoles) && resourceRoles.includes(role)) {
      return true
    }
  }

  return false
}

export const hasAnyRole = (roles: string[]) => {
  return roles.some(role => hasRole(role))
}
