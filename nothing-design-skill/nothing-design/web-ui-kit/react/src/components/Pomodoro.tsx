import * as React from 'react'
import { useState, useEffect, useCallback } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '../lib/utils'
import '../styles/pomodoro.css'

export type PomodoroPhase = 'work' | 'break'
export type PomodoroRunState = 'idle' | 'running' | 'paused'

const pomodoroVariants = cva('nothing-pomodoro', {
  variants: {
    phase: {
      work: 'nothing-pomodoro--work',
      break: 'nothing-pomodoro--break',
    },
    running: {
      true: 'nothing-pomodoro--running',
      false: '',
    },
  },
  defaultVariants: { phase: 'work', running: false },
})

export interface PomodoroProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    Omit<VariantProps<typeof pomodoroVariants>, 'phase' | 'running'> {
  workMinutes?: number
  breakMinutes?: number
  totalSegments?: number
  updateInterval?: number
  phase?: PomodoroPhase
  running?: boolean
}

export const Pomodoro = React.forwardRef<HTMLDivElement, PomodoroProps>(
  (
    {
      className,
      workMinutes = 25,
      breakMinutes = 5,
      totalSegments = 25,
      updateInterval = 1000,
      phase: phaseProp,
      running: runningProp,
      style,
      ...props
    },
    ref
  ) => {
    const [isWorkPhase, setIsWorkPhase] = useState(true)
    const [isRunning, setIsRunning] = useState(false)
    const [timeRemaining, setTimeRemaining] = useState(workMinutes * 60)
    const [completedCount, setCompletedCount] = useState(0)

    const phase: PomodoroPhase = phaseProp ?? (isWorkPhase ? 'work' : 'break')
    const running: boolean = runningProp ?? isRunning

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
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            if (isWorkPhase) {
              setCompletedCount((c) => c + 1)
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
      setIsRunning((prev) => !prev)
    }, [])

    const handleReset = useCallback(() => {
      setIsRunning(false)
      setIsWorkPhase(true)
      setTimeRemaining(workMinutes * 60)
    }, [workMinutes])

    return (
      <div
        ref={ref}
        className={cn(pomodoroVariants({ phase, running }), className)}
        style={style}
        data-phase={dataAttr(phase)}
        data-state={dataAttr(running ? 'running' : 'paused')}
        {...props}
      >
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
                className={cn('pomodoro-segment', index < filledSegments && 'filled')}
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
)
Pomodoro.displayName = 'Pomodoro'

export { pomodoroVariants }
export default Pomodoro
