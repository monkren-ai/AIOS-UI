import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation'
import { useEscapeKey, useOverlayState, OverlayPortal } from '@/ui/OverlayPortal'
import {
  contextMenuContentVariants,
  contextMenuItemLabelVariants,
  contextMenuItemShortcutVariants,
  contextMenuItemVariants,
  contextMenuSeparatorVariants,
  contextMenuTriggerVariants,
  contextMenuVariants,
} from './context-menu-variants'

export interface ContextMenuActionItem {
  label: string
  onClick?: () => void
  disabled?: boolean
  shortcut?: string
  /**
   * @deprecated 旧写法：在这一项下面补一条线。改用独立的一项 `{ separator: true }`。
   */
  separator?: boolean
}

/** 独立成一项的分隔线，与 `DropdownMenuItem` 的写法一致。 */
export interface ContextMenuSeparatorItem {
  separator: true
  label?: never
  onClick?: never
  disabled?: never
  shortcut?: never
}

export type ContextMenuItem = ContextMenuActionItem | ContextMenuSeparatorItem

/**
 * 只有 `separator` 没有 `label` 才是独立分隔线——它不渲染菜单项，因此也不能出现在
 * 任何一份焦点索引里。带 `label` 的 `separator: true` 是过渡期保留的旧写法，含义是
 * 「渲染这一项，再在它下面补一条线」。
 */
function isStandaloneSeparator(item: ContextMenuItem): item is ContextMenuSeparatorItem {
  return !!item.separator && item.label === undefined
}

export interface ContextMenuProps extends Omit<React.ComponentPropsWithRef<'div'>, 'children'> {
  items: ContextMenuItem[]
  children: React.ReactElement
}

export function ContextMenu({ className, items, children, ref, ...props }: ContextMenuProps) {
  const { isOpen, close, setOpen } = useOverlayState(undefined)
  const [position, setPosition] = React.useState<{ top: number; left: number }>({ top: 0, left: 0 })
  const [activeIndex, setActiveIndex] = React.useState(-1)
  const contentRef = React.useRef<HTMLDivElement | null>(null)
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const triggerRef = React.useRef<HTMLDivElement | null>(null)
  const previousFocusRef = React.useRef<HTMLElement | null>(null)
  const itemRefs = React.useRef<(HTMLElement | null)[]>([])

  const setContainerRefs = React.useCallback(
    (node: HTMLDivElement | null) => {
      containerRef.current = node
      if (typeof ref === 'function') ref(node)
      else if (ref && 'current' in ref) {
        ;(ref as React.RefObject<HTMLDivElement | null>).current = node
      }
    },
    [ref],
  )

  // Click outside covers both the trigger wrapper AND the portaled content
  // (content lives in document.body after portal, so containerRef alone is not enough).
  React.useEffect(() => {
    if (!isOpen) return
    const handler = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null
      if (!target) return
      if (containerRef.current?.contains(target)) return
      if (contentRef.current?.contains(target)) return
      close()
    }
    document.addEventListener('mousedown', handler)
    document.addEventListener('touchstart', handler)
    return () => {
      document.removeEventListener('mousedown', handler)
      document.removeEventListener('touchstart', handler)
    }
  }, [isOpen, close])

  useEscapeKey(isOpen, close)

  const firstFocusableIndex = items.findIndex(
    (item) => !isStandaloneSeparator(item) && !item.disabled,
  )

  /**
   * 打开时把焦点交给第一个可用项，关闭时还原。
   *
   * 依赖里放的是 `firstFocusableIndex` 而不是 `items`——调用方几乎都是内联字面量数组，
   * 用 `items` 会让这个 effect 每次渲染都重跑一遍，焦点被反复抢走。
   */
  React.useEffect(() => {
    if (!isOpen) return
    const trigger = triggerRef.current
    previousFocusRef.current = document.activeElement as HTMLElement | null
    if (firstFocusableIndex >= 0) {
      setActiveIndex(firstFocusableIndex)
      itemRefs.current[firstFocusableIndex]?.focus()
    } else {
      contentRef.current?.focus()
    }
    return () => {
      const previous = previousFocusRef.current
      previousFocusRef.current = null
      setActiveIndex(-1)
      // 右键唤起时焦点通常还留在 body 上，还原到 body 等于把焦点丢回页面开头，
      // 这种情况退回触发区域——它现在是可聚焦的。
      if (previous && previous !== document.body && previous.isConnected) {
        previous.focus()
      } else {
        trigger?.focus()
      }
    }
  }, [isOpen, firstFocusableIndex])

  const openAt = React.useCallback(
    (top: number, left: number) => {
      setPosition({ top, left })
      setOpen(true)
      setActiveIndex(-1)
    },
    [setOpen],
  )

  const handleContextMenu = React.useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      // 键盘唤起的原生 contextmenu（焦点落在 children 内部的可聚焦元素上时）
      // 坐标是 0/0，落点会跑到视口左上角，这里改用触发区域自身的位置。
      if (e.clientX === 0 && e.clientY === 0) {
        const rect = triggerRef.current?.getBoundingClientRect()
        openAt(rect?.bottom ?? 0, rect?.left ?? 0)
        return
      }
      openAt(e.clientY, e.clientX)
    },
    [openAt],
  )

  const handleTriggerKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      // Shift+F10 与 ContextMenu 键在多数浏览器里也会派发一个原生 contextmenu 事件，
      // 但那要求焦点正好落在这一层上（在此之前它根本进不了 tab 序列）。显式接管并
      // preventDefault，既补上缺口，也避免两条路各开一次。
      if (e.key === 'ContextMenu' || (e.shiftKey && e.key === 'F10')) {
        e.preventDefault()
        const rect = triggerRef.current?.getBoundingClientRect()
        openAt(rect?.bottom ?? 0, rect?.left ?? 0)
      }
    },
    [openAt],
  )

  const handleItemSelect = React.useCallback(
    (index: number) => {
      const item = items[index]
      if (!item || isStandaloneSeparator(item) || item.disabled) return
      item.onClick?.()
      close()
    },
    [items, close],
  )

  /**
   * 键盘导航只认这一份列表：分隔线与禁用项都不在里面，每一项带着自己在 `items` 里的原始
   * 下标。只收已经拿到 DOM 节点的项，这样「第几个可聚焦项」与 `focusableNodes` 的下标
   * 永远对齐，不会出现两套编号各走各的。
   */
  const focusableEntries = items.flatMap((item, index) => {
    if (isStandaloneSeparator(item) || item.disabled) return []
    const node = itemRefs.current[index]
    return node ? [{ index, node }] : []
  })
  const focusableNodes = focusableEntries.map((entry) => entry.node)

  const handleKeyDown = useKeyboardNavigation({
    items: focusableNodes,
    orientation: 'vertical',
    loop: true,
    onSelect: (focusableIndex) => {
      const entry = focusableEntries[focusableIndex]
      if (entry) handleItemSelect(entry.index)
    },
  })

  // 非模态浮层，背后的内容既没有 inert 也没被移出 tab 序列，Tab 必须自己圈回来。
  const handleTabCycle = React.useCallback(
    (e: React.KeyboardEvent) => {
      e.preventDefault()
      if (focusableNodes.length === 0) return
      const current = focusableNodes.indexOf(document.activeElement as HTMLElement)
      if (current === -1) {
        const fallback = e.shiftKey ? focusableNodes[focusableNodes.length - 1] : focusableNodes[0]
        fallback?.focus()
        return
      }
      const next = (current + (e.shiftKey ? -1 : 1) + focusableNodes.length) % focusableNodes.length
      focusableNodes[next]?.focus()
    },
    [focusableNodes],
  )

  // 焦点落在哪一项上时 tabIndex 才是 0（roving tabindex）；菜单整体只占 tab 序列一格。
  const rovingIndex = focusableEntries.some((entry) => entry.index === activeIndex)
    ? activeIndex
    : firstFocusableIndex

  return (
    <div
      ref={setContainerRefs}
      className={cn(contextMenuVariants(), className)}
      data-slot="context-menu"
      data-state={dataAttr(isOpen ? 'open' : 'closed')}
      {...props}
    >
      <div
        ref={triggerRef}
        className={cn(contextMenuTriggerVariants())}
        data-slot="context-menu-trigger"
        tabIndex={0}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onContextMenu={handleContextMenu}
        onKeyDown={handleTriggerKeyDown}
      >
        {children}
      </div>
      <OverlayPortal open={isOpen}>
        <div
          ref={contentRef}
          className={cn(contextMenuContentVariants({ visible: isOpen }))}
          role="menu"
          tabIndex={-1}
          data-slot="context-menu-content"
          style={{ top: position.top, left: position.left }}
          onKeyDown={(e) => {
            if (e.key === 'Tab') {
              handleTabCycle(e)
            } else if (activeIndex >= 0) {
              const focusableIndex = focusableEntries.findIndex(
                (entry) => entry.index === activeIndex,
              )
              if (focusableIndex >= 0) {
                handleKeyDown(e, focusableIndex)
              }
            } else if (e.key === 'ArrowDown') {
              e.preventDefault()
              const first = focusableEntries[0]
              if (first) {
                setActiveIndex(first.index)
                first.node.focus()
              }
            } else if (e.key === 'ArrowUp') {
              e.preventDefault()
              const last = focusableEntries[focusableEntries.length - 1]
              if (last) {
                setActiveIndex(last.index)
                last.node.focus()
              }
            }
          }}
          data-state={dataAttr(isOpen ? 'open' : 'closed')}
        >
          {items.map((item, index) =>
            isStandaloneSeparator(item) ? (
              <div
                key={`sep-${index}`}
                className={cn(contextMenuSeparatorVariants())}
                role="separator"
                data-slot="context-menu-separator"
              />
            ) : (
              <React.Fragment key={`item-${index}`}>
                <div
                  ref={(node) => {
                    itemRefs.current[index] = node
                  }}
                  className={cn(contextMenuItemVariants({ disabled: !!item.disabled }))}
                  role="menuitem"
                  tabIndex={!item.disabled && index === rovingIndex ? 0 : -1}
                  aria-disabled={item.disabled || undefined}
                  onClick={() => handleItemSelect(index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      // 冒到菜单本体上会被 useKeyboardNavigation 的 Enter/Space 再选一次。
                      e.stopPropagation()
                      handleItemSelect(index)
                    }
                  }}
                  onFocus={() => setActiveIndex(index)}
                  data-slot="context-menu-item"
                  data-disabled={dataAttr(item.disabled)}
                >
                  <span
                    className={cn(contextMenuItemLabelVariants())}
                    data-slot="context-menu-item-label"
                  >
                    {item.label}
                  </span>
                  {item.shortcut && (
                    <span
                      className={cn(contextMenuItemShortcutVariants())}
                      data-slot="context-menu-item-shortcut"
                    >
                      {item.shortcut}
                    </span>
                  )}
                </div>
                {item.separator && (
                  <div
                    className={cn(contextMenuSeparatorVariants())}
                    role="separator"
                    data-slot="context-menu-separator"
                  />
                )}
              </React.Fragment>
            ),
          )}
        </div>
      </OverlayPortal>
    </div>
  )
}

ContextMenu.displayName = 'ContextMenu'

export {
  contextMenuContentVariants,
  contextMenuItemLabelVariants,
  contextMenuItemShortcutVariants,
  contextMenuItemVariants,
  contextMenuSeparatorVariants,
  contextMenuTriggerVariants,
  contextMenuVariants,
}
export default ContextMenu
