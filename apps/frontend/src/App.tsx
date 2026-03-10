import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useKeycloak } from '@react-keycloak/web'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import ProfilePage from './pages/ProfilePage'
import SettingsPage from './pages/SettingsPage'

function App() {
  const { keycloak, initialized } = useKeycloak()

  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!initialized) {
      return <div className="min-h-screen flex items-center justify-center">Loading...</div>
    }

    if (!keycloak.authenticated) {
      return <Navigate to="/" replace />
    }

    return <>{children}</>
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
