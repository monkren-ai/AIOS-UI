import { cva } from 'class-variance-authority'

export const numberTickerVariants = cva(
  'inline-flex items-baseline font-mono tabular-nums text-foreground-display',
  {
    variants: {
      size: {
        sm: 'text-sm',
        md: 'text-heading',
        lg: 'text-display-sm',
      },
    },
    defaultVariants: { size: 'md' },
  },
)

export const numberTickerDigitVariants = cva('relative inline-block overflow-hidden')

export const numberTickerDigitValueVariants = cva(
  'inline-block motion-safe:animate-digit-in motion-reduce:animate-none',
)

export const numberTickerAffixVariants = cva('text-foreground-muted')

export type NumberTickerSize = 'sm' | 'md' | 'lg'
