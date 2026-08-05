import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Switch } from './Switch'

describe('Switch', () => {
  it('renders off with data-slot and the md default', () => {
    render(<Switch />)
    const sw = screen.getByRole('switch')
    expect(sw).toHaveAttribute('aria-checked', 'false')
    expect(sw).toHaveAttribute('data-slot', 'switch-track')
    const root = sw.closest('label')
    expect(root).toHaveAttribute('data-slot', 'switch')
    expect(root).toHaveAttribute('data-state', 'off')
    expect(root).toHaveAttribute('data-size', 'md')
    expect(document.querySelector('[data-slot="switch-thumb"]')).toBeInTheDocument()
  })

  it('toggles checked state when clicked', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<Switch onChange={handleChange} />)
    const sw = screen.getByRole('switch')

    await user.click(sw)
    expect(sw).toHaveAttribute('aria-checked', 'true')
    expect(sw.closest('label')).toHaveAttribute('data-state', 'on')
    expect(handleChange).toHaveBeenLastCalledWith(true)

    await user.click(sw)
    expect(sw).toHaveAttribute('aria-checked', 'false')
    expect(handleChange).toHaveBeenLastCalledWith(false)
  })

  it('works in controlled mode with the on prop', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    const { rerender } = render(<Switch checked={false} onChange={handleChange} />)
    const sw = screen.getByRole('switch')
    expect(sw.closest('label')).toHaveAttribute('data-state', 'off')

    await user.click(sw)
    expect(handleChange).toHaveBeenLastCalledWith(true)
    expect(sw).toHaveAttribute('aria-checked', 'false')

    rerender(<Switch checked onChange={handleChange} />)
    expect(sw).toHaveAttribute('aria-checked', 'true')
    expect(sw.closest('label')).toHaveAttribute('data-state', 'on')
  })

  it('does not toggle when disabled', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<Switch disabled onChange={handleChange} />)
    const sw = screen.getByRole('switch')
    expect(sw).toHaveAttribute('aria-disabled', 'true')
    expect(sw.closest('label')).toHaveAttribute('data-disabled')

    await user.click(sw)
    expect(handleChange).not.toHaveBeenCalled()
    expect(sw).toHaveAttribute('aria-checked', 'false')
  })

  it('renders label text when provided', () => {
    render(<Switch label="Dark mode" />)
    expect(screen.getByText('Dark mode')).toHaveAttribute('data-slot', 'switch-label')
  })

  it('reports every size through data-size', () => {
    ;(['sm', 'md', 'lg'] as const).forEach((size) => {
      const { unmount } = render(<Switch size={size} />)
      expect(screen.getByRole('switch').closest('label')).toHaveAttribute('data-size', size)
      unmount()
    })
  })

  it('accepts ref as a plain prop', () => {
    const ref = React.createRef<HTMLLabelElement>()
    render(<Switch ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLLabelElement)
  })

  it('lets a caller-supplied utility win over the variant default', () => {
    render(<Switch className="gap-6" />)
    const root = screen.getByRole('switch').closest('label')
    expect(root).toHaveClass('gap-6')
    expect(root).not.toHaveClass('gap-2')
  })
})
