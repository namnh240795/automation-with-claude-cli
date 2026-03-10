import { Enforcer } from 'casbin'
import axios from 'axios'

// Import the Casbin model
async function loadModel(): Promise<string> {
  const response = await fetch('/src/lib/casbin-model.conf')
  return await response.text()
}

// Fetch user-specific policies from API
async function fetchUserPolicies(username: string): Promise<string[][]> {
  try {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000'
    const response = await axios.get(`${apiUrl}/api/policies/${username}`)
    return response.data.policies || []
  } catch (error) {
    console.error('Failed to fetch policies:', error)
    // Return default policies for admin user
    if (username === 'admin') {
      return [
        ['admin', '/admin', '*'],
        ['admin', '/realms', '*'],
        ['admin', '/users', '*'],
        ['admin', '/clients', '*'],
        ['admin', '/roles', '*'],
        ['admin', '/groups', '*'],
        ['admin', '/sessions', '*'],
        ['admin', '/identity-providers', '*'],
      ]
    }
    return []
  }
}

// Global enforcer cache
let enforcerCache: Map<string, Enforcer> = new Map()

// Create and initialize enforcer with dynamic policies
export async function createCasbinEnforcer(username: string): Promise<Enforcer> {
  // Check cache first
  if (enforcerCache.has(username)) {
    return enforcerCache.get(username)!
  }

  const model = await loadModel()
  const enforcer = new Enforcer(model, '')

  // Load user-specific policies from API dynamically
  const userPolicies = await fetchUserPolicies(username)

  if (userPolicies.length > 0) {
    await enforcer.addPolicies(userPolicies)
  }

  // Cache the enforcer
  enforcerCache.set(username, enforcer)

  // Subscribe to policy updates (WebSocket)
  subscribeToPolicyUpdates(username, enforcer)

  return enforcer
}

// Real-time policy updates
function subscribeToPolicyUpdates(username: string, enforcer: Enforcer) {
  const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:3000'
  const socket = new WebSocket(`${wsUrl}`)

  socket.onopen = () => {
    // Subscribe to policy updates for this user
    socket.send(JSON.stringify({
      event: 'subscribe-policies',
      data: username,
    }))
  }

  socket.onmessage = async (event) => {
    try {
      const message = JSON.parse(event.data)

      if (message.event === 'policy-update') {
        const update = message.data

        if (update.type === 'add') {
          await enforcer.addPolicy(update.policy)
          console.log('Policy added:', update.policy)
        } else if (update.type === 'remove') {
          await enforcer.removePolicy(update.policy)
          console.log('Policy removed:', update.policy)
        }
      }
    } catch (error) {
      console.error('Error handling policy update:', error)
    }
  }

  socket.onerror = (error) => {
    console.error('WebSocket error:', error)
  }

  socket.onclose = () => {
    console.log('WebSocket connection closed')
    // Attempt to reconnect after 5 seconds
    setTimeout(() => {
      subscribeToPolicyUpdates(username, enforcer)
    }, 5000)
  }
}

export async function checkPermission(
  enforcer: Enforcer,
  user: string,
  resource: string,
  action: string
): Promise<boolean> {
  try {
    return await enforcer.enforce(user, resource, action)
  } catch (error) {
    console.error('Error checking permission:', error)
    return false
  }
}

// Clear enforcer cache (useful when user logs out)
export function clearEnforcerCache() {
  enforcerCache.clear()
}

// Reload policies for a user (useful after policy changes)
export async function reloadPolicies(username: string): Promise<Enforcer> {
  // Clear cache for this user
  enforcerCache.delete(username)

  // Create new enforcer with fresh policies
  return await createCasbinEnforcer(username)
}
