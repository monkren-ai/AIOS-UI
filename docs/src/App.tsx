import { lazy, Suspense, useCallback, useMemo, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ShowcaseProvider } from '@/showcase/ShowcaseContext'
import { SiteLayout } from '@/site/SiteLayout'
import { ScrollToTop } from '@/site/components/ScrollToTop'

const LandingPage = lazy(() => import('@/site/pages/LandingPage'))
const AboutPage = lazy(() => import('@/site/pages/AboutPage'))
const ComponentsLayout = lazy(() => import('@/site/pages/ComponentsLayout'))
const ComponentsIndexPage = lazy(() => import('@/site/pages/ComponentsIndexPage'))
const ComponentDetailPage = lazy(() => import('@/site/pages/ComponentDetailPage'))
const DocsLayout = lazy(() => import('@/site/pages/DocsLayout'))
const DocPage = lazy(() => import('@/site/pages/DocPage'))
const IconsPage = lazy(() => import('@/site/pages/icons/IconsPage'))

const AIPocPage = lazy(() => import('@/showcase/AIPocPage').then((m) => ({ default: m.AIPocPage })))

import type { Lang, T } from '@/i18n/types'

export type { Lang, T }

function RouteFallback() {
  return (
    <div className="grid min-h-[60vh] place-items-center bg-background text-foreground">
      <span className="font-mono text-label uppercase tracking-widest text-foreground-subtle">
        Loading…
      </span>
    </div>
  )
}

export function App() {
  const [lang, setLang] = useState<Lang>('zh')

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === 'zh' ? 'en' : 'zh'))
  }, [])

  const preloadProjectIntro = useCallback(() => {
    void import('@/site/pages/AboutPage')
  }, [])

  const preloadAIPoc = useCallback(() => {
    void import('@/showcase/AIPocPage')
  }, [])

  const preloadShowcase = useCallback(() => {
    void import('@/showcase')
  }, [])

  const t = useMemo<T>(() => {
    return (zh, en) => (lang === 'zh' ? zh : en)
  }, [lang])

  const contextValue = useMemo(
    () => ({ lang, t, toggleLang, preloadProjectIntro, preloadAIPoc, preloadShowcase }),
    [lang, t, toggleLang, preloadProjectIntro, preloadAIPoc, preloadShowcase],
  )

  return (
    <BrowserRouter basename="/AIOS-UI">
      <ShowcaseProvider value={contextValue}>
        <ScrollToTop />
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route element={<SiteLayout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/about" element={<AboutPage />} />

              <Route path="/docs" element={<DocsLayout />}>
                <Route index element={<Navigate to="/docs/installation" replace />} />
                <Route path=":slug" element={<DocPage />} />
              </Route>

              <Route path="/components" element={<ComponentsLayout />}>
                <Route index element={<ComponentsIndexPage />} />
                <Route path="overview" element={<Navigate to="/components" replace />} />
                <Route path=":slug" element={<ComponentDetailPage />} />
              </Route>

              <Route path="/icons" element={<IconsPage />} />

              <Route path="/showcase" element={<Navigate to="/components" replace />} />
              <Route path="/project-intro" element={<Navigate to="/about" replace />} />
              <Route path="/ai-poc" element={<AIPocPage />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </ShowcaseProvider>
    </BrowserRouter>
  )
}
