import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '@/lib/utils'
import './Alert.css'

const alertVariants = cva('nothing-alert', {
  variants: {
    variant: {
      default: '',
      destructive: 'nothing-alert--destructive',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export type AlertProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof alertVariants> & {
    title?: string
    icon?: React.ReactNode
    onClose?: () => void
  }

const EXIT_DURATION = 220

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ variant, title, icon, onClose, className, children, ...props }, ref) => {
    const [exiting, setExiting] = React.useState(false)
    const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

    React.useEffect(() => {
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current)
      }
    }, [])

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
        ref={ref}
        className={cn(alertVariants({ variant }), exiting && 'nothing-alert--exiting', className)}
        role={variant === 'destructive' ? 'alert' : 'status'}
        data-variant={dataAttr(variant)}
        data-state={exiting ? 'exiting' : 'visible'}
        {...props}
      >
        {icon && (
          <div className="nothing-alert__icon" aria-hidden="true">
            {icon}
          </div>
        )}
        <div className="nothing-alert__content">
          {title && <div className="nothing-alert__title">{title}</div>}
          <div className="nothing-alert__message">{children}</div>
        </div>
        {onClose && (
          <button
            type="button"
            className="nothing-alert__close"
            onClick={handleClose}
            aria-label="Close alert"
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M4 4l8 8M12 4l-8 8" />
            </svg>
          </button>
        )}
      </div>
    )
  }
)
Alert.displayName = 'Alert'

export { Alert, alertVariants }
export default Alert
