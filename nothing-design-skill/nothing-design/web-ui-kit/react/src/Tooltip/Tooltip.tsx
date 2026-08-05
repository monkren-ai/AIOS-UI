import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip'
import {
  tooltipPopupVariants,
  tooltipPositionerVariants,
  tooltipTriggerVariants,
} from './tooltip-variants'

export interface TooltipProps extends Omit<
  React.ComponentPropsWithRef<'div'>,
  'children' | 'content'
> {
  content: string
  side?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
  children: React.ReactElement
}

export function Tooltip({
  className,
  content,
  side = 'top',
  delay = 300,
  children,
  ref,
  ...props
}: TooltipProps) {
  /**
   * 描述文本单独渲染一份视觉隐藏的副本，`aria-describedby` 指向它，而不是指向
   * 浮层本身。浮层只在打开时才挂载，而读屏是在焦点落上来的那一刻读描述的——
   * 隔着 `delay` 毫秒，那时浮层多半还不存在，描述就丢了。这份副本一直在。
   */
  const descriptionId = React.useId()

  return (
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger
        delay={delay}
        data-slot="tooltip-trigger"
        render={(triggerProps) => {
          if (React.isValidElement(children)) {
            const childProps = children.props as {
              className?: string
              'aria-describedby'?: string
            }
            return React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
              ...triggerProps,
              className: cn(tooltipTriggerVariants(), childProps.className),
              // 调用方自己写了描述就接在后面，不要顶掉。
              'aria-describedby': [childProps['aria-describedby'], descriptionId]
                .filter(Boolean)
                .join(' '),
            })
          }
          return (
            <span
              {...triggerProps}
              className={cn(tooltipTriggerVariants())}
              data-slot="tooltip-trigger"
              aria-describedby={descriptionId}
            >
              {children}
            </span>
          )
        }}
      />
      <span id={descriptionId} hidden>
        {content}
      </span>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Positioner
          className={cn(tooltipPositionerVariants())}
          data-slot="tooltip-positioner"
          side={side}
          sideOffset={4}
        >
          <TooltipPrimitive.Popup
            ref={ref}
            className={cn(tooltipPopupVariants({ side }), className)}
            role="tooltip"
            data-slot="tooltip-popup"
            data-side={dataAttr(side)}
            {...props}
          >
            {content}
          </TooltipPrimitive.Popup>
        </TooltipPrimitive.Positioner>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  )
}

Tooltip.displayName = 'Tooltip'

export { tooltipPopupVariants, tooltipPositionerVariants, tooltipTriggerVariants }
export default Tooltip
