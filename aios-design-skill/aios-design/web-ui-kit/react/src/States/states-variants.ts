import { cva } from 'class-variance-authority'

/**
 * 四个状态占位块（loading / error / empty / disabled）的共享容器。
 *
 * `variant` 这里描述的是语义状态而非 §3 的强调层级——状态块不参与
 * primary / secondary 那套词表。`size` 在 v1 里就没有对应样式，这里保留
 * 成空档位只为了不改公开 API。
 */
export const stateVariants = cva(
  ['flex flex-col items-center justify-center text-center px-6 py-24'],
  {
    variants: {
      variant: {
        loading: 'p-6',
        error: 'items-start p-4 text-start',
        empty: '',
        disabled: 'opacity-40',
      },
      size: {
        sm: '',
        md: '',
        lg: '',
      },
    },
    defaultVariants: { variant: 'loading', size: 'md' },
  },
)

/** 状态标题。error 用红，disabled 压到最弱一档。 */
export const stateHeadlineVariants = cva(
  ['mb-1 font-mono text-base uppercase tracking-wider text-foreground-muted'],
  {
    variants: {
      variant: {
        loading: '',
        error: 'text-accent',
        empty: '',
        disabled: 'text-foreground-disabled',
      },
    },
    defaultVariants: { variant: 'empty' },
  },
)

/** 状态描述。 */
export const stateDescriptionVariants = cva(
  ['max-w-80 font-body text-sm leading-normal text-foreground-disabled'],
  {
    variants: {
      variant: {
        loading: '',
        error: '',
        empty: '',
        disabled: 'text-foreground-disabled',
      },
    },
    defaultVariants: { variant: 'empty' },
  },
)

/** 动作区（按钮）。 */
export const stateActionVariants = cva(['mt-6'])

/** error 的补充信息行。 */
export const stateMessageVariants = cva(['mt-1 font-mono text-caption text-accent'])

/** error 标题前缀（`[ERR]` 这类）。 */
export const statePrefixVariants = cva([
  'me-1 font-mono text-label uppercase tracking-wider text-accent',
])

/**
 * empty 的点阵占位。
 *
 * radial-gradient 在这里不是「用渐变造深度」，而是 Nothing 的点阵网格本身
 * ——tokens.css 的 `.dot-grid` 工具类用的是同一手法。硬色阶（2px 实心点后
 * 直接 transparent）不产生任何过渡带。
 */
export const stateDotMatrixVariants = cva([
  'mb-4 size-16 opacity-60',
  'bg-[image:radial-gradient(circle,var(--border-visible)_2px,transparent_2px)]',
  'bg-[size:8px_8px]',
])

/** loading 的条形示波器容器。 */
export const stateSpinnerVariants = cva(['mb-4 flex h-6 items-end gap-[3px]'])

/**
 * 示波器的单根竖条。
 *
 * 高度与相位差都跟着序号走，形成从中间往两侧衰减的波形；
 * keyframes 留在 States.css 里，工具类表达不了。
 */
export const stateSpinnerSegmentVariants = cva(
  [
    'w-1 rounded-none bg-foreground-display',
    'motion-safe:animate-[aios-spinner-pulse_1.2s_ease-in-out_infinite]',
    'motion-reduce:animate-none',
  ],
  {
    variants: {
      index: {
        0: 'h-2 [animation-delay:0ms]',
        1: 'h-3 [animation-delay:150ms]',
        2: 'h-[18px] [animation-delay:300ms]',
        3: 'h-6 [animation-delay:450ms]',
        4: 'h-[18px] [animation-delay:600ms]',
        5: 'h-3 [animation-delay:750ms]',
        6: 'h-2 [animation-delay:900ms]',
      },
    },
    defaultVariants: { index: 0 },
  },
)

/** 进度条轨道。 */
export const stateLoadingBarVariants = cva(['mb-2 flex w-50 gap-0.5'])

/** 进度条的单个刻度。 */
export const loadingSegmentVariants = cva(
  [
    'h-1 flex-1 rounded-none transition-colors duration-200 ease-aios motion-reduce:transition-none',
  ],
  {
    variants: {
      filled: {
        true: 'bg-foreground-display',
        false: 'bg-border',
      },
    },
    defaultVariants: { filled: false },
  },
)

/** 百分比读数。 */
export const statePercentageVariants = cva([
  'font-mono text-caption tabular-nums text-foreground-muted',
])

/** `[ LABEL ]` 方括号文案。 */
export const stateBracketTextVariants = cva([
  'font-mono text-caption uppercase tracking-wider text-foreground-disabled',
])

export type StateVariant = 'loading' | 'error' | 'empty' | 'disabled'

export type StateSize = 'sm' | 'md' | 'lg'
