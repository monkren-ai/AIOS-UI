import * as React from 'react'
import { useState, useEffect, useCallback } from 'react'
import { type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '@/lib/utils'
import {
  pomodoroButtonVariants,
  pomodoroCountVariants,
  pomodoroSegmentVariants,
  pomodoroStatusVariants,
  pomodoroTimerVariants,
  pomodoroTitleVariants,
  pomodoroVariants,
} from './pomodoro-variants'

export type PomodoroPhase = 'work' | 'break'
export type PomodoroRunState = 'idle' | 'running' | 'paused'

export interface PomodoroProps
  extends
    Omit<React.ComponentPropsWithRef<'div'>, 'children'>,
    Omit<VariantProps<typeof pomodoroVariants>, 'phase' | 'running'> {
  workMinutes?: number
  breakMinutes?: number
  totalSegments?: number
  updateInterval?: number
  phase?: PomodoroPhase
  running?: boolean
}

export function Pomodoro({
  className,
  workMinutes = 25,
  breakMinutes = 5,
  totalSegments = 25,
  updateInterval = 1000,
  phase: phaseProp,
  running: runningProp,
  style,
  ref,
  ...props
}: PomodoroProps) {
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
      data-slot="pomodoro"
      data-phase={dataAttr(phase)}
      data-state={dataAttr(running ? 'running' : 'paused')}
      {...props}
    >
      <div data-slot="pomodoro-header" className="mb-6 flex w-full items-baseline justify-between">
        <div data-slot="pomodoro-title" className={cn(pomodoroTitleVariants())}>
          Pomodoro
        </div>
        <div data-slot="pomodoro-count" className={cn(pomodoroCountVariants())}>
          {completedCount} completed
        </div>
      </div>
      <div data-slot="pomodoro-timer-wrapper" className="mb-6 flex w-full flex-col items-center">
        <div data-slot="pomodoro-timer" className={cn(pomodoroTimerVariants({ phase }))}>
          {formatTime(timeRemaining)}
        </div>
        <div data-slot="pomodoro-status" className={cn(pomodoroStatusVariants({ phase }))}>
          {phase === 'work' ? '[WORK]' : '[BREAK]'}
        </div>
        <div data-slot="pomodoro-progress" className="mb-6 flex h-3 w-full gap-0.5">
          {Array.from({ length: totalSegments }).map((_, index) => (
            <div
              key={index}
              data-slot="pomodoro-segment"
              data-filled={dataAttr(index < filledSegments)}
              className={cn(pomodoroSegmentVariants({ filled: index < filledSegments, phase }))}
            />
          ))}
        </div>
      </div>
      <div data-slot="pomodoro-controls" className="mb-6 flex gap-2">
        <button
          type="button"
          data-slot="pomodoro-button"
          data-action="start-pause"
          className={cn(pomodoroButtonVariants({ emphasis: 'primary' }))}
          onClick={handleStartPause}
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          type="button"
          data-slot="pomodoro-button"
          data-action="reset"
          className={cn(pomodoroButtonVariants())}
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  )
}

Pomodoro.displayName = 'Pomodoro'

export { pomodoroVariants }
export default Pomodoro
