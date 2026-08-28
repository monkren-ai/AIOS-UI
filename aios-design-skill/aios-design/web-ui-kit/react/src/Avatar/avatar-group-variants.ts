import { cva } from 'class-variance-authority'

export const avatarGroupVariants = cva([
  'flex items-center',
  '[&>[data-slot=avatar]+[data-slot=avatar]]:-ms-2',
  '[&_[data-slot=avatar]]:transition-transform',
  '[&_[data-slot=avatar]]:duration-[var(--duration-spring-moderate)]',
  '[&_[data-slot=avatar]]:ease-spring-moderate',
  '[&_[data-slot=avatar]]:motion-reduce:transition-none',
  '[&_[data-slot=avatar]]:motion-reduce:translate-none',
  '[&>[data-slot=avatar]:hover]:-translate-y-[var(--distance-micro)]',
  '[&>[data-slot=avatar]:hover+[data-slot=avatar]]:-translate-y-0.5',
  '[&>[data-slot=avatar]:has(+[data-slot=avatar]:hover)]:-translate-y-0.5',
  '[&>[data-slot=avatar-group-overflow]]:transition-transform',
  '[&>[data-slot=avatar-group-overflow]]:duration-[var(--duration-spring-moderate)]',
  '[&>[data-slot=avatar-group-overflow]]:ease-spring-moderate',
  '[&>[data-slot=avatar-group-overflow]]:motion-reduce:transition-none',
])

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
