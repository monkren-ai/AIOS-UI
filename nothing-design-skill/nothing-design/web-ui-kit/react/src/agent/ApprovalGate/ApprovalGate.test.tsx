import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ApprovalGate } from './ApprovalGate'

describe('ApprovalGate', () => {
  it('renders with data-slot and alertdialog role', () => {
    render(<ApprovalGate action="Delete database" />)
    const gate = screen.getByRole('alertdialog')
    expect(gate).toHaveAttribute('data-slot', 'approval-gate')
  })

  it('renders action and impact text', () => {
    render(
      <ApprovalGate
        action="Transfer funds"
        impact="This will move $100 to account ending in 1234."
      />,
    )
    expect(screen.getByText('Transfer funds')).toBeInTheDocument()
    expect(screen.getByText('This will move $100 to account ending in 1234.')).toBeInTheDocument()
  })

  it('renders default risk label and reversible label', () => {
    render(<ApprovalGate action="Run script" />)
    expect(screen.getByText('[MEDIUM RISK]')).toBeInTheDocument()
    expect(screen.getByText('[REVERSIBLE]')).toBeInTheDocument()
  })

  it('renders irreversible label when reversible is false', () => {
    render(<ApprovalGate action="Drop table" reversible={false} />)
    expect(screen.getByText('[IRREVERSIBLE]')).toBeInTheDocument()
  })

  it('renders risk classes and data attributes for all risk levels', () => {
    const risks = ['low', 'medium', 'high'] as const
    for (const risk of risks) {
      const { unmount } = render(<ApprovalGate action="Confirm" risk={risk} />)
      const gate = screen.getByRole('alertdialog')
      expect(gate).toHaveClass(`nothing-approval-gate--${risk}`)
      expect(gate).toHaveAttribute('data-risk', risk)
      unmount()
    }
  })

  it('calls onAllow and onDeny when buttons are clicked', async () => {
    const user = userEvent.setup()
    const onAllow = vi.fn()
    const onDeny = vi.fn()
    render(<ApprovalGate action="Proceed" onAllow={onAllow} onDeny={onDeny} />)

    await user.click(screen.getByRole('button', { name: 'ALLOW' }))
    expect(onAllow).toHaveBeenCalledTimes(1)

    await user.click(screen.getByRole('button', { name: 'DENY' }))
    expect(onDeny).toHaveBeenCalledTimes(1)
  })

  it('supports custom button labels', () => {
    render(<ApprovalGate action="Continue" allowLabel="YES" denyLabel="NO" />)
    expect(screen.getByRole('button', { name: 'YES' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'NO' })).toBeInTheDocument()
  })

  it('supports custom className', () => {
    render(<ApprovalGate action="Verify" className="custom-gate" />)
    const gate = screen.getByRole('alertdialog')
    expect(gate).toHaveClass('custom-gate')
    expect(gate).toHaveClass('nothing-approval-gate')
  })

  it('forwards ref to the div element', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<ApprovalGate action="Ref check" ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
    expect(ref.current?.tagName).toBe('DIV')
  })
})
