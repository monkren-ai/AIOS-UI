import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Textarea } from './Textarea'

const slot = (name: string) => document.querySelector(`[data-slot="${name}"]`)

describe('Textarea', () => {
  it('renders with data-slot and the outline/md defaults', () => {
    render(<Textarea />)
    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveAttribute('data-slot', 'textarea-field')
    const root = slot('textarea')
    expect(root).toHaveAttribute('data-variant', 'outline')
    expect(root).toHaveAttribute('data-size', 'md')
    expect(root).toHaveAttribute('data-state', 'default')
  })

  it('reports every variant and size through data attributes', () => {
    ;(['outline', 'soft'] as const).forEach((variant) => {
      const { unmount } = render(<Textarea variant={variant} />)
      expect(slot('textarea')).toHaveAttribute('data-variant', variant)
      unmount()
    })
    ;(['sm', 'md', 'lg'] as const).forEach((size) => {
      const { unmount } = render(<Textarea size={size} />)
      expect(slot('textarea')).toHaveAttribute('data-size', size)
      unmount()
    })
  })

  it('maps the v1 variant aliases onto their replacements', () => {
    const { unmount } = render(<Textarea variant="underline" />)
    expect(slot('textarea')).toHaveAttribute('data-variant', 'outline')
    unmount()

    render(<Textarea variant="bordered" />)
    expect(slot('textarea')).toHaveAttribute('data-variant', 'soft')
  })

  it('calls onChange with the change event', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<Textarea onChange={handleChange} />)
    await user.type(screen.getByRole('textbox'), 'hello')
    expect(handleChange).toHaveBeenCalled()
  })

  it('displays placeholder text', () => {
    render(<Textarea placeholder="Enter details" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', 'Enter details')
  })

  it('cannot be typed into when disabled', () => {
    render(<Textarea disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
    expect(slot('textarea')).toHaveAttribute('data-disabled')
  })

  it('renders label associated with the textarea', () => {
    render(<Textarea label="Description" />)
    expect(screen.getByLabelText('Description')).toBeInTheDocument()
    expect(screen.getByText('Description')).toHaveAttribute('data-slot', 'textarea-label')
  })

  it('renders error message and error state', () => {
    render(<Textarea error="This field is required" />)
    const errorEl = screen.getByRole('alert')
    expect(errorEl).toHaveAttribute('data-slot', 'textarea-error')
    const root = slot('textarea')
    expect(root).toHaveAttribute('data-invalid')
    expect(root).toHaveAttribute('data-state', 'error')
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-describedby', errorEl.id)
  })

  it('renders helper message wired through aria-describedby', () => {
    render(<Textarea message="Keep it concise" />)
    const messageEl = screen.getByText('Keep it concise')
    expect(messageEl).toHaveAttribute('data-slot', 'textarea-message')
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-describedby', messageEl.id)
  })

  it('flags auto-resize and respects minRows', () => {
    render(<Textarea autoResize minRows={5} />)
    expect(slot('textarea')).toHaveAttribute('data-auto-resize')
    expect(screen.getByRole('textbox')).toHaveAttribute('rows', '5')
  })

  it('tracks focus state on the root', async () => {
    const user = userEvent.setup()
    const handleFocus = vi.fn()
    const handleBlur = vi.fn()
    render(<Textarea onFocus={handleFocus} onBlur={handleBlur} />)
    await user.click(screen.getByRole('textbox'))
    expect(handleFocus).toHaveBeenCalled()
    expect(slot('textarea')).toHaveAttribute('data-state', 'focused')
    await user.click(document.body)
    expect(handleBlur).toHaveBeenCalled()
    expect(slot('textarea')).toHaveAttribute('data-state', 'default')
  })

  it('accepts ref as a plain prop', () => {
    const ref = React.createRef<HTMLTextAreaElement>()
    render(<Textarea ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement)
  })

  it('lets a caller-supplied utility win over the variant default', () => {
    render(<Textarea className="gap-6" />)
    const root = slot('textarea')
    expect(root).toHaveClass('gap-6')
    expect(root).not.toHaveClass('gap-1')
  })
})
