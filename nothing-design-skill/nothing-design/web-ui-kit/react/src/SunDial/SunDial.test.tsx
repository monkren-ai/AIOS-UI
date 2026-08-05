import * as React from 'react'
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SunDial } from './SunDial'

describe('SunDial', () => {
  it('renders every slot', () => {
    render(<SunDial latitude={39.9} longitude={116.4} data-testid="dial" />)
    const dial = screen.getByTestId('dial')

    expect(dial).toHaveAttribute('data-slot', 'sun-dial')
    expect(dial.querySelector('[data-slot="sun-dial-header"]')).toBeInTheDocument()
    expect(dial.querySelector('[data-slot="sun-dial-arc"]')).toBeInTheDocument()
    expect(dial.querySelector('[data-slot="sun-dial-sunrise"]')).toBeInTheDocument()
    expect(dial.querySelector('[data-slot="sun-dial-sunset"]')).toBeInTheDocument()
    expect(dial.querySelector('[data-slot="sun-dial-current-time"]')).toBeInTheDocument()
    expect(dial.querySelector('[data-slot="sun-dial-remaining"]')).toBeInTheDocument()
  })

  it('exposes the day/night state through data-time', () => {
    render(<SunDial time="night" latitude={39.9} longitude={116.4} data-testid="dial" />)
    expect(screen.getByTestId('dial')).toHaveAttribute('data-time', 'night')
  })

  it('resolves the given coordinates and shows them', () => {
    render(<SunDial latitude={39.9} longitude={116.4} data-testid="dial" />)
    const dial = screen.getByTestId('dial')

    expect(dial).toHaveAttribute('data-located', '')
    expect(dial.querySelector('[data-slot="sun-dial-location"]')).toHaveTextContent(
      '39.90°, 116.40°',
    )
  })

  it('keeps every digit readout on tabular numerals', () => {
    render(<SunDial latitude={39.9} longitude={116.4} data-testid="dial" />)
    const dial = screen.getByTestId('dial')

    expect(dial.querySelector('[data-slot="sun-dial-current-time"]')).toHaveClass('tabular-nums')
    expect(dial.querySelector('[data-slot="sun-dial-remaining"]')).toHaveClass('tabular-nums')
    expect(dial.querySelector('[data-slot="sun-dial-location"]')).toHaveClass('tabular-nums')
  })

  it('renders a HH:MM clock', () => {
    render(<SunDial latitude={39.9} longitude={116.4} data-testid="dial" />)
    expect(
      screen.getByTestId('dial').querySelector('[data-slot="sun-dial-current-time"]')?.textContent,
    ).toMatch(/^\d{2}:\d{2}$/)
  })

  it('turns off the sun tween under reduced motion', () => {
    render(<SunDial latitude={39.9} longitude={116.4} data-testid="dial" />)
    const sun = screen.getByTestId('dial').querySelector('[data-slot="sun-dial-sun"]')
    // 日间才有太阳标记；有的话必须带 motion-reduce 兜底
    if (sun) expect(sun).toHaveClass('motion-reduce:transition-none')
  })

  it('keeps the widget palette out of the global data-theme attribute', () => {
    render(<SunDial theme="light" latitude={39.9} longitude={116.4} data-testid="dial" />)
    const dial = screen.getByTestId('dial')
    expect(dial).toHaveAttribute('data-widget-theme', 'light')
    expect(dial).not.toHaveAttribute('data-theme')
  })

  it('lets a caller-supplied utility win over the variant default', () => {
    render(<SunDial className="rounded-none" latitude={1} longitude={1} data-testid="dial" />)
    const dial = screen.getByTestId('dial')
    expect(dial).toHaveClass('rounded-none')
    expect(dial).not.toHaveClass('rounded-lg')
  })

  it('accepts ref as a plain prop', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<SunDial ref={ref} latitude={1} longitude={1} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
