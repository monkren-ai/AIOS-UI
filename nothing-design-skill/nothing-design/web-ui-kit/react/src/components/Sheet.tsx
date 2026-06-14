import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '../lib/utils'
import {
  OverlayPortal,
  useEscapeKey,
  useOverlayState,
  useScrollLock,
  useTabCycle,
} from '../ui/OverlayPortal'
import '../styles/sheet.css'

const sheetBackdropVariants = cva('nothing-sheet-backdrop', {
  variants: {
    visible: { true: 'nothing-sheet-backdrop--visible', false: '' },
  },
  defaultVariants: { visible: false },
})

const sheetVariants = cva('nothing-sheet', {
  variants: {
    side: {
      left: 'nothing-sheet--left',
      right: 'nothing-sheet--right',
      top: 'nothing-sheet--top',
      bottom: 'nothing-sheet--bottom',
    },
    visible: {
      left: 'nothing-sheet--visible-left',
      right: 'nothing-sheet--visible-right',
      top: 'nothing-sheet--visible-top',
      bottom: 'nothing-sheet--visible-bottom',
    },
    full: { true: 'nothing-sheet--full', false: '' },
  },
  defaultVariants: { side: 'right', full: false },
})

export interface SheetSection {
  title?: string
  content: React.ReactNode
}

export interface SheetProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    VariantProps<typeof sheetVariants> {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  side?: 'left' | 'right' | 'top' | 'bottom'
  title?: string
  full?: boolean
  sections?: SheetSection[]
  footer?: React.ReactNode
  children?: React.ReactNode
}

export const Sheet = React.forwardRef<HTMLDivElement, SheetProps>(
  (
    {
      className,
      open: controlledOpen,
      onOpenChange,
      side = 'right',
      title,
      full = false,
      sections,
      footer,
      children,
      ...props
    },
    ref
  ) => {
    const { isOpen, close } = useOverlayState(controlledOpen, onOpenChange)
    const { ref: sheetRef, onKeyDown: tabCycle } = useTabCycle<HTMLDivElement>(isOpen)
    useScrollLock(isOpen)
    useEscapeKey(isOpen, close)

    const setSheetRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        sheetRef.current = node
        if (typeof ref === 'function') ref(node)
        else if (ref && 'current' in ref) {
          ;(ref as React.MutableRefObject<HTMLDivElement | null>).current = node
        }
      },
      [ref, sheetRef]
    )

    const handleBackdropClick = () => {
      close()
    }

    const isBottomSheetMode = side === 'bottom' && sections

    const titleId = title ? 'nothing-sheet-title' : undefined

    return (
      <OverlayPortal open={isOpen}>
        <div
          className={cn(sheetBackdropVariants({ visible: isOpen }))}
          onClick={handleBackdropClick}
          aria-hidden="true"
          data-state={dataAttr(isOpen ? 'visible' : 'hidden')}
        />
        <div
          ref={setSheetRefs}
          className={cn(
            sheetVariants({
              side,
              visible: isOpen ? side : undefined,
              full,
            }),
            className
          )}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onKeyDown={tabCycle}
          data-state={dataAttr(isOpen ? 'open' : 'closed')}
          data-side={dataAttr(side)}
          {...props}
        >
          {isBottomSheetMode && (
            <div className="nothing-sheet__handle" aria-hidden="true">
              <div className="nothing-sheet__handle-bar" />
            </div>
          )}
          <div className="nothing-sheet__header">
            {title && (
              <div className="nothing-sheet__title" id={titleId}>
                {title}
              </div>
            )}
            <button
              className={isBottomSheetMode ? 'nothing-sheet__dismiss' : 'nothing-sheet__close'}
              onClick={close}
              aria-label="Close"
            >
              {isBottomSheetMode ? 'Done' : '×'}
            </button>
          </div>
          {sections ? (
            sections.map((section, index) => (
              <div key={index} className="nothing-sheet__section">
                {section.title && (
                  <div className="nothing-sheet__section-title">{section.title}</div>
                )}
                {section.content}
              </div>
            ))
          ) : (
            <div className="nothing-sheet__body">{children}</div>
          )}
          {footer && <div className="nothing-sheet__footer">{footer}</div>}
        </div>
      </OverlayPortal>
    )
  }
)
Sheet.displayName = 'Sheet'

export { sheetVariants, sheetBackdropVariants }
export default Sheet
