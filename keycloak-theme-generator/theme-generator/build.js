import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const projectRoot = path.resolve(__dirname, '..')
const distDir = path.join(projectRoot, 'vite-react-app', 'dist')
const themeOutputDir = path.join(projectRoot, 'dist-theme', 'custom')

// Keycloak pages configuration
const pages = [
  // Login theme pages
  { id: 'login', template: 'login.ftl', type: 'login' },
  { id: 'register', template: 'register.ftl', type: 'login' },
  { id: 'forgot-password', template: 'forgot-password.ftl', type: 'login' },
  { id: 'update-password', template: 'update-password.ftl', type: 'login' },
  { id: 'verify-email', template: 'verify-email.ftl', type: 'login' },
  { id: 'terms', template: 'terms.ftl', type: 'login' },
  { id: 'error', template: 'error.ftl', type: 'login' },
  { id: 'info', template: 'info.ftl', type: 'login' },
  { id: 'config-totp', template: 'login-config-totp.ftl', type: 'login' },
  { id: 'oauth-grant', template: 'login-oauth-grant.ftl', type: 'login' },
  { id: 'device-verify', template: 'login-oauth2-device-verify-user-code.ftl', type: 'login' },
  { id: 'update-profile', template: 'login-update-profile.ftl', type: 'login' },
  { id: 'idp-link-confirm', template: 'login-idp-link-confirm.ftl', type: 'login' },
  { id: 'otp-form', template: 'login-otp-form.ftl', type: 'login' },
  { id: 'webauthn-register', template: 'login-webauthn-register.ftl', type: 'login' },
  { id: 'webauthn-authenticate', template: 'login-webauthn-authenticate.ftl', type: 'login' },
  { id: 'saml-post', template: 'login-saml-post-form.ftl', type: 'login' },
  { id: 'saml-sso', template: 'login-saml-sso-post-form.ftl', type: 'login' },
  { id: 'saml-error', template: 'login-saml-error.ftl', type: 'login' },
  { id: 'idp-link-email', template: 'login-idp-link-email.ftl', type: 'login' },
  { id: 'x509-info', template: 'login-x509-info.ftl', type: 'login' },
  { id: 'authenticator-mapping-error', template: 'login-authenticator-mapping-error.ftl', type: 'login' },
  { id: 'authenticator-mapping-removed', template: 'login-authenticator-mapping-removed.ftl', type: 'login' },
  { id: 'authenticator-mapping-linked', template: 'login-authenticator-mapping-already-linked.ftl', type: 'login' },

  // Account console
  { id: 'account', template: 'index.ftl', type: 'account' },
]

// Theme properties template
const loginThemeProperties = `parent=keycloak
import=common/keycloak

# CSS styles
styles=css/login.css

# Meta tags
meta=viewport

# Supported locales
locales=en

# Custom properties
primaryColor=\${properties.primaryColor:-#3b82f6}
borderRadius=\${properties.borderRadius:-0.5rem}
`

const accountThemeProperties = `parent=keycloak
import=common/keycloak

# CSS styles
styles=css/account.css

# Meta tags
meta=viewport

# Supported locales
locales=en
`

// Freemarker template header
const ftlHeader = `<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=messagesPerField.exists('username','password') displayInfo=realm.password && realm.registrationAllowed;; section body>
`

// Freemarker template footer
const ftlFooter = `
</@layout.registrationLayout>
`

// HTML to Freemarker variable mappings
const variableMappings = {
  // Form actions
  'action="/login"': 'action="${url.loginAction}"',
  'name="username"': 'name="username" value="${(username!\'\')}"',
  'method="POST"': 'method="POST"',

  // URLs
  'url.loginUrl': '${url.loginUrl}',
  'url.registrationUrl': '${url.registrationUrl}',
  'url.loginResetCredentialsUrl': '${url.loginResetCredentialsUrl}',
  'url.tcsUrl': '${url.tcsUrl}',

  // Messages
  'message?html': '${message?html}',

  // Realm info
  'realm.name': '${realm.name}',
  'realm.displayName': '${realm.displayName!realm.name}',

  // User info
  'auth.attemptedUsername': '${auth.attemptedUsername!\'\'}',

  // OAuth
  'oauth.clientName': '${oauth.clientName}',
  'oauth.clientUrl': '${oauth.clientUrl}',
}

/**
 * Convert HTML to Freemarker template
 */
function convertToFreemarker(html, pageType) {
  let ftl = html

  // Add Freemarker header for login pages
  if (pageType === 'login') {
    ftl = ftlHeader + ftl + ftlFooter
  }

  // Replace HTML variables with Freemarker variables
  for (const [htmlVar, ftlVar] of Object.entries(variableMappings)) {
    ftl = ftl.replace(new RegExp(htmlVar.replace(/[${}]/g, '\\$&'), 'g'), ftlVar)
  }

  // Replace React specific patterns with Freemarker
  ftl = ftl.replace(
    /<span className="kc-error-message">/,
    '<#if message?has_content><div class="alert alert-danger">${message?html}</div></#if>'
  )

  ftl = ftl.replace(
    /<span className="kc-info-message">/,
    '<#if message?has_content><div class="info">${message?html}</div></#if>'
  )

  // Convert class attributes to Keycloak compatible format
  ftl = ftl.replace(/className=/g, 'class=')

  // Replace self-closing tags
  ftl = ftl.replace(/<input([^>]*)\/>/g, '<input$1>')

  // Add Keycloak specific CSS classes
  ftl = ftl.replace(
    /<form/g,
    '<form class="kc-form-class"'
  )

  return ftl
}

/**
 * Extract CSS from built files
 */
function extractCSS() {
  const cssFiles = []

  // Find all CSS files in dist directory
  const findCSSFiles = (dir) => {
    const files = fs.readdirSync(dir)
    files.forEach(file => {
      const filePath = path.join(dir, file)
      const stat = fs.statSync(filePath)
      if (stat.isDirectory()) {
        findCSSFiles(filePath)
      } else if (file.endsWith('.css')) {
        cssFiles.push(filePath)
      }
    })
  }

  findCSSFiles(distDir)

  return cssFiles
}

/**
 * Copy assets to theme directory
 */
function copyAssets() {
  const assetsSourceDir = path.join(distDir, 'assets')
  const assetsDestDir = path.join(themeOutputDir, 'login', 'resources')

  if (!fs.existsSync(assetsDestDir)) {
    fs.mkdirSync(assetsDestDir, { recursive: true })
  }

  // Copy CSS
  const cssDir = path.join(assetsDestDir, 'css')
  if (!fs.existsSync(cssDir)) {
    fs.mkdirSync(cssDir, { recursive: true })
  }

  const cssFiles = extractCSS()
  cssFiles.forEach(cssFile => {
    const content = fs.readFileSync(cssFile, 'utf-8')
    const filename = path.basename(cssFile)
    fs.writeFileSync(path.join(cssDir, filename), content)
  })

  // Copy JS
  const jsDir = path.join(assetsDestDir, 'js')
  if (!fs.existsSync(jsDir)) {
    fs.mkdirSync(jsDir, { recursive: true })
  }

  if (fs.existsSync(assetsSourceDir)) {
    const jsFiles = fs.readdirSync(assetsSourceDir).filter(f => f.endsWith('.js'))
    jsFiles.forEach(jsFile => {
      const content = fs.readFileSync(path.join(assetsSourceDir, jsFile), 'utf-8')
      fs.writeFileSync(path.join(jsDir, jsFile), content)
    })
  }
}

/**
 * Generate theme structure
 */
function generateTheme() {
  console.log('🚀 Generating Keycloak theme...')

  // Clean output directory
  if (fs.existsSync(themeOutputDir)) {
    fs.rmSync(themeOutputDir, { recursive: true, force: true })
  }
  fs.mkdirSync(themeOutputDir, { recursive: true })

  // Create login theme directory
  const loginDir = path.join(themeOutputDir, 'login')
  fs.mkdirSync(loginDir, { recursive: true })

  // Create account theme directory
  const accountDir = path.join(themeOutputDir, 'account')
  fs.mkdirSync(accountDir, { recursive: true })

  // Create message bundles directory
  const messagesDir = path.join(loginDir, 'messages')
  fs.mkdirSync(messagesDir, { recursive: true })

  // Create resources directory
  const resourcesDir = path.join(loginDir, 'resources')
  fs.mkdirSync(resourcesDir, { recursive: true })

  // Write theme properties
  console.log('📝 Writing theme properties...')
  fs.writeFileSync(path.join(loginDir, 'theme.properties'), loginThemeProperties)
  fs.writeFileSync(path.join(accountDir, 'theme.properties'), accountThemeProperties)

  // Generate message bundle
  console.log('📝 Writing message bundles...')
  const messagesEn = `# Login page
loginAccountTitle=Log In to Your Account
loginTitle=Sign In
loginTitleHtml=Sign In
doLogIn=Sign In
doRegister=Sign up
doForgotPassword=Forgot Password?

# Registration
registrationTitle=Create Account
registrationTitleHtml=Create Account
doRegister=Sign up

# Error messages
invalidUserMessage=Invalid username or password.

# Info messages
emailSentMessage=If an account exists with this email, you will receive password reset instructions shortly.
`

  fs.writeFileSync(
    path.join(messagesDir, 'messages_en.properties'),
    messagesEn
  )

  // Copy assets
  console.log('📦 Copying assets...')
  copyAssets()

  // Generate Freemarker templates
  console.log('🔧 Generating Freemarker templates...')
  for (const page of pages) {
    const htmlFile = path.join(distDir, 'src', 'pages', page.id, 'index.html')

    if (fs.existsSync(htmlFile)) {
      let html = fs.readFileSync(htmlFile, 'utf-8')

      // Convert to Freemarker template
      const ftl = convertToFreemarker(html, page.type)

      // Write template file
      const templateDir = page.type === 'account' ? accountDir : loginDir
      const templatePath = path.join(templateDir, page.template)

      fs.writeFileSync(templatePath, ftl)
      console.log(`  ✓ Generated ${page.template}`)
    } else {
      console.log(`  ⚠ Warning: ${page.id}.html not found`)
    }
  }

  console.log('✅ Theme generation complete!')
  console.log(`📁 Theme location: ${themeOutputDir}`)
  console.log('')
  console.log('To use this theme:')
  console.log('1. Copy the dist-theme/custom directory to your Keycloak themes directory')
  console.log('2. Or create a JAR archive and deploy it to Keycloak/providers')
  console.log('')
  console.log('For development, start Keycloak with:')
  console.log('bin/kc.sh start --spi-theme--static-max-age=-1 --spi-theme--cache-themes=false --spi-theme--cache-templates=false')
}

// Run the generator
try {
  generateTheme()
} catch (error) {
  console.error('❌ Error generating theme:', error)
  process.exit(1)
}
