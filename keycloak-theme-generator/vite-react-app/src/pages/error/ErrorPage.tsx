import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertTriangle, Home, ArrowLeft } from 'lucide-react'

export function ErrorPage() {
  return (
    <div className="kc-login-wrapper bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1 text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Oops! Something went wrong</CardTitle>
          <CardDescription>
            An error occurred while processing your request
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {/* Error message will be injected by Keycloak */}
              <span
                className="kc-error-message"
                dangerouslySetInnerHTML={{
                  __html: '${message?html}'
                }}
              />
            </AlertDescription>
          </Alert>

          <div className="flex flex-col gap-2">
            <Button variant="default" className="w-full" size="lg">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
            <Button variant="outline" className="w-full" size="lg">
              <Home className="w-4 h-4 mr-2" />
              Return to Home
            </Button>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            If the problem persists, please contact your administrator.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
