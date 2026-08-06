import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Sender } from './Sender'

describe('Sender', () => {
  it('renders root with data-slot', () => {
    render(<Sender />)
    expect(document.querySelector('[data-slot="sender"]')).toBeInTheDocument()
  })

  it('renders input with data-slot', () => {
    render(<Sender placeholder="Type here" />)
    const input = screen.getByPlaceholderText('Type here')
    expect(input).toHaveAttribute('data-slot', 'sender-input')
  })

  it('calls onChange when typing', () => {
    const handleChange = vi.fn()
    render(<Sender onChange={handleChange} />)
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'hello' } })
    expect(handleChange).toHaveBeenCalledWith('hello', expect.any(Object))
  })

  it('submits on Enter when submitType is enter', () => {
    const handleSubmit = vi.fn()
    render(<Sender submitType="enter" onSubmit={handleSubmit} />)
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'hello' } })
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })
    expect(handleSubmit).toHaveBeenCalledWith('hello')
  })

  it('does not submit on Shift+Enter when submitType is enter', () => {
    const handleSubmit = vi.fn()
    render(<Sender submitType="enter" onSubmit={handleSubmit} />)
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'hello' } })
    fireEvent.keyDown(input, { key: 'Enter', shiftKey: true, code: 'Enter' })
    expect(handleSubmit).not.toHaveBeenCalled()
  })

  it('calls onCancel when pressing Enter while loading', () => {
    const handleCancel = vi.fn()
    render(<Sender loading onCancel={handleCancel} />)
    const input = screen.getByRole('textbox')
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })
    expect(handleCancel).toHaveBeenCalled()
  })

  it('renders prefix and suffix slots', () => {
    render(
      <Sender
        prefix={<span data-testid="prefix">Prefix</span>}
        suffix={<span data-testid="suffix">Suffix</span>}
      />,
    )
    expect(screen.getByTestId('prefix')).toBeInTheDocument()
    expect(screen.getByTestId('suffix')).toBeInTheDocument()
  })

  it('applies semantic classNames', () => {
    render(<Sender classNames={{ root: 'custom-root', input: 'custom-input' }} />)
    const root = document.querySelector('[data-slot="sender"]')
    expect(root).toHaveClass('custom-root')
    expect(screen.getByRole('textbox')).toHaveClass('custom-input')
  })

  it('is disabled when disabled prop is true', () => {
    render(<Sender disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })
})
