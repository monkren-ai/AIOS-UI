import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '@/lib/utils'
import './Tabs.css'

const tabsVariants = cva('nothing-tabs', {
  variants: {
    // reserved for future variants
  },
  defaultVariants: {},
})

const tabTriggerVariants = cva('nothing-tabs__trigger', {
  variants: {
    active: { true: 'nothing-tabs__trigger--active', false: '' },
    disabled: { true: 'nothing-tabs__trigger--disabled', false: '' },
  },
  defaultVariants: { active: false, disabled: false },
})

export interface TabItem {
  value: string
  label: string
  disabled?: boolean
}

export interface TabsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'value' | 'defaultValue'>,
    VariantProps<typeof tabsVariants> {
  items: TabItem[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
}

export interface TabPanelProps {
  value: string
  children: React.ReactNode
}

const TabPanel: React.FC<TabPanelProps> = () => {
  return null
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      className,
      items,
      value: controlledValue,
      defaultValue,
      onValueChange,
      children,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(
      defaultValue ?? items[0]?.value ?? ''
    )
    const selectedValue = controlledValue !== undefined ? controlledValue : internalValue
    const [indicatorStyle, setIndicatorStyle] = React.useState<React.CSSProperties>({})
    const triggerRefs = React.useRef<(HTMLButtonElement | null)[]>([])
    const baseId = React.useId()

    React.useEffect(() => {
      const activeIndex = items.findIndex((item) => item.value === selectedValue)
      const activeTrigger = triggerRefs.current[activeIndex]
      if (activeTrigger) {
        setIndicatorStyle({
          width: activeTrigger.offsetWidth,
          left: activeTrigger.offsetLeft,
        })
      }
    }, [selectedValue, items])

    const handleSelect = React.useCallback(
      (itemValue: string) => {
        if (controlledValue === undefined) {
          setInternalValue(itemValue)
        }
        onValueChange?.(itemValue)
      },
      [controlledValue, onValueChange]
    )

    const findNextEnabled = React.useCallback(
      (currentIndex: number, direction: number): number => {
        let idx = currentIndex + direction
        while (idx >= 0 && idx < items.length) {
          if (!items[idx].disabled) return idx
          idx += direction
        }
        if (direction > 0) {
          for (let i = 0; i < currentIndex; i++) {
            if (!items[i].disabled) return i
          }
        } else {
          for (let i = items.length - 1; i > currentIndex; i--) {
            if (!items[i].disabled) return i
          }
        }
        return currentIndex
      },
      [items]
    )

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
        const enabledItems = items.filter((item) => !item.disabled)
        if (enabledItems.length === 0) return

        let nextIndex = -1

        switch (e.key) {
          case 'ArrowRight':
            e.preventDefault()
            nextIndex = findNextEnabled(index, 1)
            break
          case 'ArrowLeft':
            e.preventDefault()
            nextIndex = findNextEnabled(index, -1)
            break
          case 'Home':
            e.preventDefault()
            nextIndex = items.findIndex((item) => !item.disabled)
            break
          case 'End':
            e.preventDefault()
            for (let i = items.length - 1; i >= 0; i--) {
              if (!items[i].disabled) {
                nextIndex = i
                break
              }
            }
            break
          case 'Enter':
          case ' ':
            e.preventDefault()
            handleSelect(items[index].value)
            return
          default:
            return
        }

        if (nextIndex >= 0 && nextIndex < items.length) {
          triggerRefs.current[nextIndex]?.focus()
          handleSelect(items[nextIndex].value)
        }
      },
      [items, findNextEnabled, handleSelect]
    )

    const panels = children as React.ReactElement<TabPanelProps>[]
    const activePanel = panels.find((panel) => panel.props.value === selectedValue)

    return (
      <div
        ref={ref}
        className={cn(tabsVariants({}), className)}
        data-state={dataAttr(selectedValue)}
        {...props}
      >
        <div className="nothing-tabs__list" role="tablist">
          {items.map((item, index) => {
            const isActive = item.value === selectedValue
            const tabId = `${baseId}-tab-${item.value}`
            const panelId = `${baseId}-panel-${item.value}`

            return (
              <button
                key={item.value}
                ref={(el) => {
                  triggerRefs.current[index] = el
                }}
                id={tabId}
                className={cn(tabTriggerVariants({ active: isActive, disabled: !!item.disabled }))}
                role="tab"
                aria-selected={isActive}
                aria-controls={panelId}
                tabIndex={isActive ? 0 : -1}
                disabled={item.disabled}
                onClick={() => !item.disabled && handleSelect(item.value)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                data-state={dataAttr(isActive ? 'active' : 'inactive')}
                data-disabled={dataAttr(item.disabled)}
              >
                {item.label}
              </button>
            )
          })}
          <div className="nothing-tabs__indicator" style={indicatorStyle} />
        </div>
        {activePanel && (
          <div
            id={`${baseId}-panel-${selectedValue}`}
            className="nothing-tabs__panel"
            role="tabpanel"
            aria-labelledby={`${baseId}-tab-${selectedValue}`}
            data-state={dataAttr('active')}
          >
            {activePanel.props.children}
          </div>
        )}
      </div>
    )
  }
)
Tabs.displayName = 'Tabs'

export { tabsVariants, tabTriggerVariants, TabPanel }
export default Tabs
