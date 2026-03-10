import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { Lock, User, AlertCircle, Shield, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form will be submitted to Keycloak's login action
    const form = e.target as HTMLFormElement
    form.submit()
  }

  return (
    <div className="kc-login-wrapper bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1 text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription>Sign in to your account to continue</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Error/Info Messages */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Keycloak messages placeholder */}
          <div className="kc-messages">
            {/* Messages will be injected by Keycloak */}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="kc-form-group">
              <Label htmlFor="username" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Username or Email
              </Label>
              <Input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full"
                placeholder="Enter your username or email"
              />
            </div>

            <div className="kc-form-group">
              <Label htmlFor="password" className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password
              </Label>
              <div className="kc-input-wrapper">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  name="rememberMe"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
                  Remember me
                </Label>
              </div>
              <a
                href="${url.loginResetCredentialsUrl}"
                className="text-sm text-primary hover:underline font-medium"
              >
                Forgot password?
              </a>
            </div>

            <Button type="submit" className="w-full" size="lg">
              <Lock className="w-4 h-4" />
              Sign In
            </Button>
          </form>

          {/* Social Providers Placeholder */}
          <div id="kc-social-providers" className="kc-social-providers">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <div id="social-providers-list" className="grid grid-cols-2 gap-2 mt-4">
              {/* Social providers will be injected by Keycloak */}
            </div>
          </div>

          <Separator />

          <div className="text-center text-sm">
            Don't have an account?{' '}
            <a
              href="${url.registrationUrl}"
              className="text-primary hover:underline font-medium"
            >
              Sign up
            </a>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center text-xs text-muted-foreground">
          <p>Powered by Keycloak</p>
        </CardFooter>
      </Card>
    </div>
  )
}
