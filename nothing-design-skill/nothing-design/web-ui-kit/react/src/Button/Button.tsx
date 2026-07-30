import * as React from 'react'
import { Button as BaseButton } from '@base-ui/react/button'
import { type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '@/lib/utils'
import { buttonVariants } from './button-variants'
import './Button.css'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    loading?: boolean
    loadingText?: string
    leadingIcon?: React.ReactNode
    trailingIcon?: React.ReactNode
    active?: boolean
  }

export const Button = React.forwardRef<HTMLElement, ButtonProps>(
  (
    {
      variant,
      size,
      fullWidth,
      className,
      loading = false,
      loadingText,
      leadingIcon,
      trailingIcon,
      active,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading
    return (
      <BaseButton
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth, loading }), className)}
        data-slot="button"
        data-variant={dataAttr(variant)}
        data-size={dataAttr(size)}
        data-loading={dataAttr(loading)}
        data-active={dataAttr(active)}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        aria-pressed={active || undefined}
        {...props}
      >
        {loading && (
          <span className="nothing-btn__spinner" aria-hidden="true">
            <svg viewBox="0 0 16 16" width="14" height="14">
              <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="28 10" />
            </svg>
          </span>
        )}
        {!loading && leadingIcon && (
          <span className="nothing-btn__icon nothing-btn__icon--leading" aria-hidden="true">
            {leadingIcon}
          </span>
        )}
        <span className="nothing-btn__content" data-loading={dataAttr(loading)}>
          {loading && loadingText ? loadingText : children}
        </span>
        {!loading && trailingIcon && (
          <span className="nothing-btn__icon nothing-btn__icon--trailing" aria-hidden="true">
            {trailingIcon}
          </span>
        )}
      </BaseButton>
    )
  },
)
Button.displayName = 'Button'

export default Button
