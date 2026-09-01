import * as React from 'react'
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { NextEvent } from './NextEvent'

const HOUR = 60 * 60 * 1000
const DAY = 24 * HOUR

describe('NextEvent', () => {
  it('falls back to demo events and flags them as not real', () => {
    render(<NextEvent data-testid="next-event" />)
    const widget = screen.getByTestId('next-event')

    expect(widget).toHaveAttribute('data-slot', 'next-event')
    expect(widget).toHaveAttribute('data-state', 'demo')
    expect(widget).not.toHaveAttribute('data-real')
  })

  it('marks demo data with the SIM badge and drops it for real events', () => {
    const { unmount } = render(<NextEvent data-testid="next-event" />)
    const demo = screen.getByTestId('next-event')

    expect(demo).toHaveClass("after:content-['SIM']")
    expect(demo).toHaveClass('after:text-foreground-subtle')
    unmount()

    render(
      <NextEvent event={{ title: 'Standup', date: Date.now() + DAY }} data-testid="next-event" />,
    )
    expect(screen.getByTestId('next-event')).not.toHaveClass("after:content-['SIM']")
  })

  it('renders a supplied event in its own slots', () => {
    const date = Date.now() + 3 * DAY
    render(<NextEvent event={{ title: 'Design review', date }} data-testid="next-event" />)
    const widget = screen.getByTestId('next-event')

    expect(widget).toHaveAttribute('data-state', 'has-event')
    expect(widget).toHaveAttribute('data-real', '')
    expect(widget.querySelector('[data-slot="next-event-title"]')).toHaveTextContent(
      'Design review',
    )
    expect(widget.querySelector('[data-slot="next-event-label"]')).toHaveTextContent('Next Event:')
    expect(widget.querySelector('[data-slot="next-event-countdown"]')).toBeInTheDocument()
  })

  it('escalates to high priority inside 24 hours', () => {
    render(
      <NextEvent
        event={{ title: 'Standup', date: Date.now() + 2 * HOUR }}
        data-testid="next-event"
      />,
    )
    expect(screen.getByTestId('next-event')).toHaveAttribute('data-priority', 'high')
  })

  it('stays at normal priority beyond 24 hours', () => {
    render(
      <NextEvent
        event={{ title: 'Launch', date: Date.now() + 7 * DAY }}
        data-testid="next-event"
      />,
    )
    expect(screen.getByTestId('next-event')).toHaveAttribute('data-priority', 'normal')
  })

  it('lets an explicit priority override the derived one', () => {
    render(
      <NextEvent
        priority="low"
        event={{ title: 'Standup', date: Date.now() + HOUR }}
        data-testid="next-event"
      />,
    )
    expect(screen.getByTestId('next-event')).toHaveAttribute('data-priority', 'low')
  })

  it('picks the nearest upcoming event out of a list', () => {
    const now = Date.now()
    render(
      <NextEvent
        events={[
          { title: 'Later', date: now + 5 * DAY },
          { title: 'Sooner', date: now + 1 * DAY },
        ]}
        data-testid="next-event"
      />,
    )
    expect(
      screen.getByTestId('next-event').querySelector('[data-slot="next-event-title"]'),
    ).toHaveTextContent('Sooner')
  })

  it('keeps the countdown on tabular numerals', () => {
    render(<NextEvent data-testid="next-event" />)
    expect(
      screen.getByTestId('next-event').querySelector('[data-slot="next-event-countdown"]'),
    ).toHaveClass('tabular-nums')
  })

  it('uses the global semantic theme', () => {
    render(<NextEvent data-testid="next-event" />)
    const widget = screen.getByTestId('next-event')
    expect(widget).toHaveClass('bg-surface')
  })

  it('lets a caller-supplied utility win over the variant default', () => {
    render(<NextEvent className="rounded-none" data-testid="next-event" />)
    const widget = screen.getByTestId('next-event')
    expect(widget).toHaveClass('rounded-none')
    expect(widget).not.toHaveClass('rounded-pill')
  })

  it('accepts ref as a plain prop', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<NextEvent ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
