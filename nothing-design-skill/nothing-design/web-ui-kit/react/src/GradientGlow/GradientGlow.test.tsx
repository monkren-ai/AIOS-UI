import * as React from 'react'
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { GradientGlow } from './GradientGlow'

describe('GradientGlow', () => {
  it('renders a dotmatrix container with the right data-slot', () => {
    const { container } = render(<GradientGlow data-testid="glow" />)
    const root = container.querySelector('[data-slot="gradient-glow"]')
    expect(root).not.toBeNull()
    expect(root).toHaveAttribute('data-variant', 'dotmatrix')
    expect(root).toHaveAttribute('data-intensity', 'normal')
    expect(root).toHaveAttribute('aria-hidden', 'true')
  })

  it('renders exactly cols × rows dot elements', () => {
    const { container } = render(<GradientGlow cols={5} rows={3} />)
    const dots = container.querySelectorAll('[data-slot="gradient-glow-dot"]')
    expect(dots).toHaveLength(15)
  })

  it('reflects the intensity variant on the root', () => {
    const { container } = render(<GradientGlow intensity="strong" />)
    const root = container.querySelector('[data-slot="gradient-glow"]')
    expect(root).toHaveAttribute('data-intensity', 'strong')
  })

  it('never emits a gradient or shadow class', () => {
    const { container } = render(<GradientGlow />)
    const root = container.querySelector('[data-slot="gradient-glow"]')!
    expect(root.className).not.toMatch(/gradient|shadow|blur/)
  })

  it('accepts ref as a plain prop', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<GradientGlow ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
    expect(ref.current).toHaveAttribute('data-slot', 'gradient-glow')
  })
})
