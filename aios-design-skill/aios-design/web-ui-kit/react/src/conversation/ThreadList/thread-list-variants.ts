import { cva } from 'class-variance-authority'

export const threadListVariants = cva(
  'flex w-full flex-col gap-1 rounded-card border border-border-visible bg-surface p-2',
)

export const threadListItemVariants = cva(
  'group/thread flex min-h-11 items-center gap-1 rounded-button',
  {
    variants: {
      active: {
        true: 'bg-muted text-foreground',
        false: 'text-foreground-muted hover:bg-muted hover:text-foreground',
      },
    },
    defaultVariants: { active: false },
  },
)
