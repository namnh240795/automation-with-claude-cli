import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { FileText, Check } from 'lucide-react'
import { useState } from 'react'

export function TermsPage() {
  const [accepted, setAccepted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!accepted) return
    const form = e.target as HTMLFormElement
    form.submit()
  }

  return (
    <div className="kc-login-wrapper bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 py-8">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="space-y-1 text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <FileText className="w-8 h-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Terms & Conditions</CardTitle>
          <CardDescription>Please read and accept the terms to continue</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="max-h-96 overflow-y-auto rounded-lg border bg-muted/50 p-6 text-sm">
            <h3 className="font-semibold text-lg mb-4">Terms of Service</h3>

            <section className="mb-4">
              <h4 className="font-medium mb-2">1. Acceptance of Terms</h4>
              <p className="text-muted-foreground">
                By accessing and using this service, you acknowledge that you have read, understood,
                and agree to be bound by these terms and conditions.
              </p>
            </section>

            <section className="mb-4">
              <h4 className="font-medium mb-2">2. User Responsibilities</h4>
              <p className="text-muted-foreground">
                You are responsible for maintaining the confidentiality of your account credentials
                and for all activities that occur under your account.
              </p>
            </section>

            <section className="mb-4">
              <h4 className="font-medium mb-2">3. Privacy Policy</h4>
              <p className="text-muted-foreground">
                Your use of this service is also governed by our Privacy Policy, which can be found
                in our documentation.
              </p>
            </section>

            <section className="mb-4">
              <h4 className="font-medium mb-2">4. Data Protection</h4>
              <p className="text-muted-foreground">
                We implement appropriate technical and organizational measures to protect your
                personal data against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section className="mb-4">
              <h4 className="font-medium mb-2">5. Service Availability</h4>
              <p className="text-muted-foreground">
                While we strive to provide uninterrupted service, we do not guarantee that the
                service will always be available or error-free.
              </p>
            </section>

            <section className="mb-4">
              <h4 className="font-medium mb-2">6. Modifications</h4>
              <p className="text-muted-foreground">
                We reserve the right to modify these terms at any time. Continued use of the service
                constitutes acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h4 className="font-medium mb-2">7. Contact Information</h4>
              <p className="text-muted-foreground">
                For questions about these terms, please contact our support team.
              </p>
            </section>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-start space-x-3 p-4 rounded-lg border bg-muted/50">
              <Checkbox
                id="accept-terms"
                checked={accepted}
                onCheckedChange={(checked) => setAccepted(checked as boolean)}
                className="mt-1"
              />
              <Label htmlFor="accept-terms" className="text-sm font-normal cursor-pointer leading-tight">
                I have read and agree to the Terms & Conditions and Privacy Policy
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={!accepted}
            >
              <Check className="w-4 h-4 mr-2" />
              Accept & Continue
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
