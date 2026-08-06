import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '@/lib/utils'
import { Button } from '@/Button'
import { AgentOrb } from '@/agent/AgentOrb'
import './ApprovalGate.css'

export type ApprovalRisk = 'low' | 'medium' | 'high'

const riskLabels: Record<ApprovalRisk, string> = {
  low: '[LOW RISK]',
  medium: '[MEDIUM RISK]',
  high: '[HIGH RISK]',
}

export const approvalGateVariants = cva('aios-approval-gate', {
  variants: {
    risk: {
      low: 'aios-approval-gate--low',
      medium: 'aios-approval-gate--medium',
      high: 'aios-approval-gate--high',
    },
  },
  defaultVariants: { risk: 'medium' },
})

export interface ApprovalGateProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    VariantProps<typeof approvalGateVariants> {
  action: string
  impact?: string
  reversible?: boolean
  risk?: ApprovalRisk
  allowLabel?: string
  denyLabel?: string
  onAllow?: () => void
  onDeny?: () => void
}

export const ApprovalGate = React.forwardRef<HTMLDivElement, ApprovalGateProps>(
  (
    {
      action,
      impact,
      reversible = true,
      risk = 'medium',
      allowLabel = 'ALLOW',
      denyLabel = 'DENY',
      onAllow,
      onDeny,
      className,
      ...props
    },
    ref,
  ) => {
    const id = React.useId()
    const actionId = `${id}-action`

    return (
      <div
        ref={ref}
        className={cn(approvalGateVariants({ risk }), className)}
        data-slot="approval-gate"
        data-risk={dataAttr(risk)}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={actionId}
        {...props}
      >
        <div className="aios-approval-gate__header">
          <AgentOrb state={risk === 'high' ? 'error' : 'paused'} size="md" />
          <div className="aios-approval-gate__meta">
            <span className="aios-approval-gate__risk">{riskLabels[risk]}</span>
            <span className="aios-approval-gate__reversible">
              {reversible ? '[REVERSIBLE]' : '[IRREVERSIBLE]'}
            </span>
          </div>
        </div>

        <div className="aios-approval-gate__body">
          <p id={actionId} className="aios-approval-gate__action">
            {action}
          </p>
          {impact && <p className="aios-approval-gate__impact">{impact}</p>}
        </div>

        <div className="aios-approval-gate__actions">
          <Button variant="secondary" size="sm" onClick={onDeny}>
            {denyLabel}
          </Button>
          <Button variant={risk === 'high' ? 'destructive' : 'primary'} size="sm" onClick={onAllow}>
            {allowLabel}
          </Button>
        </div>
      </div>
    )
  },
)
ApprovalGate.displayName = 'ApprovalGate'

export default ApprovalGate
