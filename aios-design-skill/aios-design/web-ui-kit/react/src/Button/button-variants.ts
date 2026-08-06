import { cva } from 'class-variance-authority'

/**
 * Button 的视觉变体。
 *
 * 变体/尺寸命名对齐 appica-ui，配色收敛到 Nothing 的 monochrome + 单点红：
 * 没有阴影、没有 blur、没有渐变，层级只靠 background 与 border 表达。
 *
 * 直接把返回的类名贴到 `<a>` 上，就能得到一个「长得像按钮的链接」而不丢链接语义。
 */
export const buttonVariants = cva(
  [
    'aios-btn',
    'relative inline-flex shrink-0 select-none items-center justify-center',
    'font-mono font-bold uppercase leading-none tracking-wider',
    'cursor-pointer whitespace-nowrap',
    'transition-[background-color,border-color,color,opacity,transform] duration-200 ease-aios',
    'motion-reduce:transition-none',
    'outline-none focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2',
    'disabled:pointer-events-none disabled:opacity-40 data-disabled:pointer-events-none data-disabled:opacity-40',
    'active:not-disabled:scale-[0.97] motion-reduce:active:scale-100',
    // 图标间距约定：用 data-icon 标注，逻辑属性保证 RTL 自动镜像
    '[&_[data-icon=start]]:me-2 [&_[data-icon=end]]:ms-2',
    '[&_svg]:size-[1.15em] [&_svg]:shrink-0',
  ],
  {
    variants: {
      variant: {
        primary:
          'rounded-button bg-foreground-display text-background hover:not-disabled:opacity-85 active:not-disabled:opacity-70',
        'primary-outline':
          'rounded-button border border-foreground-display bg-transparent text-foreground-display hover:not-disabled:bg-foreground-display hover:not-disabled:text-background',
        secondary:
          'rounded-button border border-border-visible bg-transparent text-foreground hover:not-disabled:border-foreground-muted hover:not-disabled:text-foreground-display active:not-disabled:border-foreground',
        soft: 'rounded-button border border-border bg-surface-raised text-foreground hover:not-disabled:border-border-visible hover:not-disabled:text-foreground-display active:not-disabled:bg-border',
        outline:
          'rounded-button border border-border bg-transparent text-foreground-muted hover:not-disabled:border-border-visible hover:not-disabled:text-foreground-display',
        ghost:
          'rounded-none bg-transparent text-foreground-muted hover:not-disabled:bg-muted hover:not-disabled:text-foreground-display active:not-disabled:text-foreground',
        destructive:
          'rounded-button border border-accent bg-transparent text-accent hover:not-disabled:bg-accent-subtle active:not-disabled:bg-accent active:not-disabled:text-white',
      },
      size: {
        sm: 'h-9 min-w-9 px-4 text-label',
        md: 'h-11 min-w-11 px-6 text-xs',
        lg: 'h-13 min-w-13 px-8 text-sm',
        'icon-sm': 'size-9 p-0',
        'icon-md': 'size-11 p-0',
        'icon-lg': 'size-13 p-0',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
      loading: {
        true: 'cursor-wait opacity-85',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
      loading: false,
    },
  },
)

/** v1 的变体名 → 当前变体名。保留是为了不让既有调用点一次性全炸。 */
const LEGACY_VARIANTS = {
  tertiary: 'soft',
} as const

/** v1 的尺寸名 → 当前尺寸名。 */
const LEGACY_SIZES = {
  default: 'md',
  icon: 'icon-md',
} as const

export type ButtonVariant =
  | 'primary'
  | 'primary-outline'
  | 'secondary'
  | 'soft'
  | 'outline'
  | 'ghost'
  | 'destructive'
  | keyof typeof LEGACY_VARIANTS

export type ButtonSize =
  | 'sm'
  | 'md'
  | 'lg'
  | 'icon-sm'
  | 'icon-md'
  | 'icon-lg'
  | keyof typeof LEGACY_SIZES

export function resolveButtonVariant(variant: ButtonVariant | null | undefined) {
  if (!variant) return undefined
  return (LEGACY_VARIANTS as Record<string, string>)[variant] ?? variant
}

export function resolveButtonSize(size: ButtonSize | null | undefined) {
  if (!size) return undefined
  return (LEGACY_SIZES as Record<string, string>)[size] ?? size
}
