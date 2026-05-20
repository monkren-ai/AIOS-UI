import React, { useState, useRef, useCallback, useEffect } from 'react'
import '../styles/resizable.css'

interface ResizableProps {
  direction?: 'horizontal' | 'vertical'
  initialSizes?: number[]
  minSizes?: number[]
  maxSizes?: number[]
  children: React.ReactNode
}

const Resizable: React.FC<ResizableProps> = ({
  direction = 'horizontal',
  initialSizes,
  minSizes,
  maxSizes,
  children
}) => {
  const childArray = React.Children.toArray(children)
  const panelCount = childArray.length

  const defaultSizes = initialSizes ?? Array(panelCount).fill(100 / panelCount)
  const mins = minSizes ?? Array(panelCount).fill(10)
  const maxs = maxSizes ?? Array(panelCount).fill(90)

  const [sizes, setSizes] = useState<number[]>(defaultSizes)
  const [activeHandle, setActiveHandle] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const startPos = useRef(0)
  const startSizes = useRef<number[]>([])

  const isHorizontal = direction === 'horizontal'

  const handleMouseDown = useCallback((index: number, e: React.MouseEvent) => {
    e.preventDefault()
    setActiveHandle(index)
    startPos.current = isHorizontal ? e.clientX : e.clientY
    startSizes.current = [...sizes]
  }, [isHorizontal, sizes])

  const handleKeyDown = useCallback((index: number, e: React.KeyboardEvent) => {
    const step = 2
    let delta = 0

    if (isHorizontal) {
      if (e.key === 'ArrowLeft') delta = -step
      else if (e.key === 'ArrowRight') delta = step
    } else {
      if (e.key === 'ArrowUp') delta = -step
      else if (e.key === 'ArrowDown') delta = step
    }

    if (delta === 0) return
    e.preventDefault()

    setSizes(prev => {
      const next = [...prev]
      const leftIdx = index
      const rightIdx = index + 1
      const newLeft = Math.max(mins[leftIdx], Math.min(maxs[leftIdx], next[leftIdx] + delta))
      const diff = newLeft - next[leftIdx]
      const newRight = next[rightIdx] - diff
      if (newRight < mins[rightIdx] || newRight > maxs[rightIdx]) return prev
      next[leftIdx] = newLeft
      next[rightIdx] = newRight
      return next
    })
  }, [isHorizontal, mins, maxs])

  useEffect(() => {
    if (activeHandle === null) return

    const handleMouseMove = (e: MouseEvent) => {
      const currentPos = isHorizontal ? e.clientX : e.clientY
      const containerEl = containerRef.current
      if (!containerEl) return

      const containerSize = isHorizontal ? containerEl.offsetWidth : containerEl.offsetHeight
      const diffPx = currentPos - startPos.current
      const diffPercent = (diffPx / containerSize) * 100

      setSizes(() => {
        const next = [...startSizes.current]
        const leftIdx = activeHandle
        const rightIdx = activeHandle + 1
        const newLeft = Math.max(mins[leftIdx], Math.min(maxs[leftIdx], next[leftIdx] + diffPercent))
        const actualDiff = newLeft - next[leftIdx]
        const newRight = next[rightIdx] - actualDiff
        if (newRight < mins[rightIdx]) return next
        next[leftIdx] = newLeft
        next[rightIdx] = newRight
        return next
      })
    }

    const handleMouseUp = () => {
      setActiveHandle(null)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [activeHandle, isHorizontal, mins, maxs])

  const containerClassNames = [
    'nothing-resizable',
    `nothing-resizable--${direction}`
  ].join(' ')

  return (
    <div className={containerClassNames} ref={containerRef}>
      {childArray.map((child, index) => (
        <React.Fragment key={index}>
          <div
            className="nothing-resizable__panel"
            style={{ flex: `0 0 ${sizes[index]}%` }}
          >
            {child}
          </div>
          {index < panelCount - 1 && (
            <div
              className={[
                'nothing-resizable__handle',
                `nothing-resizable__handle--${direction}`,
                activeHandle === index ? 'nothing-resizable__handle--active' : ''
              ].filter(Boolean).join(' ')}
              role="separator"
              aria-orientation={isHorizontal ? 'vertical' : 'horizontal'}
              aria-valuenow={Math.round(sizes[index])}
              aria-valuemin={mins[index]}
              aria-valuemax={maxs[index]}
              tabIndex={0}
              onMouseDown={(e) => handleMouseDown(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

export default Resizable
