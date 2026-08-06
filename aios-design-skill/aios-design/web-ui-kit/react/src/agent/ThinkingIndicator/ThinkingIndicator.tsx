import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '@/lib/utils'
import './ThinkingIndicator.css'

export type ThinkingState = 'thinking' | 'acting' | 'done' | 'error'

export const thinkingIndicatorVariants = cva('aios-thinking-indicator', {
  variants: {
    state: {
      thinking: 'aios-thinking-indicator--thinking',
      acting: 'aios-thinking-indicator--acting',
      done: 'aios-thinking-indicator--done',
      error: 'aios-thinking-indicator--error',
    },
    size: {
      sm: 'aios-thinking-indicator--sm',
      md: 'aios-thinking-indicator--md',
      lg: 'aios-thinking-indicator--lg',
    },
  },
  defaultVariants: { state: 'thinking', size: 'md' },
})

const ariaLabels: Record<ThinkingState, string> = {
  thinking: 'Thinking',
  acting: 'Acting',
  done: 'Done',
  error: 'Error',
}

export interface ThinkingIndicatorProps
  extends
    Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'>,
    VariantProps<typeof thinkingIndicatorVariants> {
  state?: ThinkingState
  size?: 'sm' | 'md' | 'lg'
  label?: string
}

export const ThinkingIndicator = React.forwardRef<HTMLSpanElement, ThinkingIndicatorProps>(
  ({ state = 'thinking', size = 'md', label, className, ...props }, ref) => {
    const ariaLabel = label ?? ariaLabels[state]

    return (
      <span
        ref={ref}
        className={cn(thinkingIndicatorVariants({ state, size }), className)}
        data-slot="thinking-indicator"
        data-state={dataAttr(state)}
        data-size={dataAttr(size)}
        role="status"
        aria-live="polite"
        aria-busy={state === 'thinking' || state === 'acting' || undefined}
        aria-label={ariaLabel}
        {...props}
      >
        <svg
          className="aios-thinking-indicator__svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {(state === 'thinking' || state === 'acting') && (
            <g className="aios-thinking-indicator__dots">
              <circle cx="6" cy="12" r="2" className="aios-thinking-indicator__dot" />
              <circle cx="12" cy="12" r="2" className="aios-thinking-indicator__dot" />
              <circle cx="18" cy="12" r="2" className="aios-thinking-indicator__dot" />
            </g>
          )}
          {state === 'done' && (
            <path d="M20 6L9 17l-5-5" className="aios-thinking-indicator__mark" />
          )}
          {state === 'error' && (
            <path d="M18 6L6 18M6 6l12 12" className="aios-thinking-indicator__mark" />
          )}
        </svg>
        {label && <span className="aios-thinking-indicator__label">{label}</span>}
      </span>
    )
  },
)
ThinkingIndicator.displayName = 'ThinkingIndicator'

export default ThinkingIndicator
