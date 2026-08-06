import { cva } from 'class-variance-authority'

export const senderVariants = cva('aios-sender', {
  variants: {
    variant: {
      default: '',
      filled: 'aios-sender--filled',
      bordered: 'aios-sender--bordered',
    },
    size: {
      sm: 'aios-sender--sm',
      md: 'aios-sender--md',
      lg: 'aios-sender--lg',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})

export type SenderVariants = typeof senderVariants
