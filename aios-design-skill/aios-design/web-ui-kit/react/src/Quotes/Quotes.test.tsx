import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Quotes } from './Quotes'

const twoQuotes = [
  { text: 'Less, but better.', author: 'Dieter Rams' },
  { text: 'Form follows function.', author: 'Louis Sullivan' },
]

describe('Quotes', () => {
  it('renders the widget shell with its slots', () => {
    render(<Quotes quotes={twoQuotes} data-testid="quotes" />)
    const widget = screen.getByTestId('quotes')

    expect(widget).toHaveAttribute('data-slot', 'quotes')
    expect(widget).toHaveAttribute('data-state', 'ready')
    expect(widget.querySelector('[data-slot="quotes-progress"]')).toBeInTheDocument()
    expect(widget.querySelector('[data-slot="quotes-text"]')).toBeInTheDocument()
    expect(widget.querySelector('[data-slot="quotes-author"]')).toBeInTheDocument()
  })

  it('draws both rings with a visible stroke', () => {
    render(<Quotes quotes={twoQuotes} data-testid="quotes" />)
    const rings = screen.getByTestId('quotes').querySelectorAll('[data-slot="quotes-ring"]')

    expect(rings).toHaveLength(2)
    for (const ring of rings) {
      expect(ring).toHaveClass('stroke-current')
      expect(ring).toHaveClass('[stroke-width:2]')
      expect(ring).toHaveClass('fill-none')
    }
  })

  it('keeps the track fainter than the progress arc', () => {
    render(<Quotes quotes={twoQuotes} data-testid="quotes" />)
    const widget = screen.getByTestId('quotes')
    const track = widget.querySelector('[data-slot="quotes-ring"][data-kind="bg"]')
    const progress = widget.querySelector('[data-slot="quotes-ring"][data-kind="progress"]')

    expect(track).toHaveClass('opacity-15')
    expect(progress).toHaveClass('opacity-70')
    expect(progress).not.toHaveClass('opacity-15')
    expect(progress).toHaveClass('-rotate-90')
  })

  it('takes the ring colour from the widget theme', () => {
    const { unmount } = render(<Quotes quotes={twoQuotes} theme="dark" data-testid="quotes" />)
    expect(screen.getByTestId('quotes').querySelector('[data-slot="quotes-progress"]')).toHaveClass(
      'text-[var(--widget-white)]',
    )
    unmount()

    render(<Quotes quotes={twoQuotes} theme="light" data-testid="quotes" />)
    expect(screen.getByTestId('quotes').querySelector('[data-slot="quotes-progress"]')).toHaveClass(
      'text-[var(--widget-dark-2)]',
    )
  })

  it('advances the dash offset with the quote index', () => {
    render(<Quotes quotes={twoQuotes} data-testid="quotes" />)
    const widget = screen.getByTestId('quotes')
    const progress = widget.querySelector('[data-slot="quotes-ring"][data-kind="progress"]')
    const index = Number(widget.getAttribute('data-index'))

    expect(progress).toHaveAttribute('stroke-dasharray', '100')
    expect(progress).toHaveAttribute(
      'stroke-dashoffset',
      String(100 - ((index + 1) / twoQuotes.length) * 100),
    )
  })

  it('fills the ring instead of dividing by zero on an empty list', () => {
    render(<Quotes quotes={[]} data-testid="quotes" />)
    const widget = screen.getByTestId('quotes')

    expect(widget).toHaveAttribute('data-state', 'empty')
    expect(widget.querySelector('[data-slot="quotes-ring"][data-kind="progress"]')).toHaveAttribute(
      'stroke-dashoffset',
      '0',
    )
  })

  it('lets a caller-supplied utility win over the variant default', () => {
    render(<Quotes quotes={twoQuotes} className="rounded-none" data-testid="quotes" />)
    const widget = screen.getByTestId('quotes')
    expect(widget).toHaveClass('rounded-none')
    expect(widget).not.toHaveClass('rounded-full')
  })
})
