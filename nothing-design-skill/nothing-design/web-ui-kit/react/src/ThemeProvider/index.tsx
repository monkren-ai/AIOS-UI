'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

/**
 * 主题外观
 */
export type ThemeAppearance = 'light' | 'dark'

/**
 * 主题上下文值
 */
export interface ThemeContextValue {
  /**
   * 当前主题外观
   */
  theme: ThemeAppearance
  /**
   * 是否暗色模式
   */
  isDarkMode: boolean
  /**
   * 设置主题
   */
  setTheme: (theme: ThemeAppearance) => void
  /**
   * 切换主题
   */
  toggleTheme: () => void
}

const STORAGE_KEY = 'nothing-theme'

/**
 * 主题上下文（默认 dark，与 Nothing 设计语言一致）
 */
export const ThemeContext = createContext<ThemeContextValue>({
  theme: 'dark',
  isDarkMode: true,
  setTheme: () => {},
  toggleTheme: () => {},
})

/**
 * 从 localStorage 读取初始主题
 */
function getInitialTheme(): ThemeAppearance {
  if (typeof window === 'undefined') return 'dark'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  // 默认 dark，与 index.html 的 data-theme="dark" 一致
  return 'dark'
}

/**
 * 将主题应用到 document.documentElement
 */
function applyTheme(theme: ThemeAppearance) {
  if (typeof document === 'undefined') return
  document.documentElement.setAttribute('data-theme', theme)
}

/**
 * useTheme hook
 *
 * 获取当前主题与切换方法。
 *
 * @example
 * ```tsx
 * const { theme, isDarkMode, toggleTheme } = useTheme()
 * ```
 */
export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext)
}

export interface ThemeProviderProps {
  children: ReactNode
  /**
   * 默认主题，默认为 'dark'
   */
  defaultTheme?: ThemeAppearance
  /**
   * 主题变化回调
   */
  onThemeChange?: (theme: ThemeAppearance) => void
}

/**
 * ThemeProvider
 *
 * 管理 Nothing UI 的明暗主题。
 *
 * - 通过 `data-theme` 属性切换主题（与 `tokens.css` 的 `[data-theme="dark"]` 选择器协同）
 * - 持久化到 `localStorage`（key: `nothing-theme`）
 * - 默认主题为 `dark`（与 Nothing 设计语言一致）
 *
 * @example
 * ```tsx
 * <ThemeProvider defaultTheme="dark">
 *   <App />
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider({
  children,
  defaultTheme = 'dark',
  onThemeChange,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeAppearance>(() => {
    if (typeof window === 'undefined') return defaultTheme
    return getInitialTheme()
  })

  // 应用主题到 documentElement
  useEffect(() => {
    applyTheme(theme)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, theme)
    }
    onThemeChange?.(theme)
  }, [theme, onThemeChange])

  const setTheme = useCallback((next: ThemeAppearance) => {
    setThemeState(next)
  }, [])

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }, [])

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      isDarkMode: theme === 'dark',
      setTheme,
      toggleTheme,
    }),
    [theme, setTheme, toggleTheme],
  )

  return <ThemeContext value={value}>{children}</ThemeContext>
}

ThemeProvider.displayName = 'ThemeProvider'

export default ThemeProvider
