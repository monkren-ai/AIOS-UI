import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import { Popover as PopoverPrimitive } from '@base-ui/react/popover'
import type { OverlaySide } from '@/ui/OverlayPortal'
import {
  popoverContentVariants,
  popoverPositionerVariants,
  popoverTriggerVariants,
} from './popover-variants'

export interface PopoverProps extends Omit<
  React.ComponentPropsWithRef<'div'>,
  'children' | 'content'
> {
  content: React.ReactNode
  side?: OverlaySide
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactElement
}

export function Popover({
  className,
  content,
  side = 'bottom',
  open: controlledOpen,
  onOpenChange,
  children,
  ref,
  ...props
}: PopoverProps) {
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

  // 触发器经常是 `Button` / `<a>` / 自定义元素，不是原生 `<button>`。
  // Base UI 默认 nativeButton=true，套错会丢语义并打控制台警告。
  const childIsNativeButton =
    React.isValidElement(children) &&
    (children.type === 'button' ||
      (typeof children.type === 'string' && children.type.toLowerCase() === 'button'))

  return (
    <PopoverPrimitive.Root open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverPrimitive.Trigger
        nativeButton={childIsNativeButton}
        data-slot="popover-trigger"
        render={(triggerProps) => {
          if (React.isValidElement(children)) {
            return React.cloneElement(children as React.ReactElement<{ className?: string }>, {
              ...triggerProps,
              className: cn(
                popoverTriggerVariants(),
                (children.props as { className?: string }).className,
              ),
            })
          }
          return (
            <span
              {...triggerProps}
              className={cn(popoverTriggerVariants())}
              data-slot="popover-trigger"
            >
              {children}
            </span>
          )
        }}
      />
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Positioner
          className={cn(popoverPositionerVariants())}
          data-slot="popover-positioner"
          side={side}
          sideOffset={4}
        >
          <PopoverPrimitive.Popup
            ref={ref}
            className={cn(popoverContentVariants({ side }), className)}
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
}

Popover.displayName = 'Popover'

export { popoverContentVariants, popoverPositionerVariants, popoverTriggerVariants }
export default Popover
