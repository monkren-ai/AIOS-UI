import { cva } from 'class-variance-authority'

export const notificationBadgeVariants = cva('relative inline-flex')

export const notificationBadgeMarkerVariants = cva(
  [
    'absolute -top-1 -end-1 z-1',
    'motion-safe:animate-notification-in motion-reduce:animate-none',
  ],
  {
    variants: {
      dot: {
        true: '',
        false: '',
      },
    },
    defaultVariants: { dot: false },
  },
)

export const notificationBadgeDotVariants = cva(
  'block size-2 rounded-full bg-accent ring-2 ring-background',
)
