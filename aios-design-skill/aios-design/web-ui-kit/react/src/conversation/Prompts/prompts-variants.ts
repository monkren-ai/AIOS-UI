import { cva } from 'class-variance-authority'

export const promptsVariants = cva('aios-prompts', {
  variants: {
    variant: {
      default: '',
      bordered: 'aios-prompts--bordered',
      filled: 'aios-prompts--filled',
    },
    layout: {
      grid: 'aios-prompts--grid',
      list: 'aios-prompts--list',
      wrap: 'aios-prompts--wrap',
    },
    size: {
      sm: 'aios-prompts--sm',
      md: 'aios-prompts--md',
      lg: 'aios-prompts--lg',
    },
  },
  defaultVariants: {
    variant: 'default',
    layout: 'grid',
    size: 'md',
  },
})

export const promptsItemVariants = cva('aios-prompts__item', {
  variants: {
    disabled: {
      true: 'aios-prompts__item--disabled',
      false: '',
    },
  },
  defaultVariants: {
    disabled: false,
  },
})

export type PromptsVariants = typeof promptsVariants
