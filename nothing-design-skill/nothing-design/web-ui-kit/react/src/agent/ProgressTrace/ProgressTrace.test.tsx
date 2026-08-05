import * as React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ProgressTrace } from './ProgressTrace'

const steps = [
  { id: '1', label: 'Analyze', status: 'done' as const, timestamp: '10:00:00' },
  { id: '2', label: 'Fetch', status: 'active' as const, description: 'Retrieving data' },
  { id: '3', label: 'Process', status: 'pending' as const },
  { id: '4', label: 'Skip', status: 'skipped' as const },
  { id: '5', label: 'Fail', status: 'error' as const },
]

describe('ProgressTrace', () => {
  it('renders with data-slot', () => {
    render(<ProgressTrace steps={steps} />)
    expect(screen.getByText('TRACE').closest('[data-slot]')).toHaveAttribute(
      'data-slot',
      'progress-trace',
    )
  })

  it('renders title and completion count', () => {
    render(<ProgressTrace steps={steps} title="PLAN TRACE" />)
    expect(screen.getByText('PLAN TRACE')).toBeInTheDocument()
    expect(screen.getByText('1/5')).toBeInTheDocument()
  })

  it('renders all steps with labels and status labels', () => {
    render(<ProgressTrace steps={steps} />)
    expect(screen.getByText('Analyze')).toBeInTheDocument()
    expect(screen.getByText('Fetch')).toBeInTheDocument()
    expect(screen.getByText('[DONE]')).toBeInTheDocument()
    expect(screen.getByText('[ACTIVE]')).toBeInTheDocument()
    expect(screen.getByText('[SKIPPED]')).toBeInTheDocument()
    expect(screen.getByText('[ERROR]')).toBeInTheDocument()
  })

  it('renders description and timestamp when provided', () => {
    render(<ProgressTrace steps={steps} />)
    expect(screen.getByText('Retrieving data')).toBeInTheDocument()
    expect(screen.getByText('10:00:00')).toBeInTheDocument()
  })

  it('renders status classes and data attributes', () => {
    render(<ProgressTrace steps={steps} />)
    const items = screen.getAllByRole('listitem')
    expect(items[0]).toHaveClass('nothing-progress-trace__item--done')
    expect(items[0]).toHaveAttribute('data-status', 'done')
    expect(items[1]).toHaveClass('nothing-progress-trace__item--active')
    expect(items[4]).toHaveClass('nothing-progress-trace__item--error')
  })

  it('toggles collapsed state', async () => {
    const user = userEvent.setup()
    render(<ProgressTrace steps={steps} />)
    const toggle = screen.getByRole('button', { name: 'Collapse trace' })
    expect(screen.getByRole('list')).toBeInTheDocument()
    await user.click(toggle)
    expect(screen.queryByRole('list')).not.toBeInTheDocument()
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(toggle).toHaveAttribute('aria-label', 'Expand trace')
  })

  it('supports defaultCollapsed', () => {
    render(<ProgressTrace steps={steps} defaultCollapsed />)
    expect(screen.queryByRole('list')).not.toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false')
  })

  it('supports custom expand/collapse labels', async () => {
    const user = userEvent.setup()
    render(
      <ProgressTrace
        steps={steps}
        defaultCollapsed
        expandLabel="Show steps"
        collapseLabel="Hide steps"
      />,
    )
    const toggle = screen.getByRole('button')
    expect(toggle).toHaveAttribute('aria-label', 'Show steps')
    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-label', 'Hide steps')
  })

  it('supports custom className', () => {
    render(<ProgressTrace steps={steps} className="custom-trace" />)
    const trace = screen.getByText('TRACE').closest('[data-slot]')
    expect(trace).toHaveClass('custom-trace')
    expect(trace).toHaveClass('nothing-progress-trace')
  })

  it('forwards ref to the div element', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<ProgressTrace steps={steps} ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
    expect(ref.current?.tagName).toBe('DIV')
  })
})
