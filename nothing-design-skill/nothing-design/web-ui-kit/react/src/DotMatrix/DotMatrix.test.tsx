import * as React from 'react'
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { DotMatrix } from './DotMatrix'

const dots = (container: HTMLElement) => container.querySelectorAll('[data-slot="dot-matrix-dot"]')

describe('DotMatrix', () => {
  it('renders with data-slot', () => {
    const { container } = render(<DotMatrix rows={2} cols={2} />)
    expect(container.querySelector('[data-slot="dot-matrix"]')).toBeInTheDocument()
  })

  it('renders rows × cols dots', () => {
    const { container } = render(<DotMatrix rows={3} cols={4} />)
    expect(container.querySelectorAll('[data-slot="dot-matrix-row"]')).toHaveLength(3)
    expect(dots(container)).toHaveLength(12)
  })

  it('marks active and dim dots through data-dot-state', () => {
    const { container } = render(
      <DotMatrix rows={2} cols={2} activeDots={[[0, 0]]} dimDots={[[1, 1]]} />,
    )
    const all = dots(container)
    expect(all[0]).toHaveAttribute('data-dot-state', 'active')
    expect(all[1]).toHaveAttribute('data-dot-state', 'idle')
    expect(all[3]).toHaveAttribute('data-dot-state', 'dim')
  })

  it('gives active precedence over dim for the same coordinate', () => {
    const { container } = render(
      <DotMatrix rows={1} cols={1} activeDots={[[0, 0]]} dimDots={[[0, 0]]} />,
    )
    expect(dots(container)[0]).toHaveAttribute('data-dot-state', 'active')
  })

  it('exposes pattern, dot size and theme through data attributes', () => {
    const { container } = render(
      <DotMatrix rows={1} cols={1} pattern="pulse" dotSize="lg" theme="dark" />,
    )
    const root = container.querySelector('[data-slot="dot-matrix"]')
    expect(root).toHaveAttribute('data-pattern', 'pulse')
    expect(root).toHaveAttribute('data-state', 'pulse')
    expect(root).toHaveAttribute('data-dot-size', 'lg')
    expect(root).toHaveAttribute('data-dot-theme', 'dark')
  })

  it('never sets data-theme, which would flip the subtree theme tokens', () => {
    const { container } = render(<DotMatrix rows={1} cols={1} theme="dark" />)
    expect(container.querySelector('[data-slot="dot-matrix"]')).not.toHaveAttribute('data-theme')
  })

  it('keeps the BEM hooks that styles/glyph.css selects on', () => {
    const { container } = render(
      <DotMatrix rows={1} cols={2} pattern="glyph" activeDots={[[0, 0]]} dimDots={[[0, 1]]} />,
    )
    const root = container.querySelector('[data-slot="dot-matrix"]')
    expect(root).toHaveClass('nothing-dot-matrix')
    expect(root).toHaveClass('nothing-dot-matrix--glyph')
    const all = dots(container)
    expect(all[0]).toHaveClass('nothing-dot-matrix__dot')
    expect(all[0]).toHaveClass('nothing-dot-matrix__dot--active')
    expect(all[1]).toHaveClass('nothing-dot-matrix__dot--dim')
  })

  it('supports custom className', () => {
    const { container } = render(<DotMatrix rows={1} cols={1} className="custom-matrix" />)
    expect(container.querySelector('[data-slot="dot-matrix"]')).toHaveClass('custom-matrix')
  })

  it('forwards ref to the root element', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<DotMatrix rows={1} cols={1} ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
