import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import {
  alertIconVariants,
  alertMessageVariants,
  alertTitleVariants,
  alertVariants,
  resolveAlertVariant,
  type AlertSize,
  type AlertVariant,
} from './alert-variants'

export interface AlertProps extends React.ComponentPropsWithRef<'div'> {
  /** 视觉样式。`destructive` 会把 role 提升到 `alert`。 */
  variant?: AlertVariant
  /** 内边距与字号。 */
  size?: AlertSize
  /** 标题行。 */
  title?: string
  /** 起始侧的图标。 */
  icon?: React.ReactNode
  /** 传入后渲染关闭按钮，退场动画结束才回调。 */
  onClose?: () => void
}

const EXIT_DURATION = 220

export function Alert({
  variant,
  size = 'md',
  title,
  icon,
  onClose,
  className,
  children,
  ...props
}: AlertProps) {
  const [exiting, setExiting] = React.useState(false)
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const resolvedVariant = (resolveAlertVariant(variant) ?? 'soft') as 'soft' | 'destructive'

  const handleClose = () => {
    if (exiting) return
    setExiting(true)
    timerRef.current = setTimeout(() => {
      onClose?.()
      setExiting(false)
    }, EXIT_DURATION)
  }

  return (
    <div
      className={cn(alertVariants({ variant: resolvedVariant, size }), className)}
      role={resolvedVariant === 'destructive' ? 'alert' : 'status'}
      data-slot="alert"
      data-variant={dataAttr(resolvedVariant)}
      data-size={dataAttr(size)}
      data-state={exiting ? 'exiting' : 'visible'}
      {...props}
    >
      {icon && (
        <div
          data-slot="alert-icon"
          aria-hidden="true"
          className={alertIconVariants({ variant: resolvedVariant })}
        >
          {icon}
        </div>
      )}
      <div data-slot="alert-content" className="flex min-w-0 flex-1 flex-col gap-1">
        {title && (
          <div data-slot="alert-title" className={alertTitleVariants({ variant: resolvedVariant })}>
            {title}
          </div>
        )}
        <div
          data-slot="alert-message"
          className={alertMessageVariants({ variant: resolvedVariant })}
        >
          {children}
        </div>
      </div>
      {onClose && (
        <button
          type="button"
          data-slot="alert-close"
          className={cn(
            'inline-flex size-5 shrink-0 cursor-pointer items-center justify-center',
            '-mt-0.5 -me-0.5 border-none bg-transparent p-0 text-foreground-muted',
            'transition-[color,transform] duration-200 ease-nothing motion-reduce:transition-none',
            'hover:text-foreground hover:scale-110 motion-reduce:hover:scale-100',
            'outline-none focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2',
          )}
          onClick={handleClose}
          aria-label="Close alert"
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

Alert.displayName = 'Alert'

export { alertVariants }
export default Alert
