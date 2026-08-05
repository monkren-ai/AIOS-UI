import * as React from 'react'
import { useState, useEffect, useRef, useCallback } from 'react'
import { type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '@/lib/utils'
import {
  chronoButtonVariants,
  chronoDisplayVariants,
  chronoLapDeltaVariants,
  chronoLapItemVariants,
  chronoLapNumberVariants,
  chronoLapTotalVariants,
  chronoLapsVariants,
  chronoTitleVariants,
  chronoVariants,
} from './chrono-variants'

export type ChronoState = 'idle' | 'running' | 'paused'
export type ChronoSize = 'sm' | 'md' | 'lg'

interface LapData {
  number: number
  delta: number
  total: number
}

export interface ChronoProps
  extends
    Omit<React.ComponentPropsWithRef<'div'>, 'children'>,
    Omit<VariantProps<typeof chronoVariants>, 'state' | 'size'> {
  maxLaps?: number
  state?: ChronoState
  size?: ChronoSize
}

const formatTime = (ms: number): string => {
  const totalSeconds = Math.floor(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  const centiseconds = Math.floor((ms % 1000) / 10)

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(centiseconds).padStart(2, '0')}`
}

export function Chrono({
  className,
  maxLaps = 10,
  state: stateProp,
  size = 'md',
  style,
  ref,
  ...props
}: ChronoProps) {
  const [elapsed, setElapsed] = useState(0)
  const [running, setRunning] = useState(false)
  const [laps, setLaps] = useState<LapData[]>([])
  const startTimeRef = useRef(0)
  const elapsedRef = useRef(0)
  const lastLapTimeRef = useRef(0)
  const animationFrameRef = useRef<number | null>(null)

  const derivedState: ChronoState =
    stateProp ?? (running ? 'running' : elapsed > 0 ? 'paused' : 'idle')

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

    setLaps((prev) => [...prev, { number: prev.length + 1, delta, total: currentElapsed }])
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
    <div
      ref={ref}
      className={cn(chronoVariants({ state: derivedState, size }), className)}
      style={style}
      data-slot="chrono"
      data-state={dataAttr(derivedState)}
      data-size={dataAttr(size)}
      {...props}
    >
      <div data-slot="chrono-header" className="mb-6 flex w-full items-baseline justify-between">
        <div data-slot="chrono-title" className={cn(chronoTitleVariants())}>
          Chrono
        </div>
      </div>
      <div data-slot="chrono-display" className={cn(chronoDisplayVariants({ size }))}>
        {formatTime(elapsed)}
      </div>
      <div data-slot="chrono-controls" className="mb-4 flex gap-2">
        <div data-slot="chrono-controls-main" className="flex flex-1 gap-2">
          <button
            data-slot="chrono-button"
            data-action={running ? 'pause' : 'start'}
            className={cn(chronoButtonVariants({ action: running ? 'pause' : 'start' }))}
            onClick={handleStartPause}
            type="button"
          >
            {running ? 'PAUSE' : 'START'}
          </button>
          <button
            data-slot="chrono-button"
            data-action="lap"
            className={cn(chronoButtonVariants({ action: 'lap' }))}
            onClick={handleLap}
            type="button"
            disabled={!running}
          >
            LAP
          </button>
        </div>
      </div>
      <button
        data-slot="chrono-button"
        data-action="reset"
        className={cn(chronoButtonVariants({ action: 'reset' }))}
        onClick={handleReset}
        type="button"
        disabled={running || elapsed === 0}
      >
        RESET
      </button>
      <div data-slot="chrono-laps" className={cn(chronoLapsVariants())} ref={lapsRef}>
        {[...laps].reverse().map((lap) => {
          const originalIndex = lap.number - 1
          let pace: 'normal' | 'fastest' | 'slowest' = 'normal'
          if (laps.length > 1) {
            if (originalIndex === fastestIndex) pace = 'fastest'
            if (originalIndex === slowestIndex) pace = 'slowest'
          }

          return (
            <div
              key={lap.number}
              data-slot="chrono-lap"
              data-pace={dataAttr(pace)}
              className={cn(chronoLapItemVariants())}
            >
              <div data-slot="chrono-lap-number" className={cn(chronoLapNumberVariants())}>
                LAP {String(lap.number).padStart(2, '0')}
              </div>
              <div data-slot="chrono-lap-delta" className={cn(chronoLapDeltaVariants({ pace }))}>
                {formatTime(lap.delta)}
              </div>
              <div data-slot="chrono-lap-total" className={cn(chronoLapTotalVariants())}>
                {formatTime(lap.total)}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

Chrono.displayName = 'Chrono'

export { chronoVariants }
export default Chrono
