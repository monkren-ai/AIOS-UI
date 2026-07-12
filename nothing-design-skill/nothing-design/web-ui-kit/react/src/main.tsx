import './styles/tokens.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { motion, AnimatePresence } from 'motion/react'
import { ConfigProvider } from '@/ConfigProvider'
import Showcase from '@/showcase'
import ErrorBoundary from '@/ErrorBoundary'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <ConfigProvider motion={motion} defaultTheme="dark">
        <Showcase />
      </ConfigProvider>
    </ErrorBoundary>
  </StrictMode>,
)
