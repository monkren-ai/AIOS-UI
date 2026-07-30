import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Toggle, ToggleGroup } from './Toggle'

describe('Toggle', () => {
  it('renders unpressed by default', () => {
    render(<Toggle>Label</Toggle>)
    const toggle = screen.getByRole('button', { name: 'Label' })
    expect(toggle).toHaveAttribute('aria-pressed', 'false')
    expect(toggle).toHaveClass('nothing-toggle')
  })

  it('toggles pressed state on click', async () => {
    render(<Toggle>Label</Toggle>)
    const toggle = screen.getByRole('button', { name: 'Label' })
    fireEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-pressed', 'true')
    expect(toggle).toHaveClass('nothing-toggle--pressed')
    fireEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-pressed', 'false')
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
    fireEvent.click(toggle)
    expect(handleChange).not.toHaveBeenCalled()
  })

  it('forwards ref', () => {
    const ref = React.createRef<HTMLButtonElement>()
    render(<Toggle ref={ref}>Label</Toggle>)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })
})

describe('ToggleGroup', () => {
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
})
