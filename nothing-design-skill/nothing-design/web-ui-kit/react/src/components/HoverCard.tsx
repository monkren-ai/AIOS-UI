import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '../lib/utils'
import { useFloating } from '../hooks'
import { useOverlayState, OverlayPortal } from '../ui/OverlayPortal'
import '../styles/hover-card.css'

const hoverCardContentVariants = cva('nothing-hover-card__content', {
  variants: {
    visible: { true: 'nothing-hover-card__content--visible', false: '' },
    side: {
      top: 'nothing-hover-card__content--top',
      bottom: 'nothing-hover-card__content--bottom',
    },
  },
  defaultVariants: { visible: false, side: 'bottom' },
})

export interface HoverCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'content'>,
    VariantProps<typeof hoverCardContentVariants> {
  content: React.ReactNode
  side?: 'top' | 'bottom'
  delay?: number
  children: React.ReactElement
}

export const HoverCard = React.forwardRef<HTMLDivElement, HoverCardProps>(
  ({ className, content, side = 'bottom', delay = 300, visible: _visible, children, ...props }, ref) => {
    const { isOpen, setOpen } = useOverlayState(undefined)
    const triggerRef = React.useRef<HTMLElement | null>(null)
    const contentRef = React.useRef<HTMLDivElement | null>(null)
    const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
    const hoverCardId = React.useId()
    const { style, update } = useFloating(side)

    const setContainerRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        contentRef.current = node
        if (typeof ref === 'function') ref(node)
        else if (ref && 'current' in ref) {
          ;(ref as React.MutableRefObject<HTMLDivElement | null>).current = node
        }
      },
      [ref]
    )

    const show = React.useCallback(() => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
        setOpen(true)
      }, delay)
    }, [delay, setOpen])

    const hide = React.useCallback(() => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      setOpen(false)
    }, [setOpen])

    React.useEffect(() => {
      if (isOpen && triggerRef.current && contentRef.current) {
        update(triggerRef.current, contentRef.current)
      }
    }, [isOpen, update])

    React.useEffect(() => {
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
      }
    }, [])

    return (
      <div
        className={cn('nothing-hover-card', className)}
        data-state={dataAttr(isOpen ? 'visible' : 'hidden')}
        {...props}
      >
        <span
          className="nothing-hover-card__trigger"
          ref={triggerRef}
          onMouseEnter={show}
          onMouseLeave={hide}
          onFocus={show}
          onBlur={hide}
          aria-describedby={hoverCardId}
        >
          {children}
        </span>
        <OverlayPortal open={isOpen}>
          <div
            ref={setContainerRefs}
            className={cn(hoverCardContentVariants({ visible: isOpen, side }))}
            id={hoverCardId}
            style={style}
            onMouseEnter={show}
            onMouseLeave={hide}
            data-state={dataAttr(isOpen ? 'visible' : 'hidden')}
            data-side={dataAttr(side)}
          >
            {content}
          </div>
        </OverlayPortal>
      </div>
    )
  }
)
HoverCard.displayName = 'HoverCard'

export { hoverCardContentVariants }
export default HoverCard
