import { cva } from 'class-variance-authority'

export const senderVariants = cva('nothing-sender', {
  variants: {
    variant: {
      default: '',
      filled: 'nothing-sender--filled',
      bordered: 'nothing-sender--bordered',
    },
    size: {
      sm: 'nothing-sender--sm',
      md: 'nothing-sender--md',
      lg: 'nothing-sender--lg',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})

export type SenderVariants = typeof senderVariants
