import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Icon } from './Icon'

function TestGlyph(props: React.SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 16 16" {...props}><path d="M2 8h12" /></svg>
}

describe('Icon', () => {
  it('is decorative by default', () => {
    const { container } = render(<Icon glyph={TestGlyph} />)
    const icon = container.querySelector('[data-slot="icon"]')
    expect(icon).toHaveAttribute('aria-hidden', 'true')
    expect(icon).toHaveAttribute('data-size', 'md')
  })

  it('becomes a named image when a label is provided', () => {
    render(<Icon glyph={TestGlyph} label="Activity" size="lg" />)
    const icon = screen.getByRole('img', { name: 'Activity' })
    expect(icon).toHaveAttribute('data-size', 'lg')
    expect(icon).toHaveClass('size-6')
  })
})
