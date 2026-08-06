import { cva } from 'class-variance-authority'

/**
 * Chrono（秒表）的视觉变体。
 *
 * v1 的 `size` 只是挂了个类名、没有对应样式；这里给 sm/lg 补上内边距梯度，
 * `md` 保持与 v1 完全一致（32px 内边距）。
 */
export const chronoVariants = cva(
  [
    'flex w-full flex-col',
    'rounded-lg border border-border bg-surface',
    'transition-colors duration-[350ms] ease-aios motion-reduce:transition-none',
  ],
  {
    variants: {
      state: {
        idle: '',
        running: '',
        paused: '',
      },
      size: {
        sm: 'p-6',
        md: 'p-8',
        lg: 'p-10',
      },
    },
    defaultVariants: { state: 'idle', size: 'md' },
  },
)

/** 顶部标题。 */
export const chronoTitleVariants = cva([
  'font-mono text-label uppercase tracking-widest text-foreground-muted',
  'transition-colors duration-[350ms] ease-aios motion-reduce:transition-none',
])

/**
 * 主计时读数。
 *
 * `tabular-nums` 不能省：秒表每帧都在跳，比例宽度的数字会让整行左右抖。
 */
export const chronoDisplayVariants = cva(
  [
    'text-center font-mono font-bold leading-none tracking-[-0.02em] tabular-nums text-foreground-display',
    'transition-colors duration-[350ms] ease-aios motion-reduce:transition-none',
  ],
  {
    variants: {
      size: {
        sm: 'mb-6 text-display-md',
        md: 'mb-8 text-display-lg',
        lg: 'mb-8 text-display-xl',
      },
    },
    defaultVariants: { size: 'md' },
  },
)

/** START / PAUSE / LAP / RESET 四个按钮。 */
export const chronoButtonVariants = cva(
  [
    'inline-flex min-h-11 cursor-pointer select-none items-center justify-center',
    'rounded-pill px-6 py-3 font-mono text-xs font-bold uppercase leading-none tracking-wider',
    '[-webkit-tap-highlight-color:transparent]',
    'transition-[background-color,border-color,color,opacity] duration-200 ease-aios',
    'motion-reduce:transition-none',
    'outline-none focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-40',
  ],
  {
    variants: {
      action: {
        start:
          'flex-1 border-none bg-foreground-display text-black hover:not-disabled:opacity-85 active:not-disabled:opacity-70',
        pause:
          'flex-1 border-none bg-accent text-foreground-display hover:not-disabled:opacity-85 active:not-disabled:opacity-70',
        lap: 'flex-1 border border-border-visible bg-transparent text-foreground hover:not-disabled:border-foreground-muted hover:not-disabled:text-foreground-display active:not-disabled:border-foreground',
        reset:
          'w-full border border-border-visible bg-transparent text-foreground-muted hover:not-disabled:border-foreground-muted hover:not-disabled:text-foreground-display active:not-disabled:border-foreground',
      },
    },
    defaultVariants: { action: 'start' },
  },
)

/** 圈速列表容器。滚动条收成 4px 的细条。 */
export const chronoLapsVariants = cva([
  'mt-4 max-h-80 overflow-y-auto',
  '[scrollbar-width:thin] [scrollbar-color:var(--border-visible)_transparent]',
  '[&::-webkit-scrollbar]:w-1',
  '[&::-webkit-scrollbar-track]:bg-transparent',
  '[&::-webkit-scrollbar-thumb]:rounded-2xs [&::-webkit-scrollbar-thumb]:bg-border-visible',
])

/** 单条圈速。 */
export const chronoLapItemVariants = cva([
  'flex items-baseline border-b border-border py-2 last:border-b-0',
  'transition-colors duration-[350ms] ease-aios motion-reduce:transition-none',
])

/** 圈号。 */
export const chronoLapNumberVariants = cva([
  'min-w-12 font-mono text-caption uppercase tracking-wider tabular-nums text-foreground-muted',
  'transition-colors duration-[350ms] ease-aios motion-reduce:transition-none',
])

/** 本圈耗时。最快标绿、最慢标黄。 */
export const chronoLapDeltaVariants = cva(
  [
    'flex-1 font-mono text-sm tabular-nums',
    'transition-colors duration-[350ms] ease-aios motion-reduce:transition-none',
  ],
  {
    variants: {
      pace: {
        normal: 'text-foreground',
        fastest: 'text-success',
        slowest: 'text-warning',
      },
    },
    defaultVariants: { pace: 'normal' },
  },
)

/** 累计耗时。 */
export const chronoLapTotalVariants = cva([
  'font-mono text-sm tabular-nums text-foreground-muted',
  'transition-colors duration-[350ms] ease-aios motion-reduce:transition-none',
])
