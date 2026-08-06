import * as React from 'react'
import { type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '@/lib/utils'
import {
  calendarNavButtonVariants,
  calendarVariants,
  calendarWeekdayVariants,
  dayVariants,
} from './calendar-variants'

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

export type CalendarProps = React.ComponentPropsWithRef<'div'> & {
  type?: 'compact' | 'full'
  initialDate?: Date
} & VariantProps<typeof calendarVariants>

export function Calendar({
  className,
  type = 'compact',
  initialDate = new Date(),
  ref,
  ...props
}: CalendarProps) {
  const [currentDate, setCurrentDate] = React.useState(initialDate)
  const dayName = days[currentDate.getDay()]
  const date = currentDate.getDate()
  const monthName = months[currentDate.getMonth()]
  const monthYear = `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`

  const getCalendarDays = () => {
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
    const prevLastDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate()
    const today = new Date()
    const isCurrentMonth =
      today.getMonth() === currentDate.getMonth() &&
      today.getFullYear() === currentDate.getFullYear()

    const calendarDays: Array<{ day: number; isOtherMonth: boolean; isToday: boolean }> = []

    for (let i = firstDay - 1; i >= 0; i--) {
      calendarDays.push({ day: prevLastDay - i, isOtherMonth: true, isToday: false })
    }
    for (let i = 1; i <= lastDay; i++) {
      const isToday = isCurrentMonth && today.getDate() === i
      calendarDays.push({ day: i, isOtherMonth: false, isToday })
    }
    const remainingDays = 42 - calendarDays.length
    for (let i = 1; i <= remainingDays; i++) {
      calendarDays.push({ day: i, isOtherMonth: true, isToday: false })
    }
    return calendarDays
  }

  const handlePrevMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
  }
  const handleNextMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
  }

  if (type === 'compact') {
    return (
      <div
        ref={ref}
        className={cn(calendarVariants({ type }), className)}
        data-slot="calendar"
        data-type={dataAttr(type)}
        {...props}
      >
        <div
          data-slot="calendar-day-name"
          className="mb-1 font-mono text-sm uppercase tracking-[0.15em] text-foreground-muted transition-colors duration-[350ms] ease-aios motion-reduce:transition-none"
        >
          {dayName}
        </div>
        <div
          data-slot="calendar-date"
          className="mb-1 font-display text-display-xl font-semibold leading-none tracking-[-0.02em] tabular-nums text-foreground-display transition-colors duration-[350ms] ease-aios motion-reduce:transition-none"
        >
          {String(date).padStart(2, '0')}
        </div>
        <div
          data-slot="calendar-month"
          className="font-mono text-sm uppercase tracking-[0.1em] text-accent transition-colors duration-[350ms] ease-aios motion-reduce:transition-none"
        >
          {monthName}
        </div>
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className={cn(calendarVariants({ type }), className)}
      data-slot="calendar"
      data-type={dataAttr(type)}
      {...props}
    >
      <div data-slot="calendar-header" className="mb-6 flex w-full items-baseline justify-between">
        <div
          data-slot="calendar-month-year"
          className="font-display text-heading font-semibold tracking-[-0.02em] text-foreground-display transition-colors duration-[350ms] ease-aios motion-reduce:transition-none"
        >
          {monthYear}
        </div>
        <div data-slot="calendar-nav" className="flex gap-2">
          <button
            type="button"
            data-slot="calendar-nav-button"
            data-direction="prev"
            className={cn(calendarNavButtonVariants())}
            onClick={handlePrevMonth}
            aria-label="Previous month"
          >
            &lt;
          </button>
          <button
            type="button"
            data-slot="calendar-nav-button"
            data-direction="next"
            className={cn(calendarNavButtonVariants())}
            onClick={handleNextMonth}
            aria-label="Next month"
          >
            &gt;
          </button>
        </div>
      </div>
      <div data-slot="calendar-grid" className="grid grid-cols-7 gap-1" role="grid">
        {weekdays.map((day, index) => (
          <div key={index} data-slot="calendar-weekday" className={cn(calendarWeekdayVariants())}>
            {day}
          </div>
        ))}
        {getCalendarDays().map((day, index) => (
          <div
            key={index}
            data-slot="calendar-day"
            data-other-month={dataAttr(day.isOtherMonth)}
            data-today={dataAttr(day.isToday)}
            className={cn(dayVariants({ isOtherMonth: day.isOtherMonth, isToday: day.isToday }))}
          >
            {day.day}
          </div>
        ))}
      </div>
    </div>
  )
}

Calendar.displayName = 'Calendar'

export { calendarVariants, dayVariants, calendarWeekdayVariants, calendarNavButtonVariants }
export default Calendar
