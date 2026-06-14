import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '../lib/utils'
import '../styles/date.css'

const dateSerifVariants = cva('nothing-date--serif', {
  variants: {
    theme: {
      light: 'nothing-date--serif-light',
      dark: 'nothing-date--serif-dark',
    },
  },
  defaultVariants: { theme: 'light' },
})

const dateRectVariants = cva('nothing-date-rect', {
  variants: {
    theme: {
      light: 'nothing-date-rect--light',
      dark: 'nothing-date-rect--dark',
    },
  },
  defaultVariants: { theme: 'light' },
})

const dateDualRingVariants = cva('nothing-date-dual-ring', {
  variants: {
    theme: {
      light: 'nothing-date-dual-ring--light',
      dark: 'nothing-date-dual-ring--dark',
    },
  },
  defaultVariants: { theme: 'light' },
})

export type DateType = 'rect' | 'dual-ring' | 'serif'

export interface DateWidgetProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'onClick'>,
    Omit<VariantProps<typeof dateRectVariants>, 'type'> {
  type?: DateType
  updateInterval?: number
  showPeel?: boolean
  onPeelClick?: () => void
}

const RING_RADIUS = 25
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
const WEEKDAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

const DateWidgetImpl: React.FC<DateWidgetProps> = ({
  type = 'rect',
  theme = 'light',
  updateInterval = 60000,
  className,
  showPeel = false,
  onPeelClick,
}) => {
  const [now, setNow] = React.useState(new Date())

  React.useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date())
    }, updateInterval)
    return () => clearInterval(timer)
  }, [updateInterval])

  const day = now.getDate()
  const month = MONTHS[now.getMonth()]
  const weekday = WEEKDAYS[now.getDay()]

  const hours = now.getHours()
  const minutes = now.getMinutes()
  const progress = hours + minutes / 60
  const offset = RING_CIRCUMFERENCE - (progress / 24) * RING_CIRCUMFERENCE

  if (type === 'serif') {
    return (
      <div className={cn(dateSerifVariants({ theme }), className)} data-state={dataAttr('serif')}>
        <span className="nothing-date__serif-day">{weekday}</span>
        <span className="nothing-date__serif-number">{day}</span>
        {showPeel && (
          <div
            className="nothing-date__peel"
            onClick={onPeelClick}
            role={onPeelClick ? 'button' : undefined}
            tabIndex={onPeelClick ? 0 : undefined}
            onKeyDown={onPeelClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') onPeelClick() } : undefined}
            data-state={dataAttr('peel')}
          />
        )}
      </div>
    )
  }

  if (type === 'rect') {
    return (
      <div className={cn(dateRectVariants({ theme }), className)} data-state={dataAttr('rect')}>
        <div className="nothing-date-rect__ring">
          <svg className="nothing-date-rect__ring-svg" viewBox="0 0 60 60">
            <circle className="nothing-date-rect__ring-bg" cx="30" cy="30" r={RING_RADIUS} />
            <circle
              className="nothing-date-rect__ring-progress"
              cx="30"
              cy="30"
              r={RING_RADIUS}
              style={{
                strokeDasharray: `${RING_CIRCUMFERENCE} ${RING_CIRCUMFERENCE}`,
                strokeDashoffset: offset
              }}
            />
          </svg>
        </div>
        <div className="nothing-date-rect__info">
          <div className="nothing-date-rect__day">{day}</div>
          <div className="nothing-date-rect__month">{month}</div>
          <div className="nothing-date-rect__weekday">{weekday}</div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn(dateDualRingVariants({ theme }), className)} data-state={dataAttr('dual-ring')}>
      <svg className="nothing-date-dual-ring__svg" viewBox="0 0 200 200">
        <circle className="nothing-date-dual-ring__outer" cx="100" cy="100" r="95" />
        <circle className="nothing-date-dual-ring__inner" cx="100" cy="100" r="85" />
      </svg>
      <div className="nothing-date-dual-ring__content">
        <div className="nothing-date-dual-ring__day">{day}</div>
        <div className="nothing-date-dual-ring__weekday">{weekday}</div>
      </div>
    </div>
  )
}

export const DateWidget = React.forwardRef<HTMLDivElement, DateWidgetProps>((props, ref) => {
  return <div ref={ref} style={{ display: 'contents' }}><DateWidgetImpl {...props} /></div>
})
DateWidget.displayName = 'DateWidget'

export { dateSerifVariants, dateRectVariants, dateDualRingVariants }
export default DateWidget
