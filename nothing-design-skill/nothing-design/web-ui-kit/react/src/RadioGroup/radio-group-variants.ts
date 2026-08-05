import { cva } from 'class-variance-authority'

/**
 * RadioGroup 的视觉变体。
 *
 * 选中态用单点红（`border-accent` + `bg-accent` 的圆点），
 * 行高走 36 / 44 / 52 的触达基线。
 */
export const radioGroupVariants = cva(['flex'], {
  variants: {
    orientation: {
      horizontal: 'flex-row flex-wrap gap-4',
      vertical: 'flex-col gap-2',
    },
    size: {
      sm: '',
      md: '',
      lg: '',
    },
    disabled: {
      true: 'cursor-not-allowed',
      false: '',
    },
  },
  defaultVariants: { orientation: 'vertical', size: 'md', disabled: false },
})

/** 单个选项行。 */
export const radioGroupItemVariants = cva(
  [
    'group/radio relative inline-flex select-none items-center gap-2',
    'cursor-pointer [-webkit-tap-highlight-color:transparent]',
  ],
  {
    variants: {
      size: {
        sm: 'min-h-9',
        md: 'min-h-11',
        lg: 'min-h-13',
      },
      checked: {
        true: '',
        false: '',
      },
      disabled: {
        true: 'cursor-not-allowed opacity-40',
        false: '',
      },
    },
    defaultVariants: { size: 'md', checked: false, disabled: false },
  },
)

/** 圆环（Base UI Radio.Root）。 */
export const radioGroupCircleVariants = cva(
  [
    'group/radio-circle relative flex shrink-0 items-center justify-center',
    'rounded-full border-2 border-border-visible bg-transparent p-0',
    'transition-colors duration-200 ease-nothing motion-reduce:transition-none',
    'focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2',
    'checked:border-accent',
    'data-disabled:border-border',
  ],
  {
    variants: {
      size: {
        sm: 'size-4',
        md: 'size-5',
        lg: 'size-6',
      },
    },
    defaultVariants: { size: 'md' },
  },
)

/** 圆心（Base UI Radio.Indicator，keepMounted）。 */
export const radioGroupDotVariants = cva(
  [
    'rounded-full bg-accent',
    'scale-0 transition-transform duration-200 ease-nothing motion-reduce:transition-none',
    'group-data-[checked]/radio-circle:scale-100',
    'group-data-[disabled]/radio-circle:bg-foreground-disabled',
  ],
  {
    variants: {
      size: {
        sm: 'size-1.5',
        md: 'size-2.5',
        lg: 'size-3',
      },
    },
    defaultVariants: { size: 'md' },
  },
)

/** 选项文字。 */
export const radioGroupLabelVariants = cva(
  [
    'font-mono text-foreground',
    'transition-colors duration-200 ease-nothing motion-reduce:transition-none',
    'group-data-[disabled]/radio:text-foreground-disabled',
  ],
  {
    variants: {
      size: {
        sm: 'text-caption',
        md: 'text-sm',
        lg: 'text-base',
      },
    },
    defaultVariants: { size: 'md' },
  },
)

export type RadioGroupSize = 'sm' | 'md' | 'lg'
