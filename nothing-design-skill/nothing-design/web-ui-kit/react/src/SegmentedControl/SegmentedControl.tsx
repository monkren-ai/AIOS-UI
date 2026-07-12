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
  },
  defaultVariants: { variant: 'pill', disabled: false },
})

const segmentVariants = cva('nothing-segmented__segment', {
  variants: {
    active: { true: 'nothing-segmented__segment--active', false: '' },
  },
  defaultVariants: { active: false },
})

export interface SegmentedControlProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof segmentedVariants> {
  segments: string[]
  activeIndex?: number
  onChange?: (index: number) => void
}

export const SegmentedControl = React.forwardRef<HTMLDivElement, SegmentedControlProps>(
  (
    {
      className,
      segments,
      activeIndex: controlledIndex,
      variant = 'pill',
      disabled = false,
      onChange,
      ...props
    },
    ref
  ) => {
    const [internalIndex, setInternalIndex] = React.useState(0)
    const [sliderStyle, setSliderStyle] = React.useState<React.CSSProperties>({})
    const segmentRefs = React.useRef<(HTMLButtonElement | null)[]>([])

    const activeIdx = controlledIndex !== undefined ? controlledIndex : internalIndex

    React.useEffect(() => {
      const activeSegment = segmentRefs.current[activeIdx]
      if (activeSegment) {
        setSliderStyle({
          width: activeSegment.offsetWidth,
          left: activeSegment.offsetLeft,
        })
      }
    }, [activeIdx, segments])

    const handleSelect = (index: number) => {
      if (disabled) return
      if (controlledIndex === undefined) {
        setInternalIndex(index)
      }
      onChange?.(index)
    }

    return (
      <div
        ref={ref}
        className={cn(segmentedVariants({ variant, disabled }), className)}
        data-variant={dataAttr(variant)}
        data-disabled={dataAttr(disabled)}
        role="tablist"
        {...props}
      >
        <div className="nothing-segmented__slider" style={sliderStyle} />
        {segments.map((segment, index) => (
          <button
            key={index}
            ref={(el) => {
              segmentRefs.current[index] = el
            }}
            className={cn(segmentVariants({ active: index === activeIdx }))}
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
  }
)
SegmentedControl.displayName = 'SegmentedControl'

export { segmentedVariants, segmentVariants }
export default SegmentedControl
