'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react'

const MEDIA = '(prefers-reduced-motion: reduce)'

export interface ReducedMotionContextValue {
  /** 当前是否应该抑制动效。 */
  reducedMotion: boolean
  /** 系统偏好本身，不受 `force` 影响。 */
  systemReducedMotion: boolean
}

/**
 * 默认值是 `null` 而不是 `{ reducedMotion: false }`：两者在类型上一样，但只有
 * 前者能让 hook 分辨「没有 provider」和「provider 说不用降级」。少了这个区分，
 * 忘记挂 provider 的树会安静地照常播动画——正是无障碍上最不该静默失败的地方。
 */
const ReducedMotionContext = createContext<ReducedMotionContextValue | null>(null)

function getSystemPreference(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia(MEDIA).matches
}

export interface ReducedMotionProviderProps {
  children: ReactNode
  /**
   * 覆盖系统偏好。
   *
   * `true` 强制关掉动效，`false` 强制开启（谨慎使用），
   * 不传则跟随 `prefers-reduced-motion`。
   */
  force?: boolean
}

/**
 * 把 `prefers-reduced-motion` 暴露给组件树，并写到 `<html data-reduced-motion>` 上。
 *
 * CSS 层面其实已经有一条全局的 `@media (prefers-reduced-motion: reduce)` 兜底，
 * 但 JS 驱动的动画（motion 的 spring、canvas 里的点阵动效）读不到媒体查询，
 * 得靠 `useReducedMotion()` 自己判断。应用内提供开关时，`force` 也能覆盖系统值。
 */
export function ReducedMotionProvider({ children, force }: ReducedMotionProviderProps) {
  const [systemReducedMotion, setSystemReducedMotion] = useState(getSystemPreference)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const media = window.matchMedia(MEDIA)
    const handler = (event: MediaQueryListEvent) => setSystemReducedMotion(event.matches)
    setSystemReducedMotion(media.matches)
    media.addEventListener('change', handler)
    return () => media.removeEventListener('change', handler)
  }, [])

  const reducedMotion = force ?? systemReducedMotion

  useEffect(() => {
    if (typeof document === 'undefined') return
    const root = document.documentElement
    if (reducedMotion) root.setAttribute('data-reduced-motion', '')
    else root.removeAttribute('data-reduced-motion')
  }, [reducedMotion])

  const value = useMemo<ReducedMotionContextValue>(
    () => ({ reducedMotion, systemReducedMotion }),
    [reducedMotion, systemReducedMotion],
  )

  return <ReducedMotionContext value={value}>{children}</ReducedMotionContext>
}

ReducedMotionProvider.displayName = 'ReducedMotionProvider'

function subscribeToMedia(onChange: () => void): () => void {
  if (typeof window === 'undefined' || !window.matchMedia) return () => {}
  const media = window.matchMedia(MEDIA)
  media.addEventListener('change', onChange)
  return () => media.removeEventListener('change', onChange)
}

/**
 * 返回当前是否应该抑制动效。
 *
 * 有 provider 就用 provider 的值（这样 `force` 能生效）；没有的话直接订阅系统
 * 媒体查询，所以单独拿来用也是对的。服务端一律按「不降级」渲染，客户端接管后
 * 再纠正——媒体查询在服务端本来就无从得知。
 */
export function useReducedMotion(): boolean {
  const context = useContext(ReducedMotionContext)

  // hook 数量必须恒定，所以订阅无条件建立；有 provider 时结果直接丢弃。
  const standalone = useSyncExternalStore(
    subscribeToMedia,
    getSystemPreference,
    useCallback(() => false, []),
  )

  return context ? context.reducedMotion : standalone
}

export default ReducedMotionProvider
