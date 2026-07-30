import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Select } from './Select'

const OPTIONS = [
  { value: 'a', label: 'Apple' },
  { value: 'b', label: 'Banana' },
  { value: 'c', label: 'Cherry', disabled: true },
]

describe('Select', () => {
  it('renders trigger with placeholder', () => {
    render(<Select options={OPTIONS} placeholder="Choose a fruit" />)
    expect(screen.getByRole('combobox')).toHaveTextContent('Choose a fruit')
  })

  it('opens popup and selects an option', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<Select options={OPTIONS} onValueChange={handleChange} />)

    const trigger = screen.getByRole('combobox')
    await user.click(trigger)

    await waitFor(() => {
      expect(screen.getByRole('option', { name: 'Apple' })).toBeInTheDocument()
    })

    await user.click(screen.getByRole('option', { name: 'Banana' }))
    expect(handleChange).toHaveBeenCalledWith('b')
  })

  it('respects disabled options', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<Select options={OPTIONS} onValueChange={handleChange} />)

    await user.click(screen.getByRole('combobox'))
    await waitFor(() => {
      expect(screen.getByRole('option', { name: 'Cherry' })).toHaveAttribute('aria-disabled', 'true')
    })
  })

  it('renders error message', () => {
    render(<Select options={OPTIONS} error="Required" />)
    expect(screen.getByText('Required')).toHaveClass('nothing-select__error')
  })

  it('supports controlled value', () => {
    render(<Select options={OPTIONS} value="b" />)
    expect(screen.getByRole('combobox')).toHaveTextContent('Banana')
  })
})
