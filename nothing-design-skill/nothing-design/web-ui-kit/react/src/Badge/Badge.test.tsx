import * as React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Badge } from './Badge'

describe('Badge', () => {
  it('renders a default badge', () => {
    render(<Badge>Default</Badge>)
    const badge = screen.getByText('Default')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('nothing-badge')
  })

  it('supports variant classes', () => {
    const { rerender } = render(<Badge variant="secondary">Secondary</Badge>)
    expect(screen.getByText('Secondary')).toHaveClass('nothing-badge--secondary')

    rerender(<Badge variant="destructive">Destructive</Badge>)
    expect(screen.getByText('Destructive')).toHaveClass('nothing-badge--destructive')

    rerender(<Badge variant="outline">Outline</Badge>)
    expect(screen.getByText('Outline')).toHaveClass('nothing-badge--outline')
  })

  it('renders a dot indicator', () => {
    render(<Badge dot>Status</Badge>)
    const badge = screen.getByText('Status')
    expect(badge).toHaveClass('nothing-badge--dot')
    expect(badge.querySelector('.nothing-badge__dot')).toBeInTheDocument()
  })

  it('forwards ref', () => {
    const ref = React.createRef<HTMLSpanElement>()
    render(<Badge ref={ref}>Ref</Badge>)
    expect(ref.current).toBeInstanceOf(HTMLSpanElement)
  })
})
