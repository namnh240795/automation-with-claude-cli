import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ReactKeycloakProvider } from '@react-keycloak/web'
import { keycloak, keycloakInitOptions } from './lib/keycloak'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReactKeycloakProvider authClient={keycloak} initOptions={keycloakInitOptions}>
      <App />
    </ReactKeycloakProvider>
  </StrictMode>,
)
