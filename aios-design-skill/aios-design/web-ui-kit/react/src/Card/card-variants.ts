import { cva } from 'class-variance-authority'

/* ────────────────────────────────────────────────────────────
   ContentCard
   ──────────────────────────────────────────────────────────── */

/**
 * 内容卡片的视觉变体。
 *
 * v1 把「密度」（compact）与「形状」（technical）混在 variant 里，v2 把它们
 * 拆成 `size` 与 `shape` 两个正交维度，variant 只留下强调层级。
 */
export const contentCardVariants = cva(
  ['border transition-colors duration-200 ease-aios', 'motion-reduce:transition-none'],
  {
    variants: {
      variant: {
        soft: 'border-border bg-surface',
        secondary: 'border-border bg-surface-raised',
        outline: 'border-border bg-transparent',
        ghost: 'border-transparent bg-transparent',
      },
      size: {
        sm: 'px-4 py-2',
        md: 'px-6 py-5',
        lg: 'px-8 py-6',
      },
      shape: {
        rounded: 'rounded-card',
        technical: 'rounded-xs',
      },
      interactive: {
        true: 'cursor-pointer select-none hover:border-border-visible active:opacity-85 outline-none focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2',
        false: '',
      },
      disabled: {
        true: 'pointer-events-none opacity-40',
        false: '',
      },
    },
    compoundVariants: [
      // 紧凑卡的圆角跟着密度一起收
      { size: 'sm', shape: 'rounded', class: 'rounded-card-compact' },
    ],
    defaultVariants: {
      variant: 'soft',
      size: 'md',
      shape: 'rounded',
      interactive: false,
      disabled: false,
    },
  },
)

/** v1 的变体名 → 当前变体名。 */
const LEGACY_CARD_VARIANTS = {
  default: 'soft',
  raised: 'secondary',
  borderless: 'ghost',
  compact: 'soft',
  technical: 'soft',
} as const

/** v1 里塞在 variant 上的密度。 */
const LEGACY_CARD_SIZES = {
  compact: 'sm',
} as const

/** v1 里塞在 variant 上的形状。 */
const LEGACY_CARD_SHAPES = {
  technical: 'technical',
} as const

export type CardVariant =
  | 'soft'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | keyof typeof LEGACY_CARD_VARIANTS

export type CardSize = 'sm' | 'md' | 'lg'

export type CardShape = 'rounded' | 'technical'

export function resolveCardVariant(variant: CardVariant | null | undefined) {
  if (!variant) return undefined
  return (LEGACY_CARD_VARIANTS as Record<string, string>)[variant] ?? variant
}

/** 老调用点把密度写在 variant 上（`compact`）时，把它翻译成 size。 */
export function resolveCardSize(
  variant: CardVariant | null | undefined,
  size: CardSize | null | undefined,
) {
  if (size) return size
  if (!variant) return undefined
  return (LEGACY_CARD_SIZES as Record<string, CardSize>)[variant]
}

/** 老调用点把形状写在 variant 上（`technical`）时，把它翻译成 shape。 */
export function resolveCardShape(
  variant: CardVariant | null | undefined,
  shape: CardShape | null | undefined,
) {
  if (shape) return shape
  if (!variant) return undefined
  return (LEGACY_CARD_SHAPES as Record<string, CardShape>)[variant]
}

/* ────────────────────────────────────────────────────────────
   WidgetCard
   ──────────────────────────────────────────────────────────── */

/**
 * Widget 卡片的视觉变体。
 *
 * `size` 描述的是桌面小组件的版型（方 / 宽 / 高），不是控件高度阶梯，
 * 所以额外接受 sm|md|lg 作为 tall|square|wide 的别名。
 *
 * v1 的 hover 用了一层跟随鼠标的 radial-gradient，v2 直接删掉——
 * AIOS 不用渐变表达层级，hover 只换 border 与 background。
 */
export const widgetCardVariants = cva(
  [
    'relative box-border flex flex-col justify-between overflow-hidden',
    'font-body',
    'transition-colors duration-300 ease-aios motion-reduce:transition-none',
  ],
  {
    variants: {
      size: {
        square: 'size-[var(--widget-size-md)]',
        wide: 'h-[var(--widget-size-md)] w-[var(--widget-size-lg)]',
        tall: 'h-[var(--widget-size-md)] w-[var(--widget-size-sm)]',
        auto: 'size-auto',
      },
      shape: {
        rounded: 'rounded-xl',
        pill: 'rounded-[250px]',
        circle: 'rounded-full',
      },
      theme: {
        light: 'bg-widget-card',
        dark: 'bg-widget-dark',
        accent: 'bg-accent',
      },
      density: {
        default: 'p-4',
        compact: 'rounded-md p-2',
      },
      align: {
        left: 'text-start',
        center: 'text-center',
        right: 'text-end',
      },
      clickable: {
        true: 'cursor-pointer hover:border-border-visible hover:bg-surface-raised active:opacity-85 outline-none focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2',
        false: '',
      },
      hasChildren: {
        true: 'p-0',
        false: '',
      },
    },
    defaultVariants: {
      size: 'square',
      shape: 'rounded',
      theme: 'dark',
      density: 'default',
      align: 'center',
      clickable: false,
      hasChildren: false,
    },
  },
)

/** Widget 标题。 */
export const widgetCardTitleVariants = cva(['text-micro uppercase leading-snug tracking-wider'], {
  variants: {
    theme: {
      light: 'text-[var(--widget-dark-3)]',
      dark: 'text-[var(--widget-dark-4)]',
      accent: 'text-[var(--widget-text-on-accent)]',
    },
  },
  defaultVariants: { theme: 'dark' },
})

/** Widget 主数值。 */
export const widgetCardValueVariants = cva(['font-dotmatrix font-light leading-tight tracking-tight'], {
  variants: {
    theme: {
      light: 'text-[var(--widget-dark-2)]',
      dark: 'text-[var(--widget-white)]',
      accent: 'text-[var(--widget-white)]',
    },
    density: {
      default: 'text-display-sm',
      compact: 'text-heading',
    },
  },
  defaultVariants: { theme: 'dark', density: 'default' },
})

/** Widget 副标题。 */
export const widgetCardSubtitleVariants = cva(
  ['text-micro uppercase leading-snug tracking-wider'],
  {
    variants: {
      theme: {
        light: 'text-[var(--widget-dark-4)]',
        dark: 'text-[var(--widget-dark-3)]',
        accent: 'text-[var(--widget-text-on-accent)]',
      },
    },
    defaultVariants: { theme: 'dark' },
  },
)

/** v1 的版型别名。 */
const LEGACY_WIDGET_SIZES = {
  sm: 'tall',
  md: 'square',
  lg: 'wide',
} as const

/** v1 的 variant（default | compact）其实是密度。 */
const LEGACY_WIDGET_DENSITIES = {
  default: 'default',
  compact: 'compact',
} as const

export type WidgetCardSize = 'square' | 'wide' | 'tall' | 'auto' | keyof typeof LEGACY_WIDGET_SIZES

export type WidgetCardShape = 'rounded' | 'pill' | 'circle'

export type WidgetCardTheme = 'light' | 'dark' | 'accent'

export type WidgetCardDensity = 'default' | 'compact'

export type WidgetCardAlign = 'left' | 'center' | 'right'

export type WidgetCardIconPosition = 'top' | 'left' | 'right' | 'bottom'

export function resolveWidgetCardSize(size: WidgetCardSize | null | undefined) {
  if (!size) return undefined
  return (LEGACY_WIDGET_SIZES as Record<string, string>)[size] ?? size
}

export function resolveWidgetCardDensity(variant: string | null | undefined) {
  if (!variant) return undefined
  return (
    (LEGACY_WIDGET_DENSITIES as Record<string, WidgetCardDensity>)[variant] ??
    (variant as WidgetCardDensity)
  )
}
