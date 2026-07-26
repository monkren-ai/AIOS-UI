import './styles/tokens.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { motion } from 'motion/react'
import { type MotionComponentType } from '@/MotionProvider'
import { ConfigProvider } from '@/ConfigProvider'
import { App } from '@/App'
import ErrorBoundary from '@/ErrorBoundary'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <ConfigProvider motion={motion as unknown as MotionComponentType} defaultTheme="dark" enableSystem>
        <App />
      </ConfigProvider>
    </ErrorBoundary>
  </StrictMode>,
)
