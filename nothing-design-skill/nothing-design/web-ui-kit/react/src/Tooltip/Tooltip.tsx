import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip'
import './Tooltip.css'

const tooltipPopupVariants = cva('nothing-tooltip__popup', {
  variants: {
    visible: { true: 'nothing-tooltip__popup--visible', false: '' },
    side: {
      top: 'nothing-tooltip__popup--top',
      bottom: 'nothing-tooltip__popup--bottom',
      left: 'nothing-tooltip__popup--left',
      right: 'nothing-tooltip__popup--right',
    },
  },
  defaultVariants: { visible: false, side: 'top' },
})

export interface TooltipProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    VariantProps<typeof tooltipPopupVariants> {
  content: string
  side?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
  children: React.ReactElement
}

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  ({ className, content, side = 'top', delay = 300, children, ...props }, ref) => {
    return (
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger
          delay={delay}
          data-slot="tooltip-trigger"
          render={(triggerProps) => {
            if (React.isValidElement(children)) {
              return React.cloneElement(children as React.ReactElement<{ className?: string }>, {
                ...triggerProps,
                className: cn('nothing-tooltip__trigger', (children.props as { className?: string }).className),
              })
            }
            return (
              <span {...triggerProps} className="nothing-tooltip__trigger" data-slot="tooltip-trigger">
                {children}
              </span>
            )
          }}
        />
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Positioner
            className="nothing-tooltip__positioner"
            data-slot="tooltip-positioner"
            side={side}
            sideOffset={4}
          >
            <TooltipPrimitive.Popup
              ref={ref}
              className={cn(tooltipPopupVariants({ side }), className)}
              role="tooltip"
              data-slot="tooltip-popup"
              data-side={side}
              {...props}
            >
              {content}
            </TooltipPrimitive.Popup>
          </TooltipPrimitive.Positioner>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    )
  },
)
Tooltip.displayName = 'Tooltip'

export { tooltipPopupVariants }
export default Tooltip
