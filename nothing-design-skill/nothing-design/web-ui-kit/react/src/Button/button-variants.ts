import { cva } from 'class-variance-authority'

export const buttonVariants = cva('nothing-btn', {
  variants: {
    variant: {
      primary: 'nothing-btn--primary',
      secondary: 'nothing-btn--secondary',
      ghost: 'nothing-btn--ghost',
      destructive: 'nothing-btn--destructive',
    },
    size: {
      default: '',
      sm: 'nothing-btn--sm',
      lg: 'nothing-btn--lg',
    },
    fullWidth: {
      true: 'nothing-btn--full',
      false: '',
    },
    loading: {
      true: 'nothing-btn--loading',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'default',
    fullWidth: false,
    loading: false,
  },
})
