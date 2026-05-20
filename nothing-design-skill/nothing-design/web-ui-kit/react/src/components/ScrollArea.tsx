import { useRef, useState, useCallback, useEffect } from 'react'
import '../styles/scroll-area.css'

interface ScrollAreaProps {
  height?: string
  children: React.ReactNode
}

const ScrollArea: React.FC<ScrollAreaProps> = ({
  height,
  children
}) => {
  const viewportRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLDivElement>(null)
  const [thumbHeight, setThumbHeight] = useState(0)
  const [thumbTop, setThumbTop] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const dragStartY = useRef(0)
  const dragStartScrollTop = useRef(0)

  const updateThumb = useCallback(() => {
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

  useEffect(() => {
    updateThumb()
    const viewport = viewportRef.current
    if (!viewport) return

    const observer = new ResizeObserver(updateThumb)
    observer.observe(viewport)

    return () => observer.disconnect()
  }, [updateThumb, children])

  const handleScroll = useCallback(() => {
    if (!isDragging) {
      updateThumb()
    }
  }, [updateThumb, isDragging])

  const handleThumbMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
    dragStartY.current = e.clientY
    dragStartScrollTop.current = viewportRef.current?.scrollTop ?? 0
  }, [])

  useEffect(() => {
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

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, updateThumb])

  const handleTrackClick = useCallback((e: React.MouseEvent) => {
    const viewport = viewportRef.current
    const scrollbar = e.currentTarget
    if (!viewport) return

    const rect = scrollbar.getBoundingClientRect()
    const clickY = e.clientY - rect.top
    const ratio = clickY / rect.height
    viewport.scrollTop = ratio * viewport.scrollHeight
    updateThumb()
  }, [updateThumb])

  return (
    <div
      className="nothing-scroll-area"
      style={height ? { height } : undefined}
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
            top: thumbTop
          }}
          onMouseDown={handleThumbMouseDown}
        />
      </div>
    </div>
  )
}

export default ScrollArea
