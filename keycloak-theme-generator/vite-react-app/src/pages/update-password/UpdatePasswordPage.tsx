import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Lock, Eye, EyeOff, CheckCircle2, XCircle } from 'lucide-react'
import { useState } from 'react'

export function UpdatePasswordPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [strength, setStrength] = useState<'weak' | 'medium' | 'strong' | null>(null)

  const checkPasswordStrength = (pwd: string): 'weak' | 'medium' | 'strong' | null => {
    if (!pwd) return null
    if (pwd.length < 8) return 'weak'
    if (pwd.length < 12) return 'medium'
    return 'strong'
  }

  const handlePasswordChange = (value: string) => {
    setPassword(value)
    setStrength(checkPasswordStrength(value))
    if (error) setError('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!password) {
      setError('Password is required')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    const form = e.target as HTMLFormElement
    form.submit()
  }

  return (
    <div className="kc-login-wrapper bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1 text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Lock className="w-8 h-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Update Password</CardTitle>
          <CardDescription>Enter your new password below</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="kc-form-group">
              <Label htmlFor="password" className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                New Password
              </Label>
              <div className="kc-input-wrapper">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  className="pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {password && (
                <div className="space-y-2 mt-2">
                  <div className="kc-password-strength">
                    <div
                      className={`kc-password-strength-bar ${
                        strength === 'weak'
                          ? 'kc-password-strength-weak'
                          : strength === 'medium'
                          ? 'kc-password-strength-medium'
                          : 'kc-password-strength-strong'
                      }`}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Password strength:{' '}
                    <span
                      className={`font-medium ${
                        strength === 'weak'
                          ? 'text-red-500'
                          : strength === 'medium'
                          ? 'text-yellow-500'
                          : 'text-green-500'
                      }`}
                    >
                      {strength ? strength.charAt(0).toUpperCase() + strength.slice(1) : ''}
                    </span>
                  </p>
                </div>
              )}
            </div>

            <div className="kc-form-group">
              <Label htmlFor="password-confirm" className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Confirm Password
              </Label>
              <div className="kc-input-wrapper">
                <Input
                  id="password-confirm"
                  name="password-confirm"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value)
                    if (error) setError('')
                  }}
                  className="pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {confirmPassword && password === confirmPassword && (
                <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Passwords match</span>
                </div>
              )}
            </div>

            <Button type="submit" className="w-full" size="lg">
              <CheckCircle2 className="w-4 h-4" />
              Update Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
