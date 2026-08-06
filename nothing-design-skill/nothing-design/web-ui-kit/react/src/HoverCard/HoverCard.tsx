import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import { Popover as PopoverPrimitive } from '@base-ui/react/popover'
import {
  hoverCardContentVariants,
  hoverCardPositionerVariants,
  hoverCardTriggerVariants,
} from './hover-card-variants'

export interface HoverCardProps extends Omit<
  React.ComponentPropsWithRef<'div'>,
  'children' | 'content'
> {
  content: React.ReactNode
  side?: 'top' | 'bottom'
  delay?: number
  children: React.ReactElement
}

export function HoverCard({
  className,
  content,
  side = 'bottom',
  delay = 300,
  children,
  ref,
  ...props
}: HoverCardProps) {
  // HoverCard 几乎总是包在链接 / 自定义元素上，不是原生 <button>。
  // Base UI Trigger 默认 nativeButton=true，套到 <a> 上会丢语义并打警告。
  const childIsNativeButton =
    React.isValidElement(children) &&
    (children.type === 'button' ||
      (typeof children.type === 'string' && children.type.toLowerCase() === 'button'))

  return (
    <PopoverPrimitive.Root>
      <PopoverPrimitive.Trigger
        openOnHover
        delay={delay}
        closeDelay={0}
        nativeButton={childIsNativeButton}
        data-slot="hover-card-trigger"
        render={(triggerProps) => {
          if (React.isValidElement(children)) {
            return React.cloneElement(children as React.ReactElement<{ className?: string }>, {
              ...triggerProps,
              className: cn(
                hoverCardTriggerVariants(),
                (children.props as { className?: string }).className,
              ),
            })
          }
          return (
            <span
              {...triggerProps}
              className={cn(hoverCardTriggerVariants())}
              data-slot="hover-card-trigger"
            >
              {children}
            </span>
          )
        }}
      />
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Positioner
          className={cn(hoverCardPositionerVariants())}
          data-slot="hover-card-positioner"
          side={side}
          sideOffset={4}
        >
          <PopoverPrimitive.Popup
            ref={ref}
            className={cn(hoverCardContentVariants({ side }), className)}
            data-slot="hover-card-content"
            data-side={dataAttr(side)}
            {...props}
          >
            {content}
          </PopoverPrimitive.Popup>
        </PopoverPrimitive.Positioner>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}

HoverCard.displayName = 'HoverCard'

export { hoverCardContentVariants, hoverCardPositionerVariants, hoverCardTriggerVariants }
export default HoverCard
