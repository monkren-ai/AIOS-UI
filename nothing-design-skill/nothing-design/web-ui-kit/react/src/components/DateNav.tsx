import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '../lib/utils'
import '../styles/date-nav.css'

const dateNavVariants = cva('nothing-date-nav', {
  variants: {
    disabled: {
      true: 'nothing-date-nav--disabled',
      false: '',
    },
  },
  defaultVariants: { disabled: false },
})

const dateNavLabelVariants = cva('nothing-date-nav__label', {
  variants: {
    grotesk: {
      true: 'nothing-date-nav__label--grotesk',
      false: '',
    },
  },
  defaultVariants: { grotesk: false },
})

const dateNavArrowVariants = cva('nothing-date-nav__arrow', {
  variants: {
    disabled: {
      true: 'nothing-date-nav__arrow--disabled',
      false: '',
    },
  },
  defaultVariants: { disabled: false },
})

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function formatMonth(d: Date): string {
  return `${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`
}

function shiftMonth(d: Date, delta: number): Date {
  const nd = new Date(d)
  nd.setDate(1)
  nd.setMonth(nd.getMonth() + delta)
  return nd
}

export type DateNavProps = React.HTMLAttributes<HTMLDivElement> & {
  /** 显示文本. 不传时使用 currentDate (默认当前月). */
  label?: string
  prevDisabled?: boolean
  nextDisabled?: boolean
  grotesk?: boolean
  disabled?: boolean
  onPrev?: () => void
  onNext?: () => void
  /** 受控/非受控日期. 默认 new Date(). */
  initialDate?: Date
  /** 当前显示的日期 (受控模式). 不传则使用内部 state. */
  currentDate?: Date
  /** 日期变化回调 (非受控模式) */
  onDateChange?: (date: Date) => void
} & VariantProps<typeof dateNavVariants>

export const DateNav = React.forwardRef<HTMLDivElement, DateNavProps>(
  (
    {
      className,
      label,
      prevDisabled = false,
      nextDisabled = false,
      grotesk = false,
      disabled = false,
      onPrev,
      onNext,
      initialDate,
      currentDate: currentDateProp,
      onDateChange,
      ...props
    },
    ref
  ) => {
    const isDisabled = !!disabled
    const isControlled = currentDateProp !== undefined
    const [internalDate, setInternalDate] = React.useState<Date>(
      () => initialDate ?? new Date()
    )
    const currentDate = isControlled ? currentDateProp : internalDate

    // 当 label 不传时,从 currentDate 派生
    const displayLabel = label ?? formatMonth(currentDate)
    const month = currentDate.getMonth()
    const year = currentDate.getFullYear()
    const hasExternalLabel = label !== undefined
    const real = !hasExternalLabel

    const handlePrev = () => {
      if (onPrev) onPrev()
      if (!isControlled) {
        const next = shiftMonth(currentDate, -1)
        setInternalDate(next)
        onDateChange?.(next)
      }
    }
    const handleNext = () => {
      if (onNext) onNext()
      if (!isControlled) {
        const next = shiftMonth(currentDate, 1)
        setInternalDate(next)
        onDateChange?.(next)
      }
    }

    return (
      <div
        ref={ref}
        className={cn(dateNavVariants({ disabled: isDisabled }), className)}
        data-disabled={dataAttr(isDisabled)}
        data-month={dataAttr(month)}
        data-year={dataAttr(year)}
        data-real={dataAttr(real)}
        {...props}
      >
        <button
          className={cn(dateNavArrowVariants({ disabled: prevDisabled }))}
          onClick={handlePrev}
          disabled={prevDisabled || isDisabled}
          aria-label="Previous"
        >
          &lt;
        </button>
        <div className={cn(dateNavLabelVariants({ grotesk }))}>{displayLabel}</div>
        <button
          className={cn(dateNavArrowVariants({ disabled: nextDisabled }))}
          onClick={handleNext}
          disabled={nextDisabled || isDisabled}
          aria-label="Next"
        >
          &gt;
        </button>
      </div>
    )
  }
)
DateNav.displayName = 'DateNav'

export { dateNavVariants, dateNavLabelVariants, dateNavArrowVariants }
export default DateNav
