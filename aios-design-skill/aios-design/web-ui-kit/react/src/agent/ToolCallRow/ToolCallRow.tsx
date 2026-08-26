import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '@/lib/utils'
import { AgentOrb } from '@/agent/AgentOrb'
import type { AgentState } from '@/agent/AgentOrb'
import { ActivityLabel } from '@/agent/ActivityLabel'
import './ToolCallRow.css'

export type ToolCallStatus = 'pending' | 'running' | 'done' | 'error' | 'skipped'

const statusToAgentState: Record<ToolCallStatus, AgentState> = {
  pending: 'idle',
  running: 'acting',
  done: 'idle',
  error: 'error',
  skipped: 'idle',
}

const statusLabels: Record<ToolCallStatus, string> = {
  pending: '[PENDING]',
  running: '[RUNNING]',
  done: '[DONE]',
  error: '[ERROR]',
  skipped: '[SKIPPED]',
}

export const toolCallRowVariants = cva('aios-tool-call-row', {
  variants: {
    status: {
      pending: 'aios-tool-call-row--pending',
      running: 'aios-tool-call-row--running',
      done: 'aios-tool-call-row--done',
      error: 'aios-tool-call-row--error',
      skipped: 'aios-tool-call-row--skipped',
    },
  },
  defaultVariants: { status: 'pending' },
})

export interface ToolCallRowProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    VariantProps<typeof toolCallRowVariants> {
  tool: string
  args?: Record<string, unknown>
  status?: ToolCallStatus
  elapsedMs?: number
  result?: string
  error?: string
  showArgs?: boolean
  expanded?: boolean
  defaultExpanded?: boolean
  onExpandedChange?: (expanded: boolean) => void
  activeLabel?: React.ReactNode
  badge?: React.ReactNode
  children?: React.ReactNode
  expandLabel?: string
  collapseLabel?: string
}

function formatElapsed(ms?: number): string | undefined {
  if (ms === undefined) return undefined
  if (ms < 1000) return `${ms}MS`
  return `${(ms / 1000).toFixed(1)}S`
}

export const ToolCallRow = React.forwardRef<HTMLDivElement, ToolCallRowProps>(
  (
    {
      tool,
      args,
      status = 'pending',
      elapsedMs,
      result,
      error,
      showArgs = false,
      expanded: controlledExpanded,
      defaultExpanded,
      onExpandedChange,
      activeLabel,
      badge,
      children,
      expandLabel = 'Show details',
      collapseLabel = 'Hide details',
      className,
      ...props
    },
    ref,
  ) => {
    const [internalExpanded, setInternalExpanded] = React.useState(defaultExpanded ?? showArgs)
    const expanded = controlledExpanded ?? internalExpanded
    const setExpanded = (next: boolean) => {
      if (controlledExpanded === undefined) setInternalExpanded(next)
      onExpandedChange?.(next)
    }
    const hasDetails = Boolean(
      (args && Object.keys(args).length > 0) || result || error || children,
    )

    return (
      <div
        ref={ref}
        className={cn(toolCallRowVariants({ status }), className)}
        data-slot="tool-call-row"
        data-status={dataAttr(status)}
        aria-busy={status === 'running' || undefined}
        {...props}
      >
        <div className="aios-tool-call-row__header">
          <AgentOrb state={statusToAgentState[status]} size="sm" />
          <span className="aios-tool-call-row__tool">
            {activeLabel ? (
              <ActivityLabel
                active={status === 'running'}
                activeLabel={activeLabel}
                label={tool}
                status={status === 'error' ? 'error' : 'default'}
              />
            ) : (
              tool
            )}
          </span>
          {badge && (
            <span
              className="rounded-tag border border-border px-2 py-1 font-mono text-caption text-foreground-muted"
              data-slot="tool-call-row-badge"
            >
              {badge}
            </span>
          )}
          <span className="aios-tool-call-row__status">{statusLabels[status]}</span>
          {elapsedMs !== undefined && (
            <span className="aios-tool-call-row__elapsed">{formatElapsed(elapsedMs)}</span>
          )}
          {hasDetails && (
            <button
              type="button"
              className="aios-tool-call-row__toggle"
              onClick={() => setExpanded(!expanded)}
              aria-expanded={expanded}
              aria-label={expanded ? collapseLabel : expandLabel}
            >
              {expanded ? '−' : '+'}
            </button>
          )}
        </div>

        {expanded && hasDetails && (
          <div className="aios-tool-call-row__details">
            {args && Object.keys(args).length > 0 && (
              <dl className="aios-tool-call-row__args">
                {Object.entries(args).map(([key, value]) => (
                  <div key={key} className="aios-tool-call-row__arg">
                    <dt>{key}</dt>
                    <dd>{typeof value === 'string' ? value : JSON.stringify(value)}</dd>
                  </div>
                ))}
              </dl>
            )}
            {result && <div className="aios-tool-call-row__result">{result}</div>}
            {error && <div className="aios-tool-call-row__error">{error}</div>}
            {children && <div data-slot="tool-call-row-content">{children}</div>}
          </div>
        )}
      </div>
    )
  },
)
ToolCallRow.displayName = 'ToolCallRow'

export default ToolCallRow
