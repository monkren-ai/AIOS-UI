import { cva } from 'class-variance-authority'

/** 分栏容器。`horizontal` 是行方向，因此在 RTL 下由 flex 自动镜像。 */
export const resizableVariants = cva(['flex h-full w-full'], {
  variants: {
    direction: {
      horizontal: 'flex-row',
      vertical: 'flex-col',
    },
  },
  defaultVariants: { direction: 'horizontal' },
})

/** 单个面板。尺寸由内联 `flex-basis` 百分比控制。 */
export const resizablePanelVariants = cva(['min-h-0 min-w-0 overflow-hidden'])

/**
 * 拖拽把手：4px 的实线，hover / 拖拽中变成 interactive 色。
 *
 * 没有任何物理方向属性——横向把手只有宽度、纵向把手只有高度，
 * 顺序完全交给 flex，`dir="rtl"` 时自动镜像。
 */
export const resizableHandleVariants = cva(
  [
    'relative z-1 shrink-0 bg-border-visible',
    'transition-colors duration-200 ease-aios motion-reduce:transition-none',
    'hover:bg-interactive',
    'focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2',
  ],
  {
    variants: {
      direction: {
        horizontal: 'w-1 cursor-col-resize',
        vertical: 'h-1 cursor-row-resize',
      },
      active: {
        true: 'bg-interactive',
        false: '',
      },
    },
    defaultVariants: { direction: 'horizontal', active: false },
  },
)

export type ResizableDirection = 'horizontal' | 'vertical'
