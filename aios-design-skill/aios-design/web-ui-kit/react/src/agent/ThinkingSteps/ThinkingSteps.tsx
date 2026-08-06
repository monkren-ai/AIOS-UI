import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '@/lib/utils'
import { ThinkingIndicator } from '@/agent/ThinkingIndicator'
import type { ThinkingState } from '@/agent/ThinkingIndicator'
import './ThinkingSteps.css'

export interface ThinkingStep {
  id: string
  title: string
  content?: string
}

export type ThinkingStepStatus = Exclude<ThinkingState, 'acting'> | 'pending'

export const thinkingStepsVariants = cva('aios-thinking-steps', {
  variants: {
    compact: {
      true: 'aios-thinking-steps--compact',
      false: '',
    },
  },
  defaultVariants: { compact: false },
})

export interface ThinkingStepsProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    VariantProps<typeof thinkingStepsVariants> {
  steps: ThinkingStep[]
  title?: string
  activeIndex?: number
  defaultActiveIndex?: number
  autoAdvance?: boolean
  interval?: number
  loop?: boolean
  onStepChange?: (index: number) => void
  compact?: boolean
}

const statusLabels: Record<ThinkingStepStatus, string> = {
  pending: '[PENDING]',
  thinking: '[THINKING]',
  done: '[DONE]',
  error: '[ERROR]',
}

export const ThinkingSteps = React.forwardRef<HTMLDivElement, ThinkingStepsProps>(
  (
    {
      steps,
      title = 'THINKING',
      activeIndex: activeIndexProp,
      defaultActiveIndex = 0,
      autoAdvance = false,
      interval = 1600,
      loop = false,
      onStepChange,
      compact = false,
      className,
      ...props
    },
    ref,
  ) => {
    const isControlled = activeIndexProp !== undefined
    const [internalIndex, setInternalIndex] = React.useState(defaultActiveIndex)
    const activeIndex = isControlled ? activeIndexProp : internalIndex

    React.useEffect(() => {
      if (!autoAdvance) return
      if (steps.length === 0) return

      const timer = setInterval(() => {
        setInternalIndex((current) => {
          const next = current + 1
          if (next >= steps.length) {
            if (loop) {
              onStepChange?.(0)
              return 0
            }
            return current
          }
          onStepChange?.(next)
          return next
        })
      }, interval)

      return () => clearInterval(timer)
    }, [autoAdvance, interval, loop, steps.length, onStepChange])

    const computeStatus = (index: number): ThinkingStepStatus => {
      if (index < activeIndex) return 'done'
      if (index === activeIndex) return 'thinking'
      return 'pending'
    }

    const activeCount = Math.min(activeIndex + 1, steps.length)

    return (
      <div
        ref={ref}
        className={cn(thinkingStepsVariants({ compact }), className)}
        data-slot="thinking-steps"
        data-compact={dataAttr(compact)}
        aria-live="polite"
        {...props}
      >
        <div className="aios-thinking-steps__header">
          <span className="aios-thinking-steps__title">{title}</span>
          <span className="aios-thinking-steps__count">
            {String(activeCount).padStart(2, '0')}/{String(steps.length).padStart(2, '0')}
          </span>
        </div>

        <ol className="aios-thinking-steps__list" aria-label={`${title} steps`}>
          {steps.map((step, index) => {
            const status = computeStatus(index)
            const isLast = index === steps.length - 1
            const indicatorState: ThinkingState | undefined =
              status === 'pending' ? undefined : status

            return (
              <li
                key={step.id}
                className={cn(
                  'aios-thinking-steps__item',
                  `aios-thinking-steps__item--${status}`,
                  isLast && 'aios-thinking-steps__item--last',
                )}
                data-status={dataAttr(status)}
                style={{ '--step-index': index } as React.CSSProperties}
              >
                <div className="aios-thinking-steps__marker" aria-hidden="true">
                  {indicatorState ? (
                    <ThinkingIndicator state={indicatorState} size="sm" />
                  ) : (
                    <span className="aios-thinking-steps__dot" />
                  )}
                  {!isLast && <span className="aios-thinking-steps__line" />}
                </div>
                <div className="aios-thinking-steps__content">
                  <div className="aios-thinking-steps__row">
                    <span className="aios-thinking-steps__label">{step.title}</span>
                    <span className="aios-thinking-steps__status">{statusLabels[status]}</span>
                  </div>
                  {step.content && (
                    <span className="aios-thinking-steps__description">{step.content}</span>
                  )}
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    )
  },
)
ThinkingSteps.displayName = 'ThinkingSteps'

export default ThinkingSteps
