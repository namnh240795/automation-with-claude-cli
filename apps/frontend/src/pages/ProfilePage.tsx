import { useKeycloak } from '@react-keycloak/web'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface UserProfile {
  sub: string
  email: string
  email_verified: boolean
  preferred_username?: string
  given_name?: string
  family_name?: string
  created_at?: number
}

export default function ProfilePage() {
  const { keycloak } = useKeycloak()
  const navigate = useNavigate()
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!keycloak.authenticated) {
      navigate('/')
      return
    }

    // Load user profile from Keycloak
    keycloak.loadUserProfile().then((profile) => {
      setUserProfile({
        sub: keycloak.tokenParsed?.sub || '',
        email: profile.email || '',
        email_verified: profile.emailVerified || false,
        preferred_username: profile.username || '',
        given_name: profile.firstName || '',
        family_name: profile.lastName || '',
      })
      setLoading(false)
    }).catch(() => {
      setLoading(false)
    })
  }, [keycloak, navigate])

  const getInitials = () => {
    if (userProfile?.given_name && userProfile?.family_name) {
      return `${userProfile.given_name[0]}${userProfile.family_name[0]}`.toUpperCase()
    }
    if (userProfile?.preferred_username) {
      return userProfile.preferred_username.substring(0, 2).toUpperCase()
    }
    if (userProfile?.email) {
      return userProfile.email.substring(0, 2).toUpperCase()
    }
    return 'U'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">My App</h1>
          <Button variant="outline" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Profile Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle className="text-2xl">
                  {userProfile?.given_name && userProfile?.family_name
                    ? `${userProfile.given_name} ${userProfile.family_name}`
                    : userProfile?.preferred_username || 'User'}
                </CardTitle>
                <CardDescription className="text-base mt-1">
                  {userProfile?.email}
                </CardDescription>
                <div className="flex gap-2 mt-2">
                  <Badge variant={userProfile?.email_verified ? 'default' : 'secondary'}>
                    {userProfile?.email_verified ? 'Verified' : 'Unverified'}
                  </Badge>
                  <Badge variant="outline">User</Badge>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Account Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Your account details and settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-[180px_1fr] items-center gap-4">
              <span className="text-sm font-medium text-muted-foreground">User ID</span>
              <span className="text-sm font-mono bg-muted px-2 py-1 rounded">{userProfile?.sub}</span>
            </div>
            <Separator />
            <div className="grid grid-cols-[180px_1fr] items-center gap-4">
              <span className="text-sm font-medium text-muted-foreground">Username</span>
              <span className="text-sm">{userProfile?.preferred_username || 'N/A'}</span>
            </div>
            <Separator />
            <div className="grid grid-cols-[180px_1fr] items-center gap-4">
              <span className="text-sm font-medium text-muted-foreground">Email</span>
              <span className="text-sm">{userProfile?.email}</span>
            </div>
            <Separator />
            <div className="grid grid-cols-[180px_1fr] items-center gap-4">
              <span className="text-sm font-medium text-muted-foreground">First Name</span>
              <span className="text-sm">{userProfile?.given_name || 'N/A'}</span>
            </div>
            <Separator />
            <div className="grid grid-cols-[180px_1fr] items-center gap-4">
              <span className="text-sm font-medium text-muted-foreground">Last Name</span>
              <span className="text-sm">{userProfile?.family_name || 'N/A'}</span>
            </div>
          </CardContent>
        </Card>

        {/* Token Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Authentication Token</CardTitle>
            <CardDescription>Your current JWT token information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertDescription className="space-y-2">
                <div className="grid grid-cols-[180px_1fr] items-center gap-4">
                  <span className="text-sm font-medium text-muted-foreground">Issued At</span>
                  <span className="text-sm">
                    {keycloak.tokenParsed?.iat
                      ? new Date((keycloak.tokenParsed.iat as number) * 1000).toLocaleString()
                      : 'N/A'}
                  </span>
                </div>
                <Separator className="my-2" />
                <div className="grid grid-cols-[180px_1fr] items-center gap-4">
                  <span className="text-sm font-medium text-muted-foreground">Expires At</span>
                  <span className="text-sm">
                    {keycloak.tokenParsed?.exp
                      ? new Date((keycloak.tokenParsed.exp as number) * 1000).toLocaleString()
                      : 'N/A'}
                  </span>
                </div>
                <Separator className="my-2" />
                <div className="grid grid-cols-[180px_1fr] items-center gap-4">
                  <span className="text-sm font-medium text-muted-foreground">Time Remaining</span>
                  <span className="text-sm">
                    {keycloak.tokenParsed?.exp && keycloak.tokenParsed?.iat
                      ? `${Math.floor(((keycloak.tokenParsed.exp as number) - (keycloak.tokenParsed.iat as number)) / 60)} minutes`
                      : 'N/A'}
                  </span>
                </div>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your account settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/settings')}>
              ⚙️ Account Settings
            </Button>
            <Button variant="outline" className="w-full justify-start">
              🔒 Security Settings
            </Button>
            <Button
              variant="destructive"
              className="w-full justify-start"
              onClick={() => keycloak.logout({ redirectUri: window.location.origin })}
            >
              🚪 Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
