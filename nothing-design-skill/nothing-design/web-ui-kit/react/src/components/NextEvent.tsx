import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { useNow } from '../system/hooks'
import { cn, dataAttr } from '../lib/utils'
import '../styles/next-event.css'

const nextEventVariants = cva('nothing-next-event', {
  variants: {
    theme: {
      light: 'nothing-next-event--light',
      dark: 'nothing-next-event--dark',
    },
    priority: {
      low: 'nothing-next-event--low',
      normal: 'nothing-next-event--normal',
      high: 'nothing-next-event--high',
    },
  },
  defaultVariants: { theme: 'dark', priority: 'normal' },
})

export interface EventData {
  title: string
  /** Unix timestamp (ms) */
  date: number
  month?: string
}

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

/**
 * 默认 3 条 demo 事件:1 个今天,1 个 3 天后,1 个 1 周后。
 * 每次实例化时基于当前时间计算。
 */
function makeDefaultEvents(): EventData[] {
  const now = Date.now()
  const day = 86_400_000
  return [
    { title: 'Design review', date: now + 2 * 60 * 60 * 1000 },
    { title: 'Sprint planning', date: now + 3 * day },
    { title: 'Product launch', date: now + 7 * day },
  ]
}

function formatCountdown(ms: number): string {
  if (ms <= 0) return 'NOW'
  const totalMin = Math.floor(ms / 60000)
  const d = Math.floor(totalMin / (60 * 24))
  const h = Math.floor((totalMin % (60 * 24)) / 60)
  const m = totalMin % 60
  if (d > 0) return `${d}D ${pad2(h)}H ${pad2(m)}M`
  if (h > 0) return `${h}H ${pad2(m)}M`
  return `${m}M`
}

function pad2(n: number): string {
  return String(n).padStart(2, '0')
}

export interface NextEventProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    Omit<VariantProps<typeof nextEventVariants>, 'priority'> {
  /** 单个事件 (向后兼容). 优先于 events. */
  event?: EventData
  /** 事件数组,自动选择最近一个未到期的 */
  events?: EventData[]
  priority?: 'low' | 'normal' | 'high'
}

export const NextEvent = React.forwardRef<HTMLDivElement, NextEventProps>(
  ({ className, theme = 'dark', priority: priorityProp, event, events, ...props }, ref) => {
    const now = useNow(60_000)
    const defaultEvents = React.useMemo(makeDefaultEvents, [])

    let displayEvent: EventData
    if (event) {
      displayEvent = event
    } else if (events && events.length > 0) {
      // 选择最近一个未到期
      const sorted = [...events].sort((a, b) => a.date - b.date)
      const upcoming = sorted.find((e) => e.date > now.getTime())
      displayEvent = upcoming || sorted[0]
    } else {
      // 选择默认中最近一个未到期
      const sorted = [...defaultEvents].sort((a, b) => a.date - b.date)
      const upcoming = sorted.find((e) => e.date > now.getTime())
      displayEvent = upcoming || sorted[0]
    }

    const ts = now.getTime()
    const eventDate = new Date(displayEvent.date)
    const diff = displayEvent.date - ts
    const real = event !== undefined || (events !== undefined && events.length > 0)
    const priority: 'low' | 'normal' | 'high' =
      priorityProp ?? (diff > 0 && diff < 24 * 60 * 60 * 1000 ? 'high' : 'normal')
    const day = eventDate.getDate()
    const monthStr = MONTHS[eventDate.getMonth()]
    const countdown = formatCountdown(diff)

    return (
      <div
        ref={ref}
        className={cn(nextEventVariants({ theme, priority }), className)}
        data-state={dataAttr(real ? 'has-event' : 'demo')}
        data-priority={dataAttr(priority)}
        data-real={dataAttr(real)}
        {...props}
      >
        <span className="nothing-next-event__label">Next Event:</span>
        <div className="nothing-next-event__content">
          <span className="nothing-next-event__title">{displayEvent.title}</span>
          <span className="nothing-next-event__date">{day}</span>
          <span className="nothing-next-event__month">{monthStr}</span>
          <span className="nothing-next-event__countdown">{countdown}</span>
        </div>
      </div>
    )
  }
)
NextEvent.displayName = 'NextEvent'

export { nextEventVariants }
export default NextEvent
