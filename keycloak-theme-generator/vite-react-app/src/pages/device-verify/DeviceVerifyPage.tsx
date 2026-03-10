import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Smartphone, CheckCircle2, Loader2 } from 'lucide-react'
import { useState } from 'react'

export function DeviceVerifyPage() {
  const [userCode, setUserCode] = useState('')
  const [polling, setPolling] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setPolling(true)
    // Form will be submitted to Keycloak
    const form = e.target as HTMLFormElement
    form.submit()
  }

  const formatCode = (value: string) => {
    const cleaned = value.replace(/[^A-Z0-9]/gi, '').toUpperCase()
    if (cleaned.length <= 4) return cleaned
    return `${cleaned.slice(0, 4)}-${cleaned.slice(4, 8)}`
  }

  return (
    <div className="kc-login-wrapper bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1 text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Smartphone className="w-8 h-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Device Verification</CardTitle>
          <CardDescription>
            Enter the code displayed on your device
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Alert>
            <CheckCircle2 className="h-4 w-4" />
            <AlertDescription>
              <strong>How it works:</strong> A code is displayed on your device. Enter that code
              below to complete the sign-in process.
            </AlertDescription>
          </Alert>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="kc-form-group">
              <Label htmlFor="user_code" className="text-center">
                Device Code
              </Label>
              <Input
                id="user_code"
                name="user_code"
                type="text"
                inputMode="text"
                autoComplete="one-time-code"
                required
                value={userCode}
                onChange={(e) => setUserCode(formatCode(e.target.value))}
                className="w-full text-center text-xl font-mono tracking-widest uppercase"
                placeholder="XXXX-XXXX"
                maxLength={9}
              />
              <p className="text-xs text-muted-foreground text-center mt-2">
                Enter the 8-character code shown on your device
              </p>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={polling}>
              {polling ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Verify Code
                </>
              )}
            </Button>
          </form>

          <div className="text-center text-sm">
            <p className="text-muted-foreground">
              Need help?{' '}
              <a href="${url.loginUrl}" className="text-primary hover:underline">
                Cancel
              </a>
            </p>
          </div>

          {polling && (
            <div className="text-center">
              <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                Waiting for device confirmation...
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
