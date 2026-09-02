import './app.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { motion } from 'motion/react'
import { type MotionComponentType } from '@/MotionProvider'
import { App } from '@/App'
import ErrorBoundary from '@/ErrorBoundary'
import { ThemeCatalogProvider } from '@/site/themes/ThemeCatalogProvider'
import { installPreloadErrorRecovery } from '@/preload-recovery'

installPreloadErrorRecovery()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeCatalogProvider motion={motion as unknown as MotionComponentType}>
        <App />
      </ThemeCatalogProvider>
    </ErrorBoundary>
  </StrictMode>,
)
