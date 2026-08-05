import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RadioGroup } from './RadioGroup'

const options = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C', disabled: true },
]

describe('RadioGroup', () => {
  it('renders the group and its options with data-slots', () => {
    render(<RadioGroup options={options} />)
    const group = screen.getByRole('radiogroup')
    expect(group).toHaveAttribute('data-slot', 'radio-group')
    expect(group).toHaveAttribute('data-orientation', 'vertical')
    expect(group).toHaveAttribute('data-size', 'md')
    expect(screen.getAllByRole('radio')).toHaveLength(3)
    expect(document.querySelectorAll('[data-slot="radio-group-item"]')).toHaveLength(3)
    expect(document.querySelectorAll('[data-slot="radio-group-dot"]')).toHaveLength(3)
  })

  it('selects an option when clicked', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<RadioGroup options={options} onValueChange={handleChange} />)
    const radios = screen.getAllByRole('radio')

    await user.click(radios[0])
    expect(radios[0]).toHaveAttribute('aria-checked', 'true')
    expect(radios[0].closest('label')).toHaveAttribute('data-state', 'checked')
    expect(handleChange).toHaveBeenLastCalledWith('a')

    await user.click(radios[1])
    expect(radios[1]).toHaveAttribute('aria-checked', 'true')
    expect(radios[0]).toHaveAttribute('aria-checked', 'false')
    expect(handleChange).toHaveBeenLastCalledWith('b')
  })

  it('works in controlled mode', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    const { rerender } = render(
      <RadioGroup options={options} value="a" onValueChange={handleChange} />,
    )
    const radios = screen.getAllByRole('radio')
    expect(radios[0]).toHaveAttribute('aria-checked', 'true')

    await user.click(radios[1])
    expect(handleChange).toHaveBeenLastCalledWith('b')
    expect(radios[0]).toHaveAttribute('aria-checked', 'true')

    rerender(<RadioGroup options={options} value="b" onValueChange={handleChange} />)
    expect(radios[1]).toHaveAttribute('aria-checked', 'true')
    expect(radios[0]).toHaveAttribute('aria-checked', 'false')
  })

  it('supports keyboard navigation with arrow keys', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<RadioGroup options={options} onValueChange={handleChange} />)
    const radios = screen.getAllByRole('radio')

    await user.click(radios[0])
    radios[0].focus()
    await user.keyboard('{ArrowDown}')
    expect(handleChange).toHaveBeenLastCalledWith('b')
  })

  it('does not select disabled options', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<RadioGroup options={options} onValueChange={handleChange} />)
    const radios = screen.getAllByRole('radio')

    await user.click(radios[2])
    expect(handleChange).not.toHaveBeenCalled()
    expect(radios[2]).toHaveAttribute('aria-checked', 'false')
    expect(radios[2].closest('label')).toHaveAttribute('data-disabled')
  })

  it('disables every option when the group is disabled', () => {
    render(<RadioGroup options={options} disabled />)
    expect(screen.getByRole('radiogroup')).toHaveAttribute('data-disabled')
    document.querySelectorAll('[data-slot="radio-group-item"]').forEach((item) => {
      expect(item).toHaveAttribute('data-disabled')
    })
  })

  it('supports horizontal orientation', () => {
    render(<RadioGroup options={options} orientation="horizontal" />)
    const group = screen.getByRole('radiogroup')
    expect(group).toHaveAttribute('data-orientation', 'horizontal')
    expect(group).toHaveAttribute('aria-orientation', 'horizontal')
  })

  it('reports every size through data-size', () => {
    ;(['sm', 'md', 'lg'] as const).forEach((size) => {
      const { unmount } = render(<RadioGroup options={options} size={size} />)
      expect(screen.getByRole('radiogroup')).toHaveAttribute('data-size', size)
      unmount()
    })
  })

  it('accepts ref as a plain prop', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<RadioGroup ref={ref} options={options} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('lets a caller-supplied utility win over the variant default', () => {
    render(<RadioGroup options={options} className="gap-6" />)
    const group = screen.getByRole('radiogroup')
    expect(group).toHaveClass('gap-6')
    expect(group).not.toHaveClass('gap-2')
  })
})
