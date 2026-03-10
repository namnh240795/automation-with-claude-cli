import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ReactKeycloakProvider } from '@react-keycloak/web'
import { Toaster } from 'sonner'
import App from './App'
import { keycloak, keycloakInitOptions } from './lib/keycloak'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReactKeycloakProvider authClient={keycloak} initOptions={keycloakInitOptions}>
      <BrowserRouter>
        <App />
        <Toaster position="top-right" richColors />
      </BrowserRouter>
    </ReactKeycloakProvider>
  </StrictMode>,
)
