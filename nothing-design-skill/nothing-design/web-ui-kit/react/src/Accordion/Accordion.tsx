import * as React from 'react'
import { Accordion as AccordionPrimitive } from '@base-ui/react/accordion'
import { cn, dataAttr } from '@/lib/utils'
import {
  accordionContentVariants,
  accordionHeaderVariants,
  accordionItemVariants,
  accordionLeadingIconVariants,
  accordionPanelVariants,
  accordionTriggerIconVariants,
  accordionTriggerTextVariants,
  accordionTriggerVariants,
  accordionVariants,
  type AccordionType,
  type AccordionVariant,
} from './accordion-variants'

export interface AccordionItem {
  id: string
  title: React.ReactNode
  content: React.ReactNode
  disabled?: boolean
  leadingIcon?: React.ReactNode
}

export interface AccordionProps extends Omit<
  React.ComponentPropsWithRef<'div'>,
  'onChange' | 'defaultValue' | 'value'
> {
  items: AccordionItem[]
  /** 单开还是多开。 */
  type?: AccordionType
  /** 视觉形态。 */
  variant?: AccordionVariant
  /**
   * 非受控模式下默认展开的面板 id 列表。
   * @deprecated 请优先使用 `defaultValue`。
   */
  defaultOpen?: string[]
  defaultValue?: string[]
  value?: string[]
  onValueChange?: (value: string[]) => void
}

export function Accordion({
  className,
  items,
  type = 'single',
  variant = 'default',
  defaultOpen,
  defaultValue,
  value: controlledValue,
  onValueChange,
  ...props
}: AccordionProps) {
  const handleValueChange = React.useCallback(
    (value: string[]) => {
      onValueChange?.(value)
    },
    [onValueChange],
  )

  return (
    <AccordionPrimitive.Root
      className={cn(accordionVariants({ type, variant }), className)}
      data-slot="accordion"
      data-variant={dataAttr(variant)}
      data-type={dataAttr(type)}
      multiple={type === 'multiple'}
      defaultValue={defaultValue ?? defaultOpen}
      value={controlledValue}
      onValueChange={handleValueChange}
      {...props}
    >
      {items.map((item) => (
        <AccordionPrimitive.Item
          key={item.id}
          value={item.id}
          disabled={item.disabled}
          className={accordionItemVariants({ variant })}
          data-slot="accordion-item"
          data-disabled={dataAttr(item.disabled)}
        >
          <AccordionPrimitive.Header
            className={accordionHeaderVariants()}
            data-slot="accordion-header"
          >
            <AccordionPrimitive.Trigger
              className={accordionTriggerVariants()}
              data-slot="accordion-trigger"
            >
              {item.leadingIcon && (
                <span
                  className={accordionLeadingIconVariants()}
                  data-slot="accordion-leading-icon"
                  aria-hidden="true"
                >
                  {item.leadingIcon}
                </span>
              )}
              <span className={accordionTriggerTextVariants()} data-slot="accordion-trigger-text">
                {item.title}
              </span>
              <span
                className={accordionTriggerIconVariants()}
                data-slot="accordion-trigger-icon"
                aria-hidden="true"
              />
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Panel
            className={accordionPanelVariants()}
            data-slot="accordion-panel"
          >
            <div className={accordionContentVariants()} data-slot="accordion-content">
              {item.content}
            </div>
          </AccordionPrimitive.Panel>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  )
}

Accordion.displayName = 'Accordion'

export {
  accordionVariants,
  accordionItemVariants,
  accordionHeaderVariants,
  accordionTriggerVariants,
  accordionTriggerTextVariants,
  accordionTriggerIconVariants,
  accordionLeadingIconVariants,
  accordionPanelVariants,
  accordionContentVariants,
}
export type { AccordionType, AccordionVariant }
export default Accordion
