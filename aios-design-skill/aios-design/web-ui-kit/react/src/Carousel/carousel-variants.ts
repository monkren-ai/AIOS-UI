import { cva } from 'class-variance-authority'

export const carouselVariants = cva(['relative w-full'])
export const carouselViewportVariants = cva([
  'overflow-hidden rounded-card border border-border-visible bg-surface',
])
export const carouselSlideVariants = cva([
  'w-full transition-opacity duration-200 ease-aios motion-reduce:transition-none',
])
export const carouselControlsVariants = cva(['mt-2 flex items-center justify-between gap-2'])
export const carouselButtonVariants = cva([
  'inline-flex size-9 items-center justify-center rounded-button border border-border-visible bg-transparent',
  'font-mono text-sm text-foreground transition-colors duration-200 ease-aios motion-reduce:transition-none',
  'hover:bg-muted disabled:pointer-events-none disabled:opacity-40',
  'outline-none focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2',
])
export const carouselStatusVariants = cva([
  'font-mono text-label uppercase tracking-wider text-foreground-muted',
])
