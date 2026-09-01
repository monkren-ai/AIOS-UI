import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { ConfigProvider } from '@/ConfigProvider'
import type { MotionComponentType } from '@/MotionProvider'
import type { ThemeDefinition } from '@/ThemeProvider'
import { listStoredThemes, removeStoredTheme, storeTheme } from './storage'

interface ThemeCatalogValue {
  customThemes: ThemeDefinition[]
  persistenceError: string | null
  saveTheme: (theme: ThemeDefinition) => Promise<void>
  deleteTheme: (id: string) => Promise<void>
}

const ThemeCatalogContext = createContext<ThemeCatalogValue | null>(null)

export function ThemeCatalogProvider({ children, motion }: { children: ReactNode; motion: MotionComponentType }) {
  const [customThemes, setCustomThemes] = useState<ThemeDefinition[]>([])
  const [persistenceError, setPersistenceError] = useState<string | null>(null)

  useEffect(() => {
    if (!('indexedDB' in window)) {
      setPersistenceError('当前浏览器不支持 IndexedDB；主题仅在本次会话可用。')
      return
    }
    void listStoredThemes().then(setCustomThemes).catch(() => {
      setPersistenceError('无法读取本地主题；你仍可在本次会话中使用导入主题。')
    })
  }, [])

  const saveTheme = useCallback(async (theme: ThemeDefinition) => {
    setCustomThemes((current) => [...current.filter((item) => item.id !== theme.id), theme])
    try {
      await storeTheme(theme)
      setPersistenceError(null)
    } catch {
      setPersistenceError('主题已在本次会话启用，但无法持久化到浏览器。')
    }
  }, [])

  const deleteTheme = useCallback(async (id: string) => {
    setCustomThemes((current) => current.filter((item) => item.id !== id))
    try { await removeStoredTheme(id) }
    catch { setPersistenceError('主题已从本次会话移除，但本地存储清理失败。') }
  }, [])

  const value = useMemo(() => ({ customThemes, persistenceError, saveTheme, deleteTheme }),
    [customThemes, deleteTheme, persistenceError, saveTheme])

  return (
    <ConfigProvider motion={motion} defaultTheme="dark" enableSystem themes={customThemes}>
      <ThemeCatalogContext value={value}>{children}</ThemeCatalogContext>
    </ConfigProvider>
  )
}

export function useThemeCatalog() {
  const value = useContext(ThemeCatalogContext)
  if (!value) throw new Error('useThemeCatalog must be used within ThemeCatalogProvider')
  return value
}
