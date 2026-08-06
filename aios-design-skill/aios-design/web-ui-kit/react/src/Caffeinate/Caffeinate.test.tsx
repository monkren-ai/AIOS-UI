import * as React from 'react'
import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { Caffeinate } from './Caffeinate'

describe('Caffeinate', () => {
  it('renders empty at 0mg with the low status', () => {
    render(<Caffeinate data-testid="caffeinate" />)
    const widget = screen.getByTestId('caffeinate')

    expect(widget).toHaveAttribute('data-slot', 'caffeinate')
    expect(widget).toHaveAttribute('data-state', 'low')
    expect(widget.querySelector('[data-slot="caffeinate-level"]')).toHaveTextContent('0')
    expect(widget.querySelector('[data-slot="caffeinate-unit"]')).toHaveTextContent('mg')
    expect(widget.querySelector('[data-slot="caffeinate-decay"]')).toHaveTextContent('Below 50mg')
  })

  it('keeps the milligram readout on tabular numerals', () => {
    render(<Caffeinate data-testid="caffeinate" />)
    expect(
      screen.getByTestId('caffeinate').querySelector('[data-slot="caffeinate-level"]'),
    ).toHaveClass('tabular-nums')
  })

  it('renders one segment per totalSegments', () => {
    render(<Caffeinate totalSegments={6} data-testid="caffeinate" />)
    expect(
      screen.getByTestId('caffeinate').querySelectorAll('[data-slot="caffeinate-segment"]'),
    ).toHaveLength(6)
  })

  it('adds a drink and fills the meter', () => {
    render(<Caffeinate data-testid="caffeinate" />)
    fireEvent.click(screen.getByRole('button', { name: /Coffee/ }))

    const widget = screen.getByTestId('caffeinate')
    expect(widget.querySelector('[data-slot="caffeinate-level"]')).toHaveTextContent('95')
    expect(widget.querySelectorAll('[data-slot="caffeinate-log-item"]')).toHaveLength(1)
    expect(widget.querySelector('[data-slot="caffeinate-log-type"]')).toHaveTextContent('Coffee')
    expect(
      widget.querySelectorAll('[data-slot="caffeinate-segment"][data-filled]').length,
    ).toBeGreaterThan(0)
  })

  it('escalates the status as caffeine accumulates', () => {
    render(<Caffeinate data-testid="caffeinate" />)
    // 一杯 95mg 还在 low，两杯 190mg 进 medium，三杯 285mg 进 high
    fireEvent.click(screen.getByRole('button', { name: /Coffee/ }))
    expect(screen.getByTestId('caffeinate')).toHaveAttribute('data-state', 'low')

    fireEvent.click(screen.getByRole('button', { name: /Coffee/ }))
    expect(screen.getByTestId('caffeinate')).toHaveAttribute('data-state', 'medium')

    fireEvent.click(screen.getByRole('button', { name: /Coffee/ }))
    expect(screen.getByTestId('caffeinate')).toHaveAttribute('data-state', 'high')
  })

  it('lets an explicit status override the derived one', () => {
    render(<Caffeinate status="high" data-testid="caffeinate" />)
    expect(screen.getByTestId('caffeinate')).toHaveAttribute('data-state', 'high')
  })

  it('gives each status its own readout colour', () => {
    const colours: Record<'low' | 'medium' | 'high', string> = {
      low: 'text-success',
      medium: 'text-foreground-display',
      high: 'text-warning',
    }

    for (const [status, colour] of Object.entries(colours)) {
      const { unmount } = render(
        <Caffeinate status={status as 'low' | 'medium' | 'high'} data-testid="caffeinate" />,
      )
      const level = screen.getByTestId('caffeinate').querySelector('[data-slot="caffeinate-level"]')

      expect(level).toHaveClass(colour)
      for (const other of Object.values(colours)) {
        if (other !== colour) expect(level).not.toHaveClass(other)
      }
      unmount()
    }
  })

  it('escalates the filled segment colour with the status', () => {
    const filledColour = (status: 'low' | 'medium' | 'high') => {
      const { unmount } = render(<Caffeinate status={status} data-testid="caffeinate" />)
      fireEvent.click(screen.getByRole('button', { name: /Coffee/ }))
      const filled = screen
        .getByTestId('caffeinate')
        .querySelectorAll('[data-slot="caffeinate-segment"][data-filled]')
      expect(filled.length).toBeGreaterThan(0)
      const classes = Array.from(filled).map((s) => s.className)
      unmount()
      return classes
    }

    expect(filledColour('low').every((c) => c.includes('bg-success'))).toBe(true)
    expect(filledColour('medium').every((c) => c.includes('bg-foreground-display'))).toBe(true)
    expect(filledColour('high').every((c) => c.includes('bg-warning'))).toBe(true)
  })

  it('leaves the empty segments on the neutral track colour', () => {
    render(<Caffeinate status="high" totalSegments={6} data-testid="caffeinate" />)
    const segments = screen
      .getByTestId('caffeinate')
      .querySelectorAll('[data-slot="caffeinate-segment"]')

    expect(Array.from(segments).every((s) => s.classList.contains('bg-border'))).toBe(true)
    expect(Array.from(segments).some((s) => s.classList.contains('bg-warning'))).toBe(false)
  })

  it('blocks intake while disabled', () => {
    render(<Caffeinate disabled data-testid="caffeinate" />)
    const widget = screen.getByTestId('caffeinate')

    expect(widget).toHaveAttribute('data-disabled', '')
    expect(widget).toHaveAttribute('aria-disabled', 'true')

    const coffee = screen.getByRole('button', { name: /Coffee/ })
    expect(coffee).toBeDisabled()
    fireEvent.click(coffee)
    expect(widget.querySelectorAll('[data-slot="caffeinate-log-item"]')).toHaveLength(0)
  })

  it('keeps at most five entries in the intake log', () => {
    render(<Caffeinate data-testid="caffeinate" />)
    for (let i = 0; i < 7; i++) {
      fireEvent.click(screen.getByRole('button', { name: /Tea/ }))
    }
    expect(
      screen.getByTestId('caffeinate').querySelectorAll('[data-slot="caffeinate-log-item"]'),
    ).toHaveLength(5)
  })

  it('lets a caller-supplied utility win over the variant default', () => {
    render(<Caffeinate className="rounded-none" data-testid="caffeinate" />)
    const widget = screen.getByTestId('caffeinate')
    expect(widget).toHaveClass('rounded-none')
    expect(widget).not.toHaveClass('rounded-lg')
  })

  it('accepts ref as a plain prop', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<Caffeinate ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
