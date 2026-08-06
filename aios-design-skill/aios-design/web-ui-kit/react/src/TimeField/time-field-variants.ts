import { cva } from 'class-variance-authority'

/**
 * 时间分格输入。
 *
 * 时/分/秒三段（秒可选），中间用「:」分隔。
 */
export const timeFieldVariants = cva(['flex flex-col gap-1'], {
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

/** 单个时间段。 */
export const timeFieldSegmentVariants = cva(
  [
    'relative flex items-center justify-center',
    'rounded-md border border-border-visible bg-transparent',
    'transition-colors duration-200 ease-aios motion-reduce:transition-none',
  ],
  {
    variants: {
      size: {
        sm: 'h-9',
        md: 'h-11',
        lg: 'h-13',
      },
      kind: {
        hour: 'w-10',
        minute: 'w-10',
        second: 'w-10',
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

/** 铺满段的透明 input。 */
export const timeFieldInputVariants = cva(
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

export type TimeFieldSize = 'sm' | 'md' | 'lg'
