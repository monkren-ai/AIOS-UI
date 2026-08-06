import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { Alert } from './Alert'

describe('Alert', () => {
  it('renders with data-slot and the soft/md defaults', () => {
    render(<Alert>Alert message</Alert>)
    const alert = screen.getByRole('status')
    expect(screen.getByText('Alert message')).toBeInTheDocument()
    expect(alert).toHaveAttribute('data-slot', 'alert')
    expect(alert).toHaveAttribute('data-variant', 'soft')
    expect(alert).toHaveAttribute('data-size', 'md')
    expect(alert).toHaveAttribute('data-state', 'visible')
  })

  it('maps the v1 default variant onto soft', () => {
    render(<Alert variant="default">Legacy</Alert>)
    expect(screen.getByRole('status')).toHaveAttribute('data-variant', 'soft')
  })

  it('renders destructive alerts with the alert role', () => {
    render(<Alert variant="destructive">Error message</Alert>)
    const alert = screen.getByRole('alert')
    expect(alert).toHaveAttribute('data-variant', 'destructive')
  })

  it('reports every size through data-size', () => {
    ;(['sm', 'md', 'lg'] as const).forEach((size) => {
      const { unmount } = render(<Alert size={size}>Sized</Alert>)
      expect(screen.getByRole('status')).toHaveAttribute('data-size', size)
      unmount()
    })
  })

  it('renders the title in its own slot', () => {
    render(<Alert title="Warning">Content</Alert>)
    expect(screen.getByText('Warning')).toHaveAttribute('data-slot', 'alert-title')
    expect(screen.getByText('Content')).toHaveAttribute('data-slot', 'alert-message')
  })

  it('renders the icon in its own slot and hides it from AT', () => {
    render(<Alert icon={<span data-testid="alert-icon">!</span>}>Content</Alert>)
    const icon = screen.getByTestId('alert-icon').closest('[data-slot="alert-icon"]')
    expect(icon).toBeInTheDocument()
    expect(icon).toHaveAttribute('aria-hidden', 'true')
  })

  it('flips to the exiting state then calls onClose', () => {
    vi.useFakeTimers()
    const handleClose = vi.fn()
    render(<Alert onClose={handleClose}>Closable</Alert>)

    const closeButton = screen.getByRole('button', { name: 'Close alert' })
    expect(closeButton).toHaveAttribute('data-slot', 'alert-close')

    act(() => {
      fireEvent.click(closeButton)
    })
    expect(screen.getByRole('status')).toHaveAttribute('data-state', 'exiting')

    act(() => {
      vi.advanceTimersByTime(300)
    })
    expect(handleClose).toHaveBeenCalledTimes(1)

    vi.useRealTimers()
  })

  it('does not render a close button without onClose', () => {
    render(<Alert>No close</Alert>)
    expect(screen.queryByRole('button', { name: 'Close alert' })).toBeNull()
  })

  it('lets a caller-supplied utility win over the variant default', () => {
    render(<Alert className="rounded-none">Squared</Alert>)
    const alert = screen.getByRole('status')
    expect(alert).toHaveClass('rounded-none')
    expect(alert).not.toHaveClass('rounded-md')
  })

  it('accepts ref as a plain prop', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(
      <Alert className="custom-alert" ref={ref}>
        Ref
      </Alert>,
    )
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
    expect(ref.current).toHaveClass('custom-alert')
  })
})
