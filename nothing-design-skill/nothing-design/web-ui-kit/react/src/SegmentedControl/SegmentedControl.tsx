import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '@/lib/utils'
import './SegmentedControl.css'

const segmentedVariants = cva('nothing-segmented', {
  variants: {
    variant: {
      pill: '',
      rounded: 'nothing-segmented--rounded',
    },
    disabled: { true: 'nothing-segmented--disabled', false: '' },
    proximity: { true: 'nothing-segmented--proximity', false: '' },
  },
  defaultVariants: { variant: 'pill', disabled: false, proximity: false },
})

const segmentVariants = cva('nothing-segmented__segment', {
  variants: {
    active: { true: 'nothing-segmented__segment--active', false: '' },
    hovered: { true: 'nothing-segmented__segment--hovered', false: '' },
  },
  defaultVariants: { active: false, hovered: false },
})

export interface SegmentedControlProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof segmentedVariants> {
  segments: string[]
  activeIndex?: number
  onChange?: (index: number) => void
  /** 启用 proximity hover 预览效果 */
  proximity?: boolean
}

export const SegmentedControl = React.forwardRef<HTMLDivElement, SegmentedControlProps>(
  (
    {
      className,
      segments,
      activeIndex: controlledIndex,
      variant = 'pill',
      disabled = false,
      proximity = false,
      onChange,
      ...props
    },
    ref,
  ) => {
    const [internalIndex, setInternalIndex] = React.useState(0)
    const [sliderStyle, setSliderStyle] = React.useState<React.CSSProperties>({})
    const [hoverIndex, setHoverIndex] = React.useState<number | null>(null)
    const [hoverStyle, setHoverStyle] = React.useState<React.CSSProperties>({ opacity: 0 })
    const segmentRefs = React.useRef<(HTMLButtonElement | null)[]>([])

    const activeIdx = controlledIndex !== undefined ? controlledIndex : internalIndex

    const updateSlider = React.useCallback(() => {
      const activeSegment = segmentRefs.current[activeIdx]
      if (activeSegment) {
        setSliderStyle({
          width: activeSegment.offsetWidth,
          left: activeSegment.offsetLeft,
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
        left: seg.offsetLeft,
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
        ref={ref}
        className={cn(segmentedVariants({ variant, disabled, proximity }), className)}
        data-variant={dataAttr(variant)}
        data-disabled={dataAttr(disabled)}
        data-proximity={dataAttr(proximity)}
        role="tablist"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <div className="nothing-segmented__slider" style={sliderStyle} />
        {proximity && <div className="nothing-segmented__hover-slider" style={hoverStyle} />}
        {segments.map((segment, index) => (
          <button
            key={index}
            ref={(el) => {
              segmentRefs.current[index] = el
            }}
            className={cn(
              segmentVariants({ active: index === activeIdx, hovered: index === hoverIndex }),
            )}
            onClick={() => handleSelect(index)}
            disabled={!!disabled}
            role="tab"
            aria-selected={index === activeIdx}
            data-state={dataAttr(index === activeIdx ? 'active' : 'inactive')}
          >
            {segment}
          </button>
        ))}
      </div>
    )
  },
)
SegmentedControl.displayName = 'SegmentedControl'

export { segmentedVariants, segmentVariants }
export default SegmentedControl
