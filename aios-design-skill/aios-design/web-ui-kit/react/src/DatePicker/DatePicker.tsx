import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import { Popover } from '@/Popover'
import { inputControlVariants, inputIconVariants } from '@/Input/input-variants'
import {
  calendarNavButtonVariants,
  calendarWeekdayVariants,
  dayVariants,
} from '@/Calendar/calendar-variants'
import { datePickerVariants, type DatePickerSize } from './date-picker-variants'

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const MONTHS = [
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

/** YYYY-MM-DD → 本地 Date（避免 UTC 偏移）。 */
function parseISODate(iso: string | undefined): Date | null {
  if (!iso) return null
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso)
  if (!m) return null
  return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]))
}

function pad2(n: number): string {
  return String(n).padStart(2, '0')
}

function toISO(d: Date): string {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function startOfToday(): Date {
  const t = new Date()
  return new Date(t.getFullYear(), t.getMonth(), t.getDate())
}

interface DayCell {
  date: Date
  isOtherMonth: boolean
  isToday: boolean
}

/** 构造 6×7 网格，每格带真实 Date。 */
function buildCells(viewDate: Date): DayCell[] {
  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const lastDay = new Date(year, month + 1, 0).getDate()
  const prevLast = new Date(year, month, 0).getDate()
  const today = startOfToday()

  const cells: DayCell[] = []
  for (let i = firstDay - 1; i >= 0; i--) {
    const d = new Date(year, month - 1, prevLast - i)
    cells.push({ date: d, isOtherMonth: true, isToday: isSameDay(d, today) })
  }
  for (let i = 1; i <= lastDay; i++) {
    const d = new Date(year, month, i)
    cells.push({ date: d, isOtherMonth: false, isToday: isSameDay(d, today) })
  }
  const remaining = 42 - cells.length
  for (let i = 1; i <= remaining; i++) {
    const d = new Date(year, month + 1, i)
    cells.push({ date: d, isOtherMonth: true, isToday: isSameDay(d, today) })
  }
  return cells
}

interface DatePickerCalendarProps {
  value: string
  viewDate: Date
  onViewDateChange: (date: Date) => void
  onSelect: (date: Date) => void
}

/**
 * 内嵌的可选日历。
 *
 * 项目内的 `Calendar` 是只读展示件、没有 `onSelect`，所以 DatePicker 直接复用它的
 * 视觉变体（`dayVariants` / `calendarWeekdayVariants` / `calendarNavButtonVariants`），
 * 自己持有选中态与翻页逻辑。
 */
function DatePickerCalendar({ value, viewDate, onViewDateChange, onSelect }: DatePickerCalendarProps) {
  const cells = buildCells(viewDate)
  const selected = parseISODate(value)
  const monthYear = `${MONTHS[viewDate.getMonth()]} ${viewDate.getFullYear()}`

  return (
    <div className="w-72" data-slot="date-picker-calendar">
      <div className="mb-4 flex w-full items-baseline justify-between">
        <span
          className="font-display text-heading font-semibold tracking-[-0.02em] text-foreground-display"
          data-slot="date-picker-month-year"
        >
          {monthYear}
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            data-slot="date-picker-nav"
            data-direction="prev"
            className={calendarNavButtonVariants()}
            onClick={() =>
              onViewDateChange(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))
            }
            aria-label="Previous month / 上一月"
          >
            &lt;
          </button>
          <button
            type="button"
            data-slot="date-picker-nav"
            data-direction="next"
            className={calendarNavButtonVariants()}
            onClick={() =>
              onViewDateChange(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))
            }
            aria-label="Next month / 下一月"
          >
            &gt;
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1" role="grid">
        {WEEKDAYS.map((w, i) => (
          <div key={i} className={calendarWeekdayVariants()}>
            {w}
          </div>
        ))}
        {cells.map((cell, i) => {
          const isSelected = selected ? isSameDay(cell.date, selected) : false
          return (
            <button
              key={i}
              type="button"
              data-slot="date-picker-day"
              data-other-month={dataAttr(cell.isOtherMonth)}
              data-today={dataAttr(cell.isToday)}
              data-selected={dataAttr(isSelected)}
              className={cn(
                dayVariants({ isOtherMonth: cell.isOtherMonth, isToday: cell.isToday }),
                'cursor-pointer rounded-md border border-transparent',
                isSelected &&
                  'border-foreground-display bg-foreground-display font-bold text-background hover:bg-foreground-display hover:text-background',
              )}
              onClick={() => onSelect(cell.date)}
              aria-label={cell.date.toDateString()}
              aria-pressed={isSelected || undefined}
            >
              {cell.date.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function formatDisplay(iso: string, locale: 'zh' | 'en'): string {
  if (!iso) return ''
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso)
  if (!m) return iso
  const [, y, mo, d] = m
  return locale === 'en' ? `${mo}/${d}/${y}` : `${y}-${mo}-${d}`
}

/** 日历图标（纯内联，不引入图标包）。 */
function CalendarIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="2.5" y="3.5" width="11" height="10" rx="1" />
      <path d="M5 2v2M11 2v2M2.5 6.5h11" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export interface DatePickerProps extends Omit<React.ComponentPropsWithRef<'div'>, 'onChange'> {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  label?: string
  error?: string
  disabled?: boolean
  size?: DatePickerSize
  /** 触发器显示格式：zh=`YYYY-MM-DD`，en=`MM/DD/YYYY`。 */
  locale?: 'zh' | 'en'
}

export function DatePicker({
  value: controlledValue,
  defaultValue,
  onValueChange,
  placeholder = 'Select date',
  label,
  error,
  disabled = false,
  size = 'md',
  locale = 'zh',
  className,
  ref,
  ...props
}: DatePickerProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? '')
  const value = controlledValue !== undefined ? controlledValue : internalValue
  const [open, setOpen] = React.useState(false)
  const [viewDate, setViewDate] = React.useState<Date>(() => parseISODate(value) ?? new Date())
  const hasError = Boolean(error)

  const handleSelect = React.useCallback(
    (date: Date) => {
      const iso = toISO(date)
      if (controlledValue === undefined) setInternalValue(iso)
      onValueChange?.(iso)
      setViewDate(date)
      setOpen(false)
    },
    [controlledValue, onValueChange],
  )

  const display = formatDisplay(value, locale)

  // 触发器按钮。base-ui 的 Popover Trigger 经 cloneElement 会把原生 button 的 disabled
  // 覆盖掉，因此禁用时不挂 Popover、直接渲染按钮，保证 disabled 真正生效且浮层无法打开。
  const trigger = (
    <button
      type="button"
      disabled={disabled}
      data-slot="date-picker-trigger"
      className={cn(
        inputControlVariants({ variant: 'outline', size, hasError, disabled }),
        'cursor-pointer justify-between text-left',
        'focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2',
      )}
    >
      <span
        className={cn(
          'flex-1 font-mono',
          value ? 'text-foreground-display' : 'text-foreground-disabled',
        )}
      >
        {display || placeholder}
      </span>
      <span className={inputIconVariants()} data-icon="end" aria-hidden="true">
        <CalendarIcon />
      </span>
    </button>
  )

  return (
    <div
      ref={ref}
      className={cn(datePickerVariants({ size, disabled, error: hasError }), className)}
      data-slot="date-picker"
      data-size={dataAttr(size)}
      data-state={dataAttr(hasError ? 'error' : disabled ? 'disabled' : 'default')}
      data-disabled={dataAttr(disabled)}
      data-error={dataAttr(hasError)}
      data-invalid={dataAttr(hasError)}
      {...props}
    >
      {label && (
        <label
          className="font-mono uppercase tracking-wider text-foreground-muted text-label"
          data-slot="date-picker-label"
        >
          {label}
        </label>
      )}
      {disabled ? (
        trigger
      ) : (
        <Popover
          open={open}
          onOpenChange={setOpen}
          side="bottom"
          content={
            <DatePickerCalendar
              value={value}
              viewDate={viewDate}
              onViewDateChange={setViewDate}
              onSelect={handleSelect}
            />
          }
        >
          {trigger}
        </Popover>
      )}
      {hasError && (
        <div
          className="font-mono uppercase tracking-wide text-label text-accent"
          data-slot="date-picker-error"
          role="alert"
        >
          {error}
        </div>
      )}
    </div>
  )
}

DatePicker.displayName = 'DatePicker'

export { datePickerVariants }
export default DatePicker
