import { useState, useEffect, useCallback } from 'react'
import '../styles/pomodoro.css'

interface PomodoroProps {
  workMinutes?: number
  breakMinutes?: number
  totalSegments?: number
  updateInterval?: number
  style?: React.CSSProperties
}

const Pomodoro: React.FC<PomodoroProps> = ({
  workMinutes = 25,
  breakMinutes = 5,
  totalSegments = 25,
  updateInterval = 1000,
  style
}) => {
  const [isWorkPhase, setIsWorkPhase] = useState(true)
  const [isRunning, setIsRunning] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(workMinutes * 60)
  const [completedCount, setCompletedCount] = useState(0)

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60)
    const secs = totalSeconds % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  const totalSeconds = isWorkPhase ? workMinutes * 60 : breakMinutes * 60
  const elapsed = totalSeconds - timeRemaining
  const percent = (elapsed / totalSeconds) * 100
  const filledSegments = Math.round((percent / 100) * totalSegments)

  useEffect(() => {
    if (!isRunning) return

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          if (isWorkPhase) {
            setCompletedCount(c => c + 1)
            setIsWorkPhase(false)
            return breakMinutes * 60
          } else {
            setIsWorkPhase(true)
            return workMinutes * 60
          }
        }
        return prev - 1
      })
    }, updateInterval)

    return () => clearInterval(timer)
  }, [isRunning, isWorkPhase, workMinutes, breakMinutes, updateInterval])

  const handleStartPause = useCallback(() => {
    setIsRunning(prev => !prev)
  }, [])

  const handleReset = useCallback(() => {
    setIsRunning(false)
    setIsWorkPhase(true)
    setTimeRemaining(workMinutes * 60)
  }, [workMinutes])

  const phaseClass = isWorkPhase ? 'work' : 'break'

  return (
    <div className={`nothing-pomodoro ${phaseClass}`} style={style}>
      <div className="pomodoro-header">
        <div className="pomodoro-title">Pomodoro</div>
        <div className="pomodoro-count">{completedCount} completed</div>
      </div>
      <div className="pomodoro-timer-wrapper">
        <div className="pomodoro-timer">{formatTime(timeRemaining)}</div>
        <div className="pomodoro-status">{isWorkPhase ? '[WORK]' : '[BREAK]'}</div>
        <div className="pomodoro-progress">
          {Array.from({ length: totalSegments }).map((_, index) => (
            <div
              key={index}
              className={`pomodoro-segment ${index < filledSegments ? 'filled' : ''}`}
            />
          ))}
        </div>
      </div>
      <div className="pomodoro-controls">
        <button className="pomodoro-btn primary" onClick={handleStartPause}>
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button className="pomodoro-btn" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  )
}

export default Pomodoro
