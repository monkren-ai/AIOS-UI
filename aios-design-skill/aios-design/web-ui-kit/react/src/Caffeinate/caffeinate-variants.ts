import { cva } from 'class-variance-authority'

/**
 * Caffeinate 的视觉变体。
 *
 * status 的配色落在大数字与进度格上，容器本身不换色；
 * disabled 没有容器级视觉，只由按钮的 `disabled:` 与 data-* 表达。
 */
export const caffeinateVariants = cva(
  [
    'flex w-full flex-col',
    'rounded-lg border border-border bg-surface p-8',
    'transition-colors duration-[350ms] ease-aios motion-reduce:transition-none',
  ],
  {
    variants: {
      status: {
        low: '',
        medium: '',
        high: '',
      },
      disabled: {
        true: '',
        false: '',
      },
    },
    defaultVariants: { status: 'low', disabled: false },
  },
)

/** 当前咖啡因量的大数字。 */
export const caffeinateLevelVariants = cva(
  [
    'font-mono text-display-lg font-semibold leading-none tracking-[-0.02em] tabular-nums',
    'transition-colors duration-[350ms] ease-aios motion-reduce:transition-none',
  ],
  {
    variants: {
      status: {
        low: 'text-success',
        medium: 'text-foreground-display',
        high: 'text-warning',
      },
    },
    defaultVariants: { status: 'low' },
  },
)

/** 单位「mg」。 */
export const caffeinateUnitVariants = cva([
  'font-mono text-sm uppercase tracking-widest text-foreground-muted',
  'transition-colors duration-[350ms] ease-aios motion-reduce:transition-none',
])

/** 半衰期提示。 */
export const caffeinateDecayVariants = cva([
  'mb-4 font-mono text-caption tabular-nums text-foreground-disabled',
  'transition-colors duration-[350ms] ease-aios motion-reduce:transition-none',
])

/** 进度条的单格。只有已填充的格子跟 status 换色。 */
export const caffeinateSegmentVariants = cva(
  ['flex-1 transition-colors duration-[350ms] ease-aios motion-reduce:transition-none'],
  {
    variants: {
      filled: {
        true: '',
        false: 'bg-border',
      },
      status: {
        low: '',
        medium: '',
        high: '',
      },
    },
    compoundVariants: [
      { filled: true, status: 'low', class: 'bg-success' },
      { filled: true, status: 'medium', class: 'bg-foreground-display' },
      { filled: true, status: 'high', class: 'bg-warning' },
    ],
    defaultVariants: { filled: false, status: 'low' },
  },
)

/** 加一杯的按钮。 */
export const caffeinateDrinkButtonVariants = cva([
  'cursor-pointer border border-border bg-transparent px-4 py-2',
  'font-mono text-caption uppercase tracking-wider text-foreground',
  'transition-[background-color,border-color,color] duration-200 ease-aios',
  'motion-reduce:transition-none',
  'hover:not-disabled:border-foreground-muted hover:not-disabled:bg-surface-raised',
  'active:not-disabled:border-foreground',
  'outline-none focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2',
  'disabled:cursor-not-allowed',
])

/** 按钮里的毫克数。 */
export const caffeinateDrinkMgVariants = cva(['ms-1 tabular-nums text-foreground-disabled'])

/** 摄入记录标题。 */
export const caffeinateLogTitleVariants = cva([
  'mb-1 font-mono text-label uppercase tracking-widest text-foreground-muted',
  'transition-colors duration-[350ms] ease-aios motion-reduce:transition-none',
])

/** 单条摄入记录。 */
export const caffeinateLogItemVariants = cva([
  'flex items-center justify-between border-b border-border py-2 last:border-b-0',
  'transition-colors duration-[350ms] ease-aios motion-reduce:transition-none',
])
