import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '@/lib/utils'
import { Popover as PopoverPrimitive } from '@base-ui/react/popover'
import type { OverlaySide } from '@/ui/OverlayPortal'
import './Popover.css'

const popoverContentVariants = cva('nothing-popover__content', {
  variants: {
    visible: { true: 'nothing-popover__content--visible', false: '' },
    side: {
      top: 'nothing-popover__content--top',
      bottom: 'nothing-popover__content--bottom',
      left: 'nothing-popover__content--left',
      right: 'nothing-popover__content--right',
    },
  },
  defaultVariants: { visible: false, side: 'bottom' },
})

export interface PopoverProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'content'>,
    VariantProps<typeof popoverContentVariants> {
  content: React.ReactNode
  side?: OverlaySide
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactElement
}

export const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(
  (
    { className, content, side = 'bottom', open: controlledOpen, onOpenChange, visible: _visible, children, ...props },
    ref,
  ) => {
    const [internalOpen, setInternalOpen] = React.useState(false)
    const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen

    const handleOpenChange = React.useCallback(
      (nextOpen: boolean) => {
        if (controlledOpen === undefined) {
          setInternalOpen(nextOpen)
        }
        onOpenChange?.(nextOpen)
      },
      [controlledOpen, onOpenChange],
    )

    return (
      <PopoverPrimitive.Root open={isOpen} onOpenChange={handleOpenChange}>
        <PopoverPrimitive.Trigger
          data-slot="popover-trigger"
          render={(triggerProps) => {
            if (React.isValidElement(children)) {
              return React.cloneElement(children as React.ReactElement<{ className?: string }>, {
                ...triggerProps,
                className: cn('nothing-popover__trigger', (children.props as { className?: string }).className),
              })
            }
            return (
              <span {...triggerProps} className="nothing-popover__trigger" data-slot="popover-trigger">
                {children}
              </span>
            )
          }}
        />
        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Positioner
            className="nothing-popover__positioner"
            data-slot="popover-positioner"
            side={side}
            sideOffset={4}
          >
            <PopoverPrimitive.Popup
              ref={ref}
              className={cn(popoverContentVariants({ visible: isOpen, side }), className)}
              data-slot="popover-content"
              data-state={dataAttr(isOpen ? 'open' : 'closed')}
              data-side={dataAttr(side)}
              {...props}
            >
              {content}
            </PopoverPrimitive.Popup>
          </PopoverPrimitive.Positioner>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
    )
  },
)
Popover.displayName = 'Popover'

export { popoverContentVariants }
export default Popover
