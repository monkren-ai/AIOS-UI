import { cva } from 'class-variance-authority'

/**
 * 日期分格输入。
 *
 * 三段（年/月/日）各自带边框，中间用「-」分隔；顺序由 locale 决定，
 * 不写任何 left/right，flex 自动排布。
 */
export const dateFieldVariants = cva(['flex flex-col gap-1'], {
  variants: {
    size: {
      sm: '',
      md: '',
      lg: '',
    },
    disabled: {
      true: 'pointer-events-none opacity-40',
      false: '',
    },
    error: {
      true: '',
      false: '',
    },
  },
  defaultVariants: { size: 'md', disabled: false, error: false },
})

/** 单个日期段：边框 + 居中数字，高度走 size，宽度走 kind。 */
export const dateFieldSegmentVariants = cva(
  [
    'relative flex items-center justify-center',
    'rounded-md border border-border-visible bg-transparent',
    'transition-colors duration-200 ease-nothing motion-reduce:transition-none',
  ],
  {
    variants: {
      size: {
        sm: 'h-9',
        md: 'h-11',
        lg: 'h-13',
      },
      kind: {
        year: 'w-14',
        month: 'w-10',
        day: 'w-10',
      },
      active: {
        true: 'border-interactive',
        false: '',
      },
      filled: {
        true: 'text-foreground-display',
        false: '',
      },
      error: {
        true: 'border-accent',
        false: '',
      },
    },
    compoundVariants: [
      // 出错时红边优先于聚焦时的 interactive 边
      { error: true, active: true, class: 'border-accent' },
    ],
    defaultVariants: { size: 'md', active: false, filled: false, error: false },
  },
)

/** 铺满段的透明 input。光标隐藏，靠段边框表达聚焦。 */
export const dateFieldInputVariants = cva(
  [
    'absolute inset-0 size-full border-0 bg-transparent p-0',
    'text-center font-mono text-foreground-display caret-transparent',
    'outline-none focus-visible:outline-none',
    'placeholder:text-foreground-disabled',
    'disabled:cursor-not-allowed',
  ],
  {
    variants: {
      size: {
        sm: 'text-base',
        md: 'text-subheading',
        lg: 'text-heading',
      },
    },
    defaultVariants: { size: 'md' },
  },
)

export type DateFieldSize = 'sm' | 'md' | 'lg'
