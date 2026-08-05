import { cva } from 'class-variance-authority'

/**
 * Calendar 的视觉变体。
 *
 * 两种版型共用同一张卡片（surface + border + 12px 圆角 + 32px 内边距），
 * `compact` 只是把内容居中成「日 / 号 / 月」三行的大字块。
 */
export const calendarVariants = cva(
  [
    'flex w-full flex-col',
    'rounded-lg border border-border bg-surface p-8',
    'transition-colors duration-[350ms] ease-nothing motion-reduce:transition-none',
  ],
  {
    variants: {
      type: {
        compact: 'items-center justify-center',
        full: '',
      },
    },
    defaultVariants: { type: 'compact' },
  },
)

/** 月历里的单个日期格。 */
export const dayVariants = cva(
  [
    'p-2 text-center font-mono text-sm tabular-nums text-foreground',
    'transition-colors duration-200 ease-nothing motion-reduce:transition-none',
    'hover:bg-surface-raised',
  ],
  {
    variants: {
      isOtherMonth: {
        true: 'text-foreground-disabled',
        false: '',
      },
      isToday: {
        true: 'bg-accent-subtle font-bold text-accent',
        false: '',
      },
    },
    defaultVariants: { isOtherMonth: false, isToday: false },
  },
)

/** 「星期几」的表头格。 */
export const calendarWeekdayVariants = cva([
  'py-2 text-center font-mono text-label uppercase tracking-widest text-foreground-disabled',
  'transition-colors duration-[350ms] ease-nothing motion-reduce:transition-none',
])

/** 上/下月的方形导航按钮。 */
export const calendarNavButtonVariants = cva([
  'flex size-8 cursor-pointer items-center justify-center',
  'border border-border bg-surface-raised font-mono text-sm text-foreground',
  'transition-colors duration-200 ease-nothing motion-reduce:transition-none',
  'hover:border-foreground-muted',
  'outline-none focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2',
])

export type CalendarType = 'compact' | 'full'
