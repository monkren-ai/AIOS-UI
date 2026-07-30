import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from './Input'

const Icon = () => (
  <svg data-testid="input-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="8" cy="8" r="6" />
  </svg>
)

describe('Input', () => {
  it('renders a default input field', () => {
    render(<Input />)
    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
    expect(input).toHaveClass('nothing-input__field')
    const wrapper = input.closest('.nothing-input')
    expect(wrapper).toHaveClass('nothing-input')
  })

  it('calls onChange with the typed value', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<Input onChange={handleChange} />)
    const input = screen.getByRole('textbox')
    await user.type(input, 'hello')
    expect(handleChange).toHaveBeenCalled()
    expect(handleChange).toHaveBeenLastCalledWith('hello')
  })

  it('displays placeholder text', () => {
    render(<Input placeholder="Enter your name" />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('placeholder', 'Enter your name')
  })

  it('cannot be typed into when disabled', () => {
    const handleChange = vi.fn()
    render(<Input disabled onChange={handleChange} />)
    const input = screen.getByRole('textbox')
    expect(input).toBeDisabled()
    const wrapper = input.closest('.nothing-input')
    expect(wrapper).toHaveClass('nothing-input--disabled')
    expect(wrapper).toHaveAttribute('data-state', 'disabled')
  })

  it('supports custom className on the wrapper', () => {
    render(<Input className="my-custom-input" />)
    const input = screen.getByRole('textbox')
    const wrapper = input.closest('.nothing-input')
    expect(wrapper).toHaveClass('my-custom-input')
    expect(wrapper).toHaveClass('nothing-input')
  })

  it('forwards ref to the input element', () => {
    const ref = React.createRef<HTMLInputElement>()
    render(<Input ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
    expect(ref.current?.tagName).toBe('INPUT')
  })

  it('renders with type="text" by default', () => {
    render(<Input />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('type', 'text')
  })

  it('renders label associated with the input', () => {
    render(<Input label="Username" />)
    const input = screen.getByLabelText('Username')
    expect(input).toBeInTheDocument()
    const label = screen.getByText('Username')
    expect(label).toHaveClass('nothing-input__label')
  })

  it('renders error message and error state', () => {
    render(<Input error="This field is required" />)
    const errorEl = screen.getByText('This field is required')
    expect(errorEl).toHaveClass('nothing-input__error')
    const wrapper = errorEl.closest('.nothing-input')
    expect(wrapper).toHaveClass('nothing-input--error')
    expect(wrapper).toHaveAttribute('data-state', 'error')
  })

  it('renders leading and trailing icons', () => {
    render(<Input leadingIcon={<Icon />} trailingIcon={<Icon />} />)
    expect(screen.getAllByTestId('input-icon')).toHaveLength(2)
  })

  it('renders helper message', () => {
    render(<Input message="Use 8+ characters" />)
    expect(screen.getByText('Use 8+ characters')).toHaveClass('nothing-input__message')
  })

  it('clears value when clear button is clicked', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<Input clearable value="hello" onChange={handleChange} />)
    const clearButton = screen.getByRole('button', { name: 'Clear input' })
    expect(clearButton).toBeInTheDocument()

    await user.click(clearButton)
    expect(handleChange).toHaveBeenLastCalledWith('')
  })

  it('exposes Input.Message subcomponent', () => {
    render(<Input.Message>Helper text</Input.Message>)
    expect(screen.getByText('Helper text')).toHaveClass('nothing-input__message')
  })
})
