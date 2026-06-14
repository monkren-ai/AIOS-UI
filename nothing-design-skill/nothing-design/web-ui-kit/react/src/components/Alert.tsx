import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '../lib/utils'
import '../styles/alert.css'

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
  }

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ variant, title, icon, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(alertVariants({ variant }), className)}
        role={variant === 'destructive' ? 'alert' : 'status'}
        data-variant={dataAttr(variant)}
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
      </div>
    )
  }
)
Alert.displayName = 'Alert'

export { Alert, alertVariants }
export default Alert
