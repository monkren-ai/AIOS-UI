import * as React from 'react'
import { cn } from '../lib/utils'
import '../styles/scroll-area.css'

export type ScrollAreaProps = React.HTMLAttributes<HTMLDivElement> & {
  height?: string
  children?: React.ReactNode
}

export const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ className, height, style, children, ...props }, ref) => {
    const viewportRef = React.useRef<HTMLDivElement>(null)
    const thumbRef = React.useRef<HTMLDivElement>(null)
    const [thumbHeight, setThumbHeight] = React.useState(0)
    const [thumbTop, setThumbTop] = React.useState(0)
    const [isDragging, setIsDragging] = React.useState(false)
    const dragStartY = React.useRef(0)
    const dragStartScrollTop = React.useRef(0)

    const updateThumb = React.useCallback(() => {
      const viewport = viewportRef.current
      if (!viewport) return
      const { scrollHeight, clientHeight, scrollTop } = viewport
      if (scrollHeight <= clientHeight) {
        setThumbHeight(0)
        return
      }
      const ratio = clientHeight / scrollHeight
      const newThumbHeight = Math.max(ratio * clientHeight, 20)
      const maxThumbTop = clientHeight - newThumbHeight
      const newThumbTop = (scrollTop / (scrollHeight - clientHeight)) * maxThumbTop
      setThumbHeight(newThumbHeight)
      setThumbTop(newThumbTop)
    }, [])

    React.useEffect(() => {
      updateThumb()
      const viewport = viewportRef.current
      if (!viewport) return
      const observer = new ResizeObserver(updateThumb)
      observer.observe(viewport)
      return () => observer.disconnect()
    }, [updateThumb, children])

    const handleScroll = React.useCallback(() => {
      if (!isDragging) updateThumb()
    }, [updateThumb, isDragging])

    const handleThumbMouseDown = React.useCallback((e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(true)
      dragStartY.current = e.clientY
      dragStartScrollTop.current = viewportRef.current?.scrollTop ?? 0
    }, [])

    React.useEffect(() => {
      if (!isDragging) return
      const handleMouseMove = (e: MouseEvent) => {
        const viewport = viewportRef.current
        if (!viewport) return
        const deltaY = e.clientY - dragStartY.current
        const { scrollHeight, clientHeight } = viewport
        const ratio = clientHeight / scrollHeight
        viewport.scrollTop = dragStartScrollTop.current + deltaY / ratio
        updateThumb()
      }
      const handleMouseUp = () => setIsDragging(false)
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
      }
    }, [isDragging, updateThumb])

    const handleTrackClick = React.useCallback(
      (e: React.MouseEvent) => {
        const viewport = viewportRef.current
        const scrollbar = e.currentTarget
        if (!viewport) return
        const rect = scrollbar.getBoundingClientRect()
        const clickY = e.clientY - rect.top
        const ratio = clickY / rect.height
        viewport.scrollTop = ratio * viewport.scrollHeight
        updateThumb()
      },
      [updateThumb]
    )

    return (
      <div
        ref={ref}
        className={cn('nothing-scroll-area', className)}
        style={height ? { height, ...style } : style}
        data-dragging={isDragging || undefined}
        {...props}
      >
        <div
          ref={viewportRef}
          className="nothing-scroll-area__viewport"
          onScroll={handleScroll}
        >
          {children}
        </div>
        <div
          className="nothing-scroll-area__scrollbar"
          onClick={handleTrackClick}
        >
          <div
            ref={thumbRef}
            className="nothing-scroll-area__thumb"
            style={{
              height: thumbHeight > 0 ? thumbHeight : 0,
              top: thumbTop,
            }}
            onMouseDown={handleThumbMouseDown}
          />
        </div>
      </div>
    )
  }
)
ScrollArea.displayName = 'ScrollArea'

export default ScrollArea
