import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '@/lib/utils'
import './Button.css'

export const buttonVariants = cva('nothing-btn', {
  variants: {
    variant: {
      primary: 'nothing-btn--primary',
      secondary: 'nothing-btn--secondary',
      ghost: 'nothing-btn--ghost',
      destructive: 'nothing-btn--destructive',
    },
    size: {
      default: '',
      sm: 'nothing-btn--sm',
      lg: 'nothing-btn--lg',
    },
    fullWidth: {
      true: 'nothing-btn--full',
      false: '',
    },
    loading: {
      true: 'nothing-btn--loading',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'default',
    fullWidth: false,
    loading: false,
  },
})

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    loading?: boolean
    loadingText?: string
  }

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, fullWidth, className, loading = false, loadingText, disabled, children, ...props }, ref) => {
    const isDisabled = disabled || loading
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth, loading }), className)}
        data-variant={dataAttr(variant)}
        data-size={dataAttr(size)}
        data-loading={dataAttr(loading)}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading && (
          <span className="nothing-btn__spinner" aria-hidden="true">
            <svg viewBox="0 0 16 16" width="14" height="14">
              <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="28 10" />
            </svg>
          </span>
        )}
        <span className="nothing-btn__content" data-loading={dataAttr(loading)}>
          {loading && loadingText ? loadingText : children}
        </span>
      </button>
    )
  },
)
Button.displayName = 'Button'

export default Button
