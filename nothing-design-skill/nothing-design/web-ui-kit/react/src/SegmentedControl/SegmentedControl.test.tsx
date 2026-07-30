import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { SegmentedControl } from './SegmentedControl'

describe('SegmentedControl', () => {
  const segments = ['Day', 'Week', 'Month']

  it('renders segments', () => {
    render(<SegmentedControl segments={segments} />)
    expect(screen.getByRole('tab', { name: 'Day' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Week' })).toBeInTheDocument()
  })

  it('marks first segment active by default', () => {
    render(<SegmentedControl segments={segments} />)
    expect(screen.getByRole('tab', { name: 'Day' })).toHaveAttribute('aria-selected', 'true')
  })

  it('switches active segment on click', () => {
    render(<SegmentedControl segments={segments} />)
    fireEvent.click(screen.getByRole('tab', { name: 'Month' }))
    expect(screen.getByRole('tab', { name: 'Month' })).toHaveAttribute('aria-selected', 'true')
  })

  it('calls onChange with selected index', () => {
    const handleChange = vi.fn()
    render(<SegmentedControl segments={segments} onChange={handleChange} />)
    fireEvent.click(screen.getByRole('tab', { name: 'Week' }))
    expect(handleChange).toHaveBeenCalledWith(1)
  })

  it('supports controlled activeIndex', () => {
    const { rerender } = render(<SegmentedControl segments={segments} activeIndex={0} />)
    expect(screen.getByRole('tab', { name: 'Day' })).toHaveAttribute('aria-selected', 'true')
    rerender(<SegmentedControl segments={segments} activeIndex={2} />)
    expect(screen.getByRole('tab', { name: 'Month' })).toHaveAttribute('aria-selected', 'true')
  })

  it('applies proximity class and renders hover slider', () => {
    const { container } = render(<SegmentedControl segments={segments} proximity />)
    expect(container.firstChild).toHaveClass('nothing-segmented--proximity')
    expect(container.querySelector('.nothing-segmented__hover-slider')).toBeInTheDocument()
  })

  it('disables all segments when disabled', () => {
    render(<SegmentedControl segments={segments} disabled />)
    const tabs = screen.getAllByRole('tab')
    tabs.forEach((tab) => expect(tab).toBeDisabled())
  })

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<SegmentedControl ref={ref} segments={segments} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
