import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Checkbox } from './Checkbox'

describe('Checkbox', () => {
  it('renders unchecked by default', () => {
    render(<Checkbox />)
    const cb = screen.getByRole('checkbox')
    expect(cb).toHaveAttribute('aria-checked', 'false')
    const label = cb.closest('label')
    expect(label).toHaveClass('nothing-checkbox')
    expect(label).toHaveAttribute('data-state', 'unchecked')
  })

  it('toggles checked state when clicked', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<Checkbox onCheckedChange={handleChange} />)
    const cb = screen.getByRole('checkbox')
    expect(cb).toHaveAttribute('aria-checked', 'false')

    await user.click(cb)
    expect(cb).toHaveAttribute('aria-checked', 'true')
    expect(handleChange).toHaveBeenLastCalledWith(true)

    await user.click(cb)
    expect(cb).toHaveAttribute('aria-checked', 'false')
    expect(handleChange).toHaveBeenLastCalledWith(false)
  })

  it('works in controlled mode', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    const { rerender } = render(
      <Checkbox checked={false} onCheckedChange={handleChange} />,
    )
    const cb = screen.getByRole('checkbox')
    expect(cb).toHaveAttribute('aria-checked', 'false')

    await user.click(cb)
    expect(handleChange).toHaveBeenLastCalledWith(true)
    expect(cb).toHaveAttribute('aria-checked', 'false')

    rerender(<Checkbox checked={true} onCheckedChange={handleChange} />)
    expect(cb).toHaveAttribute('aria-checked', 'true')
    expect(cb.closest('label')).toHaveAttribute('data-state', 'checked')
  })

  it('supports indeterminate state', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<Checkbox checked="indeterminate" onCheckedChange={handleChange} />)
    const cb = screen.getByRole('checkbox')
    expect(cb).toHaveAttribute('aria-checked', 'mixed')
    expect(cb.closest('label')).toHaveAttribute('data-state', 'indeterminate')

    await user.click(cb)
    expect(handleChange).toHaveBeenLastCalledWith(true)
  })

  it('does not toggle when disabled', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<Checkbox disabled onCheckedChange={handleChange} />)
    const cb = screen.getByRole('checkbox')
    expect(cb).toHaveAttribute('aria-disabled', 'true')
    const label = cb.closest('label')
    expect(label).toHaveClass('nothing-checkbox--disabled')
    expect(label).toHaveAttribute('data-disabled')

    await user.click(cb)
    expect(handleChange).not.toHaveBeenCalled()
    expect(cb).toHaveAttribute('aria-checked', 'false')
  })

  it('supports custom className', () => {
    render(<Checkbox className="my-checkbox" />)
    const label = screen.getByRole('checkbox').closest('label')
    expect(label).toHaveClass('my-checkbox')
    expect(label).toHaveClass('nothing-checkbox')
  })

  it('forwards ref to the label element', () => {
    const ref = React.createRef<HTMLLabelElement>()
    render(<Checkbox ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLLabelElement)
    expect(ref.current?.tagName).toBe('LABEL')
  })

  it('renders label text when provided', () => {
    render(<Checkbox label="Accept terms" />)
    const label = screen.getByText('Accept terms')
    expect(label).toHaveClass('nothing-checkbox__label')
  })
})
