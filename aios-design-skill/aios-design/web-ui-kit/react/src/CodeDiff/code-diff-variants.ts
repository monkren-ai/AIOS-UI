import { cva } from 'class-variance-authority'

export const codeDiffVariants = cva(
  'overflow-hidden rounded-card border border-border bg-surface font-mono text-sm text-foreground',
)

export const codeDiffLineVariants = cva('grid grid-cols-[3ch_3ch_2ch_1fr] gap-2 px-3', {
  variants: {
    type: {
      context: 'text-foreground-muted',
      add: 'bg-muted text-foreground',
      remove: 'bg-accent-subtle text-accent',
    },
  },
  defaultVariants: { type: 'context' },
})
