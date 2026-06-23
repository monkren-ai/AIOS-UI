import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '@/lib/utils'
import './Accordion.css'

const accordionVariants = cva('nothing-accordion', {
  variants: {
    type: {
      single: 'nothing-accordion--single',
      multiple: 'nothing-accordion--multiple',
    },
  },
  defaultVariants: { type: 'single' },
})

const accordionItemVariants = cva('nothing-accordion__item', {
  variants: {
    open: { true: 'nothing-accordion__item--open', false: '' },
    disabled: { true: 'nothing-accordion__item--disabled', false: '' },
  },
  defaultVariants: { open: false, disabled: false },
})

export interface AccordionItem {
  id: string
  title: string
  content: string
  disabled?: boolean
}

export interface AccordionProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'>,
    VariantProps<typeof accordionVariants> {
  items: AccordionItem[]
  defaultOpen?: string[]
}

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ className, items, type = 'single', defaultOpen = [], ...props }, ref) => {
    const [openItems, setOpenItems] = React.useState<Set<string>>(new Set(defaultOpen))
    const triggerRefs = React.useRef<(HTMLButtonElement | null)[]>([])

    const isOpen = (id: string) => openItems.has(id)

    const toggleItem = React.useCallback(
      (id: string) => {
        setOpenItems((prev) => {
          const next = new Set(prev)
          if (next.has(id)) {
            next.delete(id)
          } else {
            if (type === 'single') {
              next.clear()
            }
            next.add(id)
          }
          return next
        })
      },
      [type]
    )

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
        const triggers = triggerRefs.current.filter(Boolean) as HTMLButtonElement[]
        if (triggers.length === 0) return
        let nextIndex = index

        switch (e.key) {
          case 'ArrowDown':
            e.preventDefault()
            nextIndex = index + 1
            break
          case 'ArrowUp':
            e.preventDefault()
            nextIndex = index - 1
            break
          case 'Home':
            e.preventDefault()
            nextIndex = 0
            break
          case 'End':
            e.preventDefault()
            nextIndex = triggers.length - 1
            break
          default:
            return
        }

        nextIndex = ((nextIndex % triggers.length) + triggers.length) % triggers.length
        triggers[nextIndex]?.focus()
      },
      []
    )

    return (
      <div
        ref={ref}
        className={cn(accordionVariants({ type }), className)}
        role="presentation"
        data-type={dataAttr(type)}
        {...props}
      >
        {items.map((item, index) => {
          const open = isOpen(item.id)
          const contentId = `accordion-content-${item.id}`
          const triggerId = `accordion-trigger-${item.id}`

          return (
            <div
              key={item.id}
              className={cn(accordionItemVariants({ open, disabled: !!item.disabled }))}
              data-state={dataAttr(open ? 'open' : 'closed')}
              data-disabled={dataAttr(item.disabled)}
            >
              <h3 className="nothing-accordion__heading">
                <button
                  ref={(el) => {
                    triggerRefs.current[index] = el
                  }}
                  className="nothing-accordion__trigger"
                  aria-expanded={open}
                  aria-controls={contentId}
                  id={triggerId}
                  disabled={item.disabled}
                  onClick={() => toggleItem(item.id)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  data-state={dataAttr(open ? 'open' : 'closed')}
                >
                  <span className="nothing-accordion__trigger-text">{item.title}</span>
                  <span className="nothing-accordion__trigger-icon" aria-hidden="true" />
                </button>
              </h3>
              <div
                className="nothing-accordion__content"
                id={contentId}
                role="region"
                aria-labelledby={triggerId}
                data-state={dataAttr(open ? 'open' : 'closed')}
              >
                <div className="nothing-accordion__content-inner">{item.content}</div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
)
Accordion.displayName = 'Accordion'

export { accordionVariants, accordionItemVariants }
export default Accordion
