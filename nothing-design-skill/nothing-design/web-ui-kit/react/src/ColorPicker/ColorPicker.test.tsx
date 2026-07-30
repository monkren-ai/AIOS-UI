import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ColorPicker } from './ColorPicker'

describe('ColorPicker', () => {
  it('renders with data-slot', () => {
    render(<ColorPicker />)
    expect(screen.getByText('COLOR').closest('[data-slot]')).toHaveAttribute('data-slot', 'color-picker')
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
    expect(active).toHaveClass('nothing-color-picker__swatch--active')
    expect(active).toHaveAttribute('aria-pressed')
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
      const root = screen.getByText('COLOR').closest('[data-slot]')
      expect(root).toHaveClass(`nothing-color-picker--${size}`)
      expect(root).toHaveAttribute('data-size', size)
      unmount()
    }
  })

  it('supports custom className', () => {
    render(<ColorPicker className="custom-picker" />)
    const root = screen.getByText('COLOR').closest('[data-slot]')
    expect(root).toHaveClass('custom-picker')
    expect(root).toHaveClass('nothing-color-picker')
  })

  it('forwards ref to the div element', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<ColorPicker ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
    expect(ref.current?.tagName).toBe('DIV')
  })
})
