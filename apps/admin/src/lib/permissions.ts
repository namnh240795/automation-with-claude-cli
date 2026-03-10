// Permission definitions for the admin console

export const RESOURCES = {
  ADMIN: '/admin',
  REALMS: '/realms',
  USERS: '/users',
  CLIENTS: '/clients',
  ROLES: '/roles',
  GROUPS: '/groups',
  SESSIONS: '/sessions',
  IDENTITY_PROVIDERS: '/identity-providers',
} as const

export const ACTIONS = {
  READ: 'read',
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
  ALL: '*',
} as const

export type Resource = typeof RESOURCES[keyof typeof RESOURCES]
export type Action = typeof ACTIONS[keyof typeof ACTIONS]

// Default roles and their permissions
export const DEFAULT_POLICIES = {
  admin: [
    ['admin', RESOURCES.ADMIN, ACTIONS.ALL],
    ['admin', RESOURCES.REALMS, ACTIONS.ALL],
    ['admin', RESOURCES.USERS, ACTIONS.ALL],
    ['admin', RESOURCES.CLIENTS, ACTIONS.ALL],
    ['admin', RESOURCES.ROLES, ACTIONS.ALL],
    ['admin', RESOURCES.GROUPS, ACTIONS.ALL],
    ['admin', RESOURCES.SESSIONS, ACTIONS.ALL],
    ['admin', RESOURCES.IDENTITY_PROVIDERS, ACTIONS.ALL],
  ],
  realm_manager: [
    ['realm_manager', RESOURCES.REALMS, ACTIONS.READ],
    ['realm_manager', RESOURCES.REALMS, ACTIONS.UPDATE],
    ['realm_manager', RESOURCES.USERS, ACTIONS.ALL],
    ['realm_manager', RESOURCES.CLIENTS, ACTIONS.READ],
  ],
  user_manager: [
    ['user_manager', RESOURCES.USERS, ACTIONS.READ],
    ['user_manager', RESOURCES.USERS, ACTIONS.CREATE],
    ['user_manager', RESOURCES.USERS, ACTIONS.UPDATE],
  ],
  readonly: [
    ['readonly', RESOURCES.REALMS, ACTIONS.READ],
    ['readonly', RESOURCES.USERS, ACTIONS.READ],
    ['readonly', RESOURCES.CLIENTS, ACTIONS.READ],
    ['readonly', RESOURCES.ROLES, ACTIONS.READ],
    ['readonly', RESOURCES.GROUPS, ACTIONS.READ],
  ],
} as const

// Helper function to build resource path with wildcard support
export function buildResourcePath(base: string, subPath?: string): string {
  if (!subPath) return base
  return `${base}${subPath}`
}

// Common permission combinations
export const PERMISSIONS = {
  // Dashboard
  VIEW_DASHBOARD: { resource: RESOURCES.ADMIN, action: ACTIONS.READ },

  // Realms
  LIST_REALMS: { resource: RESOURCES.REALMS, action: ACTIONS.READ },
  CREATE_REALM: { resource: RESOURCES.REALMS, action: ACTIONS.CREATE },
  EDIT_REALM: { resource: RESOURCES.REALMS, action: ACTIONS.UPDATE },
  DELETE_REALM: { resource: RESOURCES.REALMS, action: ACTIONS.DELETE },

  // Users
  LIST_USERS: { resource: RESOURCES.USERS, action: ACTIONS.READ },
  CREATE_USER: { resource: RESOURCES.USERS, action: ACTIONS.CREATE },
  EDIT_USER: { resource: RESOURCES.USERS, action: ACTIONS.UPDATE },
  DELETE_USER: { resource: RESOURCES.USERS, action: ACTIONS.DELETE },

  // Clients
  LIST_CLIENTS: { resource: RESOURCES.CLIENTS, action: ACTIONS.READ },
  CREATE_CLIENT: { resource: RESOURCES.CLIENTS, action: ACTIONS.CREATE },
  EDIT_CLIENT: { resource: RESOURCES.CLIENTS, action: ACTIONS.UPDATE },
  DELETE_CLIENT: { resource: RESOURCES.CLIENTS, action: ACTIONS.DELETE },

  // Roles
  LIST_ROLES: { resource: RESOURCES.ROLES, action: ACTIONS.READ },
  CREATE_ROLE: { resource: RESOURCES.ROLES, action: ACTIONS.CREATE },
  EDIT_ROLE: { resource: RESOURCES.ROLES, action: ACTIONS.UPDATE },
  DELETE_ROLE: { resource: RESOURCES.ROLES, action: ACTIONS.DELETE },

  // Groups
  LIST_GROUPS: { resource: RESOURCES.GROUPS, action: ACTIONS.READ },
  CREATE_GROUP: { resource: RESOURCES.GROUPS, action: ACTIONS.CREATE },
  EDIT_GROUP: { resource: RESOURCES.GROUPS, action: ACTIONS.UPDATE },
  DELETE_GROUP: { resource: RESOURCES.GROUPS, action: ACTIONS.DELETE },

  // Sessions
  LIST_SESSIONS: { resource: RESOURCES.SESSIONS, action: ACTIONS.READ },
  MANAGE_SESSIONS: { resource: RESOURCES.SESSIONS, action: ACTIONS.DELETE },

  // Identity Providers
  LIST_IDPS: { resource: RESOURCES.IDENTITY_PROVIDERS, action: ACTIONS.READ },
  CREATE_IDP: { resource: RESOURCES.IDENTITY_PROVIDERS, action: ACTIONS.CREATE },
  EDIT_IDP: { resource: RESOURCES.IDENTITY_PROVIDERS, action: ACTIONS.UPDATE },
  DELETE_IDP: { resource: RESOURCES.IDENTITY_PROVIDERS, action: ACTIONS.DELETE },
} as const
