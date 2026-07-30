import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Textarea } from './Textarea'

describe('Textarea', () => {
  it('renders a default textarea', () => {
    render(<Textarea />)
    const textarea = screen.getByRole('textbox')
    expect(textarea).toBeInTheDocument()
    expect(textarea).toHaveClass('nothing-textarea__input')
    const wrapper = textarea.closest('.nothing-textarea')
    expect(wrapper).toHaveClass('nothing-textarea')
  })

  it('calls onChange with the typed value', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<Textarea onChange={handleChange} />)
    const textarea = screen.getByRole('textbox')
    await user.type(textarea, 'hello')
    expect(handleChange).toHaveBeenCalled()
  })

  it('displays placeholder text', () => {
    render(<Textarea placeholder="Enter details" />)
    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveAttribute('placeholder', 'Enter details')
  })

  it('cannot be typed into when disabled', () => {
    render(<Textarea disabled />)
    const textarea = screen.getByRole('textbox')
    expect(textarea).toBeDisabled()
    const wrapper = textarea.closest('.nothing-textarea')
    expect(wrapper).toHaveClass('nothing-textarea--disabled')
  })

  it('supports custom className on the wrapper', () => {
    render(<Textarea className="my-custom-textarea" />)
    const textarea = screen.getByRole('textbox')
    const wrapper = textarea.closest('.nothing-textarea')
    expect(wrapper).toHaveClass('my-custom-textarea')
    expect(wrapper).toHaveClass('nothing-textarea')
  })

  it('forwards ref to the textarea element', () => {
    const ref = React.createRef<HTMLTextAreaElement>()
    render(<Textarea ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement)
    expect(ref.current?.tagName).toBe('TEXTAREA')
  })

  it('renders label associated with the textarea', () => {
    render(<Textarea label="Description" />)
    const textarea = screen.getByLabelText('Description')
    expect(textarea).toBeInTheDocument()
    const label = screen.getByText('Description')
    expect(label).toHaveClass('nothing-textarea__label')
  })

  it('renders error message and error state', () => {
    render(<Textarea error="This field is required" />)
    const errorEl = screen.getByText('This field is required')
    expect(errorEl).toHaveClass('nothing-textarea__error')
    const wrapper = errorEl.closest('.nothing-textarea')
    expect(wrapper).toHaveClass('nothing-textarea--error')
  })

  it('renders helper message', () => {
    render(<Textarea message="Keep it concise" />)
    expect(screen.getByText('Keep it concise')).toHaveClass('nothing-textarea__message')
  })

  it('applies bordered variant class', () => {
    render(<Textarea variant="bordered" />)
    const textarea = screen.getByRole('textbox')
    const wrapper = textarea.closest('.nothing-textarea')
    expect(wrapper).toHaveClass('nothing-textarea--bordered')
  })

  it('applies auto-resize class and respects minRows', () => {
    render(<Textarea autoResize minRows={5} />)
    const textarea = screen.getByRole('textbox')
    const wrapper = textarea.closest('.nothing-textarea')
    expect(wrapper).toHaveClass('nothing-textarea--auto-resize')
    expect(textarea).toHaveAttribute('rows', '5')
  })

  it('calls onFocus and onBlur handlers', async () => {
    const user = userEvent.setup()
    const handleFocus = vi.fn()
    const handleBlur = vi.fn()
    render(<Textarea onFocus={handleFocus} onBlur={handleBlur} />)
    const textarea = screen.getByRole('textbox')
    await user.click(textarea)
    expect(handleFocus).toHaveBeenCalled()
    await user.click(document.body)
    expect(handleBlur).toHaveBeenCalled()
  })
})
