import * as React from 'react'
import { cn } from '@/lib/utils'
import { planStepVariants, planVariants } from './plan-variants'

export type PlanProgressStatus = 'done' | 'active' | 'pending'

export interface PlanItemProps extends React.HTMLAttributes<HTMLLIElement> {
  status?: PlanProgressStatus
}

export function PlanItem({
  status = 'pending',
  className,
  children,
  ref,
  ...props
}: PlanItemProps & { ref?: React.Ref<HTMLLIElement> }) {
  return (
    <li
      ref={ref}
      className={cn(planStepVariants({ status }), className)}
      data-slot="plan-step"
      data-status={status}
      aria-current={status === 'active' ? 'step' : undefined}
      {...props}
    >
      <span
        aria-hidden
        className={cn(
          'mt-1.5 size-2 shrink-0 rounded-full border border-current',
          status === 'done' && 'bg-current',
          status === 'active' && 'animate-agent-pulse bg-current motion-reduce:animate-none',
        )}
      />
      <span className="min-w-0 flex-1">{children}</span>
    </li>
  )
}

export interface PlanProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: React.ReactNode
}

export function Plan({
  title = '计划 / Plan',
  className,
  children,
  ref,
  ...props
}: PlanProps & { ref?: React.Ref<HTMLDivElement> }) {
  const steps = React.Children.toArray(children)
  const completed = steps.filter(
    (child) => React.isValidElement<PlanItemProps>(child) && child.props.status === 'done',
  ).length
  const total = steps.length
  const progress = total === 0 ? 0 : completed / total

  return (
    <div ref={ref} className={cn(planVariants(), className)} data-slot="plan" {...props}>
      <div className="flex min-h-10 items-center justify-between gap-3 border-b border-border pb-2">
        <span className="font-mono text-caption uppercase">{title}</span>
        <span className="font-mono text-caption tabular-nums text-foreground-muted">
          {completed} / {total}
        </span>
      </div>
      <div
        role="progressbar"
        aria-label="计划进度 / Plan progress"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={completed}
        className="mt-3 h-1 overflow-hidden rounded-full bg-muted"
      >
        <span
          className="block h-full origin-left bg-foreground transition-transform duration-300 motion-reduce:transition-none"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
      <ol className="mt-1" data-slot="plan-steps">
        {children}
      </ol>
    </div>
  )
}
