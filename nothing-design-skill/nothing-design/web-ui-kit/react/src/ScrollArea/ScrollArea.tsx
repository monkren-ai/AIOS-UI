import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import {
  scrollAreaScrollbarVariants,
  scrollAreaThumbVariants,
  scrollAreaViewportVariants,
  scrollAreaVariants,
} from './scroll-area-variants'

export type ScrollAreaProps = React.ComponentPropsWithRef<'div'> & {
  height?: string
  children?: React.ReactNode
  /**
   * 透传给真正滚动的视口。
   *
   * 根元素上的属性落在不滚动的外框，够不到视口，所以 `aria-label`、`onScroll`、
   * 视口自己的 `ref` 都得从这里进。视口默认 `tabIndex={0}`，
   * 给了 `aria-label` / `aria-labelledby` 才会补上 `role="region"`——
   * 无名的 region 在读屏里等于不存在。
   */
  viewportProps?: React.ComponentPropsWithRef<'div'>
}

export function ScrollArea({
  className,
  height,
  style,
  children,
  viewportProps,
  ...props
}: ScrollAreaProps) {
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

  const {
    className: viewportClassName,
    ref: callerViewportRef,
    onScroll: callerOnScroll,
    ...restViewportProps
  } = viewportProps ?? {}

  const setViewportRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      viewportRef.current = node
      if (typeof callerViewportRef === 'function') {
        callerViewportRef(node)
      } else if (callerViewportRef) {
        callerViewportRef.current = node
      }
    },
    [callerViewportRef],
  )

  const handleScroll = React.useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      if (!isDragging) updateThumb()
      callerOnScroll?.(event)
    },
    [updateThumb, isDragging, callerOnScroll],
  )

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
    [updateThumb],
  )

  return (
    <div
      className={cn(scrollAreaVariants(), className)}
      style={height ? { height, ...style } : style}
      data-slot="scroll-area"
      data-dragging={dataAttr(isDragging)}
      {...props}
    >
      {/*
        视口是唯一会滚的那层，所以键盘可达性只能做在这里：
        没有可聚焦子元素时，`tabIndex={0}` 是方向键够到下半截内容的唯一途径。
      */}
      <div
        ref={setViewportRef}
        className={cn(scrollAreaViewportVariants(), viewportClassName)}
        data-slot="scroll-area-viewport"
        tabIndex={0}
        role={
          restViewportProps['aria-label'] || restViewportProps['aria-labelledby']
            ? 'region'
            : undefined
        }
        {...restViewportProps}
        onScroll={handleScroll}
      >
        {children}
      </div>
      <div
        className={scrollAreaScrollbarVariants()}
        data-slot="scroll-area-scrollbar"
        onClick={handleTrackClick}
      >
        <div
          ref={thumbRef}
          className={scrollAreaThumbVariants()}
          data-slot="scroll-area-thumb"
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

ScrollArea.displayName = 'ScrollArea'

export {
  scrollAreaVariants,
  scrollAreaViewportVariants,
  scrollAreaScrollbarVariants,
  scrollAreaThumbVariants,
}
export default ScrollArea
