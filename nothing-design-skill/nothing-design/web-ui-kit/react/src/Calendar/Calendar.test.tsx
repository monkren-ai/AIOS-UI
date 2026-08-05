import * as React from 'react'
import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { Calendar } from './Calendar'

const JAN_2024 = new Date(2024, 0, 15)

describe('Calendar', () => {
  it('renders the compact layout with its own slots', () => {
    render(<Calendar initialDate={JAN_2024} data-testid="calendar" />)
    const calendar = screen.getByTestId('calendar')

    expect(calendar).toHaveAttribute('data-slot', 'calendar')
    expect(calendar).toHaveAttribute('data-type', 'compact')
    expect(calendar.querySelector('[data-slot="calendar-day-name"]')).toHaveTextContent('Monday')
    expect(calendar.querySelector('[data-slot="calendar-date"]')).toHaveTextContent('15')
    expect(calendar.querySelector('[data-slot="calendar-month"]')).toHaveTextContent('January')
  })

  it('renders the full layout with a header, nav and grid', () => {
    render(<Calendar type="full" initialDate={JAN_2024} data-testid="calendar" />)
    const calendar = screen.getByTestId('calendar')

    expect(calendar).toHaveAttribute('data-type', 'full')
    expect(calendar.querySelector('[data-slot="calendar-month-year"]')).toHaveTextContent(
      'January 2024',
    )
    expect(screen.getByRole('grid')).toHaveAttribute('data-slot', 'calendar-grid')
    expect(calendar.querySelectorAll('[data-slot="calendar-weekday"]')).toHaveLength(7)
    expect(calendar.querySelectorAll('[data-slot="calendar-day"]')).toHaveLength(42)
  })

  it('keeps the numerals tabular so the grid does not jitter', () => {
    render(<Calendar type="full" initialDate={JAN_2024} data-testid="calendar" />)
    const firstDay = screen.getByTestId('calendar').querySelector('[data-slot="calendar-day"]')
    expect(firstDay).toHaveClass('tabular-nums')
  })

  it('marks out-of-month days through data-other-month', () => {
    render(<Calendar type="full" initialDate={JAN_2024} data-testid="calendar" />)
    const days = screen.getByTestId('calendar').querySelectorAll('[data-slot="calendar-day"]')
    // 2024-01-01 是周一，所以首格是上月的 12/31
    expect(days[0]).toHaveAttribute('data-other-month', '')
    expect(days[1]).not.toHaveAttribute('data-other-month')
  })

  it('steps the month backwards and forwards', () => {
    render(<Calendar type="full" initialDate={JAN_2024} data-testid="calendar" />)
    const monthYear = () =>
      screen.getByTestId('calendar').querySelector('[data-slot="calendar-month-year"]')

    fireEvent.click(screen.getByLabelText('Previous month'))
    expect(monthYear()).toHaveTextContent('December 2023')

    fireEvent.click(screen.getByLabelText('Next month'))
    expect(monthYear()).toHaveTextContent('January 2024')
  })

  it('exposes the nav buttons as non-submitting buttons', () => {
    render(<Calendar type="full" initialDate={JAN_2024} />)
    expect(screen.getByLabelText('Previous month')).toHaveAttribute('type', 'button')
    expect(screen.getByLabelText('Next month')).toHaveAttribute('data-direction', 'next')
  })

  it('lets a caller-supplied utility win over the variant default', () => {
    render(<Calendar className="rounded-none" data-testid="calendar" />)
    const calendar = screen.getByTestId('calendar')
    expect(calendar).toHaveClass('rounded-none')
    expect(calendar).not.toHaveClass('rounded-lg')
  })

  it('accepts ref as a plain prop', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<Calendar ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
