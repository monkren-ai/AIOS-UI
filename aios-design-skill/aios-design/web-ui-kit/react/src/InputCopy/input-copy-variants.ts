import { cva } from 'class-variance-authority'

/** 外层：label 在上，输入行在下。 */
export const inputCopyVariants = cva(['flex flex-col gap-xs font-body'], {
  variants: {
    size: {
      sm: '',
      md: '',
      lg: '',
    },
    copied: {
      true: '',
      false: '',
    },
  },
  defaultVariants: { size: 'md', copied: false },
})

export const inputCopyLabelVariants = cva([
  'font-mono text-caption uppercase tracking-widest text-foreground-muted',
])

/** 输入 + 复制按钮的一行。边框长在这里。 */
export const inputCopyControlVariants = cva(
  [
    'flex items-stretch overflow-hidden',
    'rounded-input border border-border-visible bg-surface',
    'transition-colors duration-200 ease-aios motion-reduce:transition-none',
    'focus-within:border-foreground-muted',
  ],
  {
    variants: {
      size: {
        sm: 'min-h-9',
        md: 'min-h-11',
        lg: 'min-h-13',
      },
    },
    defaultVariants: { size: 'md' },
  },
)

export const inputCopyFieldVariants = cva(
  [
    'min-w-0 flex-1 border-0 bg-transparent text-start font-body text-foreground outline-none',
    'placeholder:text-foreground-subtle',
    'read-only:cursor-text',
  ],
  {
    variants: {
      size: {
        sm: 'px-2 py-1 text-caption',
        md: 'px-4 py-2 text-sm',
        lg: 'p-4 text-base',
      },
    },
    defaultVariants: { size: 'md' },
  },
)

/**
 * 复制按钮。
 *
 * 分隔线用 `border-s`（不是 `border-l`），RTL 下会自动跑到另一侧。
 * 复制成功时的闪光走 `@keyframes aios-input-copy-flash`（见 InputCopy.css）。
 */
export const inputCopyButtonVariants = cva(
  [
    'inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap',
    'border-0 border-s border-s-border bg-transparent',
    'font-mono uppercase tracking-widest text-foreground-muted',
    'transition-[color,border-color,background-color] duration-200 ease-aios',
    'motion-reduce:transition-none',
    'hover:bg-surface-raised hover:text-foreground',
    'focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2',
  ],
  {
    variants: {
      size: {
        sm: 'px-2 py-1 text-micro',
        md: 'px-4 py-2 text-caption',
        lg: 'px-6 py-4 text-sm',
      },
      copied: {
        true: [
          'border-s-success text-success',
          'animate-[aios-input-copy-flash_0.4s_var(--ease-spring-moderate)]',
          'motion-reduce:animate-none',
        ],
        false: '',
      },
    },
    defaultVariants: { size: 'md', copied: false },
  },
)

export const inputCopyButtonTextVariants = cva([
  'inline-block transition-opacity duration-200 ease-aios motion-reduce:transition-none',
])

/** v1 的尺寸名 → 当前尺寸名。 */
const LEGACY_SIZES = {
  default: 'md',
} as const

export type InputCopySize = 'sm' | 'md' | 'lg' | keyof typeof LEGACY_SIZES

export function resolveInputCopySize(size: InputCopySize | null | undefined) {
  if (!size) return undefined
  return (LEGACY_SIZES as Record<string, string>)[size] ?? size
}
