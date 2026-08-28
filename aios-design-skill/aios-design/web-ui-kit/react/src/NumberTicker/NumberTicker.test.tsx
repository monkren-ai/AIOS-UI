import * as React from 'react'
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { NumberTicker } from './NumberTicker'

describe('NumberTicker', () => {
  it('renders the value with data-slot', () => {
    render(<NumberTicker value={12} />)
    const ticker = screen.getByText('1').closest('[data-slot="number-ticker"]')
    expect(ticker).toHaveAttribute('data-size', 'md')
    expect(ticker?.textContent).toBe('12')
  })

  it('renders prefix and suffix slots', () => {
    render(<NumberTicker value={8} prefix="$" suffix="%" />)
    expect(screen.getByText('$')).toHaveAttribute('data-slot', 'number-ticker-prefix')
    expect(screen.getByText('%')).toHaveAttribute('data-slot', 'number-ticker-suffix')
  })

  it('marks changed digits when the value updates', () => {
    const { rerender } = render(<NumberTicker value={10} />)
    rerender(<NumberTicker value={21} />)
    const digits = document.querySelectorAll('[data-slot="number-ticker-digit"]')
    expect(digits).toHaveLength(2)
    expect(digits[0]).toHaveAttribute('data-changed')
    expect(digits[1]).toHaveAttribute('data-changed')
  })

  it('accepts ref as a plain prop', () => {
    const ref = React.createRef<HTMLSpanElement>()
    render(<NumberTicker ref={ref} value={1} />)
    expect(ref.current).toBeInstanceOf(HTMLSpanElement)
  })
})
