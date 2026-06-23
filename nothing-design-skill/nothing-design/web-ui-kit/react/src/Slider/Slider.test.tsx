import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Slider } from './Slider'

describe('Slider', () => {
  it('renders a default slider with role="slider"', () => {
    render(<Slider />)
    const slider = screen.getByRole('slider')
    expect(slider).toBeInTheDocument()
    const wrapper = slider.closest('.nothing-slider')
    expect(wrapper).toHaveClass('nothing-slider')
    expect(slider).toHaveAttribute('aria-valuemin', '0')
    expect(slider).toHaveAttribute('aria-valuemax', '100')
    expect(slider).toHaveAttribute('aria-valuenow', '0')
  })

  it('changes value via keyboard ArrowRight', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<Slider onValueChange={handleChange} />)
    const slider = screen.getByRole('slider')
    slider.focus()
    await user.keyboard('{ArrowRight}')
    expect(handleChange).toHaveBeenLastCalledWith(1)
    expect(slider).toHaveAttribute('aria-valuenow', '1')
  })

  it('changes value via keyboard ArrowLeft', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<Slider defaultValue={50} onValueChange={handleChange} />)
    const slider = screen.getByRole('slider')
    slider.focus()
    await user.keyboard('{ArrowLeft}')
    expect(handleChange).toHaveBeenLastCalledWith(49)
  })

  it('works in controlled mode with value prop', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    const { rerender } = render(
      <Slider value={30} onValueChange={handleChange} />
    )
    const slider = screen.getByRole('slider')
    expect(slider).toHaveAttribute('aria-valuenow', '30')

    slider.focus()
    await user.keyboard('{ArrowRight}')
    expect(handleChange).toHaveBeenLastCalledWith(31)
    // Controlled: value doesn't change until parent updates
    expect(slider).toHaveAttribute('aria-valuenow', '30')

    rerender(<Slider value={31} onValueChange={handleChange} />)
    expect(slider).toHaveAttribute('aria-valuenow', '31')
  })

  it('respects custom min and max attributes', () => {
    render(<Slider min={10} max={50} defaultValue={20} />)
    const slider = screen.getByRole('slider')
    expect(slider).toHaveAttribute('aria-valuemin', '10')
    expect(slider).toHaveAttribute('aria-valuemax', '50')
    expect(slider).toHaveAttribute('aria-valuenow', '20')
  })

  it('clamps value to max with End key', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(
      <Slider min={0} max={100} defaultValue={50} onValueChange={handleChange} />
    )
    const slider = screen.getByRole('slider')
    slider.focus()
    await user.keyboard('{End}')
    expect(handleChange).toHaveBeenLastCalledWith(100)
  })

  it('sets value to min with Home key', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(
      <Slider min={10} max={100} defaultValue={50} onValueChange={handleChange} />
    )
    const slider = screen.getByRole('slider')
    slider.focus()
    await user.keyboard('{Home}')
    expect(handleChange).toHaveBeenLastCalledWith(10)
  })

  it('does not respond to keyboard when disabled', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<Slider disabled onValueChange={handleChange} />)
    const slider = screen.getByRole('slider')
    expect(slider).toHaveAttribute('tabindex', '-1')
    const wrapper = slider.closest('.nothing-slider')
    expect(wrapper).toHaveClass('nothing-slider--disabled')
  })

  it('supports custom className', () => {
    render(<Slider className="my-slider" />)
    const slider = screen.getByRole('slider')
    const wrapper = slider.closest('.nothing-slider')
    expect(wrapper).toHaveClass('my-slider')
    expect(wrapper).toHaveClass('nothing-slider')
  })

  it('renders label and value when showValue is true', () => {
    render(<Slider label="Volume" showValue defaultValue={42} />)
    expect(screen.getByText('Volume')).toHaveClass('nothing-slider__label')
    expect(screen.getByText('42')).toHaveClass('nothing-slider__value')
  })
})
