import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { ProgressBar } from './ProgressBar'

const track = (bar: HTMLElement) => bar.querySelector('[data-slot="progress-bar-track"]')!
const segments = (bar: HTMLElement) => bar.querySelectorAll('[data-slot="progress-bar-segment"]')

describe('ProgressBar', () => {
  it('renders with data-slot and the segmented/md defaults', () => {
    render(<ProgressBar value={50} />)
    const bar = screen.getByRole('progressbar')
    expect(bar).toHaveAttribute('data-slot', 'progress-bar')
    expect(bar).toHaveAttribute('data-variant', 'segmented')
    expect(bar).toHaveAttribute('data-size', 'md')
    expect(bar).toHaveAttribute('data-state', 'normal')
    expect(track(bar)).toBeInTheDocument()
  })

  it('maps the v1 size aliases onto their replacements', () => {
    ;(
      [
        ['hero', 'lg'],
        ['standard', 'md'],
        ['compact', 'sm'],
      ] as const
    ).forEach(([legacy, current]) => {
      const { unmount } = render(<ProgressBar value={10} size={legacy} />)
      expect(screen.getByRole('progressbar')).toHaveAttribute('data-size', current)
      unmount()
    })
  })

  it('maps the v1 default variant onto segmented', () => {
    render(<ProgressBar value={10} variant="default" />)
    expect(screen.getByRole('progressbar')).toHaveAttribute('data-variant', 'segmented')
  })

  it('exposes the ARIA value range', () => {
    render(<ProgressBar value={30} total={60} />)
    const bar = screen.getByRole('progressbar')
    expect(bar).toHaveAttribute('aria-valuenow', '30')
    expect(bar).toHaveAttribute('aria-valuemin', '0')
    expect(bar).toHaveAttribute('aria-valuemax', '60')
  })

  it('fills the right number of segments once the enter delay elapses', () => {
    vi.useFakeTimers()
    render(<ProgressBar value={50} total={100} segments={10} />)
    const bar = screen.getByRole('progressbar')
    expect(segments(bar)).toHaveLength(10)

    act(() => {
      vi.advanceTimersByTime(100)
    })
    const filled = Array.from(segments(bar)).filter(
      (s) => s.getAttribute('data-state') === 'filled',
    )
    expect(filled).toHaveLength(5)
    vi.useRealTimers()
  })

  it('paints the filled segments with the current status', () => {
    vi.useFakeTimers()
    render(<ProgressBar value={100} total={100} segments={4} status="warning" />)
    act(() => {
      vi.advanceTimersByTime(100)
    })
    const bar = screen.getByRole('progressbar')
    expect(bar).toHaveAttribute('data-status', 'warning')
    Array.from(segments(bar)).forEach((s) => expect(s).toHaveAttribute('data-state', 'warning'))
    vi.useRealTimers()
  })

  it('swaps the segments for a single bar when indeterminate', () => {
    render(<ProgressBar value={0} indeterminate />)
    const bar = screen.getByRole('progressbar')
    expect(bar).toHaveAttribute('data-state', 'indeterminate')
    expect(bar).not.toHaveAttribute('aria-valuenow')
    expect(bar.querySelector('[data-slot="progress-bar-indeterminate"]')).toBeInTheDocument()
    expect(segments(bar)).toHaveLength(0)
  })

  it('renders the readout with value, unit and label', () => {
    render(<ProgressBar value={65} unit="%" label="Storage" />)
    const bar = screen.getByRole('progressbar')
    expect(bar.querySelector('[data-slot="progress-bar-value"]')).toHaveTextContent('65%')
    expect(bar.querySelector('[data-slot="progress-bar-label"]')).toHaveTextContent('Storage')
  })

  it('drops the readout for the slim variant', () => {
    render(<ProgressBar value={65} variant="slim" label="Storage" />)
    const bar = screen.getByRole('progressbar')
    expect(bar).toHaveAttribute('data-variant', 'slim')
    expect(bar.querySelector('[data-slot="progress-bar-readout"]')).toBeNull()
  })

  it('reports the disabled state', () => {
    render(<ProgressBar value={20} disabled />)
    expect(screen.getByRole('progressbar')).toHaveAttribute('data-state', 'disabled')
  })

  it('lets a caller-supplied utility win over the variant default', () => {
    render(<ProgressBar value={20} className="gap-8" />)
    const bar = screen.getByRole('progressbar')
    expect(bar).toHaveClass('gap-8')
    expect(bar).not.toHaveClass('gap-2')
  })

  it('accepts ref as a plain prop', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<ProgressBar value={20} ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  // 一个没有名字的 progressbar 在读屏里就是「进度条，72」，完全说不清是什么的进度。
  describe('accessible name', () => {
    it('takes its name from label', () => {
      render(<ProgressBar value={20} label="Upload" />)
      expect(screen.getByRole('progressbar', { name: 'Upload' })).toBeInTheDocument()
    })

    it('names the bar even when the readout is hidden', () => {
      render(<ProgressBar value={20} label="Upload" showReadout={false} />)
      expect(screen.getByRole('progressbar', { name: 'Upload' })).toBeInTheDocument()
    })

    it('names an indeterminate bar, which renders no readout at all', () => {
      render(<ProgressBar value={0} label="Syncing" indeterminate />)
      expect(screen.getByRole('progressbar', { name: 'Syncing' })).toBeInTheDocument()
    })

    it('lets a caller-supplied aria-label win over label', () => {
      render(<ProgressBar value={20} label="Upload" aria-label="Uploading avatar" />)
      expect(screen.getByRole('progressbar', { name: 'Uploading avatar' })).toBeInTheDocument()
    })

    it('folds the unit into the spoken value', () => {
      render(<ProgressBar value={72} unit="%" />)
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuetext', '72%')
    })

    it('omits valuetext when there is no unit', () => {
      render(<ProgressBar value={72} />)
      expect(screen.getByRole('progressbar')).not.toHaveAttribute('aria-valuetext')
    })
  })
})
