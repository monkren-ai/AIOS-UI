import * as React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Surfaces } from './Surfaces'

describe('Surfaces', () => {
  it('renders with data-slot', () => {
    render(<Surfaces>Content</Surfaces>)
    expect(screen.getByText('Content').closest('[data-slot]')).toHaveAttribute(
      'data-slot',
      'surface',
    )
  })

  it('renders children', () => {
    render(<Surfaces>Child</Surfaces>)
    expect(screen.getByText('Child')).toBeInTheDocument()
  })

  it('renders all elevations and exposes them through data-elevation', () => {
    for (let elevation = 1; elevation <= 8; elevation += 1) {
      const { unmount } = render(<Surfaces elevation={elevation as 1}>E{elevation}</Surfaces>)
      const surface = screen.getByText(`E${elevation}`).closest('[data-slot]')
      expect(surface).toHaveAttribute('data-elevation', String(elevation))
      unmount()
    }
  })

  it('supports padding variants', () => {
    const paddings = ['none', 'sm', 'md', 'lg'] as const
    for (const padding of paddings) {
      const { unmount } = render(<Surfaces padding={padding}>P</Surfaces>)
      expect(screen.getByText('P').closest('[data-slot]')).toHaveAttribute('data-padding', padding)
      unmount()
    }
  })

  it('supports border variants', () => {
    const borders = ['none', 'default', 'visible'] as const
    for (const border of borders) {
      const { unmount } = render(<Surfaces border={border}>B</Surfaces>)
      expect(screen.getByText('B').closest('[data-slot]')).toHaveAttribute('data-border', border)
      unmount()
    }
  })

  it('supports radius variants', () => {
    const radii = ['none', 'sm', 'md', 'lg'] as const
    for (const radius of radii) {
      const { unmount } = render(<Surfaces radius={radius}>R</Surfaces>)
      expect(screen.getByText('R').closest('[data-slot]')).toHaveAttribute('data-radius', radius)
      unmount()
    }
  })

  it('supports custom className', () => {
    render(<Surfaces className="custom-surface">X</Surfaces>)
    expect(screen.getByText('X').closest('[data-slot]')).toHaveClass('custom-surface')
  })

  it('lets the caller override variant defaults', () => {
    render(
      <Surfaces radius="lg" className="rounded-none">
        X
      </Surfaces>,
    )
    const surface = screen.getByText('X').closest('[data-slot]')
    expect(surface).toHaveClass('rounded-none')
    expect(surface).not.toHaveClass('rounded-lg')
  })

  it('forwards ref to the div element', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<Surfaces ref={ref}>X</Surfaces>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
    expect(ref.current?.tagName).toBe('DIV')
  })
})
