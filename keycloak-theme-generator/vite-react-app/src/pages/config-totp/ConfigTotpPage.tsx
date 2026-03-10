import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { Smartphone, Key, Check, QrCode } from 'lucide-react'
import { useState } from 'react'

export function ConfigTotpPage() {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!code || code.length !== 6) {
      setError('Please enter a valid 6-digit code')
      return
    }
    const form = e.target as HTMLFormElement
    form.submit()
  }

  return (
    <div className="kc-login-wrapper bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <Card className="w-full max-w-lg shadow-xl">
        <CardHeader className="space-y-1 text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Smartphone className="w-8 h-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Setup Two-Factor Authentication</CardTitle>
          <CardDescription>
            Scan the QR code with your authenticator app
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Alert>
            <QrCode className="h-4 w-4" />
            <AlertDescription>
              <strong>Step 1:</strong> Install an authenticator app (Google Authenticator, Authy, etc.)
            </AlertDescription>
          </Alert>

          <div className="flex justify-center p-6 bg-white rounded-lg border">
            {/* QR Code placeholder - will be replaced by Keycloak */}
            <div className="w-48 h-48 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-lg flex items-center justify-center">
              <QrCode className="w-24 h-24 text-muted-foreground" />
            </div>
          </div>

          <Alert>
            <Key className="h-4 w-4" />
            <AlertDescription>
              <strong>Step 2:</strong> Enter the 6-digit code from your app
            </AlertDescription>
          </Alert>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="kc-form-group">
              <Label htmlFor="totp" className="text-center">
                Authentication Code
              </Label>
              <Input
                id="totp"
                name="totp"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                autoComplete="one-time-code"
                required
                value={code}
                onChange={(e) => {
                  setCode(e.target.value.replace(/\D/g, '').slice(0, 6))
                  if (error) setError('')
                }}
                className="w-full text-center text-2xl tracking-widest"
                placeholder="000000"
              />
              <p className="text-xs text-muted-foreground text-center mt-2">
                Enter the 6-digit code from your authenticator app
              </p>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="password">Confirm your password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full"
                placeholder="Enter your password"
              />
            </div>

            <Button type="submit" className="w-full" size="lg">
              <Check className="w-4 h-4 mr-2" />
              Enable Two-Factor Authentication
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground">
            Having trouble?{' '}
            <a href="${url.loginUrl}" className="text-primary hover:underline">
              Skip for now
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
