import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '@/lib/utils'
import './AgentOrb.css'

export type AgentState = 'idle' | 'thinking' | 'acting' | 'paused' | 'error'

export const agentOrbVariants = cva('nothing-agent-orb', {
  variants: {
    state: {
      idle: 'nothing-agent-orb--idle',
      thinking: 'nothing-agent-orb--thinking',
      acting: 'nothing-agent-orb--acting',
      paused: 'nothing-agent-orb--paused',
      error: 'nothing-agent-orb--error',
    },
    size: {
      sm: 'nothing-agent-orb--sm',
      md: 'nothing-agent-orb--md',
      lg: 'nothing-agent-orb--lg',
    },
  },
  defaultVariants: {
    state: 'idle',
    size: 'md',
  },
})

const stateLabels: Record<AgentState, string> = {
  idle: '[IDLE]',
  thinking: '[THINKING]',
  acting: '[ACTING]',
  paused: '[WAITING]',
  error: '[ERROR]',
}

const ariaLabels: Record<AgentState, string> = {
  idle: 'Agent is idle',
  thinking: 'Agent is thinking',
  acting: 'Agent is acting',
  paused: 'Agent is paused',
  error: 'Agent has encountered an error',
}

export interface AgentOrbProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    VariantProps<typeof agentOrbVariants> {
  state?: AgentState
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  label?: string
}

export const AgentOrb = React.forwardRef<HTMLDivElement, AgentOrbProps>(
  ({ state = 'idle', size = 'md', showLabel = false, label, className, ...props }, ref) => {
    const displayLabel = label ?? (showLabel ? stateLabels[state] : undefined)
    const ariaLabel = label ?? ariaLabels[state]

    return (
      <div
        ref={ref}
        className={cn(agentOrbVariants({ state, size }), className)}
        data-slot="agent-orb"
        data-state={dataAttr(state)}
        data-size={dataAttr(size)}
        role="status"
        aria-live="polite"
        aria-busy={state === 'thinking' || state === 'acting' || undefined}
        aria-label={ariaLabel}
        {...props}
      >
        <span className="nothing-agent-orb__dot" aria-hidden="true" />
        {displayLabel && <span className="nothing-agent-orb__label">{displayLabel}</span>}
      </div>
    )
  },
)
AgentOrb.displayName = 'AgentOrb'

export default AgentOrb
