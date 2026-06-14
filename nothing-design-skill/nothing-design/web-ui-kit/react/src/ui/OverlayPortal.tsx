import * as React from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useClickOutside } from '../hooks/useClickOutside'
import { useDisclosure, type DisclosureReturn } from '../hooks/useDisclosure'

/**
 * 浮层方向: Popover / HoverCard / DropdownMenu 共有。
 * 包含 'left'/'right' (DropdownMenu 不支持, 留作扩展) + 'top'/'bottom'。
 */
export type OverlaySide = 'top' | 'right' | 'bottom' | 'left'
export type OverlayAlign = 'start' | 'center' | 'end'

/**
 * OverlayPortal — 6 个 overlay 组件 (Modal / Sheet / HoverCard / Popover /
 * ContextMenu / DropdownMenu) 共享的原语集合。
 *
 * 各组件仍拥有自己的 trigger UI 与 content 布局, 这里只抽取:
 *   - 1. 受控/非受控开关状态 (useOverlayState)
 *   - 2. Escape 键监听 (useEscapeKey)
 *   - 3. body 滚动锁 (useScrollLock)
 *   - 4. 焦点陷阱 (useFocusTrap) — 自动 focus 第一个可聚焦元素, 关闭时还原
 *   - 5. createPortal 包装 (OverlayPortal)
 *   - 6. 容器外部点击 (useOverlayClickOutside) — 复用 useClickOutside
 *
 * 用法示例 (Modal):
 *   const { isOpen, setOpen } = useOverlayState(controlledOpen, onClose)
 *   useEscapeKey(isOpen, () => setOpen(false))
 *   useScrollLock(isOpen)
 *   const trapRef = useFocusTrap<HTMLDivElement>(isOpen)
 *   return (
 *     <OverlayPortal open={isOpen}>
 *       <div ref={trapRef} className="dialog">...</div>
 *     </OverlayPortal>
 *   )
 */

// ---------- 1. useOverlayState ----------

/**
 * 统一受控/非受控开关状态。
 * - controlled 为 undefined: 内部 state (非受控)
 * - controlled 有值: 使用受控值, 但同时通过 onChange 回传
 */
export function useOverlayState(
  controlled: boolean | undefined,
  onChange?: (open: boolean) => void
) {
  const [internal, setInternal] = useState(false)
  const isOpen = controlled !== undefined ? controlled : internal

  const setOpen = useCallback(
    (next: boolean) => {
      if (controlled === undefined) {
        setInternal(next)
      }
      onChange?.(next)
    },
    [controlled, onChange]
  )

  return {
    isOpen,
    setOpen,
    open: () => setOpen(true),
    close: () => setOpen(false),
    toggle: () => setOpen(!isOpen),
  } as const
}

// ---------- 2. useEscapeKey ----------

/**
 * 全局 Escape 键监听。active=true 时挂载, false 时卸载。
 * 注: 不调用 e.preventDefault(), 让上层 focus trap 可继续处理 Tab 等。
 */
export function useEscapeKey(active: boolean, handler: () => void) {
  useEffect(() => {
    if (!active) return
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handler()
      }
    }
    document.addEventListener('keydown', fn)
    return () => document.removeEventListener('keydown', fn)
  }, [active, handler])
}

// ---------- 3. useScrollLock ----------

/**
 * active=true 时锁住 body 滚动 (overflow=hidden), 卸载时还原。
 * 多个 overlay 同时活跃时, 用 ref-count 保证不会提前解锁。
 */
let scrollLockCount = 0
let savedBodyOverflow = ''

function lockBodyScroll() {
  if (typeof document === 'undefined') return
  if (scrollLockCount === 0) {
    savedBodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
  }
  scrollLockCount += 1
}

function unlockBodyScroll() {
  if (typeof document === 'undefined') return
  scrollLockCount = Math.max(0, scrollLockCount - 1)
  if (scrollLockCount === 0) {
    document.body.style.overflow = savedBodyOverflow
  }
}

export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return
    lockBodyScroll()
    return () => {
      unlockBodyScroll()
    }
  }, [active])
}

// ---------- 4. useFocusTrap ----------

const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

/**
 * 焦点陷阱: active=true 时把焦点拉入 ref 容器, 卸载时还原到打开前元素。
 * 容器内 Tab 循环在外部由消费者 (Modal) 自行实现 (可访问 onKeyDown)。
 *
 * 返回的 ref 应附加到 dialog/panel 根元素。
 */
export function useFocusTrap<T extends HTMLElement>(active: boolean) {
  const ref = useRef<T | null>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!active) return
    previousFocusRef.current = document.activeElement as HTMLElement
    const id = requestAnimationFrame(() => {
      const el = ref.current
      if (!el) return
      const first = el.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)
      first?.focus()
    })
    return () => {
      cancelAnimationFrame(id)
      previousFocusRef.current?.focus?.()
    }
  }, [active])

  return ref
}

/**
 * 在 ref 容器内实现 Tab 循环焦点陷阱。
 * 消费者应把返回的 onKeyDown 挂到 dialog 根元素。
 */
export function useTabCycle<T extends HTMLElement>(active: boolean) {
  const ref = useRef<T | null>(null)
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<T>) => {
      if (e.key !== 'Tab' || !active || !ref.current) return
      const focusable = ref.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    },
    [active]
  )
  return { ref, onKeyDown }
}

// ---------- 5. OverlayPortal ----------

export interface OverlayPortalProps {
  /** 是否渲染内容。false 时不挂载 portal, 也不渲染任何节点。 */
  open: boolean
  children: React.ReactNode
  /** 自定义容器, 默认 document.body。 */
  container?: HTMLElement | null
  /** SSR 安全守卫: window 未定义时不渲染。 */
  ssrGuard?: boolean
}

export const OverlayPortal: React.FC<OverlayPortalProps> = ({
  open,
  children,
  container,
  ssrGuard = true,
}) => {
  if (!open) return null
  if (ssrGuard && typeof document === 'undefined') return null
  return createPortal(children, container ?? document.body)
}

// ---------- 6. useOverlayClickOutside ----------

/**
 * 容器外点击关闭。仅在 open=true 时生效。
 * 复用 hooks/useClickOutside (相同签名)。
 */
export function useOverlayClickOutside(
  ref: React.RefObject<HTMLElement | null>,
  open: boolean,
  handler: () => void
) {
  useClickOutside(ref, () => {
    if (open) handler()
  })
}

// ---------- 7. useOverlayDisclosure (compat) ----------

/**
 * 与现有 useDisclosure 行为一致, 但把返回类型 re-export 出去,
 * 便于各组件在迁移到 useOverlayState 之前平滑过渡。
 */
export type { DisclosureReturn }
export { useDisclosure }
