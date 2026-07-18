import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '@/lib/utils'
import { useFloating } from '../hooks'
import './Tooltip.css'

const tooltipPopupVariants = cva('nothing-tooltip__popup', {
  variants: {
    visible: { true: 'nothing-tooltip__popup--visible', false: '' },
    side: {
      top: 'nothing-tooltip__popup--top',
      bottom: 'nothing-tooltip__popup--bottom',
      left: 'nothing-tooltip__popup--left',
      right: 'nothing-tooltip__popup--right',
    },
  },
  defaultVariants: { visible: false, side: 'top' },
})

export interface TooltipProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    VariantProps<typeof tooltipPopupVariants> {
  content: string
  side?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
  children: React.ReactElement
}

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  ({ className, content, side = 'top', delay = 300, children, ...props }, ref) => {
    const [visible, setVisible] = React.useState(false)
    const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
    const triggerRef = React.useRef<HTMLElement | null>(null)
    const internalPopupRef = React.useRef<HTMLDivElement | null>(null)
    const tooltipId = React.useId()
    const { style, update } = useFloating(side)

    const setRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        internalPopupRef.current = node
        if (typeof ref === 'function') ref(node)
        else if (ref && 'current' in ref) {
          ;(ref as React.MutableRefObject<HTMLDivElement | null>).current = node
        }
      },
      [ref]
    )

    const FOCUSABLE_TAGS = new Set(['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'])
    const childIsFocusable = (() => {
      if (!React.isValidElement(children)) return false
      const type = children.type as unknown
      // Native HTML elements: type is a lowercase string ('a', 'button', 'input', etc.)
      // Custom components: type is a function/class with optional .displayName
      const tagName = typeof type === 'string'
        ? type.toUpperCase()
        : (type as { displayName?: string })?.displayName || ''
      if (FOCUSABLE_TAGS.has(tagName)) return true
      // If child explicitly has tabIndex, treat as focusable
      return (children.props as { tabIndex?: number })?.tabIndex !== undefined
    })()

    // When child is focusable, pass aria-describedby via cloneElement
    // When child is not focusable, wrapper becomes the focus target (tabIndex=0)
    const triggerEl = React.isValidElement(children)
      ? React.cloneElement(
          children as React.ReactElement<Record<string, unknown>>,
          childIsFocusable && visible ? { 'aria-describedby': tooltipId } : {}
        )
      : children

    const show = React.useCallback(() => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
        setVisible(true)
      }, delay)
    }, [delay])

    const hide = React.useCallback(() => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      setVisible(false)
    }, [])

    React.useEffect(() => {
      if (visible && triggerRef.current && internalPopupRef.current) {
        update(triggerRef.current, internalPopupRef.current)
      }
    }, [visible, update])

    React.useEffect(() => {
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
      }
    }, [])

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
          hide()
        }
      },
      [hide]
    )

    return (
      <div className="nothing-tooltip" {...props}>
        <span
          className="nothing-tooltip__trigger"
          ref={triggerRef}
          onMouseEnter={show}
          onMouseLeave={hide}
          onFocus={show}
          onBlur={hide}
          onKeyDown={handleKeyDown}
          aria-describedby={!childIsFocusable && visible ? tooltipId : undefined}
          tabIndex={childIsFocusable ? undefined : 0}
        >
          {triggerEl}
        </span>
        <div
          ref={setRefs}
          className={cn(tooltipPopupVariants({ visible, side }), className)}
          role="tooltip"
          id={tooltipId}
          style={style}
          data-state={dataAttr(visible ? 'visible' : 'hidden')}
          data-side={dataAttr(side)}
        >
          {content}
        </div>
      </div>
    )
  }
)
Tooltip.displayName = 'Tooltip'

export { tooltipPopupVariants }
export default Tooltip
