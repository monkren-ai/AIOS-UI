import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PlanCard } from './PlanCard'

const steps = [
  { id: '1', description: 'Analyze request', tool: 'search', status: 'pending' as const },
  { id: '2', description: 'Fetch data', status: 'pending' as const },
]

describe('PlanCard', () => {
  it('renders with data-slot', () => {
    render(<PlanCard steps={steps} />)
    expect(screen.getByRole('list').parentElement).toHaveAttribute('data-slot', 'plan-card')
  })

  it('renders title and step count', () => {
    render(<PlanCard title="CUSTOM PLAN" steps={steps} />)
    expect(screen.getByText('CUSTOM PLAN')).toBeInTheDocument()
    expect(screen.getByText('0/2')).toBeInTheDocument()
  })

  it('renders steps with descriptions, tools, and status labels', () => {
    render(<PlanCard steps={steps} />)
    expect(screen.getByText('01')).toBeInTheDocument()
    expect(screen.getByText('Analyze request')).toBeInTheDocument()
    expect(screen.getByText('search')).toBeInTheDocument()
    expect(screen.getAllByText('[PENDING]')).toHaveLength(2)
  })

  it('renders AgentOrb in thinking state when not all approved', () => {
    render(<PlanCard steps={steps} />)
    const orb = screen.getByRole('status')
    expect(orb).toHaveAttribute('data-state', 'thinking')
  })

  it('renders AgentOrb in acting state when all approved', () => {
    render(
      <PlanCard
        steps={[
          { id: '1', description: 'Step 1', status: 'approved' as const },
          { id: '2', description: 'Step 2', status: 'approved' as const },
        ]}
      />,
    )
    const orb = screen.getByRole('status')
    expect(orb).toHaveAttribute('data-state', 'acting')
  })

  it('calls onStepToggle when toggle button is clicked', async () => {
    const user = userEvent.setup()
    const onStepToggle = vi.fn()
    render(<PlanCard steps={steps} editable onStepToggle={onStepToggle} />)

    const toggleButtons = screen.getAllByRole('button', { name: /Approve step|Reject step/ })
    expect(toggleButtons).toHaveLength(2)

    await user.click(toggleButtons[0])
    expect(onStepToggle).toHaveBeenCalledTimes(1)
    expect(onStepToggle).toHaveBeenCalledWith('1', true)

    await user.click(toggleButtons[1])
    expect(onStepToggle).toHaveBeenCalledWith('2', true)
  })

  it('does not render toggle buttons when not editable', () => {
    render(<PlanCard steps={steps} />)
    expect(screen.queryAllByRole('button', { name: /Approve step|Reject step/ })).toHaveLength(0)
  })

  it('calls onApproveAll when approve all button is clicked', async () => {
    const user = userEvent.setup()
    const onApproveAll = vi.fn()
    render(<PlanCard steps={steps} editable onApproveAll={onApproveAll} />)
    await user.click(screen.getByRole('button', { name: 'APPROVE ALL' }))
    expect(onApproveAll).toHaveBeenCalledTimes(1)
  })

  it('calls onReset when reset button is clicked', async () => {
    const user = userEvent.setup()
    const onReset = vi.fn()
    render(<PlanCard steps={steps} onReset={onReset} />)
    await user.click(screen.getByRole('button', { name: 'RESET' }))
    expect(onReset).toHaveBeenCalledTimes(1)
  })

  it('calls onApprove when approve button is clicked and all steps approved', async () => {
    const user = userEvent.setup()
    const onApprove = vi.fn()
    render(
      <PlanCard
        steps={[
          { id: '1', description: 'Step 1', status: 'approved' as const },
          { id: '2', description: 'Step 2', status: 'approved' as const },
        ]}
        onApprove={onApprove}
      />,
    )
    await user.click(screen.getByRole('button', { name: 'ALLOW AGENT' }))
    expect(onApprove).toHaveBeenCalledTimes(1)
  })

  it('disables approve button when not all steps approved', () => {
    render(<PlanCard steps={steps} onApprove={vi.fn()} />)
    expect(screen.getByRole('button', { name: 'ALLOW AGENT' })).toBeDisabled()
  })

  it('calls onEdit when edit button is clicked', async () => {
    const user = userEvent.setup()
    const onEdit = vi.fn()
    render(<PlanCard steps={steps} onEdit={onEdit} />)
    await user.click(screen.getByRole('button', { name: 'MODIFY' }))
    expect(onEdit).toHaveBeenCalledTimes(1)
  })

  it('supports custom className', () => {
    render(<PlanCard steps={steps} className="custom-card" />)
    expect(screen.getByRole('list').parentElement).toHaveClass('custom-card')
    expect(screen.getByRole('list').parentElement).toHaveClass('nothing-plan-card')
  })

  it('forwards ref to the div element', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<PlanCard steps={steps} ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
    expect(ref.current?.tagName).toBe('DIV')
  })
})
