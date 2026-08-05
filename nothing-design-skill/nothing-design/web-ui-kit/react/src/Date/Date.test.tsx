import * as React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { DateWidget } from './Date'

describe('DateWidget', () => {
  it('renders the rect layout by default', () => {
    render(<DateWidget data-testid="date" />)
    const widget = screen.getByTestId('date')

    expect(widget).toHaveAttribute('data-slot', 'date-widget')
    expect(widget).toHaveAttribute('data-type', 'rect')
    expect(widget).toHaveAttribute('data-state', 'rect')
    expect(widget.querySelector('[data-slot="date-widget-day"]')).toBeInTheDocument()
    expect(widget.querySelector('[data-slot="date-widget-month"]')).toBeInTheDocument()
    expect(widget.querySelector('[data-slot="date-widget-ring-progress"]')).toBeInTheDocument()
  })

  it('keeps the day numerals tabular', () => {
    render(<DateWidget data-testid="date" />)
    expect(screen.getByTestId('date').querySelector('[data-slot="date-widget-day"]')).toHaveClass(
      'tabular-nums',
    )
  })

  it('renders the dual-ring layout', () => {
    render(<DateWidget type="dual-ring" data-testid="date" />)
    const widget = screen.getByTestId('date')

    expect(widget).toHaveAttribute('data-type', 'dual-ring')
    expect(widget.querySelector('[data-slot="date-widget-ring-outer"]')).toBeInTheDocument()
    expect(widget.querySelector('[data-slot="date-widget-ring-inner"]')).toBeInTheDocument()
    expect(widget.querySelector('[data-slot="date-widget-content"]')).toBeInTheDocument()
  })

  it('renders the serif layout without a peel by default', () => {
    render(<DateWidget type="serif" data-testid="date" />)
    const widget = screen.getByTestId('date')

    expect(widget).toHaveAttribute('data-type', 'serif')
    expect(widget.querySelector('[data-slot="date-widget-peel"]')).toBeNull()
  })

  it('renders the peel and calls onPeelClick on click and keyboard', () => {
    const onPeelClick = vi.fn()
    render(<DateWidget type="serif" showPeel onPeelClick={onPeelClick} data-testid="date" />)
    const peel = screen.getByTestId('date').querySelector('[data-slot="date-widget-peel"]')!

    expect(peel).toHaveAttribute('role', 'button')
    fireEvent.click(peel)
    expect(onPeelClick).toHaveBeenCalledTimes(1)

    fireEvent.keyDown(peel, { key: 'Enter' })
    expect(onPeelClick).toHaveBeenCalledTimes(2)
  })

  it('exposes the widget palette without touching the global data-theme', () => {
    render(<DateWidget theme="dark" data-testid="date" />)
    const widget = screen.getByTestId('date')
    expect(widget).toHaveAttribute('data-widget-theme', 'dark')
    expect(widget).not.toHaveAttribute('data-theme')
  })

  it('lets a caller-supplied utility win over the variant default', () => {
    render(<DateWidget type="serif" className="rounded-none" data-testid="date" />)
    const widget = screen.getByTestId('date')
    expect(widget).toHaveClass('rounded-none')
    expect(widget).not.toHaveClass('rounded-xl')
  })

  it('accepts ref as a plain prop on every layout', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<DateWidget ref={ref} />)
    expect(ref.current).toHaveAttribute('data-slot', 'date-widget')
  })
})
