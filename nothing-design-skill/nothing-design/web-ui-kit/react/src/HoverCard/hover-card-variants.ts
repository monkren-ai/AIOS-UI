import { cva } from 'class-variance-authority'

export const hoverCardTriggerVariants = cva('inline-block')

export const hoverCardPositionerVariants = cva('z-[var(--z-popover)]')

/**
 * 悬浮卡本体。与 Popover 同形，但 `pointer-events-auto`——
 * 鼠标可以从触发器滑进卡片里而不触发关闭。
 */
export const hoverCardContentVariants = cva(
  [
    'pointer-events-auto',
    'rounded-md border border-border-visible bg-popover p-4 text-popover-foreground',
    'transition-[opacity,transform] duration-[var(--duration-spring-moderate)] ease-spring-moderate',
    'motion-reduce:transition-none',
    'closed:scale-95 closed:opacity-0 open:scale-100 open:opacity-100',
  ],
  {
    variants: {
      visible: { true: 'scale-100 opacity-100', false: '' },
      side: {
        top: '',
        bottom: '',
      },
    },
    defaultVariants: { visible: false, side: 'bottom' },
  },
)
