import * as React from 'react'
import { cn } from '@/lib/utils'
import { ApprovalGate, type ApprovalState } from '@/agent/ApprovalGate'

export interface ConfirmationProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: React.ReactNode
  description?: React.ReactNode
  details?: React.ReactNode
  state?: ApprovalState
  danger?: boolean
  reversible?: boolean
  approveLabel?: string
  denyLabel?: string
  approvedLabel?: string
  deniedLabel?: string
  onApprove?: () => void
  onDeny?: () => void
}

export function Confirmation({
  title,
  description,
  details,
  state = 'pending',
  danger = false,
  reversible = true,
  approveLabel = '批准 / Approve',
  denyLabel = '拒绝 / Deny',
  approvedLabel,
  deniedLabel,
  onApprove,
  onDeny,
  className,
  ref,
  ...props
}: ConfirmationProps & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div ref={ref} className={cn('w-full', className)} data-slot="confirmation" {...props}>
      <ApprovalGate
        action={typeof title === 'string' ? title : '操作确认 / Action confirmation'}
        impact={typeof description === 'string' ? description : undefined}
        risk={danger ? 'high' : 'medium'}
        state={state}
        reversible={reversible}
        allowLabel={approveLabel}
        denyLabel={denyLabel}
        approvedLabel={approvedLabel}
        deniedLabel={deniedLabel}
        onAllow={onApprove}
        onDeny={onDeny}
      >
        {typeof title !== 'string' && <div data-slot="confirmation-title">{title}</div>}
        {typeof description !== 'string' && description}
        {details}
      </ApprovalGate>
    </div>
  )
}
