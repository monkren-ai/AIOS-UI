import { cva } from 'class-variance-authority'

export const avatarGroupVariants = cva('flex items-center [&>[data-slot=avatar]+[data-slot=avatar]]:-ms-2')

export const avatarGroupOverflowVariants = cva(
  'relative z-10 -ms-2 inline-flex shrink-0 items-center justify-center rounded-full border-2 border-background bg-muted font-mono text-foreground-muted',
  {
    variants: {
      size: {
        sm: 'size-8 text-micro',
        md: 'size-10 text-caption',
        lg: 'size-14 text-sm',
      },
    },
    defaultVariants: { size: 'md' },
  },
)
