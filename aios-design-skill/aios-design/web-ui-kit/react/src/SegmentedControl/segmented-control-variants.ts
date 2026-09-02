import { cva } from 'class-variance-authority'

/**
 * SegmentedControl 外框。
 *
 * 选中态由一块绝对定位的 slider 表达，所以外框必须是定位上下文 + 裁切容器。
 */
export const segmentedVariants = cva(
  [
    'relative inline-flex overflow-hidden border border-border-visible',
    'transition-[border-color] duration-200 ease-aios motion-reduce:transition-none',
  ],
  {
    variants: {
      variant: {
        pill: 'rounded-pill',
        rounded: 'rounded-md',
      },
      size: {
        sm: '',
        md: '',
      },
      disabled: {
        true: 'pointer-events-none opacity-40',
        false: '',
      },
      proximity: {
        true: '',
        false: '',
      },
    },
    defaultVariants: { variant: 'pill', size: 'md', disabled: false, proximity: false },
  },
)

/**
 * 单个分段按钮。
 *
 * 选中时文字压在 `bg-foreground-display` 的 slider 上，所以用 `text-background` 反相。
 */
export const segmentVariants = cva(
  [
    'relative z-[1] inline-flex h-10 min-h-9 items-center justify-center whitespace-nowrap',
    'cursor-pointer select-none border-none bg-transparent px-5',
    'font-mono text-label uppercase tracking-wider text-foreground-muted',
    'transition-colors duration-200 ease-aios motion-reduce:transition-none',
    'outline-none focus-visible:z-[2] focus-visible:outline-2 focus-visible:outline-interactive focus-visible:-outline-offset-2',
    'pointer-coarse:h-11 pointer-coarse:px-6',
  ],
  {
    variants: {
      // 声明顺序即优先级：active 必须写在 hovered 之后才能压过它
      hovered: {
        true: 'text-foreground',
        false: '',
      },
      active: {
        true: 'text-background',
        false: '',
      },
      size: {
        sm: 'h-9 min-h-9 px-3 text-caption pointer-coarse:h-11 pointer-coarse:px-4',
        md: 'h-10 min-h-9 px-5 text-label pointer-coarse:h-11 pointer-coarse:px-6',
      },
    },
    defaultVariants: { active: false, hovered: false, size: 'md' },
  },
)

/** 选中态 slider 与 proximity hover 垫层的共同底子。 */
const sliderBase = [
  'pointer-events-none absolute top-0 start-0 h-full',
  'transition-[inset-inline-start,width,opacity] duration-[var(--duration-spring-moderate)] ease-spring-moderate',
  'motion-reduce:transition-none',
]

/** 选中态 slider。 */
export const segmentedSliderVariants = cva([...sliderBase, 'z-0 bg-foreground-display'], {
  variants: {
    variant: {
      pill: 'rounded-pill',
      rounded: 'rounded-sm',
    },
  },
  defaultVariants: { variant: 'pill' },
})

/** proximity hover 垫层，压在选中 slider 更下面一层。 */
export const segmentedHoverSliderVariants = cva(
  [...sliderBase, 'z-[-1] bg-surface-raised opacity-0'],
  {
    variants: {
      variant: {
        pill: 'rounded-pill',
        rounded: 'rounded-sm',
      },
    },
    defaultVariants: { variant: 'pill' },
  },
)

export type SegmentedControlVariant = 'pill' | 'rounded'
