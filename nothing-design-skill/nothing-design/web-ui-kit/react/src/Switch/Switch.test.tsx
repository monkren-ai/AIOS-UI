import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Switch } from './Switch'

describe('Switch', () => {
  it('renders unchecked by default', () => {
    render(<Switch />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()
    const label = checkbox.closest('label')
    expect(label).toHaveClass('nothing-switch')
    expect(label).toHaveAttribute('data-state', 'off')
  })

  it('toggles checked state when clicked', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<Switch onChange={handleChange} />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()

    await user.click(checkbox)
    expect(checkbox).toBeChecked()
    expect(handleChange).toHaveBeenLastCalledWith(true)

    await user.click(checkbox)
    expect(checkbox).not.toBeChecked()
    expect(handleChange).toHaveBeenLastCalledWith(false)
  })

  it('works in controlled mode with on prop', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    const { rerender } = render(
      <Switch on={false} onChange={handleChange} />
    )
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()
    expect(checkbox.closest('label')).toHaveAttribute('data-state', 'off')

    await user.click(checkbox)
    expect(handleChange).toHaveBeenLastCalledWith(true)
    // In controlled mode, the state doesn't change until parent updates
    expect(checkbox).not.toBeChecked()

    // Simulate parent updating the prop
    rerender(<Switch on={true} onChange={handleChange} />)
    expect(checkbox).toBeChecked()
    expect(checkbox.closest('label')).toHaveAttribute('data-state', 'on')
  })

  it('does not toggle when disabled', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<Switch disabled onChange={handleChange} />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeDisabled()
    const label = checkbox.closest('label')
    expect(label).toHaveClass('nothing-switch--disabled')
    expect(label).toHaveAttribute('data-disabled')

    await user.click(checkbox)
    expect(handleChange).not.toHaveBeenCalled()
    expect(checkbox).not.toBeChecked()
  })

  it('supports custom className', () => {
    render(<Switch className="my-switch" />)
    const label = screen.getByRole('checkbox').closest('label')
    expect(label).toHaveClass('my-switch')
    expect(label).toHaveClass('nothing-switch')
  })

  it('forwards ref to the label element', () => {
    const ref = React.createRef<HTMLLabelElement>()
    render(<Switch ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLLabelElement)
    expect(ref.current?.tagName).toBe('LABEL')
  })

  it('renders label text when provided', () => {
    render(<Switch label="Dark mode" />)
    const label = screen.getByText('Dark mode')
    expect(label).toHaveClass('nothing-switch__label')
  })
})
