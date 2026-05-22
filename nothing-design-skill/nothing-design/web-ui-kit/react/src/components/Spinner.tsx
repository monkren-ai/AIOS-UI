import { useState, useRef, useCallback } from 'react'
import '../styles/spinner.css'

interface SpinnerProps {
  items?: string[]
  spinDuration?: number
  style?: React.CSSProperties
}

const defaultItems: string[] = ['YES', 'NO', 'MAYBE', 'LATER', 'SKIP', 'TRY']

const Spinner: React.FC<SpinnerProps> = ({
  items = defaultItems,
  spinDuration = 3500,
  style
}) => {
  const [rotation, setRotation] = useState(0)
  const [isSpinning, setIsSpinning] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [result, setResult] = useState('')
  const rotationRef = useRef(0)
  const pendingIndexRef = useRef<number | null>(null)
  const transitionEndedRef = useRef(false)

  const n = items.length
  const sectorAngle = (2 * Math.PI) / n
  const cx = 150
  const cy = 150
  const r = 140

  const sectors = items.map((item, i) => {
    const startAngle = i * sectorAngle - Math.PI / 2
    const endAngle = startAngle + sectorAngle
    const isEven = i % 2 === 0

    const x1 = cx + r * Math.cos(startAngle)
    const y1 = cy + r * Math.sin(startAngle)
    const x2 = cx + r * Math.cos(endAngle)
    const y2 = cy + r * Math.sin(endAngle)
    const largeArc = sectorAngle > Math.PI ? 1 : 0

    const d = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`

    const midAngle = startAngle + sectorAngle / 2
    const textR = r * 0.65
    const tx = cx + textR * Math.cos(midAngle)
    const ty = cy + textR * Math.sin(midAngle)
    const textRotation = (midAngle * 180) / Math.PI + 90

    return { d, isEven, item, tx, ty, textRotation, index: i }
  })

  const handleSpinEnd = useCallback(() => {
    if (transitionEndedRef.current) return
    transitionEndedRef.current = true
    setIsSpinning(false)
    if (pendingIndexRef.current !== null) {
      setSelectedIndex(pendingIndexRef.current)
      setResult(items[pendingIndexRef.current])
    }
  }, [items])

  const handleSpin = () => {
    if (isSpinning) return

    setIsSpinning(true)
    setSelectedIndex(null)
    setResult('')
    transitionEndedRef.current = false

    const sectorDeg = 360 / n
    const targetIndex = Math.floor(Math.random() * n)
    const extraSpins = 5 + Math.floor(Math.random() * 3)
    const targetAngle = 360 - (targetIndex * sectorDeg + sectorDeg / 2)
    const totalRotation = extraSpins * 360 + targetAngle

    rotationRef.current += totalRotation
    pendingIndexRef.current = targetIndex

    setRotation(rotationRef.current)

    setTimeout(() => {
      handleSpinEnd()
    }, spinDuration + 500)
  }

  return (
    <div className="nothing-spinner" style={style}>
      <div className="nothing-spinner-wheel-container">
        <div className="nothing-spinner-pointer" />
        <svg
          className="nothing-spinner-svg"
          viewBox="0 0 300 300"
          style={{ transform: `rotate(${rotation}deg)` }}
          onTransitionEnd={handleSpinEnd}
        >
          {sectors.map(({ d, isEven, item, tx, ty, textRotation, index }) => (
            <g key={index}>
              <path
                className={`nothing-spinner-sector ${isEven ? 'nothing-spinner-sector-even' : 'nothing-spinner-sector-odd'} ${selectedIndex === index ? 'selected' : ''}`}
                d={d}
              />
              <text
                className={`nothing-spinner-sector-text ${isEven ? 'nothing-spinner-sector-text-even' : 'nothing-spinner-sector-text-odd'} ${selectedIndex === index ? 'selected' : ''}`}
                x={tx}
                y={ty}
                transform={`rotate(${textRotation} ${tx} ${ty})`}
              >
                {item}
              </text>
            </g>
          ))}
          <circle className="nothing-spinner-center" cx={cx} cy={cy} r={24} />
          <circle className="nothing-spinner-center-dot" cx={cx} cy={cy} r={6} />
        </svg>
      </div>
      <button
        className="nothing-spinner-btn"
        onClick={handleSpin}
        disabled={isSpinning}
      >
        SPIN
      </button>
      <div className="nothing-spinner-result">{result}</div>
    </div>
  )
}

export default Spinner
