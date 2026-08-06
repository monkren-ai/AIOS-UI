import { fireEvent, render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { TimeField } from './TimeField'

function segments() {
  return Array.from(document.querySelectorAll<HTMLElement>('[data-slot="time-field-segment"]'))
}

function inputs() {
  return Array.from(document.querySelectorAll<HTMLInputElement>('[data-slot="time-field-input"]'))
}

describe('TimeField', () => {
  it('renders two segments by default', () => {
    render(<TimeField />)
    expect(segments()).toHaveLength(2)
    expect(inputs()).toHaveLength(2)
  })

  it('renders three segments with showSeconds', () => {
    render(<TimeField showSeconds />)
    expect(segments()).toHaveLength(3)
  })

  it('defaults to the md size', () => {
    render(<TimeField data-testid="tf" />)
    expect(screen.getByTestId('tf')).toHaveAttribute('data-size', 'md')
  })

  it('advances focus when a segment fills up', () => {
    render(<TimeField />)
    const [hour, minute] = inputs()
    fireEvent.change(hour, { target: { value: '12' } })
    expect(document.activeElement).toBe(minute)
  })

  it('emits HH:mm and HH:mm:ss', () => {
    const onValueChange = vi.fn()
    render(<TimeField showSeconds onValueChange={onValueChange} />)
    const [hour, minute, second] = inputs()
    fireEvent.change(hour, { target: { value: '23' } })
    fireEvent.change(minute, { target: { value: '59' } })
    fireEvent.change(second, { target: { value: '58' } })
    expect(onValueChange).toHaveBeenLastCalledWith('23:59:58')
  })

  it('clamps hour to 23 and minute/second to 59', () => {
    const onValueChange = vi.fn()
    render(<TimeField showSeconds onValueChange={onValueChange} />)
    const [hour, minute, second] = inputs()
    fireEvent.change(hour, { target: { value: '24' } })
    fireEvent.change(minute, { target: { value: '60' } })
    fireEvent.change(second, { target: { value: '60' } })
    expect(onValueChange).toHaveBeenLastCalledWith('23:59:59')
    expect(hour).toHaveValue('23')
    expect(minute).toHaveValue('59')
    expect(second).toHaveValue('59')
  })

  it('steps back on Backspace in an empty segment', () => {
    const onValueChange = vi.fn()
    render(<TimeField value="12:30" showSeconds onValueChange={onValueChange} />)
    const [, minute, second] = inputs()
    // second is empty; backspace should jump to minute and delete a char
    fireEvent.keyDown(second, { key: 'Backspace' })
    expect(onValueChange).toHaveBeenLastCalledWith('12:3:')
    expect(document.activeElement).toBe(minute)
  })

  it('disables every segment', () => {
    render(<TimeField disabled data-testid="tf" />)
    expect(screen.getByTestId('tf')).toHaveAttribute('data-disabled', '')
    inputs().forEach((el) => expect(el).toBeDisabled())
  })
})
