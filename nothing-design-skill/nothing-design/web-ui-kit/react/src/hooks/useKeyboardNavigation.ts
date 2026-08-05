import { useCallback } from 'react'

interface KeyboardNavigationOptions {
  items: HTMLElement[]
  orientation?: 'horizontal' | 'vertical' | 'both'
  loop?: boolean
  onSelect?: (index: number) => void
}

export function useKeyboardNavigation({
  items,
  orientation = 'vertical',
  loop = true,
  onSelect,
}: KeyboardNavigationOptions) {
  return useCallback(
    (e: React.KeyboardEvent, currentIndex: number) => {
      const isVertical = orientation === 'vertical' || orientation === 'both'
      const isHorizontal = orientation === 'horizontal' || orientation === 'both'

      let nextIndex = currentIndex

      switch (e.key) {
        case 'ArrowDown':
          if (isVertical) {
            e.preventDefault()
            nextIndex = currentIndex + 1
          }
          break
        case 'ArrowUp':
          if (isVertical) {
            e.preventDefault()
            nextIndex = currentIndex - 1
          }
          break
        case 'ArrowRight':
          if (isHorizontal) {
            e.preventDefault()
            nextIndex = currentIndex + 1
          }
          break
        case 'ArrowLeft':
          if (isHorizontal) {
            e.preventDefault()
            nextIndex = currentIndex - 1
          }
          break
        case 'Home':
          e.preventDefault()
          nextIndex = 0
          break
        case 'End':
          e.preventDefault()
          nextIndex = items.length - 1
          break
        case 'Enter':
        case ' ':
          e.preventDefault()
          onSelect?.(currentIndex)
          return
        default:
          return
      }

      if (loop) {
        nextIndex = ((nextIndex % items.length) + items.length) % items.length
      } else {
        nextIndex = Math.max(0, Math.min(items.length - 1, nextIndex))
      }

      items[nextIndex]?.focus()
    },
    [items, orientation, loop, onSelect],
  )
}
