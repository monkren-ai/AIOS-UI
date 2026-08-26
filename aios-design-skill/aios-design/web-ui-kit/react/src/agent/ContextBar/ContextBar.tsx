import * as React from 'react'
import type { VariantProps } from 'class-variance-authority'
import { Collapsible } from '@base-ui/react/collapsible'
import { cn } from '@/lib/utils'
import { contextBarLabelVariants, contextBarVariants } from './context-bar-variants'

export interface ContextBarProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof contextBarVariants> {}
export function ContextBar({
  position,
  className,
  ref,
  ...props
}: ContextBarProps & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      className={cn(contextBarVariants({ position }), className)}
      data-slot="context-bar"
      data-position={position ?? 'detached'}
      {...props}
    />
  )
}

export type ContextBarStatus =
  | 'default'
  | 'progress'
  | 'loading'
  | 'waiting'
  | 'done'
  | 'queue'
  | 'error'
export interface ContextBarLabelProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof contextBarLabelVariants> {
  status?: ContextBarStatus
  leading?: React.ReactNode
  trailing?: React.ReactNode
  onSteer?: () => void
  onRemove?: () => void
}
export function ContextBarLabel({
  status = 'default',
  muted,
  leading,
  trailing,
  onSteer,
  onRemove,
  className,
  children,
  ref,
  ...props
}: ContextBarLabelProps & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      className={cn(contextBarLabelVariants({ status, muted }), className)}
      data-slot="context-bar-label"
      data-status={status}
      {...props}
    >
      <span className="flex min-w-0 items-center gap-2">
        <span
          aria-hidden
          className={cn(
            'size-2 shrink-0 rounded-full border border-current',
            status === 'loading' && 'animate-agent-pulse bg-current motion-reduce:animate-none',
            status === 'done' && 'bg-current',
          )}
        />
        {leading}
        <span className="truncate">{children}</span>
      </span>
      <span className="flex shrink-0 items-center gap-1">
        {trailing}
        {onSteer && (
          <button
            type="button"
            className="min-h-9 px-2 text-caption uppercase hover:bg-muted"
            onClick={onSteer}
          >
            引导 / Steer
          </button>
        )}
        {onRemove && (
          <button
            type="button"
            className="size-11 text-caption hover:bg-muted"
            onClick={onRemove}
            aria-label="移除 / Remove"
          >
            ×
          </button>
        )}
      </span>
    </div>
  )
}

export interface ContextBarTasksProps {
  summary: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
  className?: string
}
export function ContextBarTasks({
  summary,
  open,
  defaultOpen,
  onOpenChange,
  children,
  className,
}: ContextBarTasksProps) {
  return (
    <Collapsible.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      className={cn('w-full', className)}
      data-slot="context-bar-tasks"
    >
      <Collapsible.Trigger className="flex min-h-11 w-full items-center justify-between gap-3 font-mono text-caption uppercase focus-visible:outline-2 focus-visible:outline-interactive">
        <span>{summary}</span>
        <span aria-hidden className="group-data-[panel-open]:rotate-45">
          +
        </span>
      </Collapsible.Trigger>
      <Collapsible.Panel className="h-[var(--collapsible-panel-height)] overflow-hidden transition-[height] duration-200 motion-reduce:transition-none data-[ending-style]:h-0 data-[starting-style]:h-0">
        <div className="flex flex-col gap-2 pt-2">{children}</div>
      </Collapsible.Panel>
    </Collapsible.Root>
  )
}
