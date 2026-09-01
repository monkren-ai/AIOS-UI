import { cva } from 'class-variance-authority'

export const webSearchVariants = cva(
  'w-full rounded-card border border-border-visible bg-surface',
  {
    variants: {
      status: {
        running: '',
        complete: '',
        error: 'border-accent',
      },
    },
    defaultVariants: { status: 'complete' },
  },
)

export const webSearchResultVariants = cva(
  'flex min-h-14 flex-col gap-1 rounded-card border border-border p-3 no-underline hover:border-border-visible hover:bg-muted focus-visible:outline-2 focus-visible:outline-interactive',
)
