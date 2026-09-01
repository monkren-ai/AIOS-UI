import { cva } from 'class-variance-authority'

export const batteryVariants = cva('flex w-full flex-col rounded-lg border border-border bg-surface p-6 transition-colors motion-reduce:transition-none', {
  variants: { variant: { segmented: '', ring: 'items-center' }, level: { critical: '', low: '', medium: '', high: '' } },
  defaultVariants: { variant: 'segmented', level: 'high' },
})
export const batteryPercentVariants = cva('font-display text-display-lg font-semibold leading-none tabular-nums text-foreground-display')
export const batteryStatusVariants = cva('font-mono text-sm uppercase tracking-widest', { variants: { charging: { true: 'text-success', false: 'text-foreground-muted' } }, defaultVariants: { charging: false } })
export const batteryProgressVariants = cva('flex h-4 w-full gap-0.5')
export const batterySegmentVariants = cva('flex-1 transition-colors', {
  variants: { filled: { true: '', false: 'bg-border' }, level: { critical: '', low: '', medium: '', high: '' } },
  compoundVariants: [
    { filled: true, level: 'high', class: 'bg-success' }, { filled: true, level: 'medium', class: 'bg-foreground-display' },
    { filled: true, level: 'low', class: 'bg-warning' }, { filled: true, level: 'critical', class: 'bg-error' },
  ], defaultVariants: { filled: false, level: 'high' },
})
export const batteryRingVariants = cva('relative flex size-40 items-center justify-center rounded-full border border-border bg-surface')
export const batteryDeviceVariants = cva('flex min-h-11 items-center gap-2 rounded-sm px-2 transition-colors', { variants: { clickable: { true: 'cursor-pointer hover:bg-muted focus-visible:outline-2 focus-visible:outline-interactive', false: '' } }, defaultVariants: { clickable: false } })
