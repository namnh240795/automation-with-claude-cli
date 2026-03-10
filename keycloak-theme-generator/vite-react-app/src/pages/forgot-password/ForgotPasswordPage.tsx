import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { Mail, ArrowLeft, Send } from 'lucide-react'
import { useState } from 'react'

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form will be submitted to Keycloak
    const form = e.target as HTMLFormElement
    form.submit()
    setSubmitted(true)
  }

  return (
    <div className="kc-login-wrapper bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1 text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Mail className="w-8 h-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Forgot Password?</CardTitle>
          <CardDescription>
            {submitted
              ? 'Check your email for reset instructions'
              : 'Enter your email address and we\'ll send you a link to reset your password'
            }
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {!submitted ? (
            <>
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="kc-form-group">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full"
                    placeholder="john.doe@example.com"
                  />
                </div>

                <Button type="submit" className="w-full" size="lg">
                  <Send className="w-4 h-4" />
                  Send Reset Link
                </Button>
              </form>
            </>
          ) : (
            <Alert>
              <AlertDescription>
                If an account exists with <strong>{email}</strong>, you will receive password
                reset instructions shortly.
              </AlertDescription>
            </Alert>
          )}

          <Separator />

          <div className="text-center">
            <a
              href="${url.loginUrl}"
              className="inline-flex items-center text-sm text-primary hover:underline font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Login
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
