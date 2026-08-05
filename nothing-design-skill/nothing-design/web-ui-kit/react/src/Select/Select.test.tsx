import { describe, it, expect, vi } from 'vitest'
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
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
      expect(screen.getByRole('option', { name: 'Cherry' })).toHaveAttribute(
        'aria-disabled',
        'true',
      )
    })
  })

  it('renders error message', () => {
    render(<Select options={OPTIONS} error="Required" />)
    expect(screen.getByText('Required')).toHaveAttribute('data-slot', 'select-error')
  })

  it('flags the invalid state on the root and the trigger', () => {
    render(<Select options={OPTIONS} error="Required" data-testid="select" />)
    expect(screen.getByTestId('select')).toHaveAttribute('data-invalid', '')
    expect(screen.getByRole('combobox')).toHaveAttribute('data-invalid', '')
  })

  it('supports controlled value', () => {
    render(<Select options={OPTIONS} value="b" />)
    expect(screen.getByRole('combobox')).toHaveTextContent('Banana')
  })

  it('renders with data-slot on root, trigger and label', () => {
    render(<Select options={OPTIONS} label="Fruit" data-testid="select" />)
    const root = screen.getByTestId('select')
    expect(root).toHaveAttribute('data-slot', 'select')
    expect(root.querySelector('[data-slot="select-label"]')).toHaveTextContent('Fruit')
    expect(screen.getByRole('combobox')).toHaveAttribute('data-slot', 'select-trigger')
  })

  it('defaults to the md size and the closed state', () => {
    render(<Select options={OPTIONS} data-testid="select" />)
    const root = screen.getByTestId('select')
    expect(root).toHaveAttribute('data-size', 'md')
    expect(root).toHaveAttribute('data-state', 'closed')
  })

  it('exposes the requested size on the trigger', () => {
    render(<Select options={OPTIONS} size="lg" />)
    expect(screen.getByRole('combobox')).toHaveAttribute('data-size', 'lg')
  })

  it('flags the disabled state', () => {
    render(<Select options={OPTIONS} disabled data-testid="select" />)
    expect(screen.getByTestId('select')).toHaveAttribute('data-disabled', '')
  })

  it('marks items with data-slot once open', async () => {
    const user = userEvent.setup()
    render(<Select options={OPTIONS} />)
    await user.click(screen.getByRole('combobox'))
    await waitFor(() => {
      expect(screen.getByRole('option', { name: 'Apple' })).toHaveAttribute(
        'data-slot',
        'select-item',
      )
    })
  })

  it('filters options when searchable', async () => {
    const user = userEvent.setup()
    const { container, baseElement } = render(<Select options={OPTIONS} searchable />)
    await user.click(within(container).getByRole('combobox'))
    const search = await within(baseElement).findByLabelText('Search options')
    fireEvent.change(search, { target: { value: 'ban' } })
    await waitFor(() => {
      const list = within(baseElement).getAllByRole('listbox').at(-1)!
      const labels = within(list)
        .getAllByRole('option')
        .map((el) => el.textContent)
      expect(labels).toHaveLength(1)
      expect(labels[0]).toContain('Banana')
    })
  })

  it('lets the caller override variant defaults', () => {
    render(<Select options={OPTIONS} className="w-40" data-testid="select" />)
    const root = screen.getByTestId('select')
    expect(root.className).toContain('w-40')
    expect(root.className).not.toContain('w-full')
  })
})
