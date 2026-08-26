import { cva } from 'class-variance-authority'

export const attachmentVariants = cva(
  'group relative inline-flex items-center overflow-hidden border border-border bg-surface text-foreground',
  {
    variants: {
      size: {
        sm: 'min-h-9 gap-2 rounded-button px-2 text-caption',
        md: 'min-h-11 gap-3 rounded-card px-3 text-sm',
      },
      media: { true: 'p-1', false: '' },
      loading: { true: 'text-foreground-muted', false: '' },
    },
    defaultVariants: { size: 'md', media: false, loading: false },
  },
)
