import { cva } from 'class-variance-authority'
import { overlayMenuMotion } from '@/lib/overlay-motion'

export const popoverTriggerVariants = cva('inline-block cursor-pointer')

export const popoverPositionerVariants = cva('z-[var(--z-popover)]')

/**
 * 浮层本体。
 *
 * v1 用 `@keyframes` 做进场；v2 换成由 Base UI 的 `data-open` / `data-closed`
 * 驱动的 transition——同样是 0.95 → 1 的缩放淡入，但退场也能跟着走。
 */
export const popoverContentVariants = cva(
  [
    'rounded-md border border-border-visible bg-popover p-4 text-popover-foreground',
    ...overlayMenuMotion,
  ],
  {
    variants: {
      visible: { true: 'scale-100 opacity-100', false: '' },
      // v1 的 side 修饰类没有任何样式，这里同样只作为 API/`data-side` 的载体保留。
      // 方向性的 transform-origin 只有物理关键字可用，写了会在 RTL 下反向，故不写。
      side: {
        top: '',
        bottom: '',
        left: '',
        right: '',
      },
    },
    defaultVariants: { visible: false, side: 'bottom' },
  },
)
