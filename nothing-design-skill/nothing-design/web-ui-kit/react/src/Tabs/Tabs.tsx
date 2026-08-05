import * as React from 'react'
import { Tabs as TabsPrimitive } from '@base-ui/react/tabs'
import { cn, dataAttr } from '@/lib/utils'
import { useProximityHover } from '@/hooks/useProximityHover'
import {
  tabsHoverBackgroundVariants,
  tabsIndicatorVariants,
  tabsListVariants,
  tabsPanelVariants,
  tabsVariants,
  tabTriggerVariants,
  type TabsIndicator,
  type TabsVariant,
} from './tabs-variants'

export interface TabItem {
  value: string
  label: string
  disabled?: boolean
}

export interface TabPanelProps {
  value: string
  children: React.ReactNode
}

export interface TabsProps extends Omit<
  React.ComponentPropsWithRef<'div'>,
  'onChange' | 'value' | 'defaultValue'
> {
  items: TabItem[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  /** 视觉形态。 */
  variant?: TabsVariant
  /** 选中态的表达方式。 */
  indicator?: TabsIndicator
  /**
   * 是否启用 proximity hover 背景预览。
   * @default true
   */
  enableProximityHover?: boolean
}

/**
 * 把「相对容器左边缘的物理偏移」换算成 inline-start 偏移。
 * 浏览器测量 API 只给物理坐标，RTL 下必须翻面才能配合 `inset-inline-start`。
 */
function toInlineStart(container: HTMLElement | null, physicalLeft: number, width: number): number {
  if (!container) return physicalLeft
  if (getComputedStyle(container).direction !== 'rtl') return physicalLeft
  return container.clientWidth - physicalLeft - width
}

const TabPanel: React.FC<TabPanelProps> = () => null

export function Tabs({
  className,
  items,
  value: controlledValue,
  defaultValue,
  onValueChange,
  variant = 'default',
  indicator = 'line',
  enableProximityHover = true,
  children,
  ...props
}: TabsProps) {
  const listRef = React.useRef<HTMLDivElement>(null)
  const [indicatorStyle, setIndicatorStyle] = React.useState<React.CSSProperties>({})
  const [hoverStyle, setHoverStyle] = React.useState<React.CSSProperties>({})

  const {
    activeIndex: hoveredIndex,
    registerItem,
    handlers,
  } = useProximityHover(listRef, {
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
        setIndicatorStyle((prev) => (prev.opacity === 0 ? prev : { opacity: 0 }))
        return
      }
      const width = activeTabPosition.right - activeTabPosition.left
      const insetInlineStart = toInlineStart(listRef.current, activeTabPosition.left, width)
      setIndicatorStyle((prev) =>
        prev.insetInlineStart === insetInlineStart && prev.width === width && prev.opacity === 1
          ? prev
          : { insetInlineStart, width, opacity: 1 },
      )
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
      insetInlineStart: toInlineStart(listRef.current, rect.left - listRect.left, rect.width),
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
        className={tabsListVariants({ variant })}
        data-slot="tabs-list"
        activateOnFocus
        {...handlers}
      >
        {enableProximityHover && indicator !== 'background' && (
          <span
            className={tabsHoverBackgroundVariants()}
            data-slot="tabs-hover-background"
            style={hoverStyle}
            aria-hidden="true"
          />
        )}
        {indicator === 'line' && (
          <TabsPrimitive.Indicator
            className={tabsIndicatorVariants({ variant })}
            renderBeforeHydration
            render={(indicatorProps, state) => {
              updateIndicator(state.activeTabPosition)
              return (
                <span
                  {...indicatorProps}
                  style={{ ...indicatorProps.style, ...indicatorStyle }}
                  data-slot="tabs-indicator"
                />
              )
            }}
          />
        )}
        {/*
          id 与 aria-controls 一概不手写：Base UI 自己会把 tab 和 panel 两头的 id
          对上。之前手工拼了一个 `${baseId}-panel-${value}` 覆盖上去，而 panel 用的
          还是 Base UI 生成的那个，结果 aria-controls 指向一个不存在的元素。
        */}
        {items.map((item, index) => (
          <TabsPrimitive.Tab
            key={item.value}
            value={item.value}
            disabled={item.disabled}
            className={(state) =>
              cn(
                tabTriggerVariants({
                  variant,
                  active: state.active,
                  disabled: state.disabled,
                }),
              )
            }
            data-tab-index={index}
            ref={(el) => {
              registerItem(index, el as HTMLElement | null)
            }}
            // data-state 必须取自 Base UI 的实际状态。原先拿 `controlledValue` 比，
            // 非受控用法下它永远是 undefined，于是每个 tab 都恒为 inactive。
            render={(tabProps, state) => (
              <button
                {...tabProps}
                data-slot="tabs-trigger"
                data-state={dataAttr(state.active ? 'active' : 'inactive')}
                data-disabled={dataAttr(item.disabled)}
              >
                {item.label}
              </button>
            )}
          />
        ))}
      </TabsPrimitive.List>
      {panels.map((panel) => (
        <TabsPrimitive.Panel
          key={panel.props.value}
          value={panel.props.value}
          className={tabsPanelVariants()}
          data-slot="tabs-panel"
        >
          {panel.props.children}
        </TabsPrimitive.Panel>
      ))}
    </TabsPrimitive.Root>
  )
}

Tabs.displayName = 'Tabs'

export {
  tabsHoverBackgroundVariants,
  tabsIndicatorVariants,
  tabsListVariants,
  tabsPanelVariants,
  tabsVariants,
  tabTriggerVariants,
  TabPanel,
}
export type { TabsIndicator, TabsVariant }
export default Tabs
