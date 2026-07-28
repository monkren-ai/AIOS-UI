import { lazy, Suspense, useCallback, useMemo, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ShowcaseProvider } from '@/showcase/ShowcaseContext'

const Showcase = lazy(() => import('@/showcase'))
const ProjectIntroPage = lazy(
  () => import('@/showcase/ProjectIntroPage').then((m) => ({ default: m.ProjectIntroPage })),
)
const AIPocPage = lazy(
  () => import('@/showcase/AIPocPage').then((m) => ({ default: m.AIPocPage })),
)

export type Lang = 'zh' | 'en'
export type T = (zh: string, en: string) => string

function RouteFallback() {
  return (
    <div
      style={{
        height: '100vh',
        display: 'grid',
        placeItems: 'center',
        background: 'var(--surface, #111111)',
        color: 'var(--text-primary, #E8E8E8)',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: '0.75rem',
          letterSpacing: '0.1em',
        }}
      >
        LOADING...
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
    void import('@/showcase/ProjectIntroPage')
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
    <BrowserRouter basename="/Nothing-UI">
      <ShowcaseProvider value={contextValue}>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Showcase />} />
            <Route path="/project-intro" element={<ProjectIntroPage />} />
            <Route path="/ai-poc" element={<AIPocPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </ShowcaseProvider>
    </BrowserRouter>
  )
}
