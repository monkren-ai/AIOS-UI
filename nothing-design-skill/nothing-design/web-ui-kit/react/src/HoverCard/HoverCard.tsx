import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Popover as PopoverPrimitive } from '@base-ui/react/popover'
import './HoverCard.css'

const hoverCardContentVariants = cva('nothing-hover-card__content', {
  variants: {
    visible: { true: 'nothing-hover-card__content--visible', false: '' },
    side: {
      top: 'nothing-hover-card__content--top',
      bottom: 'nothing-hover-card__content--bottom',
    },
  },
  defaultVariants: { visible: false, side: 'bottom' },
})

export interface HoverCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'content'>,
    VariantProps<typeof hoverCardContentVariants> {
  content: React.ReactNode
  side?: 'top' | 'bottom'
  delay?: number
  children: React.ReactElement
}

export const HoverCard = React.forwardRef<HTMLDivElement, HoverCardProps>(
  ({ className, content, side = 'bottom', delay = 300, visible: _visible, children, ...props }, ref) => {
    return (
      <PopoverPrimitive.Root>
        <PopoverPrimitive.Trigger
          openOnHover
          delay={delay}
          closeDelay={0}
          data-slot="hover-card-trigger"
          render={(triggerProps) => {
            if (React.isValidElement(children)) {
              return React.cloneElement(children as React.ReactElement<{ className?: string }>, {
                ...triggerProps,
                className: cn('nothing-hover-card__trigger', (children.props as { className?: string }).className),
              })
            }
            return (
              <span {...triggerProps} className="nothing-hover-card__trigger" data-slot="hover-card-trigger">
                {children}
              </span>
            )
          }}
        />
        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Positioner
            className="nothing-hover-card__positioner"
            data-slot="hover-card-positioner"
            side={side}
            sideOffset={4}
          >
            <PopoverPrimitive.Popup
              ref={ref}
              className={cn(hoverCardContentVariants({ side }), className)}
              data-slot="hover-card-content"
              data-side={side}
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
HoverCard.displayName = 'HoverCard'

export { hoverCardContentVariants }
export default HoverCard
