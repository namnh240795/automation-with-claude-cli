import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useKeycloak } from "@react-keycloak/web"
import { Shield, LogOut, User, Mail, CheckCircle } from "lucide-react"

export default function LoginPage() {
  const { keycloak, initialized } = useKeycloak()

  const handleLogin = () => {
    keycloak.login({
      redirectUri: window.location.origin + "/dashboard"
    })
  }

  const handleRegister = () => {
    keycloak.register({
      redirectUri: window.location.origin + "/dashboard"
    })
  }

  const getInitials = () => {
    const username = keycloak.tokenParsed?.preferred_username || keycloak.tokenParsed?.email || ''
    return username.substring(0, 2).toUpperCase()
  }

  if (!initialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20">
        <Card className="w-full max-w-md shadow-xl">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="text-center text-muted-foreground">Initializing Keycloak...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 p-4">
      <Card className="w-full max-w-md shadow-xl border-2">
        <CardHeader className="space-y-3 text-center pb-6">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
              <Shield className="w-10 h-10 text-primary" />
            </div>
          </div>
          <div>
            <CardTitle className="text-3xl font-bold">Welcome Back</CardTitle>
            <CardDescription className="text-base mt-2">Sign in to access your account</CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {keycloak.authenticated ? (
            <div className="space-y-4">
              <Alert>
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="ml-2">
                  You're already signed in as <strong>{keycloak.tokenParsed?.preferred_username || keycloak.tokenParsed?.email}</strong>
                </AlertDescription>
              </Alert>

              <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">
                    {keycloak.tokenParsed?.given_name && keycloak.tokenParsed?.family_name
                      ? `${keycloak.tokenParsed.given_name} ${keycloak.tokenParsed.family_name}`
                      : keycloak.tokenParsed?.preferred_username || 'User'}
                  </p>
                  <p className="text-sm text-muted-foreground">{keycloak.tokenParsed?.email}</p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant={keycloak.tokenParsed?.email_verified ? 'default' : 'secondary'} className="text-xs">
                      {keycloak.tokenParsed?.email_verified ? 'Verified' : 'Unverified'}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Button className="w-full" size="lg" onClick={() => window.location.href = '/dashboard'}>
                  Go to Dashboard
                </Button>
                <Button variant="outline" className="w-full" onClick={() => keycloak.logout()}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-3">
                <Button className="w-full" size="lg" onClick={handleLogin}>
                  <Shield className="w-5 h-5 mr-2" />
                  Sign In with Keycloak
                </Button>
                <Button variant="outline" className="w-full" size="lg" onClick={handleRegister}>
                  <User className="w-5 h-5 mr-2" />
                  Create Account
                </Button>
              </div>

              <Alert>
                <AlertDescription className="text-sm">
                  🔒 You'll be redirected to Keycloak to authenticate. After authentication, you'll be redirected back to the dashboard.
                </AlertDescription>
              </Alert>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col gap-2 justify-center text-xs text-muted-foreground border-t pt-4">
          <div className="flex items-center gap-2">
            <Shield className="w-3 h-3" />
            <p>Secured by Keycloak Identity and Access Management</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
