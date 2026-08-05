import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '@/lib/utils'
import { AgentOrb } from '@/agent/AgentOrb'
import type { AgentState } from '@/agent/AgentOrb'
import './ProgressTrace.css'

export type TraceStepStatus = 'pending' | 'active' | 'done' | 'error' | 'skipped'

export interface TraceStep {
  id: string
  label: string
  description?: string
  status?: TraceStepStatus
  timestamp?: string
}

const statusToAgentState: Record<TraceStepStatus, AgentState> = {
  pending: 'idle',
  active: 'acting',
  done: 'idle',
  error: 'error',
  skipped: 'idle',
}

const statusLabels: Record<TraceStepStatus, string> = {
  pending: '[PENDING]',
  active: '[ACTIVE]',
  done: '[DONE]',
  error: '[ERROR]',
  skipped: '[SKIPPED]',
}

export const progressTraceVariants = cva('nothing-progress-trace', {
  variants: {
    collapsed: {
      true: 'nothing-progress-trace--collapsed',
      false: '',
    },
  },
  defaultVariants: { collapsed: false },
})

export interface ProgressTraceProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    VariantProps<typeof progressTraceVariants> {
  steps: TraceStep[]
  defaultCollapsed?: boolean
  title?: string
  expandLabel?: string
  collapseLabel?: string
}

export const ProgressTrace = React.forwardRef<HTMLDivElement, ProgressTraceProps>(
  (
    {
      steps,
      defaultCollapsed = false,
      title = 'TRACE',
      expandLabel = 'Expand trace',
      collapseLabel = 'Collapse trace',
      className,
      ...props
    },
    ref,
  ) => {
    const [collapsed, setCollapsed] = React.useState(defaultCollapsed)

    return (
      <div
        ref={ref}
        className={cn(progressTraceVariants({ collapsed }), className)}
        data-slot="progress-trace"
        data-collapsed={dataAttr(collapsed)}
        aria-live="polite"
        {...props}
      >
        <div className="nothing-progress-trace__header">
          <span className="nothing-progress-trace__title">{title}</span>
          <span className="nothing-progress-trace__count">
            {steps.filter((s) => s.status === 'done').length}/{steps.length}
          </span>
          <button
            type="button"
            className="nothing-progress-trace__toggle"
            onClick={() => setCollapsed((v) => !v)}
            aria-expanded={!collapsed}
            aria-label={collapsed ? expandLabel : collapseLabel}
          >
            {collapsed ? '+' : '−'}
          </button>
        </div>

        {!collapsed && (
          <ol className="nothing-progress-trace__list" aria-label={`${title} steps`}>
            {steps.map((step, index) => {
              const status = step.status ?? 'pending'
              const isLast = index === steps.length - 1

              return (
                <li
                  key={step.id}
                  className={cn(
                    'nothing-progress-trace__item',
                    `nothing-progress-trace__item--${status}`,
                    isLast && 'nothing-progress-trace__item--last',
                  )}
                  data-status={dataAttr(status)}
                >
                  <div className="nothing-progress-trace__marker">
                    <AgentOrb state={statusToAgentState[status]} size="sm" />
                    {!isLast && (
                      <span className="nothing-progress-trace__line" aria-hidden="true" />
                    )}
                  </div>
                  <div className="nothing-progress-trace__content">
                    <div className="nothing-progress-trace__row">
                      <span className="nothing-progress-trace__label">{step.label}</span>
                      <span className="nothing-progress-trace__status">{statusLabels[status]}</span>
                    </div>
                    {step.description && (
                      <span className="nothing-progress-trace__description">
                        {step.description}
                      </span>
                    )}
                    {step.timestamp && (
                      <span className="nothing-progress-trace__timestamp">{step.timestamp}</span>
                    )}
                  </div>
                </li>
              )
            })}
          </ol>
        )}
      </div>
    )
  },
)
ProgressTrace.displayName = 'ProgressTrace'

export default ProgressTrace
