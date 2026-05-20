import { useState, useRef, useCallback } from 'react'
import '../styles/accordion.css'

interface AccordionItem {
  id: string
  title: string
  content: string
  disabled?: boolean
}

interface AccordionProps {
  items: AccordionItem[]
  type?: 'single' | 'multiple'
  defaultOpen?: string[]
}

const Accordion: React.FC<AccordionProps> = ({
  items,
  type = 'single',
  defaultOpen = []
}) => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set(defaultOpen))
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([])

  const isOpen = (id: string) => openItems.has(id)

  const toggleItem = useCallback((id: string) => {
    setOpenItems(prev => {
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
  }, [type])

  const handleKeyDown = useCallback((e: React.KeyboardEvent, index: number) => {
    const triggers = triggerRefs.current.filter(Boolean) as HTMLButtonElement[]
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
  }, [])

  return (
    <div className="nothing-accordion" role="presentation">
      {items.map((item, index) => {
        const itemClassNames = [
          'nothing-accordion__item',
          isOpen(item.id) ? 'nothing-accordion__item--open' : '',
          item.disabled ? 'nothing-accordion__item--disabled' : ''
        ].filter(Boolean).join(' ')

        const contentId = `accordion-content-${item.id}`
        const triggerId = `accordion-trigger-${item.id}`

        return (
          <div key={item.id} className={itemClassNames}>
            <h3 className="nothing-accordion__heading">
              <button
                ref={el => { triggerRefs.current[index] = el }}
                className="nothing-accordion__trigger"
                aria-expanded={isOpen(item.id)}
                aria-controls={contentId}
                id={triggerId}
                disabled={item.disabled}
                onClick={() => toggleItem(item.id)}
                onKeyDown={(e) => handleKeyDown(e, index)}
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
            >
              <div className="nothing-accordion__content-inner">
                {item.content}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Accordion
