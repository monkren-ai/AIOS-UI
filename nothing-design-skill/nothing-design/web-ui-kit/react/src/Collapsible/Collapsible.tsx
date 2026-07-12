import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '@/lib/utils'
import './Collapsible.css'

const collapsibleVariants = cva('nothing-collapsible', {
  variants: {
    open: {
      true: 'nothing-collapsible--open',
      false: '',
    },
  },
  defaultVariants: { open: false },
})

export type CollapsibleProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onToggle'> &
  Omit<VariantProps<typeof collapsibleVariants>, 'open'> & {
    open?: boolean
    defaultOpen?: boolean
    onOpenChange?: (open: boolean) => void
    trigger: React.ReactNode
    children?: React.ReactNode
  }

export const Collapsible = React.forwardRef<HTMLDivElement, CollapsibleProps>(
  (
    {
      className,
      open: controlledOpen,
      defaultOpen = false,
      onOpenChange,
      trigger,
      children,
      ...props
    },
    ref
  ) => {
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
    const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen

    const handleToggle = React.useCallback(() => {
      const next = !isOpen
      if (controlledOpen === undefined) {
        setInternalOpen(next)
      }
      onOpenChange?.(next)
    }, [isOpen, controlledOpen, onOpenChange])

    return (
      <div
        ref={ref}
        className={cn(collapsibleVariants({ open: isOpen }), className)}
        data-state={dataAttr(isOpen ? 'open' : 'closed')}
        {...props}
      >
        <button
          className="nothing-collapsible__trigger"
          aria-expanded={isOpen}
          onClick={handleToggle}
          type="button"
        >
          {trigger}
        </button>
        <div className="nothing-collapsible__content" role="region">
          <div className="nothing-collapsible__content-inner">
            {children}
          </div>
        </div>
      </div>
    )
  }
)
Collapsible.displayName = 'Collapsible'

export { collapsibleVariants }
export default Collapsible
