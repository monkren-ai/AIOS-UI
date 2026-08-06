import { fireEvent, render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { DateField } from './DateField'

function segments() {
  return Array.from(document.querySelectorAll<HTMLElement>('[data-slot="date-field-segment"]'))
}

function inputs() {
  return Array.from(document.querySelectorAll<HTMLInputElement>('[data-slot="date-field-input"]'))
}

describe('DateField', () => {
  it('renders three segments with data-slot', () => {
    render(<DateField />)
    expect(segments()).toHaveLength(3)
    expect(inputs()).toHaveLength(3)
  })

  it('defaults to the md size and YMD order', () => {
    render(<DateField data-testid="df" value="2026-08-06" />)
    expect(screen.getByTestId('df')).toHaveAttribute('data-size', 'md')
    expect(segments()[0]).toHaveAttribute('data-kind', 'year')
  })

  it('advances focus when a segment fills up', () => {
    render(<DateField />)
    const [year, month] = inputs()
    fireEvent.change(year, { target: { value: '2026' } })
    expect(document.activeElement).toBe(month)
  })

  it('emits an ISO string once all segments are filled', () => {
    const onValueChange = vi.fn()
    render(<DateField onValueChange={onValueChange} />)
    const [year, month, day] = inputs()
    fireEvent.change(year, { target: { value: '2026' } })
    fireEvent.change(month, { target: { value: '08' } })
    fireEvent.change(day, { target: { value: '06' } })
    expect(onValueChange).toHaveBeenLastCalledWith('2026-08-06')
  })

  it('steps back on Backspace in an empty segment', () => {
    const onValueChange = vi.fn()
    render(<DateField value="2026-08" onValueChange={onValueChange} />)
    const [, month, day] = inputs()
    fireEvent.keyDown(day, { key: 'Backspace' })
    expect(onValueChange).toHaveBeenLastCalledWith('2026-0-')
    expect(document.activeElement).toBe(month)
  })

  it('clamps month and day to their ranges', () => {
    const onValueChange = vi.fn()
    render(<DateField onValueChange={onValueChange} />)
    const [year, month, day] = inputs()
    fireEvent.change(year, { target: { value: '2026' } })
    fireEvent.change(month, { target: { value: '13' } })
    expect(onValueChange).toHaveBeenLastCalledWith('2026-12-')
    fireEvent.change(day, { target: { value: '32' } })
    expect(onValueChange).toHaveBeenLastCalledWith('2026-12-31')
  })

  it('renders in MDY order for locale="en"', () => {
    render(<DateField locale="en" value="2026-08-06" />)
    const segs = segments()
    expect(segs[0]).toHaveAttribute('data-kind', 'month')
    expect(segs[2]).toHaveAttribute('data-kind', 'year')
  })

  it('disables every segment', () => {
    render(<DateField disabled data-testid="df" />)
    expect(screen.getByTestId('df')).toHaveAttribute('data-disabled', '')
    inputs().forEach((el) => expect(el).toBeDisabled())
  })
})
