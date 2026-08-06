import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Combobox } from './Combobox'

const OPTIONS = [
  { value: 'phone-2a', label: 'Phone (2a)' },
  { value: 'phone-2', label: 'Phone (2)' },
  { value: 'ear', label: 'Ear' },
  { value: 'ear-open', label: 'Ear (open)' },
]

describe('Combobox', () => {
  it('renders the input with data-slot and the md/outline defaults', () => {
    render(<Combobox items={OPTIONS} placeholder="Pick a device" data-testid="cb" />)
    const root = screen.getByTestId('cb')
    expect(root).toHaveAttribute('data-slot', 'combobox')
    expect(root).toHaveAttribute('data-size', 'md')
    expect(root).toHaveAttribute('data-variant', 'outline')
    expect(screen.getByPlaceholderText('Pick a device')).toHaveAttribute(
      'data-slot',
      'combobox-input',
    )
  })

  it('renders a label associated with the input', () => {
    render(<Combobox items={OPTIONS} label="Device" placeholder="Pick" />)
    const input = screen.getByLabelText('Device')
    expect(input).toHaveAttribute('data-slot', 'combobox-input')
  })

  it('fires onInputValueChange while typing (without committing a value)', async () => {
    const user = userEvent.setup()
    const onInputValueChange = vi.fn()
    const onValueChange = vi.fn()
    render(
      <Combobox
        items={OPTIONS}
        onInputValueChange={onInputValueChange}
        onValueChange={onValueChange}
        placeholder="Pick"
      />,
    )
    await user.click(screen.getByPlaceholderText('Pick'))
    await user.type(screen.getByPlaceholderText('Pick'), 'ear')
    expect(onInputValueChange).toHaveBeenCalled()
    expect(onInputValueChange).toHaveBeenLastCalledWith('ear')
    // 未开启 freeInput 时，仅输入不会触发 onValueChange
    expect(onValueChange).not.toHaveBeenCalled()
  })

  it('opens the list and commits the selected option value', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    const { baseElement } = render(
      <Combobox items={OPTIONS} onValueChange={onValueChange} placeholder="Pick" />,
    )
    await user.click(screen.getByPlaceholderText('Pick'))
    const option = await waitFor(() =>
      within(baseElement).getByRole('option', { name: 'Ear' }),
    )
    await user.click(option)
    expect(onValueChange).toHaveBeenCalledWith('ear')
  })

  it('marks the selected item with data-selected and renders the indicator', async () => {
    const user = userEvent.setup()
    const { baseElement } = render(<Combobox items={OPTIONS} placeholder="Pick" />)
    await user.click(screen.getByPlaceholderText('Pick'))
    const option = await waitFor(() =>
      within(baseElement).getByRole('option', { name: 'Ear' }),
    )
    await user.click(option)
    // 重新打开浮层确认选中态
    await user.click(screen.getByPlaceholderText('Pick'))
    await waitFor(() => {
      const ear = within(baseElement).getByRole('option', { name: 'Ear' })
      expect(ear).toHaveAttribute('data-selected', '')
      expect(ear.querySelector('[data-slot="combobox-item-indicator"]')).not.toBeNull()
    })
  })

  it('commits arbitrary text via onValueChange when freeInput is on', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <Combobox
        items={OPTIONS}
        freeInput
        onValueChange={onValueChange}
        placeholder="Pick"
      />,
    )
    await user.click(screen.getByPlaceholderText('Pick'))
    await user.type(screen.getByPlaceholderText('Pick'), 'foobar')
    expect(onValueChange).toHaveBeenLastCalledWith('foobar')
  })

  it('shows the clear button when clearable is set and a value is selected', () => {
    // Base UI 的 Clear 仅在已有选中值时渲染，故给一个默认选中项。
    render(<Combobox items={OPTIONS} clearable defaultValue="phone-2a" placeholder="Pick" />)
    expect(screen.getByLabelText('Clear')).toHaveAttribute('data-slot', 'combobox-clear')
  })

  it('renders the error message and flags the invalid state', () => {
    render(<Combobox items={OPTIONS} error="Required" data-testid="cb" />)
    expect(screen.getByText('Required')).toHaveAttribute('data-slot', 'combobox-error')
    expect(screen.getByTestId('cb')).toHaveAttribute('data-invalid', '')
  })

  it('disables the input when disabled', () => {
    render(<Combobox items={OPTIONS} disabled placeholder="Pick" data-testid="cb" />)
    expect(screen.getByPlaceholderText('Pick')).toBeDisabled()
    expect(screen.getByTestId('cb')).toHaveAttribute('data-disabled', '')
  })

  it('accepts ref as a plain prop pointing at the outer wrapper', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(
      <Combobox ref={ref} items={OPTIONS} placeholder="Pick" data-testid="cb" />,
    )
    expect(ref.current).toBeInstanceOf(HTMLElement)
    expect(ref.current).toHaveAttribute('data-slot', 'combobox')
  })
})
