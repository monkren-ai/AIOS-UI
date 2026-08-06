import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Sparkline } from './Sparkline'

describe('Sparkline', () => {
  it('renders an svg with data-slot', () => {
    const { container } = render(<Sparkline data={[1, 2, 3]} />)
    const svg = container.querySelector('svg') as SVGElement
    expect(svg).toHaveAttribute('data-slot', 'sparkline')
  })

  it('does not crash on empty data and renders no polyline', () => {
    const { container } = render(<Sparkline data={[]} />)
    expect(container.querySelector('svg')).toBeInTheDocument()
    expect(container.querySelector('polyline')).not.toBeInTheDocument()
  })

  it('emits one polyline point per data point', () => {
    const { container } = render(<Sparkline data={[1, 2, 3, 4]} />)
    const poly = container.querySelector('polyline') as SVGElement
    const points = (poly.getAttribute('points') ?? '').trim().split(/\s+/)
    expect(points).toHaveLength(4)
  })

  it('renders extreme markers when showExtremes is on', () => {
    const { container } = render(<Sparkline data={[1, 2, 3, 4]} showExtremes />)
    expect(container.querySelectorAll('circle')).toHaveLength(2)
  })

  it('renders first and last values when showValues is on', () => {
    const { container } = render(<Sparkline data={[1, 2, 3, 4]} showValues />)
    const texts = container.querySelectorAll('text')
    expect(texts).toHaveLength(2)
    expect(texts[0].textContent).toBe('1')
    expect(texts[1].textContent).toBe('4')
  })
})
