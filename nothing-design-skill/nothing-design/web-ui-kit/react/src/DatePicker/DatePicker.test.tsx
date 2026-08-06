import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { DatePicker } from './DatePicker'

describe('DatePicker', () => {
  it('renders the field with data-slot and a placeholder', () => {
    render(<DatePicker placeholder="Pick a date" data-testid="dp" />)
    expect(screen.getByTestId('dp')).toHaveAttribute('data-slot', 'date-picker')
    expect(screen.getByRole('button', { name: 'Pick a date' })).toBeInTheDocument()
  })

  it('opens the calendar on click', async () => {
    const user = userEvent.setup()
    render(<DatePicker />)
    await user.click(screen.getByRole('button'))
    await waitFor(() => {
      expect(document.querySelector('[data-slot="date-picker-day"]')).toBeInTheDocument()
    })
  })

  it('calls onValueChange with an ISO date when a day is selected', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<DatePicker onValueChange={onValueChange} />)
    await user.click(screen.getByRole('button'))
    await waitFor(() => {
      expect(document.querySelector('[data-slot="date-picker-day"]')).toBeInTheDocument()
    })
    const day = document.querySelector('[data-slot="date-picker-day"]') as HTMLElement
    await user.click(day)
    expect(onValueChange).toHaveBeenCalled()
    expect(onValueChange.mock.calls[0][0]).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })

  it('does not open when disabled', () => {
    render(<DatePicker disabled />)
    expect(screen.getByRole('button')).toBeDisabled()
    expect(document.querySelector('[data-slot="date-picker-day"]')).not.toBeInTheDocument()
  })
})
