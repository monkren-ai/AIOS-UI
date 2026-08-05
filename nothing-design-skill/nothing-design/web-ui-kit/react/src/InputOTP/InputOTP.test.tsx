import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { InputOTP } from './InputOTP'

function slots(root: HTMLElement) {
  return Array.from(root.querySelectorAll<HTMLElement>('[data-slot="input-otp-slot"]'))
}

function inputs(root: HTMLElement) {
  return Array.from(root.querySelectorAll<HTMLInputElement>('[data-slot="input-otp-input"]'))
}

describe('InputOTP', () => {
  it('renders with data-slot', () => {
    render(<InputOTP data-testid="otp" />)
    expect(screen.getByTestId('otp')).toHaveAttribute('data-slot', 'input-otp')
  })

  it('renders `length` slots', () => {
    render(<InputOTP data-testid="otp" length={4} />)
    expect(slots(screen.getByTestId('otp'))).toHaveLength(4)
  })

  it('defaults to the md size', () => {
    render(<InputOTP data-testid="otp" />)
    expect(screen.getByTestId('otp')).toHaveAttribute('data-size', 'md')
  })

  it('exposes the error state through data-invalid', () => {
    render(<InputOTP data-testid="otp" error />)
    const root = screen.getByTestId('otp')
    expect(root).toHaveAttribute('data-invalid', '')
    expect(root).toHaveAttribute('data-state', 'error')
  })

  it('exposes the disabled state', () => {
    render(<InputOTP data-testid="otp" disabled />)
    expect(screen.getByTestId('otp')).toHaveAttribute('data-disabled', '')
    expect(inputs(screen.getByTestId('otp'))[0]).toBeDisabled()
  })

  it('accepts a digit and advances focus', () => {
    const onValueChange = vi.fn()
    render(<InputOTP data-testid="otp" length={4} onValueChange={onValueChange} />)
    const els = inputs(screen.getByTestId('otp'))
    fireEvent.change(els[0], { target: { value: '7' } })
    expect(onValueChange).toHaveBeenCalledWith('7')
    expect(document.activeElement).toBe(els[1])
  })

  it('ignores non-digits', () => {
    const onValueChange = vi.fn()
    render(<InputOTP data-testid="otp" onValueChange={onValueChange} />)
    fireEvent.change(inputs(screen.getByTestId('otp'))[0], { target: { value: 'a' } })
    expect(onValueChange).not.toHaveBeenCalled()
  })

  it('marks filled slots through data-filled', () => {
    render(<InputOTP data-testid="otp" length={4} value="12" />)
    const [a, b, c] = slots(screen.getByTestId('otp'))
    expect(a).toHaveAttribute('data-filled', '')
    expect(b).toHaveAttribute('data-filled', '')
    expect(c).not.toHaveAttribute('data-filled')
  })

  it('marks the focused slot through data-active', () => {
    render(<InputOTP data-testid="otp" length={4} />)
    const root = screen.getByTestId('otp')
    fireEvent.focus(inputs(root)[2])
    expect(slots(root)[2]).toHaveAttribute('data-active', '')
    fireEvent.blur(inputs(root)[2])
    expect(slots(root)[2]).not.toHaveAttribute('data-active')
  })

  it('clears the current digit on Backspace', () => {
    const onValueChange = vi.fn()
    render(<InputOTP data-testid="otp" length={4} value="12" onValueChange={onValueChange} />)
    fireEvent.keyDown(inputs(screen.getByTestId('otp'))[1], { key: 'Backspace' })
    expect(onValueChange).toHaveBeenCalledWith('1')
  })

  it('steps back on Backspace in an empty slot', () => {
    const onValueChange = vi.fn()
    render(<InputOTP data-testid="otp" length={4} value="12" onValueChange={onValueChange} />)
    const els = inputs(screen.getByTestId('otp'))
    fireEvent.keyDown(els[2], { key: 'Backspace' })
    expect(onValueChange).toHaveBeenCalledWith('1')
    expect(document.activeElement).toBe(els[1])
  })

  it('moves focus with the arrow keys', () => {
    render(<InputOTP data-testid="otp" length={4} />)
    const els = inputs(screen.getByTestId('otp'))
    fireEvent.keyDown(els[1], { key: 'ArrowRight' })
    expect(document.activeElement).toBe(els[2])
    fireEvent.keyDown(els[2], { key: 'ArrowLeft' })
    expect(document.activeElement).toBe(els[1])
  })

  it('does not wrap past the edges', () => {
    render(<InputOTP data-testid="otp" length={2} />)
    const els = inputs(screen.getByTestId('otp'))
    els[0].focus()
    fireEvent.keyDown(els[0], { key: 'ArrowLeft' })
    expect(document.activeElement).toBe(els[0])
  })

  it('accepts a pasted code and drops non-digits', () => {
    const onValueChange = vi.fn()
    render(<InputOTP data-testid="otp" length={4} onValueChange={onValueChange} />)
    fireEvent.paste(inputs(screen.getByTestId('otp'))[0], {
      clipboardData: { getData: () => '1a2b3c4d5' },
    })
    expect(onValueChange).toHaveBeenCalledWith('1234')
  })

  it('labels each digit', () => {
    render(<InputOTP length={3} />)
    expect(screen.getByLabelText('Digit 1 of 3')).toBeInTheDocument()
  })

  it('lets the caller override variant defaults', () => {
    render(<InputOTP data-testid="otp" className="gap-4" />)
    const root = screen.getByTestId('otp')
    expect(root.className).toContain('gap-4')
    expect(root.className).not.toContain('gap-xs')
  })
})
