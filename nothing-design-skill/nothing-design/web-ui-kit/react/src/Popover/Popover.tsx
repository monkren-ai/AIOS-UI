import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '@/lib/utils'
import { useFloating } from '../hooks'
import { useEscapeKey, useOverlayState, OverlayPortal, type OverlaySide } from '@/ui/OverlayPortal'
import './Popover.css'

const popoverContentVariants = cva('nothing-popover__content', {
  variants: {
    visible: { true: 'nothing-popover__content--visible', false: '' },
    side: {
      top: 'nothing-popover__content--top',
      bottom: 'nothing-popover__content--bottom',
      left: 'nothing-popover__content--left',
      right: 'nothing-popover__content--right',
    },
  },
  defaultVariants: { visible: false, side: 'bottom' },
})

export interface PopoverProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'content'>,
    VariantProps<typeof popoverContentVariants> {
  content: React.ReactNode
  side?: OverlaySide
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactElement
}

export const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(
  (
    {
      className,
      content,
      side = 'bottom',
      open: controlledOpen,
      onOpenChange,
      visible: _visible,
      children,
      ...props
    },
    ref
  ) => {
    const { isOpen, setOpen } = useOverlayState(controlledOpen, onOpenChange)
    const triggerRef = React.useRef<HTMLElement | null>(null)
    const contentRef = React.useRef<HTMLDivElement | null>(null)
    const containerRef = React.useRef<HTMLDivElement | null>(null)
    const popoverId = React.useId()
    const { style, update } = useFloating(side)

    const setContainerRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        containerRef.current = node
        if (typeof ref === 'function') ref(node)
        else if (ref && 'current' in ref) {
          ;(ref as React.MutableRefObject<HTMLDivElement | null>).current = node
        }
      },
      [ref]
    )

    // Click outside covers both the trigger container AND the portaled content
    // (content lives in document.body after portal, so containerRef alone is not enough).
    React.useEffect(() => {
      if (!isOpen) return
      const handler = (event: MouseEvent | TouchEvent) => {
        const target = event.target as Node | null
        if (!target) return
        if (containerRef.current?.contains(target)) return
        if (contentRef.current?.contains(target)) return
        setOpen(false)
      }
      document.addEventListener('mousedown', handler)
      document.addEventListener('touchstart', handler)
      return () => {
        document.removeEventListener('mousedown', handler)
        document.removeEventListener('touchstart', handler)
      }
    }, [isOpen, setOpen])

    useEscapeKey(isOpen, () => {
      setOpen(false)
      triggerRef.current?.focus()
    })

    React.useEffect(() => {
      if (isOpen && triggerRef.current && contentRef.current) {
        update(triggerRef.current, contentRef.current)
      }
    }, [isOpen, update])

    return (
      <div
        ref={setContainerRefs}
        className={cn('nothing-popover', className)}
        data-state={dataAttr(isOpen ? 'open' : 'closed')}
        {...props}
      >
        <span
          className="nothing-popover__trigger"
          ref={triggerRef}
          onClick={() => setOpen(!isOpen)}
          aria-haspopup={true}
          aria-expanded={isOpen}
          aria-controls={popoverId}
        >
          {children}
        </span>
        <OverlayPortal open={isOpen}>
          <div
            ref={contentRef}
            className={cn(popoverContentVariants({ visible: isOpen, side }))}
            role="dialog"
            id={popoverId}
            style={style}
            data-state={dataAttr(isOpen ? 'open' : 'closed')}
            data-side={dataAttr(side)}
          >
            {content}
          </div>
        </OverlayPortal>
      </div>
    )
  }
)
Popover.displayName = 'Popover'

export { popoverContentVariants }
export default Popover
