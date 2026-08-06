import { useState, useCallback } from 'react'

export type Placement = 'top' | 'bottom' | 'left' | 'right'

export interface FloatingReturn {
  style: React.CSSProperties
  update: (anchor: HTMLElement, floating: HTMLElement) => void
}

export function useFloating(placement: Placement = 'bottom'): FloatingReturn {
  const [style, setStyle] = useState<React.CSSProperties>({
    position: 'absolute',
    zIndex: 1000,
  })

  const update = useCallback(
    (anchor: HTMLElement, floating: HTMLElement) => {
      const anchorRect = anchor.getBoundingClientRect()
      const floatingRect = floating.getBoundingClientRect()
      const gap = 8

      let top = 0
      let left = 0

      switch (placement) {
        case 'top':
          top = anchorRect.top - floatingRect.height - gap
          left = anchorRect.left + (anchorRect.width - floatingRect.width) / 2
          break
        case 'bottom':
          top = anchorRect.bottom + gap
          left = anchorRect.left + (anchorRect.width - floatingRect.width) / 2
          break
        case 'left':
          top = anchorRect.top + (anchorRect.height - floatingRect.height) / 2
          left = anchorRect.left - floatingRect.width - gap
          break
        case 'right':
          top = anchorRect.top + (anchorRect.height - floatingRect.height) / 2
          left = anchorRect.right + gap
          break
      }

      top = Math.max(8, Math.min(top, window.innerHeight - floatingRect.height - 8))
      left = Math.max(8, Math.min(left, window.innerWidth - floatingRect.width - 8))

      setStyle((prev) => ({ ...prev, top, left }))
    },
    [placement],
  )

  return { style, update }
}
