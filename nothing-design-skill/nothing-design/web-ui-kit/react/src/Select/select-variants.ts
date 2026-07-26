import { cva } from 'class-variance-authority'

export const selectVariants = cva('nothing-select', {
  variants: {
    disabled: { true: 'nothing-select--disabled', false: '' },
    hasError: { true: 'nothing-select--error', false: '' },
    open: { true: 'nothing-select--open', false: '' },
  },
  defaultVariants: { disabled: false, hasError: false, open: false },
})

export const selectTriggerVariants = cva('nothing-select__trigger', {
  variants: {
    open: { true: 'nothing-select__trigger--open', false: '' },
  },
  defaultVariants: { open: false },
})

export const selectItemVariants = cva('nothing-select__item', {
  variants: {
    selected: { true: 'nothing-select__item--selected', false: '' },
    disabled: { true: 'nothing-select__item--disabled', false: '' },
    highlighted: { true: 'nothing-select__item--highlighted', false: '' },
  },
  defaultVariants: { selected: false, disabled: false, highlighted: false },
})
