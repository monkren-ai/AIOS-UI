import * as React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ToolCallRow } from './ToolCallRow'

describe('ToolCallRow', () => {
  it('renders with data-slot', () => {
    render(<ToolCallRow tool="search" />)
    expect(screen.getByText('search').closest('[data-slot]')).toHaveAttribute(
      'data-slot',
      'tool-call-row',
    )
  })

  it('renders tool name and status label', () => {
    render(<ToolCallRow tool="fetch" status="running" />)
    expect(screen.getByText('fetch')).toBeInTheDocument()
    expect(screen.getByText('[RUNNING]')).toBeInTheDocument()
  })

  it('formats elapsed time in milliseconds', () => {
    render(<ToolCallRow tool="calc" elapsedMs={850} />)
    expect(screen.getByText('850MS')).toBeInTheDocument()
  })

  it('formats elapsed time in seconds', () => {
    render(<ToolCallRow tool="calc" elapsedMs={1500} />)
    expect(screen.getByText('1.5S')).toBeInTheDocument()
  })

  it('renders status classes and data attributes for all statuses', () => {
    const statuses = ['pending', 'running', 'done', 'error', 'skipped'] as const
    for (const status of statuses) {
      const { unmount } = render(<ToolCallRow tool="check" status={status} />)
      const row = screen.getByText('check').closest('[data-slot]')
      expect(row).toHaveClass(`aios-tool-call-row--${status}`)
      expect(row).toHaveAttribute('data-status', status)
      unmount()
    }
  })

  it('sets aria-busy while running', () => {
    const { rerender } = render(<ToolCallRow tool="wait" status="pending" />)
    const row = screen.getByText('wait').closest('[data-slot]')
    expect(row).not.toHaveAttribute('aria-busy')
    rerender(<ToolCallRow tool="wait" status="running" />)
    expect(row).toHaveAttribute('aria-busy', 'true')
  })

  it('expands and collapses details', async () => {
    const user = userEvent.setup()
    render(<ToolCallRow tool="query" args={{ q: 'nothing ui' }} result="42 results" error="" />)

    const toggle = screen.getByRole('button', { name: 'Show details' })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByText('q')).not.toBeInTheDocument()

    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(toggle).toHaveAttribute('aria-label', 'Hide details')
    expect(screen.getByText('q')).toBeInTheDocument()
    expect(screen.getByText('nothing ui')).toBeInTheDocument()
    expect(screen.getByText('42 results')).toBeInTheDocument()

    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })

  it('expands details by default when showArgs is true', () => {
    render(<ToolCallRow tool="query" args={{ q: 'nothing ui' }} showArgs />)
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText('q')).toBeInTheDocument()
  })

  it('does not render toggle when there are no details', () => {
    render(<ToolCallRow tool="noop" />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('renders error details', async () => {
    const user = userEvent.setup()
    render(<ToolCallRow tool="fail" error="Connection refused" />)
    await user.click(screen.getByRole('button', { name: 'Show details' }))
    expect(screen.getByText('Connection refused')).toBeInTheDocument()
  })

  it('renders non-string args as JSON', async () => {
    const user = userEvent.setup()
    render(<ToolCallRow tool="math" args={{ values: [1, 2, 3] }} />)
    await user.click(screen.getByRole('button', { name: 'Show details' }))
    expect(screen.getByText('[1,2,3]')).toBeInTheDocument()
  })

  it('supports custom expand/collapse labels', async () => {
    const user = userEvent.setup()
    render(
      <ToolCallRow tool="custom" result="summary" expandLabel="Reveal" collapseLabel="Conceal" />,
    )
    const toggle = screen.getByRole('button')
    expect(toggle).toHaveAttribute('aria-label', 'Reveal')
    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-label', 'Conceal')
  })

  it('supports custom className', () => {
    render(<ToolCallRow tool="styled" className="custom-row" />)
    const row = screen.getByText('styled').closest('[data-slot]')
    expect(row).toHaveClass('custom-row')
    expect(row).toHaveClass('aios-tool-call-row')
  })

  it('forwards ref to the div element', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<ToolCallRow tool="ref" ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
    expect(ref.current?.tagName).toBe('DIV')
  })
})
