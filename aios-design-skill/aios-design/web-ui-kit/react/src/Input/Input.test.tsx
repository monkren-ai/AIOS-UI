import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from './Input'
import { inputControlVariants } from './input-variants'

const Icon = () => (
  <svg
    data-testid="input-icon"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <circle cx="8" cy="8" r="6" />
  </svg>
)

const slot = (name: string) => document.querySelector(`[data-slot="${name}"]`)

describe('Input', () => {
  it('renders with data-slot and the outline/md defaults', () => {
    render(<Input />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('data-slot', 'input-field')
    const root = slot('input')
    expect(root).toHaveAttribute('data-variant', 'outline')
    expect(root).toHaveAttribute('data-size', 'md')
    expect(root).toHaveAttribute('data-state', 'default')
    expect(slot('input-control')).toBeInTheDocument()
  })

  it('reports every variant and size through data attributes', () => {
    ;(['outline', 'soft'] as const).forEach((variant) => {
      const { unmount } = render(<Input variant={variant} />)
      expect(slot('input')).toHaveAttribute('data-variant', variant)
      unmount()
    })
    ;(['sm', 'md', 'lg'] as const).forEach((size) => {
      const { unmount } = render(<Input size={size} />)
      expect(slot('input')).toHaveAttribute('data-size', size)
      unmount()
    })
  })

  it('maps the v1 variant aliases onto their replacements', () => {
    const { unmount } = render(<Input variant="underline" />)
    expect(slot('input')).toHaveAttribute('data-variant', 'outline')
    unmount()

    render(<Input variant="bordered" />)
    expect(slot('input')).toHaveAttribute('data-variant', 'soft')
  })

  it('calls onValueChange with the typed value', async () => {
    const user = userEvent.setup()
    const handleValueChange = vi.fn()
    render(<Input onValueChange={handleValueChange} />)
    await user.type(screen.getByRole('textbox'), 'hello')
    expect(handleValueChange).toHaveBeenLastCalledWith('hello')
  })

  it('also calls onChange with the native event', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<Input onChange={handleChange} />)
    await user.type(screen.getByRole('textbox'), 'hi')
    const event = handleChange.mock.lastCall?.[0]
    expect(event.target).toBe(screen.getByRole('textbox'))
    expect(event.target.value).toBe('hi')
  })

  it('starts from defaultValue when uncontrolled', async () => {
    const user = userEvent.setup()
    render(<Input defaultValue="draft" />)
    const field = screen.getByRole('textbox')
    expect(field).toHaveValue('draft')
    await user.type(field, '!')
    expect(field).toHaveValue('draft!')
  })

  it('displays placeholder text', () => {
    render(<Input placeholder="Enter your name" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', 'Enter your name')
  })

  it('cannot be typed into when disabled', () => {
    render(<Input disabled />)
    const input = screen.getByRole('textbox')
    expect(input).toBeDisabled()
    const root = slot('input')
    expect(root).toHaveAttribute('data-disabled')
    expect(root).toHaveAttribute('data-state', 'disabled')
  })

  it('renders with type="text" by default', () => {
    render(<Input />)
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text')
  })

  it('renders label associated with the input', () => {
    render(<Input label="Username" />)
    expect(screen.getByLabelText('Username')).toBeInTheDocument()
    expect(screen.getByText('Username')).toHaveAttribute('data-slot', 'input-label')
  })

  it('renders error message and error state', () => {
    render(<Input error="This field is required" />)
    const errorEl = screen.getByRole('alert')
    expect(errorEl).toHaveAttribute('data-slot', 'input-error')
    expect(errorEl).toHaveTextContent('This field is required')
    const root = slot('input')
    expect(root).toHaveAttribute('data-invalid')
    expect(root).toHaveAttribute('data-state', 'error')
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-describedby', errorEl.id)
  })

  it('shakes the control when an error appears', () => {
    const { rerender } = render(<Input />)
    expect(screen.getByRole('textbox').closest('[data-slot="input-control"]')).not.toHaveAttribute(
      'data-shaking',
    )
    rerender(<Input error="Required" />)
    expect(screen.getByRole('textbox').closest('[data-slot="input-control"]')).toHaveAttribute(
      'data-shaking',
    )
  })

  it('renders a dissolving ghost when the value is cleared', async () => {
    const user = userEvent.setup()
    render(<Input clearable defaultValue="hello" />)
    await user.click(screen.getByRole('button', { name: 'Clear input' }))
    expect(document.querySelector('[data-slot="input-clear-ghost"]')).toHaveTextContent('hello')
  })

  it('renders leading and trailing icons with logical icon slots', () => {
    render(<Input leadingIcon={<Icon />} trailingIcon={<Icon />} />)
    const icons = screen.getAllByTestId('input-icon')
    expect(icons).toHaveLength(2)
    expect(icons[0].closest('[data-slot="input-icon"]')).toHaveAttribute('data-icon', 'start')
    expect(icons[1].closest('[data-slot="input-icon"]')).toHaveAttribute('data-icon', 'end')
  })

  it('renders helper message', () => {
    render(<Input message="Use 8+ characters" />)
    const messageEl = screen.getByText('Use 8+ characters')
    expect(messageEl).toHaveAttribute('data-slot', 'input-message')
    expect(messageEl).toHaveAttribute('data-variant', 'default')
  })

  it('clears value when clear button is clicked', async () => {
    const user = userEvent.setup()
    const handleValueChange = vi.fn()
    render(<Input clearable value="hello" onValueChange={handleValueChange} />)
    const clearButton = screen.getByRole('button', { name: 'Clear input' })
    expect(clearButton).toHaveAttribute('data-slot', 'input-clear')

    await user.click(clearButton)
    expect(handleValueChange).toHaveBeenLastCalledWith('')
  })

  // 清空按钮是绕过 React 直接改 DOM 再派发事件的，所以要确认它产出的是一个
  // 货真价实的事件，而不是只有 onValueChange 收到通知。
  it('emits a real change event when cleared', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<Input clearable defaultValue="hello" onChange={handleChange} />)

    await user.click(screen.getByRole('button', { name: 'Clear input' }))
    expect(handleChange.mock.lastCall?.[0].target.value).toBe('')
    expect(screen.getByRole('textbox')).toHaveValue('')
  })

  it('accepts ref as a plain prop', () => {
    const ref = React.createRef<HTMLInputElement>()
    render(<Input ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  it('exposes Input.Message subcomponent', () => {
    render(<Input.Message variant="error">Helper text</Input.Message>)
    const messageEl = screen.getByText('Helper text')
    expect(messageEl).toHaveAttribute('data-slot', 'input-message')
    expect(messageEl).toHaveAttribute('data-variant', 'error')
  })

  it('lets a caller-supplied utility win over the variant default', () => {
    render(<Input className="gap-6" />)
    const root = slot('input')
    expect(root).toHaveClass('gap-6')
    expect(root).not.toHaveClass('gap-1')
  })

  it('exports inputControlVariants so a custom control can borrow the shell', () => {
    expect(inputControlVariants({ variant: 'soft', size: 'sm' })).toContain('bg-surface-raised')
  })
})
