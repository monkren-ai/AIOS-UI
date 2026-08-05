import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Checkbox } from './Checkbox'

describe('Checkbox', () => {
  it('renders unchecked with data-slot and the md default', () => {
    render(<Checkbox />)
    const cb = screen.getByRole('checkbox')
    expect(cb).toHaveAttribute('aria-checked', 'false')
    expect(cb).toHaveAttribute('data-slot', 'checkbox-box')
    const root = cb.closest('label')
    expect(root).toHaveAttribute('data-slot', 'checkbox')
    expect(root).toHaveAttribute('data-state', 'unchecked')
    expect(root).toHaveAttribute('data-size', 'md')
  })

  it('reports every size through data-size', () => {
    ;(['sm', 'md', 'lg'] as const).forEach((size) => {
      const { unmount } = render(<Checkbox size={size} />)
      expect(screen.getByRole('checkbox').closest('label')).toHaveAttribute('data-size', size)
      unmount()
    })
  })

  it('toggles checked state when clicked', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<Checkbox onCheckedChange={handleChange} />)
    const cb = screen.getByRole('checkbox')

    await user.click(cb)
    expect(cb).toHaveAttribute('aria-checked', 'true')
    expect(cb.closest('label')).toHaveAttribute('data-state', 'checked')
    expect(handleChange).toHaveBeenLastCalledWith(true)

    await user.click(cb)
    expect(cb).toHaveAttribute('aria-checked', 'false')
    expect(handleChange).toHaveBeenLastCalledWith(false)
  })

  it('works in controlled mode', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    const { rerender } = render(<Checkbox checked={false} onCheckedChange={handleChange} />)
    const cb = screen.getByRole('checkbox')
    expect(cb).toHaveAttribute('aria-checked', 'false')

    await user.click(cb)
    expect(handleChange).toHaveBeenLastCalledWith(true)
    expect(cb).toHaveAttribute('aria-checked', 'false')

    rerender(<Checkbox checked onCheckedChange={handleChange} />)
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
    expect(cb.closest('label')).toHaveAttribute('data-disabled')

    await user.click(cb)
    expect(handleChange).not.toHaveBeenCalled()
    expect(cb).toHaveAttribute('aria-checked', 'false')
  })

  it('renders the indicator parts as addressable slots', () => {
    render(<Checkbox />)
    expect(document.querySelector('[data-slot="checkbox-indicator"]')).toBeInTheDocument()
    expect(document.querySelector('[data-slot="checkbox-check"]')).toBeInTheDocument()
    expect(document.querySelector('[data-slot="checkbox-dash"]')).toBeInTheDocument()
  })

  it('renders label text when provided', () => {
    render(<Checkbox label="Accept terms" />)
    expect(screen.getByText('Accept terms')).toHaveAttribute('data-slot', 'checkbox-label')
  })

  it('accepts ref as a plain prop', () => {
    const ref = React.createRef<HTMLLabelElement>()
    render(<Checkbox ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLLabelElement)
  })

  it('lets a caller-supplied utility win over the variant default', () => {
    render(<Checkbox className="gap-6" />)
    const root = screen.getByRole('checkbox').closest('label')
    expect(root).toHaveClass('gap-6')
    expect(root).not.toHaveClass('gap-2')
  })
})
