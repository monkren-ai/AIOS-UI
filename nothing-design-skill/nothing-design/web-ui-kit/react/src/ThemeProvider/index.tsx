'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

/**
 * 用户可选择的主题模式
 */
export type Theme = 'light' | 'dark' | 'system'

/**
 * 实际应用的外观（system 解析后的结果）
 */
export type ThemeAppearance = 'light' | 'dark'

export interface ThemeContextValue {
  /**
   * 当前选中的主题，可能是 'system'
   */
  theme: Theme
  /**
   * 实际生效的主题（system 会被解析为 light/dark）
   */
  resolvedTheme: ThemeAppearance
  /**
   * 系统主题
   */
  systemTheme: ThemeAppearance | undefined
  /**
   * 是否已完成挂载（用于避免 SSR/首屏闪烁）
   */
  mounted: boolean
  /**
   * 设置主题
   */
  setTheme: (theme: Theme) => void
  /**
   * 切换主题（dark → light → system → dark，或仅 dark/light 之间切换）
   */
  toggleTheme: () => void
}

export const DEFAULT_STORAGE_KEY = 'nothing-theme'
const MEDIA = '(prefers-color-scheme: dark)'

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'dark',
  resolvedTheme: 'dark',
  systemTheme: 'dark',
  mounted: false,
  setTheme: () => {},
  toggleTheme: () => {},
})

function getInitialTheme(defaultTheme: Theme, storageKey: string): Theme {
  if (typeof window === 'undefined') return defaultTheme
  const stored = window.localStorage.getItem(storageKey)
  if (stored === 'light' || stored === 'dark' || stored === 'system') return stored
  return defaultTheme
}

function getSystemTheme(): ThemeAppearance {
  if (typeof window === 'undefined') return 'dark'
  return window.matchMedia(MEDIA).matches ? 'dark' : 'light'
}

function applyTheme(theme: ThemeAppearance) {
  if (typeof document === 'undefined') return
  document.documentElement.setAttribute('data-theme', theme)
}

function disableAnimation() {
  const css = document.createElement('style')
  css.appendChild(
    document.createTextNode(
      '*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}',
    ),
  )
  document.head.appendChild(css)
  return () => {
    // Force reflow to ensure the no-transition rule is applied before class swap paints.

    ;(() => window.getComputedStyle(document.body))()
    setTimeout(() => {
      document.head.removeChild(css)
    }, 0)
  }
}

export interface ThemeProviderProps {
  children: ReactNode
  /**
   * 默认主题，默认为 'dark'
   */
  defaultTheme?: Theme
  /**
   * 强制主题，优先级最高
   */
  forcedTheme?: ThemeAppearance
  /**
   * 是否启用系统主题，默认 true
   */
  enableSystem?: boolean
  /**
   * 切换主题时是否禁用过渡动画，默认 true
   */
  disableTransitionOnChange?: boolean
  /**
   * 主题变化回调
   */
  onThemeChange?: (theme: Theme) => void
  /**
   * localStorage 的 key，默认 `'nothing-theme'`。
   *
   * 改了这里，`<ThemeScript>` 的同名属性必须一起改成同一个值，否则首屏内联脚本
   * 读的是另一个 key，会闪一下错误主题再被 provider 纠正。
   */
  storageKey?: string
}

/**
 * ThemeProvider
 *
 * 管理 Nothing UI 的明暗主题。
 *
 * - 通过 `data-theme` 属性切换主题（与 `tokens.css` 的 `[data-theme="dark"]` 选择器协同）
 * - 持久化到 `localStorage`（key: `nothing-theme`）
 * - 支持系统主题跟随（prefers-color-scheme）
 * - 支持 forcedTheme 强制主题
 * - 切换时临时禁用 CSS 过渡，避免颜色渐变闪烁
 *
 * @example
 * ```tsx
 * <ThemeProvider defaultTheme="dark" enableSystem>
 *   <App />
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider({
  children,
  defaultTheme = 'dark',
  forcedTheme,
  enableSystem = true,
  disableTransitionOnChange = true,
  onThemeChange,
  storageKey = DEFAULT_STORAGE_KEY,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return defaultTheme
    return getInitialTheme(defaultTheme, storageKey)
  })
  const [systemTheme, setSystemTheme] = useState<ThemeAppearance | undefined>(() =>
    enableSystem ? getSystemTheme() : undefined,
  )
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const resolvedTheme = useMemo<ThemeAppearance>(() => {
    if (forcedTheme) return forcedTheme
    if (theme === 'system')
      return systemTheme ?? (defaultTheme === 'system' ? 'dark' : defaultTheme)
    return theme
  }, [forcedTheme, theme, systemTheme, defaultTheme])

  // Apply theme and persist
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(storageKey, theme)
    }
    onThemeChange?.(theme)
  }, [theme, onThemeChange, storageKey])

  // Apply data-theme attribute with optional transition suppression
  useEffect(() => {
    const enable = disableTransitionOnChange ? disableAnimation() : null
    applyTheme(resolvedTheme)
    enable?.()
  }, [resolvedTheme, disableTransitionOnChange])

  // Listen to system theme changes
  useEffect(() => {
    if (!enableSystem) return
    const media = window.matchMedia(MEDIA)
    const handler = (e: MediaQueryListEvent | MediaQueryList) => {
      setSystemTheme(e.matches ? 'dark' : 'light')
    }
    handler(media)
    media.addEventListener('change', handler)
    return () => media.removeEventListener('change', handler)
  }, [enableSystem])

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next)
  }, [])

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      if (enableSystem) {
        // Cycle: dark → light → system → dark
        if (prev === 'dark') return 'light'
        if (prev === 'light') return 'system'
        return 'dark'
      }
      return prev === 'dark' ? 'light' : 'dark'
    })
  }, [enableSystem])

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      resolvedTheme,
      systemTheme,
      mounted,
      setTheme,
      toggleTheme,
    }),
    [theme, resolvedTheme, systemTheme, mounted, setTheme, toggleTheme],
  )

  return <ThemeContext value={value}>{children}</ThemeContext>
}

ThemeProvider.displayName = 'ThemeProvider'

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext)
}

export default ThemeProvider
