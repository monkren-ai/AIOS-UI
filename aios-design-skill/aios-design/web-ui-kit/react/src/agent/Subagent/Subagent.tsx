import * as React from 'react'
import { cn } from '@/lib/utils'
import { subagentVariants } from './subagent-variants'

export type SubagentStatus = 'running' | 'done' | 'error'
export interface SubagentProps extends React.HTMLAttributes<HTMLDivElement> {
  name: React.ReactNode
  meta?: React.ReactNode
  status?: SubagentStatus
  progress?: number
  error?: React.ReactNode
}

export function Subagent({
  name,
  meta,
  status = 'running',
  progress,
  error,
  className,
  ref,
  ...props
}: SubagentProps & { ref?: React.Ref<HTMLDivElement> }) {
  const value = Math.max(0, Math.min(100, progress ?? (status === 'done' ? 100 : 0)))
  return (
    <div
      ref={ref}
      className={cn(subagentVariants({ status }), className)}
      data-slot="subagent"
      data-status={status}
      aria-busy={status === 'running' || undefined}
      {...props}
    >
      <div className="flex min-h-6 items-center gap-2">
        <span
          aria-hidden
          className={cn(
            'size-2 shrink-0 rounded-full border border-current',
            status === 'running' && 'animate-agent-pulse bg-current motion-reduce:animate-none',
            status === 'done' && 'bg-current',
          )}
        />
        <span className="min-w-0 flex-1 truncate text-sm">{name}</span>
        {meta && (
          <span className="shrink-0 font-mono text-caption text-foreground-muted">{meta}</span>
        )}
      </div>
      <div
        role="progressbar"
        aria-label={`${String(name)} progress`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
        className="h-1 overflow-hidden rounded-full bg-muted"
      >
        <span
          className={cn(
            'block h-full origin-left bg-foreground transition-transform duration-300 motion-reduce:transition-none',
            status === 'error' && 'bg-accent',
          )}
          style={{ transform: `scaleX(${value / 100})` }}
        />
      </div>
      {status === 'error' && error && (
        <div role="alert" className="text-caption text-accent">
          {error}
        </div>
      )}
    </div>
  )
}

export function SubagentList({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      className={cn('flex w-full flex-col gap-2', className)}
      data-slot="subagent-list"
      {...props}
    />
  )
}
