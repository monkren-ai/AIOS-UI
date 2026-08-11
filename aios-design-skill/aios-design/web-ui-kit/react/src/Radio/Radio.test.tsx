import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Radio } from './Radio'

describe('Radio', () => {
  it('renders the radio primitive and indicator slots', () => {
    render(<Radio value="alpha" aria-label="Alpha" />)
    expect(screen.getByRole('radio', { name: 'Alpha' })).toHaveAttribute('data-slot', 'radio')
    expect(document.querySelector('[data-slot="radio-indicator"]')).toBeInTheDocument()
  })

  it('reports size and disabled state', () => {
    render(<Radio value="alpha" aria-label="Alpha" size="lg" disabled />)
    const radio = screen.getByRole('radio', { name: 'Alpha' })
    expect(radio).toHaveAttribute('data-size', 'lg')
    expect(radio).toHaveAttribute('data-disabled')
  })
})
