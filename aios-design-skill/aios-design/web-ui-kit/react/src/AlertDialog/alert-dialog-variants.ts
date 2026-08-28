import { cva } from 'class-variance-authority'
import { overlayModalMotion, overlayDuration, OVERLAY_REDUCED_MOTION } from '@/lib/overlay-motion'

export const alertDialogBackdropVariants = cva([
  'fixed inset-0 z-50 bg-background/80',
  'transition-opacity',
  ...overlayDuration('slow'),
  OVERLAY_REDUCED_MOTION,
  'open:opacity-100 closed:opacity-0',
])

export const alertDialogViewportVariants = cva([
  'fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4',
])

export const alertDialogPopupVariants = cva(
  [
    'relative flex w-full max-w-md flex-col rounded-card border bg-surface-raised p-6 text-foreground',
    'outline-none',
    ...overlayModalMotion,
  ],
  {
    variants: {
      destructive: {
        true: 'border-accent',
        false: 'border-border-visible',
      },
    },
    defaultVariants: { destructive: false },
  },
)

export const alertDialogHeaderVariants = cva(['flex flex-col gap-2'])
export const alertDialogTitleVariants = cva(
  ['font-mono text-subheading font-bold uppercase tracking-wider'],
  {
    variants: { destructive: { true: 'text-accent', false: 'text-foreground-display' } },
    defaultVariants: { destructive: false },
  },
)
export const alertDialogDescriptionVariants = cva(['font-body text-sm text-foreground-muted'])
export const alertDialogBodyVariants = cva(['mt-4 font-body text-sm text-foreground'])
export const alertDialogFooterVariants = cva([
  'mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
])
