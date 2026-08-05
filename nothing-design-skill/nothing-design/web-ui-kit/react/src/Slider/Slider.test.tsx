import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Slider } from './Slider'

const slot = (name: string) => document.querySelector(`[data-slot="${name}"]`)

describe('Slider', () => {
  it('renders every part as an addressable slot with the primary/md defaults', () => {
    render(<Slider />)
    const slider = screen.getByRole('slider')
    expect(slider).toBeInTheDocument()
    const root = slot('slider')
    expect(root).toHaveAttribute('data-variant', 'primary')
    expect(root).toHaveAttribute('data-size', 'md')
    expect(slot('slider-control')).toBeInTheDocument()
    expect(slot('slider-track')).toBeInTheDocument()
    expect(slot('slider-fill')).toBeInTheDocument()
    expect(slot('slider-thumb')).toBeInTheDocument()
    expect(slider).toHaveAttribute('min', '0')
    expect(slider).toHaveAttribute('max', '100')
    expect(slider).toHaveAttribute('aria-valuenow', '0')
  })

  it('maps the v1 variant aliases onto their replacements', () => {
    const { unmount } = render(<Slider variant="default" />)
    expect(slot('slider')).toHaveAttribute('data-variant', 'primary')
    unmount()

    render(<Slider variant="minimal" />)
    expect(slot('slider')).toHaveAttribute('data-variant', 'soft')
  })

  it('reports every size through data-size', () => {
    ;(['sm', 'md', 'lg'] as const).forEach((size) => {
      const { unmount } = render(<Slider size={size} />)
      expect(slot('slider')).toHaveAttribute('data-size', size)
      unmount()
    })
  })

  it('changes value via keyboard ArrowRight', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<Slider onValueChange={handleChange} />)
    const slider = screen.getByRole('slider')
    slider.focus()
    await act(async () => {
      await user.keyboard('{ArrowRight}')
    })
    expect(handleChange).toHaveBeenLastCalledWith(1)
    expect(slider).toHaveAttribute('aria-valuenow', '1')
  })

  it('changes value via keyboard ArrowLeft', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<Slider defaultValue={50} onValueChange={handleChange} />)
    screen.getByRole('slider').focus()
    await act(async () => {
      await user.keyboard('{ArrowLeft}')
    })
    expect(handleChange).toHaveBeenLastCalledWith(49)
  })

  it('works in controlled mode with value prop', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    const { rerender } = render(<Slider value={30} onValueChange={handleChange} />)
    const slider = screen.getByRole('slider')
    expect(slider).toHaveAttribute('aria-valuenow', '30')

    slider.focus()
    await act(async () => {
      await user.keyboard('{ArrowRight}')
    })
    expect(handleChange).toHaveBeenLastCalledWith(31)
    expect(slider).toHaveAttribute('aria-valuenow', '30')

    rerender(<Slider value={31} onValueChange={handleChange} />)
    expect(slider).toHaveAttribute('aria-valuenow', '31')
  })

  it('respects custom min and max attributes', () => {
    render(<Slider min={10} max={50} defaultValue={20} />)
    const slider = screen.getByRole('slider')
    expect(slider).toHaveAttribute('min', '10')
    expect(slider).toHaveAttribute('max', '50')
    expect(slider).toHaveAttribute('aria-valuenow', '20')
  })

  it('clamps value to max with End key', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<Slider min={0} max={100} defaultValue={50} onValueChange={handleChange} />)
    screen.getByRole('slider').focus()
    await act(async () => {
      await user.keyboard('{End}')
    })
    expect(handleChange).toHaveBeenLastCalledWith(100)
  })

  it('sets value to min with Home key', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<Slider min={10} max={100} defaultValue={50} onValueChange={handleChange} />)
    screen.getByRole('slider').focus()
    await act(async () => {
      await user.keyboard('{Home}')
    })
    expect(handleChange).toHaveBeenLastCalledWith(10)
  })

  it('flags the disabled state on the root', () => {
    render(<Slider disabled />)
    expect(screen.getByRole('slider')).toBeDisabled()
    expect(slot('slider')).toHaveAttribute('data-disabled')
  })

  it('renders label and value when showValue is true', () => {
    render(<Slider label="Volume" showValue defaultValue={42} />)
    expect(screen.getByText('Volume')).toHaveAttribute('data-slot', 'slider-label')
    expect(screen.getByText('42')).toHaveAttribute('data-slot', 'slider-value')
  })

  it('accepts ref as a plain prop', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<Slider ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('lets a caller-supplied utility win over the variant default', () => {
    render(<Slider className="gap-6" />)
    const root = slot('slider')
    expect(root).toHaveClass('gap-6')
    expect(root).not.toHaveClass('gap-2')
  })
})
