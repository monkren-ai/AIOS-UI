import { cva } from 'class-variance-authority'

/**
 * Countdown 的视觉变体。
 *
 * `state` 是读数配色：running 用 display 白，urgent（进入 threshold 区间）升到
 * Nothing 红，done 回到最弱一档。容器只承担布局与过渡，数字配色走 numberVariants。
 */
export const countdownVariants = cva(
  [
    'nothing-countdown',
    'inline-flex items-end gap-2',
    'transition-[opacity] duration-300 ease-nothing motion-reduce:transition-none',
  ],
  {
    variants: {
      state: {
        running: '',
        urgent: '',
        done: '',
      },
    },
    defaultVariants: { state: 'running' },
  },
)

/** Doto 大数字读数。urgent 升红，done 压到 muted。 */
export const countdownNumberVariants = cva(
  [
    'nothing-countdown__number',
    'font-display text-display-md leading-none tabular-nums',
    'transition-colors duration-300 ease-nothing motion-reduce:transition-none',
  ],
  {
    variants: {
      state: {
        running: 'text-foreground-display',
        urgent: 'text-accent',
        done: 'text-foreground-muted',
      },
    },
    defaultVariants: { state: 'running' },
  },
)

export type CountdownState = 'running' | 'urgent' | 'done'
