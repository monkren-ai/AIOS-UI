import { useState, useRef, useEffect } from 'react'
import '../styles/segmented-control.css'

interface SegmentedControlProps {
  segments: string[]
  activeIndex?: number
  variant?: 'pill' | 'rounded'
  disabled?: boolean
  onChange?: (index: number) => void
}

const SegmentedControl: React.FC<SegmentedControlProps> = ({
  segments,
  activeIndex: controlledIndex,
  variant = 'pill',
  disabled = false,
  onChange
}) => {
  const [internalIndex, setInternalIndex] = useState(0)
  const [sliderStyle, setSliderStyle] = useState<React.CSSProperties>({})
  const segmentRefs = useRef<(HTMLButtonElement | null)[]>([])

  const activeIdx = controlledIndex !== undefined ? controlledIndex : internalIndex

  useEffect(() => {
    const activeSegment = segmentRefs.current[activeIdx]
    if (activeSegment) {
      setSliderStyle({
        width: activeSegment.offsetWidth,
        left: activeSegment.offsetLeft
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

  const classNames = [
    'nothing-segmented',
    variant === 'rounded' ? 'nothing-segmented--rounded' : '',
    disabled ? 'nothing-segmented--disabled' : ''
  ].filter(Boolean).join(' ')

  return (
    <div className={classNames}>
      <div
        className="nothing-segmented__slider"
        style={sliderStyle}
      />
      {segments.map((segment, index) => (
        <button
          key={index}
          ref={el => { segmentRefs.current[index] = el }}
          className={[
            'nothing-segmented__segment',
            index === activeIdx ? 'nothing-segmented__segment--active' : ''
          ].filter(Boolean).join(' ')}
          onClick={() => handleSelect(index)}
          disabled={disabled}
        >
          {segment}
        </button>
      ))}
    </div>
  )
}

export default SegmentedControl
