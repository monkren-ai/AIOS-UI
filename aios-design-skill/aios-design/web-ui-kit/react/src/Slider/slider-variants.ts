import { cva } from 'class-variance-authority'

/**
 * Slider 的视觉变体。
 *
 * `primary` 用单点红做进度，`soft` 退回到中性灰，两者都只靠 background + border 表达层级。
 * 子部件的配色通过根节点的 `data-variant` / `data-disabled` 读取，所以根上带 `group/slider`。
 */
export const sliderVariants = cva(
  ['group/slider flex w-full select-none flex-col gap-2 [-webkit-tap-highlight-color:transparent]'],
  {
    variants: {
      size: {
        sm: '',
        md: '',
        lg: '',
      },
      variant: {
        primary: '',
        soft: '',
      },
      disabled: {
        true: 'cursor-not-allowed opacity-40',
        false: '',
      },
    },
    defaultVariants: { size: 'md', variant: 'primary', disabled: false },
  },
)

/** label + value 的一行。 */
export const sliderHeaderVariants = cva(['flex items-center justify-between'])

/** 字段标签。 */
export const sliderLabelVariants = cva([
  'font-mono text-label uppercase tracking-wider text-foreground-muted',
])

/** 当前值。 */
export const sliderValueVariants = cva([
  'font-mono text-label uppercase tracking-wider text-foreground',
])

/** 轨道容器（Base UI Slider.Control）。高度走 36 / 44 / 52 的触达基线。 */
export const sliderControlVariants = cva(['relative flex w-full touch-none items-center'], {
  variants: {
    size: {
      sm: 'h-9',
      md: 'h-11',
      lg: 'h-13',
    },
  },
  defaultVariants: { size: 'md' },
})

/** 轨道（Base UI Slider.Track）。 */
export const sliderTrackVariants = cva(
  [
    'relative w-full cursor-pointer rounded-pill bg-border-visible',
    'group-data-[variant=soft]/slider:bg-border',
    'group-data-disabled/slider:cursor-not-allowed',
  ],
  {
    variants: {
      size: {
        sm: 'h-0.5',
        md: 'h-1',
        lg: 'h-1.5',
      },
    },
    defaultVariants: { size: 'md' },
  },
)

/** 已完成进度（Base UI Slider.Indicator）。 */
export const sliderFillVariants = cva([
  'absolute inset-y-0 start-0 rounded-pill bg-accent',
  'transition-[width] duration-300 ease-spring-moderate motion-reduce:transition-none',
  'group-data-[variant=soft]/slider:bg-foreground-muted',
  'group-data-disabled/slider:bg-foreground-disabled',
])

/** 拖拽把手（Base UI Slider.Thumb）。 */
export const sliderThumbVariants = cva(
  [
    'absolute top-1/2 -translate-x-1/2 -translate-y-1/2',
    'cursor-grab rounded-full border-2 border-accent bg-foreground-display',
    'transition-[background-color,border-color,scale] duration-200 ease-aios motion-reduce:transition-none',
    'active:cursor-grabbing',
    'focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2',
    'group-data-[variant=soft]/slider:border-foreground-muted group-data-[variant=soft]/slider:bg-surface',
    'group-data-disabled/slider:cursor-not-allowed group-data-disabled/slider:border-foreground-disabled group-data-disabled/slider:bg-foreground-disabled',
  ],
  {
    variants: {
      size: {
        sm: 'size-3',
        md: 'size-4',
        lg: 'size-5',
      },
    },
    defaultVariants: { size: 'md' },
  },
)

/** v1 的变体名 → 当前变体名。 */
const LEGACY_VARIANTS = {
  default: 'primary',
  minimal: 'soft',
} as const

export type SliderVariant = 'primary' | 'soft' | keyof typeof LEGACY_VARIANTS

export type SliderSize = 'sm' | 'md' | 'lg'

export function resolveSliderVariant(variant: SliderVariant | null | undefined) {
  if (!variant) return undefined
  return (LEGACY_VARIANTS as Record<string, string>)[variant] ?? variant
}
