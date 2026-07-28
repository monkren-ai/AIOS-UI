import { cva } from 'class-variance-authority'

export const welcomeVariants = cva('nothing-welcome', {
  variants: {
    variant: {
      default: '',
      centered: 'nothing-welcome--centered',
      compact: 'nothing-welcome--compact',
    },
    size: {
      sm: 'nothing-welcome--sm',
      md: 'nothing-welcome--md',
      lg: 'nothing-welcome--lg',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})

export type WelcomeVariants = typeof welcomeVariants
