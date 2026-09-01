import { cva } from 'class-variance-authority'

export const planVariants = cva('w-full rounded-card border border-border-visible bg-surface p-3')

export const planStepVariants = cva('flex min-h-10 items-start gap-3 py-2 text-sm', {
  variants: {
    status: {
      done: 'text-foreground-muted',
      active: 'text-foreground',
      pending: 'text-foreground-disabled',
    },
  },
  defaultVariants: { status: 'pending' },
})
