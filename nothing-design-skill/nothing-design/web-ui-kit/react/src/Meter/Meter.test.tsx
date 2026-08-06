import * as React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Meter } from './Meter'

describe('Meter', () => {
  it('renders with data-slot, role=meter and the aria value attributes', () => {
    render(<Meter value={50} aria-label="Disk" data-testid="meter" />)
    const meter = screen.getByTestId('meter')
    expect(meter).toHaveAttribute('data-slot', 'meter')
    expect(meter).toHaveAttribute('data-size', 'md')
    expect(meter).toHaveAttribute('role', 'meter')
    expect(meter).toHaveAttribute('aria-valuenow', '50')
    expect(meter).toHaveAttribute('aria-valuemin', '0')
    expect(meter).toHaveAttribute('aria-valuemax', '100')
  })

  it('maps value to the filled segment count', () => {
    render(<Meter value={50} aria-label="Disk" data-testid="meter" />)
    const meter = screen.getByTestId('meter')
    const segments = meter.querySelectorAll('[data-slot="meter-segment"]')
    expect(segments).toHaveLength(20)
    expect(
      meter.querySelectorAll('[data-slot="meter-segment"][data-state="filled"]'),
    ).toHaveLength(10)
  })

  it('colors the value as warning when value is one zone from optimum', () => {
    // optimum=50 落在 mid，value=90 越过 high → 距离 1 → warning
    render(
      <Meter
        value={90}
        min={0}
        max={100}
        low={33}
        high={66}
        optimum={50}
        aria-label="Load"
        data-testid="meter"
      />,
    )
    const meter = screen.getByTestId('meter')
    expect(meter).toHaveAttribute('data-zone', 'warning')
    expect(meter.querySelector('[data-slot="meter-value"]')).toHaveClass('text-warning')
  })

  it('colors the value as critical when value is two zones from optimum', () => {
    // optimum=10 落在 low，value=90 越过 high → 距离 2 → critical
    render(
      <Meter
        value={90}
        min={0}
        max={100}
        low={33}
        high={66}
        optimum={10}
        aria-label="Load"
        data-testid="meter"
      />,
    )
    const meter = screen.getByTestId('meter')
    expect(meter).toHaveAttribute('data-zone', 'critical')
    expect(meter.querySelector('[data-slot="meter-value"]')).toHaveClass('text-accent')
  })

  it('renders threshold markers for low and high', () => {
    render(
      <Meter
        value={50}
        min={0}
        max={100}
        low={33}
        high={66}
        aria-label="Load"
        data-testid="meter"
      />,
    )
    const markers = screen.getByTestId('meter').querySelectorAll('[data-slot="meter-marker"]')
    expect(markers).toHaveLength(2)
    expect(markers[0]).toHaveAttribute('data-bound', 'low')
    expect(markers[1]).toHaveAttribute('data-bound', 'high')
  })

  it('hides the value when showValue is false', () => {
    render(<Meter value={50} showValue={false} aria-label="Load" data-testid="meter" />)
    expect(
      screen.getByTestId('meter').querySelector('[data-slot="meter-value"]'),
    ).toBeNull()
  })

  it('accepts ref as a plain prop', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<Meter value={50} ref={ref} aria-label="Load" />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
