import { cva } from 'class-variance-authority'

/**
 * DateWidget 的三种版型。
 *
 * `theme` 是 widget 自己的配色（跟全局 `[data-theme]` 无关），所以颜色直接
 * 引用 `--widget-*` 令牌，而不是语义色工具类。
 */

/* ────────────────────────────────────────────────────────────
   serif —— 方形卡片，右上角小星期 + 居中巨号数字
   ──────────────────────────────────────────────────────────── */

export const dateSerifVariants = cva(
  [
    'relative box-border flex flex-col items-center justify-center overflow-hidden',
    'size-[var(--widget-size-md)] rounded-xl font-body',
    'transition-colors duration-[350ms] ease-nothing motion-reduce:transition-none',
  ],
  {
    variants: {
      theme: {
        light: 'bg-widget-bg',
        dark: 'bg-widget-dark',
      },
    },
    defaultVariants: { theme: 'light' },
  },
)

/** 右上角的星期缩写。 */
export const dateSerifDayVariants = cva([
  'absolute top-2 end-2',
  'font-body text-[8px] font-bold uppercase leading-none tracking-wider text-accent',
])

/** 居中的大号日期。 */
export const dateSerifNumberVariants = cva([
  'font-body text-display-lg font-light leading-none tabular-nums text-[var(--widget-white)]',
])

/**
 * 右下角的「翻页」三角。悬停时变大，是纯几何形，没有阴影。
 *
 * 三角形靠 border-width 拼出来，四条边不能用 `border-*` 简写（tailwind-merge
 * 会把宽度和颜色当成同一组），所以直接写 CSS 属性；同时用 inline-start/block-end
 * 而不是 left/bottom，RTL 下会自动翻到左下角。
 */
export const dateSerifPeelVariants = cva([
  'absolute bottom-0 end-0 size-0 cursor-pointer',
  '[border-style:solid]',
  '[border-block-start-width:0] [border-inline-end-width:0]',
  '[border-block-end-width:30px] [border-inline-start-width:30px]',
  '[border-color:transparent] [border-block-end-color:var(--widget-dark-3)]',
  'transition-[border-width] duration-[250ms] ease-out motion-reduce:transition-none',
  'hover:[border-block-end-width:45px] hover:[border-inline-start-width:45px]',
  'outline-none focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2',
])

/* ────────────────────────────────────────────────────────────
   rect —— 药丸横条，左侧 24 小时进度环 + 右侧日期块
   ──────────────────────────────────────────────────────────── */

export const dateRectVariants = cva(
  [
    'box-border flex items-center gap-2 px-2 py-1',
    'h-[var(--widget-pill-height)] w-[var(--widget-size-lg)] rounded-pill font-body',
    'transition-colors duration-[350ms] ease-nothing motion-reduce:transition-none',
  ],
  {
    variants: {
      theme: {
        light: 'bg-widget-card',
        dark: 'bg-widget-dark',
      },
    },
    defaultVariants: { theme: 'light' },
  },
)

/** 进度环底圈。 */
export const dateRectRingBgVariants = cva(['fill-none [stroke-width:3]'], {
  variants: {
    theme: {
      light: 'stroke-[var(--widget-dark-3)]',
      dark: 'stroke-[var(--widget-dark-2)]',
    },
  },
  defaultVariants: { theme: 'light' },
})

/** 进度环走过的那一段。 */
export const dateRectRingProgressVariants = cva([
  'fill-none stroke-accent [stroke-linecap:round] [stroke-width:3]',
  'transition-[stroke-dashoffset] duration-[350ms] ease-nothing motion-reduce:transition-none',
])

/** 日期数字。 */
export const dateRectDayVariants = cva(['font-display text-heading leading-none tabular-nums'], {
  variants: {
    theme: {
      light: 'text-[var(--widget-dark-2)]',
      dark: 'text-[var(--widget-white)]',
    },
  },
  defaultVariants: { theme: 'light' },
})

/** 月份缩写。 */
export const dateRectMonthVariants = cva(
  ['font-ndot text-micro uppercase leading-[1.4] tracking-wider'],
  {
    variants: {
      theme: {
        light: 'text-[var(--widget-dark-2)]',
        dark: 'text-[var(--widget-white)]',
      },
    },
    defaultVariants: { theme: 'light' },
  },
)

/** 星期缩写，永远是红的。 */
export const dateRectWeekdayVariants = cva([
  'font-ndot text-[8px] font-extrabold uppercase leading-[1.4] tracking-wider text-accent',
])

/* ────────────────────────────────────────────────────────────
   dual-ring —— 方形双环
   ──────────────────────────────────────────────────────────── */

export const dateDualRingVariants = cva(
  [
    'relative box-border flex items-center justify-center',
    'size-[var(--widget-size-md)] font-body',
    'transition-colors duration-[350ms] ease-nothing motion-reduce:transition-none',
  ],
  {
    variants: {
      theme: {
        light: '',
        dark: '',
      },
    },
    defaultVariants: { theme: 'light' },
  },
)

/** 外环描边。 */
export const dateDualRingOuterVariants = cva(['fill-none [stroke-width:2]'], {
  variants: {
    theme: {
      light: 'stroke-[var(--widget-white)]',
      dark: 'stroke-[var(--widget-dark-2)]',
    },
  },
  defaultVariants: { theme: 'light' },
})

/** 内环填充。 */
export const dateDualRingInnerVariants = cva(['stroke-none'], {
  variants: {
    theme: {
      light: 'fill-[var(--widget-card-bg)]',
      dark: 'fill-[var(--widget-dark-bg)]',
    },
  },
  defaultVariants: { theme: 'light' },
})

/** 环心的日期数字。 */
export const dateDualRingDayVariants = cva(
  ['font-ndot text-display-sm leading-none tabular-nums'],
  {
    variants: {
      theme: {
        light: 'text-[var(--widget-dark-2)]',
        dark: 'text-[var(--widget-white)]',
      },
    },
    defaultVariants: { theme: 'light' },
  },
)

/** 环心的星期缩写。 */
export const dateDualRingWeekdayVariants = cva([
  'font-mono text-micro font-extrabold uppercase leading-[1.4] tracking-wider text-accent',
])

export type DateWidgetTheme = 'light' | 'dark'
