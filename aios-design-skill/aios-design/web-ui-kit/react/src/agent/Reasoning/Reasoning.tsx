import * as React from 'react'
import { Collapsible } from '@base-ui/react/collapsible'
import { cn } from '@/lib/utils'
import { ActivityLabel } from '@/agent/ActivityLabel'
import { reasoningGroupVariants, reasoningVariants } from './reasoning-variants'
import './Reasoning.css'

export type ReasoningStatus = 'running' | 'finished' | 'error'

export interface ReasoningProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  status?: ReasoningStatus
  icon?: React.ReactNode
  label?: React.ReactNode
  activeLabel?: React.ReactNode
  subject?: React.ReactNode
  additions?: number
  deletions?: number
  elapsed?: React.ReactNode
  actions?: React.ReactNode
  container?: boolean
  collapseOnComplete?: boolean
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function Reasoning({
  status = 'finished',
  icon,
  label = '推理过程 / Reasoning',
  activeLabel,
  subject,
  additions,
  deletions,
  elapsed,
  actions,
  container = false,
  collapseOnComplete = false,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  className,
  children,
  ref,
  ...props
}: ReasoningProps & { ref?: React.Ref<HTMLDivElement> }) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
  const open = controlledOpen ?? internalOpen
  const running = status === 'running'
  const hasBody = children !== undefined && children !== null
  const wasRunning = React.useRef(running)

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (controlledOpen === undefined) setInternalOpen(next)
      onOpenChange?.(next)
    },
    [controlledOpen, onOpenChange],
  )

  React.useEffect(() => {
    if (wasRunning.current && !running && collapseOnComplete) setOpen(false)
    wasRunning.current = running
  }, [collapseOnComplete, running, setOpen])

  return (
    <Collapsible.Root
      ref={ref}
      open={open}
      onOpenChange={setOpen}
      className={cn(reasoningVariants({ container, status }), className)}
      data-slot="reasoning"
      data-status={status}
      {...props}
    >
      <div
        className={cn('flex min-h-12 min-w-0 items-center gap-2', container ? 'px-3' : '')}
        data-slot="reasoning-header"
      >
        <Collapsible.Trigger
          disabled={!hasBody}
          className="flex min-h-11 min-w-0 flex-1 items-center gap-3 text-start focus-visible:outline-2 focus-visible:outline-interactive disabled:cursor-default"
        >
          <span
            aria-hidden
            className="grid size-6 shrink-0 place-items-center font-mono text-caption"
          >
            {icon ?? (hasBody ? (open ? '−' : '+') : '•')}
          </span>
          <span className="flex min-w-0 flex-1 flex-wrap items-center gap-x-2 gap-y-1">
            <ActivityLabel
              active={running}
              activeLabel={activeLabel ?? label}
              label={label}
              status={status === 'error' ? 'error' : 'default'}
            />
            {subject && (
              <span className="min-w-0 truncate font-mono text-caption text-foreground-muted">
                {subject}
              </span>
            )}
            {additions !== undefined && (
              <span className="font-mono text-caption text-foreground-muted">+{additions}</span>
            )}
            {deletions !== undefined && (
              <span className="font-mono text-caption text-accent">−{deletions}</span>
            )}
          </span>
        </Collapsible.Trigger>
        {(running || elapsed || actions) && (
          <span className="flex shrink-0 items-center gap-2" data-slot="reasoning-trailing">
            {running ? (
              <span
                role="status"
                aria-label="运行中 / Running"
                className="size-2 animate-agent-pulse rounded-full bg-foreground motion-reduce:animate-none"
              />
            ) : (
              elapsed && (
                <span className="font-mono text-caption tabular-nums text-foreground-muted">
                  {elapsed}
                </span>
              )
            )}
            {actions}
          </span>
        )}
      </div>
      {hasBody && (
        <Collapsible.Panel className="h-[var(--collapsible-panel-height)] overflow-hidden transition-[height] duration-200 motion-reduce:transition-none data-[ending-style]:h-0 data-[starting-style]:h-0">
          <div
            className={cn(
              'ms-3 border-s border-border py-2 ps-6 text-sm text-foreground-muted',
              container && 'me-3 mb-3',
            )}
            data-slot="reasoning-content"
          >
            {children}
          </div>
        </Collapsible.Panel>
      )}
    </Collapsible.Root>
  )
}

export interface ReasoningGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  stream?: boolean
  revealed?: number
  stepInterval?: number
  startDelay?: number
  onComplete?: () => void
}

export function ReasoningGroup({
  stream = false,
  revealed,
  stepInterval = 850,
  startDelay = 320,
  onComplete,
  className,
  children,
  ref,
  ...props
}: ReasoningGroupProps & { ref?: React.Ref<HTMLDivElement> }) {
  const rows = React.Children.toArray(children)
  const controlled = revealed !== undefined
  const [internalCount, setInternalCount] = React.useState(stream ? 0 : rows.length)
  const count = controlled
    ? Math.max(0, Math.min(revealed, rows.length))
    : stream
      ? internalCount
      : rows.length
  const completed = React.useRef(false)

  React.useEffect(() => {
    if (controlled || !stream || count >= rows.length) return
    const timer = window.setTimeout(
      () => setInternalCount((value) => Math.min(rows.length, value + 1)),
      count === 0 ? startDelay : stepInterval,
    )
    return () => window.clearTimeout(timer)
  }, [controlled, count, rows.length, startDelay, stepInterval, stream])

  React.useEffect(() => {
    if (rows.length === 0 || count < rows.length) {
      completed.current = false
      return
    }
    if (!completed.current) {
      completed.current = true
      onComplete?.()
    }
  }, [count, onComplete, rows.length])

  return (
    <div
      ref={ref}
      className={cn(reasoningGroupVariants(), className)}
      data-slot="reasoning-group"
      aria-live={stream ? 'polite' : undefined}
      {...props}
    >
      {rows.slice(0, count).map((row, index) => (
        <div
          key={React.isValidElement(row) ? row.key : index}
          className={stream ? 'aios-reasoning-row-in' : undefined}
          data-slot="reasoning-group-item"
        >
          {row}
        </div>
      ))}
    </div>
  )
}

export function ReasoningSubject({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { ref?: React.Ref<HTMLSpanElement> }) {
  return (
    <span
      ref={ref}
      className={cn('font-mono text-[0.9em] underline underline-offset-4', className)}
      data-slot="reasoning-subject"
      {...props}
    />
  )
}
