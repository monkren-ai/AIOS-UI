import { useState, useEffect, useRef, useCallback } from 'react'
import '../styles/chrono.css'

interface LapData {
  number: number
  delta: number
  total: number
}

interface ChronoProps {
  maxLaps?: number
  style?: React.CSSProperties
}

const formatTime = (ms: number): string => {
  const totalSeconds = Math.floor(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  const centiseconds = Math.floor((ms % 1000) / 10)

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(centiseconds).padStart(2, '0')}`
}

const Chrono: React.FC<ChronoProps> = ({ maxLaps = 10, style }) => {
  const [elapsed, setElapsed] = useState(0)
  const [running, setRunning] = useState(false)
  const [laps, setLaps] = useState<LapData[]>([])
  const startTimeRef = useRef(0)
  const elapsedRef = useRef(0)
  const lastLapTimeRef = useRef(0)
  const animationFrameRef = useRef<number | null>(null)

  const tick = useCallback(() => {
    const now = performance.now()
    const current = now - startTimeRef.current
    elapsedRef.current = current
    setElapsed(current)
    animationFrameRef.current = requestAnimationFrame(tick)
  }, [])

  useEffect(() => {
    if (running) {
      startTimeRef.current = performance.now() - elapsedRef.current
      animationFrameRef.current = requestAnimationFrame(tick)
    } else if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [running, tick])

  const handleStartPause = () => {
    if (running) {
      elapsedRef.current = performance.now() - startTimeRef.current
      setRunning(false)
    } else {
      setRunning(true)
    }
  }

  const handleReset = () => {
    setRunning(false)
    setElapsed(0)
    setLaps([])
    elapsedRef.current = 0
    startTimeRef.current = 0
    lastLapTimeRef.current = 0
  }

  const handleLap = () => {
    if (!running) return

    const currentElapsed = performance.now() - startTimeRef.current
    const delta = currentElapsed - lastLapTimeRef.current
    lastLapTimeRef.current = currentElapsed

    setLaps(prev => [...prev, {
      number: prev.length + 1,
      delta,
      total: currentElapsed
    }])
  }

  let fastestIndex = -1
  let slowestIndex = -1

  if (laps.length > 1) {
    let minDelta = Infinity
    let maxDelta = -Infinity
    laps.forEach((lap, index) => {
      if (lap.delta < minDelta) {
        minDelta = lap.delta
        fastestIndex = index
      }
      if (lap.delta > maxDelta) {
        maxDelta = lap.delta
        slowestIndex = index
      }
    })
  }

  const lapsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (lapsRef.current && laps.length > maxLaps) {
      lapsRef.current.scrollTop = 0
    }
  }, [laps.length, maxLaps])

  return (
    <div className="nothing-chrono" style={style}>
      <div className="chrono-header">
        <div className="chrono-title">Chrono</div>
      </div>
      <div className="chrono-display">{formatTime(elapsed)}</div>
      <div className="chrono-controls">
        <div className="chrono-controls-main">
          <button
            className={`chrono-btn ${running ? 'chrono-btn--pause' : 'chrono-btn--start'}`}
            onClick={handleStartPause}
            type="button"
          >
            {running ? 'PAUSE' : 'START'}
          </button>
          <button
            className="chrono-btn chrono-btn--lap"
            onClick={handleLap}
            type="button"
            disabled={!running}
          >
            LAP
          </button>
        </div>
      </div>
      <button
        className="chrono-btn chrono-btn--reset"
        onClick={handleReset}
        type="button"
        disabled={running || elapsed === 0}
      >
        RESET
      </button>
      <div className="chrono-laps" ref={lapsRef}>
        {[...laps].reverse().map((lap) => {
          const originalIndex = lap.number - 1
          let className = 'chrono-lap-item'
          if (laps.length > 1) {
            if (originalIndex === fastestIndex) className += ' fastest'
            if (originalIndex === slowestIndex) className += ' slowest'
          }

          return (
            <div key={lap.number} className={className}>
              <div className="chrono-lap-number">LAP {String(lap.number).padStart(2, '0')}</div>
              <div className="chrono-lap-delta">{formatTime(lap.delta)}</div>
              <div className="chrono-lap-total">{formatTime(lap.total)}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Chrono
