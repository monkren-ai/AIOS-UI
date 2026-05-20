import { useState, useEffect } from 'react'
import '../styles/progress-bar.css'

type ProgressStatus = 'default' | 'good' | 'warning' | 'overlimit'

interface ProgressBarProps {
  value: number
  total?: number
  segments?: number
  size?: 'hero' | 'standard' | 'compact'
  variant?: 'default' | 'slim'
  indeterminate?: boolean
  label?: string
  unit?: string
  status?: ProgressStatus
  showReadout?: boolean
  disabled?: boolean
  style?: React.CSSProperties
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  total = 100,
  segments = 20,
  size = 'standard',
  variant = 'default',
  indeterminate = false,
  label,
  unit,
  status = 'default',
  showReadout = true,
  disabled = false,
  style
}) => {
  const [animatedSegments, setAnimatedSegments] = useState(0)

  useEffect(() => {
    const filled = Math.round((value / total) * segments)
    const timer = setTimeout(() => setAnimatedSegments(filled), 50)
    return () => clearTimeout(timer)
  }, [value, total, segments])

  const getSegmentStatus = (index: number): string => {
    if (index >= animatedSegments) return 'empty'
    return status === 'default' ? 'filled' : status
  }

  const classNames = [
    'nothing-progress',
    variant === 'slim' ? '' : `nothing-progress--${size}`,
    variant === 'slim' ? 'nothing-progress--slim' : '',
    indeterminate ? 'nothing-progress--indeterminate' : '',
    disabled ? 'nothing-progress--disabled' : ''
  ].filter(Boolean).join(' ')

  const valueClassNames = [
    'nothing-progress__value',
    status !== 'default' ? `nothing-progress__value--${status}` : ''
  ].filter(Boolean).join(' ')

  if (variant === 'slim') {
    return (
      <div className={classNames} style={style}>
        <div className="nothing-progress__track">
          {indeterminate ? (
            <div className="nothing-progress__indeterminate-bar" />
          ) : (
            <>
              {Array.from({ length: segments }).map((_, index) => (
                <div
                  key={index}
                  className={`nothing-progress__segment nothing-progress__segment--${getSegmentStatus(index)}`}
                />
              ))}
            </>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={classNames} style={style}>
      <div className="nothing-progress__track">
        {indeterminate ? (
          <div className="nothing-progress__indeterminate-bar" />
        ) : (
          <>
            {Array.from({ length: segments }).map((_, index) => (
              <div
                key={index}
                className={`nothing-progress__segment nothing-progress__segment--${getSegmentStatus(index)}`}
              />
            ))}
          </>
        )}
      </div>
      {showReadout && !indeterminate && (
        <div className="nothing-progress__readout">
          <div className={valueClassNames}>
            {value}
            {unit && <span className="nothing-progress__unit">{unit}</span>}
          </div>
          {label && <div className="nothing-progress__label">{label}</div>}
        </div>
      )}
    </div>
  )
}

export default ProgressBar
