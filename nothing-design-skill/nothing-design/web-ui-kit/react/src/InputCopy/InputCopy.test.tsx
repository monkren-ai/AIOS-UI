import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { InputCopy } from './InputCopy'

describe('InputCopy', () => {
  it('renders with data-slot', () => {
    render(<InputCopy value="hello" />)
    expect(screen.getByRole('textbox').closest('[data-slot="input-copy"]')).toHaveAttribute(
      'data-slot',
      'input-copy',
    )
  })

  it('renders label and value', () => {
    render(<InputCopy value="copy-me" label="Token" />)
    expect(screen.getByText('Token')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveValue('copy-me')
  })

  it('renders copy button with default label', () => {
    render(<InputCopy value="copy-me" />)
    expect(screen.getByRole('button', { name: 'COPY' })).toBeInTheDocument()
  })

  it('supports uncontrolled defaultValue', () => {
    render(<InputCopy defaultValue="default-value" />)
    expect(screen.getByRole('textbox')).toHaveValue('default-value')
  })

  it('switches to copied label after click', async () => {
    render(<InputCopy value="copy-me" />)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    await waitFor(() => expect(screen.getByRole('button')).toHaveTextContent('COPIED'))
    expect(button).toHaveAttribute('aria-label', 'COPIED')
  })

  it('calls onCopy with the current value', async () => {
    const onCopy = vi.fn()
    render(<InputCopy value="copy-me" onCopy={onCopy} />)
    fireEvent.click(screen.getByRole('button'))
    await waitFor(() => expect(onCopy).toHaveBeenCalledWith('copy-me'))
  })

  it('supports custom copy labels', async () => {
    render(
      <InputCopy value="copy-me" copyLabel="Copy URL" copiedLabel="Got it" copiedDuration={50} />,
    )
    expect(screen.getByRole('button')).toHaveTextContent('Copy URL')
    fireEvent.click(screen.getByRole('button'))
    await waitFor(() => expect(screen.getByRole('button')).toHaveTextContent('Got it'))
  })

  it('renders all sizes with correct data attributes', () => {
    const sizes = ['sm', 'md', 'lg'] as const
    for (const size of sizes) {
      const { unmount } = render(<InputCopy value="x" size={size} />)
      const root = screen.getByRole('textbox').closest('[data-slot="input-copy"]')
      expect(root).toHaveAttribute('data-size', size)
      unmount()
    }
  })

  it('exposes every part through data-slot', () => {
    render(<InputCopy value="x" label="Token" />)
    const root = screen.getByRole('textbox').closest('[data-slot="input-copy"]')!
    for (const slot of [
      'input-copy-label',
      'input-copy-control',
      'input-copy-field',
      'input-copy-button',
      'input-copy-button-text',
    ]) {
      expect(root.querySelector(`[data-slot="${slot}"]`)).not.toBeNull()
    }
  })

  it('flags the copied state through data-copied', async () => {
    render(<InputCopy value="x" />)
    const root = screen.getByRole('textbox').closest('[data-slot="input-copy"]')!
    expect(root).not.toHaveAttribute('data-copied')
    fireEvent.click(screen.getByRole('button'))
    await waitFor(() => expect(root).toHaveAttribute('data-copied', ''))
    expect(screen.getByRole('button')).toHaveAttribute('data-copied', '')
  })

  it('supports custom className', () => {
    render(<InputCopy value="x" className="custom-copy" />)
    const root = screen.getByRole('textbox').closest('[data-slot="input-copy"]')
    expect(root).toHaveClass('custom-copy')
  })

  it('lets the caller override variant defaults', () => {
    render(<InputCopy value="x" className="gap-6" />)
    const root = screen.getByRole('textbox').closest('[data-slot="input-copy"]')!
    expect(root.className).toContain('gap-6')
    expect(root.className).not.toContain('gap-xs')
  })

  it('forwards ref to the div element', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<InputCopy value="x" ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
    expect(ref.current?.tagName).toBe('DIV')
  })
})
