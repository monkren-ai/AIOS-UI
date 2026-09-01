import { cva } from 'class-variance-authority'

export const reasoningVariants = cva('group/reasoning w-full text-foreground', {
  variants: {
    container: {
      true: 'rounded-card border border-border-visible bg-surface',
      false: '',
    },
    status: {
      running: '',
      finished: '',
      error: 'text-accent',
    },
  },
  defaultVariants: { container: false, status: 'finished' },
})

export const reasoningGroupVariants = cva('flex w-full flex-col gap-3')
