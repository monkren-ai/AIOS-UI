import * as React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ThinkingIndicator, type ThinkingState } from './ThinkingIndicator'

const states: ThinkingState[] = ['thinking', 'acting', 'done', 'error']

describe('ThinkingIndicator', () => {
  it('renders with data-slot', () => {
    render(<ThinkingIndicator />)
    expect(screen.getByRole('status')).toHaveAttribute('data-slot', 'thinking-indicator')
  })

  it('renders with default thinking state', () => {
    render(<ThinkingIndicator />)
    const indicator = screen.getByRole('status')
    expect(indicator).toHaveClass('nothing-thinking-indicator--thinking')
    expect(indicator).toHaveAttribute('data-state', 'thinking')
  })

  it('renders all states with correct classes and data attributes', () => {
    for (const state of states) {
      const { unmount } = render(<ThinkingIndicator state={state} />)
      const indicator = screen.getByRole('status')
      expect(indicator).toHaveClass(`nothing-thinking-indicator--${state}`)
      expect(indicator).toHaveAttribute('data-state', state)
      unmount()
    }
  })

  it('renders custom label', () => {
    render(<ThinkingIndicator label="Custom Label" />)
    expect(screen.getByText('Custom Label')).toBeInTheDocument()
  })

  it('renders all sizes with correct classes and data attributes', () => {
    const sizes = ['sm', 'md', 'lg'] as const
    for (const size of sizes) {
      const { unmount } = render(<ThinkingIndicator size={size} />)
      const indicator = screen.getByRole('status')
      expect(indicator).toHaveClass(`nothing-thinking-indicator--${size}`)
      expect(indicator).toHaveAttribute('data-size', size)
      unmount()
    }
  })

  it('sets aria-busy for active states', () => {
    const { rerender } = render(<ThinkingIndicator state="done" />)
    expect(screen.getByRole('status')).not.toHaveAttribute('aria-busy')

    rerender(<ThinkingIndicator state="thinking" />)
    expect(screen.getByRole('status')).toHaveAttribute('aria-busy', 'true')

    rerender(<ThinkingIndicator state="acting" />)
    expect(screen.getByRole('status')).toHaveAttribute('aria-busy', 'true')
  })

  it('sets correct aria-label per state', () => {
    render(<ThinkingIndicator state="error" />)
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Error')
  })

  it('uses custom label as aria-label', () => {
    render(<ThinkingIndicator label="Working" />)
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Working')
  })

  it('supports custom className', () => {
    render(<ThinkingIndicator className="custom-indicator" />)
    expect(screen.getByRole('status')).toHaveClass('custom-indicator')
    expect(screen.getByRole('status')).toHaveClass('nothing-thinking-indicator')
  })

  it('forwards ref to the span element', () => {
    const ref = React.createRef<HTMLSpanElement>()
    render(<ThinkingIndicator ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLSpanElement)
    expect(ref.current?.tagName).toBe('SPAN')
  })
})
