/**
 * useLocalStorageState - localStorage 同步 + 跨标签 storage 事件 + SSR safe.
 */
import { useCallback, useEffect, useState } from 'react'

export function useLocalStorageState<T>(
  key: string,
  defaultValue: T
): [T, (v: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return defaultValue
    try {
      const raw = window.localStorage.getItem(key)
      if (raw === null) return defaultValue
      return JSON.parse(raw) as T
    } catch {
      return defaultValue
    }
  })

  const set = useCallback(
    (v: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const next = v instanceof Function ? v(prev) : v
        try {
          window.localStorage.setItem(key, JSON.stringify(next))
        } catch {
          // quota or private mode — silently ignore
        }
        return next
      })
    },
    [key]
  )

  // Cross-tab sync
  useEffect(() => {
    if (typeof window === 'undefined') return
    const onStorage = (e: StorageEvent) => {
      if (e.key !== key || e.newValue === null) return
      try {
        setValue(JSON.parse(e.newValue) as T)
      } catch {
        // ignore
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [key])

  return [value, set]
}
