import { cva } from 'class-variance-authority'

/* ────────────────────────────────────────────────────────────
   Segmented（分段条）
   ──────────────────────────────────────────────────────────── */

/**
 * Battery 分段版的容器。
 *
 * v1 里 `variant` / `theme` 两个维度在 CSS 中没有任何对应规则，
 * `level` 也只作用于分段的填充色（见 `batterySegmentVariants`），
 * 所以这里它们只保留 API 形状、不产出类名。
 *
 * `widgetMode='ring'` 沿用 v1 的用法：与 `batteryRingVariants` 拼接，
 * 靠 tailwind-merge 的「后写覆盖」得到 v1 里那层级联的最终效果。
 */
export const batteryVariants = cva(
  [
    'flex w-full flex-col items-start justify-center',
    'rounded-lg border border-border bg-surface p-8',
    'transition-colors duration-[350ms] ease-nothing motion-reduce:transition-none',
  ],
  {
    variants: {
      variant: {
        segmented: '',
        ring: '',
      },
      theme: {
        light: '',
        dark: '',
      },
      level: {
        critical: '',
        low: '',
        medium: '',
        high: '',
      },
      widgetMode: {
        none: '',
        card: 'gap-1 rounded-xl border-none bg-widget-dark p-4',
        ring: 'h-auto w-full flex-col items-center gap-2 overflow-visible rounded-xl',
      },
    },
    defaultVariants: { variant: 'segmented', theme: 'dark', level: 'high', widgetMode: 'none' },
  },
)

/** 「85%」大数字。 */
export const batteryPercentVariants = cva([
  'font-display text-display-lg font-semibold leading-none tracking-[-0.02em] tabular-nums text-foreground-display',
  'transition-colors duration-[350ms] ease-nothing motion-reduce:transition-none',
])

/** Charging / Discharging 文案。 */
export const batteryStatusVariants = cva(
  [
    'font-mono text-sm uppercase tracking-widest',
    'transition-colors duration-[350ms] ease-nothing motion-reduce:transition-none',
  ],
  {
    variants: {
      charging: {
        true: 'text-success',
        false: 'text-foreground-muted',
      },
    },
    defaultVariants: { charging: false },
  },
)

/** 分段条容器。widget card 里更矮一些。 */
export const batteryProgressVariants = cva(['flex w-full gap-0.5'], {
  variants: {
    widgetCard: {
      true: 'mt-1 h-2',
      false: 'h-4',
    },
  },
  defaultVariants: { widgetCard: false },
})

/** 单个分段。填充色跟着电量档位走。 */
export const batterySegmentVariants = cva(
  ['flex-1 transition-colors duration-[350ms] ease-nothing motion-reduce:transition-none'],
  {
    variants: {
      filled: {
        true: '',
        false: 'bg-border',
      },
      level: {
        critical: '',
        low: '',
        medium: '',
        high: '',
      },
      widgetCard: {
        true: 'rounded-[1px]',
        false: '',
      },
    },
    compoundVariants: [
      { filled: true, level: 'high', class: 'bg-success' },
      { filled: true, level: 'medium', class: 'bg-foreground-display' },
      { filled: true, level: 'low', class: 'bg-warning' },
      { filled: true, level: 'critical', class: 'bg-error' },
    ],
    defaultVariants: { filled: false, level: 'high', widgetCard: false },
  },
)

/* ────────────────────────────────────────────────────────────
   Widget card（分段版塞进 widget 卡片）
   ──────────────────────────────────────────────────────────── */

/** widget 卡片里的大数字。 */
export const batteryWidgetPercentVariants = cva([
  'font-ndot text-display-lg font-light leading-none tracking-[-0.02em] tabular-nums text-[var(--widget-white)]',
  'transition-colors duration-[350ms] ease-nothing motion-reduce:transition-none',
])

/** widget 卡片里的充电状态。 */
export const batteryWidgetStatusVariants = cva(
  [
    'font-mono text-micro uppercase tracking-widest',
    'transition-colors duration-[350ms] ease-nothing motion-reduce:transition-none',
  ],
  {
    variants: {
      charging: {
        true: 'text-success',
        false: 'text-[var(--widget-dark-3)]',
      },
    },
    defaultVariants: { charging: false },
  },
)

/* ────────────────────────────────────────────────────────────
   Ring（圆环）
   ──────────────────────────────────────────────────────────── */

/** 圆环版容器。颜色都落在子元素上，theme/status 在这里只是 API 形状。 */
export const batteryRingVariants = cva(
  [
    'relative flex size-[var(--widget-size-md)] items-center justify-center overflow-hidden rounded-full',
    'transition-colors duration-[350ms] ease-nothing motion-reduce:transition-none',
  ],
  {
    variants: {
      theme: {
        light: '',
        dark: '',
      },
      status: {
        charging: '',
        low: '',
        mid: '',
        full: '',
      },
    },
    defaultVariants: { theme: 'dark', status: 'full' },
  },
)

/** 圆环 SVG。widget card 下从绝对定位改成正常流。 */
export const batteryRingSvgVariants = cva([''], {
  variants: {
    widgetCard: {
      true: 'relative size-[var(--widget-size-md)] self-center',
      false: 'absolute inset-0 size-full',
    },
  },
  defaultVariants: { widgetCard: false },
})

/** 外圈。 */
export const batteryRingOuterVariants = cva(
  ['transition-[fill] duration-[350ms] ease-nothing motion-reduce:transition-none'],
  {
    variants: {
      theme: {
        light: 'fill-[var(--widget-white)]',
        dark: 'fill-[var(--widget-dark-2)]',
      },
    },
    defaultVariants: { theme: 'dark' },
  },
)

/** 内圈。 */
export const batteryRingInnerVariants = cva(
  ['transition-[fill] duration-[350ms] ease-nothing motion-reduce:transition-none'],
  {
    variants: {
      theme: {
        light: 'fill-[var(--widget-card-bg)]',
        dark: 'fill-[var(--widget-dark-bg)]',
      },
    },
    defaultVariants: { theme: 'dark' },
  },
)

/** 电量弧。低电黄、满电/充电绿，其余是 Nothing 红。 */
export const batteryRingProgressVariants = cva(
  [
    'origin-center -rotate-90 fill-none [stroke-linecap:round] [stroke-width:5]',
    'transition-[stroke-dashoffset,stroke] duration-[350ms] ease-nothing motion-reduce:transition-none',
  ],
  {
    variants: {
      status: {
        charging: 'stroke-success',
        low: 'stroke-warning',
        mid: 'stroke-accent',
        full: 'stroke-success',
      },
    },
    defaultVariants: { status: 'full' },
  },
)

/**
 * 环心内容。widget card 下压到 SVG 正中。
 *
 * 用 `inset-0` + flex 居中而不是 `left:50% + translate(-50%)`，RTL 下不会跑偏。
 */
export const batteryRingContentVariants = cva(
  ['z-[1] flex flex-col items-center justify-center gap-1'],
  {
    variants: {
      widgetCard: {
        true: 'absolute inset-0',
        false: 'relative',
      },
    },
    defaultVariants: { widgetCard: false },
  },
)

/** 环心图标。 */
export const batteryRingIconVariants = cva(
  ['flex size-6 items-center justify-center [&_svg]:size-full [&_svg]:fill-current'],
  {
    variants: {
      theme: {
        light: 'text-[var(--widget-dark-2)]',
        dark: 'text-[var(--widget-white)]',
      },
    },
    defaultVariants: { theme: 'dark' },
  },
)

/** 环心百分比。 */
export const batteryRingPercentVariants = cva(
  [
    'font-ndot text-display-sm font-light leading-none tracking-[-0.02em] tabular-nums',
    'transition-colors duration-[350ms] ease-nothing motion-reduce:transition-none',
  ],
  {
    variants: {
      theme: {
        light: 'text-[var(--widget-dark-2)]',
        dark: 'text-[var(--widget-white)]',
      },
    },
    defaultVariants: { theme: 'dark' },
  },
)

/* ────────────────────────────────────────────────────────────
   蓝牙设备列表
   ──────────────────────────────────────────────────────────── */

/** 设备列表容器。 */
export const batteryDevicesVariants = cva(['flex w-full flex-col gap-0.5'], {
  variants: {
    widgetCard: {
      true: 'mt-1',
      false: 'mt-2',
    },
  },
  defaultVariants: { widgetCard: false },
})

/** 单个设备行。 */
export const batteryDeviceVariants = cva(
  [
    'flex items-center gap-1 rounded-sm px-1 py-0.5',
    'transition-colors duration-[350ms] ease-nothing motion-reduce:transition-none',
  ],
  {
    variants: {
      clickable: {
        true: [
          'cursor-pointer select-none [-webkit-tap-highlight-color:transparent]',
          'hover:bg-[var(--widget-dark-2)] active:opacity-85',
          'outline-none focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2',
        ].join(' '),
        false: '',
      },
    },
    defaultVariants: { clickable: false },
  },
)

/** 设备类型图标。 */
export const batteryDeviceIconVariants = cva([
  'flex size-4 shrink-0 items-center justify-center text-[var(--widget-dark-4)]',
  '[&_svg]:size-full [&_svg]:fill-none [&_svg]:stroke-current',
])

/** 设备名。 */
export const batteryDeviceNameVariants = cva([
  'min-w-0 flex-1 truncate font-body text-micro text-[var(--widget-white)]',
])

/** 设备电量百分比。 */
export const batteryDevicePercentVariants = cva([
  'font-mono text-micro tabular-nums text-[var(--widget-dark-4)]',
])
