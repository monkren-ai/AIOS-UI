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
  it('renders radio group with options', () => {
    render(<RadioGroup options={options} />)
    const group = screen.getByRole('radiogroup')
    expect(group).toHaveClass('nothing-radio-group')
    const radios = screen.getAllByRole('radio')
    expect(radios).toHaveLength(3)
  })

  it('selects an option when clicked', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<RadioGroup options={options} onValueChange={handleChange} />)
    const radios = screen.getAllByRole('radio')

    await user.click(radios[0])
    expect(radios[0]).toHaveAttribute('aria-checked', 'true')
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
    expect(radios[2].closest('label')).toHaveClass('nothing-radio-group__item--disabled')
  })

  it('supports horizontal orientation', () => {
    render(<RadioGroup options={options} orientation="horizontal" />)
    const group = screen.getByRole('radiogroup')
    expect(group).toHaveClass('nothing-radio-group--horizontal')
    expect(group).toHaveAttribute('aria-orientation', 'horizontal')
  })

  it('forwards ref to the group element', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<RadioGroup ref={ref} options={options} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
    expect(ref.current?.tagName).toBe('DIV')
  })
})
