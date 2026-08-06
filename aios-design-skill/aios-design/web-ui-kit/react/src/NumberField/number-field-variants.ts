import { cva } from 'class-variance-authority'

/**
 * NumberField 的视觉变体。
 *
 * 结构是 `[−] [Input] [+]`：边框与背景长在 Group 上（复用 Input 的 `soft` 形态——
 * `border + bg-surface-raised`），Input 本体无框、居中、Space Mono 数字，步进按钮是
 * 与高度等宽的方形。没有阴影、没有 blur、没有渐变。
 */
export const numberFieldVariants = cva(['relative flex w-full flex-col gap-1'], {
  variants: {
    size: {
      sm: '',
      md: '',
      lg: '',
    },
    disabled: { true: 'opacity-40', false: '' },
    hasError: { true: '', false: '' },
  },
  defaultVariants: { size: 'md', disabled: false, hasError: false },
})

/** 字段标签。 */
export const numberFieldLabelVariants = cva(
  ['font-mono uppercase tracking-wider text-foreground-muted'],
  {
    variants: {
      size: { sm: 'text-micro', md: 'text-label', lg: 'text-caption' },
      hasError: { true: 'text-accent', false: '' },
      disabled: { true: 'text-foreground-disabled', false: '' },
    },
    defaultVariants: { size: 'md', hasError: false, disabled: false },
  },
)

/**
 * `[−] [Input] [+]` 这一行。
 *
 * 边框 / 背景都在这里，Input 与步进按钮自身透明。`focus-within` 把边框提到
 * `border-visible`，错误态转红。
 */
export const numberFieldGroupVariants = cva(
  [
    'flex w-full items-stretch overflow-hidden',
    'rounded-input border border-border bg-surface-raised',
    'transition-colors duration-200 ease-aios motion-reduce:transition-none',
    'focus-within:border-border-visible',
  ],
  {
    variants: {
      size: {
        sm: 'h-9 min-h-9',
        md: 'h-11 min-h-11',
        lg: 'h-13 min-h-13',
      },
      hasError: {
        true: 'border-accent focus-within:border-accent',
        false: '',
      },
      disabled: {
        true: 'opacity-40',
        false: '',
      },
    },
    defaultVariants: { size: 'md', hasError: false, disabled: false },
  },
)

/** Input 本体：无边框、无背景、居中、Space Mono 数字。 */
export const numberFieldInputVariants = cva(
  [
    'w-full min-w-0 flex-1 border-0 bg-transparent text-center',
    'font-mono text-foreground outline-none',
    'placeholder:text-foreground-disabled',
    'transition-colors duration-200 ease-aios motion-reduce:transition-none',
    'disabled:cursor-not-allowed disabled:text-foreground-disabled',
    'focus-visible:outline-none',
  ],
  {
    variants: {
      size: { sm: 'py-1 text-sm', md: 'py-2 text-base', lg: 'py-2 text-base' },
    },
    defaultVariants: { size: 'md' },
  },
)

/**
 * 步进按钮。
 *
 * 方形——宽度等于 Group 的高度，`items-stretch` 让它撑满高度。按下时轻微缩放，
 * 悬停垫一层 `muted`，焦点环走 `interactive`。
 */
export const numberFieldStepperVariants = cva(
  [
    'inline-flex h-full shrink-0 cursor-pointer select-none items-center justify-center',
    'border-0 bg-transparent font-mono leading-none text-foreground-muted',
    'transition-[background-color,color,scale] duration-200 ease-aios motion-reduce:transition-none',
    'hover:not-disabled:bg-muted hover:not-disabled:text-foreground-display',
    'focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2',
    'disabled:pointer-events-none disabled:opacity-40',
    'data-disabled:pointer-events-none data-disabled:opacity-40',
    'active:not-disabled:scale-[0.97] motion-reduce:active:scale-100',
  ],
  {
    variants: {
      size: { sm: 'w-9 text-sm', md: 'w-11 text-base', lg: 'w-13 text-base' },
    },
    defaultVariants: { size: 'md' },
  },
)

/** 错误文案。 */
export const numberFieldErrorVariants = cva([
  'mt-xs font-mono text-label uppercase tracking-wide text-accent',
])

export type NumberFieldSize = 'sm' | 'md' | 'lg'
