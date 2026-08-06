import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, act } from '@testing-library/react'
import { Countdown } from './Countdown'
import { countdownVariants } from './countdown-variants'

const numberTexts = (container: HTMLElement) =>
  Array.from(container.querySelectorAll('[data-slot="countdown-number"]')).map(
    (n) => n.textContent,
  )

describe('Countdown', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('renders with data-slot and the HH:MM:SS readout', () => {
    const { container } = render(<Countdown target={Date.now() + 10000} threshold={3} />)
    expect(container.firstChild).toHaveAttribute('data-slot', 'countdown')
    // 10s → 00:00:10
    expect(numberTexts(container)).toEqual(['00', '00', '10'])
    expect(container.firstChild).toHaveAttribute('data-state', 'running')
  })

  it('counts down each second', () => {
    const { container } = render(<Countdown target={Date.now() + 10000} threshold={3} />)
    expect(numberTexts(container)[2]).toBe('10')
    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(numberTexts(container)[2]).toBe('09')
  })

  it('fires onComplete once when it reaches zero', () => {
    const onComplete = vi.fn()
    render(<Countdown target={Date.now() + 2000} onComplete={onComplete} threshold={3} />)
    expect(onComplete).not.toHaveBeenCalled()
    act(() => {
      vi.advanceTimersByTime(2000)
    })
    expect(onComplete).toHaveBeenCalledTimes(1)
  })

  it('turns the readout red inside the threshold', () => {
    const { container } = render(<Countdown target={Date.now() + 5000} threshold={10} />)
    expect(container.firstChild).toHaveAttribute('data-state', 'urgent')
    const numbers = container.querySelectorAll('[data-slot="countdown-number"]')
    expect(numbers.length).toBeGreaterThan(0)
    expect(numbers[0].className).toContain('text-accent')
  })

  it('shows onCompleteText and the done state when finished', () => {
    const { container } = render(
      <Countdown target={Date.now() + 1000} onCompleteText="FINISHED" threshold={3} />,
    )
    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(container.firstChild).toHaveAttribute('data-state', 'done')
    expect(container.textContent).toContain('FINISHED')
  })

  it('exports countdownVariants for direct use', () => {
    expect(typeof countdownVariants).toBe('function')
  })
})
