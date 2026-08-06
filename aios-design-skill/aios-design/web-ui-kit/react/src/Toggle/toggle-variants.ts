import { cva } from 'class-variance-authority'

/**
 * Toggle 的视觉变体。
 *
 * 按下态用 `data-pressed` 表达，对应 theme.css 的 `pressed:` 变体。
 * `soft` 是垫一层 surface 的默认形态，`outline` 用于连成一排的分段控制。
 */
export const toggleVariants = cva(
  [
    'inline-flex shrink-0 cursor-pointer select-none items-center justify-center',
    'whitespace-nowrap font-mono font-medium',
    'transition-[background-color,border-color,color,font-weight,scale] duration-200 ease-aios',
    'motion-reduce:transition-none',
    'outline-none focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2',
    'active:not-disabled:scale-[0.97] motion-reduce:active:scale-100',
    'disabled:pointer-events-none disabled:opacity-40',
    'data-disabled:pointer-events-none data-disabled:opacity-40',
    '[&_[data-icon=start]]:me-2 [&_[data-icon=end]]:ms-2',
    '[&_svg]:size-[1.15em] [&_svg]:shrink-0',
  ],
  {
    variants: {
      variant: {
        soft: 'rounded-sm border border-transparent bg-surface text-foreground hover:not-disabled:bg-surface-raised pressed:bg-muted pressed:font-bold pressed:text-foreground-display',
        outline:
          'rounded-sm border border-border-visible bg-transparent text-foreground hover:not-disabled:border-foreground-muted pressed:border-accent pressed:bg-accent-subtle pressed:font-bold pressed:text-accent',
        ghost:
          'rounded-none border border-transparent bg-transparent text-foreground-muted hover:not-disabled:bg-muted pressed:bg-muted pressed:font-bold pressed:text-foreground-display',
      },
      size: {
        sm: 'h-9 px-3 text-caption',
        md: 'h-11 px-4 text-sm',
        lg: 'h-13 px-6 text-base',
      },
    },
    defaultVariants: { variant: 'soft', size: 'md' },
  },
)

/**
 * ToggleGroup 的容器。
 *
 * `outline` 让子项连成一排：圆角只留在首尾，相邻项用 `-ms-px` 合并边框，
 * 逻辑属性保证 RTL 下自动镜像。
 */
export const toggleGroupVariants = cva(['inline-flex flex-wrap items-center'], {
  variants: {
    variant: {
      soft: 'gap-1',
      outline: [
        'gap-0',
        '[&>[data-slot=toggle]]:rounded-none',
        '[&>[data-slot=toggle]:first-child]:rounded-s-sm',
        '[&>[data-slot=toggle]:last-child]:rounded-e-sm',
        '[&>[data-slot=toggle]:not(:first-child)]:-ms-px',
        '[&>[data-slot=toggle][data-pressed]]:z-10',
      ],
      ghost: 'gap-1',
    },
  },
  defaultVariants: { variant: 'soft' },
})

/** v1 的变体名 → 当前变体名。保留是为了不让既有调用点一次性全炸。 */
const LEGACY_VARIANTS = {
  default: 'soft',
} as const

export type ToggleVariant = 'soft' | 'outline' | 'ghost' | keyof typeof LEGACY_VARIANTS

export type ToggleSize = 'sm' | 'md' | 'lg'

export function resolveToggleVariant(variant: ToggleVariant | null | undefined) {
  if (!variant) return undefined
  return (LEGACY_VARIANTS as Record<string, string>)[variant] ?? variant
}
