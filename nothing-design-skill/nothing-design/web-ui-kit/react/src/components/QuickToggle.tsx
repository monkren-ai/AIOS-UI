import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '../lib/utils'
import '../styles/quick-toggle.css'

const quickToggleVariants = cva('nothing-quick-toggle', {
  variants: {
    variant: {
      circle: 'nothing-quick-toggle--circle',
      pill: 'nothing-quick-toggle--pill',
    },
    theme: {
      light: 'nothing-quick-toggle--light',
      dark: 'nothing-quick-toggle--dark',
      accent: 'nothing-quick-toggle--accent',
    },
    active: {
      true: 'nothing-quick-toggle--active',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'circle',
    theme: 'light',
    active: false,
  },
})

export type QuickToggleProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof quickToggleVariants> & {
    icon?: React.ReactNode
    label?: string
  }

const QuickToggle = React.forwardRef<HTMLButtonElement, QuickToggleProps>(
  ({ variant, theme, active, icon, label, className, onClick, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(quickToggleVariants({ variant, theme, active }), className)}
        onClick={onClick}
        aria-pressed={active ?? false}
        type="button"
        data-variant={dataAttr(variant)}
        data-theme={dataAttr(theme)}
        data-state={active ? 'on' : 'off'}
        {...props}
      >
        {icon && <span className="nothing-quick-toggle__icon">{icon}</span>}
        {label && <span className="nothing-quick-toggle__label">{label}</span>}
      </button>
    )
  }
)
QuickToggle.displayName = 'QuickToggle'

export { QuickToggle, quickToggleVariants }
export default QuickToggle
