import * as React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { DateNav } from './DateNav'

const MARCH_2024 = new Date(2024, 2, 10)

describe('DateNav', () => {
  it('renders with data-slot and derives the label from the current date', () => {
    render(<DateNav initialDate={MARCH_2024} data-testid="nav" />)
    const nav = screen.getByTestId('nav')

    expect(nav).toHaveAttribute('data-slot', 'date-nav')
    expect(nav).toHaveAttribute('data-month', '2')
    expect(nav).toHaveAttribute('data-year', '2024')
    expect(nav).toHaveAttribute('data-real', '')
    expect(nav.querySelector('[data-slot="date-nav-label"]')).toHaveTextContent('March 2024')
  })

  it('marks an externally supplied label as not derived', () => {
    render(<DateNav label="Q1" data-testid="nav" />)
    const nav = screen.getByTestId('nav')
    expect(nav).not.toHaveAttribute('data-real')
    expect(nav.querySelector('[data-slot="date-nav-label"]')).toHaveTextContent('Q1')
  })

  it('shifts the month in uncontrolled mode and reports it', () => {
    const onDateChange = vi.fn()
    render(<DateNav initialDate={MARCH_2024} onDateChange={onDateChange} data-testid="nav" />)
    const label = () => screen.getByTestId('nav').querySelector('[data-slot="date-nav-label"]')

    fireEvent.click(screen.getByLabelText('Previous'))
    expect(label()).toHaveTextContent('February 2024')
    expect(onDateChange).toHaveBeenCalledTimes(1)

    fireEvent.click(screen.getByLabelText('Next'))
    expect(label()).toHaveTextContent('March 2024')
    expect(onDateChange).toHaveBeenCalledTimes(2)
  })

  it('leaves the date alone in controlled mode but still fires onPrev/onNext', () => {
    const onPrev = vi.fn()
    const onNext = vi.fn()
    render(<DateNav currentDate={MARCH_2024} onPrev={onPrev} onNext={onNext} data-testid="nav" />)

    fireEvent.click(screen.getByLabelText('Previous'))
    fireEvent.click(screen.getByLabelText('Next'))

    expect(onPrev).toHaveBeenCalledTimes(1)
    expect(onNext).toHaveBeenCalledTimes(1)
    expect(
      screen.getByTestId('nav').querySelector('[data-slot="date-nav-label"]'),
    ).toHaveTextContent('March 2024')
  })

  it('disables the whole control through data-disabled', () => {
    const onPrev = vi.fn()
    render(<DateNav disabled onPrev={onPrev} data-testid="nav" />)
    const nav = screen.getByTestId('nav')

    expect(nav).toHaveAttribute('data-disabled', '')
    expect(screen.getByLabelText('Previous')).toBeDisabled()
    expect(screen.getByLabelText('Next')).toBeDisabled()
  })

  it('disables a single arrow independently', () => {
    render(<DateNav prevDisabled data-testid="nav" />)
    expect(screen.getByLabelText('Previous')).toBeDisabled()
    expect(screen.getByLabelText('Previous')).toHaveAttribute('data-disabled', '')
    expect(screen.getByLabelText('Next')).not.toBeDisabled()
  })

  it('switches the label to the body typeface when grotesk is set', () => {
    const { rerender } = render(<DateNav data-testid="nav" />)
    expect(screen.getByTestId('nav').querySelector('[data-slot="date-nav-label"]')).toHaveClass(
      'font-mono',
    )

    rerender(<DateNav grotesk data-testid="nav" />)
    expect(screen.getByTestId('nav').querySelector('[data-slot="date-nav-label"]')).toHaveClass(
      'font-body',
    )
  })

  it('keeps the year numerals tabular', () => {
    render(<DateNav data-testid="nav" />)
    expect(screen.getByTestId('nav').querySelector('[data-slot="date-nav-label"]')).toHaveClass(
      'tabular-nums',
    )
  })

  it('accepts ref as a plain prop', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<DateNav ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
