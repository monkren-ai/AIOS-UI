import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NumberField } from './NumberField'

describe('NumberField', () => {
  it('renders with data-slot and the md default', () => {
    render(<NumberField defaultValue={5} />)
    const group = document.querySelector('[data-slot="number-field"]')
    expect(group).not.toBeNull()
    expect(group).toHaveAttribute('data-size', 'md')
    expect(group).toHaveAttribute('data-slot', 'number-field')
  })

  it('reports every size through data-size', () => {
    ;(['sm', 'md', 'lg'] as const).forEach((size) => {
      const { unmount } = render(<NumberField size={size} defaultValue={0} />)
      expect(document.querySelector('[data-slot="number-field"]')).toHaveAttribute('data-size', size)
      unmount()
    })
  })

  it('increments the value when the + stepper is pressed', async () => {
    const user = userEvent.setup()
    const handleValueChange = vi.fn()
    render(<NumberField defaultValue={5} onValueChange={handleValueChange} />)
    await user.click(screen.getByRole('button', { name: 'Increment' }))
    expect(handleValueChange).toHaveBeenCalledWith(6)
  })

  it('decrements the value when the − stepper is pressed', async () => {
    const user = userEvent.setup()
    const handleValueChange = vi.fn()
    render(<NumberField defaultValue={5} onValueChange={handleValueChange} />)
    await user.click(screen.getByRole('button', { name: 'Decrement' }))
    expect(handleValueChange).toHaveBeenCalledWith(4)
  })

  it('clamps to the max when incrementing past it', async () => {
    const user = userEvent.setup()
    const handleValueChange = vi.fn()
    render(<NumberField defaultValue={10} max={10} onValueChange={handleValueChange} />)
    await user.click(screen.getByRole('button', { name: 'Increment' }))
    // 不会越过上限变成 11。
    expect(handleValueChange).not.toHaveBeenCalledWith(11)
  })

  it('clamps to the min when decrementing past it', async () => {
    const user = userEvent.setup()
    const handleValueChange = vi.fn()
    render(<NumberField defaultValue={0} min={0} onValueChange={handleValueChange} />)
    await user.click(screen.getByRole('button', { name: 'Decrement' }))
    expect(handleValueChange).not.toHaveBeenCalledWith(-1)
  })

  it('does not fire onValueChange when disabled', async () => {
    const user = userEvent.setup()
    const handleValueChange = vi.fn()
    render(<NumberField defaultValue={5} disabled onValueChange={handleValueChange} />)
    const increment = screen.getByRole('button', { name: 'Increment' })
    expect(increment).toBeDisabled()
    await user.click(increment)
    expect(handleValueChange).not.toHaveBeenCalled()
  })

  it('labels the steppers in English for assistive tech', () => {
    render(<NumberField defaultValue={1} />)
    expect(screen.getByRole('button', { name: 'Increment' })).toHaveAttribute(
      'aria-label',
      'Increment',
    )
    expect(screen.getByRole('button', { name: 'Decrement' })).toHaveAttribute(
      'aria-label',
      'Decrement',
    )
  })

  it('renders the label and error text', () => {
    render(<NumberField label="Quantity" error="Must be positive" defaultValue={0} />)
    expect(screen.getByText('Quantity')).toBeInTheDocument()
    expect(screen.getByRole('alert')).toHaveTextContent('Must be positive')
    expect(document.querySelector('[data-slot="number-field"]')).toHaveAttribute('data-invalid')
  })

  it('accepts ref as a plain prop', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<NumberField ref={ref} defaultValue={0} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
