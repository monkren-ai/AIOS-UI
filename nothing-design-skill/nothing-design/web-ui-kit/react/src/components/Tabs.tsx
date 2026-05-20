import { useState, useRef, useEffect, useCallback, useId } from 'react'
import '../styles/tabs.css'

interface TabItem {
  value: string
  label: string
  disabled?: boolean
}

interface TabsProps {
  items: TabItem[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  children: React.ReactNode
  style?: React.CSSProperties
}

interface TabPanelProps {
  value: string
  children: React.ReactNode
}

const TabPanel: React.FC<TabPanelProps> = () => {
  return null
}

const Tabs: React.FC<TabsProps> = ({
  items,
  value: controlledValue,
  defaultValue,
  onValueChange,
  children,
  style
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue ?? items[0]?.value ?? '')
  const selectedValue = controlledValue !== undefined ? controlledValue : internalValue
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({})
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([])
  const baseId = useId()

  useEffect(() => {
    const activeIndex = items.findIndex(item => item.value === selectedValue)
    const activeTrigger = triggerRefs.current[activeIndex]
    if (activeTrigger) {
      setIndicatorStyle({
        width: activeTrigger.offsetWidth,
        left: activeTrigger.offsetLeft
      })
    }
  }, [selectedValue, items])

  const handleSelect = useCallback((itemValue: string) => {
    if (controlledValue === undefined) {
      setInternalValue(itemValue)
    }
    onValueChange?.(itemValue)
  }, [controlledValue, onValueChange])

  const handleKeyDown = useCallback((e: React.KeyboardEvent, index: number) => {
    const enabledItems = items.filter(item => !item.disabled)
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
        nextIndex = items.findIndex(item => !item.disabled)
        break
      case 'End':
        e.preventDefault()
        for (let i = items.length - 1; i >= 0; i--) {
          if (!items[i].disabled) { nextIndex = i; break }
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
  }, [items, handleSelect])

  const findNextEnabled = (currentIndex: number, direction: number): number => {
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
  }

  const panels = children as React.ReactElement<TabPanelProps>[]
  const activePanel = panels.find(panel => panel.props.value === selectedValue)

  return (
    <div className="nothing-tabs" style={style}>
      <div className="nothing-tabs__list" role="tablist">
        {items.map((item, index) => {
          const isActive = item.value === selectedValue
          const tabId = `${baseId}-tab-${item.value}`
          const panelId = `${baseId}-panel-${item.value}`

          const triggerClassNames = [
            'nothing-tabs__trigger',
            isActive ? 'nothing-tabs__trigger--active' : '',
            item.disabled ? 'nothing-tabs__trigger--disabled' : ''
          ].filter(Boolean).join(' ')

          return (
            <button
              key={item.value}
              ref={el => { triggerRefs.current[index] = el }}
              id={tabId}
              className={triggerClassNames}
              role="tab"
              aria-selected={isActive}
              aria-controls={panelId}
              tabIndex={isActive ? 0 : -1}
              disabled={item.disabled}
              onClick={() => !item.disabled && handleSelect(item.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            >
              {item.label}
            </button>
          )
        })}
        <div
          className="nothing-tabs__indicator"
          style={indicatorStyle}
        />
      </div>
      {activePanel && (
        <div
          id={`${baseId}-panel-${selectedValue}`}
          className="nothing-tabs__panel"
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${selectedValue}`}
        >
          {activePanel.props.children}
        </div>
      )}
    </div>
  )
}

export { Tabs, TabPanel }
export default Tabs
