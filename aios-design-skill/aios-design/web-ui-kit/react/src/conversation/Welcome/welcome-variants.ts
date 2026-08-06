import { cva } from 'class-variance-authority'

export const welcomeVariants = cva('aios-welcome', {
  variants: {
    variant: {
      default: '',
      centered: 'aios-welcome--centered',
      compact: 'aios-welcome--compact',
    },
    size: {
      sm: 'aios-welcome--sm',
      md: 'aios-welcome--md',
      lg: 'aios-welcome--lg',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})

export type WelcomeVariants = typeof welcomeVariants
