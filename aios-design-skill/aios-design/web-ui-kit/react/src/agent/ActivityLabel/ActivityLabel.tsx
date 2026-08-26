import * as React from 'react'
import type { VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '@/lib/utils'
import { activityLabelVariants } from './activity-label-variants'

export interface ActivityLabelProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof activityLabelVariants> {
  active?: boolean
  activeLabel?: React.ReactNode
  label?: React.ReactNode
}

export function ActivityLabel({
  active = false,
  activeLabel = '处理中 / Working',
  label = '已完成 / Done',
  status,
  className,
  ref,
  ...props
}: ActivityLabelProps & { ref?: React.Ref<HTMLSpanElement> }) {
  return (
    <span
      ref={ref}
      role="status"
      aria-live="polite"
      aria-busy={active || undefined}
      className={cn(activityLabelVariants({ active, status }), className)}
      data-slot="activity-label"
      data-active={dataAttr(active)}
      data-status={status ?? 'default'}
      {...props}
    >
      <span
        aria-hidden
        className={cn(
          'size-2 rounded-full border border-current',
          active && 'animate-agent-pulse bg-current motion-reduce:animate-none',
        )}
      />
      <span>{active ? activeLabel : label}</span>
    </span>
  )
}
