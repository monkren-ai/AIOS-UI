import { cva } from 'class-variance-authority'

export const contentCardVariants = cva(
  ['border transition-colors duration-200 ease-aios motion-reduce:transition-none'],
  {
    variants: {
      variant: {
        soft: 'border-border bg-surface', secondary: 'border-border bg-surface-raised',
        outline: 'border-border bg-transparent', ghost: 'border-transparent bg-transparent',
      },
      size: { sm: 'px-4 py-2', md: 'px-6 py-5', lg: 'px-8 py-6' },
      shape: { rounded: 'rounded-card', technical: 'rounded-xs' },
      interactive: { true: 'cursor-pointer select-none hover:border-border-visible active:opacity-85 outline-none focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2', false: '' },
      disabled: { true: 'pointer-events-none opacity-40', false: '' },
    },
    compoundVariants: [{ size: 'sm', shape: 'rounded', class: 'rounded-card-compact' }],
    defaultVariants: { variant: 'soft', size: 'md', shape: 'rounded', interactive: false, disabled: false },
  },
)

const legacyVariants = { default: 'soft', raised: 'secondary', borderless: 'ghost', compact: 'soft', technical: 'soft' } as const
export type CardVariant = 'soft' | 'secondary' | 'outline' | 'ghost' | keyof typeof legacyVariants
export type CardSize = 'sm' | 'md' | 'lg'
export type CardShape = 'rounded' | 'technical'
export function resolveCardVariant(value?: CardVariant | null) { return value ? ((legacyVariants as Record<string, string>)[value] ?? value) : undefined }
export function resolveCardSize(variant?: CardVariant | null, size?: CardSize | null) { return size ?? (variant === 'compact' ? 'sm' : undefined) }
export function resolveCardShape(variant?: CardVariant | null, shape?: CardShape | null) { return shape ?? (variant === 'technical' ? 'technical' : undefined) }
