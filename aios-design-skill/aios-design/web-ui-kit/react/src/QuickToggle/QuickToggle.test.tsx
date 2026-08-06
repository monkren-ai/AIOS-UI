import * as React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { QuickToggle } from './QuickToggle'

describe('QuickToggle', () => {
  it('renders as an unpressed button with the circle/light defaults', () => {
    render(<QuickToggle label="Wi-Fi" />)
    const toggle = screen.getByRole('button')

    expect(toggle).toHaveAttribute('data-slot', 'quick-toggle')
    expect(toggle).toHaveAttribute('data-variant', 'circle')
    expect(toggle).toHaveAttribute('data-widget-theme', 'light')
    expect(toggle).toHaveAttribute('data-state', 'off')
    expect(toggle).toHaveAttribute('aria-pressed', 'false')
    expect(toggle).toHaveAttribute('type', 'button')
  })

  it('reflects the active state', () => {
    render(<QuickToggle label="Wi-Fi" active />)
    const toggle = screen.getByRole('button')
    expect(toggle).toHaveAttribute('data-state', 'on')
    expect(toggle).toHaveAttribute('aria-pressed', 'true')
  })

  it('renders icon and label in their own slots', () => {
    render(<QuickToggle icon={<svg data-testid="icon" />} label="Wi-Fi" />)
    const toggle = screen.getByRole('button')

    expect(
      screen.getByTestId('icon').closest('[data-slot="quick-toggle-icon"]'),
    ).toBeInTheDocument()
    expect(toggle.querySelector('[data-slot="quick-toggle-label"]')).toHaveTextContent('Wi-Fi')
  })

  it('omits the slots that were not given content', () => {
    render(<QuickToggle />)
    const toggle = screen.getByRole('button')
    expect(toggle.querySelector('[data-slot="quick-toggle-icon"]')).toBeNull()
    expect(toggle.querySelector('[data-slot="quick-toggle-label"]')).toBeNull()
  })

  it('calls onClick', () => {
    const onClick = vi.fn()
    render(<QuickToggle label="Wi-Fi" onClick={onClick} />)
    fireEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('keeps the widget palette out of the global data-theme attribute', () => {
    render(<QuickToggle label="Wi-Fi" theme="accent" />)
    const toggle = screen.getByRole('button')
    expect(toggle).toHaveAttribute('data-widget-theme', 'accent')
    expect(toggle).not.toHaveAttribute('data-theme')
  })

  it('shrinks the label on the accent circle', () => {
    render(<QuickToggle label="Wi-Fi" variant="circle" theme="accent" />)
    expect(
      screen.getByRole('button').querySelector('[data-slot="quick-toggle-label"]'),
    ).toHaveClass('text-[8px]')
  })

  it('lets a caller-supplied utility win over the variant default', () => {
    render(<QuickToggle label="Wi-Fi" className="rounded-none" />)
    const toggle = screen.getByRole('button')
    expect(toggle).toHaveClass('rounded-none')
    expect(toggle).not.toHaveClass('rounded-full')
  })

  it('accepts ref as a plain prop', () => {
    const ref = React.createRef<HTMLButtonElement>()
    render(<QuickToggle ref={ref} label="Wi-Fi" />)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })
})
