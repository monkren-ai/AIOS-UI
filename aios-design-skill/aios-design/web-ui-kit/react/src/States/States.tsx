import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import { Button } from '@/Button'
import {
  loadingSegmentVariants,
  stateActionVariants,
  stateBracketTextVariants,
  stateDescriptionVariants,
  stateDotMatrixVariants,
  stateHeadlineVariants,
  stateLoadingBarVariants,
  stateMessageVariants,
  statePercentageVariants,
  statePrefixVariants,
  stateSpinnerSegmentVariants,
  stateSpinnerVariants,
  stateVariants,
  type StateSize,
} from './states-variants'
import './States.css'

/** 示波器固定 7 根竖条，序号决定高度与相位。 */
const SPINNER_SEGMENT_COUNT = 7

export interface LoadingStateProps extends Omit<React.ComponentPropsWithRef<'div'>, 'children'> {
  progress?: number
  totalSegments?: number
  label?: string
  size?: StateSize
}

export function LoadingState({
  className,
  progress,
  totalSegments = 20,
  label,
  size = 'md',
  ...props
}: LoadingStateProps) {
  const filledSegments = progress !== undefined ? Math.round((progress / 100) * totalSegments) : 0

  return (
    <div
      className={cn(stateVariants({ variant: 'loading', size }), className)}
      role="status"
      aria-live="polite"
      data-slot="loading-state"
      data-state={dataAttr('loading')}
      data-size={dataAttr(size)}
      {...props}
    >
      <div data-slot="state-spinner" className={stateSpinnerVariants()}>
        {Array.from({ length: SPINNER_SEGMENT_COUNT }).map((_, i) => (
          <div
            key={i}
            data-slot="state-spinner-segment"
            className={stateSpinnerSegmentVariants({ index: i as 0 })}
          />
        ))}
      </div>
      {progress !== undefined && (
        <>
          <div data-slot="state-loading-bar" className={stateLoadingBarVariants()}>
            {Array.from({ length: totalSegments }).map((_, i) => (
              <div
                key={i}
                data-slot="state-loading-segment"
                data-filled={dataAttr(i < filledSegments)}
                className={loadingSegmentVariants({ filled: i < filledSegments })}
              />
            ))}
          </div>
          <div data-slot="state-percentage" className={statePercentageVariants()}>
            {progress}%
          </div>
        </>
      )}
      {label && (
        <div data-slot="state-bracket-text" className={stateBracketTextVariants()}>
          [ {label} ]
        </div>
      )}
    </div>
  )
}

LoadingState.displayName = 'LoadingState'

export interface ErrorStateProps extends Omit<
  React.ComponentPropsWithRef<'div'>,
  'children' | 'onClick'
> {
  headline: string
  message?: string
  prefix?: string
  onRetry?: () => void
  size?: StateSize
}

export function ErrorState({
  className,
  headline,
  message,
  prefix,
  onRetry,
  size = 'md',
  ...props
}: ErrorStateProps) {
  return (
    <div
      className={cn(stateVariants({ variant: 'error', size }), className)}
      role="alert"
      data-slot="error-state"
      data-state={dataAttr('error')}
      data-size={dataAttr(size)}
      {...props}
    >
      <div data-slot="state-headline" className={stateHeadlineVariants({ variant: 'error' })}>
        {prefix && (
          <span data-slot="state-prefix" className={statePrefixVariants()}>
            {prefix}
          </span>
        )}
        {headline}
      </div>
      {message && (
        <div data-slot="state-message" className={stateMessageVariants()}>
          {message}
        </div>
      )}
      {onRetry && (
        <div data-slot="state-action" className={stateActionVariants()}>
          <Button variant="secondary" size="sm" onClick={onRetry}>
            Retry
          </Button>
        </div>
      )}
    </div>
  )
}

ErrorState.displayName = 'ErrorState'

export interface EmptyStateProps extends Omit<React.ComponentPropsWithRef<'div'>, 'children'> {
  headline?: string
  description?: string
  action?: React.ReactNode
  size?: StateSize
}

export function EmptyState({
  className,
  headline = 'No content here',
  description,
  action,
  size = 'md',
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(stateVariants({ variant: 'empty', size }), className)}
      role="status"
      data-slot="empty-state"
      data-state={dataAttr('empty')}
      data-size={dataAttr(size)}
      {...props}
    >
      <div data-slot="state-dot-matrix" aria-hidden="true" className={stateDotMatrixVariants()} />
      <div data-slot="state-headline" className={stateHeadlineVariants({ variant: 'empty' })}>
        {headline}
      </div>
      {description && (
        <div
          data-slot="state-description"
          className={stateDescriptionVariants({ variant: 'empty' })}
        >
          {description}
        </div>
      )}
      {action && (
        <div data-slot="state-action" className={stateActionVariants()}>
          {action}
        </div>
      )}
    </div>
  )
}

EmptyState.displayName = 'EmptyState'

export interface DisabledStateProps extends Omit<React.ComponentPropsWithRef<'div'>, 'children'> {
  headline?: string
  description?: string
  size?: StateSize
}

export function DisabledState({
  className,
  headline = 'Unavailable',
  description,
  size = 'md',
  ...props
}: DisabledStateProps) {
  return (
    <div
      className={cn(stateVariants({ variant: 'disabled', size }), className)}
      role="status"
      data-slot="disabled-state"
      data-state={dataAttr('disabled')}
      data-size={dataAttr(size)}
      aria-disabled="true"
      {...props}
    >
      <h3 data-slot="state-headline" className={stateHeadlineVariants({ variant: 'disabled' })}>
        {headline}
      </h3>
      {description && (
        <div
          data-slot="state-description"
          className={stateDescriptionVariants({ variant: 'disabled' })}
        >
          {description}
        </div>
      )}
    </div>
  )
}

DisabledState.displayName = 'DisabledState'

export { stateVariants, loadingSegmentVariants }
