import { cva } from 'class-variance-authority'

/**
 * Textarea 的视觉变体。
 *
 * 与 Input 同构：只有 `outline`（默认）与 `soft`，
 * 层级靠 background + border 表达，没有阴影、没有 blur、没有渐变。
 */
export const textareaVariants = cva(['relative flex w-full flex-col gap-1'], {
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
    focused: {
      true: '',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'outline',
    size: 'md',
    hasError: false,
    disabled: false,
    focused: false,
  },
})

/** 原生 textarea 本体。 */
export const textareaFieldVariants = cva(
  [
    'w-full font-mono text-foreground outline-none',
    'placeholder:text-foreground-disabled',
    'transition-colors duration-200 ease-nothing motion-reduce:transition-none',
    'focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2',
    'disabled:cursor-not-allowed disabled:resize-none disabled:text-foreground-disabled',
  ],
  {
    variants: {
      variant: {
        outline:
          'rounded-input border border-border-visible bg-transparent focus:border-foreground',
        soft: 'rounded-input border border-border bg-surface-raised focus:border-border-visible',
      },
      size: {
        sm: 'min-h-18 p-2 text-sm',
        md: 'min-h-22 p-3 text-base',
        lg: 'min-h-26 p-4 text-base',
      },
      hasError: {
        true: 'border-accent focus:border-accent',
        false: '',
      },
      disabled: {
        true: 'border-border focus:border-border',
        false: '',
      },
      autoResize: {
        true: 'resize-none overflow-hidden',
        false: 'resize-y',
      },
    },
    defaultVariants: {
      variant: 'outline',
      size: 'md',
      hasError: false,
      disabled: false,
      autoResize: false,
    },
  },
)

/** 字段标签。focus 时提亮，error 时变红。 */
export const textareaLabelVariants = cva(
  [
    'font-mono uppercase tracking-wider text-foreground-muted',
    'transition-colors duration-200 ease-nothing motion-reduce:transition-none',
  ],
  {
    variants: {
      size: {
        sm: 'text-micro',
        md: 'text-label',
        lg: 'text-caption',
      },
      focused: {
        true: 'text-foreground',
        false: '',
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
    defaultVariants: { size: 'md', focused: false, hasError: false, disabled: false },
  },
)

/** 辅助说明 / 错误文案。 */
export const textareaMessageVariants = cva(
  [
    'font-mono text-label uppercase tracking-wide',
    'transition-colors duration-200 ease-nothing motion-reduce:transition-none',
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

/** v1 的变体名 → 当前变体名。 */
const LEGACY_VARIANTS = {
  underline: 'outline',
  bordered: 'soft',
} as const

export type TextareaVariant = 'outline' | 'soft' | keyof typeof LEGACY_VARIANTS

export type TextareaSize = 'sm' | 'md' | 'lg'

export function resolveTextareaVariant(variant: TextareaVariant | null | undefined) {
  if (!variant) return undefined
  return (LEGACY_VARIANTS as Record<string, string>)[variant] ?? variant
}
