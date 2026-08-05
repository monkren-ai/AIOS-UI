import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { InputMessage } from './InputMessage'

describe('InputMessage', () => {
  it('renders with data-slot', () => {
    render(<InputMessage />)
    expect(screen.getByRole('textbox').closest('[data-slot="input-message"]')).toHaveAttribute(
      'data-slot',
      'input-message',
    )
  })

  it('renders placeholder', () => {
    render(<InputMessage placeholder="Type a message" />)
    expect(screen.getByPlaceholderText('Type a message')).toBeInTheDocument()
  })

  it('supports controlled value', () => {
    render(<InputMessage value="hello" />)
    expect(screen.getByRole('textbox')).toHaveValue('hello')
  })

  it('supports uncontrolled defaultValue and onChange', () => {
    const onChange = vi.fn()
    render(<InputMessage defaultValue="hi" onChange={onChange} />)
    const textarea = screen.getByRole('textbox')
    fireEvent.change(textarea, { target: { value: 'hello' } })
    expect(textarea).toHaveValue('hello')
    expect(onChange).toHaveBeenCalledWith('hello')
  })

  it('calls onSend when send button clicked', () => {
    const onSend = vi.fn()
    render(<InputMessage defaultValue="hello" onSend={onSend} />)
    fireEvent.click(screen.getByRole('button', { name: 'SEND' }))
    expect(onSend).toHaveBeenCalledWith('hello')
  })

  it('calls onSend when Enter is pressed without Shift', () => {
    const onSend = vi.fn()
    render(<InputMessage defaultValue="hello" onSend={onSend} />)
    fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter', shiftKey: false })
    expect(onSend).toHaveBeenCalledWith('hello')
  })

  it('does not send when Shift+Enter is pressed', () => {
    const onSend = vi.fn()
    render(<InputMessage defaultValue="hello" onSend={onSend} />)
    fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter', shiftKey: true })
    expect(onSend).not.toHaveBeenCalled()
  })

  it('disables send button when value is empty', () => {
    render(<InputMessage />)
    expect(screen.getByRole('button', { name: 'SEND' })).toBeDisabled()
  })

  it('respects submitOnEnter=false', () => {
    const onSend = vi.fn()
    render(<InputMessage defaultValue="hello" onSend={onSend} submitOnEnter={false} />)
    fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' })
    expect(onSend).not.toHaveBeenCalled()
  })

  it('renders character count', () => {
    render(<InputMessage defaultValue="hello" maxLength={100} />)
    expect(screen.getByText('5/100')).toBeInTheDocument()
  })

  it('renders custom count label', () => {
    render(<InputMessage defaultValue="hi" countLabel="chars" />)
    expect(screen.getByText('2 chars')).toBeInTheDocument()
  })

  it('supports custom send label', () => {
    render(<InputMessage defaultValue="x" sendLabel="GO" />)
    expect(screen.getByRole('button', { name: 'GO' })).toBeInTheDocument()
  })

  it('supports sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const
    for (const size of sizes) {
      const { unmount } = render(<InputMessage size={size} />)
      const root = screen.getByRole('textbox').closest('[data-slot="input-message"]')
      expect(root).toHaveAttribute('data-size', size)
      unmount()
    }
  })

  it('exposes every part through data-slot', () => {
    render(<InputMessage />)
    const root = screen.getByRole('textbox').closest('[data-slot="input-message"]')!
    for (const slot of [
      'input-message-control',
      'input-message-field',
      'input-message-send',
      'input-message-send-icon',
      'input-message-meta',
      'input-message-count',
    ]) {
      expect(root.querySelector(`[data-slot="${slot}"]`)).not.toBeNull()
    }
  })

  it('exposes the disabled state on the root and the send button', () => {
    render(<InputMessage disabled defaultValue="hi" />)
    const root = screen.getByRole('textbox').closest('[data-slot="input-message"]')!
    expect(root).toHaveAttribute('data-disabled', '')
    expect(root.querySelector('[data-slot="input-message-send"]')).toHaveAttribute(
      'data-disabled',
      '',
    )
  })

  it('hides the meta row when hideCount is set', () => {
    render(<InputMessage hideCount />)
    const root = screen.getByRole('textbox').closest('[data-slot="input-message"]')!
    expect(root.querySelector('[data-slot="input-message-meta"]')).toBeNull()
  })

  it('supports custom className', () => {
    render(<InputMessage className="custom-composer" />)
    const root = screen.getByRole('textbox').closest('[data-slot="input-message"]')
    expect(root).toHaveClass('custom-composer')
  })

  it('lets the caller override variant defaults', () => {
    render(<InputMessage className="gap-6" />)
    const root = screen.getByRole('textbox').closest('[data-slot="input-message"]')!
    expect(root.className).toContain('gap-6')
    expect(root.className).not.toContain('gap-xs')
  })

  it('forwards ref to the textarea element', () => {
    const ref = React.createRef<HTMLTextAreaElement>()
    render(<InputMessage ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement)
    expect(ref.current?.tagName).toBe('TEXTAREA')
  })
})
