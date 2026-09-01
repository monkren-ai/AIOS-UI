'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  AIOS_BUILTIN_THEMES,
  AIOS_DEFAULT_THEME_ID,
  DEFAULT_THEME_ID_STORAGE_KEY,
  DEFAULT_THEME_SNAPSHOT_STORAGE_KEY,
  applyThemeTokens,
  resolveThemeTokens,
  type ThemeDefinition,
} from './themes'

export type Theme = 'light' | 'dark' | 'system'
export type ThemeAppearance = 'light' | 'dark'

export interface ThemeContextValue {
  theme: Theme
  resolvedTheme: ThemeAppearance
  systemTheme: ThemeAppearance | undefined
  mounted: boolean
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  themeId: string
  activeTheme: ThemeDefinition
  themes: readonly ThemeDefinition[]
  setThemeId: (themeId: string) => void
}

export const DEFAULT_STORAGE_KEY = 'aios-theme'
const MEDIA = '(prefers-color-scheme: dark)'
const defaultDefinition = AIOS_BUILTIN_THEMES[0]

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'dark', resolvedTheme: 'dark', systemTheme: 'dark', mounted: false,
  setTheme: () => {}, toggleTheme: () => {}, themeId: AIOS_DEFAULT_THEME_ID,
  activeTheme: defaultDefinition, themes: AIOS_BUILTIN_THEMES, setThemeId: () => {},
})

function storedTheme(defaultTheme: Theme, storageKey: string): Theme {
  if (typeof window === 'undefined') return defaultTheme
  const value = window.localStorage.getItem(storageKey)
  return value === 'light' || value === 'dark' || value === 'system' ? value : defaultTheme
}

function storedSnapshot(storageKey: string): ThemeDefinition | null {
  if (typeof window === 'undefined') return null
  try {
    const value = JSON.parse(window.localStorage.getItem(storageKey) || 'null') as ThemeDefinition | null
    return value?.id && value?.modes ? value : null
  } catch { return null }
}

function systemAppearance(): ThemeAppearance {
  return typeof window !== 'undefined' && window.matchMedia(MEDIA).matches ? 'dark' : 'light'
}

function disableAnimation() {
  const style = document.createElement('style')
  style.textContent = '*,*::before,*::after{transition:none!important}'
  document.head.appendChild(style)
  return () => { window.getComputedStyle(document.body); setTimeout(() => style.remove(), 0) }
}

export interface ThemeProviderProps {
  children: ReactNode
  defaultTheme?: Theme
  forcedTheme?: ThemeAppearance
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
  onThemeChange?: (theme: Theme) => void
  storageKey?: string
  themes?: readonly ThemeDefinition[]
  defaultThemeId?: string
  themeIdStorageKey?: string
  themeSnapshotStorageKey?: string
  onThemeIdChange?: (themeId: string) => void
}

export function ThemeProvider({
  children, defaultTheme = 'dark', forcedTheme, enableSystem = true,
  disableTransitionOnChange = true, onThemeChange, storageKey = DEFAULT_STORAGE_KEY,
  themes: suppliedThemes = [], defaultThemeId = AIOS_DEFAULT_THEME_ID,
  themeIdStorageKey = DEFAULT_THEME_ID_STORAGE_KEY,
  themeSnapshotStorageKey = DEFAULT_THEME_SNAPSHOT_STORAGE_KEY, onThemeIdChange,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => storedTheme(defaultTheme, storageKey))
  const [themeId, setThemeIdState] = useState(() =>
    typeof window === 'undefined' ? defaultThemeId : window.localStorage.getItem(themeIdStorageKey) || defaultThemeId,
  )
  const [snapshot] = useState(() => storedSnapshot(themeSnapshotStorageKey))
  const [systemTheme, setSystemTheme] = useState<ThemeAppearance | undefined>(() => enableSystem ? systemAppearance() : undefined)
  const [mounted, setMounted] = useState(false)

  const themes = useMemo(() => {
    const catalog = new Map<string, ThemeDefinition>()
    AIOS_BUILTIN_THEMES.forEach((item) => catalog.set(item.id, item))
    suppliedThemes.forEach((item) => catalog.set(item.id, item))
    if (snapshot && !catalog.has(snapshot.id)) catalog.set(snapshot.id, snapshot)
    return [...catalog.values()]
  }, [snapshot, suppliedThemes])
  const activeTheme = useMemo(() =>
    themes.find((item) => item.id === themeId) ?? themes.find((item) => item.id === defaultThemeId) ?? defaultDefinition,
  [defaultThemeId, themeId, themes])
  const resolvedTheme = useMemo<ThemeAppearance>(() => {
    if (forcedTheme) return forcedTheme
    if (theme === 'system') return systemTheme ?? (defaultTheme === 'system' ? 'dark' : defaultTheme)
    return theme
  }, [defaultTheme, forcedTheme, systemTheme, theme])

  useEffect(() => setMounted(true), [])
  useEffect(() => { window.localStorage.setItem(storageKey, theme); onThemeChange?.(theme) }, [onThemeChange, storageKey, theme])
  useEffect(() => {
    window.localStorage.setItem(themeIdStorageKey, activeTheme.id)
    window.localStorage.setItem(themeSnapshotStorageKey, JSON.stringify(activeTheme))
    onThemeIdChange?.(activeTheme.id)
  }, [activeTheme, onThemeIdChange, themeIdStorageKey, themeSnapshotStorageKey])
  useEffect(() => {
    const restore = disableTransitionOnChange ? disableAnimation() : null
    const root = document.documentElement
    root.setAttribute('data-theme', resolvedTheme)
    root.setAttribute('data-theme-id', activeTheme.id)
    applyThemeTokens(root, resolveThemeTokens(activeTheme, resolvedTheme))
    restore?.()
  }, [activeTheme, disableTransitionOnChange, resolvedTheme])
  useEffect(() => {
    if (!enableSystem) return
    const media = window.matchMedia(MEDIA)
    const handler = (event: MediaQueryListEvent | MediaQueryList) => setSystemTheme(event.matches ? 'dark' : 'light')
    handler(media)
    media.addEventListener('change', handler)
    return () => media.removeEventListener('change', handler)
  }, [enableSystem])

  const setTheme = useCallback((next: Theme) => setThemeState(next), [])
  const setThemeId = useCallback((next: string) => {
    if (themes.some((item) => item.id === next)) setThemeIdState(next)
  }, [themes])
  const toggleTheme = useCallback(() => setThemeState((previous) => {
    if (!enableSystem) return previous === 'dark' ? 'light' : 'dark'
    if (previous === 'dark') return 'light'
    if (previous === 'light') return 'system'
    return 'dark'
  }), [enableSystem])

  const value = useMemo<ThemeContextValue>(() => ({
    theme, resolvedTheme, systemTheme, mounted, setTheme, toggleTheme,
    themeId: activeTheme.id, activeTheme, themes, setThemeId,
  }), [activeTheme, mounted, resolvedTheme, setTheme, setThemeId, systemTheme, theme, themes, toggleTheme])

  return <ThemeContext value={value}>{children}</ThemeContext>
}

ThemeProvider.displayName = 'ThemeProvider'
export function useTheme(): ThemeContextValue { return useContext(ThemeContext) }
export default ThemeProvider
