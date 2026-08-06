import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import { toastLabelVariants, toastVariants, type ToastSeverity } from './toast-variants'

export interface ToastProps extends Omit<React.ComponentPropsWithRef<'div'>, 'children'> {
  /** 语义严重度，决定左侧粗边与 bracket 文案的颜色。 */
  severity?: ToastSeverity
  /** 消息文案。 */
  children: React.ReactNode
  /** bracket 文案，如 `SAVED` / `ERROR`，渲染为 `[ LABEL ]`。 */
  label?: string
  /** 关闭按钮回调；传入后才渲染关闭按钮。 */
  onDismiss?: () => void
  /**
   * 自动触发 `onDismiss` 的毫秒数。`0`（默认）= 不自动消失，由调用方控制挂载/卸载。
   * 大于 0 时到点调用 `onDismiss`，但组件不会自己卸载——卸载与否仍由调用方决定。
   */
  duration?: number
}

export function Toast({
  severity = 'info',
  label,
  onDismiss,
  duration = 0,
  className,
  children,
  ...props
}: ToastProps) {
  React.useEffect(() => {
    if (!onDismiss || !duration || duration <= 0) return
    const timer = setTimeout(onDismiss, duration)
    return () => clearTimeout(timer)
  }, [onDismiss, duration])

  return (
    <div
      className={cn(toastVariants({ severity }), className)}
      role="status"
      data-slot="toast"
      data-placement="inline"
      data-severity={dataAttr(severity)}
      {...props}
    >
      {label && (
        <span data-slot="toast-label" className={cn(toastLabelVariants({ severity }))}>
          [ {label} ]
        </span>
      )}
      <div data-slot="toast-message" className="min-w-0 flex-1 break-words">
        {children}
      </div>
      {onDismiss && (
        <button
          type="button"
          data-slot="toast-dismiss"
          className={cn(
            'inline-flex size-5 shrink-0 cursor-pointer items-center justify-center',
            '-mt-0.5 -me-0.5 border-none bg-transparent p-0 text-foreground-muted',
            'transition-[color,transform] duration-200 ease-nothing motion-reduce:transition-none',
            'hover:scale-110 hover:text-foreground motion-reduce:hover:scale-100',
            'outline-none focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2',
          )}
          onClick={onDismiss}
          aria-label="Dismiss notification / 关闭通知"
        >
          <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
            className="size-3.5"
          >
            <path d="M4 4l8 8M12 4l-8 8" />
          </svg>
        </button>
      )}
    </div>
  )
}

Toast.displayName = 'Toast'

export { toastVariants, toastLabelVariants }
export default Toast
