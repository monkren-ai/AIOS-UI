import { cva } from 'class-variance-authority'

export const chipVariants = cva(
  [
    'inline-flex shrink-0 items-center justify-center gap-2 rounded-tag border font-sans outline-none',
    'transition-[color,background-color,border-color,transform] duration-fast ease-out',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-interactive',
    'disabled:pointer-events-none disabled:opacity-disabled',
    'active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100',
  ],
  {
    variants: {
      size: {
        sm: 'min-h-9 px-3 text-caption',
        md: 'min-h-11 px-4 text-body-sm',
      },
      selected: {
        false: 'border-border-visible bg-surface text-foreground hover:bg-muted',
        true: 'border-foreground bg-foreground text-background',
      },
    },
    defaultVariants: { size: 'md', selected: false },
  },
)

export const chipGroupVariants = cva(
  'flex max-w-full items-center gap-2 overflow-x-auto overscroll-x-contain py-1',
)

export type ChipSize = 'sm' | 'md'
