import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Tabs as TabsPrimitive } from '@base-ui/react/tabs'
import { cn, dataAttr } from '@/lib/utils'
import { useProximityHover } from '@/hooks/useProximityHover'
import './Tabs.css'

const tabsVariants = cva('nothing-tabs', {
  variants: {
    variant: {
      default: 'nothing-tabs--default',
      pills: 'nothing-tabs--pills',
      subtle: 'nothing-tabs--subtle',
    },
    indicator: {
      line: 'nothing-tabs--indicator-line',
      background: 'nothing-tabs--indicator-background',
      none: 'nothing-tabs--indicator-none',
    },
  },
  defaultVariants: {
    variant: 'default',
    indicator: 'line',
  },
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

export interface TabPanelProps {
  value: string
  children: React.ReactNode
}

export interface TabsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'value' | 'defaultValue'>,
    VariantProps<typeof tabsVariants> {
  items: TabItem[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  /**
   * 是否启用 proximity hover 背景预览。
   * @default true
   */
  enableProximityHover?: boolean
}

const TabPanel: React.FC<TabPanelProps> = () => null

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      className,
      items,
      value: controlledValue,
      defaultValue,
      onValueChange,
      variant,
      indicator,
      enableProximityHover = true,
      children,
      ...props
    },
    ref,
  ) => {
    const baseId = React.useId()
    const listRef = React.useRef<HTMLDivElement>(null)
    const [indicatorStyle, setIndicatorStyle] = React.useState<React.CSSProperties>({})
    const [hoverStyle, setHoverStyle] = React.useState<React.CSSProperties>({})

    const { activeIndex: hoveredIndex, registerItem, handlers } = useProximityHover(listRef, {
      axis: 'x',
    })

    const handleValueChange = React.useCallback(
      (value: string) => {
        onValueChange?.(value)
      },
      [onValueChange],
    )

    const updateIndicator = React.useCallback(
      (activeTabPosition: { left: number; right: number; top: number; bottom: number } | null) => {
        if (!activeTabPosition) {
          setIndicatorStyle({ opacity: 0 })
          return
        }
        const width = activeTabPosition.right - activeTabPosition.left
        setIndicatorStyle({
          left: activeTabPosition.left,
          width,
          opacity: 1,
        })
      },
      [],
    )

    React.useEffect(() => {
      if (!enableProximityHover) return
      if (hoveredIndex == null || !items[hoveredIndex]) {
        setHoverStyle({ opacity: 0 })
        return
      }
      const element = listRef.current?.querySelector(`[data-tab-index="${hoveredIndex}"]`)
      if (!element) return
      const rect = element.getBoundingClientRect()
      const listRect = listRef.current?.getBoundingClientRect()
      if (!listRect) return
      setHoverStyle({
        left: rect.left - listRect.left,
        width: rect.width,
        opacity: 0.5,
      })
    }, [hoveredIndex, enableProximityHover, items])

    const panels = React.useMemo(() => {
      const arr = children ? (Array.isArray(children) ? children : [children]) : []
      return arr.filter(
        (panel): panel is React.ReactElement<TabPanelProps> =>
          React.isValidElement(panel) && (panel.props as TabPanelProps).value !== undefined,
      )
    }, [children])

    return (
      <TabsPrimitive.Root
        ref={ref}
        className={cn(tabsVariants({ variant, indicator }), className)}
        data-slot="tabs"
        data-variant={dataAttr(variant)}
        data-indicator={dataAttr(indicator)}
        value={controlledValue}
        defaultValue={defaultValue}
        onValueChange={handleValueChange}
        {...props}
      >
        <TabsPrimitive.List
          ref={listRef}
          className="nothing-tabs__list"
          activateOnFocus
          {...handlers}
        >
          {enableProximityHover && indicator !== 'background' && (
            <span className="nothing-tabs__hover-bg" style={hoverStyle} aria-hidden="true" />
          )}
          {indicator === 'line' && (
            <TabsPrimitive.Indicator
              className="nothing-tabs__indicator"
              renderBeforeHydration
              render={(_props, state) => {
                updateIndicator(state.activeTabPosition)
                return (
                  <span
                    {..._props}
                    style={{ ..._props.style, ...indicatorStyle }}
                    data-slot="tabs-indicator"
                  />
                )
              }}
            />
          )}
          {items.map((item, index) => {
            const tabId = `${baseId}-tab-${item.value}`
            const panelId = `${baseId}-panel-${item.value}`

            return (
              <TabsPrimitive.Tab
                key={item.value}
                value={item.value}
                disabled={item.disabled}
                id={tabId}
                className={(state) =>
                  cn(
                    tabTriggerVariants({
                      active: state.active,
                      disabled: state.disabled,
                    }),
                  )
                }
                data-tab-index={index}
                ref={(el) => {
                  registerItem(index, el as HTMLElement | null)
                }}
                aria-controls={panelId}
                data-slot="tabs-trigger"
                data-state={dataAttr(item.value === controlledValue ? 'active' : 'inactive')}
                data-disabled={dataAttr(item.disabled)}
              >
                {item.label}
              </TabsPrimitive.Tab>
            )
          })}
        </TabsPrimitive.List>
        {panels.map((panel) => (
          <TabsPrimitive.Panel
            key={panel.props.value}
            value={panel.props.value}
            className="nothing-tabs__panel"
            data-slot="tabs-panel"
          >
            {panel.props.children}
          </TabsPrimitive.Panel>
        ))}
      </TabsPrimitive.Root>
    )
  },
)
Tabs.displayName = 'Tabs'

export { tabsVariants, tabTriggerVariants, TabPanel }
export default Tabs
