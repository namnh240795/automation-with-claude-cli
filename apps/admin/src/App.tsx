import { Routes, Route, Navigate } from 'react-router-dom'
import { useKeycloak } from '@react-keycloak/web'
import { AdminLayout } from './components/layout/AdminLayout'
import { AdminDashboardPage } from './pages/dashboard/AdminDashboardPage'
import { RealmListPage } from './pages/realms/RealmListPage'
import { RealmCreatePage } from './pages/realms/RealmCreatePage'
import { RealmEditPage } from './pages/realms/RealmEditPage'
import { UserListPage } from './pages/users/UserListPage'
import { UserCreatePage } from './pages/users/UserCreatePage'
import { UserEditPage } from './pages/users/UserEditPage'
import { ClientListPage } from './pages/clients/ClientListPage'
import { ClientCreatePage } from './pages/clients/ClientCreatePage'
import { ClientEditPage } from './pages/clients/ClientEditPage'
import { RoleListPage } from './pages/roles/RoleListPage'
import { RoleCreatePage } from './pages/roles/RoleCreatePage'
import { RoleEditPage } from './pages/roles/RoleEditPage'
import { GroupListPage } from './pages/groups/GroupListPage'
import { GroupCreatePage } from './pages/groups/GroupCreatePage'
import { GroupEditPage } from './pages/groups/GroupEditPage'
import { SessionListPage } from './pages/sessions/SessionListPage'
import { UserSessionsPage } from './pages/sessions/UserSessionsPage'
import { IdpListPage } from './pages/identity-providers/IdpListPage'

function App() {
  const { keycloak } = useKeycloak()

  // Show loading while Keycloak initializes
  if (!keycloak.authenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <Routes>
      {/* Default redirect to admin dashboard */}
      <Route path="/" element={<Navigate to="/admin" replace />} />

      {/* Admin routes with layout */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboardPage />} />
        <Route path="realms" element={<RealmListPage />} />
        <Route path="realms/new" element={<RealmCreatePage />} />
        <Route path="realms/:realm" element={<RealmEditPage />} />
        <Route path="users" element={<UserListPage />} />
        <Route path="users/new" element={<UserCreatePage />} />
        <Route path="users/:id" element={<UserEditPage />} />
        <Route path="clients" element={<ClientListPage />} />
        <Route path="clients/new" element={<ClientCreatePage />} />
        <Route path="clients/:id" element={<ClientEditPage />} />
        <Route path="roles" element={<RoleListPage />} />
        <Route path="roles/new" element={<RoleCreatePage />} />
        <Route path="roles/:name" element={<RoleEditPage />} />
        <Route path="groups" element={<GroupListPage />} />
        <Route path="groups/new" element={<GroupCreatePage />} />
        <Route path="groups/:id" element={<GroupEditPage />} />
        <Route path="sessions" element={<SessionListPage />} />
        <Route path="sessions/users/:id" element={<UserSessionsPage />} />
        <Route path="identity-providers" element={<IdpListPage />} />
        <Route path="identity-providers/new" element={<div className="p-8">Create Identity Provider - Coming Soon</div>} />
        <Route path="identity-providers/:id" element={<div className="p-8">Edit Identity Provider - Coming Soon</div>} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  )
}

export default App
