import { cva } from 'class-variance-authority'

/**
 * Accordion 根容器。
 *
 * - `default` 一个带边框的整体，条目之间用下边框分隔
 * - `flush` 去掉外框直接贴在页面上，改用上边框分隔
 */
export const accordionVariants = cva('', {
  variants: {
    type: {
      single: '',
      multiple: '',
    },
    variant: {
      default: 'overflow-hidden rounded-md border border-border-visible',
      flush: 'overflow-visible rounded-none border-none',
    },
  },
  defaultVariants: { type: 'single', variant: 'default' },
})

/** 单个可折叠条目。分隔线的方向随根容器变体切换。 */
export const accordionItemVariants = cva('', {
  variants: {
    variant: {
      default: 'border-b border-border last:border-b-0',
      flush: 'border-t border-border first:border-t-0',
    },
  },
  defaultVariants: { variant: 'default' },
})

/** 包裹 trigger 的标题元素。 */
export const accordionHeaderVariants = cva('m-0')

/** 展开按钮。`group` 让末端的三角能跟着展开态旋转。 */
export const accordionTriggerVariants = cva([
  'group flex w-full min-h-11 cursor-pointer select-none items-center justify-between gap-2',
  'border-none bg-transparent py-4 ps-6 pe-4',
  'font-mono text-sm uppercase tracking-wide text-foreground',
  // Base UI 的 Trigger 用 data-panel-open 表达展开态（而不是 data-open）
  'hover:bg-surface-raised data-panel-open:text-foreground-display',
  'transition-[background-color,color] duration-200 ease-nothing motion-reduce:transition-none',
  'outline-none focus-visible:z-[1] focus-visible:outline-2 focus-visible:outline-interactive focus-visible:-outline-offset-2',
  'nothing-disabled:pointer-events-none nothing-disabled:cursor-not-allowed nothing-disabled:opacity-40',
])

/** 标题文字，占满剩余宽度并靠行首对齐。 */
export const accordionTriggerTextVariants = cva('flex-1 text-start')

/** 标题前置图标槽位。 */
export const accordionLeadingIconVariants = cva(
  'inline-flex shrink-0 items-center justify-center text-foreground-muted',
)

/** 末端的展开三角，展开时翻转 180°。 */
export const accordionTriggerIconVariants = cva([
  'size-0 shrink-0 border-x-5 border-x-transparent border-t-5 border-t-foreground-muted',
  'transition-transform duration-200 ease-nothing motion-reduce:transition-none',
  'group-data-panel-open:rotate-180',
])

/**
 * 折叠面板。
 *
 * 高度动画依赖 Base UI 写在元素上的 `--accordion-panel-height`，
 * 进出场瞬间（`data-starting-style` / `data-ending-style`）强制回到 0 才能跑出过渡。
 */
export const accordionPanelVariants = cva([
  'h-0 overflow-hidden',
  'transition-[height] duration-[160ms] ease-spring-moderate motion-reduce:transition-none',
  'open:h-[var(--accordion-panel-height,auto)]',
  'data-starting-style:h-0 data-ending-style:h-0',
])

/** 面板内容。 */
export const accordionContentVariants = cva(
  'px-6 pb-4 font-body text-base leading-normal text-foreground-muted',
)

export type AccordionType = 'single' | 'multiple'
export type AccordionVariant = 'default' | 'flush'
