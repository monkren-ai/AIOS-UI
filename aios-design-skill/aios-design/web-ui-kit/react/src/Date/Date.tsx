import * as React from 'react'
import { type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '@/lib/utils'
import {
  dateDualRingDayVariants,
  dateDualRingInnerVariants,
  dateDualRingOuterVariants,
  dateDualRingVariants,
  dateDualRingWeekdayVariants,
  dateRectDayVariants,
  dateRectMonthVariants,
  dateRectRingBgVariants,
  dateRectRingProgressVariants,
  dateRectVariants,
  dateRectWeekdayVariants,
  dateSerifDayVariants,
  dateSerifNumberVariants,
  dateSerifPeelVariants,
  dateSerifVariants,
} from './date-variants'

export type DateType = 'rect' | 'dual-ring' | 'serif'

export interface DateWidgetProps
  extends
    Omit<React.ComponentPropsWithRef<'div'>, 'children' | 'onClick'>,
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

export function DateWidget({
  type = 'rect',
  theme = 'light',
  updateInterval = 60000,
  className,
  showPeel = false,
  onPeelClick,
  ref,
  ...props
}: DateWidgetProps) {
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
      <div
        ref={ref}
        className={cn(dateSerifVariants({ theme }), className)}
        data-slot="date-widget"
        data-type="serif"
        data-widget-theme={dataAttr(theme)}
        data-state={dataAttr('serif')}
        {...props}
      >
        <span data-slot="date-widget-weekday" className={cn(dateSerifDayVariants())}>
          {weekday}
        </span>
        <span data-slot="date-widget-day" className={cn(dateSerifNumberVariants())}>
          {day}
        </span>
        {showPeel && (
          <div
            data-slot="date-widget-peel"
            className={cn(dateSerifPeelVariants())}
            onClick={onPeelClick}
            role={onPeelClick ? 'button' : undefined}
            tabIndex={onPeelClick ? 0 : undefined}
            onKeyDown={
              onPeelClick
                ? (e) => {
                    if (e.key === 'Enter' || e.key === ' ') onPeelClick()
                  }
                : undefined
            }
            data-state={dataAttr('peel')}
          />
        )}
      </div>
    )
  }

  if (type === 'rect') {
    return (
      <div
        ref={ref}
        className={cn(dateRectVariants({ theme }), className)}
        data-slot="date-widget"
        data-type="rect"
        data-widget-theme={dataAttr(theme)}
        data-state={dataAttr('rect')}
        {...props}
      >
        <div data-slot="date-widget-ring" className="size-16 shrink-0">
          <svg
            data-slot="date-widget-ring-svg"
            className="size-full -rotate-90"
            viewBox="0 0 64 64"
            aria-hidden="true"
          >
            <circle
              data-slot="date-widget-ring-track"
              className={cn(dateRectRingBgVariants({ theme }))}
              cx="32"
              cy="32"
              r={RING_RADIUS}
            />
            <circle
              data-slot="date-widget-ring-progress"
              className={cn(dateRectRingProgressVariants())}
              cx="32"
              cy="32"
              r={RING_RADIUS}
              style={{
                strokeDasharray: `${RING_CIRCUMFERENCE} ${RING_CIRCUMFERENCE}`,
                strokeDashoffset: offset,
              }}
            />
          </svg>
        </div>
        <div data-slot="date-widget-info" className="flex flex-col gap-0.5">
          <div data-slot="date-widget-day" className={cn(dateRectDayVariants({ theme }))}>
            {day}
          </div>
          <div data-slot="date-widget-month" className={cn(dateRectMonthVariants({ theme }))}>
            {month}
          </div>
          <div data-slot="date-widget-weekday" className={cn(dateRectWeekdayVariants())}>
            {weekday}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className={cn(dateDualRingVariants({ theme }), className)}
      data-slot="date-widget"
      data-type="dual-ring"
      data-widget-theme={dataAttr(theme)}
      data-state={dataAttr('dual-ring')}
      {...props}
    >
      <svg
        data-slot="date-widget-ring-svg"
        className="absolute inset-0 size-full"
        viewBox="0 0 200 200"
        aria-hidden="true"
      >
        <circle
          data-slot="date-widget-ring-outer"
          className={cn(dateDualRingOuterVariants({ theme }))}
          cx="100"
          cy="100"
          r="95"
        />
        <circle
          data-slot="date-widget-ring-inner"
          className={cn(dateDualRingInnerVariants({ theme }))}
          cx="100"
          cy="100"
          r="85"
        />
      </svg>
      <div
        data-slot="date-widget-content"
        className="relative z-[1] flex flex-col items-center justify-center gap-0.5"
      >
        <div data-slot="date-widget-day" className={cn(dateDualRingDayVariants({ theme }))}>
          {day}
        </div>
        <div data-slot="date-widget-weekday" className={cn(dateDualRingWeekdayVariants())}>
          {weekday}
        </div>
      </div>
    </div>
  )
}

DateWidget.displayName = 'DateWidget'

export { dateSerifVariants, dateRectVariants, dateDualRingVariants }
export default DateWidget
