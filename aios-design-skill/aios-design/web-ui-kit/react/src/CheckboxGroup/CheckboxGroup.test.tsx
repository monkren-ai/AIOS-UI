import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CheckboxGroup, type CheckboxGroupOption } from './CheckboxGroup'

const options: CheckboxGroupOption[] = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C' },
]

const getCheckbox = (name: string) => screen.getByRole('checkbox', { name })

describe('CheckboxGroup', () => {
  it('renders all options', () => {
    render(<CheckboxGroup options={options} />)
    options.forEach((option) => {
      expect(getCheckbox(option.label)).toBeInTheDocument()
    })
  })

  it('toggles values and calls onValueChange', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<CheckboxGroup options={options} onValueChange={handleChange} />)

    await user.click(getCheckbox('Option A'))
    expect(handleChange).toHaveBeenLastCalledWith(['a'])

    await user.click(getCheckbox('Option B'))
    expect(handleChange).toHaveBeenLastCalledWith(['a', 'b'])

    await user.click(getCheckbox('Option A'))
    expect(handleChange).toHaveBeenLastCalledWith(['b'])
  })

  it('supports controlled value', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    const { rerender } = render(
      <CheckboxGroup options={options} value={['a']} onValueChange={handleChange} />,
    )

    expect(getCheckbox('Option A')).toHaveAttribute('aria-checked', 'true')
    expect(getCheckbox('Option B')).toHaveAttribute('aria-checked', 'false')

    await user.click(getCheckbox('Option B'))
    expect(handleChange).toHaveBeenLastCalledWith(['a', 'b'])

    rerender(<CheckboxGroup options={options} value={['a', 'b']} onValueChange={handleChange} />)
    expect(getCheckbox('Option B')).toHaveAttribute('aria-checked', 'true')
  })

  it('does not toggle disabled options', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    const disabledOptions: CheckboxGroupOption[] = [
      { value: 'a', label: 'Option A' },
      { value: 'b', label: 'Option B', disabled: true },
    ]
    render(<CheckboxGroup options={disabledOptions} onValueChange={handleChange} />)

    await user.click(getCheckbox('Option B'))
    expect(handleChange).not.toHaveBeenCalled()
  })

  it('renders horizontal orientation', () => {
    render(<CheckboxGroup options={options} orientation="horizontal" />)
    expect(screen.getByRole('group')).toHaveAttribute('data-orientation', 'horizontal')
  })

  it('renders with data-slot', () => {
    render(<CheckboxGroup options={options} />)
    const group = screen.getByRole('group')
    expect(group).toHaveAttribute('data-slot', 'checkbox-group')
    expect(group.querySelectorAll('[data-slot="checkbox-group-item"]')).toHaveLength(3)
    expect(group.querySelector('[data-slot="checkbox-group-merge-bg"]')).not.toBeNull()
  })

  it('reflects selection on the item through data-state', () => {
    render(<CheckboxGroup options={options} value={['a']} />)
    const items = screen.getByRole('group').querySelectorAll('[data-slot="checkbox-group-item"]')
    expect(items[0]).toHaveAttribute('data-state', 'checked')
    expect(items[1]).toHaveAttribute('data-state', 'unchecked')
  })

  it('marks disabled options through data-disabled', () => {
    render(
      <CheckboxGroup
        options={[
          { value: 'a', label: 'Option A' },
          { value: 'b', label: 'Option B', disabled: true },
        ]}
      />,
    )
    const items = screen.getByRole('group').querySelectorAll('[data-slot="checkbox-group-item"]')
    expect(items[0]).not.toHaveAttribute('data-disabled')
    expect(items[1]).toHaveAttribute('data-disabled', '')
  })

  it('lets the caller override variant defaults', () => {
    render(<CheckboxGroup options={options} className="gap-6" />)
    const group = screen.getByRole('group')
    expect(group.className).toContain('gap-6')
    expect(group.className).not.toContain('gap-xs')
  })
})
