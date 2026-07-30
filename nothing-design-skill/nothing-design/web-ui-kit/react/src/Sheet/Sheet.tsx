import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '@/lib/utils'
import { Dialog as DialogPrimitive } from '@base-ui/react/dialog'
import './Sheet.css'

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
    ref,
  ) => {
    const [internalOpen, setInternalOpen] = React.useState(false)
    const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen

    const handleOpenChange = React.useCallback(
      (nextOpen: boolean) => {
        if (controlledOpen === undefined) {
          setInternalOpen(nextOpen)
        }
        onOpenChange?.(nextOpen)
      },
      [controlledOpen, onOpenChange],
    )

    const isBottomSheetMode = side === 'bottom' && Boolean(sections)

    return (
      <DialogPrimitive.Root open={isOpen} onOpenChange={handleOpenChange}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Backdrop
            className={cn(sheetBackdropVariants({ visible: isOpen }))}
            data-slot="sheet-backdrop"
            data-state={dataAttr(isOpen ? 'open' : 'closed')}
          />
          <DialogPrimitive.Popup
            ref={ref}
            className={cn(sheetVariants({ side, full }), className)}
            data-slot="sheet"
            data-state={dataAttr(isOpen ? 'open' : 'closed')}
            data-side={dataAttr(side)}
            aria-modal="true"
            {...props}
          >
            {isBottomSheetMode && (
              <div className="nothing-sheet__handle" aria-hidden="true">
                <div className="nothing-sheet__handle-bar" />
              </div>
            )}
            <div className="nothing-sheet__header">
              {title && <div className="nothing-sheet__title">{title}</div>}
              <DialogPrimitive.Close
                className={isBottomSheetMode ? 'nothing-sheet__dismiss' : 'nothing-sheet__close'}
                aria-label="Close"
                data-slot="sheet-close"
              >
                {isBottomSheetMode ? 'Done' : '×'}
              </DialogPrimitive.Close>
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
          </DialogPrimitive.Popup>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    )
  },
)
Sheet.displayName = 'Sheet'

export { sheetVariants, sheetBackdropVariants }
export default Sheet
