import React from 'react'
import ReactDOM from 'react-dom/client'
import { ErrorPage } from './ErrorPage'
import '@/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorPage />
  </React.StrictMode>,
)
