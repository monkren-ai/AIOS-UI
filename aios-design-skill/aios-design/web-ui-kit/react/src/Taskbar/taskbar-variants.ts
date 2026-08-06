import { cva } from 'class-variance-authority'

/**
 * Taskbar 的视觉变体。
 *
 * 高度在窄屏收到 52px、内边距收到 16px，对应 v1 的 `max-width: 768px` 媒体查询；
 * Tailwind 的断点是 min-width，所以写成「默认取窄屏值、`md:` 起放大」。
 */
export const taskbarVariants = cva(
  [
    'sticky bottom-0 z-[var(--z-sticky)] box-border flex h-13 w-full items-center justify-between px-4',
    'rounded-lg md:h-[57px] md:px-6',
    'transition-colors duration-[350ms] ease-aios motion-reduce:transition-none',
  ],
  {
    variants: {
      theme: {
        light: 'bg-widget-card',
        dark: 'bg-widget-dark',
      },
      fixed: {
        true: 'fixed inset-x-0 bottom-0',
        false: '',
      },
    },
    defaultVariants: { theme: 'dark', fixed: false },
  },
)

/** 开始按钮。 */
export const taskbarStartVariants = cva(
  [
    'flex size-9 shrink-0 cursor-pointer items-center justify-center p-0',
    'rounded-sm border-none [-webkit-tap-highlight-color:transparent]',
    '[&_svg]:size-[18px] [&_svg]:fill-current',
    'transition-[background-color,color,opacity] duration-200 ease-aios motion-reduce:transition-none',
    'hover:opacity-80 active:opacity-60',
    'outline-none focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2',
  ],
  {
    variants: {
      theme: {
        light: 'bg-[var(--widget-dark-2)] text-[var(--widget-white)]',
        dark: 'bg-[var(--widget-white)] text-[var(--widget-dark-bg)]',
      },
    },
    defaultVariants: { theme: 'dark' },
  },
)

/** 搜索框（其实是个按钮）。 */
export const taskbarSearchVariants = cva(
  [
    'flex h-9 min-w-30 cursor-pointer items-center gap-2 px-4 md:min-w-45',
    'rounded-pill border-none font-body text-xs [-webkit-tap-highlight-color:transparent]',
    'transition-[background-color,color,opacity] duration-200 ease-aios motion-reduce:transition-none',
    'hover:opacity-85',
    'outline-none focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2',
  ],
  {
    variants: {
      theme: {
        light: 'bg-widget-bg text-[var(--widget-dark-2)]',
        dark: 'bg-[var(--widget-dark-2)] text-[var(--widget-white)]',
      },
    },
    defaultVariants: { theme: 'dark' },
  },
)

/** 已固定 / 运行中的应用图标。 */
export const taskbarAppVariants = cva(
  [
    'relative flex size-9 shrink-0 cursor-pointer items-center justify-center p-0 md:size-10',
    'rounded-md border-none bg-transparent [-webkit-tap-highlight-color:transparent]',
    'transition-[background-color,color,opacity] duration-200 ease-aios motion-reduce:transition-none',
    'hover:opacity-70 active:opacity-50',
    'outline-none focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2',
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

/**
 * 应用图标本体。
 *
 * 位图图标靠 filter 拉成单色，跟着 taskbar 的明暗走 —— 这是 v1 就有的做法，
 * 不属于被禁的「阴影 / blur / 渐变」。
 */
export const taskbarAppIconVariants = cva(
  [
    'flex size-6 items-center justify-center',
    '[&_img]:size-full [&_img]:rounded-xs [&_img]:object-contain',
    '[&_svg]:size-full [&_svg]:fill-current',
  ],
  {
    variants: {
      theme: {
        light:
          '[&_img]:[filter:brightness(0)_saturate(100%)_invert(20%)_sepia(0%)_saturate(200%)_hue-rotate(0deg)_brightness(95%)_contrast(90%)]',
        dark: '[&_img]:[filter:brightness(0)_saturate(100%)_invert(100%)_sepia(0%)_saturate(0%)_hue-rotate(0deg)_brightness(100%)_contrast(100%)]',
      },
    },
    defaultVariants: { theme: 'dark' },
  },
)

/** 托盘里的只读图标（音量等）。 */
export const taskbarTrayIconVariants = cva(
  [
    'flex size-6 cursor-default items-center justify-center [-webkit-tap-highlight-color:transparent]',
    '[&_svg]:size-full [&_svg]:fill-none [&_svg]:stroke-current [&_svg]:[stroke-linecap:round]',
    '[&_svg]:[stroke-linejoin:round] [&_svg]:[stroke-width:1.5]',
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

/**
 * 托盘电量。没有真实遥测时整块压暗。
 *
 * 压暗不能挂在 `data-[real=false]` 上——`dataAttr(false)` 不输出属性，
 * 选择器永远选不中，所以走 `real` 这个布尔变体。
 */
export const taskbarBatteryVariants = cva(
  ['flex cursor-default items-center gap-1 [-webkit-tap-highlight-color:transparent]'],
  {
    variants: {
      theme: {
        light: 'text-[var(--widget-dark-2)]',
        dark: 'text-[var(--widget-white)]',
      },
      real: {
        true: '',
        false: 'opacity-40',
      },
    },
    defaultVariants: { theme: 'dark', real: true },
  },
)

/** 电池图标里的电量条。充电时转成 AIOS 红。 */
export const taskbarBatteryFillVariants = cva([], {
  variants: {
    charging: {
      true: 'fill-accent',
      false: 'fill-current',
    },
  },
  defaultVariants: { charging: false },
})

/** 电量百分比。 */
export const taskbarBatteryPercentVariants = cva([
  'font-mono text-micro tracking-[0.04em] tabular-nums',
])

/** 时钟。 */
export const taskbarTimeVariants = cva(
  [
    'whitespace-nowrap font-display text-xs font-semibold tracking-[-0.01em] tabular-nums',
    'transition-colors duration-[350ms] ease-aios motion-reduce:transition-none',
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
