import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Accordion as AccordionPrimitive } from '@base-ui/react/accordion'
import { cn, dataAttr } from '@/lib/utils'
import './Accordion.css'

const accordionVariants = cva('nothing-accordion', {
  variants: {
    type: {
      single: 'nothing-accordion--single',
      multiple: 'nothing-accordion--multiple',
    },
    variant: {
      default: 'nothing-accordion--default',
      flush: 'nothing-accordion--flush',
    },
  },
  defaultVariants: { type: 'single', variant: 'default' },
})

export interface AccordionItem {
  id: string
  title: React.ReactNode
  content: React.ReactNode
  disabled?: boolean
  leadingIcon?: React.ReactNode
}

export interface AccordionProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue' | 'value'>,
    VariantProps<typeof accordionVariants> {
  items: AccordionItem[]
  /**
   * 非受控模式下默认展开的面板 id 列表。
   * @deprecated 请优先使用 `defaultValue`。
   */
  defaultOpen?: string[]
  defaultValue?: string[]
  value?: string[]
  onValueChange?: (value: string[]) => void
}

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      className,
      items,
      type = 'single',
      variant = 'default',
      defaultOpen,
      defaultValue,
      value: controlledValue,
      onValueChange,
      ...props
    },
    ref,
  ) => {
    const handleValueChange = React.useCallback(
      (value: string[]) => {
        onValueChange?.(value)
      },
      [onValueChange],
    )

    return (
      <AccordionPrimitive.Root
        ref={ref}
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
            className="nothing-accordion__item"
            data-disabled={dataAttr(item.disabled)}
          >
            <AccordionPrimitive.Header className="nothing-accordion__heading">
              <AccordionPrimitive.Trigger className="nothing-accordion__trigger">
                {item.leadingIcon && (
                  <span className="nothing-accordion__trigger-icon-leading" aria-hidden="true">
                    {item.leadingIcon}
                  </span>
                )}
                <span className="nothing-accordion__trigger-text">{item.title}</span>
                <span className="nothing-accordion__trigger-icon" aria-hidden="true" />
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>
            <AccordionPrimitive.Panel className="nothing-accordion__panel">
              <div className="nothing-accordion__content-inner">{item.content}</div>
            </AccordionPrimitive.Panel>
          </AccordionPrimitive.Item>
        ))}
      </AccordionPrimitive.Root>
    )
  },
)
Accordion.displayName = 'Accordion'

export { accordionVariants }
export default Accordion
