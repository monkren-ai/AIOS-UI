import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '@/lib/utils'
import { Button } from '@/Button'
import { AgentOrb } from '@/agent/AgentOrb'
import './PlanCard.css'

export type PlanStepStatus = 'pending' | 'approved' | 'rejected' | 'done'

export interface PlanStep {
  id: string
  description: string
  tool?: string
  status?: PlanStepStatus
}

const statusLabels: Record<PlanStepStatus, string> = {
  pending: '[PENDING]',
  approved: '[APPROVED]',
  rejected: '[REJECTED]',
  done: '[DONE]',
}

export const planCardVariants = cva('nothing-plan-card', {
  variants: {
    editable: {
      true: 'nothing-plan-card--editable',
      false: '',
    },
    compact: {
      true: 'nothing-plan-card--compact',
      false: '',
    },
  },
  defaultVariants: { editable: false, compact: false },
})

export interface PlanCardProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    VariantProps<typeof planCardVariants> {
  title?: string
  steps: PlanStep[]
  editable?: boolean
  compact?: boolean
  onApprove?: () => void
  onEdit?: () => void
  onStepToggle?: (stepId: string, approved: boolean) => void
  onApproveAll?: () => void
  onReset?: () => void
  approveLabel?: string
  editLabel?: string
  approveAllLabel?: string
  resetLabel?: string
  approveDisabledHint?: string
}

export const PlanCard = React.forwardRef<HTMLDivElement, PlanCardProps>(
  (
    {
      title = 'AGENT PLAN',
      steps,
      editable = false,
      compact = false,
      onApprove,
      onEdit,
      onStepToggle,
      onApproveAll,
      onReset,
      approveLabel = 'ALLOW AGENT',
      editLabel = 'MODIFY',
      approveAllLabel = 'APPROVE ALL',
      resetLabel = 'RESET',
      approveDisabledHint = 'Approve all steps first',
      className,
      ...props
    },
    ref,
  ) => {
    const approvedCount = steps.filter((s) => s.status === 'approved' || s.status === 'done').length
    const allApproved = steps.length > 0 && approvedCount === steps.length

    return (
      <div
        ref={ref}
        className={cn(planCardVariants({ editable, compact }), className)}
        data-slot="plan-card"
        data-editable={dataAttr(editable)}
        data-compact={dataAttr(compact)}
        {...props}
      >
        <div className="nothing-plan-card__header">
          <AgentOrb state={allApproved ? 'acting' : 'thinking'} size="sm" />
          <span className="nothing-plan-card__title">{title}</span>
          <span className="nothing-plan-card__count">
            {approvedCount}/{steps.length}
          </span>
        </div>

        <ol className="nothing-plan-card__list" aria-label="Agent plan steps">
          {steps.map((step, index) => {
            const status = step.status ?? 'pending'
            const stepNumber = String(index + 1).padStart(2, '0')

            return (
              <li
                key={step.id}
                className={cn('nothing-plan-card__item', `nothing-plan-card__item--${status}`)}
                data-status={dataAttr(status)}
              >
                <span className="nothing-plan-card__number">{stepNumber}</span>
                <div className="nothing-plan-card__content">
                  <span className="nothing-plan-card__description">{step.description}</span>
                  {step.tool && <span className="nothing-plan-card__tool">{step.tool}</span>}
                </div>
                <span className="nothing-plan-card__status">{statusLabels[status]}</span>
                {editable && (
                  <button
                    type="button"
                    className="nothing-plan-card__toggle"
                    onClick={() => onStepToggle?.(step.id, status !== 'approved')}
                    aria-pressed={status === 'approved'}
                    aria-label={
                      status === 'approved'
                        ? `Reject step ${stepNumber}`
                        : `Approve step ${stepNumber}`
                    }
                  >
                    {status === 'approved' ? '−' : '+'}
                  </button>
                )}
              </li>
            )
          })}
        </ol>

        {(onApprove || onEdit || onApproveAll || onReset) && (
          <div className="nothing-plan-card__actions">
            {(onApproveAll || onReset) && (
              <div className="nothing-plan-card__actions-bulk">
                {onApproveAll && (
                  <Button variant="secondary" size="sm" onClick={onApproveAll}>
                    {approveAllLabel}
                  </Button>
                )}
                {onReset && (
                  <Button variant="ghost" size="sm" onClick={onReset}>
                    {resetLabel}
                  </Button>
                )}
              </div>
            )}
            <div className="nothing-plan-card__actions-main">
              {onEdit && (
                <Button variant="secondary" size="sm" onClick={onEdit}>
                  {editLabel}
                </Button>
              )}
              {onApprove && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={onApprove}
                  disabled={!allApproved}
                  title={allApproved ? undefined : approveDisabledHint}
                >
                  {approveLabel}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    )
  },
)
PlanCard.displayName = 'PlanCard'

export default PlanCard
