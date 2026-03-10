import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        // Login theme pages
        'login': path.resolve(__dirname, 'src/pages/login/index.html'),
        'register': path.resolve(__dirname, 'src/pages/register/index.html'),
        'forgot-password': path.resolve(__dirname, 'src/pages/forgot-password/index.html'),
        'update-password': path.resolve(__dirname, 'src/pages/update-password/index.html'),
        'verify-email': path.resolve(__dirname, 'src/pages/verify-email/index.html'),
        'terms': path.resolve(__dirname, 'src/pages/terms/index.html'),
        'error': path.resolve(__dirname, 'src/pages/error/index.html'),
        'info': path.resolve(__dirname, 'src/pages/info/index.html'),
        'config-totp': path.resolve(__dirname, 'src/pages/config-totp/index.html'),
        'oauth-grant': path.resolve(__dirname, 'src/pages/oauth-grant/index.html'),
        'device-verify': path.resolve(__dirname, 'src/pages/device-verify/index.html'),
        'update-profile': path.resolve(__dirname, 'src/pages/update-profile/index.html'),
        'idp-link-confirm': path.resolve(__dirname, 'src/pages/idp-link-confirm/index.html'),
        'otp-form': path.resolve(__dirname, 'src/pages/otp-form/index.html'),
        'webauthn-register': path.resolve(__dirname, 'src/pages/webauthn-register/index.html'),
        'webauthn-authenticate': path.resolve(__dirname, 'src/pages/webauthn-authenticate/index.html'),
        'saml-post': path.resolve(__dirname, 'src/pages/saml-post/index.html'),
        'saml-sso': path.resolve(__dirname, 'src/pages/saml-sso/index.html'),
        'saml-error': path.resolve(__dirname, 'src/pages/saml-error/index.html'),
        'idp-link-email': path.resolve(__dirname, 'src/pages/idp-link-email/index.html'),
        'x509-info': path.resolve(__dirname, 'src/pages/x509-info/index.html'),
        'authenticator-mapping-error': path.resolve(__dirname, 'src/pages/authenticator-mapping-error/index.html'),
        'authenticator-mapping-removed': path.resolve(__dirname, 'src/pages/authenticator-mapping-removed/index.html'),
        'authenticator-mapping-linked': path.resolve(__dirname, 'src/pages/authenticator-mapping-linked/index.html'),

        // Account console
        'account': path.resolve(__dirname, 'src/pages/account/index.html'),
      },
    },
  },
})
