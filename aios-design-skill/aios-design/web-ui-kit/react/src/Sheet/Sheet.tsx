import * as React from 'react'
import { type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '@/lib/utils'
import { Dialog as DialogPrimitive } from '@base-ui/react/dialog'
import {
  sheetBackdropVariants,
  sheetBodyVariants,
  sheetCloseVariants,
  sheetDismissVariants,
  sheetFooterVariants,
  sheetHandleBarVariants,
  sheetHandleVariants,
  sheetHeaderVariants,
  sheetSectionTitleVariants,
  sheetSectionVariants,
  sheetTitleVariants,
  sheetVariants,
} from './sheet-variants'

export interface SheetSection {
  title?: string
  content: React.ReactNode
}

export interface SheetProps
  extends Omit<React.ComponentPropsWithRef<'div'>, 'children'>, VariantProps<typeof sheetVariants> {
  /**
   * 必填。Sheet 自己不渲染触发器，也没有任何内部路径能把它从关闭翻成打开——
   * 开合完全由调用方掌握。类型上做成可选的话，忘了传就是「静默不渲染」，最难查。
   */
  open: boolean
  onOpenChange?: (open: boolean) => void
  side?: 'left' | 'right' | 'top' | 'bottom'
  title?: string
  full?: boolean
  sections?: SheetSection[]
  footer?: React.ReactNode
  children?: React.ReactNode
}

export function Sheet({
  className,
  open: isOpen,
  onOpenChange,
  side = 'right',
  title,
  full = false,
  sections,
  footer,
  children,
  ref,
  ...props
}: SheetProps) {
  const handleOpenChange = React.useCallback(
    (nextOpen: boolean) => {
      onOpenChange?.(nextOpen)
    },
    [onOpenChange],
  )

  const isBottomSheetMode = side === 'bottom' && Boolean(sections)

  // 抽屉本身要有名字，否则读屏只会报一句「对话框」。标题走 `Dialog.Title` 才会
  // 被 Base UI 接进 `aria-labelledby`；调用方自己传了名字就不要覆盖。
  const hasOwnLabel = Boolean(props['aria-label'] || props['aria-labelledby'])

  if (import.meta.env.DEV && isOpen && !title && !hasOwnLabel) {
    console.warn(
      '[Sheet] 这个抽屉没有可访问名称，读屏会把它念成一个无名的“对话框”。' +
        '传 `title`，或者自己给一个 `aria-label` / `aria-labelledby`。',
    )
  }

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
          data-full={dataAttr(full)}
          aria-modal="true"
          {...props}
        >
          {isBottomSheetMode && (
            <div className={cn(sheetHandleVariants())} data-slot="sheet-handle" aria-hidden="true">
              <div className={cn(sheetHandleBarVariants())} data-slot="sheet-handle-bar" />
            </div>
          )}
          <div className={cn(sheetHeaderVariants())} data-slot="sheet-header">
            {title && (
              <DialogPrimitive.Title
                className={cn(sheetTitleVariants())}
                data-slot="sheet-title"
                render={<div />}
              >
                {title}
              </DialogPrimitive.Title>
            )}
            <DialogPrimitive.Close
              className={cn(isBottomSheetMode ? sheetDismissVariants() : sheetCloseVariants())}
              // 底部抽屉的按钮上写着 Done，读屏却念 Close，等于屏幕和语音说的是
              // 两个按钮。`×` 没有可读文本，才需要补名字。
              aria-label={isBottomSheetMode ? undefined : 'Close'}
              data-slot="sheet-close"
            >
              {isBottomSheetMode ? 'Done' : '×'}
            </DialogPrimitive.Close>
          </div>
          {sections ? (
            sections.map((section, index) => (
              <div
                key={index}
                className={cn(sheetSectionVariants({ spaced: index > 0 }))}
                data-slot="sheet-section"
              >
                {section.title && (
                  <div className={cn(sheetSectionTitleVariants())} data-slot="sheet-section-title">
                    {section.title}
                  </div>
                )}
                {section.content}
              </div>
            ))
          ) : (
            <div className={cn(sheetBodyVariants())} data-slot="sheet-body">
              {children}
            </div>
          )}
          {footer && (
            <div className={cn(sheetFooterVariants())} data-slot="sheet-footer">
              {footer}
            </div>
          )}
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}

Sheet.displayName = 'Sheet'

export {
  sheetBackdropVariants,
  sheetBodyVariants,
  sheetCloseVariants,
  sheetDismissVariants,
  sheetFooterVariants,
  sheetHandleBarVariants,
  sheetHandleVariants,
  sheetHeaderVariants,
  sheetSectionTitleVariants,
  sheetSectionVariants,
  sheetTitleVariants,
  sheetVariants,
}
export default Sheet
