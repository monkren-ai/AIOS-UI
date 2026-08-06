import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import {
  countdownNumberVariants,
  countdownVariants,
  type CountdownState,
} from './countdown-variants'

export interface CountdownProps extends Omit<React.ComponentPropsWithRef<'div'>, 'children'> {
  /** 目标时刻；number 视为毫秒时间戳，Date 取其 getTime()。 */
  target: number | Date
  /** 到点回调，只触发一次。 */
  onComplete?: () => void
  /** 到点后显示的文案，默认 `DONE`。 */
  onCompleteText?: string
  /** 进入此秒数区间时读数升为红色，默认 10 秒。 */
  threshold?: number
  /** 是否显示天数（前置 DD 段）。 */
  showDays?: boolean
  /** 可选的小标题，渲染在读数上方。 */
  label?: string
}

interface Part {
  value: number
  unit: string
}

function pad2(value: number): string {
  return String(value).padStart(2, '0')
}

export function Countdown({
  target,
  onComplete,
  onCompleteText = 'DONE',
  threshold = 10,
  showDays = false,
  label,
  className,
  ...props
}: CountdownProps) {
  const targetMs = React.useMemo(
    () => (typeof target === 'number' ? target : target.getTime()),
    [target],
  )

  const [remaining, setRemaining] = React.useState(() =>
    Math.max(0, targetMs - Date.now()),
  )
  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null)
  const completedRef = React.useRef(false)

  // 用 ref 持有最新的 onComplete，避免回调变更导致 effect 重启。
  const onCompleteRef = React.useRef(onComplete)
  onCompleteRef.current = onComplete

  React.useEffect(() => {
    completedRef.current = false

    const tick = () => {
      const r = targetMs - Date.now()
      if (r <= 0) {
        setRemaining(0)
        if (!completedRef.current) {
          completedRef.current = true
          onCompleteRef.current?.()
        }
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
        }
        return
      }
      setRemaining(r)
    }

    tick()
    intervalRef.current = setInterval(tick, 1000)
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [targetMs])

  const totalSeconds = Math.ceil(remaining / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  const isDone = remaining <= 0
  const isUrgent = !isDone && totalSeconds <= threshold
  const state: CountdownState = isDone ? 'done' : isUrgent ? 'urgent' : 'running'

  const parts: Part[] = showDays
    ? [
        { value: days, unit: 'D' },
        { value: hours, unit: 'H' },
        { value: minutes, unit: 'M' },
        { value: seconds, unit: 'S' },
      ]
    : [
        { value: hours, unit: 'H' },
        { value: minutes, unit: 'M' },
        { value: seconds, unit: 'S' },
      ]

  return (
    <div
      className={cn(countdownVariants({ state }), className)}
      data-slot="countdown"
      data-state={dataAttr(state)}
      role="timer"
      aria-live="off"
      {...props}
    >
      {label && (
        <div
          data-slot="countdown-label"
          className="me-1 font-mono text-label uppercase tracking-wider text-foreground-muted"
        >
          {label}
        </div>
      )}
      {isDone ? (
        <span
          data-slot="countdown-done"
          className={cn(countdownNumberVariants({ state: 'done' }))}
        >
          {onCompleteText}
        </span>
      ) : (
        <div data-slot="countdown-readout" className="contents">
          {parts.map((part, i) => (
            <React.Fragment key={part.unit}>
              {i > 0 && (
                <span
                  data-slot="countdown-sep"
                  className="font-display text-display-md leading-none text-foreground-disabled"
                >
                  :
                </span>
              )}
              <span data-slot="countdown-part" className="flex flex-col items-center">
                <span
                  data-slot="countdown-number"
                  className={cn(countdownNumberVariants({ state }))}
                >
                  {pad2(part.value)}
                </span>
                <span
                  data-slot="countdown-unit"
                  className="font-mono text-label uppercase tracking-wider text-foreground-muted"
                >
                  {part.unit}
                </span>
              </span>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  )
}

Countdown.displayName = 'Countdown'

export { countdownVariants, countdownNumberVariants }
export default Countdown
