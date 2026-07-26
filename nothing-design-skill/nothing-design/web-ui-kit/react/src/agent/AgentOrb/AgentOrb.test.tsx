import * as React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AgentOrb, type AgentState } from './AgentOrb'

const states: AgentState[] = ['idle', 'thinking', 'acting', 'paused', 'error']

describe('AgentOrb', () => {
  it('renders with data-slot', () => {
    render(<AgentOrb />)
    expect(screen.getByRole('status')).toHaveAttribute('data-slot', 'agent-orb')
  })

  it('renders with default idle state', () => {
    render(<AgentOrb />)
    const orb = screen.getByRole('status')
    expect(orb).toHaveClass('nothing-agent-orb--idle')
    expect(orb).toHaveAttribute('data-state', 'idle')
  })

  it('renders all states with correct classes and data attributes', () => {
    for (const state of states) {
      const { unmount } = render(<AgentOrb state={state} />)
      const orb = screen.getByRole('status')
      expect(orb).toHaveClass(`nothing-agent-orb--${state}`)
      expect(orb).toHaveAttribute('data-state', state)
      unmount()
    }
  })

  it('renders default state label when showLabel is true', () => {
    render(<AgentOrb state="thinking" showLabel />)
    expect(screen.getByText('[THINKING]')).toBeInTheDocument()
  })

  it('renders custom label when provided', () => {
    render(<AgentOrb label="Custom Label" showLabel />)
    expect(screen.getByText('Custom Label')).toBeInTheDocument()
  })

  it('renders all sizes with correct classes and data attributes', () => {
    const sizes = ['sm', 'md', 'lg'] as const
    for (const size of sizes) {
      const { unmount } = render(<AgentOrb size={size} />)
      const orb = screen.getByRole('status')
      expect(orb).toHaveClass(`nothing-agent-orb--${size}`)
      expect(orb).toHaveAttribute('data-size', size)
      unmount()
    }
  })

  it('sets aria-busy for active states', () => {
    const { rerender } = render(<AgentOrb state="idle" />)
    expect(screen.getByRole('status')).not.toHaveAttribute('aria-busy')

    rerender(<AgentOrb state="thinking" />)
    expect(screen.getByRole('status')).toHaveAttribute('aria-busy', 'true')

    rerender(<AgentOrb state="acting" />)
    expect(screen.getByRole('status')).toHaveAttribute('aria-busy', 'true')
  })

  it('sets correct aria-label per state', () => {
    render(<AgentOrb state="error" />)
    expect(screen.getByRole('status')).toHaveAttribute(
      'aria-label',
      'Agent has encountered an error',
    )
  })

  it('supports custom className', () => {
    render(<AgentOrb className="custom-orb" />)
    expect(screen.getByRole('status')).toHaveClass('custom-orb')
    expect(screen.getByRole('status')).toHaveClass('nothing-agent-orb')
  })

  it('forwards ref to the div element', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<AgentOrb ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
    expect(ref.current?.tagName).toBe('DIV')
  })
})
