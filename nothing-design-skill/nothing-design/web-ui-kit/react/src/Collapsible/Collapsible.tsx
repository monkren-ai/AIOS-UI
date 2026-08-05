import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import {
  collapsibleContentInnerVariants,
  collapsibleContentVariants,
  collapsibleTriggerVariants,
  collapsibleVariants,
} from './collapsible-variants'

export type CollapsibleProps = Omit<React.ComponentPropsWithRef<'div'>, 'onToggle'> & {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  trigger: React.ReactNode
  children?: React.ReactNode
}

export function Collapsible({
  className,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  trigger,
  children,
  ...props
}: CollapsibleProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen
  const state = isOpen ? 'open' : 'closed'
  const baseId = React.useId()
  const triggerId = `${baseId}-trigger`
  const contentId = `${baseId}-content`

  const handleToggle = React.useCallback(() => {
    const next = !isOpen
    if (controlledOpen === undefined) {
      setInternalOpen(next)
    }
    onOpenChange?.(next)
  }, [isOpen, controlledOpen, onOpenChange])

  return (
    <div
      className={cn(collapsibleVariants({ open: isOpen }), className)}
      data-slot="collapsible"
      data-state={dataAttr(state)}
      {...props}
    >
      <button
        id={triggerId}
        className={collapsibleTriggerVariants()}
        data-slot="collapsible-trigger"
        data-state={dataAttr(state)}
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={handleToggle}
        type="button"
      >
        {trigger}
      </button>
      {/*
        收起态用 `visibility: hidden` + `inert` 而不是 `hidden` 属性：
        `display: none` 会让 max-height 过渡无从发生，而 visibility 是可过渡属性——
        关闭时它撑到过渡结束才生效，动画照常，同时把内容移出 tab 序列与可访问性树。
        写成内联样式是因为它必须先于任何样式表生效（测试环境不加载 Tailwind）。
      */}
      <div
        id={contentId}
        className={collapsibleContentVariants()}
        data-slot="collapsible-content"
        data-state={dataAttr(state)}
        style={isOpen ? undefined : { visibility: 'hidden' }}
        inert={!isOpen}
        role="region"
        aria-labelledby={triggerId}
      >
        <div className={collapsibleContentInnerVariants()} data-slot="collapsible-content-inner">
          {children}
        </div>
      </div>
    </div>
  )
}

Collapsible.displayName = 'Collapsible'

export {
  collapsibleVariants,
  collapsibleTriggerVariants,
  collapsibleContentVariants,
  collapsibleContentInnerVariants,
}
export default Collapsible
