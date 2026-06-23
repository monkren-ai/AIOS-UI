import './styles/tokens.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Showcase from '@/showcase'
import ErrorBoundary from '@/ErrorBoundary'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <Showcase />
    </ErrorBoundary>
  </StrictMode>,
)
