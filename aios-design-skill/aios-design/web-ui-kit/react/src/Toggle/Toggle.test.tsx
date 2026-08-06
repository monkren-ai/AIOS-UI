import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Toggle, ToggleGroup } from './Toggle'

describe('Toggle', () => {
  it('renders unpressed with data-slot and the soft/md defaults', () => {
    render(<Toggle>Label</Toggle>)
    const toggle = screen.getByRole('button', { name: 'Label' })
    expect(toggle).toHaveAttribute('aria-pressed', 'false')
    expect(toggle).toHaveAttribute('data-slot', 'toggle')
    expect(toggle).toHaveAttribute('data-variant', 'soft')
    expect(toggle).toHaveAttribute('data-size', 'md')
    expect(toggle).not.toHaveAttribute('data-pressed')
  })

  it('reports every variant and size through data attributes', () => {
    ;(['soft', 'outline', 'ghost'] as const).forEach((variant) => {
      const { unmount } = render(<Toggle variant={variant}>Label</Toggle>)
      expect(screen.getByRole('button')).toHaveAttribute('data-variant', variant)
      unmount()
    })
    ;(['sm', 'md', 'lg'] as const).forEach((size) => {
      const { unmount } = render(<Toggle size={size}>Label</Toggle>)
      expect(screen.getByRole('button')).toHaveAttribute('data-size', size)
      unmount()
    })
  })

  it('maps the v1 variant alias onto its replacement', () => {
    render(<Toggle variant="default">Label</Toggle>)
    expect(screen.getByRole('button')).toHaveAttribute('data-variant', 'soft')
  })

  it('toggles pressed state on click', () => {
    render(<Toggle>Label</Toggle>)
    const toggle = screen.getByRole('button', { name: 'Label' })
    fireEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-pressed', 'true')
    expect(toggle).toHaveAttribute('data-pressed')
    expect(toggle).toHaveAttribute('data-state', 'pressed')
    fireEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-pressed', 'false')
    expect(toggle).toHaveAttribute('data-state', 'unpressed')
  })

  it('toggles once per keyboard activation', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<Toggle onPressedChange={handleChange}>Label</Toggle>)
    const toggle = screen.getByRole('button', { name: 'Label' })
    toggle.focus()
    await user.keyboard('{Enter}')
    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(toggle).toHaveAttribute('aria-pressed', 'true')
  })

  it('calls onPressedChange with new state', () => {
    const handleChange = vi.fn()
    render(<Toggle onPressedChange={handleChange}>Label</Toggle>)
    fireEvent.click(screen.getByRole('button', { name: 'Label' }))
    expect(handleChange).toHaveBeenCalledWith(true)
  })

  it('supports controlled pressed prop', () => {
    const { rerender } = render(<Toggle pressed>Label</Toggle>)
    expect(screen.getByRole('button', { name: 'Label' })).toHaveAttribute('aria-pressed', 'true')
    rerender(<Toggle pressed={false}>Label</Toggle>)
    expect(screen.getByRole('button', { name: 'Label' })).toHaveAttribute('aria-pressed', 'false')
  })

  it('does not toggle when disabled', () => {
    const handleChange = vi.fn()
    render(
      <Toggle disabled onPressedChange={handleChange}>
        Label
      </Toggle>,
    )
    const toggle = screen.getByRole('button', { name: 'Label' })
    expect(toggle).toBeDisabled()
    expect(toggle).toHaveAttribute('data-disabled')
    fireEvent.click(toggle)
    expect(handleChange).not.toHaveBeenCalled()
  })

  it('accepts ref as a plain prop', () => {
    const ref = React.createRef<HTMLButtonElement>()
    render(<Toggle ref={ref}>Label</Toggle>)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })

  it('lets a caller-supplied utility win over the variant default', () => {
    render(<Toggle className="rounded-none">Label</Toggle>)
    const toggle = screen.getByRole('button', { name: 'Label' })
    expect(toggle).toHaveClass('rounded-none')
    expect(toggle).not.toHaveClass('rounded-sm')
  })
})

describe('ToggleGroup', () => {
  it('renders with data-slot and the soft default', () => {
    render(
      <ToggleGroup>
        <Toggle value="a">A</Toggle>
      </ToggleGroup>,
    )
    const group = screen.getByRole('group')
    expect(group).toHaveAttribute('data-slot', 'toggle-group')
    expect(group).toHaveAttribute('data-variant', 'soft')
    expect(group).toHaveAttribute('data-size', 'md')
  })

  it('manages multiple pressed toggles', () => {
    const handleChange = vi.fn()
    render(
      <ToggleGroup onValueChange={handleChange}>
        <Toggle value="a">A</Toggle>
        <Toggle value="b">B</Toggle>
      </ToggleGroup>,
    )
    fireEvent.click(screen.getByRole('button', { name: 'A' }))
    expect(screen.getByRole('button', { name: 'A' })).toHaveAttribute('aria-pressed', 'true')
    fireEvent.click(screen.getByRole('button', { name: 'B' }))
    expect(screen.getByRole('button', { name: 'B' })).toHaveAttribute('aria-pressed', 'true')
    expect(handleChange).toHaveBeenLastCalledWith(['a', 'b'])
  })

  it('removes pressed toggle on second click', () => {
    render(
      <ToggleGroup defaultValue={['a']}>
        <Toggle value="a">A</Toggle>
        <Toggle value="b">B</Toggle>
      </ToggleGroup>,
    )
    fireEvent.click(screen.getByRole('button', { name: 'A' }))
    expect(screen.getByRole('button', { name: 'A' })).toHaveAttribute('aria-pressed', 'false')
  })

  it('overrides the variant and size of its children', () => {
    render(
      <ToggleGroup variant="outline" size="lg">
        <Toggle value="a" variant="soft" size="sm">
          A
        </Toggle>
      </ToggleGroup>,
    )
    const toggle = screen.getByRole('button', { name: 'A' })
    expect(toggle).toHaveAttribute('data-variant', 'outline')
    expect(toggle).toHaveAttribute('data-size', 'lg')
  })

  it('accepts ref as a plain prop', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(
      <ToggleGroup ref={ref}>
        <Toggle value="a">A</Toggle>
      </ToggleGroup>,
    )
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
