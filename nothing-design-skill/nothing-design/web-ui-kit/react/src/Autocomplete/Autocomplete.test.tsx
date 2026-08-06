import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Autocomplete } from './Autocomplete'

const ITEMS = [
  { value: 'phone-2a', label: 'Phone (2a)' },
  { value: 'phone-2', label: 'Phone (2)' },
  { value: 'ear', label: 'Ear' },
  { value: 'ear-open', label: 'Ear (open)' },
]

describe('Autocomplete', () => {
  it('renders the input with data-slot and md/outline defaults', () => {
    render(<Autocomplete items={ITEMS} placeholder="Pick a device" data-testid="ac" />)
    const root = screen.getByTestId('ac')
    expect(root).toHaveAttribute('data-slot', 'autocomplete')
    expect(root).toHaveAttribute('data-size', 'md')
    expect(root).toHaveAttribute('data-variant', 'outline')
    expect(screen.getByPlaceholderText('Pick a device')).toHaveAttribute(
      'data-slot',
      'autocomplete-input',
    )
  })

  it('renders a label associated with the input', () => {
    render(<Autocomplete items={ITEMS} label="Device" placeholder="Pick" />)
    expect(screen.getByLabelText('Device')).toHaveAttribute('data-slot', 'autocomplete-input')
  })

  it('fires onValueChange while typing', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <Autocomplete items={ITEMS} onValueChange={onValueChange} placeholder="Pick" />,
    )
    await user.click(screen.getByPlaceholderText('Pick'))
    await user.type(screen.getByPlaceholderText('Pick'), 'ear')
    expect(onValueChange).toHaveBeenCalled()
    expect(onValueChange).toHaveBeenLastCalledWith('ear')
  })

  it('opens the list and filters by label', async () => {
    const user = userEvent.setup()
    const { baseElement } = render(<Autocomplete items={ITEMS} placeholder="Pick" />)
    await user.click(screen.getByPlaceholderText('Pick'))
    await user.type(screen.getByPlaceholderText('Pick'), 'ear')
    const options = await waitFor(() =>
      within(baseElement).getAllByRole('option'),
    )
    // "Ear" 与 "Ear (open)" 都匹配
    expect(options.length).toBeGreaterThanOrEqual(2)
  })

  it('renders the error message and flags the invalid state', () => {
    render(<Autocomplete items={ITEMS} error="Required" data-testid="ac" />)
    expect(screen.getByText('Required')).toHaveAttribute('data-slot', 'autocomplete-error')
    expect(screen.getByTestId('ac')).toHaveAttribute('data-invalid', '')
  })

  it('disables the input when disabled', () => {
    render(<Autocomplete items={ITEMS} disabled placeholder="Pick" data-testid="ac" />)
    expect(screen.getByPlaceholderText('Pick')).toBeDisabled()
    expect(screen.getByTestId('ac')).toHaveAttribute('data-disabled', '')
  })

  it('accepts ref as a plain prop pointing at the outer wrapper', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<Autocomplete ref={ref} items={ITEMS} placeholder="Pick" data-testid="ac" />)
    expect(ref.current).toBeInstanceOf(HTMLElement)
    expect(ref.current).toHaveAttribute('data-slot', 'autocomplete')
  })
})
