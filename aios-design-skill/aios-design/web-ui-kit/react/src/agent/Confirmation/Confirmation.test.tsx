import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Confirmation } from './Confirmation'

describe('Confirmation', () => {
  it('maps approval actions and danger state', () => {
    const onApprove = vi.fn()
    const onDeny = vi.fn()
    render(<Confirmation title="Deploy?" danger onApprove={onApprove} onDeny={onDeny} />)
    expect(document.querySelector('[data-slot="confirmation"]')).toBeInTheDocument()
    expect(screen.getByRole('alertdialog')).toHaveAttribute('data-risk', 'high')
    fireEvent.click(screen.getByRole('button', { name: '批准 / Approve' }))
    fireEvent.click(screen.getByRole('button', { name: '拒绝 / Deny' }))
    expect(onApprove).toHaveBeenCalledOnce()
    expect(onDeny).toHaveBeenCalledOnce()
  })

  it('renders an approved result state', () => {
    render(<Confirmation title="Deploy?" state="approved" />)
    expect(document.querySelector('[data-slot="approval-gate"]')).toHaveTextContent(
      '已批准 / Approved',
    )
  })
})
