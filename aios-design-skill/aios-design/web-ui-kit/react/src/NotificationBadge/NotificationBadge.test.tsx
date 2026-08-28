import * as React from 'react'
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { NotificationBadge } from './NotificationBadge'

describe('NotificationBadge', () => {
  it('renders children without a marker when count is zero', () => {
    render(
      <NotificationBadge count={0}>
        <button type="button">Inbox</button>
      </NotificationBadge>,
    )
    expect(screen.getByRole('button', { name: 'Inbox' })).toBeInTheDocument()
    expect(document.querySelector('[data-slot="notification-badge-marker"]')).not.toBeInTheDocument()
  })

  it('shows a count badge when count is positive', () => {
    render(
      <NotificationBadge count={12}>
        <button type="button">Inbox</button>
      </NotificationBadge>,
    )
    const root = document.querySelector('[data-slot="notification-badge"]')
    expect(root).toHaveAttribute('data-count', '12')
    expect(screen.getByText('12')).toBeInTheDocument()
  })

  it('caps the displayed count at max', () => {
    render(
      <NotificationBadge count={120} max={99}>
        <button type="button">Inbox</button>
      </NotificationBadge>,
    )
    expect(screen.getByText('99+')).toBeInTheDocument()
  })

  it('renders a decorative dot when requested without a count', () => {
    render(
      <NotificationBadge dot>
        <button type="button">Inbox</button>
      </NotificationBadge>,
    )
    expect(document.querySelector('[data-slot="notification-badge-dot"]')).toBeInTheDocument()
  })

  it('accepts ref as a plain prop', () => {
    const ref = React.createRef<HTMLSpanElement>()
    render(
      <NotificationBadge ref={ref} count={1}>
        <span>Item</span>
      </NotificationBadge>,
    )
    expect(ref.current).toBeInstanceOf(HTMLSpanElement)
  })
})
