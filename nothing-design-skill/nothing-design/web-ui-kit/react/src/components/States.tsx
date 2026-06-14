import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '../lib/utils'
import '../styles/states.css'

const stateVariants = cva('nothing-state', {
  variants: {
    variant: {
      loading: 'nothing-state--loading',
      error: 'nothing-state--error',
      empty: 'nothing-state--empty',
      disabled: 'nothing-state--disabled',
    },
    size: {
      sm: 'nothing-state--sm',
      md: 'nothing-state--md',
      lg: 'nothing-state--lg',
    },
  },
  defaultVariants: { variant: 'loading', size: 'md' },
})

const loadingSegmentVariants = cva('nothing-state__loading-segment', {
  variants: {
    filled: { true: 'nothing-state__loading-segment--filled', false: '' },
  },
  defaultVariants: { filled: false },
})

export interface LoadingStateProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    Omit<VariantProps<typeof stateVariants>, 'variant'> {
  progress?: number
  totalSegments?: number
  label?: string
}

export const LoadingState = React.forwardRef<HTMLDivElement, LoadingStateProps>(
  ({ className, progress, totalSegments = 20, label, size = 'md', style, ...props }, ref) => {
    const filledSegments = progress !== undefined
      ? Math.round((progress / 100) * totalSegments)
      : 0

    return (
      <div
        ref={ref}
        className={cn(stateVariants({ variant: 'loading', size }), className)}
        style={style}
        role="status"
        aria-live="polite"
        data-state={dataAttr('loading')}
        {...props}
      >
        <div className="nothing-state__spinner">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="nothing-state__spinner-segment" />
          ))}
        </div>
        {progress !== undefined && (
          <>
            <div className="nothing-state__loading-bar">
              {Array.from({ length: totalSegments }).map((_, i) => (
                <div
                  key={i}
                  className={cn(loadingSegmentVariants({ filled: i < filledSegments }))}
                />
              ))}
            </div>
            <div className="nothing-state__percentage">{progress}%</div>
          </>
        )}
        {label && <div className="nothing-state__bracket-text">[ {label} ]</div>}
      </div>
    )
  }
)
LoadingState.displayName = 'LoadingState'

export interface ErrorStateProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'onClick'>,
    Omit<VariantProps<typeof stateVariants>, 'variant'> {
  headline: string
  message?: string
  prefix?: string
  onRetry?: () => void
}

export const ErrorState = React.forwardRef<HTMLDivElement, ErrorStateProps>(
  ({ className, headline, message, prefix, onRetry, size = 'md', style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(stateVariants({ variant: 'error', size }), className)}
        style={style}
        role="alert"
        data-state={dataAttr('error')}
        {...props}
      >
        <div className="nothing-state__headline">
          {prefix && <span className="nothing-state__prefix">{prefix}</span>}
          {headline}
        </div>
        {message && <div className="nothing-state__message">{message}</div>}
        {onRetry && (
          <div className="nothing-state__action">
            <button className="nothing-btn nothing-btn--secondary" onClick={onRetry}>
              Retry
            </button>
          </div>
        )}
      </div>
    )
  }
)
ErrorState.displayName = 'ErrorState'

export interface EmptyStateProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    Omit<VariantProps<typeof stateVariants>, 'variant'> {
  headline?: string
  description?: string
  action?: React.ReactNode
}

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, headline = 'Nothing here', description, action, size = 'md', style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(stateVariants({ variant: 'empty', size }), className)}
        style={style}
        role="status"
        data-state={dataAttr('empty')}
        {...props}
      >
        <div className="nothing-state__dot-matrix" />
        <div className="nothing-state__headline">{headline}</div>
        {description && <div className="nothing-state__description">{description}</div>}
        {action && <div className="nothing-state__action">{action}</div>}
      </div>
    )
  }
)
EmptyState.displayName = 'EmptyState'

export interface DisabledStateProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    Omit<VariantProps<typeof stateVariants>, 'variant'> {
  headline?: string
  description?: string
}

export const DisabledState = React.forwardRef<HTMLDivElement, DisabledStateProps>(
  ({ className, headline = 'Unavailable', description, size = 'md', style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(stateVariants({ variant: 'disabled', size }), className)}
        style={style}
        role="status"
        data-state={dataAttr('disabled')}
        aria-disabled="true"
        {...props}
      >
        <h3 className="nothing-state__headline">{headline}</h3>
        {description && <div className="nothing-state__description">{description}</div>}
      </div>
    )
  }
)
DisabledState.displayName = 'DisabledState'

export { stateVariants, loadingSegmentVariants }
