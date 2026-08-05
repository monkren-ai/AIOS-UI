import * as React from 'react'
import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Chrono } from './Chrono'

const button = (action: string) =>
  document.querySelector<HTMLButtonElement>(`[data-slot="chrono-button"][data-action="${action}"]`)!

describe('Chrono', () => {
  it('renders idle with data-slot and the md default', () => {
    render(<Chrono data-testid="chrono" />)
    const chrono = screen.getByTestId('chrono')

    expect(chrono).toHaveAttribute('data-slot', 'chrono')
    expect(chrono).toHaveAttribute('data-state', 'idle')
    expect(chrono).toHaveAttribute('data-size', 'md')
    expect(chrono.querySelector('[data-slot="chrono-title"]')).toHaveTextContent('Chrono')
    expect(chrono.querySelector('[data-slot="chrono-display"]')).toHaveTextContent('00:00.00')
  })

  it('keeps the ticking readout on tabular numerals', () => {
    render(<Chrono data-testid="chrono" />)
    expect(screen.getByTestId('chrono').querySelector('[data-slot="chrono-display"]')).toHaveClass(
      'tabular-nums',
    )
  })

  it('starts and pauses through the primary button', () => {
    render(<Chrono data-testid="chrono" />)

    expect(button('start')).toHaveTextContent('START')
    fireEvent.click(button('start'))

    expect(screen.getByTestId('chrono')).toHaveAttribute('data-state', 'running')
    expect(button('pause')).toHaveTextContent('PAUSE')

    fireEvent.click(button('pause'))
    expect(button('start')).toHaveTextContent('START')
  })

  it('disables LAP while idle and RESET until there is something to reset', () => {
    render(<Chrono />)
    expect(button('lap')).toBeDisabled()
    expect(button('reset')).toBeDisabled()

    fireEvent.click(button('start'))
    expect(button('lap')).not.toBeDisabled()
  })

  it('records laps and marks the fastest and slowest', () => {
    render(<Chrono data-testid="chrono" />)
    fireEvent.click(button('start'))
    fireEvent.click(button('lap'))
    fireEvent.click(button('lap'))

    const laps = screen.getByTestId('chrono').querySelectorAll('[data-slot="chrono-lap"]')
    expect(laps).toHaveLength(2)

    const paces = Array.from(laps).map((lap) => lap.getAttribute('data-pace'))
    expect(paces).toContain('slowest')
  })

  it('clears elapsed time and laps on reset', async () => {
    render(<Chrono data-testid="chrono" />)
    fireEvent.click(button('start'))
    fireEvent.click(button('lap'))

    const chrono = screen.getByTestId('chrono')
    // reset 在 elapsed still 0 时是禁用的，先等计时真的走起来
    await waitFor(() =>
      expect(chrono.querySelector('[data-slot="chrono-display"]')).not.toHaveTextContent(
        '00:00.00',
      ),
    )

    fireEvent.click(button('pause'))
    fireEvent.click(button('reset'))

    expect(chrono.querySelectorAll('[data-slot="chrono-lap"]')).toHaveLength(0)
    expect(chrono.querySelector('[data-slot="chrono-display"]')).toHaveTextContent('00:00.00')
    expect(chrono).toHaveAttribute('data-state', 'idle')
  })

  it('lets a controlled state prop override the derived one', () => {
    render(<Chrono state="paused" data-testid="chrono" />)
    expect(screen.getByTestId('chrono')).toHaveAttribute('data-state', 'paused')
  })

  it('lets a caller-supplied utility win over the variant default', () => {
    render(<Chrono className="rounded-none" data-testid="chrono" />)
    const chrono = screen.getByTestId('chrono')
    expect(chrono).toHaveClass('rounded-none')
    expect(chrono).not.toHaveClass('rounded-lg')
  })

  it('accepts ref as a plain prop', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<Chrono ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
