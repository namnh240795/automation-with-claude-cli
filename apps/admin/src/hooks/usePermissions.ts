import { useEffect, useState } from 'react'
import { useKeycloak } from '@react-keycloak/web'
import { createCasbinEnforcer, checkPermission } from '@/lib/casbin'
import { type Enforcer } from 'casbin'

export function usePermissions() {
  const { keycloak } = useKeycloak()
  const username = keycloak.tokenParsed?.preferred_username || 'anonymous'
  const roles = keycloak.tokenParsed?.realm_access?.roles || []
  const [enforcer, setEnforcer] = useState<Enforcer | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initEnforcer = async () => {
      try {
        const enf = await createCasbinEnforcer(username)
        setEnforcer(enf)
      } catch (error) {
        console.error('Failed to initialize Casbin enforcer:', error)
      } finally {
        setLoading(false)
      }
    }

    initEnforcer()
  }, [username])

  const can = async (resource: string, action: string): Promise<boolean> => {
    if (!enforcer) return false
    try {
      return await checkPermission(enforcer, username, resource, action)
    } catch (error) {
      console.error('Permission check failed:', error)
      return false
    }
  }

  const hasRole = (role: string): boolean => {
    return roles.includes(role)
  }

  const hasAnyRole = (roleList: string[]): boolean => {
    return roleList.some(role => roles.includes(role))
  }

  return {
    can,
    hasRole,
    hasAnyRole,
    roles,
    username,
    loading,
  }
}

// Hook for checking a single permission (synchronous version for UI)
export function usePermission(resource: string, action: string) {
  const { can, loading } = usePermissions()
  const [permitted, setPermitted] = useState(false)

  useEffect(() => {
    const check = async () => {
      const result = await can(resource, action)
      setPermitted(result)
    }
    check()
  }, [resource, action, can])

  return { permitted, loading }
}
