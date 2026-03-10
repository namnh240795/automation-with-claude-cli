/**
 * Create stub pages for remaining Keycloak templates
 * This ensures all pages referenced in the build script exist
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const projectRoot = path.resolve(__dirname, '..')
const pagesDir = path.join(projectRoot, 'vite-react-app', 'src', 'pages')

// Remaining pages that need stubs
const stubPages = [
  'idp-link-confirm',
  'otp-form',
  'webauthn-register',
  'webauthn-authenticate',
  'saml-post',
  'saml-sso',
  'saml-error',
  'idp-link-email',
  'x509-info',
  'authenticator-mapping-error',
  'authenticator-mapping-removed',
  'authenticator-mapping-linked',
]

const stubComponent = `
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

export function PAGE_NAME() {
  return (
    <div className="kc-login-wrapper bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1 text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">TITLE</CardTitle>
          <CardDescription>DESCRIPTION</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="text-center text-sm text-muted-foreground">
            This page is configured but can be customized further.
          </div>

          {/* Add your custom content here */}

          <Button className="w-full" size="lg">
            Continue
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
`

const stubIndexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TITLE - Keycloak</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/pages/PAGE_PATH/main.tsx"></script>
  </body>
</html>
`

const stubMain = `import React from 'react'
import ReactDOM from 'react-dom/client'
import { COMPONENT_NAME } from './COMPONENT_FILE'
import '../index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <COMPONENT_NAME />
  </React.StrictMode>,
)
`

// Page titles and descriptions
const pageMetadata = {
  'idp-link-confirm': { title: 'Link Identity Provider', description: 'Confirm linking your account with an external identity provider' },
  'otp-form': { title: 'Enter One-Time Password', description: 'Enter the code sent to your device' },
  'webauthn-register': { title: 'Register Security Key', description: 'Add a security key for enhanced security' },
  'webauthn-authenticate': { title: 'Authenticate with Security Key', description: 'Use your security key to sign in' },
  'saml-post': { title: 'SAML Authentication', description: 'Processing SAML authentication' },
  'saml-sso': { title: 'SAML Single Sign-On', description: 'Processing SAML SSO request' },
  'saml-error': { title: 'SAML Error', description: 'An error occurred during SAML authentication' },
  'idp-link-email': { title: 'Confirm Account Linking', description: 'Confirm linking your accounts via email' },
  'x509-info': { title: 'Certificate Information', description: 'Your certificate details' },
  'authenticator-mapping-error': { title: 'Authenticator Mapping Error', description: 'Could not map authenticator' },
  'authenticator-mapping-removed': { title: 'Authenticator Removed', description: 'Your authenticator has been removed' },
  'authenticator-mapping-linked': { title: 'Already Linked', description: 'This authenticator is already linked to your account' },
}

function createStubPages() {
  console.log('🔧 Creating stub pages...')

  for (const pageId of stubPages) {
    const pageDir = path.join(pagesDir, pageId)
    const metadata = pageMetadata[pageId] || {
      title: pageId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      description: 'Custom authentication page'
    }

    // Create directory
    if (!fs.existsSync(pageDir)) {
      fs.mkdirSync(pageDir, { recursive: true })
    }

    // Create component file
    const componentName = pageId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('') + 'Page'
    const componentContent = stubComponent
      .replace('PAGE_NAME', componentName)
      .replace('TITLE', metadata.title)
      .replace('DESCRIPTION', metadata.description)

    fs.writeFileSync(path.join(pageDir, `${componentName}.tsx`), componentContent)

    // Create index.html
    const indexContent = stubIndexHtml
      .replace(/TITLE/g, metadata.title)
      .replace('PAGE_PATH', pageId)

    fs.writeFileSync(path.join(pageDir, 'index.html'), indexContent)

    // Create main.tsx
    const mainContent = stubMain
      .replace(/COMPONENT_NAME/g, componentName)
      .replace('COMPONENT_FILE', componentName)
      .replace(/PAGE_NAME/g, pageId)

    fs.writeFileSync(path.join(pageId, 'main.tsx'), mainContent)

    console.log(`  ✓ Created ${pageId}`)
  }

  console.log('✅ Stub pages created successfully!')
}

// Run
try {
  createStubPages()
} catch (error) {
  console.error('❌ Error creating stub pages:', error)
  process.exit(1)
}
