import * as React from 'react'
import { type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '@/lib/utils'
import {
  quickToggleIconVariants,
  quickToggleLabelVariants,
  quickToggleVariants,
} from './quick-toggle-variants'

export type QuickToggleProps = React.ComponentPropsWithRef<'button'> &
  VariantProps<typeof quickToggleVariants> & {
    icon?: React.ReactNode
    label?: string
  }

function QuickToggle({
  variant = 'circle',
  active,
  icon,
  label,
  className,
  onClick,
  ref,
  ...props
}: QuickToggleProps) {
  return (
    <button
      ref={ref}
      className={cn(quickToggleVariants({ variant, active }), className)}
      onClick={onClick}
      aria-pressed={active ?? false}
      type="button"
      data-slot="quick-toggle"
      data-variant={dataAttr(variant)}
      data-state={active ? 'on' : 'off'}
      {...props}
    >
      {icon && (
        <span data-slot="quick-toggle-icon" className={cn(quickToggleIconVariants())}>
          {icon}
        </span>
      )}
      {label && (
        <span
          data-slot="quick-toggle-label"
          className={cn(quickToggleLabelVariants({ variant }))}
        >
          {label}
        </span>
      )}
    </button>
  )
}

QuickToggle.displayName = 'QuickToggle'

export { QuickToggle, quickToggleVariants }
export default QuickToggle
