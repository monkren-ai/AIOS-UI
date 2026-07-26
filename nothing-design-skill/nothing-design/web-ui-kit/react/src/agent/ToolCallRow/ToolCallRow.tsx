import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '@/lib/utils'
import { AgentOrb } from '@/agent/AgentOrb'
import type { AgentState } from '@/agent/AgentOrb'
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

export const toolCallRowVariants = cva('nothing-tool-call-row', {
  variants: {
    status: {
      pending: 'nothing-tool-call-row--pending',
      running: 'nothing-tool-call-row--running',
      done: 'nothing-tool-call-row--done',
      error: 'nothing-tool-call-row--error',
      skipped: 'nothing-tool-call-row--skipped',
    },
  },
  defaultVariants: { status: 'pending' },
})

export interface ToolCallRowProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    VariantProps<typeof toolCallRowVariants> {
  tool: string
  args?: Record<string, unknown>
  status?: ToolCallStatus
  elapsedMs?: number
  result?: string
  error?: string
  showArgs?: boolean
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
      expandLabel = 'Show details',
      collapseLabel = 'Hide details',
      className,
      ...props
    },
    ref,
  ) => {
    const [expanded, setExpanded] = React.useState(showArgs)
    const hasDetails = (args && Object.keys(args).length > 0) || result || error

    return (
      <div
        ref={ref}
        className={cn(toolCallRowVariants({ status }), className)}
        data-slot="tool-call-row"
        data-status={dataAttr(status)}
        aria-busy={status === 'running' || undefined}
        {...props}
      >
        <div className="nothing-tool-call-row__header">
          <AgentOrb state={statusToAgentState[status]} size="sm" />
          <span className="nothing-tool-call-row__tool">{tool}</span>
          <span className="nothing-tool-call-row__status">{statusLabels[status]}</span>
          {elapsedMs !== undefined && (
            <span className="nothing-tool-call-row__elapsed">{formatElapsed(elapsedMs)}</span>
          )}
          {hasDetails && (
            <button
              type="button"
              className="nothing-tool-call-row__toggle"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              aria-label={expanded ? collapseLabel : expandLabel}
            >
              {expanded ? '−' : '+'}
            </button>
          )}
        </div>

        {expanded && hasDetails && (
          <div className="nothing-tool-call-row__details">
            {args && Object.keys(args).length > 0 && (
              <dl className="nothing-tool-call-row__args">
                {Object.entries(args).map(([key, value]) => (
                  <div key={key} className="nothing-tool-call-row__arg">
                    <dt>{key}</dt>
                    <dd>{typeof value === 'string' ? value : JSON.stringify(value)}</dd>
                  </div>
                ))}
              </dl>
            )}
            {result && <div className="nothing-tool-call-row__result">{result}</div>}
            {error && <div className="nothing-tool-call-row__error">{error}</div>}
          </div>
        )}
      </div>
    )
  },
)
ToolCallRow.displayName = 'ToolCallRow'

export default ToolCallRow
