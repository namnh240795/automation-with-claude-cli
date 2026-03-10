import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useKeycloak } from "@react-keycloak/web"
import { User, Mail, Shield, LogOut, Settings } from "lucide-react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function DashboardPage() {
  const { keycloak, initialized } = useKeycloak()
  const navigate = useNavigate()
  const [apiData, setApiData] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (initialized && keycloak.authenticated) {
      fetchProtectedData()
    }
  }, [initialized, keycloak.authenticated])

  const fetchProtectedData = async () => {
    setLoading(true)
    try {
      // Call your NestJS API service
      const response = await fetch('http://localhost:3000/api/protected', {
        headers: {
          'Authorization': `Bearer ${keycloak.token}`,
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const data = await response.json()
        setApiData(data)
      } else {
        console.error('API call failed:', response.statusText)
      }
    } catch (error) {
      console.error('Error fetching protected data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    keycloak.logout({
      redirectUri: window.location.origin
    })
  }

  const getInitials = () => {
    const username = keycloak.tokenParsed?.preferred_username || keycloak.tokenParsed?.email || ''
    return username.substring(0, 2).toUpperCase()
  }

  const tokenExpiresIn = () => {
    if (!keycloak.tokenParsed?.exp || !keycloak.tokenParsed?.iat) return null
    const totalSeconds = keycloak.tokenParsed.exp - keycloak.tokenParsed.iat
    const elapsedSeconds = Math.floor(Date.now() / 1000) - keycloak.tokenParsed.iat
    const remainingSeconds = totalSeconds - elapsedSeconds
    return Math.max(0, Math.floor(remainingSeconds / 60))
  }

  if (!initialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  if (!keycloak.authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6">
            <p className="text-center mb-4">You need to login to access this page</p>
            <Button onClick={() => window.location.href = '/'}>Go to Login</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-4">
              <Shield className="w-6 h-6 text-primary" />
              <span className="font-bold text-lg">Dashboard</span>
            </div>
            <div className="flex items-center gap-4">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium hidden sm:inline-block">
                {keycloak.tokenParsed?.preferred_username || keycloak.tokenParsed?.email}
              </span>
              <Button variant="ghost" size="sm" onClick={() => navigate('/profile')}>
                Profile
              </Button>
              <Button variant="ghost" size="sm" onClick={() => navigate('/settings')}>
                Settings
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Welcome Section */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Welcome back!</CardTitle>
                  <Badge variant={keycloak.tokenParsed?.email_verified ? 'default' : 'secondary'}>
                    {keycloak.tokenParsed?.email_verified ? 'Verified' : 'Unverified'}
                  </Badge>
                </div>
                <CardDescription>You're now logged in with Keycloak</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">
                      {keycloak.tokenParsed?.given_name && keycloak.tokenParsed?.family_name
                        ? `${keycloak.tokenParsed.given_name} ${keycloak.tokenParsed.family_name}`
                        : keycloak.tokenParsed?.preferred_username || 'User'}
                    </p>
                    <p className="text-sm text-muted-foreground">{keycloak.tokenParsed?.email}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Session Info</CardTitle>
                <CardDescription>Your current authentication session</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Session Status</span>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    Active
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Token Expires In</span>
                  <Badge variant={tokenExpiresIn() && tokenExpiresIn() < 5 ? 'destructive' : 'secondary'}>
                    {tokenExpiresIn() ? `${tokenExpiresIn()} minutes` : 'N/A'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Issued At</span>
                  <span className="text-sm">
                    {new Date((keycloak.tokenParsed?.iat || 0) * 1000).toLocaleTimeString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* API Integration Example */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>API Integration</CardTitle>
                <Button onClick={fetchProtectedData} disabled={loading}>
                  {loading ? 'Loading...' : 'Test API Call'}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {apiData ? (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Response from your NestJS API (http://localhost:3000/api/protected):
                  </p>
                  <pre className="bg-muted p-4 rounded-lg text-xs overflow-auto">
                    {JSON.stringify(apiData, null, 2)}
                  </pre>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Click "Test API Call" to fetch data from your protected NestJS API service.
                  The request will include your JWT token in the Authorization header.
                </p>
              )}
            </CardContent>
          </Card>

          {/* User Profile Actions */}
          <div className="grid gap-6 md:grid-cols-3">
            <Card
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate('/profile')}
            >
              <CardHeader>
                <User className="w-6 h-6 mb-2 text-primary" />
                <CardTitle>Profile</CardTitle>
                <CardDescription>View and edit your profile information</CardDescription>
              </CardHeader>
            </Card>

            <Card
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate('/settings')}
            >
              <CardHeader>
                <Settings className="w-6 h-6 mb-2 text-primary" />
                <CardTitle>Settings</CardTitle>
                <CardDescription>Manage your account preferences</CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <Shield className="w-6 h-6 mb-2 text-primary" />
                <CardTitle>Security</CardTitle>
                <CardDescription>Password, 2FA, and session management</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
