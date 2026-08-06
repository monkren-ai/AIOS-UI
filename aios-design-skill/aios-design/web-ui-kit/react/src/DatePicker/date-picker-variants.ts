import { cva } from 'class-variance-authority'

/**
 * DatePicker 的外层容器变体。
 *
 * 主要承载 `data-*` 状态；触发器本身的视觉走 Input 的 `inputControlVariants`，
 * 浮层走 Popover 的 `popoverContentVariants`。
 */
export const datePickerVariants = cva(['flex flex-col gap-1'], {
  variants: {
    size: {
      sm: '',
      md: '',
      lg: '',
    },
    disabled: {
      true: '',
      false: '',
    },
    error: {
      true: '',
      false: '',
    },
  },
  defaultVariants: { size: 'md', disabled: false, error: false },
})

export type DatePickerSize = 'sm' | 'md' | 'lg'
