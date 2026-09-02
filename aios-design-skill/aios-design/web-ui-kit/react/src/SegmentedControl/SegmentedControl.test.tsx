import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SegmentedControl } from './SegmentedControl'

describe('SegmentedControl', () => {
  const segments = ['Day', 'Week', 'Month']

  it('renders segments', () => {
    render(<SegmentedControl segments={segments} />)
    expect(screen.getByRole('radio', { name: 'Day' })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: 'Week' })).toBeInTheDocument()
  })

  it('exposes the frame as a radiogroup', () => {
    const { container } = render(<SegmentedControl segments={segments} />)
    expect(screen.getByRole('radiogroup')).toBe(
      container.querySelector('[data-slot="segmented-control"]'),
    )
  })

  it('marks first segment active by default', () => {
    render(<SegmentedControl segments={segments} />)
    expect(screen.getByRole('radio', { name: 'Day' })).toHaveAttribute('aria-checked', 'true')
  })

  it('switches active segment on click', () => {
    render(<SegmentedControl segments={segments} />)
    fireEvent.click(screen.getByRole('radio', { name: 'Month' }))
    expect(screen.getByRole('radio', { name: 'Month' })).toHaveAttribute('aria-checked', 'true')
  })

  it('calls onChange with selected index', () => {
    const handleChange = vi.fn()
    render(<SegmentedControl segments={segments} onChange={handleChange} />)
    fireEvent.click(screen.getByRole('radio', { name: 'Week' }))
    expect(handleChange).toHaveBeenCalledWith(1)
  })

  it('supports controlled activeIndex', () => {
    const { rerender } = render(<SegmentedControl segments={segments} activeIndex={0} />)
    expect(screen.getByRole('radio', { name: 'Day' })).toHaveAttribute('aria-checked', 'true')
    rerender(<SegmentedControl segments={segments} activeIndex={2} />)
    expect(screen.getByRole('radio', { name: 'Month' })).toHaveAttribute('aria-checked', 'true')
  })

  it('keeps a single tab stop through a roving tabindex', () => {
    render(<SegmentedControl segments={segments} activeIndex={1} />)
    expect(screen.getByRole('radio', { name: 'Day' })).toHaveAttribute('tabindex', '-1')
    expect(screen.getByRole('radio', { name: 'Week' })).toHaveAttribute('tabindex', '0')
    expect(screen.getByRole('radio', { name: 'Month' })).toHaveAttribute('tabindex', '-1')
  })

  it('moves the roving tab stop with the selection', () => {
    render(<SegmentedControl segments={segments} />)
    fireEvent.click(screen.getByRole('radio', { name: 'Month' }))
    expect(screen.getByRole('radio', { name: 'Month' })).toHaveAttribute('tabindex', '0')
    expect(screen.getByRole('radio', { name: 'Day' })).toHaveAttribute('tabindex', '-1')
  })

  it('keeps a tab stop when activeIndex is out of range', () => {
    render(<SegmentedControl segments={segments} activeIndex={9} />)
    expect(screen.getByRole('radio', { name: 'Day' })).toHaveAttribute('tabindex', '0')
  })

  it('tabs into the control once and lands on the selected segment', async () => {
    const user = userEvent.setup()
    render(
      <>
        <button type="button">before</button>
        <SegmentedControl segments={segments} activeIndex={1} />
        <button type="button">after</button>
      </>,
    )

    await user.tab()
    expect(screen.getByRole('button', { name: 'before' })).toHaveFocus()
    await user.tab()
    expect(screen.getByRole('radio', { name: 'Week' })).toHaveFocus()
    await user.tab()
    expect(screen.getByRole('button', { name: 'after' })).toHaveFocus()
  })

  it('moves focus and selection with the arrow keys', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<SegmentedControl segments={segments} onChange={handleChange} />)

    screen.getByRole('radio', { name: 'Day' }).focus()
    await user.keyboard('{ArrowRight}')
    expect(screen.getByRole('radio', { name: 'Week' })).toHaveFocus()
    expect(screen.getByRole('radio', { name: 'Week' })).toHaveAttribute('aria-checked', 'true')
    expect(handleChange).toHaveBeenLastCalledWith(1)

    await user.keyboard('{ArrowDown}')
    expect(screen.getByRole('radio', { name: 'Month' })).toHaveFocus()

    await user.keyboard('{ArrowLeft}')
    expect(screen.getByRole('radio', { name: 'Week' })).toHaveFocus()

    await user.keyboard('{ArrowUp}')
    expect(screen.getByRole('radio', { name: 'Day' })).toHaveFocus()
  })

  it('wraps around at both ends', async () => {
    const user = userEvent.setup()
    render(<SegmentedControl segments={segments} />)

    screen.getByRole('radio', { name: 'Day' }).focus()
    await user.keyboard('{ArrowLeft}')
    expect(screen.getByRole('radio', { name: 'Month' })).toHaveFocus()
    await user.keyboard('{ArrowRight}')
    expect(screen.getByRole('radio', { name: 'Day' })).toHaveFocus()
  })

  it('jumps to the ends with Home and End', async () => {
    const user = userEvent.setup()
    render(<SegmentedControl segments={segments} activeIndex={1} />)

    screen.getByRole('radio', { name: 'Week' }).focus()
    await user.keyboard('{End}')
    expect(screen.getByRole('radio', { name: 'Month' })).toHaveFocus()
    await user.keyboard('{Home}')
    expect(screen.getByRole('radio', { name: 'Day' })).toHaveFocus()
  })

  it('mirrors the horizontal arrows under RTL', async () => {
    const user = userEvent.setup()
    render(<SegmentedControl segments={segments} dir="rtl" style={{ direction: 'rtl' }} />)

    screen.getByRole('radio', { name: 'Day' }).focus()
    await user.keyboard('{ArrowLeft}')
    expect(screen.getByRole('radio', { name: 'Week' })).toHaveFocus()
    await user.keyboard('{ArrowRight}')
    expect(screen.getByRole('radio', { name: 'Day' })).toHaveFocus()
  })

  it('leaves other keys alone', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<SegmentedControl segments={segments} onChange={handleChange} />)

    screen.getByRole('radio', { name: 'Day' }).focus()
    await user.keyboard('{PageDown}')
    expect(screen.getByRole('radio', { name: 'Day' })).toHaveFocus()
    expect(handleChange).not.toHaveBeenCalled()
  })

  it('flags proximity mode and renders the hover slider', () => {
    const { container } = render(<SegmentedControl segments={segments} proximity />)
    expect(container.querySelector('[data-slot="segmented-control"]')).toHaveAttribute(
      'data-proximity',
    )
    expect(
      container.querySelector('[data-slot="segmented-control-hover-slider"]'),
    ).toBeInTheDocument()
  })

  it('omits the hover slider when proximity is off', () => {
    const { container } = render(<SegmentedControl segments={segments} />)
    expect(container.querySelector('[data-slot="segmented-control"]')).not.toHaveAttribute(
      'data-proximity',
    )
    expect(
      container.querySelector('[data-slot="segmented-control-hover-slider"]'),
    ).not.toBeInTheDocument()
  })

  it('renders with data-slot on every part', () => {
    const { container } = render(<SegmentedControl segments={segments} />)
    expect(container.querySelector('[data-slot="segmented-control"]')).toBeInTheDocument()
    expect(container.querySelector('[data-slot="segmented-control-slider"]')).toBeInTheDocument()
    expect(container.querySelectorAll('[data-slot="segmented-control-segment"]')).toHaveLength(3)
  })

  it('reflects selection through data-state', () => {
    render(<SegmentedControl segments={segments} activeIndex={1} />)
    expect(screen.getByRole('radio', { name: 'Week' })).toHaveAttribute('data-state', 'active')
    expect(screen.getByRole('radio', { name: 'Day' })).toHaveAttribute('data-state', 'inactive')
  })

  it('exposes the variant through data-variant', () => {
    const { container } = render(<SegmentedControl segments={segments} variant="rounded" />)
    expect(container.querySelector('[data-slot="segmented-control"]')).toHaveAttribute(
      'data-variant',
      'rounded',
    )
  })

  it('supports a compact small size', () => {
    const { container } = render(<SegmentedControl segments={segments} size="sm" />)
    expect(container.querySelector('[data-slot="segmented-control"]')).toHaveAttribute(
      'data-size',
      'sm',
    )
    expect(screen.getByRole('radio', { name: 'Day' })).toHaveClass('h-9', 'px-3')
  })

  it('disables all segments when disabled', () => {
    const { container } = render(<SegmentedControl segments={segments} disabled />)
    const options = screen.getAllByRole('radio')
    options.forEach((option) => expect(option).toBeDisabled())
    expect(container.querySelector('[data-slot="segmented-control"]')).toHaveAttribute(
      'data-disabled',
    )
  })

  it('ignores the arrow keys while disabled', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<SegmentedControl segments={segments} onChange={handleChange} disabled />)

    fireEvent.keyDown(screen.getByRole('radio', { name: 'Day' }), { key: 'ArrowRight' })
    await user.keyboard('{ArrowRight}')
    expect(handleChange).not.toHaveBeenCalled()
    expect(screen.getByRole('radio', { name: 'Day' })).toHaveAttribute('aria-checked', 'true')
  })

  it('lets the caller override variant defaults through className', () => {
    const { container } = render(<SegmentedControl segments={segments} className="rounded-none" />)
    const root = container.querySelector('[data-slot="segmented-control"]')
    expect(root).toHaveClass('rounded-none')
    expect(root).not.toHaveClass('rounded-pill')
  })

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<SegmentedControl ref={ref} segments={segments} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
    expect(ref.current).toHaveAttribute('data-slot', 'segmented-control')
  })
})
