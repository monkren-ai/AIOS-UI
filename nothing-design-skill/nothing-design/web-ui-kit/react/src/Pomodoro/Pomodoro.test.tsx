import * as React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { Pomodoro } from './Pomodoro'

describe('Pomodoro', () => {
  it('renders the work phase at rest', () => {
    render(<Pomodoro data-testid="pomodoro" />)
    const pomodoro = screen.getByTestId('pomodoro')

    expect(pomodoro).toHaveAttribute('data-slot', 'pomodoro')
    expect(pomodoro).toHaveAttribute('data-phase', 'work')
    expect(pomodoro).toHaveAttribute('data-state', 'paused')
    expect(pomodoro.querySelector('[data-slot="pomodoro-timer"]')).toHaveTextContent('25:00')
    expect(pomodoro.querySelector('[data-slot="pomodoro-status"]')).toHaveTextContent('[WORK]')
    expect(pomodoro.querySelector('[data-slot="pomodoro-count"]')).toHaveTextContent('0 completed')
  })

  it('keeps the countdown on tabular numerals', () => {
    render(<Pomodoro data-testid="pomodoro" />)
    expect(
      screen.getByTestId('pomodoro').querySelector('[data-slot="pomodoro-timer"]'),
    ).toHaveClass('tabular-nums')
  })

  it('honours a custom work length', () => {
    render(<Pomodoro workMinutes={5} data-testid="pomodoro" />)
    expect(
      screen.getByTestId('pomodoro').querySelector('[data-slot="pomodoro-timer"]'),
    ).toHaveTextContent('05:00')
  })

  it('renders one progress segment per totalSegments, all empty at start', () => {
    render(<Pomodoro totalSegments={8} data-testid="pomodoro" />)
    const segments = screen
      .getByTestId('pomodoro')
      .querySelectorAll('[data-slot="pomodoro-segment"]')
    expect(segments).toHaveLength(8)
    expect(Array.from(segments).every((s) => !s.hasAttribute('data-filled'))).toBe(true)
  })

  it('toggles between Start and Pause', () => {
    render(<Pomodoro data-testid="pomodoro" />)
    const startPause = screen.getByRole('button', { name: 'Start' })

    fireEvent.click(startPause)
    expect(screen.getByRole('button', { name: 'Pause' })).toBeInTheDocument()
    expect(screen.getByTestId('pomodoro')).toHaveAttribute('data-state', 'running')

    fireEvent.click(screen.getByRole('button', { name: 'Pause' }))
    expect(screen.getByRole('button', { name: 'Start' })).toBeInTheDocument()
  })

  it('stops the timer on reset', () => {
    render(<Pomodoro data-testid="pomodoro" />)
    fireEvent.click(screen.getByRole('button', { name: 'Start' }))
    fireEvent.click(screen.getByRole('button', { name: 'Reset' }))

    expect(screen.getByRole('button', { name: 'Start' })).toBeInTheDocument()
    expect(screen.getByTestId('pomodoro')).toHaveAttribute('data-state', 'paused')
  })

  it('lets controlled phase and running props win', () => {
    render(<Pomodoro phase="break" running data-testid="pomodoro" />)
    const pomodoro = screen.getByTestId('pomodoro')
    expect(pomodoro).toHaveAttribute('data-phase', 'break')
    expect(pomodoro).toHaveAttribute('data-state', 'running')
    expect(pomodoro.querySelector('[data-slot="pomodoro-status"]')).toHaveTextContent('[BREAK]')
  })

  it('gives work and break their own status and timer colours', () => {
    const { unmount } = render(<Pomodoro phase="work" data-testid="pomodoro" />)
    const work = screen.getByTestId('pomodoro')
    const workStatus = work.querySelector('[data-slot="pomodoro-status"]')
    const workTimer = work.querySelector('[data-slot="pomodoro-timer"]')

    expect(workStatus).toHaveClass('text-accent')
    expect(workTimer).toHaveClass('text-foreground-display')
    unmount()

    render(<Pomodoro phase="break" data-testid="pomodoro" />)
    const brk = screen.getByTestId('pomodoro')
    const breakStatus = brk.querySelector('[data-slot="pomodoro-status"]')
    const breakTimer = brk.querySelector('[data-slot="pomodoro-timer"]')

    expect(breakStatus).toHaveClass('text-success')
    expect(breakStatus).not.toHaveClass('text-accent')
    expect(breakTimer).toHaveClass('text-success')
    expect(breakTimer).not.toHaveClass('text-foreground-display')
  })

  it('colours only the filled progress segments, and per phase', () => {
    vi.useFakeTimers()
    try {
      render(<Pomodoro workMinutes={1} breakMinutes={1} totalSegments={4} data-testid="pomodoro" />)
      fireEvent.click(screen.getByRole('button', { name: 'Start' }))

      act(() => void vi.advanceTimersByTime(30_000))
      const working = screen.getByTestId('pomodoro')
      expect(working).toHaveAttribute('data-phase', 'work')
      const workFilled = working.querySelectorAll('[data-slot="pomodoro-segment"][data-filled]')
      expect(workFilled.length).toBeGreaterThan(0)
      expect(Array.from(workFilled).every((s) => s.classList.contains('bg-accent'))).toBe(true)
      const workEmpty = working.querySelectorAll(
        '[data-slot="pomodoro-segment"]:not([data-filled])',
      )
      expect(Array.from(workEmpty).every((s) => s.classList.contains('bg-border'))).toBe(true)

      // 跑完 work 段自动切到 break，再走一半让格子重新填上
      act(() => void vi.advanceTimersByTime(60_000))
      const resting = screen.getByTestId('pomodoro')
      expect(resting).toHaveAttribute('data-phase', 'break')
      const breakFilled = resting.querySelectorAll('[data-slot="pomodoro-segment"][data-filled]')
      expect(breakFilled.length).toBeGreaterThan(0)
      expect(Array.from(breakFilled).every((s) => s.classList.contains('bg-success'))).toBe(true)
      expect(Array.from(breakFilled).some((s) => s.classList.contains('bg-accent'))).toBe(false)
    } finally {
      vi.useRealTimers()
    }
  })

  it('lets a caller-supplied utility win over the variant default', () => {
    render(<Pomodoro className="rounded-none" data-testid="pomodoro" />)
    const pomodoro = screen.getByTestId('pomodoro')
    expect(pomodoro).toHaveClass('rounded-none')
    expect(pomodoro).not.toHaveClass('rounded-lg')
  })

  it('accepts ref as a plain prop', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<Pomodoro ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
