import { cva } from 'class-variance-authority'

export const iconVariants = cva('inline-block shrink-0 text-current', {
  variants: {
    size: {
      sm: 'size-4',
      md: 'size-5',
      lg: 'size-6',
      xl: 'size-8',
    },
  },
  defaultVariants: { size: 'md' },
})

export type IconSize = 'sm' | 'md' | 'lg' | 'xl'
