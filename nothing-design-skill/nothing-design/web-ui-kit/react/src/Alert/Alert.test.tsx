import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { Alert } from './Alert'

describe('Alert', () => {
  it('renders default alert', () => {
    render(<Alert>Alert message</Alert>)
    expect(screen.getByText('Alert message')).toBeInTheDocument()
    const alert = screen.getByRole('status')
    expect(alert).toHaveClass('nothing-alert')
  })

  it('renders destructive alert with alert role', () => {
    render(<Alert variant="destructive">Error message</Alert>)
    const alert = screen.getByRole('alert')
    expect(alert).toHaveClass('nothing-alert--destructive')
  })

  it('renders title', () => {
    render(<Alert title="Warning">Content</Alert>)
    expect(screen.getByText('Warning')).toHaveClass('nothing-alert__title')
  })

  it('renders icon', () => {
    render(<Alert icon={<span data-testid="alert-icon">!</span>}>Content</Alert>)
    expect(screen.getByTestId('alert-icon')).toBeInTheDocument()
  })

  it('renders close button and calls onClose after exit animation', () => {
    vi.useFakeTimers()
    const handleClose = vi.fn()
    render(<Alert onClose={handleClose}>Closable</Alert>)

    const closeButton = screen.getByRole('button', { name: 'Close alert' })
    expect(closeButton).toBeInTheDocument()

    act(() => {
      fireEvent.click(closeButton)
    })
    expect(screen.getByRole('status')).toHaveClass('nothing-alert--exiting')

    act(() => {
      vi.advanceTimersByTime(300)
    })
    expect(handleClose).toHaveBeenCalledTimes(1)

    vi.useRealTimers()
  })

  it('supports custom className and ref', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(
      <Alert className="custom-alert" ref={ref}>
        Ref
      </Alert>,
    )
    expect(ref.current).toHaveClass('custom-alert')
    expect(ref.current).toHaveClass('nothing-alert')
  })
})
