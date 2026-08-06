import * as React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Badge } from './Badge'
import { badgeVariants } from './badge-variants'

const VARIANTS = ['primary', 'soft', 'outline', 'destructive'] as const
const SIZES = ['sm', 'md', 'lg'] as const

describe('Badge', () => {
  it('renders with data-slot and the primary/md defaults', () => {
    render(<Badge>Default</Badge>)
    const badge = screen.getByText('Default')
    expect(badge).toHaveAttribute('data-slot', 'badge')
    expect(badge).toHaveAttribute('data-variant', 'primary')
    expect(badge).toHaveAttribute('data-size', 'md')
  })

  it('reports every variant through data-variant', () => {
    VARIANTS.forEach((variant) => {
      const { unmount } = render(<Badge variant={variant}>Badge</Badge>)
      expect(screen.getByText('Badge')).toHaveAttribute('data-variant', variant)
      unmount()
    })
  })

  it('reports every size through data-size', () => {
    SIZES.forEach((size) => {
      const { unmount } = render(<Badge size={size}>Badge</Badge>)
      expect(screen.getByText('Badge')).toHaveAttribute('data-size', size)
      unmount()
    })
  })

  it('maps the v1 variant aliases onto their replacements', () => {
    const { unmount } = render(<Badge variant="default">Legacy default</Badge>)
    expect(screen.getByText('Legacy default')).toHaveAttribute('data-variant', 'primary')
    unmount()

    render(<Badge variant="secondary">Legacy secondary</Badge>)
    expect(screen.getByText('Legacy secondary')).toHaveAttribute('data-variant', 'soft')
  })

  it('renders a dot indicator as its own slot', () => {
    render(<Badge dot>Status</Badge>)
    const badge = screen.getByText('Status')
    expect(badge).toHaveAttribute('data-dot', '')
    const dotEl = badge.querySelector('[data-slot="badge-dot"]')
    expect(dotEl).toBeInTheDocument()
    expect(dotEl).toHaveAttribute('aria-hidden', 'true')
  })

  it('omits the dot slot by default', () => {
    render(<Badge>No dot</Badge>)
    const badge = screen.getByText('No dot')
    expect(badge).not.toHaveAttribute('data-dot')
    expect(badge.querySelector('[data-slot="badge-dot"]')).toBeNull()
  })

  it('lets a caller-supplied utility win over the variant default', () => {
    render(<Badge className="rounded-none">Squared</Badge>)
    const badge = screen.getByText('Squared')
    expect(badge).toHaveClass('rounded-none')
    expect(badge).not.toHaveClass('rounded-pill')
  })

  it('accepts ref as a plain prop', () => {
    const ref = React.createRef<HTMLSpanElement>()
    render(<Badge ref={ref}>Ref</Badge>)
    expect(ref.current).toBeInstanceOf(HTMLSpanElement)
  })

  it('exports badgeVariants so other elements can borrow the badge look', () => {
    render(
      <a href="/tags" className={badgeVariants({ variant: 'outline', size: 'sm' })}>
        Tagged
      </a>,
    )
    expect(screen.getByRole('link', { name: 'Tagged' }).tagName).toBe('A')
  })
})
