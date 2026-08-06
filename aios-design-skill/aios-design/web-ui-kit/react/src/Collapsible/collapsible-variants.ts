import { cva } from 'class-variance-authority'

/** Collapsible 外框。 */
export const collapsibleVariants = cva('overflow-hidden rounded-md border border-border-visible', {
  variants: {
    open: {
      true: '',
      false: '',
    },
  },
  defaultVariants: { open: false },
})

/** 展开按钮。展开态由自身的 `data-state` 驱动 `open:` 变体。 */
export const collapsibleTriggerVariants = cva([
  'flex w-full min-h-11 cursor-pointer select-none items-center justify-between gap-2',
  'border-none bg-transparent px-6 py-4',
  'font-mono text-sm uppercase tracking-wide text-foreground',
  'hover:bg-surface-raised open:text-foreground-display',
  'transition-[background-color,color] duration-200 ease-aios motion-reduce:transition-none',
  'outline-none focus-visible:z-[1] focus-visible:outline-2 focus-visible:outline-interactive focus-visible:-outline-offset-2',
])

/**
 * 折叠区域。
 *
 * 沿用旧实现的 max-height 过渡：展开上限 500px，外框又是 overflow-hidden，
 * 所以超过 500px 的内容会被直接裁掉且没有滚动条——需要更长内容请改用 Accordion。
 * visibility 一并参与过渡，收起时它才会等动画走完再生效。
 */
export const collapsibleContentVariants = cva([
  'max-h-0 overflow-hidden',
  'transition-[max-height,visibility] duration-[350ms] ease-aios motion-reduce:transition-none',
  'open:max-h-125',
])

/** 折叠区域的内容排版。 */
export const collapsibleContentInnerVariants = cva(
  'px-6 pb-4 font-body text-base leading-normal text-foreground-muted',
)
