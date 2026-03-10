import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Info, CheckCircle2 } from 'lucide-react'

export function InfoPage() {
  return (
    <div className="kc-login-wrapper bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1 text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Info className="w-8 h-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Information</CardTitle>
          <CardDescription>
            Important message regarding your account
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              {/* Info message will be injected by Keycloak */}
              <span
                className="kc-info-message"
                dangerouslySetInnerHTML={{
                  __html: '${message?html}'
                }}
              />
            </AlertDescription>
          </Alert>

          <Button className="w-full" size="lg">
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Continue
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
