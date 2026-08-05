import { cva } from 'class-variance-authority'

/** 月份翻页条。整体禁用时统一降透明度并吃掉指针事件。 */
export const dateNavVariants = cva(['inline-flex items-center gap-1'], {
  variants: {
    disabled: {
      true: 'pointer-events-none opacity-40',
      false: '',
    },
  },
  defaultVariants: { disabled: false },
})

/**
 * 中间的月份文案。
 *
 * `grotesk` 换成正文字体（给「看起来不那么工业」的场合），其余保持等宽大写。
 */
export const dateNavLabelVariants = cva(
  [
    'min-w-30 whitespace-nowrap text-center text-sm uppercase tracking-wider tabular-nums text-foreground',
  ],
  {
    variants: {
      grotesk: {
        true: 'font-body',
        false: 'font-mono',
      },
    },
    defaultVariants: { grotesk: false },
  },
)

/** 左右箭头。44px 是 --touch-target-min。 */
export const dateNavArrowVariants = cva(
  [
    'flex size-11 min-h-11 min-w-11 cursor-pointer items-center justify-center p-0',
    'select-none border-none bg-transparent font-mono text-base text-foreground-muted',
    '[-webkit-tap-highlight-color:transparent]',
    'transition-colors duration-200 ease-nothing motion-reduce:transition-none',
    'hover:text-foreground-display active:opacity-70',
    'outline-none focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2',
  ],
  {
    variants: {
      disabled: {
        true: 'pointer-events-none text-foreground-disabled',
        false: '',
      },
    },
    defaultVariants: { disabled: false },
  },
)
