import { cva } from 'class-variance-authority'

/**
 * Input 的视觉变体。
 *
 * 输入类控件只保留词表里的 `outline`（默认）与 `soft`：
 * 层级靠 background + border 表达，没有阴影、没有 blur、没有渐变。
 */
export const inputVariants = cva(['relative flex w-full flex-col gap-1'], {
  variants: {
    variant: {
      outline: '',
      soft: '',
    },
    size: {
      sm: '',
      md: '',
      lg: '',
    },
    hasError: {
      true: '',
      false: '',
    },
    disabled: {
      true: 'cursor-not-allowed',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'outline',
    size: 'md',
    hasError: false,
    disabled: false,
  },
})

/** 包裹图标 + 原生 input 的一行。边框与背景都长在这里。 */
export const inputControlVariants = cva(
  [
    'relative flex w-full items-center gap-2',
    'transition-colors duration-200 ease-aios motion-reduce:transition-none',
  ],
  {
    variants: {
      variant: {
        outline:
          'rounded-input border border-border-visible bg-transparent focus-within:border-foreground',
        soft: 'rounded-input border border-border bg-surface-raised focus-within:border-border-visible',
      },
      size: {
        sm: 'min-h-9 px-2',
        md: 'min-h-11 px-3',
        lg: 'min-h-13 px-4',
      },
      hasError: {
        true: 'border-accent focus-within:border-accent',
        false: '',
      },
      disabled: {
        true: 'border-border focus-within:border-border',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'outline',
      size: 'md',
      hasError: false,
      disabled: false,
    },
  },
)

/** 原生 input 本体：无边框、无背景，一切交给 control。 */
export const inputFieldVariants = cva(
  [
    'w-full min-w-0 flex-1 border-0 bg-transparent font-mono text-foreground outline-none',
    'placeholder:text-foreground-disabled',
    'transition-colors duration-200 ease-aios motion-reduce:transition-none',
    'disabled:cursor-not-allowed disabled:text-foreground-disabled',
  ],
  {
    variants: {
      size: {
        sm: 'py-1 text-sm',
        md: 'py-2 text-base',
        lg: 'py-2 text-base',
      },
    },
    defaultVariants: { size: 'md' },
  },
)

/** 字段标签。 */
export const inputLabelVariants = cva(
  [
    'font-mono uppercase tracking-wider text-foreground-muted',
    'transition-colors duration-200 ease-aios motion-reduce:transition-none',
  ],
  {
    variants: {
      size: {
        sm: 'text-micro',
        md: 'text-label',
        lg: 'text-caption',
      },
      hasError: {
        true: 'text-accent',
        false: '',
      },
      disabled: {
        true: 'text-foreground-disabled',
        false: '',
      },
    },
    defaultVariants: { size: 'md', hasError: false, disabled: false },
  },
)

/**
 * 辅助说明 / 错误文案。
 *
 * 命名刻意避开 `inputMessageVariants` —— 那是独立组件 `InputMessage`（聊天输入框）的。
 */
export const inputHelperVariants = cva(
  [
    'font-mono text-label uppercase tracking-wide',
    'transition-colors duration-200 ease-aios motion-reduce:transition-none',
  ],
  {
    variants: {
      variant: {
        default: 'text-foreground-muted',
        error: 'text-accent',
      },
    },
    defaultVariants: { variant: 'default' },
  },
)

/** 前后缀图标槽位。 */
export const inputIconVariants = cva([
  'inline-flex shrink-0 items-center justify-center text-foreground-muted',
  '[&_svg]:size-[1em] [&_svg]:shrink-0',
])

/** 清除按钮。 */
export const inputClearVariants = cva([
  'inline-flex shrink-0 cursor-pointer items-center justify-center',
  'm-0 border-0 bg-transparent p-0 text-foreground-muted',
  'transition-colors duration-200 ease-aios motion-reduce:transition-none',
  'hover:text-foreground',
  'focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2',
  '[&_svg]:size-[1em] [&_svg]:shrink-0',
])

/** v1 的变体名 → 当前变体名。保留是为了不让既有调用点一次性全炸。 */
const LEGACY_VARIANTS = {
  underline: 'outline',
  bordered: 'soft',
} as const

export type InputVariant = 'outline' | 'soft' | keyof typeof LEGACY_VARIANTS

export type InputSize = 'sm' | 'md' | 'lg'

export function resolveInputVariant(variant: InputVariant | null | undefined) {
  if (!variant) return undefined
  return (LEGACY_VARIANTS as Record<string, string>)[variant] ?? variant
}
