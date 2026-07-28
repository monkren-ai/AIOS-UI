import { createContext, useContext } from 'react'
import type { Lang, T } from '@/App'

export interface ShowcaseContextValue {
  lang: Lang
  t: T
  toggleLang: () => void
  preloadProjectIntro: () => void
  preloadAIPoc: () => void
  preloadShowcase: () => void
}

const ShowcaseContext = createContext<ShowcaseContextValue | null>(null)

export function ShowcaseProvider({
  children,
  value,
}: {
  children: React.ReactNode
  value: ShowcaseContextValue
}) {
  return <ShowcaseContext.Provider value={value}>{children}</ShowcaseContext.Provider>
}

export function useShowcaseContext() {
  const ctx = useContext(ShowcaseContext)
  if (!ctx) {
    throw new Error('useShowcaseContext must be used within ShowcaseProvider')
  }
  return ctx
}
