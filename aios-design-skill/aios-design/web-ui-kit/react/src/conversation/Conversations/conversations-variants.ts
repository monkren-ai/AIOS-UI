import { cva } from 'class-variance-authority'

export const conversationsVariants = cva('aios-conversations', {
  variants: {
    variant: {
      default: '',
      bordered: 'aios-conversations--bordered',
      filled: 'aios-conversations--filled',
    },
    size: {
      sm: 'aios-conversations--sm',
      md: 'aios-conversations--md',
      lg: 'aios-conversations--lg',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})

export const conversationsItemVariants = cva('aios-conversations__item', {
  variants: {
    active: {
      true: 'aios-conversations__item--active',
      false: '',
    },
    disabled: {
      true: 'aios-conversations__item--disabled',
      false: '',
    },
  },
  defaultVariants: {
    active: false,
    disabled: false,
  },
})

export type ConversationsVariants = typeof conversationsVariants
