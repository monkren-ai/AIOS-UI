import { cva } from 'class-variance-authority'

export const iconButtonVariants = cva('shrink-0', {
  variants: {
    shape: {
      circle: 'rounded-full',
      technical: 'rounded-card-technical',
    },
  },
  defaultVariants: { shape: 'circle' },
})

export type IconButtonShape = 'circle' | 'technical'
export type IconButtonSize = 'sm' | 'md' | 'lg'
