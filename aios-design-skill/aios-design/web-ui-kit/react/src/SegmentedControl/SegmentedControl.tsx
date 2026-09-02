import * as React from 'react'
import { type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '@/lib/utils'
import {
  segmentedHoverSliderVariants,
  segmentedSliderVariants,
  segmentedVariants,
  segmentVariants,
} from './segmented-control-variants'

export interface SegmentedControlProps
  extends
    Omit<React.ComponentPropsWithRef<'div'>, 'onChange'>,
    VariantProps<typeof segmentedVariants> {
  segments: string[]
  activeIndex?: number
  onChange?: (index: number) => void
  /** 启用 proximity hover 预览效果 */
  proximity?: boolean
}

/**
 * 把 `offsetLeft` 这类物理偏移换算成 inline-start 偏移。
 * slider 用 `inset-inline-start` 定位，RTL 下必须翻面。
 */
function toInlineStart(container: HTMLElement | null, offsetLeft: number, width: number): number {
  if (!container) return offsetLeft
  if (getComputedStyle(container).direction !== 'rtl') return offsetLeft
  return container.clientWidth - offsetLeft - width
}

export function SegmentedControl({
  className,
  segments,
  activeIndex: controlledIndex,
  variant = 'pill',
  size = 'md',
  disabled = false,
  proximity = false,
  onChange,
  ref,
  ...props
}: SegmentedControlProps) {
  const [internalIndex, setInternalIndex] = React.useState(0)
  const [sliderStyle, setSliderStyle] = React.useState<React.CSSProperties>({})
  const [hoverIndex, setHoverIndex] = React.useState<number | null>(null)
  const [hoverStyle, setHoverStyle] = React.useState<React.CSSProperties>({ opacity: 0 })
  const rootRef = React.useRef<HTMLDivElement | null>(null)
  const segmentRefs = React.useRef<(HTMLButtonElement | null)[]>([])

  const activeIdx = controlledIndex !== undefined ? controlledIndex : internalIndex
  // activeIndex 越界时仍要留一个 Tab 停靠点，否则整条控件从键盘上消失
  const rovingIdx = activeIdx >= 0 && activeIdx < segments.length ? activeIdx : 0

  const setRootRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      rootRef.current = node
      if (typeof ref === 'function') {
        ref(node)
      } else if (ref) {
        ref.current = node
      }
    },
    [ref],
  )

  const updateSlider = React.useCallback(() => {
    const activeSegment = segmentRefs.current[activeIdx]
    if (activeSegment) {
      setSliderStyle({
        width: activeSegment.offsetWidth,
        insetInlineStart: toInlineStart(
          rootRef.current,
          activeSegment.offsetLeft,
          activeSegment.offsetWidth,
        ),
      })
    }
  }, [activeIdx])

  React.useLayoutEffect(() => {
    updateSlider()
  }, [updateSlider])

  const updateHoverSlider = React.useCallback((index: number | null) => {
    if (index == null) {
      setHoverStyle((prev) => ({ ...prev, opacity: 0 }))
      return
    }
    const seg = segmentRefs.current[index]
    if (!seg) return
    setHoverStyle({
      width: seg.offsetWidth,
      insetInlineStart: toInlineStart(rootRef.current, seg.offsetLeft, seg.offsetWidth),
      opacity: 1,
    })
  }, [])

  React.useLayoutEffect(() => {
    updateHoverSlider(hoverIndex)
  }, [hoverIndex, updateHoverSlider])

  const handleSelect = (index: number) => {
    if (disabled) return
    if (controlledIndex === undefined) {
      setInternalIndex(index)
    }
    onChange?.(index)
  }

  /**
   * radiogroup 的方向键要同时移动焦点与选中态。
   * 左右键在 RTL 下含义相反，上下键则始终按 DOM 顺序走。
   */
  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (disabled) return
    const count = segments.length
    if (count === 0) return
    const rtl = rootRef.current ? getComputedStyle(rootRef.current).direction === 'rtl' : false

    let next: number
    switch (event.key) {
      case 'ArrowRight':
        next = index + (rtl ? -1 : 1)
        break
      case 'ArrowLeft':
        next = index + (rtl ? 1 : -1)
        break
      case 'ArrowDown':
        next = index + 1
        break
      case 'ArrowUp':
        next = index - 1
        break
      case 'Home':
        next = 0
        break
      case 'End':
        next = count - 1
        break
      default:
        return
    }

    event.preventDefault()
    const target = ((next % count) + count) % count
    segmentRefs.current[target]?.focus()
    handleSelect(target)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!proximity || disabled) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    let nearest = 0
    let nearestDist = Infinity
    segmentRefs.current.forEach((seg, i) => {
      if (!seg) return
      const center = seg.offsetLeft + seg.offsetWidth / 2
      const dist = Math.abs(x - center)
      if (dist < nearestDist) {
        nearestDist = dist
        nearest = i
      }
    })
    setHoverIndex(nearest)
  }

  const handleMouseLeave = () => {
    setHoverIndex(null)
  }

  return (
    <div
      ref={setRootRef}
      className={cn(segmentedVariants({ variant, size, disabled, proximity }), className)}
      data-slot="segmented-control"
      data-variant={dataAttr(variant)}
      data-size={dataAttr(size)}
      data-disabled={dataAttr(disabled)}
      data-proximity={dataAttr(proximity)}
      role="radiogroup"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <div
        className={segmentedSliderVariants({ variant })}
        data-slot="segmented-control-slider"
        style={sliderStyle}
        aria-hidden="true"
      />
      {proximity && (
        <div
          className={segmentedHoverSliderVariants({ variant })}
          data-slot="segmented-control-hover-slider"
          style={hoverStyle}
          aria-hidden="true"
        />
      )}
      {segments.map((segment, index) => (
        <button
          key={index}
          ref={(el) => {
            segmentRefs.current[index] = el
          }}
          className={cn(
            segmentVariants({
              active: index === activeIdx,
              hovered: index === hoverIndex,
              size,
            }),
          )}
          data-slot="segmented-control-segment"
          onClick={() => handleSelect(index)}
          onKeyDown={(event) => handleKeyDown(event, index)}
          disabled={!!disabled}
          type="button"
          role="radio"
          aria-checked={index === activeIdx}
          // roving tabindex：整条控件只占一个 Tab 停靠点，段间切换交给方向键
          tabIndex={index === rovingIdx ? 0 : -1}
          data-state={dataAttr(index === activeIdx ? 'active' : 'inactive')}
        >
          {segment}
        </button>
      ))}
    </div>
  )
}

SegmentedControl.displayName = 'SegmentedControl'

export { segmentedVariants, segmentVariants, segmentedSliderVariants, segmentedHoverSliderVariants }
export default SegmentedControl
