import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
import { Shield, ExternalLink, X, Check } from 'lucide-react'
import { useState } from 'react'

export function OAuthGrantPage() {
  const [grantedScopes, setGrantedScopes] = useState<string[]>([])

  const handleScopeToggle = (scope: string) => {
    setGrantedScopes(prev =>
      prev.includes(scope)
        ? prev.filter(s => s !== scope)
        : [...prev, scope]
    )
  }

  const handleApprove = () => {
    // Submit the form with granted scopes
    const form = document.querySelector('form') as HTMLFormElement
    form?.submit()
  }

  const handleDeny = () => {
    // Redirect back to client without granting
    window.location.href = '${oauth.clientUrl}' as unknown as string
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
          <CardTitle className="text-2xl font-bold">Authorize Access</CardTitle>
          <CardDescription>
            <strong dangerouslySetInnerHTML={{
              __html: '${oauth.clientName}'
            }} /> is requesting access to your account
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="rounded-lg border bg-muted/50 p-4">
            <p className="text-sm text-muted-foreground">
              This application would like permission to:
            </p>
          </div>

          <form className="space-y-3">
            {/* Scopes will be injected by Keycloak */}
            <div className="space-y-3">
              {/* Example scopes */}
              <div className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                <Checkbox
                  id="scope-profile"
                  checked={grantedScopes.includes('profile')}
                  onCheckedChange={() => handleScopeToggle('profile')}
                  className="mt-1"
                />
                <div className="flex-1">
                  <Label htmlFor="scope-profile" className="font-medium cursor-pointer">
                    View your profile information
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Access your name, email, and other basic profile data
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                <Checkbox
                  id="scope-email"
                  checked={grantedScopes.includes('email')}
                  onCheckedChange={() => handleScopeToggle('email')}
                  className="mt-1"
                />
                <div className="flex-1">
                  <Label htmlFor="scope-email" className="font-medium cursor-pointer">
                    View your email address
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Access your email address for account verification
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                <Checkbox
                  id="scope-roles"
                  checked={grantedScopes.includes('roles')}
                  onCheckedChange={() => handleScopeToggle('roles')}
                  className="mt-1"
                />
                <div className="flex-1">
                  <Label htmlFor="scope-roles" className="font-medium cursor-pointer">
                    View your roles
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Access your user roles for authorization purposes
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                size="lg"
                onClick={handleDeny}
              >
                <X className="w-4 h-4 mr-2" />
                Deny
              </Button>
              <Button
                type="button"
                className="flex-1"
                size="lg"
                onClick={handleApprove}
              >
                <Check className="w-4 h-4 mr-2" />
                Approve
              </Button>
            </div>

            <div className="text-center">
              <a
                href="${oauth.clientUrl}"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                Learn more about this application
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
