import { cva } from 'class-variance-authority'

export const codeBlockVariants = cva(
  'overflow-hidden rounded-card border border-border bg-surface text-foreground',
  {
    variants: {
      wrap: {
        true: '[&_pre]:whitespace-pre-wrap [&_pre]:break-words',
        false: '[&_pre]:whitespace-pre',
      },
    },
    defaultVariants: { wrap: false },
  },
)
