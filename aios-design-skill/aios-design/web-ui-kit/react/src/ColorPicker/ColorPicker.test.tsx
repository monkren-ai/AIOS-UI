import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ColorPicker } from './ColorPicker'

describe('ColorPicker', () => {
  it('renders with data-slot', () => {
    render(<ColorPicker />)
    expect(screen.getByText('COLOR').closest('[data-slot="color-picker"]')).toHaveAttribute(
      'data-slot',
      'color-picker',
    )
  })

  it('renders title and default value', () => {
    render(<ColorPicker defaultValue="#D71921" />)
    expect(screen.getByText('COLOR')).toBeInTheDocument()
    expect(screen.getByText('#D71921')).toBeInTheDocument()
  })

  it('selects a preset swatch', () => {
    const onChange = vi.fn()
    render(<ColorPicker onChange={onChange} />)
    const swatches = screen.getAllByRole('button', { name: /Select color/ })
    fireEvent.click(swatches[1])
    expect(onChange).toHaveBeenCalledWith('#FFFFFF')
  })

  it('marks active swatch', () => {
    render(<ColorPicker defaultValue="#FFFFFF" />)
    const active = screen.getByRole('button', { name: 'Select color #FFFFFF' })
    expect(active).toHaveAttribute('data-slot', 'color-picker-swatch')
    expect(active).toHaveAttribute('data-active', '')
    expect(active).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: 'Select color #000000' })).not.toHaveAttribute(
      'data-active',
    )
  })

  it('supports controlled value', () => {
    const { rerender } = render(<ColorPicker value="#000000" />)
    expect(screen.getByText('#000000')).toBeInTheDocument()
    rerender(<ColorPicker value="#D71921" />)
    expect(screen.getByText('#D71921')).toBeInTheDocument()
  })

  it('renders custom picker button', () => {
    render(<ColorPicker />)
    expect(screen.getByRole('button', { name: 'Custom' })).toBeInTheDocument()
  })

  it('renders hex input when showInput is true', () => {
    render(<ColorPicker defaultValue="#D71921" showInput />)
    expect(screen.getByRole('textbox')).toHaveValue('D71921')
  })

  it('hides hex input when showInput is false', () => {
    render(<ColorPicker showInput={false} />)
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
  })

  it('updates color from hex input', () => {
    const onChange = vi.fn()
    render(<ColorPicker onChange={onChange} showInput />)
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '4A9E5C' } })
    expect(onChange).toHaveBeenCalledWith('#4A9E5C')
  })

  it('supports sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const
    for (const size of sizes) {
      const { unmount } = render(<ColorPicker size={size} />)
      const root = screen.getByText('COLOR').closest('[data-slot="color-picker"]')
      expect(root).toHaveAttribute('data-size', size)
      unmount()
    }
  })

  it('exposes every part through data-slot', () => {
    render(<ColorPicker />)
    const root = screen.getByText('COLOR').closest('[data-slot="color-picker"]')!
    for (const slot of [
      'color-picker-header',
      'color-picker-title',
      'color-picker-value',
      'color-picker-swatches',
      'color-picker-swatch',
      'color-picker-swatch-custom',
      'color-picker-native',
      'color-picker-input',
    ]) {
      expect(root.querySelector(`[data-slot="${slot}"]`)).not.toBeNull()
    }
  })

  it('supports custom className', () => {
    render(<ColorPicker className="custom-picker" />)
    const root = screen.getByText('COLOR').closest('[data-slot="color-picker"]')
    expect(root).toHaveClass('custom-picker')
  })

  it('lets the caller override variant defaults', () => {
    render(<ColorPicker className="rounded-none" />)
    const root = screen.getByText('COLOR').closest('[data-slot="color-picker"]')!
    expect(root.className).toContain('rounded-none')
    expect(root.className).not.toContain('rounded-card-compact')
  })

  it('forwards ref to the div element', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<ColorPicker ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
    expect(ref.current?.tagName).toBe('DIV')
  })
})
